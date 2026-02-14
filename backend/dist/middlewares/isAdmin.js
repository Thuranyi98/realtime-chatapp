"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const errors_1 = require("../utils/errors");
const isAdmin = (req, _res, next) => {
    if (!req.user) {
        return next(new errors_1.AppError("Unauthorized", 401));
    }
    if (req.user.role !== "ADMIN") {
        return next(new errors_1.AppError("Admin access only", 403));
    }
    next();
};
exports.isAdmin = isAdmin;
