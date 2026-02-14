"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const chatRoomRoutes_1 = __importDefault(require("./routes/chatRoomRoutes"));
const swaggerRoutes_1 = __importDefault(require("./routes/swaggerRoutes"));
const errors_1 = require("./utils/errors");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json({ limit: "1mb" }));
app.use((0, morgan_1.default)("dev"));
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/messages", messageRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/rooms", chatRoomRoutes_1.default);
app.use("/api-docs", swaggerRoutes_1.default);
app.use(errors_1.notFoundHandler);
app.use(errors_1.errorHandler);
exports.default = app;
