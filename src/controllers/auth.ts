import { v4 as uuid } from "uuid";
import {
  _EMAIL_EXISTS_,
  _WRONG_LOGIN_OR_PASSWORD,
  _USER_NOT_FOUND_,
  _RESET_CODE_IS_WRONG_,
} from "../helpers/err-codes.js";
import { getResponseTemplate, ResponseTemplate, hashingString, sendEmail, CustomRequest } from "../lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../db/schemas/user.js";
import { UserInfoDTO, LoginDto, CodeDTO, PasswordDTO, ForgetPasswordDTO } from "../types/auth.js";
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
    const token = jwt.sign({ id: currentUser.id }, process.env.SECRET_KEY as string, {
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

export const forgetPasswordController = async (
  req: Request<unknown, unknown, ForgetPasswordDTO>,
  res: Response,
): Promise<void> => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const payload = req.body;
    const currentUser = await User.findOne({ email: payload.email });
    if (!currentUser) {
      throw _USER_NOT_FOUND_;
    }
    const randomCode = Math.floor(Math.random() * (100000 - 999999 + 1)) + 999999;
    const codeForJwt = await hashingString(randomCode.toString());
    const token = jwt.sign(
      {
        id: currentUser.id,
        code: codeForJwt,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: 60 * 60 * 24 * 365 },
    );
    await sendEmail(req.body.email, "RESET CODE", randomCode);
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

export const checkCodeController = async (req: CustomRequest<CodeDTO, unknown>, res: Response): Promise<void> => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const { code } = req.body;

    if (!req.decoded || !req.decoded.code) {
      throw new Error("Սխալ հարցում"); // wthellll
    }
    const compared = await bcrypt.compare(code, req.decoded.code);

    if (!compared) {
      throw _RESET_CODE_IS_WRONG_;
    }

    const currentUser = await User.findOne({ id: req.decoded.id });

    if (!currentUser) {
      throw { status: 406, message: "Wrong params" };
    }

    const newToken = jwt.sign(
      {
        id: currentUser.id,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: 60 * 60 * 24 * 365 },
    );

    result.data.token = newToken;
  } catch (err: any) {
    result.meta.error = {
      code: err.code || err.errCode || 5000,
      message: err.message || err.errMessage || "Unknown Error",
    };
    result.meta.status = err.status || err.statusCode || 500;
  }

  res.status(result.meta.status).json(result);
};

export const resetPasswordController = async (
  req: CustomRequest<PasswordDTO, unknown>,
  res: Response,
): Promise<void> => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    if (!req.decoded) {
      throw new Error("Սխալ հարցում");
    }
    const newPassword = await hashingString(req.body.password);
    await User.findOneAndUpdate({ id: req.decoded.id }, { password: newPassword });

    result.data.message = "Password updated successfully";
  } catch (err: any) {
    result.meta.error = {
      code: err.code || err.errCode || 5000,
      message: err.message || err.errMessage || "Unknown Error",
    };
    result.meta.status = err.status || err.statusCode || 500;
  }

  res.status(result.meta.status).json(result);
};
