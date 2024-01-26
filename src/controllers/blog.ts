import { CustomRequest, BlogCreationDTO, ResponseTemplate, getResponseTemplate } from "../lib/index.js";
import { Response } from "express";
import { v4 as uuid } from "uuid";
import Blog from "../db/schemas/blog.js";
import User from "../db/schemas/user.js";

export const createBlogController = async (req: CustomRequest<BlogCreationDTO, unknown>, res: Response) => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const payload = req.body;
    payload.id = uuid();
    if (req.decoded?.id) {
      const user = await User.findOne({ id: req.decoded?.id });
      await Blog.create({
        id: payload.id,
        title: payload.title,
        body: payload.body,
        author: user?.name + " " + user?.surname,
      });

      result.data.message = "Blog added successfully";
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
export const getBlogsController = async (req: CustomRequest, res: Response) => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const blogs = await Blog.find({});
    const extractedBlogs = blogs.map(({ title, body, author, creation_date, update_date, id }) => ({
      title,
      body,
      author,
      creation_date,
      update_date,
      id,
    }));
    result.data.items = extractedBlogs;
  } catch (err: any) {
    result.meta.error = {
      code: err.code || err.errCode || 500,
      message: err.message || err.errMessage || "Unknown Error",
    };
    result.meta.status = err.status || err.statusCode || 500;
  }
  res.status(result.meta.status).json(result);
};
