import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Force HTTPS. DigitalOcean's edge terminates TLS and forwards the original
// scheme in x-forwarded-proto; when it's plain http we 308-redirect to the
// https URL (same host + path + query). Avoids duplicate http/https content
// for SEO and stops any plain-text requests.
export function middleware(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto");
  if (proto === "http") {
    const host = req.headers.get("host") ?? req.nextUrl.host;
    const url = `https://${host}${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Run on everything except Next's internal static assets.
  matcher: ["/((?!_next/static|_next/image).*)"],
};
