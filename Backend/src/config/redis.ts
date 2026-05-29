import Redis from "ioredis";
import { ENV } from "./env";
import { ERROR_MESSAGES } from "../common/constands/error-message.constands";

if (!ENV.REDIS_URL) {
  throw new Error(ERROR_MESSAGES.GENERAL.SERVER_ERROR);
}


const redis = new Redis(ENV.REDIS_URL, {

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

export default redis;