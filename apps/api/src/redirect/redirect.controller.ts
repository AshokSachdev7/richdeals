import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService, POINTS } from '../auth/auth.service';
import { istDay, userIdFromCookieHeader } from '../auth/auth.util';

@Controller('out')
export class RedirectController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  @Get(':id')
  async out(
    @Param('id') id: string,
    @Headers('referer') referer: string | undefined,
    @Headers('cookie') cookie: string | undefined,
    @Res() res: Response,
  ) {
    const dealId = Number(id);
    const deal = Number.isNaN(dealId)
      ? null
      : await this.prisma.deal.findUnique({ where: { id: dealId } });

    if (!deal) return res.redirect(302, '/');

    // Log the click; increment counter. Best-effort — never block the redirect.
    await this.prisma
      .$transaction([
        this.prisma.click.create({ data: { dealId: deal.id, referer: referer ?? null } }),
        this.prisma.deal.update({
          where: { id: deal.id },
          data: { clickCount: { increment: 1 } },
        }),
      ])
      .catch(() => undefined);

    // Logged-in visitors earn points, once per deal per day. Best-effort like the click log.
    const userId = userIdFromCookieHeader(cookie);
    if (userId) {
      await this.auth
        .award(userId, 'click', POINTS.click, `click:${userId}:${deal.id}:${istDay()}`, deal.id)
        .catch(() => undefined);
    }

    return res.redirect(302, deal.affiliateUrl);
  }
}
