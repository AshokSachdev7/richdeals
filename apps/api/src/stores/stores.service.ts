import { Injectable, NotFoundException } from '@nestjs/common';
import type { DealDTO, Paginated, StoreDTO } from '@deals/shared';
import { PrismaService } from '../prisma/prisma.service';
import { paginateDeals } from '../deals/deal.query';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  // A store with one or two live deals is a thin page — bad for AdSense review,
  // bad for crawl budget, and it was leaking into llms.txt as a headline "store"
  // (Tinyurl, Pedigree, Testbook, Cred all had exactly 1 deal). The deals stay
  // live at their own URLs; only the store hub stops being advertised.
  // ponytail: threshold, not a delete — an ingest that grows the store un-hides it.
  static readonly MIN_LIVE_DEALS = 3;

  async list(): Promise<StoreDTO[]> {
    const stores = await this.prisma.store.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { deals: { where: { status: 'LIVE' } } } } },
    });
    return stores
      .filter((s) => s._count.deals >= StoresService.MIN_LIVE_DEALS)
      .map((s) => ({ id: s.id, name: s.name, slug: s.slug, logo: s.logo }));
  }

  async getBySlug(
    slug: string,
    cursor?: number,
    limit?: number,
  ): Promise<{ store: StoreDTO; deals: Paginated<DealDTO> }> {
    const store = await this.prisma.store.findUnique({ where: { slug } });
    if (!store) throw new NotFoundException('Store not found');
    const deals = await paginateDeals(
      this.prisma,
      { status: 'LIVE', storeId: store.id },
      cursor,
      limit,
    );
    return {
      store: { id: store.id, name: store.name, slug: store.slug, logo: store.logo },
      deals,
    };
  }
}
