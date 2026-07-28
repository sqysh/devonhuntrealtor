"use server";

import { buildLogMessage } from "@/lib/utils/_log.client.utils";
import { getRequestDetails } from "@/lib/utils/_log.server.utils";
import prisma from "@/prisma/client";
import "server-only";

export type DeleteContactResult = { ok: true } | { ok: false; error: string };

export async function deleteContact(id: number): Promise<DeleteContactResult> {
  try {
    const contact = await prisma.contact.delete({ where: { id } });

    const req = await getRequestDetails();
    console.info(
      buildLogMessage(`deleted contact #${id}`, contact.email ?? "admin", req),
    );

    return { ok: true };
  } catch (error: any) {
    if (error?.code === "P2025") {
      return { ok: false, error: "Contact not found." };
    }

    console.error("[deleteContact]", error);
    return { ok: false, error: "Unable to process request." };
  }
}
