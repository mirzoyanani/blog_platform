import mongoose, { Schema, Model } from "mongoose";
import { UserDocument } from "../lib/index.js";

const userSchema = new Schema({
  name: String,
  age: Number,
});

const userModel: Model<UserDocument> = mongoose.model<UserDocument>("users", userSchema);

export default userModel;
