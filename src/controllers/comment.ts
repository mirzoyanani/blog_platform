import { ResponseTemplate, getResponseTemplate, CustomRequest, verifyToken } from "../lib/index.js";
import { CommentDTO } from "../types/comment.js";
import Comment from "../db/schemas/comment.js";
import Blog from "../db/schemas/blog.js";
import { v4 as uuid } from "uuid";
import { Response } from "express";

export const createCommentController = async (req: CustomRequest<CommentDTO, unknown>, res: Response) => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const payload = req.body;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken<{ id: string }>(token as string);
      payload.id = uuid();
      if (decoded?.id) {
        await Comment.create({
          id: payload.id,
          blogId: payload.blogId,
          uid: decoded?.id,
          body: payload.body,
        });
      }
      result.data.message = "Comment added successfully";
    } else {
      result.meta.error = { code: 4012, message: "Authorization header missing or invalid" };
      result.meta.status = 401;
    }
  } catch (err: any) {
    result.meta.error = {
      code: err.code || err.errCode || 500,
      message: err.message || err.errMessage || "Unknown Error",
    };
    result.meta.status = err.status || err.statusCode || 500;
  }
  res.status(result.meta.status).json(result);
};
export const getCommentsController = async (req: CustomRequest<unknown, CommentDTO>, res: Response) => {
  const result: ResponseTemplate = getResponseTemplate();
  const payload = req.params;
  try {
    const blog = await Blog.findOne({ id: payload.id });

    if (!blog) {
      result.meta.error = { code: 4010, message: "Unauthorized" };
      result.meta.status = 401;
    } else {
      const comments = await Comment.find({ blogId: payload.id });
      const extractedComments = comments.map(({ id, body }) => ({
        body,
        id,
      }));
      if (extractedComments.length) {
        result.data.items = extractedComments;
      }
    }
  } catch (err: any) {
    result.meta.error = {
      code: err.code || err.errCode || 500,
      message: err.message || err.errMessage || "Unknown Error",
    };
    result.meta.status = err.status || err.statusCode || 500;
  }
  res.status(result.meta.status).json(result);
};
export const deleteCommentController = async (req: CustomRequest<unknown, CommentDTO>, res: Response) => {
  const result: ResponseTemplate = getResponseTemplate();
  const payload = req.params;
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken<{ id: string }>(token as string);
      if (decoded?.id) {
        const currentComment = await Comment.findOne({ uid: decoded.id, id: payload.id });
        if (currentComment) {
          await Comment.deleteOne({ id: payload.id });
          result.data.message = `Comment with id ${payload.id} deleted successfully`;
        }
      } else {
        result.meta.error = { code: 4011, message: "Invalid token" };
        result.meta.status = 401;
      }
    } else {
      result.meta.error = { code: 4012, message: "Authorization header missing or invalid" };
      result.meta.status = 401;
    }
  } catch (err: any) {
    result.meta.error = {
      code: err.code || err.errCode || 500,
      message: err.message || err.errMessage || "Unknown Error",
    };
    result.meta.status = err.status || err.statusCode || 500;
  }
  res.status(result.meta.status).json(result);
};
