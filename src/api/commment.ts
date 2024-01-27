import { Router } from "express";
import { createCommentController, getCommentsController, deleteCommentController } from "../controllers/comment.js";
import validator from "../middlewares/validator/index.js";
const router: Router = Router();

router.post("", validator("comment"), createCommentController);
router.get("/:id", getCommentsController);
router.delete("/:id", deleteCommentController);

router;

export default router;
