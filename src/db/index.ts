import mongoose from "mongoose";

const connectToDatabase = async () => {
  const uri: string = process.env.DB_HOST || "";

  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("connection error:", error);
  }
};

export default connectToDatabase;
