import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { Observable, tap } from 'rxjs';

import { MetricsService } from '../observability/metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}

  intercept(
    context: ExecutionContext,

    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();

    const response = context.switchToHttp().getResponse<Response>();

    const start = performance.now();

    return next.handle().pipe(
      tap(() => {
        const duration = (performance.now() - start) / 1000;

        const route =
          (request.route as { path?: string } | undefined)?.path ?? request.url;

        const labels = {
          method: request.method,
          route,
          status_code: response.statusCode.toString(),
        };

        this.metrics.httpRequestsTotal.inc(labels);

        this.metrics.httpRequestDuration.observe(labels, duration);
      }),
    );
  }
}
