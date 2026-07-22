import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get()
  list() {
    return this.posts.list();
  }

  @Get(':slug')
  getOne(@Param('slug') slug: string) {
    return this.posts.getBySlug(slug);
  }
}
