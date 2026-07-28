/**
 * Contact form input is fully untrusted and lands inside email HTML.
 * Escaping stops a submitted message from breaking the layout or
 * smuggling a link into a mail that appears to come from Devon.
 */
const esc = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Escape, then preserve the line breaks the sender typed. */
const escMultiline = (value: unknown): string =>
  esc(value).replace(/\r?\n/g, "<br />");

const PINK = "#e8458b"; // rules, blocks — decorative only
const PINK_TEXT = "#d22e74"; // 4.8:1 on white, safe for link text
const INK = "#131316";
const MUTED = "#4a4a54";
const BORDER = "#dcdce3";
const WELL = "#f7f7f9";

const MONO =
  "'Courier New', Courier, monospace; letter-spacing: 0.2em; text-transform: uppercase";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const brandLabel = (text: string, ruleColor: string) => `
    <table role="presentation" style="border-collapse: collapse;">
      <tr>
        <td style="width: 24px; padding-right: 12px;">
          <div style="width: 24px; height: 1px; background: ${ruleColor};"></div>
        </td>
        <td>
          <p style="margin: 0; color: ${MUTED}; font-size: 12px; font-family: ${MONO};">
            ${text}
          </p>
        </td>
      </tr>
    </table>`;

const row = (label: string, value?: string | null, mono = false) => {
  if (!value) return "";
  return `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER}; color: ${MUTED}; font-size: 14px; vertical-align: top; white-space: nowrap;">
            ${esc(label)}
          </td>
          <td style="padding: 12px 16px; border-bottom: 1px solid ${BORDER}; color: ${INK}; font-size: 14px; text-align: right; vertical-align: top;${
            mono ? " font-family: 'Courier New', Courier, monospace;" : ""
          }">
            ${value}
          </td>
        </tr>`;
};

/**
 * `color-scheme: light` plus the meta tags below stop Gmail, Outlook, and
 * Apple Mail from auto-inverting the palette. Without them these render
 * as muddy dark-mode approximations on a lot of phones.
 */
