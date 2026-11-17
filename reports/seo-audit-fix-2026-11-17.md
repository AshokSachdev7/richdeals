# SEO-AUDIT-FIX daily tick — 2026-11-17

Full-site on-page crawl of the DO app (`richdeals-jw726.ondigitalocean.app`, canonical base `https://richdeals.in`) with `apps/api/_seo1117.cjs`, plus a sweep of all posts and every internal link in post bodies. Run at about 05:58–06:10 IST.

**Result: 1 defect fixed, 0 left open on-page. Post #621 (hair-straightener guide) had a 111-character title, which is also its Article headline. It was shortened to 104 characters in the DB; prod serves the new headline and IndexNow returned HTTP 200 for 3 URLs. It was a DB-only fix, so there was no build and no deploy. Every other check is clean, prod is 7/7 at 200 and every CEO-audit check is green.**

## Fix

| Item | Before | After |
|---|---|---|
| Post #621 `title` (H1 + Article `headline`) | "Hair Straightener Buying Guide: Ceramic vs Titanium Plates and the Right Temperature for Your Hair Type (India)", 111 chars | "Hair Straightener Guide: Ceramic vs Titanium Plates and the Right Temperature for Your Hair Type (India)", 104 chars |

- The `seoTitle` ("Ceramic vs Titanium Hair Straightener: Temperature Guide", 56 chars) and slug are unchanged, so the `<title>` tag and URL did not move.
- **Verification:** `blog/[slug]` uses ISR 300s. Three fetches of the live page all return the 104-character `headline` in the Article JSON-LD.
- This closes the minor issue that SCHEMA-AUDIT 11-17 raised.

## Page audit (51 pages)

| Type | Pages | Defects |
|---|---|---|
| Hubs (`/`, `/offers`, `/blog`, `/freebies`, `/coupons`, `/stores`, `/categories`, `/best`, `/about`, `/contact`, `/privacy`, `/compare/…`) | 12 | 0 |
| Stores | 8 | 0 |
| Categories | 12 | 0 |
| Deals (6 top-click + 6 newest) | 12 | 0 |
| Blog (7 newest) | 7 | 0 |

Each page was checked for:
- title length 20–65 and description length 70–165;
- a self-referencing canonical;
- exactly one H1;
- og:image;
- JSON-LD that parses with the expected types (deals: Product, BreadcrumbList and FAQPage; posts: Article and BreadcrumbList);
- `rel="sponsored nofollow"` on `/out/` links;
- img alt;
- duplicate titles or descriptions.

**Noindex by design (not defects):**
- **Stores with 0 LIVE deals:** `/stores/pedigree`, `/stores/ajio` and `/stores/cred` serve `noindex, follow`.
- **Newest deals outside the top 100:** 7 deal pages serve `noindex, follow`. These are #16722 F Gear, #16721 GOBOULT, #16720 Homeor, the Man Company set, the boAt Nirvana Ion, the Wonderchef glasses and the Realspeed pen drive. The deals sitemap carries the top 100 only (owner directive 2026-10-16).
- **Top-click deals:** all 6 are indexable, as expected.

## Crawl surfaces

| Check | Value | Status |
|---|---|---|
| Sitemap index | 3 children: pages / deals / blog | OK |
| Sitemap URLs | 640 (pages 66, deals 100, blog 474), 0 dups | OK |
| Newest post in sitemap | yes, listed first (`hair-straightener-…`, 11-16 19:12Z) | OK |
| robots.txt | 16 UA blocks, Sitemap line, GPTBot allowed | OK |
| `/llms.txt` | 200, 17,347 bytes | OK |
| `/llms-full.txt` | 200, 39,020 bytes | OK |

- **Crawl-script artifact:** the script reported "sitemap 38, newestPostIn false". A direct curl of each child gives the counts above, with the newest post first. The script's own child expansion misread the sitemap; the sitemap itself is fine. This is the same false positive as on 11-15.
- **Sitemap vs posts:** 492 posts against 474 blog URLs leaves a gap of 18. These are the 308-redirected merged duplicates, which is unchanged from 11-15. Redirect URLs belong out of the sitemap.

## Post sweep (all 492)

| Check | Result |
|---|---|
| seoTitle missing or over 60 chars | 0 |
| seoDesc outside 150–160 | 0 |
| No cover | 0 |
| Empty markdown alt `![](…)` | 0 |
| Title (Article headline) over 110 chars | 1, fixed (#621) |
| Duplicate seoTitle | 1 pair, #340 = #300 (Croma coupons). #340 308-redirects to #300, so only one URL is live. |

## Internal links in post bodies

All 1,660 unique targets (3,282 references) were fetched with `redirect: manual`. **0 dead**, with 200, 301 and 308 counted as OK.

## Freshness

- **IndexNow:** `indexnow-ping.mjs --paths` with the post URL, `/blog` and `/sitemap.xml` returned **HTTP 200 for 3 URLs**.
- **`sitemap.xml`:** the slug did not change, so no sitemap change was needed.
- **`llms.txt`:** force-dynamic, so it already reads the new title.
- No static route was added, so `staticRoutes` and the llms.txt hub links need no change.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.39s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.54s) |

## CEO audit

Run at 06:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open (not on-page; owned by other ticks)

- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **IFS source blocked:** every `?rto=` redirects home.
- **No buy box, on watch:** #9689, #15663, #14424.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next SEO-AUDIT-FIX run is at about 05:58 IST on 11-18, per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
