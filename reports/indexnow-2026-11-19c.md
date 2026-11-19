# INDEXNOW tick — 2026-11-19c

The URL list came from a Prisma query (`apps/api/_inx1119b.cjs`, the same logic as 19a and 19b). It took three groups:

- the newest 25 LIVE deals;
- every LIVE deal with a priceHistory row in the last 6 hours, excluding those 25;
- the newest 6 posts, as `/blog/<slug>`.

The list was passed to `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode with `MSYS_NO_PATHCONV=1`. That mode adds no URLs of its own, so the 9 hubs and sitemaps were listed by hand. Run at about 13:10 IST.

**Result: IndexNow returned HTTP 200 for 51 URLs. Prod returned 200 on all 7 endpoints, and every CEO-audit check is green.**

## Submission

| Group | URLs | Detail |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16903 to #16927 (the ids have gaps) |
| Repriced in the last 6h | 11 | #2205, #2546, #4097, #5848, #9894, #11658, #13590, #16246, #16900, #16901, #16902 |
| Newest posts | 6 | ids 625 to 631, including 631 (on-ear vs over-ear headphones, CONTENT-SEO 19c) |
| **Total** | **51** | **HTTP 200** |

The newest-25 group covers every push since 19b: DESIDIME 19g's #16915–#16926 and TG 19n's #16927 (Myntra Dr. Batra's). The reprice group covers DESIDIME 19g's #9894 and #11658 and the TG price syncs since 07:05.

## Freshness

- **IndexNow:** HTTP 200 for 51 URLs, listed above.
- **`sitemap.xml`:** uses ISR with an 1800s revalidate. The deals child holds only the top 100, by design.
- **`llms.txt`:** is force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.58s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.41s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 13:11 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,319 = 16,319 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,927 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,927 = 16,927 | OK. The external broadcast cron has caught up with all of DESIDIME 19g and TG 19n. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST, by `publishedAt`):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** these write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic:** down about 70% since 10-28 (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves for twelve ticks in a row. If every remaining 11-19 tick also resolves 0, the first 11-20 DEAL-INGEST tick moves the slot's work to Telegram deep-history reads.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), the Max sweatshirt (1 left), #16917 Flux (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times are IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 13:14 |
| TG | 14:01 |
| DESIDIME | 14:43 |
| DEAL-INGEST | 14:53 |
| CONTENT-SEO | 18:39 |
| INDEXNOW | 19:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58, and AI-OVERVIEW 11-25 at 11:39.
