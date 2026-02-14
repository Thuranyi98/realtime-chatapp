"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const registerController_1 = require("../controllers/registerController");
const router = (0, express_1.Router)();
router.post("/login", authController_1.login);
router.post("/register", registerController_1.register);
exports.default = router;
