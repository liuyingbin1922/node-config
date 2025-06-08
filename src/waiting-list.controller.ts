import { Controller, Post, Body, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { WaitingListService } from './waiting-list.service';

@Controller('waiting-list')
export class WaitingListController {
  constructor(private readonly waitingListService: WaitingListService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async join(@Body('email') email: string) {
    console.log('email', email);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new BadRequestException('Invalid email');
    }
    const result = await this.waitingListService.addEmail(email);
    return { code: 200, ...result };
  }
}