import mongoose from "mongoose";
import { ENV } from '../../config/env'
import logger from "../logger/logger";


export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DB_URL);
    logger.info("Database connected");
  } catch (error) {
    logger.error("DB connection failed:", error);
    process.exit(1);
  }
};