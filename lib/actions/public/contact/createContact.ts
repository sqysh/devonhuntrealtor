"use server";

import { NOTIFY_ADDRESS, sendEmail } from "@/lib/emails/resend";
import {
  contactConfirmationTemplate,
  contactNotificationTemplate,
} from "@/lib/emails/templates/contact.templates";
import { buildLogMessage } from "@/lib/utils/_log.client.utils";
import { getRequestDetails } from "@/lib/utils/_log.server.utils";
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
  try {
    const req = await getRequestDetails();
    const token = verifyFormToken(input.formToken);

    const verdict = checkSubmission({
      ...input,
      elapsedMs: token.valid ? token.elapsedMs : undefined,
    });

    if (verdict.spam) {
      console.warn("[createContact] rejected", {
        reason: verdict.reason,
        tokenReason: token.valid ? null : token.reason,
        ip: req.ip,
        email: input.email,
      });
      return { ok: true, id: -1 };
    }

    const contact = await prisma.contact.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        contactMethod: input.contactMethod,
        inquiryType: input.inquiryType,
        message: input.message,
        contactTime: input.contactTime,
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

    console.info(
      buildLogMessage(
        "submitted contact form",
        input.email ?? "anonymous",
        req,
      ),
    );

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
        console.error("[createContact] notification failed", {
          id: contact.id,
          error: notifyResult.value.error,
        });
      }

      if (confirmResult.status === "fulfilled" && !confirmResult.value.ok) {
        console.warn("[createContact] confirmation not sent", {
          id: contact.id,
          error: confirmResult.value.error,
        });
      }
    });

    return { ok: true, id: contact.id };
  } catch (error) {
    console.error("[createContact]", error);
    return { ok: false, error: "Unable to process request." };
  }
}
