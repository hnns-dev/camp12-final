import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
declare global {
  // This prevents the issue where the PrismaClient is constantly re-initialized in development due to module hot reloading.
  // In production, this isn't an issue since the application does not restart frequently.
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
