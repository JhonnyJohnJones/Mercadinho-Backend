import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { NestExpressApplication } from '@nestjs/platform-express';

import pinoHttp from 'pino-http';

import pino from 'pino';

import { correlationIdMiddleware } from './common/middleware/correlation-id.middleware';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(correlationIdMiddleware);

  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        colorize: true,
      },
    },
  });

  app.use(
    pinoHttp({
      logger,

      customProps(req) {
        return { correlationId: req.headers['x-correlation-id'] };
      },
    }),
  );

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
