import { JwtAuthGuard, Rbac, RbacGuard, Role } from '@app/common';
import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiUserGetDetailResponseDto } from 'apps/auth/src/auth/user/dto/api-user-get-detail-response.dto';
import { ApiUserGetQueryRequestDto } from 'apps/auth/src/auth/user/dto/api-user-get-query-request.dto';
import { ApiUserGetResponseDto } from 'apps/auth/src/auth/user/dto/api-user-get-response.dto';
import { ApiUserPatchRoleRequestDto } from 'apps/auth/src/auth/user/dto/api-user-patch-role-request.dto';
import { ApiUserPatchRoleResponseDto } from 'apps/auth/src/auth/user/dto/api-user-patch-role-response.dto';
import { UserService } from 'apps/auth/src/auth/user/user.service';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RbacGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Rbac(Role.OPERATOR)
  @ApiOperation({
    summary: '유저 목록 조회',
    description: 'OPERATOR 권한 필요',
  })
  @ApiResponse({ status: 200, type: ApiUserGetResponseDto })
  async getAllUsers(@Query() query: ApiUserGetQueryRequestDto): Promise<ApiUserGetResponseDto> {
    return this.userService.getAllUsers(query);
  }

  @Get('/:id')
  @Rbac(Role.OPERATOR)
  @ApiOperation({ summary: '유저 상세 조회', description: 'OPERATOR 권한 필요' })
  @ApiResponse({ status: 200, type: ApiUserGetDetailResponseDto })
  async getUserDetail(@Param('id') id: string): Promise<ApiUserGetDetailResponseDto> {
    return this.userService.getUserDetail(id);
  }

  @Patch('/:id/role')
  @Rbac(Role.ADMIN)
  @ApiOperation({ summary: '유저 역할 변경', description: 'ADMIN 권한 필요' })
  @ApiBody({ type: ApiUserPatchRoleRequestDto })
  @ApiResponse({ status: 200, type: ApiUserPatchRoleResponseDto })
  async updateRole(
    @Param('id') id: string,
    @Body() dto: ApiUserPatchRoleRequestDto,
  ): Promise<ApiUserPatchRoleResponseDto> {
    return this.userService.updateRole(id, dto);
  }
}
