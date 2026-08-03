"use server";

import { NOTIFY_ADDRESS, sendEmail } from "@/lib/emails/resend";
import {
  contactConfirmationTemplate,
  contactNotificationTemplate,
} from "@/lib/emails/templates/contact.templates";
import { buildLogMessage } from "@/lib/utils/_log.client.utils";
import { getRequestDetails } from "@/lib/utils/_log.server.utils";
import { logError, logInfo, logWarn } from "@/lib/actions/log/createLog";
import prisma from "@/prisma/client";
import { after } from "next/server";
import {
  checkSubmission,
  verifyFormToken,
} from "@/lib/utils/contact-submission.utils";

export type CreateContactInput = {
  name?: string;
  email?: string;
  phone?: string;
  contactMethod?: string;
  inquiryType?: string;
  message?: string;
  contactTime?: string;
  /** Honeypot — must be empty. Filled = bot. */
  website?: string;
  formToken?: string;
};

export type CreateContactResult =
  | { ok: true; id: number }
  | { ok: false; error: string };

const formatSubmittedAt = (date: Date) =>
  date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });

export async function createContact(
  input: CreateContactInput,
): Promise<CreateContactResult> {
  const req = await getRequestDetails();

  try {
    const token = verifyFormToken(input.formToken);

    const verdict = checkSubmission({
      ...input,
      elapsedMs: token.valid ? token.elapsedMs : undefined,
    });

    // The honeypot is the only check trusted to discard outright — a
    // filled hidden field has no innocent explanation. Every other
    // verdict marks the row instead, so a misfiring heuristic costs a
    // review rather than a lead.
    if (verdict.spam && verdict.reason === "honeypot") {
      await logWarn({
        event: "contact.honeypot",
        message: "Discarded a submission with the honeypot field filled",
        context: { email: input.email },
        actor: input.email ?? "anonymous",
        request: req,
      });
      return { ok: true, id: -1 };
    }

    const flagged = verdict.spam;
    const flagReason = verdict.spam ? verdict.reason : null;

    const contact = await prisma.contact.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        contactMethod: input.contactMethod,
        inquiryType: input.inquiryType,
        message: input.message,
        contactTime: input.contactTime,

        flagged,
        flagReason,
        elapsedMs: token.valid ? token.elapsedMs : null,
        tokenStatus: token.valid ? "valid" : token.reason,

        ip: req.ip,
        userAgent: req.userAgent,
        device: req.device,
        browser: req.browser,
        os: req.os,
        referer: req.referer,
        origin: req.origin,
        language: req.language,
        geoLatitude: req.geoLatitude,
        geoLongitude: req.geoLongitude,
        geoCity: req.geoCity,
        geoRegion: req.geoRegion,
        geoCountry: req.geoCountry,
      },
      select: { id: true, createdAt: true },
    });

    if (flagged) {
      await logWarn({
        event: "contact.flagged",
        message: `Submission #${contact.id} flagged as ${flagReason}`,
        context: {
          contactId: contact.id,
          reason: flagReason,
          tokenStatus: token.valid ? "valid" : token.reason,
          elapsedMs: token.valid ? token.elapsedMs : null,
          email: input.email,
          phone: input.phone,
          message: input.message?.slice(0, 200),
        },
        actor: input.email ?? "anonymous",
        request: req,
      });

      // Stored for review, but no mail. Devon's inbox stays clean and
      // nothing is lost.
      return { ok: true, id: contact.id };
    }

    await logInfo({
      event: "contact.created",
      message: buildLogMessage(
        "submitted contact form",
        input.email ?? "anonymous",
        req,
      ),
      context: {
        contactId: contact.id,
        inquiryType: input.inquiryType,
        contactMethod: input.contactMethod,
        elapsedMs: token.valid ? token.elapsedMs : null,
      },
      actor: input.email ?? "anonymous",
      request: req,
    });

    // The submission is already saved, so mail runs after the response is
    // sent. The visitor sees their confirmation immediately instead of
    // waiting on two round trips to Resend.
    after(async () => {
      const submittedAt = formatSubmittedAt(contact.createdAt);

      const notification = sendEmail({
        to: NOTIFY_ADDRESS,
        replyTo: input.email,
        subject: `New enquiry — ${input.name?.trim() || "Unknown"}${
          input.inquiryType ? ` (${input.inquiryType})` : ""
        }`,
        html: contactNotificationTemplate({
          id: contact.id,
          name: input.name,
          email: input.email,
          phone: input.phone,
          contactMethod: input.contactMethod,
          inquiryType: input.inquiryType,
          message: input.message,
          contactTime: input.contactTime,
          submittedAt,
          device: req.device,
          browser: req.browser,
          os: req.os,
          geoCity: req.geoCity,
          geoRegion: req.geoRegion,
        }),
      });

      // Only confirm to a real address, and never let a bad one take the
      // notification down with it.
      const confirmation = input.email
        ? sendEmail({
            to: input.email,
            subject: "Thanks for reaching out",
            html: contactConfirmationTemplate({
              name: input.name,
              inquiryType: input.inquiryType,
              contactMethod: input.contactMethod,
              message: input.message,
            }),
          })
        : Promise.resolve({ ok: false as const, error: "No email provided." });

      const [notifyResult, confirmResult] = await Promise.allSettled([
        notification,
        confirmation,
      ]);

      if (notifyResult.status === "fulfilled" && !notifyResult.value.ok) {
        await logError({
          event: "contact.notification.failed",
          message: `Notification email failed for submission #${contact.id}`,
          context: { contactId: contact.id, error: notifyResult.value.error },
          actor: "system",
        });
      }

      if (confirmResult.status === "fulfilled" && !confirmResult.value.ok) {
        await logWarn({
          event: "contact.confirmation.failed",
          message: `Confirmation email not sent for submission #${contact.id}`,
          context: { contactId: contact.id, error: confirmResult.value.error },
          actor: "system",
        });
      }
    });

    return { ok: true, id: contact.id };
  } catch (error) {
    await logError({
      event: "contact.error",
      message: "createContact threw",
      context: {
        error: error instanceof Error ? error.message : String(error),
        email: input.email,
      },
      actor: input.email ?? "anonymous",
      request: req,
    });

    return { ok: false, error: "Unable to process request." };
  }
}
