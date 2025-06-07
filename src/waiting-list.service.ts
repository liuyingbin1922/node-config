import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const { data, error } = await this.supabase
      .from('waitinglist-list')
      .insert([{ email }]);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return { message: 'Successfully joined the waiting list.' };
  }
} 