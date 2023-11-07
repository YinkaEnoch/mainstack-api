import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: Config,
  ) {}

  async login() {
    return {
      access_token: await this.jwtService.signAsync(
        { sub: 'anon' },
        { secret: this.config.jwtSecret },
      ),
    };
  }
}
