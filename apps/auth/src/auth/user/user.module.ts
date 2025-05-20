import { JwtStrategy } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'apps/auth/src/auth/schemas/user.schema';
import { UserMongoRepository } from 'apps/auth/src/auth/user.mongo.repository';
import { UserController } from 'apps/auth/src/auth/user/user.controller';
import { UserService } from 'apps/auth/src/auth/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cs.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserMongoRepository, JwtStrategy],
})
export class UserModule {}
