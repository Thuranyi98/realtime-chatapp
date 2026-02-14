"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatRoomController_1 = require("../controllers/chatRoomController");
const protect_1 = require("../middlewares/protect");
const router = (0, express_1.Router)();
router.post("/", protect_1.protect, chatRoomController_1.createRoom);
exports.default = router;
