import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get()
  list(@Query('limit') limit?: string) {
    return this.posts.list(Number(limit) || undefined);
  }

  @Get(':slug')
  getOne(@Param('slug') slug: string) {
    return this.posts.getBySlug(slug);
  }
}
