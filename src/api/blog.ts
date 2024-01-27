import { Router } from "express";
import {
  createBlogController,
  getBlogsController,
  deleteBlogController,
  updateBlogInfoController,
} from "../controllers/blog.js";
import validator from "../middlewares/validator/index.js";
const router: Router = Router();

router.post("", validator("blog"), createBlogController);
router.get("", getBlogsController);
router.delete("/:id", deleteBlogController);
router.put("", updateBlogInfoController);

export default router;
