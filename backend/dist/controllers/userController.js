"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const userRepository_1 = require("../repositories/userRepository");
const getUsers = async (_req, res, next) => {
    try {
        const users = await (0, userRepository_1.listUsers)();
        res.status(200).json({ status: "success", data: users });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsers = getUsers;
