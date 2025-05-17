import { Controller, Get } from '@nestjs/common';
import { GatewayService } from 'apps/gateway/src/gateway/gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }
}
