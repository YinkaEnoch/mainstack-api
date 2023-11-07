import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Config } from '../config';

const config = new Config();

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        // secret: config.jwtSecret,
        global: true,
        signOptions: { expiresIn: '120s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, Config],
})
export class AuthModule {}
