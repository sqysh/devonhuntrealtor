import "server-only";
import { PrismaClient } from "@prisma/client";

/**
 * Hot reload in dev tears down and re-evaluates modules without closing
 * connections, so a fresh PrismaClient per reload exhausts the pool within
 * a few saves. Caching on globalThis survives the reload.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

// `!== "production"` rather than `=== "development"` so test runs and any
// custom NODE_ENV get the same reuse instead of leaking connections.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
