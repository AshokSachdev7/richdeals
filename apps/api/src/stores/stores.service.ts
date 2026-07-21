import { Injectable, NotFoundException } from '@nestjs/common';
import type { DealDTO, Paginated, StoreDTO } from '@deals/shared';
import { PrismaService } from '../prisma/prisma.service';
import { paginateDeals } from '../deals/deal.query';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<StoreDTO[]> {
    const stores = await this.prisma.store.findMany({ orderBy: { name: 'asc' } });
    return stores.map((s) => ({ id: s.id, name: s.name, slug: s.slug, logo: s.logo }));
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
