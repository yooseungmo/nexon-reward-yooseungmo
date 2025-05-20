import { JwtAuthGuard, JwtStrategy, RbacGuard } from '@app/common';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthProxyController } from 'apps/gateway/src/auth/auth-proxy.controller';
import { UserProxyController } from 'apps/gateway/src/auth/user-proxy.controller';
import { EventProxyController } from 'apps/gateway/src/event/event-proxy.controller';
import { ReceiveProxyController } from 'apps/gateway/src/event/receive-proxy.controller';
import { HealthController } from 'apps/gateway/src/health/health.controller';
import { ProxyService } from './proxy.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cs.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [
    AuthProxyController,
    UserProxyController,
    EventProxyController,
    ReceiveProxyController,
    HealthController,
  ],
  providers: [
    ProxyService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
  ],
  exports: [ProxyService],
})
export class ProxyModule {}
