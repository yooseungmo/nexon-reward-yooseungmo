import { Controller, Get } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';

@Public() // JWT 검사 스킵
@Controller()
export class HealthController {
  @Get('health')
  check() {
    return { status: 'ok' };
  }
}
