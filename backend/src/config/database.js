/* src/config/database.js */
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

export const createPrismaClient = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });
};
