import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Karma is reputation only — it never converts to money. Money stays on PointEvent,
// which is only credited for a submitted deal that we published and price-checked.
const KARMA = { comment: 2, flag: 1, upvoteReceived: 1 };

// Hot ranking: one upvote is worth six hours of freshness. Linear, so it survives
// negative scores (a log/divide formula does not) and it is one SQL expression.
// ponytail: bump HOT_SECONDS_PER_VOTE if the front page goes stale or churns too fast.
const HOT_SECONDS_PER_VOTE = 6 * 3600;

const COMMENT_COOLDOWN_MS = 15_000;

export type Tab = 'hot' | 'new' | 'top' | 'unanswered';

const CARD = {
  id: true,
  slug: true,
  title: true,
  image: true,
  price: true,
  mrp: true,
  discountPct: true,
  couponCode: true,
  score: true,
  commentCount: true,
  createdAt: true,
  expiresAt: true,
  status: true,
  submittedById: true,
  store: { select: { name: true, slug: true } },
} as const;

const displayName = (u: { id: number; name: string | null } | undefined | null) =>
  u ? u.name?.trim() || `member${u.id}` : 'RichDeals';

@Injectable()
export class ForumService {
  constructor(private readonly prisma: PrismaService) {}

  async list(tab: Tab, page = 1, limit = 20) {
    const take = Math.min(Math.max(limit, 1), 50);
    const skip = (Math.max(page, 1) - 1) * take;

    let deals;
    if (tab === 'hot') {
      const ids = await this.prisma.$queryRaw<{ id: number }[]>`
        SELECT id FROM "Deal"
        WHERE status = 'LIVE'
        ORDER BY (score * ${HOT_SECONDS_PER_VOTE}) - EXTRACT(EPOCH FROM (now() - "createdAt")) DESC
        LIMIT ${take} OFFSET ${skip}`;
      const rows = await this.prisma.deal.findMany({
        where: { id: { in: ids.map((r) => r.id) } },
        select: CARD,
      });
      const order = new Map(ids.map((r, i) => [r.id, i]));
      deals = rows.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
    } else {
      const where =
        tab === 'top'
          ? { status: 'LIVE' as const, createdAt: { gte: new Date(Date.now() - 864e5) } }
          : tab === 'unanswered'
            ? { status: 'LIVE' as const, commentCount: 0 }
            : { status: 'LIVE' as const };
      deals = await this.prisma.deal.findMany({
        where,
        orderBy:
          tab === 'top'
            ? [{ score: 'desc' as const }, { createdAt: 'desc' as const }]
            : [{ createdAt: 'desc' as const }],
        take,
        skip,
        select: CARD,
      });
    }

    return { items: await this.decorate(deals), page: Math.max(page, 1), tab };
  }

