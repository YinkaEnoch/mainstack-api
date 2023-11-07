import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

const config = new Config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env.local' }),
    // JwtModule.registerAsync({
    //   useFactory: () => ({
    //     secret: 'config.jwtSecret',
    //     global: true,
    //     signOptions: { expiresIn: '120s' },
    //   }),
    // }),
    MongooseModule.forRoot(config.dbUrl),
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    JwtService,
  ],
})
export class AppModule {}
