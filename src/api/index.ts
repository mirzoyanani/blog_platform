import auth_router from "./auth.js";
import express, { Request, Response } from "express";

const setupRoutes = (app: express.Application) => {
  app.use("/auth", auth_router);
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
      message: "Request URL does not exist",
    });
  });
};

export default setupRoutes;
