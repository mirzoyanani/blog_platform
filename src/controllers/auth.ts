import { v4 as uuid } from "uuid";
import { _EMAIL_EXISTS_, _WRONG_LOGIN_OR_PASSWORD } from "../helpers/err-codes.js";
import { getResponseTemplate, ResponseTemplate, hashingString, UserInfoDTO } from "../lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../db/schemas/user.js";

export const registerController = async (req: Request<unknown, unknown, UserInfoDTO>, res: Response): Promise<void> => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const payload = req.body;
    payload.uid = uuid();
    payload.password = await hashingString(payload.password);

    const dublicate = await User.findOne({ email: payload.email }).exec();
    if (dublicate) {
      throw _EMAIL_EXISTS_;
    }
    await User.create({
      id: payload.uid,
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      password: payload.password,
    });

    result.data.message = "User registered successfully";
  } catch (err: any) {
    result.meta.error = {
      code: err.code || 500,
      message: err.message || "Unknown Error",
    };
    result.meta.status = err.status || 500;
  }
  res.status(result.meta.status).json(result);
};

interface LoginDto {
  email: string;
  password: string;
}

export const loginController = async (req: Request<unknown, unknown, LoginDto>, res: Response): Promise<void> => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const payload = req.body;
    const currentUser = await User.findOne({ email: payload.email });
    if (!currentUser) {
      throw _WRONG_LOGIN_OR_PASSWORD;
    }
    const isPasswordCorrect = await bcrypt.compare(payload.password, currentUser.password);
    if (!isPasswordCorrect) {
      throw _WRONG_LOGIN_OR_PASSWORD;
    }
    const token = jwt.sign({ uid: currentUser.id }, process.env.SECRET_KEY as string, {
      expiresIn: 60 * 60 * 24 * 365,
    });
    result.data.token = token;
  } catch (err: any) {
    result.meta.error = {
      code: err.code || err.errCode || 5000,
      message: err.message || err.errMessage || "Unknown Error",
    };
    result.meta.status = err.status || err.statusCode || 500;
  }

  res.status(result.meta.status).json(result);
};
