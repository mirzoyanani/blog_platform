import { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer, { Transporter } from "nodemailer";
import { Request } from "express";

export interface UserInfoDTO {
  uid?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}
export interface BlogCreationDTO {
  id: string;
  title: string;
  body: string;
}

export interface UserDocument extends Document {
  name?: string;
  age?: number;
}
export interface ResponseTemplate {
  meta: {
    error: {
      code: number | null;
      message: string | null;
    } | null;
    status: number;
  };
  data: Record<string, unknown>;
}

export function getResponseTemplate(): ResponseTemplate {
  return {
    meta: {
      error: null,
      status: 200,
    },
    data: {},
  };
}
interface MailConfig {
  email: string;
  emailPassword: string;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}
export interface CorsOptions {
  origin: string;
  credentials: boolean;
}

export async function hashingString(password: string): Promise<string> {
  try {
    const hashSalt: string = await bcrypt.genSalt(10);
    const hashedStr: string = await bcrypt.hash(password + "", hashSalt);
    return hashedStr;
  } catch (err) {
    throw {
      errCode: 500,
      message: err || "Հեշավորումը ավարտվեց անհաջողությամբ",
    };
  }
}
export async function sendEmail(email: string, subject: string, content: number | string): Promise<void> {
  const mailConfig: MailConfig = {
    email: process.env.MY_GOOGLE_MAIL_NAME || "",
    emailPassword: process.env.MY_GOOGLE_MAIL_PASSWORD || "",
  };

  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailConfig.email,
      pass: mailConfig.emailPassword,
    },
  });

  const mailOptions: MailOptions = {
    from: mailConfig.email,
    to: email,
    subject,
    text: content + " ",
  };

  await transporter.sendMail(mailOptions);
}

export interface CustomRequest<TBody = unknown, TParams = unknown> extends Request<TParams, any, TBody> {
  decoded?:
    | {
        code?: string;
        id: string;
      }
    | undefined;
}

export function verifyToken<T extends object = any>(token: string, _secret?: string): T {
  const secret = _secret ?? (process.env.SECRET_KEY as string);
  return jwt.verify(token, secret) as T;
}
