import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const userSchema: Schema<UserDocument> = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
