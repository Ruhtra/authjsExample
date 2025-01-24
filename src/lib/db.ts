import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    // log: ["query", "info", "warn", "error"], // Adiciona logs para monitorar melhor
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export { prisma as db };
