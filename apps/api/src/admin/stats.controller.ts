import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { PrismaService } from '../prisma/prisma.service';

// Read-only counters for the admin dashboard. Everything here comes out of our
// own DB — pageviews are not in it, they live in GA4 (the gtag snippet is
// client-side only), so "visitors" here means outbound clicks, which is the
// engagement number we actually own.
type Row = { d: string; n: number };

@UseGuards(ApiKeyGuard)
@Controller('admin/stats')
export class StatsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async stats() {
    const now = new Date();
    const day = (n: number) => new Date(now.getTime() - n * 864e5);
    // IST day boundary — the business runs on IST, UTC midnight would split a day.
    const ist = new Date(now.getTime() + 5.5 * 3600e3);
    const todayIst = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()) - 5.5 * 3600e3);

    const [
      users, usersToday, users7d, users30d,
      clicks, clicksToday, clicks7d,
      dealsLive, dealsPending, dealsExpired, dealsTotal,
      posts, postsToday,
      comments, votes,
      points,
      signupSeries, clickSeries,
      topDeals, recentUsers,
      nullPrice, nullImg, coverless, seoless, dbMaxLive,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { createdAt: { gte: todayIst } } }),
      this.prisma.user.count({ where: { createdAt: { gte: day(7) } } }),
      this.prisma.user.count({ where: { createdAt: { gte: day(30) } } }),
      this.prisma.click.count(),
      this.prisma.click.count({ where: { ts: { gte: todayIst } } }),
      this.prisma.click.count({ where: { ts: { gte: day(7) } } }),
      this.prisma.deal.count({ where: { status: 'LIVE' } }),
      this.prisma.deal.count({ where: { status: 'PENDING_REVIEW' } }),
      this.prisma.deal.count({ where: { status: 'EXPIRED' } }),
      this.prisma.deal.count(),
      this.prisma.post.count(),
      this.prisma.post.count({ where: { createdAt: { gte: todayIst } } }),
      this.prisma.dealComment.count(),
      this.prisma.dealVote.count(),
      this.prisma.pointEvent.aggregate({ _sum: { points: true } }),
      this.prisma.$queryRaw<Row[]>`
        SELECT to_char(("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::date, 'YYYY-MM-DD') AS d,
               count(*)::int AS n
        FROM "User" WHERE "createdAt" > now() - interval '14 days' GROUP BY 1 ORDER BY 1`,
      this.prisma.$queryRaw<Row[]>`
        SELECT to_char(("ts" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::date, 'YYYY-MM-DD') AS d,
               count(*)::int AS n
        FROM "Click" WHERE "ts" > now() - interval '14 days' GROUP BY 1 ORDER BY 1`,
      this.prisma.$queryRaw<Array<{ id: number; slug: string; title: string; n: number }>>`
        SELECT d.id, d.slug, d.title, count(c.id)::int AS n
        FROM "Click" c JOIN "Deal" d ON d.id = c."dealId"
        WHERE c.ts > now() - interval '7 days'
        GROUP BY d.id, d.slug, d.title ORDER BY n DESC LIMIT 8`,
      this.prisma.user.findMany({
        orderBy: { id: 'desc' }, take: 8,
        select: { id: true, email: true, name: true, points: true, createdAt: true, referredById: true },
      }),
      // Rot counters for the CEO audit — slot-safe (pooled) so ticks never open a fresh conn.
      this.prisma.deal.count({ where: { status: 'LIVE', price: null } }),
      this.prisma.deal.count({ where: { status: 'LIVE', OR: [{ image: null }, { image: '' }, { NOT: { image: { startsWith: 'http' } } }] } }),
      this.prisma.post.count({ where: { OR: [{ cover: null }, { cover: '' }] } }),
      this.prisma.post.count({ where: { OR: [{ seoTitle: null }, { seoTitle: '' }, { seoDesc: null }, { seoDesc: '' }] } }),
      this.prisma.deal.findFirst({ where: { status: 'LIVE' }, orderBy: { id: 'desc' }, select: { id: true } }),
    ]);

    return {
      users: { total: users, today: usersToday, last7d: users7d, last30d: users30d },
      clicks: { total: clicks, today: clicksToday, last7d: clicks7d },
      deals: { live: dealsLive, pending: dealsPending, expired: dealsExpired, total: dealsTotal },
      posts: { total: posts, today: postsToday },
      rot: { nullPriceLive: nullPrice, nullImgLive: nullImg, coverlessPosts: coverless, seolessPosts: seoless, dbMaxLive: dbMaxLive?.id ?? 0 },
      community: { comments, votes, pointsAwarded: points._sum.points ?? 0 },
      signupSeries,
      clickSeries,
      topDeals,
      // Emails are shown to the admin only — this route is behind ApiKeyGuard.
      recentUsers: recentUsers.map((u) => ({ ...u, referred: u.referredById != null })),
    };
  }
}
