import { CustomRequest, ResponseTemplate, getResponseTemplate } from "../lib/index.js";
import { verifyToken } from "../lib/index.js";
import { Response } from "express";
import Blog from "../db/schemas/blog.js";
import User from "../db/schemas/user.js";
import { v4 as uuid } from "uuid";
import { BlogCreationDTO, BlogDeleteDTO, BlogUpdateDTO } from "../types/blog.js";
export const createBlogController = async (req: CustomRequest<BlogCreationDTO, unknown>, res: Response) => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const payload = req.body;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken<{ id: string }>(token as string);
      payload.id = uuid();
      if (decoded?.id) {
        const user = await User.findOne({ id: decoded?.id });
        await Blog.create({
          id: payload.id,
          uid: decoded?.id,
          title: payload.title,
          body: payload.body,
          author: {
            name: user?.name,
            surname: user?.surname,
          },
        });
      }
    }
    result.data.message = "Blog added successfully";
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

export const deleteBlogController = async (req: CustomRequest<unknown, BlogDeleteDTO>, res: Response) => {
  const result: ResponseTemplate = getResponseTemplate();
  const payload = req.params;
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken<{ id: string }>(token as string);
      if (decoded?.id) {
        const currentBlog = await Blog.findOne({ uid: decoded?.id, id: payload.id });
        if (currentBlog) {
          await Blog.deleteOne({ id: payload.id });
          result.data.message = `Blog  with id-${payload.id} deleted succesully`;
        } else {
          result.meta.error = { code: 4010, message: "unauthorized" };
          result.meta.status = 401;
        }
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

export const updateBlogInfoController = async (req: CustomRequest<BlogUpdateDTO, unknown>, res: Response) => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const payload = req.body;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken<{ id: string }>(token as string);
      if (decoded?.id) {
        if (payload.title) {
          const updatedBlog = await Blog.findOneAndUpdate(
            { id: payload.id, uid: decoded.id },
            { title: payload.title },
          );
          if (!updatedBlog) {
            result.meta.error = { code: 4010, message: "unauthorized" };
            result.meta.status = 401;
          }
        }
        if (payload.body) {
          const updatedBlog = await Blog.findOneAndUpdate({ id: payload.id, uid: decoded.id }, { body: payload.body });
          if (!updatedBlog) {
            result.meta.error = { code: 4010, message: "unauthorized" };
            result.meta.status = 401;
          }
        }
      }
      result.data.message = `Blog  with id-${payload.id} updated  succesully`;
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
