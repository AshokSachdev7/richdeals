# INDEXNOW tick — 2026-11-20c

This tick built its URL list with `apps/api/_inx1119b.cjs`, which returns three groups:
- the newest 25 LIVE deals;
- any LIVE deal with a `priceHistory` row in the last 6h that is not already among those 25;
- the newest 6 posts.

The 9 hubs and sitemaps were added by hand because `--paths` mode adds nothing. The list was submitted with `MSYS_NO_PATHCONV=1 node apps/api/scripts/indexnow-ping.mjs --paths ...`, and the same list was then POSTed directly to `www.bing.com/indexnow`. Run at about 13:23–13:30 IST on 11-20.

**Result: 42 URLs submitted. IndexNow returned HTTP 200 and Bing returned HTTP 200. Prod returned 200 on 7 of 7 endpoints, the CEO audit is green, and 9 of 9 session crons are present.**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16981 to #17005 |
| Repriced in the last 6h | 2 | #1527, #12976 |
| Newest posts | 6 | ids 629 to 634. Id 634 is the filterless vs baffle chimney guide. |
| **Total** | **42** | **IndexNow HTTP 200, Bing HTTP 200** |

## Freshness

- IndexNow (`api.indexnow.org`): HTTP 200 for 42 URLs.
- Bing (`www.bing.com/indexnow`): HTTP 200 for 42 URLs.
- `sitemap.xml`: 200. It uses ISR with a 1800s revalidate.
- `llms.txt`: 200. It is `force-dynamic`.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.27s |
| `/offers` | 200 | 0.11s |
| `/blog` | 200 | 0.62s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.12s |
| `/llms.txt` | 200 | 0.45s |
| `/api/deals` | 200: total 16,398, newest id 17,005 | 0.11s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,398 = 16,398 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,005 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,005 = 17,005 | OK |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `indexnow-2026-11-20a` and `-b` existed, so this report uses suffix `c` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **3** |

No day is 0 and none is above the cap of 4. 11-20 is done, so the 18:39 IST CONTENT-SEO tick should skip.

## Fixes

None needed.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 14:01 |
| SITEMON | 11-20 14:14 |
| DESIDIME | 11-20 14:43 |
| DEAL-INGEST | 11-20 14:53 |
| CONTENT-SEO | 11-20 18:39 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
