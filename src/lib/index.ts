import { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInfoDTO {
  uid?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
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
