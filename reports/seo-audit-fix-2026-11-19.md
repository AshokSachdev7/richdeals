# SEO-AUDIT-FIX daily tick — 2026-11-19

The tick ran a qiaomu-seo pass with `apps/api/_seo1119.cjs`, which is the 11-18 script unchanged. It fetched 51 prod pages with `redirect: manual` and a browser UA: 12 hubs, 8 stores, 12 categories, 12 deals (the 6 with the most clicks and the 6 newest LIVE) and the 7 newest posts. Each page was checked for title and description length, a self canonical, exactly one H1, og:image, JSON-LD that parses with the types the page needs, `rel="sponsored nofollow"` on every `/out/` link, img alt, duplicate titles and descriptions, and robots meta. The tick then checked the sitemap index and its three children, robots.txt, `llms.txt` and `llms-full.txt`, every post's SEO fields, and every internal link in every post body. It also checked that each LIVE GSC-proven pin is in `/api/deals/top-indexable`. Run at about 06:00–06:10 IST.

**Result: 0 defects, so nothing was changed, built or deployed, and there were no URLs to ping. All 51 pages pass. All 59 LIVE GSC-proven pins are in the top-100 set, so yesterday's fix holds. 0 of 1,702 internal post-link targets are dead. Prod is 7 of 7 at 200, and every CEO-audit check is green.**

## Page audit

| Type | Pages | Defects |
|---|---|---|
| Hubs | 12 | 0 |
| Stores | 8 | 0 |
| Categories | 12 | 0 |
| Deals | 12 | 0 |
| Blog posts | 7 | 0 |
| **Total** | **51** | **0** |

Checks: title 20–65 characters, description 70–165, canonical equal to the path, exactly one H1, og:image present, JSON-LD parses (deals carry Product, BreadcrumbList and FAQPage; posts carry Article and BreadcrumbList), `/out/` links carry sponsored and nofollow, every img has alt, no duplicate title or description within the set, and no stray noindex.

**Noindex by design (not defects):**
- **Stores with 0 LIVE deals:** `/stores/pedigree`, `/stores/ajio` and `/stores/cred`. The DB confirms 0 LIVE deals for each.
- **#6409 Man Company:** 140 clicks, but 7% off and short copy, so it falls below the value bar in `topIndexable()`. It is not a GSC pin.
- **Newest deals outside the top 100:** YOHO boots (#16891), LOVETC compact powder (#16890), WROGN briefs (#16889), Gulf Pride scooter oil, Old Spice shower gel and Fastrack 9 to Fine watch. The deals sitemap carries the top 100 only (owner directive 2026-10-16).

## Top-100 index set

| Check | Value | Status |
|---|---|---|
| `/api/deals/top-indexable` | 100 slugs | OK |
| GSC-proven pins in `gsc-proven.ts` | 71 | — |
| LIVE pins with a price and an image | 59 | — |
| LIVE pins in the top-100 set | 59 of 59 | OK. The 11-18 fix (`9c7f73c`, `5936bc8`) holds. |

## Crawl surfaces

| Check | Value | Status |
|---|---|---|
| Sitemap index | 3 children: pages / deals / blog | OK |
| Sitemap URLs | 647 (pages 67, deals 100, blog 480), 0 dups | OK |
| Newest post in sitemap | yes, `sweatshirt-vs-hoodie-vs-sweater-which-is-warmest-india` is first in the blog child | OK |
| Blog child vs posts | 480 vs 498. The gap of 18 is the merged duplicates that 308-redirect. | OK |
| robots.txt | 16 UA blocks, Sitemap line, GPTBot allowed | OK |
| `/llms.txt` | 200, 17,434 bytes | OK |
| `/llms-full.txt` | 200, 38,728 bytes | OK |

The audit script's own `newestPostIn false` and `blog 0` lines come from it reading only the pages child. That is a known script artifact (see the seo-crawl-sitemap-flag memory). The children were fetched directly to get the counts above.

## Post sweep

| Check | Count |
|---|---|
| Posts | 498 |
| Headline over 110 characters | 0 |
| seoTitle missing or over 60 | 0 |
| seoDesc outside 150–160 | 0 |
| No cover | 0 |
| Empty markdown alt | 0 |
| Duplicate seoTitle | 1 pair, #340 = #300. Not a defect: #340 308-redirects to #300. |

## Internal links

1,702 unique internal targets and 3,344 references across all post bodies (yesterday: 1,675 and 3,312). Each target was fetched with `redirect: manual`, with 200, 301 and 308 counted as OK and one retry. **Dead: 0.**

## Freshness

- **IndexNow:** no ping. Nothing changed, so there were no URLs to submit.
- **`sitemap.xml`:** ISR 1800s. It carries the newest post and the top-100 deals.
- **`llms.txt`:** force-dynamic, so it is current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.19s) |
| /offers | 200 (0.07s) |
| /blog | 200 (1.15s) |
| /sitemap.xml | 200 (0.07s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.76s) |

All probes used `curl -m 30`.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,284 = 16,284 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,891 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,891 = 16,891 | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO at 06:39 is due to add the next post. No day is 0, and none is over the cap of 4.

## Working tree

Only this report is committed. The in-progress account-page redesign (`AccountClient.tsx`, `EarnBanner.tsx`, `globals.css`), `ingest-ifs-proper.mjs`, the data files and the `apps/api/_*` scratch files were left unstaged, as before.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Both need a Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18). On-page checks are clean, so the lever is authority and fresh Offer prices, not page fixes.
- **IFS redirector:** 0 at 18j through 19c. The repoint decision applies at the first 11-20 DEAL-INGEST tick.
- **DesiDime yield:** 0 fresh for two ticks running.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio and #16779 Yera.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): TG 06:06, SITEMON 06:14, CONTENT-SEO 06:39, DESIDIME 06:43, DEAL-INGEST 06:53 and INDEXNOW 07:05. SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
