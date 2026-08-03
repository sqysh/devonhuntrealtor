import { createHmac, timingSafeEqual } from "node:crypto";
import "server-only";

const SECRET =
  process.env.FORM_TOKEN_SECRET ??
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET;

/**
 * Heuristics tuned against the submissions actually coming through:
 * random-case gibberish in every text field, an email-to-SMS gateway
 * address, and a phone number with the wrong digit count.
 *
 * Every check returns a reason string. Only the honeypot discards a
 * submission; the rest mark the row for review.
 */

/** Email-to-SMS gateways. Never a legitimate contact address on a form. */
const GATEWAY_DOMAINS = [
  "txt.att.net",
  "vtext.com",
  "tmomail.net",
  "messaging.sprintpcs.com",
  "vzwpix.com",
  "mms.att.net",
  "pm.sprint.com",
  "msg.fi.google.com",
  "email.uscc.net",
  "sms.cricketwireless.net",
];

/** Free throwaway domains that show up in scripted submissions. */
const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
];

/**
 * Random-string detector. Real words alternate vowels and consonants and
 * don't switch case mid-token; generated junk like "DvJUoFQFujmZJoj"
 * fails on both counts.
 *
 * Deliberately not run against names. Surnames legitimately break every
 * rule here (Krzyzewski is 20% vowels), and a rejected name is a lost
 * client.
 */
function looksGenerated(value: string): boolean {
  const token = value.trim();
  if (token.length < 8) return false;

  // Multiple words with spaces is almost always human.
  if (token.split(/\s+/).length > 2) return false;

  const letters = token.replace(/[^a-z]/gi, "");
  if (letters.length < 8) return false;

  const vowels = (letters.match(/[aeiou]/gi) ?? []).length;
  const vowelRatio = vowels / letters.length;

  // English runs roughly 35-45% vowels. Under 25% is not a word.
  const lowVowels = vowelRatio < 0.25;

  // Count case flips: "DvJUoFQ" flips constantly, "Marblehead" flips once.
  let flips = 0;
  for (let i = 1; i < letters.length; i++) {
    const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase();
    const currUpper = letters[i] === letters[i].toUpperCase();
    if (prevUpper !== currUpper) flips++;
  }
  const chaoticCase = flips / letters.length > 0.4;

  // Five or more consonants in a row.
  const consonantRun = /[bcdfghjklmnpqrstvwxyz]{5,}/i.test(letters);

  return lowVowels || chaoticCase || consonantRun;
}

export type SpamVerdict = { spam: false } | { spam: true; reason: string };

export function checkSubmission(input: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  contactTime?: string;
  website?: string;
  elapsedMs?: number;
}): SpamVerdict {
  // 1. Honeypot.
  if (input.website) return { spam: true, reason: "honeypot" };

  // 2. No valid token means the form was never rendered, which points at
  //    a direct POST to the action. There is no timing floor: any bot
  //    that can obtain a token can also wait, so a floor only penalises
  //    fast humans.
  if (input.elapsedMs === undefined) {
    return { spam: true, reason: "no-timing-token" };
  }

  const email = input.email?.trim().toLowerCase() ?? "";
  const domain = email.split("@")[1] ?? "";

  // 3. Gateway and disposable addresses.
  if (GATEWAY_DOMAINS.includes(domain)) {
    return { spam: true, reason: `sms-gateway:${domain}` };
  }
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return { spam: true, reason: `disposable:${domain}` };
  }

  // 4. Phone, when given, should have 10 or 11 digits.
  if (input.phone) {
    const digits = input.phone.replace(/\D/g, "");
    if (digits.length > 0 && (digits.length < 10 || digits.length > 11)) {
      return { spam: true, reason: `phone-digits:${digits.length}` };
    }
  }

  // 5. Generated text. Name is excluded on purpose — see looksGenerated.
  for (const [field, value] of Object.entries({
    message: input.message,
    contactTime: input.contactTime,
  })) {
    if (value && looksGenerated(value)) {
      return { spam: true, reason: `generated-text:${field}` };
    }
  }

  // 6. A real message has whitespace in it.
  const message = input.message?.trim() ?? "";
  if (message.length > 12 && !/\s/.test(message)) {
    return { spam: true, reason: "message-single-token" };
  }

  // 7. Link spam.
  const links = (message.match(/https?:\/\//gi) ?? []).length;
  if (links >= 2) return { spam: true, reason: `links:${links}` };

  return { spam: false };
}

/**
 * Returns an empty string rather than throwing when the secret is
 * missing. Throwing here 500s the whole contact page, which is a far
 * worse outcome than losing one layer of spam defence.
 */
export function mintFormToken(): string {
  if (!SECRET) {
    console.error("[formToken] no secret set — token checks are disabled");
    return "";
  }

  const issued = Date.now().toString();
  const sig = createHmac("sha256", SECRET).update(issued).digest("hex");
  return `${issued}.${sig}`;
}

/** Tokens older than this are stale; a real session won't take longer. */
const MAX_AGE_MS = 1000 * 60 * 60 * 2;

export type TokenCheck =
  | { valid: true; elapsedMs: number }
  | { valid: false; reason: string };

export function verifyFormToken(token?: string): TokenCheck {
  if (!SECRET) return { valid: false, reason: "no-secret" };
  if (!token) return { valid: false, reason: "missing" };

  const [issued, sig] = token.split(".");
  if (!issued || !sig) return { valid: false, reason: "malformed" };
  if (!/^\d+$/.test(issued)) return { valid: false, reason: "bad-timestamp" };
  if (!/^[0-9a-f]+$/i.test(sig)) return { valid: false, reason: "malformed" };

  const expected = createHmac("sha256", SECRET).update(issued).digest("hex");

  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { valid: false, reason: "bad-signature" };
  }

  const elapsedMs = Date.now() - Number(issued);
  if (elapsedMs < 0) return { valid: false, reason: "future-timestamp" };
  if (elapsedMs > MAX_AGE_MS) return { valid: false, reason: "expired" };

  return { valid: true, elapsedMs };
}
