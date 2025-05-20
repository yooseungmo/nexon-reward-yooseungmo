import { JwtAuthGuard, Public, RbacGuard } from '@app/common';
import { All, Body, Controller, HttpCode, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProxyService } from 'apps/gateway/src/proxy/proxy.service';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard, RbacGuard)
export class UserProxyController {
  constructor(private readonly proxy: ProxyService) {}

  @Public()
  @All('*path')
  @HttpCode(200)
  @ApiOperation({ summary: 'User 서비스로의 모든 요청 프록시' })
  async proxyUser(
    @Param('path') path: string,
    @Req() req: Request,
    @Body() body: any,
    @Query() query: any,
  ) {
    return this.proxy.forward('AUTH_SERVICE_URL', req.method, `/user/${path}`, body, query);
  }
}
