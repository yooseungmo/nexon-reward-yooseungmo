import { JwtAuthGuard, Rbac, RbacGuard, Role } from '@app/common';
import { All, Body, Controller, HttpCode, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProxyService } from 'apps/gateway/src/proxy/proxy.service';

@ApiTags('Dev')
@Controller('test')
@UseGuards(JwtAuthGuard, RbacGuard)
export class DevProxyController {
  constructor(private readonly proxy: ProxyService) {}

  @Rbac(Role.OPERATOR, Role.ADMIN)
  @All('*path')
  @HttpCode(200)
  @ApiOperation({ summary: 'Dev(관리자)용 모든 요청 프록시' })
  async proxyDev(
    @Param('path') path: string,
    @Req() req: Request,
    @Body() body: any,
    @Query() query: any,
  ) {
    return this.proxy.forward('EVENT_SERVICE_URL', req.method, `/test/${path}`, body, query);
  }
}
