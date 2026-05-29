"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("./env");
const error_message_constands_1 = require("../common/constands/error-message.constands");
if (!env_1.ENV.REDIS_URL) {
    throw new Error(error_message_constands_1.ERROR_MESSAGES.GENERAL.SERVER_ERROR);
}
const redis = new ioredis_1.default(env_1.ENV.REDIS_URL, {
    retryStrategy(times) {
        console.log(`Redis reconnect attempt: ${times}`);
        if (times > 5) {
            console.log("Redis reconnect stopped");
            return null;
        }
        return 2000;
    },
});
redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));
exports.default = redis;
