import { Router } from "express";
import path from "path";

const router = Router();
const swaggerDir = path.resolve(process.cwd(), "swagger");

router.get("/openapi.json", (_req, res) => {
  res.sendFile(path.join(swaggerDir, "openapi.json"));
});

router.get("/", (_req, res) => {
  res.sendFile(path.join(swaggerDir, "index.html"));
});

export default router;
