import { Injectable } from '@nestjs/common';

import {
  Registry,
  collectDefaultMetrics,
  Counter,
  Histogram,
} from 'prom-client';

@Injectable()
export class MetricsService {
  public readonly registry: Registry;

  public readonly httpRequestsTotal: Counter<string>;

  public readonly httpRequestDuration: Histogram<string>;

  constructor() {
    this.registry = new Registry();

    collectDefaultMetrics({
      register: this.registry,
    });

    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total HTTP requests',
      labelNames: ['method', 'route', 'status_code'],

      registers: [this.registry],
    });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',

      help: 'HTTP request duration in seconds',

      labelNames: ['method', 'route', 'status_code'],

      buckets: [0.1, 0.3, 0.5, 1, 2, 5],

      registers: [this.registry],
    });
  }

  async getMetrics() {
    return this.registry.metrics();
  }
}
