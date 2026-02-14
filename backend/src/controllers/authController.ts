import { Request, Response, NextFunction } from "express";
import { loginUser } from "../services/authService";
import { AppError } from "../utils/errors";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const result = await loginUser(email, password);
    res.status(200).json({
      status: "success",
      token: result.token,
      role: result.role,
      userId: result.userId,
    });
  } catch (err) {
    next(err);
  }
};
