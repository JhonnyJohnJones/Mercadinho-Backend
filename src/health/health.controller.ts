import { Controller, Get } from '@nestjs/common';

import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { PrismaService } from '../common/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,

    private readonly prisma: PrismaService,
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
        await this.prisma.$queryRaw`SELECT 1`;

        return {
          database: {
            status: 'up',
          },
        };
      },
    ]);
  }
}
