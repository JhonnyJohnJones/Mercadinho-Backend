import { Controller, Get } from '@nestjs/common';

import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService } from '../common/prisma/prisma.service';
import { RedisService } from '../common/redis/redis.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,

    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Health app enpoint',
  })
  @ApiResponse({
    status: 200,
    description: 'Application running',
  })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  @ApiOperation({
    summary: 'Health databases enpoint',
  })
  @ApiResponse({
    status: 200,
    description: 'Database connection estabilished',
  })
  @HealthCheck()
  async readiness() {
    return this.health.check([
      async () => {
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
