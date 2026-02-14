import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { registerUser } from "../services/registerService";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body as {
      email?: string;
      password?: string;
      role?: "ADMIN" | "USER";
    };

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    if (role && role !== "ADMIN" && role !== "USER") {
      throw new AppError("Invalid role", 400);
    }

    const user = await registerUser(email, password, role);

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
};
