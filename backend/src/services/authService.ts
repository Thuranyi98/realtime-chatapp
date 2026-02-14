import bcrypt from "bcryptjs";
import { AppError } from "../utils/errors";
import { findUserByEmail } from "../repositories/userRepository";
import { signToken } from "../utils/jwt";

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signToken({ id: user.id, role: user.role });

  return {
    token,
    role: user.role,
    userId: user.id,
  };
};
