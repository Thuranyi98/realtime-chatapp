"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRoomById = exports.findOrCreateRoom = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const findOrCreateRoom = async (userId, adminId) => {
    const existing = await prisma_1.default.chatRoom.findUnique({
        where: { userId_adminId: { userId, adminId } },
    });
    if (existing)
        return existing;
    return prisma_1.default.chatRoom.create({
        data: { userId, adminId },
    });
};
exports.findOrCreateRoom = findOrCreateRoom;
const findRoomById = (roomId) => {
    return prisma_1.default.chatRoom.findUnique({ where: { id: roomId } });
};
exports.findRoomById = findRoomById;
