"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomTransactions = exports.processRecharge = void 0;
const errors_1 = require("../utils/errors");
const chatRoomRepository_1 = require("../repositories/chatRoomRepository");
const transactionRepository_1 = require("../repositories/transactionRepository");
const MAX_RECHARGE_AMOUNT = 100000;
const processRecharge = async (payload) => {
    const room = await (0, chatRoomRepository_1.findRoomById)(payload.roomId);
    if (!room) {
        throw new errors_1.AppError("Chat room not found", 404);
    }
    if (room.userId !== payload.userId && room.adminId !== payload.userId) {
        throw new errors_1.AppError("User does not belong to this room", 403);
    }
    if (!Number.isFinite(payload.amount) || payload.amount <= 0) {
        throw new errors_1.AppError("amount must be a positive number", 400);
    }
    if (payload.amount > MAX_RECHARGE_AMOUNT) {
        throw new errors_1.AppError(`amount exceeds max limit (${MAX_RECHARGE_AMOUNT})`, 400);
    }
    const currency = (payload.currency || "USD").trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(currency)) {
        throw new errors_1.AppError("currency must be a 3-letter code (e.g. USD)", 400);
    }
    const reference = `RCH-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    return (0, transactionRepository_1.createRechargeTransaction)({
        roomId: payload.roomId,
        userId: payload.userId,
        amount: Number(payload.amount.toFixed(2)),
        currency,
        reference,
    });
};
exports.processRecharge = processRecharge;
const getRoomTransactions = async (roomId, limit, userId) => {
    const room = await (0, chatRoomRepository_1.findRoomById)(roomId);
    if (!room) {
        throw new errors_1.AppError("Chat room not found", 404);
    }
    if (room.userId !== userId && room.adminId !== userId) {
        throw new errors_1.AppError("User does not belong to this room", 403);
    }
    return (0, transactionRepository_1.listTransactionsByRoom)(roomId, limit);
};
exports.getRoomTransactions = getRoomTransactions;
