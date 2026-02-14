"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const errors_1 = require("../utils/errors");
const registerService_1 = require("../services/registerService");
const register = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            throw new errors_1.AppError("Email and password are required", 400);
        }
        if (role && role !== "ADMIN" && role !== "USER") {
            throw new errors_1.AppError("Invalid role", 400);
        }
        const user = await (0, registerService_1.registerUser)(email, password, role);
        res.status(201).json({ status: "success", data: user });
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
