import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RedirectController],
})
export class RedirectModule {}
