import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EEnvKey } from '@constants/constant';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get<string>(EEnvKey.API_PREFIX) || 'api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  await app.listen(configService.get<number>(EEnvKey.PORT) || 5000);
  const logger = new Logger('TypeORM');
  logger.log(__dirname);
}
bootstrap()
  .then(() => {
    console.info(`App is running on port 5000 with baseURL=/api`);
  })
  .catch((e) => {
    console.error(e);
    console.info(`App exiting....`);
    process.exit(-1);
  });
