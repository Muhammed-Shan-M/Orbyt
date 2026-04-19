import mongoose from "mongoose";
import { ENV } from '../../config/env'


export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};