"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRefreshToken = exports.getRefreshToken = exports.storeRefreshToken = void 0;
const redis_service_1 = require("../../../common/services/redis/redis.service");
const redisClient = new redis_service_1.RedisService();
const REFRESH_EXPIRE_TIME = 60 * 60 * 24 * 7;
const storeRefreshToken = async (refreshToken, userId) => {
    await redisClient.set(`refresh:${refreshToken}`, userId, REFRESH_EXPIRE_TIME);
};
exports.storeRefreshToken = storeRefreshToken;
const getRefreshToken = async (refreshToken) => {
    return await redisClient.get(`refresh:${refreshToken}`);
};
exports.getRefreshToken = getRefreshToken;
const deleteRefreshToken = async (refreshToken) => {
    await redisClient.del(`refresh:${refreshToken}`);
};
exports.deleteRefreshToken = deleteRefreshToken;
