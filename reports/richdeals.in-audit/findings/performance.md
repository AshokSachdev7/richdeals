# richdeals.in performance audit (2026-10-28)

Lab data only: no CrUX/GSC credentials, so field CWV pass/fail is unknown. PSI API was rate-limited, so local Lighthouse 13.6.0 (headless Chrome) was used. Mobile = default Lighthouse (Moto G Power, slow 4G, 4x CPU); desktop = desktop preset. Single run per page, so expect noise (+/-5 pts). Desktop blog/post first run hit NO_FCP (parallel load) and were re-run alone.

**Score: 62/100** (mobile avg 63, desktop avg 87; weighted to mobile).

| Page | Mob score | Mob LCP | Mob FCP | Mob TBT | CLS | Desk score | Desk LCP | Desk TBT | HTML TTFB m/d |
|---|---|---|---|---|---|---|---|---|---|
| home | 53 | 11.4s | 4.1s | 300ms | 0 | 92 | 0.8s | 20ms | 270/200ms |
| /offers | 88 | 1.0s | 1.0s | 350ms | 0 | 96 | 0.3s | 20ms | 50/70ms |
| /blog | 60 | 9.8s | 1.2s | 370ms | 0 | 75 | 3.3s | 0 | 970/1090ms |
| post | 58 | 8.9s | 1.0s | 480ms | 0 | 83 | 2.2s | 0 | 660/580ms |
| deal | 57 | 9.7s | 4.1s | 220ms | 0 | 88 | 1.7s | 60ms | 90/180ms |

CWV status (lab): CLS pass everywhere (0). LCP FAIL on mobile for home/blog/post/deal; /offers pass. TBT is a lab proxy for INP (no INP in lab): 220-480ms mobile = likely needs-improvement risk, unverified. Desktop passes except /blog LCP 3.3s (needs improvement).

LCP elements and subparts (mobile): home = TelegramModal `<p class="mt-1 text-sm text-white/90">` (TTFB 315, render delay 3153ms); deal = main product img from m.media-amazon.com (TTFB 137, load delay 6, load duration 94, render delay 1613); blog = first BlogCard cover img (TTFB 1014, load delay 279, load duration 1637, render delay 537); post = cover img (708/222/1364/563); offers = hero `<p>`.

