import { Router } from "express";
import { createRoom } from "../controllers/chatRoomController";
import { protect } from "../middlewares/protect";

const router = Router();

router.post("/", protect, createRoom);

export default router;
