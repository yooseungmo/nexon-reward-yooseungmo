import { JwtAuthGuard, Public, RbacGuard } from '@app/common';
import { All, Body, Controller, HttpCode, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ProxyService } from '../proxy/proxy.service';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard, RbacGuard)
export class AuthProxyController {
  constructor(private readonly proxy: ProxyService) {}

  @Public()
  @All('*path')
  @HttpCode(200)
  @ApiOperation({ summary: 'Auth 서비스로의 모든 요청 프록시' })
  @ApiResponse({ status: 200, description: 'Auth 서비스 응답' })
  async proxyAuth(
    @Param('path') path: string,
    @Req() req: Request,
    @Body() body: any,
    @Query() query: any,
  ) {
    return this.proxy.forward('AUTH_SERVICE_URL', req.method, `/auth/${path}`, body, query);
  }
}
