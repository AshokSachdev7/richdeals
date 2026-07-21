import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

// Simple shared-secret guard for write endpoints. Send header:
//   x-admin-key: <ADMIN_KEY>
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const key = process.env.ADMIN_KEY;
    if (!key) throw new UnauthorizedException('ADMIN_KEY not configured');
    const req = context.switchToHttp().getRequest();
    if (req.headers['x-admin-key'] !== key) throw new UnauthorizedException('Invalid admin key');
    return true;
  }
}
