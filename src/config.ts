import { Injectable } from '@nestjs/common';

@Injectable()
export class Config {
  get appPrefix(): string {
    return process.env.APP_PREFIX || 'api';
  }

  get appVersion(): string {
    return process.env.APP_VERSION || 'v1';
  }

  get httpPort(): number {
    return parseInt(process.env.HTTP_PORT || '3000', 10);
  }

  get dbUrl(): string {
    return process.env.DB_URL || '';
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET || '';
  }
}
