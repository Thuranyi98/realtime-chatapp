"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.createMessage = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createMessage = (data) => {
    return prisma_1.default.message.create({
        data,
    });
};
exports.createMessage = createMessage;
const getMessages = async (params) => {
    const { roomId, limit, cursor } = params;
    const messages = await prisma_1.default.message.findMany({
        where: { roomId },
        orderBy: { timestamp: "desc" },
        take: limit + 1,
        ...(cursor
            ? {
                cursor: { id: cursor },
                skip: 1,
            }
            : {}),
    });
    const hasNextPage = messages.length > limit;
    const sliced = hasNextPage ? messages.slice(0, -1) : messages;
    const nextCursor = hasNextPage ? sliced[sliced.length - 1]?.id : null;
    return { messages: sliced, nextCursor };
};
exports.getMessages = getMessages;
