import prisma from "../utils/prisma";

export const createMessage = (data: {
  content: string;
  senderId: string;
  receiverId: string;
  roomId: string;
}) => {
  return prisma.message.create({
    data,
  });
};

export const getMessages = async (params: {
  roomId: string;
  limit: number;
  cursor?: string;
}) => {
  const { roomId, limit, cursor } = params;

  const messages = await prisma.message.findMany({
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
