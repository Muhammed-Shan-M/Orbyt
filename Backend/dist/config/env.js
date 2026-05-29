"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    PORT: process.env.PORT || 50000,
    DB_URL: process.env.DB_URL,
    REDIS_URL: process.env.REDIS_URL,
    APP_EMAIL: process.env.APP_EMAIL,
    APP_EMAIL_PASS: process.env.APP_EMAIL_PASS,
    BASE_URL: process.env.BASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
