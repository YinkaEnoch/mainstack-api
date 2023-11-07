import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config';
import helmet from 'helmet';

async function bootstrap() {
  const config = new Config();

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix(`${config.appPrefix}/${config.appVersion}`);
  app.enableCors();
  await app.listen(config.httpPort);
  console.log(`App is running on : ${await app.getUrl()}`);
}

bootstrap().catch((e: Error) => {
  throw e;
});
