import { Injectable } from '@nestjs/common';

import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),

      retryStrategy(times) {
        return Math.min(times * 50, 2000);
      },
    });
  }

  async onModuleDestroy() {
    await this.quit();
  }
}
