import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import router from "./routes/indexRouter.js";
import { prisma } from "./utils/prisma.js";
import { createAdmin } from "../prisma/seed.js";

console.log("ENV CHECK:", {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  db: process.env.DATABASE_NAME,
  adminEmail: process.env.ADMIN_EMAIL,
});

try {
  const { prisma } = await import("./utils/prisma.js");
  console.log("✓ Prisma connected");
} catch (err) {
  console.error("✗ Prisma connection failed:", err.message);
}

console.log("1 - importing middlewares...");
const app = express();
const PORT = process.env.PORT || 5051;

console.log("2 - setting up app...");
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); 

      const sanitized = origin.replace(/\/$/, ""); // strip trailing slash

      const allowed = [
        "https://cafe-flow-kohl.vercel.app", 
        "https://cafe-flow-saakiyeahs-projects.vercel.app", // production
      ];

      const isAllowed =
        allowed.includes(sanitized) ||
        /^https:\/\/cafe-flow-[a-z0-9]+-saakiyeahs-projects\.vercel\.app$/.test(
          sanitized,
        ); 

      isAllowed
        ? callback(null, true)
        : callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "✅ Server is running!" });
});

// app.get("/test", (req, res) => res.send("ok"));

app.use(errorMiddleware);

console.log("3 - starting server...");

const server = app.listen(PORT, async () => {
  console.log("4 - Attempting to create admin");
  await createAdmin();
  console.log(`Server running on port ${PORT}`);
  // console.log(`Server available on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});

// Graceful Shutdown
const shutdown = async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
