import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { CategoryDTO, CategoryType, DealDTO, Paginated } from '@deals/shared';
import { PrismaService } from '../prisma/prisma.service';
import { paginateDeals } from '../deals/deal.query';

// URL type segment -> Prisma enum. e.g. "shopping-category" -> "SHOPPING_CATEGORY".
const TYPE_MAP: Record<string, CategoryType> = {
  'shopping-category': 'SHOPPING_CATEGORY',
  'shopping-site': 'SHOPPING_SITE',
};

export function parseType(urlType: string): CategoryType {
  const t = TYPE_MAP[urlType];
  if (!t) throw new BadRequestException(`Unknown category type: ${urlType}`);
  return t;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(urlType?: string): Promise<CategoryDTO[]> {
    const where = urlType ? { type: parseType(urlType) } : {};
    const cats = await this.prisma.category.findMany({ where, orderBy: { name: 'asc' } });
    return cats.map((c) => ({ id: c.id, name: c.name, slug: c.slug, type: c.type }));
  }

  async getBySlug(
    urlType: string,
    slug: string,
    cursor?: number,
    limit?: number,
  ): Promise<{ category: CategoryDTO; deals: Paginated<DealDTO> }> {
    const type = parseType(urlType);
    const category = await this.prisma.category.findUnique({
      where: { type_slug: { type, slug } },
    });
    if (!category) throw new NotFoundException('Category not found');
    const deals = await paginateDeals(
      this.prisma,
      { status: 'LIVE', categories: { some: { categoryId: category.id } } },
      cursor,
      limit,
    );
    return {
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        type: category.type,
      },
      deals,
    };
  }
}
