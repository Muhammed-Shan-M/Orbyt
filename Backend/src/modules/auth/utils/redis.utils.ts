
// import { RedisService } from "../../../common/services/redis/redis.service";
import { redisService } from "../../../common/services/redis/redis.instance";

const redisClient = redisService;

const REFRESH_EXPIRE_TIME = 60 * 60 * 24 * 7;

export const storeRefreshToken = async (refreshToken: string, userId: string) => {

  await redisClient.set<string>(
    `refresh:${refreshToken}`,
    userId,
    REFRESH_EXPIRE_TIME,
  );

  await redisService.sadd(
    `user-refresh:${userId}`,
    refreshToken
  );

  await redisService.expire(
    `user-refresh:${userId}`,
    REFRESH_EXPIRE_TIME
  );

};

export const getRefreshToken = async (refreshToken: string) => {
  return await redisClient.get<string>(
    `refresh:${refreshToken}`
  );
};


export const deleteRefreshToken = async (refreshToken: string) => {

  const userId = await redisService.get<string>(
      `refresh:${refreshToken}`
    );

  if (userId) {
    await redisService.srem(
      `user-refresh:${userId}`,
      refreshToken
    );
  }

  await redisClient.del(
    `refresh:${refreshToken}`
  );
};



export const deleteAllUserRefreshTokens =
  async (userId: string) => {

    const refreshTokens = await redisService.smembers(
        `user-refresh:${userId}`
      );

    for (const token of refreshTokens) {
      await redisService.del(
        `refresh:${token}`
      );
    }

    await redisService.del(
      `user-refresh:${userId}`
    );
};