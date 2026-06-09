

export interface IRedisService {
  set<T>(key: string, value: T, ttl?: number): Promise<void>; 

  get<T>(key: string): Promise<T | null>;

  del(key: string): Promise<void>;

  ttl(key: string): Promise<number>

  sadd(key: string, value: string): Promise<void>

  srem(key: string, value: string): Promise<void>

  smembers(key: string): Promise<string[]>

  expire(key: string, ttl: number): Promise<void>
}