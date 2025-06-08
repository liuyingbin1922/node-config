import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WaitingListService {
  private supabase;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_KEY'),
    );
  }

  async addEmail(email: string) {
    // 先查重
    const { data: existing, error: findError } = await this.supabase
      .from('waitinglist-list')
      .select('email')
      .eq('email', email)
      .maybeSingle();
    if (findError) {
      throw new InternalServerErrorException(findError.message);
    }
    if (existing) {
      throw new BadRequestException('Email already joined the waiting list.');
    }
    // 插入
    const { error } = await this.supabase
      .from('waitinglist-list')
      .insert([{ email }]);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return { message: 'Successfully joined the waiting list.' };
  }
} 