Page weight (mobile transfer): home 2510KiB (img 1715KiB), offers 769, blog 1607, post 847, deal 1629. JS ~553-565KiB on every page (site 290-340KiB + AdSense 245 + GTM 177 transfer). Third parties: Google Tag Manager/GA4 ~181KB, AdSense/Doubleclick ~226KB + adtrafficquality 22KB, Cloudflare beacon 10KB. Lighthouse: unused JS 150-218KiB (mostly AdSense show_ads_imp, GTM). 2 render-blocking CSS files on every page (a177d43d..css and 3c5ee924..css, ~1.5s est. on mobile, lab). Fonts: 2 woff2 preloaded, font-display insight clean (no waste). Cache: /_next/static immutable 1yr (good), /stores/*.svg 4h, Amazon images ~20y, HTML `private, no-cache, no-store` + cf-cache-status DYNAMIC on home/blog/post/deal (force-dynamic, no edge caching).

## Findings

HIGH | Telegram popup becomes LCP and covers mobile above-the-fold on every page | home mobile LCP element is the modal's `<p class="mt-1 text-sm text-white/90">`, render delay 3153ms, LCP 11.4s; screenshots home-mobile.png and deal-mobile.png show full-screen blurred overlay covering ~50% of viewport and the hero/product; fires after 2500ms | apps/web/src/components/TelegramModal.tsx (setTimeout 2500, `fixed inset-0 backdrop-blur`), mounted in app/layout.tsx:104 | Delay to first interaction/scroll or >=8s, render as a bottom bar not a modal, drop backdrop-blur; keep LCP candidates in real content. Also a Google intrusive-interstitial risk for mobile search landings.
HIGH | Product image hidden (opacity-0) until a client-side onLoad, inflating LCP render delay | deal mobile: image load duration 94ms but render delay 1613ms; fetchpriority=high is correctly applied | apps/web/src/components/ProductImage.tsx (`loaded ? opacity-100 : opacity-0`, onLoad via useState, plus a pulse skeleton) | Render the img visible by default (no opacity gate, or check `img.complete` in a ref callback); LCP images should not depend on hydration.
HIGH | Blog list/post cover images are loading="lazy" and opacity-0-gated, no fetchpriority; LCP 8.9-9.8s mobile | blog/post LCP element is `<img loading="lazy" ... opacity-0>`; lcp-discovery: fetchpriority=high NOT applied; load duration 1364-1637ms | apps/web/src/components/BlogCard.tsx, apps/web/src/app/blog/[slug]/page.tsx (cover img), app/blog/page.tsx | Use priority/eager + fetchPriority="high" on post cover and first BlogCard (only first 1-2), remove opacity-0 gate.
HIGH | Blog covers are oversized PNGs on DO Spaces, unoptimized | image-delivery-insight est. savings 526KiB on /blog (each cover ~60KB over, e.g. og/smart-ring-vs-smartwatch-which-to-buy-india.png), 55KiB on post; blog transfers 848KiB of covers | gen-blog-covers.mjs output (apps/api/scripts) + BlogCard/blog page img tags (no srcset/sizes) | Generate WebP/AVIF at 400w + 1200w, use next/image or srcset with sizes; Spaces CDN domain.
HIGH | Dynamic HTML with slow TTFB on blog pages, no CDN caching | /blog TTFB 970ms mobile / 1090ms desktop (curl 0.70s), post 580-660ms, vs offers 50-70ms (prerendered/cached); header `cache-control: private, no-cache, no-store`, cf-cache-status DYNAMIC | `export const dynamic = "force-dynamic"` in app/blog/page.tsx:9, app/blog/[slug]/page.tsx:17, app/page.tsx:16, app/[dealSlug]/page.tsx:16 | /offers already proves the fix (cacheable); use revalidate + tag revalidation or Cloudflare cache rules with short s-maxage + stale-while-revalidate for blog/home/deal. Note the code comment says revalidation was broken by /api ingress shadowing, so fix that route first.
MEDIUM | Home ships 1.7MB of marketplace images, unoptimized, full 1500px | image-delivery-insight 1,670KiB savings on home; m.media-amazon.com `_SL1500_.jpg` 290KB/245KB/186KB used in small cards; rukmini1.flixcart.com 234KB | components/ProductImage.tsx (`unoptimized`), DealCard.tsx sizes="(max-width:640px) 50vw..." | Rewrite Amazon URLs to `._SL300_.jpg`/`_AC_UL320_` via a loader, or re-enable next/image optimizer with an allow-list loader; keep `loading="lazy"` below fold.
MEDIUM | Home FCP 4.1s (and deal 4.1s) mobile: two render-blocking CSS files | render-blocking insight: 3c5ee9245f94e27d.css ~1490ms, a177d43d90018d7b.css 150-13300ms est. wasted | app/globals.css via Tailwind build (apps/web) | Inline critical CSS (experimental.inlineCss) or merge; check what the second CSS is (likely page-level) and purge unused.
MEDIUM | AdSense + GTM load early and are the bulk of JS; TBT 220-480ms mobile | adsbygoogle.js + show_ads_imp 245KB, gtag 177KB, unused-JS savings 196-218KiB; preload links for both injected before LCP image on post page; GTM tasks 142ms/114ms | apps/web/src/components/AdSense.tsx, Analytics.tsx (strategy="afterInteractive") | Use `lazyOnload` (or after first interaction) for AdSense and GA; remove the preloads on non-ad pages; ad-less on landing for first paint.
LOW | Decorative store logos lack dimensions (14 unsized imgs on deal page) | unsized-images audit: `/stores/amazon.svg` with only h-* classes; CLS still 0 so not a current shift | DealCard/store badge components, deal page | Add width/height attrs.
LOW | /stores/*.svg cache 4h only | cache-control: public, max-age=14400 | public/stores, or Next headers() in next.config.js | Set immutable/long max-age with versioned names.

## Not found
CLS issues (0 on all 10 runs); font loading problems; Amazon image caching (fine).

## Screenshots
F:/new_projects/deals/reports/richdeals.in-audit/screenshots/{home,offers,blog,post,deal}-{desktop,mobile}.png (the only visible layout problem seen: the modal above; other pages not individually viewed for desktop; a few earlier empty dirs home/offers/blog/post/deal may exist, harmless).
