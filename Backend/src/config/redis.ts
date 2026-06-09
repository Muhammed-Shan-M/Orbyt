import Redis from "ioredis";
import { ENV } from "./env";
import { ERROR_MESSAGES } from "../common/constands/error-message.constands";
import logger from "../common/logger/logger";

if (!ENV.REDIS_URL) {
  throw new Error(ERROR_MESSAGES.GENERAL.SERVER_ERROR);
}


const redis = new Redis(ENV.REDIS_URL, {

  retryStrategy(times) {
    logger.info(`Redis reconnect attempt: ${times}`);


    if (times > 5) {
      logger.error("Redis reconnect stopped");
      return null;
    }

    return 2000;
  },
});


redis.on("connect", () => logger.info("Redis connected"));
redis.on("error", (err) => logger.error("Redis error:", err));

export default redis;