"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMessages = exports.sendMessage = void 0;
const errors_1 = require("../utils/errors");
const messageRepository_1 = require("../repositories/messageRepository");
const chatRoomRepository_1 = require("../repositories/chatRoomRepository");
const sendMessage = async (payload) => {
    const room = await (0, chatRoomRepository_1.findRoomById)(payload.roomId);
    if (!room) {
        throw new errors_1.AppError("Chat room not found", 404);
    }
    const participants = [room.userId, room.adminId];
    const senderInRoom = participants.includes(payload.senderId);
    const receiverInRoom = participants.includes(payload.receiverId);
    if (!senderInRoom || !receiverInRoom) {
        throw new errors_1.AppError("Sender/receiver does not belong to this room", 403);
    }
    if (payload.senderId === payload.receiverId) {
        throw new errors_1.AppError("Sender and receiver cannot be the same user", 400);
    }
    return (0, messageRepository_1.createMessage)(payload);
};
exports.sendMessage = sendMessage;
const fetchMessages = async (roomId, limit, cursor) => {
    if (!roomId) {
        throw new errors_1.AppError("roomId is required", 400);
    }
    return (0, messageRepository_1.getMessages)({ roomId, limit, cursor });
};
exports.fetchMessages = fetchMessages;
