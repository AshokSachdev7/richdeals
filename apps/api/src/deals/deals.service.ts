import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { DealDTO, DealFeed, Paginated } from '@deals/shared';
import { PrismaService } from '../prisma/prisma.service';
import { dealInclude, toDealDTO } from './deal.mapper';
import { paginateDeals } from './deal.query';
import { IngestDealDto, mapStatus, toStoreSlug, titleCase } from './deal-ingest.dto';

export interface UpsertResult {
  deal: DealDTO;
  created: boolean;
  storeSlug: string;
}

// Admin panel/URLs may send status as kebab or lowercase ("pending-review");
// the DB enum is UPPER_SNAKE ("PENDING_REVIEW"). Normalise so the query doesn't
// blow up with a Prisma enum error. Unknown values pass through unchanged.
const DEAL_STATUSES = ['LIVE', 'EXPIRED', 'PENDING_REVIEW', 'DRAFT'];
function normStatus(s: string): string {
  const up = s.trim().toUpperCase().replace(/-/g, '_');
  return DEAL_STATUSES.includes(up) ? up : s;
}

export interface DealListQuery {
  feed?: DealFeed;
  cursor?: number;
  store?: string;
  category?: string;
  q?: string;
  limit?: number;
  sort?: string;
}

@Injectable()
export class DealsService {
  constructor(private readonly prisma: PrismaService) {}

  list(q: DealListQuery): Promise<Paginated<DealDTO>> {
    const where: Record<string, unknown> = { status: 'LIVE' };
    if (q.feed === 'hot') where.isHot = true;
    if (q.feed === 'super') where.isSuper = true;
    if (q.store) where.store = { slug: q.store };
    if (q.category) where.categories = { some: { category: { slug: q.category } } };
    if (q.q && q.q.trim()) {
      const term = q.q.trim();
      where.OR = [
        { title: { contains: term, mode: 'insensitive' } },
        { description: { contains: term, mode: 'insensitive' } },
      ];
    }
    return paginateDeals(this.prisma, where, q.cursor, q.limit, q.sort);
  }

  async getBySlug(slug: string): Promise<DealDTO> {
    const deal = await this.prisma.deal.findFirst({
      // EXPIRED deals stay reachable; DRAFT/PENDING_REVIEW do not.
      where: { slug, status: { in: ['LIVE', 'EXPIRED'] } },
      include: dealInclude,
    });
    if (!deal) throw new NotFoundException('Deal not found');
    return toDealDTO(deal);
  }

  // Create or update a deal from an ingest payload. Idempotent on
  // (store, productId), then slug. Records price history on price change.
  async upsertFromIngest(dto: IngestDealDto): Promise<UpsertResult> {
    if (!dto.title || !dto.affiliateUrl || !dto.slug || !dto.store) {
      throw new BadRequestException('title, affiliateUrl, slug and store are required');
    }

    const storeSlug = toStoreSlug(dto.store);
    const store = await this.prisma.store.upsert({
      where: { slug: storeSlug },
      update: {},
      create: { slug: storeSlug, name: titleCase(dto.store) },
    });

    const data = {
      slug: dto.slug,
      sourceSlug: dto.sourceSlug ?? null,
      title: dto.title,
      description: dto.description ?? null,
      howTo: dto.howTo ?? [],
      image: dto.image ?? null,
      mrp: dto.mrp ?? null,
      price: dto.price ?? null,
      discountPct: dto.discountPct ?? null,
      couponCode: dto.couponCode ?? null,
      couponNote: dto.couponNote ?? null,
      // Auto-flag when not set: big discount or cheap loot = Super; good price = Hot.
      isSuper:
        dto.isSuper ??
        ((dto.discountPct != null && dto.discountPct >= 60) || (dto.price != null && dto.price <= 250)),
      isHot: dto.isHot ?? (dto.price != null && dto.price <= 500),
      status: mapStatus(dto.status),
      productId: dto.productId ?? null,
      affiliateUrl: dto.affiliateUrl,
      storeId: store.id,
    };

    const existing =
      (dto.productId
        ? await this.prisma.deal.findUnique({
            where: { store_product: { storeId: store.id, productId: dto.productId } },
          })
        : null) ?? (await this.prisma.deal.findUnique({ where: { slug: dto.slug } }));

    let id: number;
    let created = false;
    if (existing) {
      id = existing.id;
      await this.prisma.deal.update({ where: { id }, data });
      // log price history only when the price actually moved
      if (data.price != null && existing.price !== data.price) {
        await this.prisma.priceHistory.create({ data: { dealId: id, price: data.price } });
      }
    } else {
      const row = await this.prisma.deal.create({ data });
      id = row.id;
      created = true;
      if (data.price != null) {
        await this.prisma.priceHistory.create({ data: { dealId: id, price: data.price } });
      }
    }

    const full = await this.prisma.deal.findUniqueOrThrow({ where: { id }, include: dealInclude });
    return { deal: toDealDTO(full), created, storeSlug };
  }

  async expire(id: number): Promise<DealDTO> {
    const row = await this.prisma.deal.update({
      where: { id },
      data: { status: 'EXPIRED' },
      include: dealInclude,
    });
    return toDealDTO(row);
  }

  // Admin list — every status (LIVE/EXPIRED/PENDING_REVIEW/DRAFT), newest first.
  async adminList(opts: { limit?: number; cursor?: number; status?: string; q?: string }): Promise<DealDTO[]> {
    const where: Record<string, unknown> = {};
    if (opts.cursor) where.id = { lt: opts.cursor };
    if (opts.status) where.status = normStatus(opts.status);
    if (opts.q && opts.q.trim()) where.title = { contains: opts.q.trim(), mode: 'insensitive' };
    const rows = await this.prisma.deal.findMany({
      where,
      orderBy: { id: 'desc' },
      take: Math.min(opts.limit ?? 50, 100),
      include: dealInclude,
    });
    return rows.map(toDealDTO);
  }

  async setStatus(id: number, status: string): Promise<DealDTO> {
    const row = await this.prisma.deal.update({ where: { id }, data: { status: normStatus(status) as never }, include: dealInclude });
    return toDealDTO(row);
  }

  // Hard delete — FK children (categories, priceHistory, clicks) cascade.
  async remove(id: number): Promise<{ id: number }> {
    const row = await this.prisma.deal.findUnique({ where: { id }, include: dealInclude });
    if (!row) throw new NotFoundException('Deal not found');
    await this.prisma.deal.delete({ where: { id } });
    return { id };
  }
}
