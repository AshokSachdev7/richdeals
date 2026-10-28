# richdeals.in Full SEO Audit (claude-seo v2.5.0, 2026-10-28)

## Executive summary

**SEO Health Score: 69/100 before fixes. Projected 73/100 after fix commit `a169b7a`.** The projection is an estimate; the performance part has not been re-measured since the deploy.

**Business type:** affiliate deals and coupon aggregator / publisher (India, INR, 14.8k LIVE deals, 442 posts).

| Category | Weight | Pre-fix | Projected | Source |
|---|---|---|---|---|
| Technical SEO | 22% | 80 | 84 | findings/technical.md |
| Content Quality | 23% | 58 | 62 | findings/content.md |
| On-Page SEO | 20% | 75 | 77 | technical + content + sxo |
| Schema | 10% | 74 | 80 | findings/schema.md |
| Performance (CWV) | 10% | 62 | ~70 (lab, re-measure) | findings/performance.md |
| AI Search Readiness | 10% | 61 | 63 | findings/geo.md (agentic 86) |
| Images | 5% | 70 | 74 | performance + content |

Side scores, not part of the health score: SXO gap 51/100, e-commerce 62/100, agentic 86/100.

### Top issues found
1. **CRITICAL:** `/blog/raksha-bandhan-gift-deals-india` had a Raksha Bandhan title on top of the Great Indian Festival guide's body; the two posts were byte-identical in the DB. **Fixed:** it now 308s to `amazon-great-indian-festival-2026-guide`.
2. **HIGH:** Mobile LCP was 9–11s on home, /blog, posts and deals. The causes:
   - images stayed at opacity-0 until hydration and onLoad;
   - a 1500px Amazon image was served into cards about 240px wide;
   - a Telegram modal opened at 2.5s.

   **Fixed:** all three.
3. **HIGH:** Deal pages claimed a live price ("Live price — pulled straight from the store") next to "Updated 3 months ago". **Fixed:** deal pages now say "Price checked on {store} on {date}". The FAQ wording switches when the check is stale, and `priceValidUntil` is the check date + 14d.
4. **HIGH:** 21 intent-duplicate clusters cover 49 of 425 indexable posts. *Deferred:* each merge needs an editorial pick (see ACTION-PLAN).
5. **HIGH:** 91 posts link only to the thin YMYL `/offers` page as their commercial link. *Deferred:* those posts need relinking to real deal or store pages.

### Fixed in this pass (commit `a169b7a`, deployed 2026-10-28 17:36Z)
| Area | Fix | File |
|---|---|---|
| Perf | Removed the opacity-until-loaded gate, which held LCP | `components/ProductImage.tsx`, `components/LazyImage.tsx` |
| Perf | Blog cover and featured card load `eager` with `fetchpriority=high` | `LazyImage.tsx`, `BlogCard.tsx`, `blog/[slug]/page.tsx` |
| Perf/Images | Deal cards request Amazon `._SL400_.` instead of 1200–1500px | `components/DealCard.tsx` |
| Perf/UX | Telegram modal opens at 12s (was 2.5s) with no backdrop blur, avoiding the intrusive-interstitial pattern | `components/TelegramModal.tsx` |
| Technical | robots allows `/api/out/` (the deal CTA) and adds Claude-SearchBot and Claude-User | `app/robots.ts` |
| Technical | 404 page gets its own title and no inherited canonical | `app/not-found.tsx` |
| Technical | Static sitemap URLs dropped their always-"now" `lastmod` | `sitemaps/pages/sitemap.ts` |
| Schema | ItemList on hubs is url-only, so there is no Product+Offer markup on list pages | `lib/site.ts` |
| Schema | Deal Offer drops `seller` and ties `priceValidUntil` to the price-check date | `[dealSlug]/page.tsx` |
| Schema | Category breadcrumb level 2 points to `/categories` | `category/[type]/[slug]/page.tsx` |
| Content/Trust | Deal pages show "Price checked on {store} on {date}", and the FAQ wording switches when the check is stale | `[dealSlug]/page.tsx`, `lib/site.ts` |
| Content/Trust | Amazon Associates statement added to the footer and /disclosure | `layout.tsx`, `disclosure/page.tsx` |
| Content | Fixed the "RichDeals's" typo in the FAQ copy | `lib/site.ts` |
| On-Page | Category pages get a unique meta description | `category/[type]/[slug]/page.tsx` |
| GEO | llms-full.txt uses clean product names | `llms-full.txt/route.ts` |
| Content | Duplicate Raksha Bandhan post 308s to the canonical guide | `post-redirects.json` |
| On-Page | Related posts on blog pages render as h3, fixing heading order | `BlogCard.tsx`, `blog/[slug]/page.tsx` |

