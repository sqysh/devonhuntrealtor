import prisma from "@/prisma/client";
import { Contact } from "@prisma/client";

export type GetContactsResult =
  | { ok: true; contacts: Contact[]; total: number }
  | { ok: false; error: string };

export async function getContacts(opts?: {
  skip?: number;
  take?: number;
  orderBy?: "asc" | "desc";
}): Promise<GetContactsResult> {
  try {
    const { skip = 0, take = 50, orderBy = "desc" } = opts ?? {};

    const [contacts, total] = await prisma.$transaction([
      prisma.contact.findMany({
        skip,
        take,
        orderBy: { createdAt: orderBy },
      }),
      prisma.contact.count(),
    ]);

    return { ok: true, contacts, total };
  } catch (error) {
    return { ok: false, error: "Unable to process request." };
  }
}
