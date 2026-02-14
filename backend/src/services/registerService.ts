import bcrypt from "bcryptjs";
import { AppError } from "../utils/errors";
import prisma from "../utils/prisma";
import { findUserByEmail } from "../repositories/userRepository";

export const registerUser = async (email: string, password: string, role?: "ADMIN" | "USER") => {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new AppError("Email already in use", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || "USER",
    },
  });

  return { id: user.id, email: user.email, role: user.role };
};
