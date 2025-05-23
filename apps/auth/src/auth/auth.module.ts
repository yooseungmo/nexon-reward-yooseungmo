import { JwtStrategy } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'apps/auth/src/auth/auth.controller';
import { AuthService } from 'apps/auth/src/auth/auth.service';
import { User, UserSchema } from 'apps/auth/src/auth/schemas/user.schema';
import { UserMongoRepository } from 'apps/auth/src/auth/user.mongo.repository';
import { UserModule } from 'apps/auth/src/auth/user/user.module';

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
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserMongoRepository, JwtStrategy],
})
export class AuthModule {}
