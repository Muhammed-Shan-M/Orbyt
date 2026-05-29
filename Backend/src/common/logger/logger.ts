import winston from "winston";
import { ENV } from "../../config/env";

const isProd = ENV.NODE_ENV === "production";

const logger = winston.createLogger({
  level: isProd ? "info" : "debug",

  format: winston.format.combine(
    winston.format.timestamp(),

    isProd
      ? winston.format.json()
      : winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
  ),

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),

    new winston.transports.File({
      filename: "logs/combined.log"
    })
  ]
});

export default logger;