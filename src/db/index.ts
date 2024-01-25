import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  const uri = "mongodb://127.0.0.1:27017/blog-platform";

  try {
    await mongoose.connect(uri);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("connection error:", error);
  }
};

export default connectToDatabase;
