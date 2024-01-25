import { Router } from "express";
import { registerController } from "../controllers/auth.js";
const router: Router = Router();

router.post("/register", registerController);

export default router;
