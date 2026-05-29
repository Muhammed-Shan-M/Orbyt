import { RedisService } from './redis.service'
import { IRedisService } from './resdis.interface'

export const redisService: IRedisService = new RedisService()