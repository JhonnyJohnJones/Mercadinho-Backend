import { Module } from '@nestjs/common';

import { TerminusModule } from '@nestjs/terminus';

import { PrismaModule } from '../common/prisma/prisma.module';

import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, PrismaModule],

  controllers: [HealthController],
})
export class HealthModule {}
