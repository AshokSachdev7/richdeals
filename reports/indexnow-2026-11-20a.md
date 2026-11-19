# INDEXNOW tick — 2026-11-20a

The URL list came from `apps/api/_inx1119b.cjs`, which returns the newest 25 LIVE deals, any LIVE deal with a `priceHistory` row in the last 6h (excluding those 25), and the newest 6 posts. The list was submitted with `MSYS_NO_PATHCONV=1 node apps/api/scripts/indexnow-ping.mjs --paths ...`. In `--paths` mode the script adds nothing, so the sitemaps and hubs were listed by hand. Run at about 01:05–01:20 IST on 11-20 (19:35–19:50 UTC on 11-19).

**Result: 42 URLs submitted, IndexNow HTTP 200. A follow-up ping of 6 URLs (3 back-filled price-history slugs plus 3 hubs) also returned HTTP 200. Prod returned 200 on 7 of 7 endpoints. The INDEXNOW session cron had dropped out of CronList after it fired, so this tick recreated it (9 of 9 jobs now).**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16950 to #16974 |
| Repriced in the last 6h | 2 | #11774 (₹3,999 → ₹3,998 at 18:35Z on 11-19) and #15389 (₹1,255 → ₹756, TG 20b) |
| Newest posts | 6 | ids 626 to 632 (632 is the belt size guide) |
| **Total** | **42** | **HTTP 200** |

The newest-25 group covers DESIDIME 20a (#16971 to #16974) and every earlier push still in the window.

## Price history back-fill

DESIDIME 20a re-priced 3 existing LIVE rows with `prisma.deal.update` but did not write `priceHistory` rows. As a result their latest history row still showed the old price, and they fell outside the 6h reprice window of this tick's query. This tick added the missing rows. It only adds a row when the latest history price differs from the deal price.

| Id | Product | Last history row before | Row added |
|---|---|---|---|
| 11211 | Havells exhaust fan | ₹1,490 (09-25) | ₹949 |
| 13228 | Safari backpack | ₹599 (10-16) | ₹549 |
| 16732 | Softouch kitchen tissue | ₹194 (11-17) | ₹174 |

All 3 slugs were pinged again together with the 3 default hubs: HTTP 200 for 6 URLs. They had already been pinged at DESIDIME 20a, so this only refreshes them.

The DESIDIME price-sync path should write a `priceHistory` row on every re-price, as the TG path already does. This is listed under Still open.

## Freshness

- IndexNow: HTTP 200 for 42 URLs, then HTTP 200 for 6 URLs.
- `sitemap.xml`: 200 (ISR 1800s).
- `llms.txt`: 200, `force-dynamic`.

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.46s |
| `/offers` | 200 | 0.19s |
| `/blog` | 200 | 0.66s |
| `/sitemap.xml` | 200 | 0.11s |
| `/feed.xml` | 200 | 0.21s |
| `/api/deals` | 200 | 0.10s |
| `/llms.txt` | 200 | 0.47s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| LIVE deals | 16,367 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,974 | OK |
| Posts | 501, 0 coverless | OK |
| Broadcast cursor vs DB max | 16,974 = 16,974 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | No `indexnow-2026-11-20*` file existed, so this report uses suffix `a` | OK |
| Price history for DESIDIME 20a reprices | 3 rows missing | **Fixed**: 3 rows added |
| Session crons vs roster | 8 of 9, INDEXNOW missing after it fired | **Fixed**: recreated as `2c619b54` (`53 */6 * * *`) |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day has just started, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **DESIDIME price-sync skips `priceHistory`.** This tick back-filled 3 rows, but the next re-price will miss again until the path writes a row.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 01:14 |
| TG | 11-20 02:01 |
| DESIDIME | 11-20 02:43 |
| DEAL-INGEST | 11-20 02:53 |
| SCHEMA-AUDIT | 11-20 04:39 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| INDEXNOW | 11-20 07:23 |
| AI-OVERVIEW | 11-25 11:39 |
