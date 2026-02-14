"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const swaggerDir = path_1.default.resolve(process.cwd(), "swagger");
router.get("/openapi.json", (_req, res) => {
    res.sendFile(path_1.default.join(swaggerDir, "openapi.json"));
});
router.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(swaggerDir, "index.html"));
});
exports.default = router;
