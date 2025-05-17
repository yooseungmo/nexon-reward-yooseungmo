import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from 'apps/event/src/event/event.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/event/.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3002),
        MONGODB_URI: Joi.string().uri().required(),
        MONGODB_DB: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cs: ConfigService) => ({
        uri: cs.get<string>('MONGODB_URI'),
        dbName: cs.get<string>('MONGODB_DB'),
      }),
      inject: [ConfigService],
    }),
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
