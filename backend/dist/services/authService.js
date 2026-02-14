"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../utils/errors");
const userRepository_1 = require("../repositories/userRepository");
const jwt_1 = require("../utils/jwt");
const loginUser = async (email, password) => {
    const user = await (0, userRepository_1.findUserByEmail)(email);
    if (!user) {
        throw new errors_1.AppError("Invalid email or password", 401);
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new errors_1.AppError("Invalid email or password", 401);
    }
    const token = (0, jwt_1.signToken)({ id: user.id, role: user.role });
    return {
        token,
        role: user.role,
        userId: user.id,
    };
};
exports.loginUser = loginUser;
