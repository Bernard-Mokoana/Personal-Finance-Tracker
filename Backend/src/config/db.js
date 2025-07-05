import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.log("MongoBD Connection error", error);
    process.exit(1);
  }
};

export default connectDB;
