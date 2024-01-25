import { Document } from "mongoose";

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
