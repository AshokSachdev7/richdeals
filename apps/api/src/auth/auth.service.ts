import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword, istDay, makeRefCode, verifyPassword } from './auth.util';

// Earning rates. Redeem is deliberately NOT implemented — points accrue, nothing pays out yet.
export const POINTS = {
  signup: 100,
  referral: 50,
  daily: 10,
  click: 2,
  redeemAt: 1000,
};

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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

  ledger(userId: number) {
    return this.prisma.pointEvent.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
      take: 30,
      select: { kind: true, points: true, dealId: true, createdAt: true },
    });
  }
}
