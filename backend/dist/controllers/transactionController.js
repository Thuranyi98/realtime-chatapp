"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTransactions = exports.recharge = void 0;
const errors_1 = require("../utils/errors");
const transactionService_1 = require("../services/transactionService");
const recharge = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errors_1.AppError("Unauthorized", 401);
        }
        const { roomId, amount, currency } = req.body;
        if (!roomId || typeof amount !== "number") {
            throw new errors_1.AppError("roomId and amount are required", 400);
        }
        const transaction = await (0, transactionService_1.processRecharge)({
            roomId,
            amount,
            currency,
            userId: req.user.id,
        });
        res.status(201).json({
            status: "success",
            message: "Recharge successful. Transaction inserted into room database.",
            data: transaction,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.recharge = recharge;
const listTransactions = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new errors_1.AppError("Unauthorized", 401);
        }
        const roomId = req.query.roomId;
        if (!roomId) {
            throw new errors_1.AppError("roomId is required", 400);
        }
        const limitRaw = req.query.limit;
        const limit = Math.min(Math.max(parseInt(limitRaw || "20", 10), 1), 100);
        const transactions = await (0, transactionService_1.getRoomTransactions)(roomId, limit, req.user.id);
        res.status(200).json({
            status: "success",
            data: transactions,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.listTransactions = listTransactions;