const shell = ({
  title,
  preheader,
  body,
}: {
  title: string;
  preheader: string;
  body: string;
}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${esc(title)}</title>
  <style>
    :root { color-scheme: light; supported-color-schemes: light; }
  </style>
</head>
<body style="margin: 0; padding: 0; background: #ffffff; color-scheme: light; font-family: ${SANS};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
    ${esc(preheader)}
  </div>
  <div style="max-width: 540px; margin: 0 auto; padding: 56px 24px;">
${body}
  </div>
</body>
</html>
`;

/* ────────────────────────────────────────────────────────────────────────
   1. Confirmation — sent to the person who submitted the form
   ──────────────────────────────────────────────────────────────────────── */

export const contactConfirmationTemplate = ({
  name,
  inquiryType,
  contactMethod,
  message,
}: {
  name?: string | null;
  inquiryType?: string | null;
  contactMethod?: string | null;
  message?: string | null;
}): string => {
  const firstName =
    String(name ?? "")
      .trim()
      .split(/\s+/)[0] || "there";

  return shell({
    title: "Thanks for reaching out",
    preheader: "Your message reached Devon Hunt — here is what happens next.",
    body: `
    <div style="margin-bottom: 48px;">
${brandLabel("The Proper Nest Real Estate", PINK)}
    </div>

    <h1 style="margin: 0 0 12px 0; color: ${INK}; font-size: 26px; font-weight: 700; line-height: 1.2;">
      Thanks for reaching out, ${esc(firstName)}
    </h1>

    <p style="margin: 0 0 24px 0; color: ${MUTED}; font-size: 15px; line-height: 1.7;">
      Your message came through. I read every one myself and aim to reply within one business day. If it is time sensitive, calling is the fastest way to reach me.
    </p>

    <div style="margin-bottom: 36px; border: 1px solid ${BORDER};">
      <div style="padding: 12px 16px; border-bottom: 1px solid ${BORDER}; background: ${WELL};">
        <p style="margin: 0; font-size: 12px; font-family: ${MONO}; color: ${MUTED};">
          What you sent
        </p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
${row("Inquiry", inquiryType ? esc(inquiryType) : null)}
${row("Preferred contact", contactMethod ? esc(contactMethod) : null)}
      </table>
      ${
        message
          ? `<div style="padding: 16px;">
        <p style="margin: 0; color: ${MUTED}; font-size: 14px; line-height: 1.7;">
          ${escMultiline(message)}
        </p>
      </div>`
          : ""
      }
    </div>

    <div style="margin-bottom: 40px; padding: 16px; background: ${WELL}; border: 1px solid ${BORDER}; border-left: 3px solid ${PINK};">
      <p style="margin: 0; color: ${INK}; font-size: 14px; line-height: 1.7;">
        <strong>Need me sooner?</strong> Call or text
        <a href="tel:+19788185303" style="color: ${PINK_TEXT};">+1 (978) 818 5303</a>.
      </p>
    </div>

    <div style="margin: 40px 0; height: 1px; background: ${BORDER};"></div>

    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 10px 0; color: ${MUTED}; font-size: 12px; font-family: ${MONO};">
        Devon Hunt &middot; Realtor
      </p>
      <p style="margin: 0 0 6px 0;">
        <a href="mailto:devon@thepropernest.com" style="color: ${PINK_TEXT}; font-size: 14px;">
          devon@thepropernest.com
        </a>
      </p>
      <p style="margin: 0; color: ${MUTED}; font-size: 14px;">
        257 Washington St #3, Marblehead, MA 01945
      </p>
    </div>

    <div style="margin-top: 40px;">
${brandLabel("The Proper Nest Real Estate", BORDER)}
    </div>`,
  });
};

/* ────────────────────────────────────────────────────────────────────────
   2. Notification — sent to Devon
   ──────────────────────────────────────────────────────────────────────── */

export const contactNotificationTemplate = ({
  id,
  name,
  email,
  phone,
  contactMethod,
  inquiryType,
  message,
  contactTime,
  submittedAt,
  device,
  browser,
  os,
  geoCity,
  geoRegion,
}: {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  contactMethod?: string | null;
  inquiryType?: string | null;
  message?: string | null;
  contactTime?: string | null;
  submittedAt?: string | null;
  device?: string | null;
  browser?: string | null;
  os?: string | null;
  geoCity?: string | null;
  geoRegion?: string | null;
}): string => {
  const displayName = String(name ?? "").trim() || "Someone";
  const location = [geoCity, geoRegion].filter(Boolean).join(", ");
  const client = [device, browser, os].filter(Boolean).join(" · ");

  return shell({
    title: `New enquiry from ${displayName}`,
    preheader: `${displayName}${inquiryType ? ` — ${inquiryType}` : ""}${
      email ? ` — ${email}` : ""
    }`,
    body: `
    <div style="margin-bottom: 48px;">
${brandLabel("New contact form submission", PINK)}
    </div>

    <h1 style="margin: 0 0 12px 0; color: ${INK}; font-size: 26px; font-weight: 700; line-height: 1.2;">
      ${esc(displayName)}${inquiryType ? ` &mdash; ${esc(inquiryType)}` : ""}
    </h1>

    <p style="margin: 0 0 24px 0; color: ${MUTED}; font-size: 15px; line-height: 1.7;">
      Submitted via devonhuntrealtor.com${
        submittedAt ? ` on ${esc(submittedAt)}` : ""
      }.
    </p>

    <div style="margin-bottom: 36px; border: 1px solid ${BORDER};">
      <div style="padding: 12px 16px; border-bottom: 1px solid ${BORDER}; background: ${WELL};">
        <p style="margin: 0; font-size: 12px; font-family: ${MONO}; color: ${MUTED};">
          Contact details
        </p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
${row(
  "Email",
  email
    ? `<a href="mailto:${esc(email)}" style="color: ${PINK_TEXT};">${esc(
        email,
      )}</a>`
    : null,
  true,
)}
${row(
  "Phone",
  phone
    ? `<a href="tel:${esc(String(phone).replace(/[^\d+]/g, ""))}" style="color: ${PINK_TEXT};">${esc(
        phone,
      )}</a>`
    : null,
  true,
)}
${row("Prefers", contactMethod ? esc(contactMethod) : null)}
${row("Best time", contactTime ? esc(contactTime) : null)}
      </table>
    </div>

    <div style="margin-bottom: 36px; border: 1px solid ${BORDER};">
      <div style="padding: 12px 16px; border-bottom: 1px solid ${BORDER}; background: ${WELL};">
        <p style="margin: 0; font-size: 12px; font-family: ${MONO}; color: ${MUTED};">
          Message
        </p>
      </div>
      <div style="padding: 16px;">
        <p style="margin: 0; color: ${INK}; font-size: 15px; line-height: 1.7;">
          ${message ? escMultiline(message) : "<em>No message provided.</em>"}
        </p>
      </div>
    </div>

    ${
      email
        ? `<div style="margin-bottom: 40px; padding: 16px; background: ${WELL}; border: 1px solid ${BORDER}; border-left: 3px solid ${PINK};">
      <p style="margin: 0; color: ${INK}; font-size: 14px; line-height: 1.7;">
        <strong>Reply directly:</strong>
        <a href="mailto:${esc(email)}?subject=${encodeURIComponent(
          "Re: your enquiry via devonhuntrealtor.com",
        )}" style="color: ${PINK_TEXT};">${esc(email)}</a>
      </p>
    </div>`
        : ""
    }

    <div style="margin: 40px 0; height: 1px; background: ${BORDER};"></div>

    <table style="width: 100%; border-collapse: collapse;">
${row("Record", id ? `#${esc(id)}` : null, true)}
${row("Location", location ? esc(location) : null)}
${row("Client", client ? esc(client) : null)}
    </table>

    <div style="margin-top: 40px;">
${brandLabel("Devonhuntrealtor.com", BORDER)}
    </div>`,
  });
};
