import { Response, NextFunction } from "express";
import { ResponseTemplate, verifyToken } from "../lib/index.js";
import { getResponseTemplate } from "../lib/index.js";
import { CustomRequest } from "../lib/index.js";

export const authorize = (req: CustomRequest, res: Response, next: NextFunction) => {
  const result: ResponseTemplate = getResponseTemplate();
  const { token } = req.headers;
  if (!token) {
    result.data.message = "Token is missing";
    result.meta.status = 401;
  }
  try {
    const decoded = verifyToken<{ id: string; code?: string }>(token as string);
    req.decoded = decoded;

    next();
  } catch (e) {
    return res.status(result.meta.status).json(result);
  }
};
