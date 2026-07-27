import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword, istDay, makeRefCode, verifyPassword } from './auth.util';
import { fetchLivePrice, parseSubmission } from './submit';
import { DealsService } from '../deals/deals.service';

// 1 point = 1 paisa. So signup = ₹1, a submitted deal that goes live = ₹1, redeem opens at ₹10.
// Earning rates. Redeem is deliberately NOT implemented — points accrue, nothing pays out yet.
export const POINTS = {
  signup: 100,
  referral: 50,
  daily: 10,
  click: 2,
  dealSubmit: 100,
  redeemAt: 1000,
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly deals: DealsService,
  ) {}

  /**
   * Credits points once per dedupeKey. The unique index on dedupeKey is what makes this
   * idempotent, so a double-submit or a retried request can't double-pay.
   */
  async award(userId: number, kind: string, points: number, dedupeKey: string, dealId?: number) {
    try {
      await this.prisma.$transaction([
        this.prisma.pointEvent.create({ data: { userId, kind, points, dedupeKey, dealId } }),
        this.prisma.user.update({ where: { id: userId }, data: { points: { increment: points } } }),
      ]);
      return true;
    } catch {
      return false; // already credited
    }
  }

  async register(email: string, password: string, name?: string, ref?: string) {
    const mail = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) throw new BadRequestException('Invalid email');
    if (password.length < 8) throw new BadRequestException('Password must be at least 8 characters');
    if (await this.prisma.user.findUnique({ where: { email: mail } })) {
      throw new BadRequestException('That email is already registered');
    }

    const referrer = ref
      ? await this.prisma.user.findUnique({ where: { refCode: ref.trim().toUpperCase() } })
      : null;

    const user = await this.prisma.user.create({
      data: {
        email: mail,
        passwordHash: hashPassword(password),
        name: name?.trim() || null,
        refCode: makeRefCode(),
        referredById: referrer?.id ?? null,
      },
    });

    await this.award(user.id, 'signup', POINTS.signup, `signup:${user.id}`);
    if (referrer) {
      await this.award(referrer.id, 'referral', POINTS.referral, `referral:${user.id}`);
    }
    return user.id;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return user.id;
  }

  async me(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, points: true, refCode: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException();
    const today = await this.prisma.pointEvent.findUnique({
      where: { dedupeKey: `daily:${userId}:${istDay()}` },
    });
    return { ...user, redeemAt: POINTS.redeemAt, checkedInToday: !!today };
  }

  async checkIn(userId: number) {
    const credited = await this.award(userId, 'daily', POINTS.daily, `daily:${userId}:${istDay()}`);
    return { credited, points: credited ? POINTS.daily : 0 };
  }

  /**
   * A user pastes a product link. We validate it ourselves — link shape, not already on the
   * site, and the store's own published price — then publish it. Amazon blocks server-side
   * reads, so those land as PENDING_REVIEW and a human check flips them live.
   * Points are NOT credited here: the sweep in tg-broadcast.mjs pays out once the deal is LIVE,
   * so nobody earns for a deal that never gets published.
   */
  async submitDeal(userId: number, rawUrl: string) {
    const parsed = parseSubmission(rawUrl ?? '');
    if ('error' in parsed) throw new BadRequestException(parsed.error);

    // Dedup on the product id AND on the destination url — the same Myntra/Ajio product
    // reaches us with a different id depending on which ingest found it first.
    const path = new URL(parsed.cleanUrl).pathname;
    const near = await this.prisma.deal.findMany({
      where: { OR: [{ productId: parsed.productId }, { affiliateUrl: { contains: encodeURIComponent(path) } }] },
      select: { slug: true, affiliateUrl: true },
    });
    const want = parsed.cleanUrl.replace(/^https?:\/\/(www\.)?/, '');
    if (near.some((d) => decodeURIComponent(d.affiliateUrl).replace(/^https?:\/\/(www\.)?/, '').includes(want) || d.affiliateUrl.includes(parsed.productId))) {
      throw new BadRequestException('We already have that deal on the site.');
    }

    const base = {
      store: parsed.store,
      productId: parsed.productId,
      affiliateUrl: parsed.affiliateUrl,
      sourceSlug: null as string | null,
      howTo: [
        'Tap Shop Now to open the store.',
        'Add the item to your cart.',
        'Sign in to your account.',
        'Confirm the address and place the order.',
      ],
    };

    if (parsed.store === 'amazon') {
      const slug = `amazon-deal-${parsed.productId.toLowerCase()}`;
      const { deal } = await this.deals.upsertFromIngest({
        ...base,
        slug,
        title: `Amazon ${parsed.productId} — submitted deal`,
        status: 'pending-review',
      } as never);
      await this.prisma.deal.update({ where: { id: deal.id }, data: { submittedById: userId } });
      return { status: 'pending', points: 0, message: 'Amazon deal queued for a price check — points land once it goes live.' };
    }

    const live = await fetchLivePrice(parsed.cleanUrl);
    if ('error' in live) throw new BadRequestException(live.error);

    const name = (live.title || `${parsed.store} deal`).replace(/\s*[|\-–]\s*(Buy|Shop|Price|Online).*$/i, '').slice(0, 120);
    const pct = live.mrp && live.mrp > live.price ? Math.round(((live.mrp - live.price) / live.mrp) * 100) : null;
    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)}-${parsed.productId.toLowerCase()}`.slice(0, 100);

    const { deal } = await this.deals.upsertFromIngest({
      ...base,
      slug,
      title: `${name} at ₹${live.price}`,
      description: `${name} is live at ₹${live.price}${pct ? ` (${pct}% off)` : ''}. Price read off the store page when this deal was submitted.`,
      image: live.image ?? undefined,
      price: live.price,
      mrp: live.mrp ?? undefined,
      discountPct: pct ?? undefined,
      status: 'live',
    } as never);
    await this.prisma.deal.update({ where: { id: deal.id }, data: { submittedById: userId } });
    await this.award(userId, 'deal_submit', POINTS.dealSubmit, `deal_submit:${deal.id}`, deal.id);

    return { status: 'live', points: POINTS.dealSubmit, slug: deal.slug, message: `Live on the site. +${POINTS.dealSubmit} points (₹1).` };
  }

  ledger(userId: number) {
    return this.prisma.pointEvent.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
      take: 30,
      select: { kind: true, points: true, dealId: true, createdAt: true },
    });
  }
}
