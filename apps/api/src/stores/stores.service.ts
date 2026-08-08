import { Injectable, NotFoundException } from '@nestjs/common';
import type { DealDTO, Paginated, StoreDTO } from '@deals/shared';
import { PrismaService } from '../prisma/prisma.service';
import { paginateDeals } from '../deals/deal.query';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  // Owner directive 2026-08-08: surface EVERY store hub (even 0 live deals) —
  // the 245-store directory imported from the store list exists for the traffic
  // those pages pull, so list() no longer filters by live-deal count. Store hubs
  // render an empty-state ("No X deals live right now") rather than 404.
  async list(): Promise<StoreDTO[]> {
    const stores = await this.prisma.store.findMany({
      orderBy: { name: 'asc' },
    });
    return stores.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      logo: s.logo,
    }));
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
