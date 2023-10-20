import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EEnvKey } from '@constants/constant';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        [EEnvKey.NODE_ENV]: Joi.string()
          .valid('development', 'production')
          .default('development'),
        [EEnvKey.PORT]: Joi.number().required(),
        [EEnvKey.API_PREFIX]: Joi.string(),

        [EEnvKey.MYSQL_HOST]: Joi.string().required(),
        [EEnvKey.MYSQL_PORT]: Joi.number().required(),
        [EEnvKey.MYSQL_USERNAME]: Joi.string().required(),
        [EEnvKey.MYSQL_PASSWORD]: Joi.string().required(),
        [EEnvKey.MYSQL_DB]: Joi.string().required(),

        [EEnvKey.JWT_ACCESS_TOKENS_SECRETS]: Joi.string().required(),
        [EEnvKey.JWT_ACCESS_TOKENS_EXPIRES]: Joi.string().required(),
        [EEnvKey.JWT_REFRESH_TOKENS_SECRETS]: Joi.string().required(),
        [EEnvKey.JWT_REFRESH_TOKENS_EXPIRES]: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigurationModule {}
