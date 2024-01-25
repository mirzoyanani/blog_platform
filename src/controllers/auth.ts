import userModel from "../db/user.js";
import { getResponseTemplate, ResponseTemplate } from "../lib/index.js";
import { Request, Response } from "express";
import User from "../db/schemas.js";
export const registerController = async (req: Request, res: Response): Promise<void> => {
  const result: ResponseTemplate = getResponseTemplate();
  try {
    const payload = req.body;
    //   payload.uid = uuid();
    //   payload.profilePicture = req.file?.filename;
    //   payload.password = await hashingString(payload.password);
    //   if (!isValidPhoneNumber(payload.telephone)) {
    //     throw _WRONG_TELEPHONE_NUMBER_;
    //   }
    //   const emailExists = await isEmailInUse(payload.email);

    //   if (emailExists) {
    //     throw _EMAIL_EXISTS_;
    //   }
    //   await registerUser(payload);
    const newUser = await User.create({
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      password: payload.password,
    });
    console.log(newUser);

    const users = await userModel.find({});
    result.data.items = users;

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
