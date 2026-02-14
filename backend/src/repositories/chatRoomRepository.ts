import prisma from "../utils/prisma";

export const findOrCreateRoom = async (userId: string, adminId: string) => {
  const existing = await prisma.chatRoom.findUnique({
    where: { userId_adminId: { userId, adminId } },
  });
  if (existing) return existing;

  return prisma.chatRoom.create({
    data: { userId, adminId },
  });
};

export const findRoomById = (roomId: string) => {
  return prisma.chatRoom.findUnique({ where: { id: roomId } });
};
