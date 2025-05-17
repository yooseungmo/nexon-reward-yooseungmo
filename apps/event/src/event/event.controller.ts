import { Controller, Get } from '@nestjs/common';
import { EventService } from 'apps/event/src/event/event.service';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getHello(): string {
    return this.eventService.getHello();
  }
}
