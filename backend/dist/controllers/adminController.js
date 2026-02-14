"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmins = void 0;
const userRepository_1 = require("../repositories/userRepository");
const getAdmins = async (_req, res, next) => {
    try {
        const admins = await (0, userRepository_1.listAdmins)();
        res.status(200).json({ status: "success", data: admins });
    }
    catch (err) {
        next(err);
    }
};
exports.getAdmins = getAdmins;
