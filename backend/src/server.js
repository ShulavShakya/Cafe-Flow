import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import router from "./routes/indexRouter.js";
import { prisma } from "./utils/prisma.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5051;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://192.168.100.116:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
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

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server available on http://localhost:${PORT}`);
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
