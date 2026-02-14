"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../utils/errors");
const prisma_1 = __importDefault(require("../utils/prisma"));
const userRepository_1 = require("../repositories/userRepository");
const registerUser = async (email, password, role) => {
    const existing = await (0, userRepository_1.findUserByEmail)(email);
    if (existing) {
        throw new errors_1.AppError("Email already in use", 409);
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 12);
    const user = await prisma_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            role: role || "USER",
        },
    });
    return { id: user.id, email: user.email, role: user.role };
};
exports.registerUser = registerUser;
