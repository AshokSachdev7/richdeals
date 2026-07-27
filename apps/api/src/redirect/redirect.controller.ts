import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Controller('out')
export class RedirectController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':id')
  async out(
    @Param('id') id: string,
    @Headers('referer') referer: string | undefined,
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

    return res.redirect(302, deal.affiliateUrl);
  }
}
