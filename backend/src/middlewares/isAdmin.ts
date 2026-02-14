import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export const isAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  if (req.user.role !== "ADMIN") {
    return next(new AppError("Admin access only", 403));
  }

  next();
};
