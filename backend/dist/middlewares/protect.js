"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const errors_1 = require("../utils/errors");
const jwt_1 = require("../utils/jwt");
const userRepository_1 = require("../repositories/userRepository");
const protect = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new errors_1.AppError("Authorization token missing", 401);
        }
        const token = authHeader.split(" ")[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        const userId = decoded.id;
        if (!userId) {
            throw new errors_1.AppError("Invalid token", 401);
        }
        const user = await (0, userRepository_1.findUserById)(userId);
        if (!user) {
            throw new errors_1.AppError("User not found", 401);
        }
        req.user = { id: user.id, role: user.role };
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.protect = protect;
