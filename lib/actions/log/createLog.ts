import "server-only";
import { LogLevel } from "@prisma/client";
import prisma from "@/prisma/client";
import type { RequestDetails } from "@/lib/utils/_log.server.utils";

/**
 * Deliberately NOT a "use server" action.
 *
 * Marking this "use server" would publish it as an HTTP endpoint, and a
 * log writer that anyone can POST to is an open invitation to fill the
 * database. Every caller here is already server-side, so a plain
 * server-only function is both safer and one less round trip.
 */

export type CreateLogInput = {
  level?: LogLevel;
  /** Dot-namespaced, e.g. "contact.created". */
  event: string;
  message: string;
  context?: Record<string, unknown>;
  actor?: string | null;
  /** Pass the object you already fetched; avoids a second headers() read. */
  request?: Pick<
    RequestDetails,
    "ip" | "device" | "browser" | "os" | "geoCity" | "geoRegion"
  >;
};

/**
 * Never throws and never rejects. Logging must not be able to break the
 * operation it is recording, so failures fall back to the console and
 * the caller carries on.
 */
export async function createLog({
  level = LogLevel.INFO,
  event,
  message,
  context,
  actor,
  request,
}: CreateLogInput): Promise<void> {
  try {
    await prisma.log.create({
      data: {
        level,
        event,
        message,
        context: context ? (context as object) : undefined,
        actor: actor ?? null,
        ip: request?.ip ?? null,
        device: request?.device ?? null,
        browser: request?.browser ?? null,
        os: request?.os ?? null,
        geoCity: request?.geoCity ?? null,
        geoRegion: request?.geoRegion ?? null,
      },
    });
  } catch (error) {
    console.error("[createLog] failed", { event, message, error });
  }
}

export const logInfo = (input: Omit<CreateLogInput, "level">) =>
  createLog({ ...input, level: LogLevel.INFO });

export const logWarn = (input: Omit<CreateLogInput, "level">) =>
  createLog({ ...input, level: LogLevel.WARN });

export const logError = (input: Omit<CreateLogInput, "level">) =>
  createLog({ ...input, level: LogLevel.ERROR });
