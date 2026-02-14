import { AppError } from "../utils/errors";
import { createMessage, getMessages } from "../repositories/messageRepository";
import { findRoomById } from "../repositories/chatRoomRepository";

export const sendMessage = async (payload: {
  content: string;
  senderId: string;
  receiverId: string;
  roomId: string;
}) => {
  const room = await findRoomById(payload.roomId);
  if (!room) {
    throw new AppError("Chat room not found", 404);
  }

  const participants = [room.userId, room.adminId];
  const senderInRoom = participants.includes(payload.senderId);
  const receiverInRoom = participants.includes(payload.receiverId);

  if (!senderInRoom || !receiverInRoom) {
    throw new AppError("Sender/receiver does not belong to this room", 403);
  }

  if (payload.senderId === payload.receiverId) {
    throw new AppError("Sender and receiver cannot be the same user", 400);
  }

  return createMessage(payload);
};

export const fetchMessages = async (roomId: string, limit: number, cursor?: string) => {
  if (!roomId) {
    throw new AppError("roomId is required", 400);
  }
  return getMessages({ roomId, limit, cursor });
};
