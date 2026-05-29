"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../../config/env");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(env_1.ENV.DB_URL);
        console.log("Database connected");
    }
    catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
