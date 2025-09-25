// lib/db.ts
import { PrismaClient } from "@prisma/client";

// ✅ Prevent multiple instances in development (hot-reload safe)
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
