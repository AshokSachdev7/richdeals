import { Body, Controller, Get, Headers, Post, Res, UnauthorizedException } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { COOKIE, cookieOptions, signToken, userIdFromCookieHeader } from './auth.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { email?: string; password?: string; name?: string; ref?: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const id = await this.auth.register(body.email ?? '', body.password ?? '', body.name, body.ref);
    res.cookie(COOKIE, signToken(id), cookieOptions);
    return this.auth.me(id);
  }

  @Post('login')
  async login(
    @Body() body: { email?: string; password?: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const id = await this.auth.login(body.email ?? '', body.password ?? '');
    res.cookie(COOKIE, signToken(id), cookieOptions);
    return this.auth.me(id);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(COOKIE, { ...cookieOptions, maxAge: undefined });
    return { ok: true };
  }

  @Get('me')
  me(@Headers('cookie') cookie?: string) {
    return this.auth.me(this.uid(cookie));
  }

  @Post('checkin')
  checkIn(@Headers('cookie') cookie?: string) {
    return this.auth.checkIn(this.uid(cookie));
  }

  @Post('submit-deal')
  submitDeal(@Body() body: { url?: string }, @Headers('cookie') cookie?: string) {
    return this.auth.submitDeal(this.uid(cookie), body.url ?? '');
  }

  @Get('ledger')
  ledger(@Headers('cookie') cookie?: string) {
    return this.auth.ledger(this.uid(cookie));
  }

  private uid(cookie?: string): number {
    const id = userIdFromCookieHeader(cookie);
    if (!id) throw new UnauthorizedException();
    return id;
  }
}
