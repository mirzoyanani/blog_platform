import { Router } from "express";
import { createBlogController, getBlogsController } from "../controllers/blog.js";
import { authorize } from "../middlewares/authorization.js";
import validator from "../middlewares/validator/index.js";
const router: Router = Router();

router.post("", authorize, validator("blog"), createBlogController);
router.get("", getBlogsController);
router;

export default router;
