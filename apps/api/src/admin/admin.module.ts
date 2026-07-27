import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { StatsController } from './stats.controller';
import { DealsModule } from '../deals/deals.module';

@Module({
  imports: [DealsModule],
  controllers: [AdminController, StatsController],
})
export class AdminModule {}
