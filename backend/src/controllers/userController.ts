import { Request, Response, NextFunction } from "express";
import { listUsers } from "../repositories/userRepository";

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await listUsers();
    res.status(200).json({ status: "success", data: users });
  } catch (err) {
    next(err);
  }
};
