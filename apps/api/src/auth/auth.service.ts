import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword, istDay, makeRefCode, verifyPassword } from './auth.util';
import { fetchLivePrice, parseSubmission } from './submit';
import { DealsService } from '../deals/deals.service';
import { RevalidateService } from '../revalidate/revalidate.service';

/** What the /submit form posts. Only `url` is required — the rest overrides what we scrape. */
export type DealSubmission = {
  url?: string;
  title?: string;
  description?: string;
  price?: number | string;
  mrp?: number | string;
  couponCode?: string;
  image?: string;
};

// 1 point = ₹1. No conversion anywhere — the number a member sees IS the rupees.
// Redeem pays out as an Amazon gift-card code we send by hand (see `redeem`).
// Opening a deal pays nothing: at ₹1 a point there is no honest sub-rupee reward,
// and paying per click is exactly what a bot farm would drain.
export const POINTS = {
  signup: 1,
  referral: 1,
  daily: 1,
  dealSubmit: 1,
  redeemAt: 100,
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly deals: DealsService,
    private readonly revalidate: RevalidateService,
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
    // Deals of theirs still waiting on a price check. The points are real but unpaid —
    // showing them as pending is the difference between "waiting" and "ignored".
    const pending = await this.prisma.deal.count({
      where: { submittedById: userId, status: 'PENDING_REVIEW' as never },
    });
    return {
      ...user,
      redeemAt: POINTS.redeemAt,
      checkedInToday: !!today,
      pendingDeals: pending,
      pendingPoints: pending * POINTS.dealSubmit,
    };
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
  async submitDeal(userId: number, body: DealSubmission) {
    const parsed = parseSubmission(body?.url ?? '');
    if ('error' in parsed) throw new BadRequestException(parsed.error);

    const num = (v: unknown) => {
      const n = Number(String(v ?? '').replace(/[^\d.]/g, ''));
      return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
    };
    const text = (v: unknown, max: number) => {
      const s = String(v ?? '').trim();
      return s ? s.slice(0, max) : null;
    };
    // Only our own CDN — an off-site <img> src from a form is an open redirect for hotlinks.
    const own = text(body?.image, 400);
    const image = own && /^https:\/\/[\w.-]*digitaloceanspaces\.com\//.test(own) ? own : null;
    const given = {
      title: text(body?.title, 140),
      description: text(body?.description, 2000),
      price: num(body?.price),
      mrp: num(body?.mrp),
      couponCode: text(body?.couponCode, 40)?.toUpperCase() ?? null,
      image,
    };
    if (given.mrp && given.price && given.mrp <= given.price) given.mrp = null;

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

    // Amazon bot-blocks our server, so there is no price to read — those wait for a
    // human check. Every other store gets its price off the live page.
    const live = parsed.store === 'amazon' ? null : await fetchLivePrice(parsed.cleanUrl);
    if (live && 'error' in live) {
      // A member who filled in the price themselves does not deserve a dead end;
      // their deal just waits for review like an Amazon one.
      if (!given.price) throw new BadRequestException(live.error);
    }
    const scraped = live && !('error' in live) ? live : null;

    const name = (given.title ?? scraped?.title ?? `${parsed.store} deal`)
      .replace(/\s*[|\-–]\s*(Buy|Shop|Price|Online).*$/i, '')
      .slice(0, 120);
    const price = given.price ?? scraped?.price ?? null;
    const mrp = given.mrp ?? scraped?.mrp ?? null;
    const pct = mrp && price && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : null;
    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)}-${parsed.productId.toLowerCase()}`.slice(0, 100);

    // Trust the store's own number, not the member's: publish straight away only when we
    // read the price ourselves and the member did not contradict it by more than ₹1.
    const verified = !!scraped?.price && (!given.price || Math.abs(scraped.price - given.price) <= 1);

    const { deal } = await this.deals.upsertFromIngest({
      ...base,
      slug,
      title: price ? `${name} at ₹${price}` : name,
      description:
        given.description ??
        `${name} is live${price ? ` at ₹${price}` : ''}${pct ? ` (${pct}% off)` : ''}. Price read off the store page when this deal was submitted.`,
      image: given.image ?? scraped?.image ?? undefined,
      price: price ?? undefined,
      mrp: mrp ?? undefined,
      discountPct: pct ?? undefined,
      couponCode: given.couponCode ?? undefined,
      status: verified ? 'live' : 'pending-review',
    } as never);
    await this.prisma.deal.update({ where: { id: deal.id }, data: { submittedById: userId } });

    if (!verified) {
      return {
        status: 'pending',
        points: 0,
        slug: deal.slug,
        message: 'Queued for a price check — it goes live and pays out once we confirm the price.',
      };
    }

    await this.award(userId, 'deal_submit', POINTS.dealSubmit, `deal_submit:${deal.id}`, deal.id);
    // A page nobody knows about earns nothing. Refresh the ISR pages it appears on and
    // tell IndexNow — same treatment our own ingests get.
    await this.revalidate.revalidate(this.revalidate.pathsForDeal(deal.slug, parsed.store));

    return {
      status: 'live',
      points: POINTS.dealSubmit,
      slug: deal.slug,
      message: `Live on the site. +${POINTS.dealSubmit} point (₹${POINTS.dealSubmit}).`,
    };
  }

  /** Deals this member sent in, newest first — with the status they are waiting on. */
  myDeals(userId: number) {
    return this.prisma.deal.findMany({
      where: { submittedById: userId },
      orderBy: { id: 'desc' },
      take: 50,
      select: { id: true, slug: true, title: true, image: true, price: true, status: true, createdAt: true },
    });
  }

  ledger(userId: number) {
    return this.prisma.pointEvent.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
      take: 30,
      select: { kind: true, points: true, dealId: true, createdAt: true },
    });
  }

  /**
   * Cash out the whole balance. Points are debited here, not when we pay — otherwise a
   * member could request ten times over the same 100 points. The balance is re-read
   * inside the transaction so two racing requests can't both pass the threshold check.
   */
  async redeem(userId: number) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId }, select: { points: true } });
      if (!user) throw new UnauthorizedException();
      if (user.points < POINTS.redeemAt) {
        throw new BadRequestException(`Redeeming starts at ${POINTS.redeemAt} points.`);
      }
      if (await tx.redemption.count({ where: { userId, status: 'pending' } })) {
        throw new BadRequestException('You already have a payout being processed.');
      }
      const amount = user.points;
      const r = await tx.redemption.create({ data: { userId, points: amount } });
      // Negative ledger row so the events still sum to the balance shown.
      await tx.pointEvent.create({
        data: { userId, kind: 'redeem', points: -amount, dedupeKey: `redeem:${r.id}` },
      });
      await tx.user.update({ where: { id: userId }, data: { points: { decrement: amount } } });
      return { id: r.id, points: amount, status: r.status };
    });
  }

  redemptions(userId: number) {
    return this.prisma.redemption.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
      take: 20,
      select: {
        id: true,
        points: true,
        status: true,
        voucher: true,
        note: true,
        createdAt: true,
        settledAt: true,
      },
    });
  }

  // ---- admin ----

  adminRedemptions(status?: string) {
    return this.prisma.redemption.findMany({
      where: status ? { status } : undefined,
      orderBy: { id: 'desc' },
      take: 100,
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }

  /** Paste the gift-card code (paid) or hand the points back (rejected). */
  async settleRedemption(id: number, status: string, voucher?: string, note?: string) {
    if (status !== 'paid' && status !== 'rejected') throw new BadRequestException('status must be paid|rejected');
    const r = await this.prisma.redemption.findUnique({ where: { id } });
    if (!r) throw new BadRequestException('No such redemption');
    if (r.status !== 'pending') throw new BadRequestException(`Already ${r.status}`);

    if (status === 'paid') {
      if (!voucher?.trim()) throw new BadRequestException('voucher code required');
      return this.prisma.redemption.update({
        where: { id },
        data: { status, voucher: voucher.trim(), settledAt: new Date() },
      });
    }
    // Rejected — we never paid, so the points go back.
    const [updated] = await this.prisma.$transaction([
      this.prisma.redemption.update({
        where: { id },
        data: { status, note: note?.trim() || null, settledAt: new Date() },
      }),
      this.prisma.pointEvent.create({
        data: {
          userId: r.userId,
          kind: 'redeem_refund',
          points: r.points,
          dedupeKey: `redeem_refund:${id}`,
        },
      }),
      this.prisma.user.update({ where: { id: r.userId }, data: { points: { increment: r.points } } }),
    ]);
    return updated;
  }
}
