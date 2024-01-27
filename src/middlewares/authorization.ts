import { Response, NextFunction } from "express";
import { ResponseTemplate, verifyToken } from "../lib/index.js";
import { getResponseTemplate } from "../lib/index.js";
import { CustomRequest } from "../lib/index.js";

export const authorize = (req: CustomRequest, res: Response, next: NextFunction) => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        result.meta.error = { code: 4010, message: "Invalid token" };
        result.meta.status = 401;
        throw 1;
      }
      const decoded = verifyToken<{ id: string; code?: string }>(token as string);
      req.decoded = decoded;
    }

    next();
  } catch (e) {
    return res.status(result.meta.status).json(result);
  }
};
