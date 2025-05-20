import { JwtAuthGuard, Rbac, RbacGuard, Role } from '@app/common';
import { All, Body, Controller, HttpCode, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProxyService } from 'apps/gateway/src/proxy/proxy.service';

@ApiTags('Receive')
@Controller('receives')
@UseGuards(JwtAuthGuard, RbacGuard)
export class ReceiveProxyController {
  constructor(private readonly proxy: ProxyService) {}

  @Rbac(Role.USER, Role.AUDITOR, Role.ADMIN)
  @All('*path')
  @HttpCode(200)
  @ApiOperation({ summary: 'Receive 서비스로의 모든 요청 프록시' })
  async proxyReceive(
    @Param('path') path: string,
    @Req() req: Request,
    @Body() body: any,
    @Query() query: any,
  ) {
    return this.proxy.forward('EVENT_SERVICE_URL', req.method, `/receives/${path}`, body, query);
  }
}
