import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  list(@Query('type') type?: string) {
    return this.categories.list(type);
  }

  @Get(':type/:slug')
  getOne(
    @Param('type') type: string,
    @Param('slug') slug: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return this.categories.getBySlug(
      type,
      slug,
      cursor ? Number(cursor) : undefined,
      limit ? Number(limit) : undefined,
    );
  }
}
