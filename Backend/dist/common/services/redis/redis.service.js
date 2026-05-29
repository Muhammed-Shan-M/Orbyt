"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const redis_1 = __importDefault(require("../../../config/redis"));
class RedisService {
    client = redis_1.default;
    async set(key, value, ttl) {
        const data = JSON.stringify(value);
        if (ttl) {
            await this.client.set(key, data, "EX", ttl);
        }
        else {
            await this.client.set(key, data);
        }
    }
    async get(key) {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }
    async del(key) {
        await this.client.del(key);
    }
}
exports.RedisService = RedisService;
