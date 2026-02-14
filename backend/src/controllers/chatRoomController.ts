import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { findOrCreateRoom } from "../repositories/chatRoomRepository";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, adminId } = req.body as { userId?: string; adminId?: string };

    if (!userId || !adminId) {
      throw new AppError("userId and adminId are required", 400);
    }

    const room = await findOrCreateRoom(userId, adminId);

    res.status(200).json({ status: "success", data: room });
  } catch (err) {
    next(err);
  }
};
