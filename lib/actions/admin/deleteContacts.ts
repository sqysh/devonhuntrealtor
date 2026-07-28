import { buildLogMessage } from "@/lib/utils/_log.client.utils";
import { getRequestDetails } from "@/lib/utils/_log.server.utils";
import prisma from "@/prisma/client";

export type DeleteContactResult = { ok: true } | { ok: false; error: string };

export async function deleteContacts(
  ids: number[],
): Promise<DeleteContactResult> {
  try {
    await prisma.contact.deleteMany({ where: { id: { in: ids } } });

    const req = await getRequestDetails();
    console.info(
      buildLogMessage(`bulk-deleted ${ids.length} contact(s)`, "admin", req),
    );

    return { ok: true };
  } catch (error) {
    console.error("[deleteContacts]", error);
    return { ok: false, error: "Unable to process request." };
  }
}
