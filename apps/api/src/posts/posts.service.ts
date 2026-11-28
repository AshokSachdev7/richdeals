import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Post row → the shape the web's PostDTO expects (body→content, cover→coverImage).
function toPostDTO(p: {
  slug: string; title: string; excerpt: string | null; body: string;
  cover: string | null; author: string; publishedAt: Date | null;
  createdAt: Date; updatedAt: Date; seoTitle: string | null; seoDesc: string | null;
}) {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.body,
    coverImage: p.cover,
    seoTitle: p.seoTitle,
    seoDesc: p.seoDesc,
    author: p.author,
    publishedAt: (p.publishedAt ?? p.createdAt).toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  // ?limit=N keeps small consumers (homepage) off the 3.7MB full list.
  // ponytail: 5000 cap is all posts today (512); slug-only sitemap query if the full list outgrows it.
  async list(limit = 5000) {
    const rows = await this.prisma.post.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      take: Math.min(limit, 5000),
    });
    return { items: rows.map(toPostDTO), nextCursor: null, total: rows.length };
  }

  async getBySlug(slug: string) {
    const p = await this.prisma.post.findFirst({ where: { slug, publishedAt: { not: null } } });
    if (!p) throw new NotFoundException('Post not found');
    return toPostDTO(p);
  }
}
