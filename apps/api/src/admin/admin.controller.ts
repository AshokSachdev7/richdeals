import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { DealsService } from '../deals/deals.service';
import { RevalidateService } from '../revalidate/revalidate.service';
import type { IngestDealDto } from '../deals/deal-ingest.dto';

// Write API for the ingest pipeline. Creating a deal here updates the DB and
// revalidates only the affected ISR pages — the site is never rebuilt.
@UseGuards(ApiKeyGuard)
@Controller('admin/deals')
export class AdminController {
  constructor(
    private readonly deals: DealsService,
    private readonly revalidate: RevalidateService,
  ) {}

  @Post()
  async create(@Body() dto: IngestDealDto) {
    const { deal, created, storeSlug } = await this.deals.upsertFromIngest(dto);
    await this.revalidate.revalidate(
      this.revalidate.pathsForDeal(deal.slug, storeSlug, deal.categories.map((c) => c.slug)),
    );
    return { created, deal };
  }

  // Bulk create — ingest posts an array in one call. Revalidates home + each deal.
  @Post('bulk')
  async createBulk(@Body() body: { deals: IngestDealDto[] }) {
    const items = Array.isArray(body?.deals) ? body.deals : [];
    const results: Array<{ slug: string; created?: boolean; ok: boolean; error?: string }> = [];
    const paths = new Set<string>(['/']);
    for (const dto of items) {
      try {
        const { deal, created, storeSlug } = await this.deals.upsertFromIngest(dto);
        this.revalidate.pathsForDeal(deal.slug, storeSlug, deal.categories.map((c) => c.slug)).forEach((p) => paths.add(p));
        results.push({ slug: dto.slug, created, ok: true });
      } catch (e) {
        results.push({ slug: dto.slug, ok: false, error: (e as Error).message });
      }
    }
    await this.revalidate.revalidate([...paths]);
    return { count: results.filter((r) => r.ok).length, results };
  }

  @Post(':id/expire')
  async expire(@Param('id', ParseIntPipe) id: number) {
    const deal = await this.deals.expire(id);
    await this.revalidate.revalidate(this.revalidate.pathsForDeal(deal.slug, deal.store.slug));
    return { deal };
  }

  // ---- Admin panel endpoints ----
  @Get()
  async list(
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
    @Query('status') status?: string,
    @Query('q') q?: string,
  ) {
    const deals = await this.deals.adminList({
      limit: limit ? Number(limit) : undefined,
      cursor: cursor ? Number(cursor) : undefined,
      status,
      q,
    });
    return { deals };
  }

  @Post(':id/status')
  async setStatus(@Param('id', ParseIntPipe) id: number, @Body() body: { status: string }) {
    const deal = await this.deals.setStatus(id, body.status);
    await this.revalidate.revalidate(this.revalidate.pathsForDeal(deal.slug, deal.store.slug));
    return { deal };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const res = await this.deals.remove(id);
    await this.revalidate.revalidate(['/']);
    return res;
  }
}
