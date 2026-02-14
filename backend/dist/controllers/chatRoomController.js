"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = void 0;
const errors_1 = require("../utils/errors");
const chatRoomRepository_1 = require("../repositories/chatRoomRepository");
const createRoom = async (req, res, next) => {
    try {
        const { userId, adminId } = req.body;
        if (!userId || !adminId) {
            throw new errors_1.AppError("userId and adminId are required", 400);
        }
        const room = await (0, chatRoomRepository_1.findOrCreateRoom)(userId, adminId);
        res.status(200).json({ status: "success", data: room });
    }
    catch (err) {
        next(err);
    }
};
exports.createRoom = createRoom;
