# CONTENT-SEO tick — 2026-11-17b

Run at about 06:40–07:00 IST. Before the tick, 11-17 (IST) had 1 post, which is under the target of 2–3.

**Result: 1 post published (#622, TOFU), with a cover. IndexNow returned HTTP 200. 11-17 now has 2 posts (IST). Prod is 7/7 at 200 and every CEO-audit check is green.**

## Post

| Field | Value |
|---|---|
| Id | 622 |
| URL | https://richdeals.in/blog/air-purifier-filter-replacement-when-to-change-hepa-carbon-pre-filter-india |
| Title | Air Purifier Filter Replacement: When to Change the HEPA, Carbon and Pre-Filter (India Guide) (93 chars) |
| seoTitle | Air Purifier Filter Replacement: When to Change HEPA (52 chars) |
| seoDesc | When to change an air purifier's HEPA, carbon and pre-filter in India: seven warning signs, a smog-season schedule, cleaning tips, genuine vs compatible filters (160 chars) |
| Funnel | TOFU. The previous post (#621, hair straightener) was a BOFU buying guide. |
| Length | About 1,580 prose words |
| Tags | air purifier, home appliances, buying guide |
| Cover | `og/air-purifier-filter-replacement-when-to-change-hepa-carbon-pre-filter-india.png` on DO Spaces (HTTP 200), served as og:image |

**Keyword angle:** "air purifier filter replacement", "when to change HEPA filter", and "can I wash HEPA filter". Searches peak during the North India smog season, from October to February. The topic does not overlap our saturated clusters (best-X-under-Y, free samples). The only existing posts with "filter" in the slug are about coffee, wet/dry vacuums and laptop privacy screens.

**SERP gap:** the top results are brand pages, which only give their own schedule, and generic US guides. None of them covers all of the following together:
- separate lifespans for the pre-filter, carbon and HEPA layers;
- the filter light being a running-hours timer;
- an Indian smog-season schedule;
- genuine vs compatible filters (seal, EN 1822, RFID lock, warranty);
- the steps to reset the counter;
- the filter as a running cost.

**Structure (GEO):** the post opens with a short answer and includes:
- a three-filter table;
- seven numbered warning signs;
- a smog-season routine;
- cleaning steps;
- a genuine-vs-compatible table;
- replacement and reset steps;
- a 5-question FAQ.

The copy gives no prices and makes no fabricated claims.

**Internal links:** 11 in total, all verified LIVE in the DB before publishing.
- **7 deal pages:**
  - #5615 Philips FY3200/30 filter
  - #9779 TROO Xiaomi-compatible filter
  - #16561 Eureka Forbes AP 175
  - #4976 Eureka Forbes 150
  - #2875 Havells AP310
  - #13272 LINSO FLO
  - #7496 pTron EaseMate H1
- **3 posts:** the CADR guide, the best air purifiers 2026 roundup, and the dust-allergy post.
- **`/offers`.**

## Freshness

- **IndexNow:** `insert-blog-mdmeta.mjs` pinged it and got **HTTP 200**.
- **`sitemap.xml`:** the blog child lists #622 first.
- **`llms.txt`:** lists the post. It is force-dynamic.
- **`feed.xml`:** carries the post.
- No static route was added.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.32s) |
| /offers | 200 (0.20s) |
| /blog | 200 (0.84s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.25s) |
| /llms.txt | 200 (0.59s) |
| /blog/air-purifier-filter-replacement-… | 200, with the title, cover and deal links present |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is now within target. The 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS source dead:** every `?rto=` redirects home. DesiDime and Telegram carry ingest.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:** unchanged from tg-monitor 11-17g.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next CONTENT-SEO run is at about 12:39 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
