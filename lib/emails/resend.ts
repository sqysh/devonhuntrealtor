import "server-only";
import { Resend } from "resend";

/** Verified sender on your Resend domain. */
export const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL ?? "Devon Hunt <devon@thepropernest.com>";

/** Where form notifications land. */
export const NOTIFY_ADDRESS =
  process.env.CONTACT_NOTIFY_EMAIL ?? "devon@thepropernest.com";

let client: Resend | null = null;

/**
 * Lazy singleton. Instantiating at module scope would throw during build
 * on any environment without the key set — a preview deploy, CI, a fresh
 * clone — so the key is read on first use instead.
 */
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[resend] RESEND_API_KEY is not set — skipping send.");
    return null;
  }

  if (!client) client = new Resend(apiKey);
  return client;
}

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string };

/**
 * Never throws. Email is a side effect of work that has already
 * succeeded — a failed send should be logged, not surfaced to the person
 * who submitted the form or allowed to roll anything back.
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = FROM_ADDRESS,
  replyTo,
}: SendEmailInput): Promise<SendEmailResult> {
  const resend = getResend();

  if (!resend) {
    return { ok: false, error: "Email is not configured." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error("[resend] send failed", { subject, error });
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data?.id ?? null };
  } catch (error) {
    console.error("[resend] send threw", { subject, error });
    return { ok: false, error: "Unable to send email." };
  }
}