  /** Adds poster name + working/expired tallies for a page of cards in two queries. */
  private async decorate(deals: any[]) {
    if (!deals.length) return [];
    const ids = deals.map((d) => d.id);
    const userIds = [...new Set(deals.map((d) => d.submittedById).filter(Boolean))] as number[];

    const [users, flags] = await Promise.all([
      userIds.length
        ? this.prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true } })
        : Promise.resolve([] as { id: number; name: string | null }[]),
      this.prisma.dealComment.groupBy({
        by: ['dealId', 'flag'],
        where: { dealId: { in: ids }, flag: { in: ['working', 'expired'] } },
        _count: { _all: true },
      }),
    ]);

    const byUser = new Map(users.map((u) => [u.id, u]));
    const tally = new Map<string, number>();
    for (const f of flags) tally.set(`${f.dealId}:${f.flag}`, f._count._all);

    return deals.map(({ submittedById, ...d }) => ({
      ...d,
      postedBy: displayName(byUser.get(submittedById)),
      isMemberPost: !!submittedById,
      workingCount: tally.get(`${d.id}:working`) ?? 0,
      expiredCount: tally.get(`${d.id}:expired`) ?? 0,
    }));
  }

  /** Thread payload for a deal page: comments, tallies and (if signed in) my vote. */
  async thread(slug: string, userId: number | null) {
    const deal = await this.prisma.deal.findUnique({
      where: { slug },
      select: { id: true, score: true, commentCount: true },
    });
    if (!deal) throw new NotFoundException('No such deal');

    const [comments, mine] = await Promise.all([
      this.prisma.dealComment.findMany({
        where: { dealId: deal.id },
        orderBy: { id: 'desc' },
        take: 200,
        select: {
          id: true,
          body: true,
          flag: true,
          createdAt: true,
          user: { select: { id: true, name: true, karma: true } },
        },
      }),
      userId
        ? this.prisma.dealVote.findUnique({ where: { dealId_userId: { dealId: deal.id, userId } } })
        : Promise.resolve(null),
    ]);

    return {
      score: deal.score,
      commentCount: deal.commentCount,
      myVote: mine?.value ?? 0,
      workingCount: comments.filter((c) => c.flag === 'working').length,
      expiredCount: comments.filter((c) => c.flag === 'expired').length,
      comments: comments.map((c) => ({
        id: c.id,
        body: c.body,
        flag: c.flag,
        createdAt: c.createdAt,
        author: displayName(c.user),
        karma: c.user.karma,
      })),
    };
  }

  async vote(userId: number, slug: string, value: number) {
    if (![1, 0, -1].includes(value)) throw new BadRequestException('Vote must be up, down or none.');
    const deal = await this.prisma.deal.findUnique({
      where: { slug },
      select: { id: true, score: true, submittedById: true },
    });
    if (!deal) throw new NotFoundException('No such deal');

    const prev = await this.prisma.dealVote.findUnique({
      where: { dealId_userId: { dealId: deal.id, userId } },
    });
    const delta = value - (prev?.value ?? 0);
    if (delta === 0) return { score: deal.score, myVote: value };

    const writes: any[] = [
      value === 0
        ? this.prisma.dealVote.delete({ where: { dealId_userId: { dealId: deal.id, userId } } })
        : this.prisma.dealVote.upsert({
            where: { dealId_userId: { dealId: deal.id, userId } },
            create: { dealId: deal.id, userId, value },
            update: { value },
          }),
      this.prisma.deal.update({ where: { id: deal.id }, data: { score: { increment: delta } } }),
    ];
    // The member who posted the deal earns reputation from it. Self-votes pay nothing.
    if (deal.submittedById && deal.submittedById !== userId) {
      writes.push(
        this.prisma.user.update({
          where: { id: deal.submittedById },
          data: { karma: { increment: delta * KARMA.upvoteReceived } },
        }),
      );
    }
    const [, updated] = await this.prisma.$transaction(writes);
    return { score: (updated as { score: number }).score, myVote: value };
  }

  async comment(userId: number, slug: string, rawBody: string, flag?: string | null) {
    const body = (rawBody ?? '').trim();
    if (body.length < 2) throw new BadRequestException('Say a little more than that.');
    if (body.length > 2000) throw new BadRequestException('Keep it under 2000 characters.');
    const kind = flag === 'working' || flag === 'expired' ? flag : null;

    const deal = await this.prisma.deal.findUnique({ where: { slug }, select: { id: true } });
    if (!deal) throw new NotFoundException('No such deal');

    // Cheap flood guard — one recency check beats a rate-limit dependency.
    const last = await this.prisma.dealComment.findFirst({
      where: { userId },
      orderBy: { id: 'desc' },
      select: { createdAt: true },
    });
    if (last && Date.now() - last.createdAt.getTime() < COMMENT_COOLDOWN_MS) {
      throw new BadRequestException('Slow down a few seconds before posting again.');
    }

    const [created] = await this.prisma.$transaction([
      this.prisma.dealComment.create({
        data: { dealId: deal.id, userId, body, flag: kind },
        select: {
          id: true,
          body: true,
          flag: true,
          createdAt: true,
          user: { select: { id: true, name: true, karma: true } },
        },
      }),
      this.prisma.deal.update({ where: { id: deal.id }, data: { commentCount: { increment: 1 } } }),
      this.prisma.user.update({
        where: { id: userId },
        data: { karma: { increment: KARMA.comment + (kind ? KARMA.flag : 0) } },
      }),
    ]);

    return {
      id: created.id,
      body: created.body,
      flag: created.flag,
      createdAt: created.createdAt,
      author: displayName(created.user),
      karma: created.user.karma,
    };
  }

  /** Top members by karma — the leaderboard that makes reputation worth chasing. */
  leaderboard() {
    return this.prisma.user.findMany({
      where: { karma: { gt: 0 } },
      orderBy: { karma: 'desc' },
      take: 10,
      select: { id: true, name: true, karma: true },
    });
  }
}
