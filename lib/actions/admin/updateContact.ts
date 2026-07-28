"use server";

import "server-only";
import type { Contact } from "@prisma/client";
import prisma from "@/prisma/client";
import { getRequestDetails } from "@/lib/utils/_log.server.utils";
import { buildLogMessage } from "@/lib/utils/_log.client.utils";

export type UpdateContactInput = Partial<
  Pick<
    Contact,
    | "name"
    | "email"
    | "phone"
    | "contactMethod"
    | "inquiryType"
    | "message"
    | "contactTime"
  >
>;

export type UpdateContactResult =
  | { ok: true; contact: Contact }
  | { ok: false; error: string };

export async function updateContact(
  id: number,
  input: UpdateContactInput,
): Promise<UpdateContactResult> {
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: input,
    });

    const req = await getRequestDetails();
    console.info(
      buildLogMessage(`updated contact #${id}`, contact.email ?? "admin", req),
    );

    return { ok: true, contact };
  } catch (error: any) {
    // P2025 = record not found
    if (error?.code === "P2025") {
      return { ok: false, error: "Contact not found." };
    }

    console.error("[updateContact]", error);
    return { ok: false, error: "Unable to process request." };
  }
}
