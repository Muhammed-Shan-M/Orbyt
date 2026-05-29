"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const env_1 = require("../../config/env");
const isProd = env_1.ENV.NODE_ENV === "production";
const logger = winston_1.default.createLogger({
    level: isProd ? "info" : "debug",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), isProd
        ? winston_1.default.format.json()
        : winston_1.default.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),
        new winston_1.default.transports.File({
            filename: "logs/combined.log"
        })
    ]
});
exports.default = logger;
