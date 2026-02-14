import { Router } from "express";
import { getUsers } from "../controllers/userController";
import { getAdmins } from "../controllers/adminController";
import { protect } from "../middlewares/protect";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get("/", protect, isAdmin, getUsers);
router.get("/admins", protect, getAdmins);

export default router;
