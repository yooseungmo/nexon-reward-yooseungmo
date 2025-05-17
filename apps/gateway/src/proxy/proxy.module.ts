import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HealthController } from 'apps/gateway/src/health/health.controller';
import { ProxyController } from 'apps/gateway/src/proxy/proxy.controller';
import { ProxyService } from 'apps/gateway/src/proxy/proxy.service';

@Module({
  imports: [HttpModule],
  controllers: [ProxyController, HealthController],
  providers: [ProxyService],
})
export class ProxyModule {}
