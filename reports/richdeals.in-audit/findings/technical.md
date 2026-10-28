# Technical SEO findings - richdeals.in (2026-10-28)
Score: 80/100. Verified with live requests: ~200 sitemap URLs fetched, 170 internal links sampled (all 200).

Pass: robots.txt valid + sitemap declared; sitemap index -> 3 children (63/100/425 URLs, no dupes, all 200, canonical==loc, none noindex); IndexNow key file 200 and matches; HSTS, nosniff, referrer-policy, X-Frame, permissions-policy present; http->https 308; trailing slash 308 -> clean; 404 returns real 404; unique title/desc/H1 on all sampled pages; no imgs without alt; /api/out 302 with x-robots noindex,nofollow + rel="sponsored nofollow noopener"; Product/BreadcrumbList/FAQPage/Article JSON-LD parse OK; br compression; static assets immutable.

Findings
MEDIUM | LCP image hidden until hydration | home + deal pages: SSR <img fetchpriority=high ... class="opacity-0"> (31 of 64 home imgs); fades in only after React onLoad | components/ProductImage.tsx:48 | render opacity-100 in SSR (drop the loaded-state gate, or use CSS-only fade / skip opacity-0 for priority images).
MEDIUM | Oversized HTML + RSC inline payload | / 320KB, /stores 346KB (252 imgs, 223KB inline script), /coupons 378KB, /freebies 334KB | app/page.tsx, app/stores/page.tsx | paginate/trim list props passed to client components; stores page shows 252 logos in one page.
MEDIUM | Slow/uncacheable dynamic HTML | /blog 1.3-2.1s, blog posts 1.4-3.2s TTFB (4 of 40 sampled timed out at 20s under 4-way concurrency, 200 on retry); Cache-Control private,no-store on /, deals, blog | blog/[slug]/page.tsx, blog/page.tsx | give blog/deal pages ISR (revalidate) like /offers (s-maxage) so Cloudflare/Googlebot get cached HTML.
LOW | 404 page has conflicting robots + wrong canonical | /nonexistent-xyz-123: two meta robots ("noindex" and "index, follow"), canonical=https://richdeals.in, generic home title/desc (status is correctly 404) | app/layout.tsx:46 metadata inherited by not-found.tsx | export metadata from not-found.tsx with robots {index:false}, no canonical.
LOW | No Content-Security-Policy header | curl -I / has no content-security-policy | next.config.* headers() | add report-only CSP first.
LOW | www host does not resolve | curl https://www.richdeals.in/ and http://www -> no response | DNS/Cloudflare | add www CNAME + 301 to apex.
LOW | Missing /manifest.webmanifest, /favicon.ico 404 | both 404 (icon.png + apple-icon linked, so only legacy bots affected) | app/ | add favicon.ico (or redirect) ; optional manifest.
LOW | Meta descriptions slightly long | 10 pages 166-174 chars (e.g. /category/shopping-category/books-stationery 174, /stores/shopsy 168); /stores/maharishi-ayurveda title 70 chars | lib/site.ts SEO helpers | cap desc at 160, title at 60.
LOW | Sitemap pages lastmod = request time | all 63 pages-sitemap lastmod identical 2026-10-28T17:19:43Z, hub/static pages change claims "hourly" | app/sitemaps/pages/sitemap.ts | use real content dates or omit lastmod (Google ignores untrusted lastmod).
INFO | ?query variants canonicalize correctly (/offers?utm=1 -> canonical /offers; /blog?page=2 noindex,follow). Thin store pages (e.g. /stores/levi) noindex,follow; only 13 stores in sitemap - consistent.
INFO | Images lack width/height attrs (next/image fill in aspect boxes) - CLS risk low as containers are sized; not verified in Lighthouse.
Not tested: hreflang (none present, none needed), CWV field data, Playwright render (SSR content is in raw HTML: h1, JSON-LD, links all present).
