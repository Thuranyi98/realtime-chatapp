"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const authService_1 = require("../services/authService");
const errors_1 = require("../utils/errors");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new errors_1.AppError("Email and password are required", 400);
        }
        const result = await (0, authService_1.loginUser)(email, password);
        res.status(200).json({
            status: "success",
            token: result.token,
            role: result.role,
            userId: result.userId,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
