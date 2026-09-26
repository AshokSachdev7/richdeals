import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

// Crawlers, link-preview fetchers and scripts. 2026-09 audit: ~half of all
// logged clicks were bots walking paginated hubs (86 clicks/minute bursts),
// which inflated stats AND sent non-human traffic through our Amazon tag.
// ponytail: UA regex only; add IP rate-limiting if disguised bots show up in `ua`.
export const BOT_UA =
  /bot|crawl|spider|slurp|preview|fetch|scan|monitor|lighthouse|headless|curl|wget|python|java\/|go-http|okhttp|axios|node|libwww|scrapy|httpclient|facebookexternalhit|whatsapp|embedly|pinterest|skype/i;

export const isBot = (ua?: string) => !ua || BOT_UA.test(ua);

@Controller('out')
export class RedirectController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':id')
  async out(
    @Param('id') id: string,
    @Headers('referer') referer: string | undefined,
    @Headers('user-agent') ua: string | undefined,
    @Res() res: Response,
  ) {
    const dealId = Number(id);
    const deal = Number.isNaN(dealId)
      ? null
      : await this.prisma.deal.findUnique({ where: { id: dealId } });

    if (!deal) return res.redirect(302, '/');

    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    // Bots never reach the affiliate URL and are never counted.
    if (isBot(ua)) return res.redirect(302, `/${deal.slug}`);

    // Log the click; increment counter. Best-effort — never block the redirect.
    await this.prisma
      .$transaction([
        this.prisma.click.create({
          data: { dealId: deal.id, referer: referer ?? null, ua: (ua ?? '').slice(0, 300) },
        }),
        this.prisma.deal.update({
          where: { id: deal.id },
          data: { clickCount: { increment: 1 } },
        }),
      ])
      .catch(() => undefined);

    return res.redirect(302, deal.affiliateUrl);
  }
}
