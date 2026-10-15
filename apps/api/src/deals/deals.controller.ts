import { Controller, Get, Param, Query } from '@nestjs/common';
import type { DealDTO, DealFeed, Paginated } from '@deals/shared';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly deals: DealsService) {}

  @Get()
  list(
    @Query('feed') feed?: DealFeed,
    @Query('cursor') cursor?: string,
    @Query('store') store?: string,
    @Query('category') category?: string,
    @Query('q') q?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('coupon') coupon?: string,
  ): Promise<Paginated<DealDTO>> {
    return this.deals.list({
      feed: feed ?? 'latest',
      cursor: cursor ? Number(cursor) : undefined,
      store,
      category,
      q,
      limit: limit ? Number(limit) : undefined,
      sort,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      coupon: coupon === '1',
    });
  }

  // Index-gate candidates (owner directive 2026-10-16: only the top 100 deals
  // stay indexable). Must stay above ':slug' or Nest routes it as a slug.
  @Get('top-indexable')
  topIndexable(): Promise<string[]> {
    return this.deals.topIndexableSlugs();
  }

  @Get(':slug')
  getOne(@Param('slug') slug: string): Promise<DealDTO> {
    return this.deals.getBySlug(slug);
  }
}
