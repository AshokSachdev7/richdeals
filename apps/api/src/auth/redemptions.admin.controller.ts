import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../admin/api-key.guard';
import { AuthService } from './auth.service';

// Payout queue. Lives next to AuthService (which owns the points ledger) rather than in
// AdminModule, so the money math stays in one file.
@UseGuards(ApiKeyGuard)
@Controller('admin/redemptions')
export class RedemptionsAdminController {
  constructor(private readonly auth: AuthService) {}

  @Get()
  list(@Query('status') status?: string) {
    return this.auth.adminRedemptions(status);
  }

  @Post(':id/settle')
  settle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status?: string; voucher?: string; note?: string },
  ) {
    return this.auth.settleRedemption(id, body?.status ?? '', body?.voucher, body?.note);
  }
}
