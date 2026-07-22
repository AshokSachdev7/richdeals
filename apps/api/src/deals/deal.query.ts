import type { DealDTO, Paginated } from '@deals/shared';
import type { PrismaService } from '../prisma/prisma.service';
import { dealInclude, toDealDTO } from './deal.mapper';

export const MAX_LIMIT = 60;
export const DEFAULT_LIMIT = 30;

export function clampLimit(limit?: number): number {
  if (!limit || Number.isNaN(limit) || limit < 1) return DEFAULT_LIMIT;
  return Math.min(limit, MAX_LIMIT);
}

export type DealSort = 'newest' | 'discount' | 'price-asc' | 'price-desc';

// orderBy for each sort. id is always the tiebreaker (and the cursor key).
// ponytail: cursor pagination stays keyed on id, so deep-paging a non-newest
// sort would drift — our listing pages fetch a single page (limit only), so fine.
function orderByFor(sort?: string): any {
  switch (sort) {
    case 'discount':
      return [{ discountPct: { sort: 'desc', nulls: 'last' } }, { id: 'desc' }];
    case 'price-asc':
      return [{ price: { sort: 'asc', nulls: 'last' } }, { id: 'desc' }];
    case 'price-desc':
      return [{ price: { sort: 'desc', nulls: 'last' } }, { id: 'desc' }];
    default:
      return { id: 'desc' };
  }
}

// Cursor pagination by id desc, shared by deals/stores/categories list endpoints.
export async function paginateDeals(
  prisma: PrismaService,
  // `where` is a Prisma DealWhereInput; typed loose so callers can build it inline.
  where: any,
  cursor?: number,
  limit?: number,
  sort?: string,
): Promise<Paginated<DealDTO>> {
  const take = clampLimit(limit);
  const [rows, total] = await Promise.all([
    prisma.deal.findMany({
      where,
      include: dealInclude,
      orderBy: orderByFor(sort),
      take: take + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    }),
    prisma.deal.count({ where }),
  ]);

  const hasMore = rows.length > take;
  const items = (hasMore ? rows.slice(0, take) : rows).map(toDealDTO);
  const nextCursor = hasMore ? items[items.length - 1].id : null;
  return { items, nextCursor, total };
}
