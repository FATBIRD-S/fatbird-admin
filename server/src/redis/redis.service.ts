import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string | number, expire: number): Promise<void> {
    await this.redisClient.set(key, value);
    if (expire) {
      await this.redisClient.expire(key, expire);
    }
  }
}
