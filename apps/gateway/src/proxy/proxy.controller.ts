import {
  All,
  Body,
  Controller,
  HttpCode,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
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
    return this.proxy.forwardToAuth(
      req.method.toLowerCase(),
      path,
      body,
      query,
    );
  }

  @All('event/*path')
  @HttpCode(200)
  @Roles('USER', 'OPERATOR', 'ADMIN', 'AUDITOR')
  async proxyEvent(
    @Req() req: Request,
    @Body() body: any,
    @Query() query: any,
  ) {
    const path = req.originalUrl.replace(/^\/event/, '');
    return this.proxy.forwardToEvent(
      req.method.toLowerCase(),
      path,
      body,
      query,
    );
  }
}
