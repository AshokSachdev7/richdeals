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
  ): Promise<Paginated<DealDTO>> {
    return this.deals.list({
      feed: feed ?? 'latest',
      cursor: cursor ? Number(cursor) : undefined,
      store,
      category,
      q,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get(':slug')
  getOne(@Param('slug') slug: string): Promise<DealDTO> {
    return this.deals.getBySlug(slug);
  }
}
