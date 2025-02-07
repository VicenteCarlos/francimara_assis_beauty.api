import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: any; // tipar isso depois

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.redisClient = await this.connectToRedis();
  }

  private async connectToRedis() {
    return await createClient({
      url: this.configService.get<string>('REDIS_URL'),
    }).connect();
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string, ttl: number) {
    return await this.redisClient.set(key, value, {
      EX: ttl,
    });
  }

  async sAdd(myset: string, value: string) {
    return await this.redisClient.sAdd(myset, value);
  }

  async sIsMember(myset: string, value: string) {
    return await this.redisClient.sIsMember(myset, value);
  }

  async sRem(myset: string, value: string) {
    return await this.redisClient.sRem(myset, value);
  }
}