### Excluded by design (not findings)
- Only the top-100 deals are in the sitemap; the rest are `noindex,follow`.
- Expired deals stay live with a banner.
- Outbound links go through `/out` with `rel="sponsored nofollow"`.
- og:type is `website`.
- Deal slugs live at the root.
- The blog is capped at 4 posts/day.
- Thin store pages are noindex.

## Technical SEO (80 → ~84)
**What works:**
- HTTPS and HSTS are in place.
- The sitemap index has pages, deals and blog children.
- IndexNow is live.
- About 200 sitemap URLs and 170 sampled internal links all returned 200.
- Canonicals are self-referencing.
- robots and llms.txt are served.

**Open items:**
- HTML is uncached (`cache-control: private, no-store` on ISR pages). /blog TTFB is about 1s.
- CSP is report-only.
- `www` DNS needs checking.
- `/favicon.ico` and the web manifest return 404.

## Content Quality (58 → ~62)
E-E-A-T (pre-fix): Experience 35, Expertise 45, Authority 30, Trust 45. AI citation readiness: 68.

**Open items:**
- 21 cannibal clusters.
- 91 posts link only to `/offers`.
- No named author, editor or editorial-policy page. Every post is credited to "RichDeals Editorial".
- No contact email or legal entity (everything routes to Telegram).
- Only 36 of 425 posts cite any external source.
- Median Flesch score is 55.7; 160 posts score under 50.

## On-Page SEO (75 → ~77)
**Open items:**
- `/maharishi-ayurveda` has a 70-character title.
- Some store slugs are not the brand name.
- `/stores` HTML is 346KB.

## Schema (74 → ~80)
**Live JSON-LD:**
- Product, Offer, BreadcrumbList and FAQPage on deal pages.
- Article on posts.
- Organization and WebSite site-wide.

**Open items:**
- Organization has no `contactPoint`, and `sameAs` lacks YouTube/Instagram.
- No priceHistory row is written on price-sync.

## Performance (62 → re-measure)
Lab results before the fix (mobile vs desktop):

| Page | Mobile score | Mobile LCP | Desktop score |
|---|---|---|---|
| home | 53 | 11.4s | 92 |
| /blog | 60 | 9.8s | 75 |
| post | 58 | 8.9s | 83 |
| deal | 57 | 9.7s | 88 |
| /offers | 88 | 1.0s | 96 |

CLS is 0 everywhere. The LCP blockers are now fixed.

**Open items:**
- Blog covers are not served as WebP.
- AdSense and GTM load eagerly.

## AI Search Readiness (61 → ~63)
**Dimension scores:**

| Dimension | Score |
|---|---|
| Technical access | 88 |
| Structure | 78 |
| Citability | 66 |
| Multi-modal | 45 |
| Authority & brand | 22 |

The limiter is off-site brand footprint: no Bing/web mentions, no YouTube, no Reddit. That is domain authority, not on-page work (see memory `traffic-ceiling`).

## Images (70 → ~74)
- Alt text is present on cards and covers.
- Card images are now sized to about 400px.
- Covers are still PNG/JPEG.
