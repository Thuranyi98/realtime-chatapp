import { Request, Response, NextFunction } from "express";
import { fetchMessages } from "../services/messageService";
import { AppError } from "../utils/errors";

export const getMessageHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomId = req.query.roomId as string | undefined;
    const limitRaw = req.query.limit as string | undefined;
    const cursor = req.query.cursor as string | undefined;

    if (!roomId) {
      throw new AppError("roomId is required", 400);
    }

    const limit = Math.min(Math.max(parseInt(limitRaw || "20", 10), 1), 100);

    const result = await fetchMessages(roomId, limit, cursor);

    res.status(200).json({
      status: "success",
      data: result.messages,
      nextCursor: result.nextCursor,
    });
  } catch (err) {
    next(err);
  }
};
