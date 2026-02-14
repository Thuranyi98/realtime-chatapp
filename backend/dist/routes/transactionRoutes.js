"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
const protect_1 = require("../middlewares/protect");
const router = (0, express_1.Router)();
router.post("/recharge", protect_1.protect, transactionController_1.recharge);
router.get("/", protect_1.protect, transactionController_1.listTransactions);
exports.default = router;
