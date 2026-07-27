import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

// ponytail: hand-rolled scrypt hash + HMAC token instead of bcrypt/jsonwebtoken.
// Both are node builtins, so nothing to install and nothing to build on Windows or DO.
// Swap for a library if we ever need key rotation or RS256.

const SECRET = process.env.JWT_SECRET ?? 'dev-jwt-secret-change-me';
const TOKEN_DAYS = 30;

export const COOKIE = 'rd_session';

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const a = Buffer.from(hash, 'hex');
  const b = scryptSync(password, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}

const b64 = (s: string | Buffer) => Buffer.from(s).toString('base64url');

export function signToken(userId: number): string {
  const body = b64(JSON.stringify({ uid: userId, exp: Date.now() + TOKEN_DAYS * 864e5 }));
  return `${body}.${createHmac('sha256', SECRET).update(body).digest('base64url')}`;
}

export function verifyToken(token: string | undefined): number | null {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = createHmac('sha256', SECRET).update(body).digest('base64url');
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }
  try {
    const { uid, exp } = JSON.parse(Buffer.from(body, 'base64url').toString());
    return typeof uid === 'number' && exp > Date.now() ? uid : null;
  } catch {
    return null;
  }
}

/** Reads our session cookie off a raw Cookie header. Avoids pulling in cookie-parser. */
export function userIdFromCookieHeader(header: string | undefined): number | null {
  const raw = header
    ?.split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  return verifyToken(raw ? decodeURIComponent(raw) : undefined);
}

export const cookieOptions = {
  httpOnly: true as const,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: TOKEN_DAYS * 864e5,
  path: '/',
};

/** Calendar day in IST — the unit for daily check-ins and per-day click credit. */
export function istDay(now = new Date()): string {
  return new Date(now.getTime() + 5.5 * 3600e3).toISOString().slice(0, 10);
}

export function makeRefCode(): string {
  return randomBytes(4).toString('hex').toUpperCase();
}
