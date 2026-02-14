import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import chatRoomRoutes from "./routes/chatRoomRoutes";
import swaggerRoutes from "./routes/swaggerRoutes";
import { errorHandler, notFoundHandler } from "./utils/errors";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", chatRoomRoutes);
app.use("/api-docs", swaggerRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
