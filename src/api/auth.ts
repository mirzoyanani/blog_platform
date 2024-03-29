import { Router } from "express";
import {
  registerController,
  loginController,
  forgetPasswordController,
  checkCodeController,
  resetPasswordController,
} from "../controllers/auth.js";
import { authorize } from "../middlewares/authorization.js";
import validator from "../middlewares/validator/index.js";
const router: Router = Router();

router.post("/register", validator("register"), registerController);
router.post("/login", validator("login"), loginController);
router.post("/forgot-password", validator("forget_password"), forgetPasswordController);
router.post("/verify-code", authorize, validator("check_code"), checkCodeController);
router.put("/reset-password", authorize, validator("reset_password"), resetPasswordController);

export default router;
