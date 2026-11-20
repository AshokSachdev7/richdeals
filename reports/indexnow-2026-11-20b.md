# INDEXNOW tick — 2026-11-20b

This tick built its URL list with `apps/api/_inx1119b.cjs`, which returns three groups:
- the newest 25 LIVE deals;
- any LIVE deal with a `priceHistory` row in the last 6h that is not already among those 25;
- the newest 6 posts.

The 9 hubs and sitemaps were added by hand because `--paths` mode adds nothing. The list was submitted with `MSYS_NO_PATHCONV=1 node apps/api/scripts/indexnow-ping.mjs --paths ...`, and the same list was then POSTed directly to `www.bing.com/indexnow`. Run at about 07:23–07:30 IST on 11-20.

**Result: 44 URLs submitted. IndexNow returned HTTP 200 and Bing returned HTTP 200. Prod returned 200 on 7 of 7 endpoints, the CEO audit is green, and 9 of 9 session crons are present.**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16960 to #16984 |
| Repriced in the last 6h | 4 | #10653, #11896, #13228, #14635 |
| Newest posts | 6 | ids 628 to 633. Id 633 is the tripod vs selfie stick vs gimbal guide. |
| **Total** | **44** | **IndexNow HTTP 200, Bing HTTP 200** |

## Freshness

- IndexNow (`api.indexnow.org`): HTTP 200 for 44 URLs.
- Bing (`www.bing.com/indexnow`): HTTP 200 for 44 URLs.
- `sitemap.xml`: 200. It uses ISR with a 1800s revalidate.
- `llms.txt`: 200. It is `force-dynamic`.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.21s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.53s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.38s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 502: 0 without a cover, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `indexnow-2026-11-20a` already existed, so this report uses suffix `b` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. No day had 0 posts and no day went over the cap of 4. The 12:39 IST CONTENT-SEO tick can add a third post for 11-20.

## Fixes

None needed.

## Still open

- **GSC top rows:** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked before then.
- **`priceValidUntil` coverage:** about 94% of LIVE deals have none.
- **`/posts` API response size:** 5.8MB, above Next's 2MB data-cache limit. This is a performance problem, not an outage.
- **GSC traffic:** down about 70% since 10-28.
- **IFS redirector:** still dead.
- **DesiDime price history:** the price-sync path does not write a `priceHistory` row when it re-prices a deal.
- **Inflated M.R.P., no buy box, low stock and ASIN reuse:** the lists are unchanged from sitemon 20h.
- **DO API token:** still needs rotating. This is an owner action.

## CronList next runs

All times are IST.

| Job | Next run |
|---|---|
| TG | 11-20 08:01 |
| SITEMON | 11-20 08:14 |
| DESIDIME | 11-20 08:43 |
| DEAL-INGEST | 11-20 08:53 |
| CONTENT-SEO | 11-20 12:39 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
