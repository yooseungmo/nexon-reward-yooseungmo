import { JwtAuthGuard, Public } from '@app/common';
import { All, Body, Controller, HttpCode, Query, Req, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'apps/gateway/src/auth/roles.guard';
import { Roles } from 'apps/gateway/src/decorators/roles.decorator';
import { Request } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProxyController {
  constructor(private readonly proxy: ProxyService) {}

  @Public()
  @All('auth/*path')
  @HttpCode(200)
  async proxyAuth(@Req() req: Request, @Body() body: any, @Query() query: any) {
    const path = req.originalUrl.replace(/^\/auth/, '');
    return this.proxy.forwardToAuth(req.method.toLowerCase(), path, body, query);
  }

  @All('event/*path')
  @HttpCode(200)
  @Roles('USER', 'OPERATOR', 'ADMIN', 'AUDITOR')
  async proxyEvent(@Req() req: Request, @Body() body: any, @Query() query: any) {
    const path = req.originalUrl.replace(/^\/event/, '');
    return this.proxy.forwardToEvent(req.method.toLowerCase(), path, body, query);
  }
}
