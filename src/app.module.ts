import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';

import CONFIG_MODULE from '@config/index';
import MODULE from '@modules/index';

import { GeneralExceptionFilter } from '@shared/filters/general-expection.filter';

@Module({
  imports: [...CONFIG_MODULE, ...MODULE],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GeneralExceptionFilter,
    },
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule {}
