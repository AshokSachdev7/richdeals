# SEO-AUDIT-FIX daily tick — 2026-11-18

Full-site on-page crawl of the DO app (`richdeals-jw726.ondigitalocean.app`, canonical base `https://richdeals.in`). It also swept all posts and every internal link in post bodies, and checked the GSC-proven pins against the top-100 index set. Run at about 05:58–06:22 IST.

**Result: 1 defect fixed. 10 of the 59 LIVE GSC-proven pinned deals were serving `noindex` and were missing from the deals sitemap. Among them was #1016 vivo X300 FE, our highest-click deal page (183 clicks). The fix took two commits and two deploys. After the second deploy, all 10 serve `index, follow`, sit in the top-100 set and are listed in the deals sitemap. IndexNow returned HTTP 200 for 13 URLs. Every other check is clean, prod is 7/7 at 200 and every CEO-audit check is green.**

## Fix: pinned deals ageing out of the index

**Symptom.** The 71 slugs in `apps/api/src/deals/gsc-proven.ts` are deal pages Google already ranks. They are meant to stay indexable regardless of age or discount. However, 10 of the 59 LIVE pins were absent from `/api/deals/top-indexable` and served `noindex, follow`:

| Deal | Age (days) | Discount | Description chars | Clicks | Blocked by |
|---|---|---|---|---|---|
| #1016 vivo X300 FE | 120 | 21% | 310 | 183 | age gate |
| #979 vivo Y05 | 120 | 54% | 863 | 35 | age gate |
| #928 | 120 | 64% | 249 | 33 | age gate |
| #195 | 121 | 81% | 249 | 29 | age gate |
| #762 | 120 | 66% | 253 | 25 | age gate |
| #1192 | 120 | 55% | 250 | 23 | age gate |
| #3951 | 111 | — | 157 | 8 | value filter |
| #4118 | 110 | — | 147 | 4 | value filter |
| #2791 | 117 | — | 132 | 2 | value filter |
| #3844 | 112 | — | 157 | 1 | value filter |

**Root cause.** There were two gates, one in each app.

1. **API.** `DealsService.topIndexable()` applied the 120-day `createdAt` window and the discount/copy-length filter to pins as well as to ordinary deals. The bypass that lets pins skip both was written on 11-11, but it sat uncommitted in the working tree for a week, so prod never ran it.
2. **Web.** `dealIndexable()` in `apps/web/src/lib/site.ts` ran its own duplicate quality gate after the top-set check. It could noindex a page even when the API had put it in the top set.

**Commits.**

| Commit | Change | Deploy |
|---|---|---|
| `9c7f73c` fix(seo): stop web gate noindexing GSC-proven pinned deals | `dealIndexable` now trusts the API top set and only adds the basic LIVE, price and image checks | `abe97c8d`, ACTIVE |
| `5936bc8` fix(seo): let GSC-proven pins skip the age and value gates in topIndexable | The pin query uses `pinWhere` (LIVE, price and image not null) with no `createdAt` window, and pins return `true` before the value filter | `70f522c6`, ACTIVE 00:51Z |

After the first deploy, prod still showed 0 of the 10 pins in the top set. That is how the uncommitted API change was found.

**Prices re-read before re-indexing.** On the Amazon PDP (logged-in tab), #1016 B0GX9K4H5Y reads ₹94,999 and #979 B0H2Z7X8XK reads ₹15,999. Both are in stock and equal to the DB price.

**Verification after `70f522c6`:**
- `/api/deals/top-indexable` returns 100 entries (100 unique), and all 10 pins are among them.
- All 10 pin pages serve `<meta name="robots" content="index, follow">`.
- The deals sitemap child has 100 `<loc>` entries, and all 10 pins are listed. The 1800s fetch revalidate had already turned over, so there was no lag.

## Page audit (51 pages)

| Type | Pages | Defects |
|---|---|---|
| Hubs | 12 | 0 |
| Stores | 8 | 0 |
| Categories | 12 | 0 |
| Deals (top-click and newest) | 12 | 0 apart from the pin bug above |
| Blog (newest) | 7 | 0 |

The checks were the same as on 11-17:
- title length 20–65 and description length 70–165;
- a self-referencing canonical;
- exactly one H1;
- og:image;
- JSON-LD that parses with the expected types;
- `rel="sponsored nofollow"` on `/out/` links;
- img alt;
- duplicate titles or descriptions.

**Noindex by design (not defects):**
- **Stores with 0 LIVE deals:** `/stores/pedigree`, `/stores/ajio` and `/stores/cred`.
- **#6409 Man Company:** 7% off, below the value bar.
- **Newest deals outside the top 100:** 6 deal pages. These are the Athom towels, Manq blazer, Amazon Basics induction cooktop, iCall P47, Solimo beer mugs and Lumio Arc 5. The deals sitemap carries the top 100 only (owner directive 2026-10-16).

## Crawl surfaces

| Check | Value | Status |
|---|---|---|
| Sitemap index | 3 children: pages / deals / blog | OK |
| Sitemap URLs | 643 (pages 66, deals 100, blog 477), 0 dups | OK |
| Newest post in sitemap | yes (#625) | OK |
| robots.txt | 16 UA blocks, Sitemap line, GPTBot allowed | OK |
| `/llms.txt` | 200, 17,466 bytes | OK |
| `/llms-full.txt` | 200, 38,522 bytes | OK |

495 posts against 477 blog URLs leaves a gap of 18. These are the 308-redirected merged duplicates, which is unchanged. Redirect URLs belong out of the sitemap.

## Post sweep (all 495)

| Check | Result |
|---|---|
| seoTitle missing or over 60 chars | 0 |
| seoDesc outside 150–160 | 0 |
| No cover | 0 |
| Empty markdown alt `![](…)` | 0 |
| Title (Article headline) over 110 chars | 0 |
| Duplicate seoTitle | 1 pair, #340 = #300. #340 308-redirects to #300, so only one URL is live. |

## Internal links in post bodies

All 1,675 unique targets (3,312 references) were fetched with `redirect: manual`. **0 dead**, with 200, 301 and 308 counted as OK.

## Freshness

- **IndexNow:** slug mode for the 10 pin slugs returned **HTTP 200 for 13 URLs** (the 10 slugs plus the sitemap and hubs).
- **`sitemap.xml`:** the deals child already lists all 10 pins.
- **`llms.txt`:** force-dynamic, so it is always current.
- No static route was added, so `staticRoutes` and the llms.txt hub links need no change.

## Prod endpoints (after deploy)

| Endpoint | Status |
|---|---|
| / | 200 (0.26s) |
| /offers | 200 (0.24s) |
| /blog | 200 (0.95s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.70s) |

The local API was restarted after the deploy and answers 200 on :4000.

## CEO audit

Run at 06:13 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The CONTENT-SEO run at about 06:39 IST brings it to 2.

**Working-tree check.** After this incident, the other uncommitted source diffs were reviewed for stranded fixes. `AccountClient.tsx`, `EarnBanner.tsx` and `globals.css` hold an in-progress account-page UI redesign, not an SEO fix, so they were left uncommitted. `ingest-ifs-proper.mjs` has a one-line change and stays with the ingest owner.

## Still open (not on-page; owned by other ticks)

- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **IFS redirector:** dead at g through o. Probe-only until the end of 11-18 IST.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next SEO-AUDIT-FIX run is at about 05:58 IST on 11-19, per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
