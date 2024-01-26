import { Router } from "express";
import { createBlogController, getBlogsController } from "../controllers/blog.js";
import { authorize } from "../middlewares/authorization.js";
import validator from "../middlewares/validator/index.js";
const router: Router = Router();

router.post("", authorize, validator("blog"), createBlogController);
router.get("", getBlogsController);
// router.post("/forgetPassword", validator("forget_password"), forgetPasswordController);
// router.post("/submitCode", authorize, validator("check_code"), checkCodeController);
// router.put("/resetPassword", authorize, validator("reset_password"), resetPasswordController);

export default router;
