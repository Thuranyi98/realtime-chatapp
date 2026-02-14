import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { verifyToken } from "../utils/jwt";
import { findUserById } from "../repositories/userRepository";

export const protect = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authorization token missing", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const userId = decoded.id as string | undefined;

    if (!userId) {
      throw new AppError("Invalid token", 401);
    }

    const user = await findUserById(userId);
    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    next(err);
  }
};
