import { Controller, Get } from '@nestjs/common';

import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { PrismaService } from '../common/prisma/prisma.service';
import { RedisService } from '../common/redis/redis.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,

    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  @HealthCheck()
  async readiness() {
    return this.health.check([
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await this.prisma.$executeRaw`
          SELECT 1
        `;

        return {
          database: {
            status: 'up',
          },
        };
      },

      async () => {
        const pong = await this.redis.ping();

        if (pong !== 'PONG') {
          throw new Error('Redis unavailable');
        }

        return {
          redis: {
            status: 'up',
          },
        };
      },
    ]);
  }
}
