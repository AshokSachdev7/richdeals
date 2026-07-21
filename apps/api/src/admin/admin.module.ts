import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { DealsModule } from '../deals/deals.module';

@Module({
  imports: [DealsModule],
  controllers: [AdminController],
})
export class AdminModule {}
