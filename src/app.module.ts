import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WaitingListController } from './waiting-list.controller';
import { WaitingListService } from './waiting-list.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, WaitingListController],
  providers: [AppService, WaitingListService],
})
export class AppModule {}
