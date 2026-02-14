"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTransactionsByRoom = exports.createRechargeTransaction = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createRechargeTransaction = (payload) => {
    return prisma_1.default.transaction.create({
        data: {
            roomId: payload.roomId,
            userId: payload.userId,
            amount: payload.amount,
            currency: payload.currency.toUpperCase(),
            reference: payload.reference,
            type: "RECHARGE",
            status: "SUCCESS",
        },
    });
};
exports.createRechargeTransaction = createRechargeTransaction;
const listTransactionsByRoom = (roomId, limit) => {
    return prisma_1.default.transaction.findMany({
        where: { roomId },
        orderBy: { createdAt: "desc" },
        take: limit,
    });
};
exports.listTransactionsByRoom = listTransactionsByRoom;
