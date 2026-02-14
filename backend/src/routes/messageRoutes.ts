import { Router } from "express";
import { getMessageHistory } from "../controllers/messageController";
import { protect } from "../middlewares/protect";

const router = Router();

router.get("/history", protect, getMessageHistory);

export default router;
