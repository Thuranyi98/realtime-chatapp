"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAdmins = exports.listUsers = exports.findUserById = exports.findUserByEmail = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const findUserByEmail = (email) => {
    return prisma_1.default.user.findUnique({ where: { email } });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => {
    return prisma_1.default.user.findUnique({ where: { id } });
};
exports.findUserById = findUserById;
const listUsers = () => {
    return prisma_1.default.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
    });
};
exports.listUsers = listUsers;
const listAdmins = () => {
    return prisma_1.default.user.findMany({
        where: { role: "ADMIN" },
        select: { id: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
    });
};
exports.listAdmins = listAdmins;
