# SEO-AUDIT-FIX daily tick — 2026-11-15

This tick ran a full-site crawl of the DO app (`richdeals-jw726.ondigitalocean.app`) with `_seo1115.cjs` (unchanged from `_seo1112.cjs`), then swept every post and every internal link in post bodies. Run at about 05:58–06:05 IST.

**Result: 0 on-page defects across 51 pages. Nothing needed fixing, so there was no build, no deploy and no IndexNow ping. One crawl flag ("newest post not in sitemap") was a script false positive: the newest post IS in the blog sitemap. The 18 posts missing from the blog sitemap are all 308-redirected merged duplicates, which is correct. Prod is 7/7 at 200 and every CEO-audit check is green.**

## Page audit by type

Checks per page:

- title length 20–65 and description length 70–165;
- the canonical matches the URL;
- exactly one H1;
- og:image present;
- JSON-LD types: Product, BreadcrumbList and FAQPage on deal pages; Article and BreadcrumbList on posts;
- every `/out/` link has `rel` sponsored and nofollow;
- every img has alt text;
- no duplicate titles or descriptions;
- noindex flags.

| Type | Pages | Defects |
|---|---|---|
| Hubs | 12 | 0 |
| Stores | 8 | 0 |
| Categories | 12 | 0 |
| Deals | 12 | 0 |
| Blog | 7 | 0 |
| **Total** | **51** | **0** |

These pages are noindex by design:

- Stores pedigree, ajio and cred, which have 0 LIVE deals.
- 7 deal pages outside the top 100, served `noindex, follow`, as the owner set on 10-16:
  - the-man-company-perfume-gift-set-timeless-fragrances-200-ml-pergvy
  - dayneo-classic-t47-bluetooth-headphone-with-mic-acchsqy2gpfujffp
  - zonezer-set-of-2-artificial-money-plants-with-white-pots-arfhsgfzsmhcysv3
  - dubstep-pop-1400-14w-portable-bluetooth-speaker-b0fhhqqnzy
  - wireless-heated-shiatsu-neck-shoulder-massager-b0hb64mlwp
  - hp-360-mono-portable-bluetooth-speaker-b08nqxp8cr
  - lifelong-automatic-yogurt-and-curd-maker-b0dk1wftqk

## Crawl surfaces

| Surface | 11-12 | 11-15 | Status |
|---|---|---|---|
| Sitemap URLs (index → pages / deals / blog) | 630 | 634, 0 dups | OK |
| Blog URLs in sitemap | 464 | 469 (468 at the first crawl) | OK |
| Newest post in sitemap | yes | yes (`mink-vs-sherpa-…`, 11-14 19:14Z) | OK |
| robots.txt | OK | 16 UA blocks, Sitemap line, GPTBot | OK |
| /llms.txt | 17,025 B | 17,132 B, 200 | OK |
| /llms-full.txt | 39,206 B | 38,856 B, 200 | OK |

**Sitemap vs posts:** 487 posts against 469 blog URLs leaves a gap of 18. All 18 posts return **308**: they are near-duplicate slugs merged into a canonical post, and redirect URLs belong out of the sitemap. 0 posts that return 200 are missing from the sitemap.

**The `newestPostIn false` flag:** the crawl script reported the newest post as missing from the sitemap. A direct `curl` of `/sitemaps/blog/sitemap.xml` lists that post first. The flag came from the script's own sitemap read, not from the sitemap. Nothing to fix.

## Post sweep

487 posts were checked for:

- seoTitle of 60 characters or fewer;
- seoDesc of 150–160 characters;
- a cover;
- empty image alt text;
- duplicate titles.

All clean. The one known duplicate title (post 340 = post 300) already 308s.

## Internal links

All internal links in post bodies were checked: 1,627 unique targets, 3,222 references, **0 dead**. A 200, 301 or 308 counts as OK. On 11-12 there were 1,597 targets and 3,180 references.

## Fix applied

None. Nothing was defective.

| Stage | Status |
|---|---|
| Implemented | No (no defect) |
| Deployed | No |
| Processed | n/a |
| Outcome | n/a |

## Freshness

- IndexNow: no ping was sent, because no URL changed.
- `sitemap.xml`: ISR, at most 30 min stale. It already carries the newest post.
- `llms.txt`: force-dynamic, so it is always current.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.20s) |
| /offers | 200 (0.07s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.82s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,008 = 16,008 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 without a cover, 0 without SEO fields | OK |
| Broadcast cursor vs max | 16,587 = 16,587 | OK |
| Crons | 9/9 match the roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- The same-price confirm paths still write no priceHistory row, so 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB, and it lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506, #16558, #7461.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
