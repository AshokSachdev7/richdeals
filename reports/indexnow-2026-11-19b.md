# INDEXNOW tick — 2026-11-19b

A Prisma query (`apps/api/_inx1119b.cjs`, same logic as 19a) built the URL list from three groups:

- the newest 25 LIVE deals;
- every LIVE deal with a priceHistory row in the last 6 hours, excluding those 25;
- the newest 6 posts, as `/blog/<slug>`.

The list went to `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode with `MSYS_NO_PATHCONV=1`. That mode adds nothing on its own, so the 9 hubs and sitemaps were listed by hand. Run at about 07:05 IST.

**Result: IndexNow returned HTTP 200 for 54 URLs. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16875 to #16899 (the ids have gaps) |
| Repriced in the last 6h | 14 | #760, #4947, #6989, #11026, #11369, #12651, #13051, #14012, #16627, #16686, #16691, #16779, #16830, #16834 |
| Newest posts | 6 | ids 623 to 630, including the new bike and car cover guide (630) |
| **Total** | **54** | **HTTP 200** |

The newest 25 deals cover every push since 19a, through DESIDIME 19d's #16898 Beardo perfume pack and #16899 TVS Racing helmet. The reprice group is the TG 19e–19g price syncs.

## Freshness

- **IndexNow:** HTTP 200 for 54 URLs (above).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.41s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.89s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.68s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 07:06 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,291 (DB) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,899 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,899 = 16,899 | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

Posts per day (IST, by `publishedAt`): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves at every tick from 18j through 19d. If it stays dead, the first 11-20 DEAL-INGEST tick moves the slot to reading Telegram history.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 07:14 |
| TG | 08:01 |
| DESIDIME | 08:43 |
| DEAL-INGEST | 08:53 |
| CONTENT-SEO | 12:39 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
