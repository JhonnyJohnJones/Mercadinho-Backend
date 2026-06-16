/* eslint-disable @typescript-eslint/no-unsafe-member-access2 */
/* eslint-disable @typescript-eslint/no-unsafe-call2 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment2 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';

import { MetricsService } from '../observability/metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}

  intercept(
    context: ExecutionContext,

    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    const response = context.switchToHttp().getResponse();

    const start = performance.now();

    return next.handle().pipe(
      tap(() => {
        const duration = (performance.now() - start) / 1000;

        const labels = {
          method: request.method,
          route: request.route?.path ?? request.url,
          status_code: response.statusCode.toString(),
        };

        this.metrics.httpRequestsTotal.inc(labels);

        this.metrics.httpRequestDuration.observe(labels, duration);
      }),
    );
  }
}
