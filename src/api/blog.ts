import { Router } from "express";
import {
  createBlogController,
  getBlogsController,
  deleteBlogController,
  updateBlogInfoController,
} from "../controllers/blog.js";
import { authorize } from "../middlewares/authorization.js";
import validator from "../middlewares/validator/index.js";
const router: Router = Router();

router.post("", validator("blog"), createBlogController);
router.get("", getBlogsController);
router.delete("/:id", authorize, deleteBlogController);
router.put("", updateBlogInfoController);
router;

export default router;
