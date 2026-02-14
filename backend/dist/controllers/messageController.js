"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageHistory = void 0;
const messageService_1 = require("../services/messageService");
const errors_1 = require("../utils/errors");
const getMessageHistory = async (req, res, next) => {
    try {
        const roomId = req.query.roomId;
        const limitRaw = req.query.limit;
        const cursor = req.query.cursor;
        if (!roomId) {
            throw new errors_1.AppError("roomId is required", 400);
        }
        const limit = Math.min(Math.max(parseInt(limitRaw || "20", 10), 1), 100);
        const result = await (0, messageService_1.fetchMessages)(roomId, limit, cursor);
        res.status(200).json({
            status: "success",
            data: result.messages,
            nextCursor: result.nextCursor,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMessageHistory = getMessageHistory;
