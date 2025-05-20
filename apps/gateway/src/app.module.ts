import { JwtAuthGuard, RbacGuard } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/gateway/.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        AUTH_SERVICE_URL: Joi.string().required(),
        EVENT_SERVICE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    ProxyModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
  ],
})
export class AppModule {}
