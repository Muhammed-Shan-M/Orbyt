import redis from "../../../config/redis";
import { IRedisService } from "./resdis.interface";




export class RedisService implements IRedisService {
    private client = redis;

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        const data = JSON.stringify(value);

        if (ttl) {
            await this.client.set(key, data, "EX", ttl);
        } else {
            await this.client.set(key, data);
        }
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        return data ? JSON.parse(data) as T : null;
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }

    async ttl(key: string): Promise<number> {
        return await this.client.ttl(key);
    }

    async sadd(key: string, value: string): Promise<void> {
        await this.client.sadd(key, value);
    }

    async srem(key: string, value: string): Promise<void> {
        await this.client.srem(key, value);
    }

    async smembers(key: string): Promise<string[]> {
        return await this.client.smembers(key);
    }

    async expire(key: string, ttl: number): Promise<void> {
        await this.client.expire(key, ttl);
    }
}