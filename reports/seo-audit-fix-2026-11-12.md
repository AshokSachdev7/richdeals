# SEO-AUDIT-FIX 2026-11-12 (~06:20 IST)

**Result:** clean. A full-site qiaomu-seo crawl covered 51 pages across every page type, plus the sitemap index and children, robots.txt, llms.txt and llms-full.txt, all 482 posts and every internal link in post bodies. It found 0 on-page defects. The only flags were by-design noindex pages. No fix was needed, so this tick ran no build, no deploy and no IndexNow ping.

## Page audit by type (prod, static HTML)

Each page was checked for title (20–65), description (70–165), canonical = richdeals.in, H1 count, og:image, JSON-LD types, `/out/` rel="sponsored nofollow", img alt, and duplicate titles/descriptions.

| Type | Pages | Issues | Notes |
|---|---|---|---|
| Hubs | 12 | 0 | |
| Stores | 8 | 0 | pedigree, ajio and cred are noindex (0 LIVE deals, by design) |
| Categories | 12 | 0 | |
| Deals (top by clicks + newest) | 12 | 0 | Product + BreadcrumbList + FAQPage on all. 7 are outside the top-100 and served `noindex,follow` (by design) |
| Blog posts | 7 | 0 | Article + BreadcrumbList on all |

The 7 noindex deal pages (outside the top-100, by design): the-man-company-perfume-gift-set…, gadgets-wrap-star-of-david-wall-decal…, larah-by-borosil-belle-opalware-dinner-set…, milton-odyssy-3-container-lunch-box…, da-urban-merlion-pro-high-back-mesh-office-chair…, havells-innova-neo-3w-led-spot-light…, tp-link-vigi-nvr2016h-16-channel…

## Crawl surfaces

| Surface | 11-12 | 11-04 |
|---|---|---|
| Sitemap URLs | 630, 0 dups | 605 |
| Blog URLs in sitemap | 464, newest post present | 442 |
| Deals in sitemap | top-100 (by design) | top-100 |
| robots.txt | 16 UA blocks, Sitemap line, AI crawlers allowed | same |
| llms.txt | 200, 17,025 B | 16,980 B |
| llms-full.txt | 200, 39,206 B | 39,020 B |

## Post sweep

482 posts: 0 seoTitle over 60, 0 seoDesc outside 150–160, 0 coverless, 0 empty alt. The one duplicate-title pair (340 = 300) is known and already 308s.

## Internal links

1,597 unique targets and 3,180 refs (11-04: 1,479 and 3,023). 0 dead (200/301/308 all count as ok).

## Fix applied

None. Nothing failed, so nothing was changed.

| Stage | Status |
|---|---|
| Implemented | n/a, no change |
| Deployed and observable | n/a |
| Processed by search platform | n/a |
| Outcome observed | n/a |

## Freshness

No URLs changed, so no IndexNow ping was needed. `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.52s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,826 = 15,826 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts write no priceHistory row, so about 91% of LIVE Offers lack `priceValidUntil`.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) was delisted to EXPIRED on 12c because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
