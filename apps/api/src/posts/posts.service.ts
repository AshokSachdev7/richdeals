import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Post row → the shape the web's PostDTO expects (body→content, cover→coverImage).
function toPostDTO(p: {
  slug: string; title: string; excerpt: string | null; body: string;
  cover: string | null; author: string; publishedAt: Date | null;
  createdAt: Date; updatedAt: Date;
}) {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.body,
    coverImage: p.cover,
    author: p.author,
    publishedAt: (p.publishedAt ?? p.createdAt).toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    const rows = await this.prisma.post.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      take: 500,
    });
    return { items: rows.map(toPostDTO), nextCursor: null, total: rows.length };
  }

  async getBySlug(slug: string) {
    const p = await this.prisma.post.findFirst({ where: { slug, publishedAt: { not: null } } });
    if (!p) throw new NotFoundException('Post not found');
    return toPostDTO(p);
  }
}
