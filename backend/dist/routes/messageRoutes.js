"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const protect_1 = require("../middlewares/protect");
const router = (0, express_1.Router)();
router.get("/history", protect_1.protect, messageController_1.getMessageHistory);
exports.default = router;
