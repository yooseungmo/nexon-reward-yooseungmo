import { CurrentUser, JwtAuthGuard, Rbac, RbacGuard, Role, UserDto } from '@app/common';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiReceiveGetListQueryRequestDto } from 'apps/event/src/event/receive/dto/api-receive-get-list-query-request.dto';
import { ApiReceiveGetListResponseDto } from 'apps/event/src/event/receive/dto/api-receive-get-list-response.dto';
import { ReceiveService } from 'apps/event/src/event/receive/receive.service';

@ApiTags('Receive')
@ApiBearerAuth('access-token')
@Controller('receives')
@UseGuards(JwtAuthGuard, RbacGuard)
export class ReceiveController {
  constructor(private readonly receiveService: ReceiveService) {}

  @Get('my')
  @Rbac(Role.USER, Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  @ApiOperation({
    summary: '내 보상 이력 조회',
    description: 'USER|OPERATOR|AUDITOR|ADMIN 권한 필요',
  })
  @ApiResponse({ status: 200, type: ApiReceiveGetListResponseDto })
  async getMyReceives(
    @CurrentUser() user: UserDto,
    @Query() query: ApiReceiveGetListQueryRequestDto,
  ): Promise<ApiReceiveGetListResponseDto> {
    return this.receiveService.getMyReceives(user.userId, query);
  }

  @Get()
  @Rbac(Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
  @ApiOperation({
    summary: '전체 보상 이력 조회',
    description: 'OPERATOR|AUDITOR|ADMIN 권한 필요',
  })
  @ApiResponse({ status: 200, type: ApiReceiveGetListResponseDto })
  async getAllReceives(
    @Query() query: ApiReceiveGetListQueryRequestDto,
  ): Promise<ApiReceiveGetListResponseDto> {
    return this.receiveService.getAllReceives(query);
  }
}
