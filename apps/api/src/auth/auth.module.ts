import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedemptionsAdminController } from './redemptions.admin.controller';
import { DealsModule } from '../deals/deals.module';

@Module({
  imports: [DealsModule],
  controllers: [AuthController, RedemptionsAdminController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
