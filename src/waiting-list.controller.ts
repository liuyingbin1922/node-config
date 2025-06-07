import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { WaitingListService } from './waiting-list.service';

@Controller('waiting-list')
export class WaitingListController {
  constructor(private readonly waitingListService: WaitingListService) {}

  @Post()
  async join(@Body('email') email: string) {
    console.log('email', email);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new BadRequestException('Invalid email');
    }
    return this.waitingListService.addEmail(email);
  }
}