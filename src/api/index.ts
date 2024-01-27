import auth_router from "./auth.js";
import blog_router from "./blog.js";
import express, { Request, Response } from "express";

const setupRoutes = (app: express.Application) => {
  app.use("/auth", auth_router);
  app.use("/blog", blog_router);

  app.use("*", (_req: Request, res: Response) => {
    res.status(404).json({
      message: "Request URL does not exist",
    });
  });
};

export default setupRoutes;
