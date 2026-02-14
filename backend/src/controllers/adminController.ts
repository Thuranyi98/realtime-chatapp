import { Request, Response, NextFunction } from "express";
import { listAdmins } from "../repositories/userRepository";

export const getAdmins = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const admins = await listAdmins();
    res.status(200).json({ status: "success", data: admins });
  } catch (err) {
    next(err);
  }
};
