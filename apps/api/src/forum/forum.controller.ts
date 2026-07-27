import { Body, Controller, Get, Headers, Post, Query, UnauthorizedException } from '@nestjs/common';
import { ForumService, Tab } from './forum.service';
import { userIdFromCookieHeader } from '../auth/auth.util';

const TABS: Tab[] = ['hot', 'new', 'top', 'unanswered'];

@Controller('forum')
export class ForumController {
  constructor(private readonly forum: ForumService) {}

  @Get()
  list(@Query('tab') tab?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
    const t = TABS.includes(tab as Tab) ? (tab as Tab) : 'hot';
    return this.forum.list(t, Number(page) || 1, Number(limit) || 20);
  }

  @Get('leaderboard')
  leaderboard() {
    return this.forum.leaderboard();
  }

  @Get('thread')
  thread(@Query('slug') slug: string, @Headers('cookie') cookie?: string) {
    return this.forum.thread(slug, userIdFromCookieHeader(cookie));
  }

  @Post('vote')
  vote(@Body() body: { slug?: string; value?: number }, @Headers('cookie') cookie?: string) {
    return this.forum.vote(this.uid(cookie), body.slug ?? '', Number(body.value));
  }

  @Post('comment')
  comment(
    @Body() body: { slug?: string; body?: string; flag?: string },
    @Headers('cookie') cookie?: string,
  ) {
    return this.forum.comment(this.uid(cookie), body.slug ?? '', body.body ?? '', body.flag);
  }

  private uid(cookie?: string): number {
    const id = userIdFromCookieHeader(cookie);
    if (!id) throw new UnauthorizedException('Sign in to take part.');
    return id;
  }
}
