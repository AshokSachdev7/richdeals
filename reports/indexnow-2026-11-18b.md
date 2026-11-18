# INDEXNOW tick — 2026-11-18b

The tick resubmitted the newest deal and post URLs, plus the sitemap and hub paths, through `apps/api/scripts/indexnow-ping.mjs` in `--paths` mode (`MSYS_NO_PATHCONV=1`). `--paths` mode adds no URLs of its own, so the hubs and sitemaps were listed by hand. The path list was built by `apps/api/_inx1118b.cjs` (scratch, not committed; a copy of `_inx1118a.cjs`). Run at about 07:05–07:07 IST.

**Result: HTTP 200 for 40 URLs. No deal was repriced in the last 6 hours. Every CEO-audit check is green, and all 9 session crons are armed.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs and sitemaps | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16749–#16773, by id |
| Repriced since the last tick, outside the newest 25 | 0 | priceHistory `postedAt` ≥ now − 6 h: none |
| Newest posts | 6 | #620–#626 (6 rows; #626 is the 11-18 garment steamer vs steam iron post) |
| **Total** | **40** | `indexnow-ping.mjs` → **HTTP 200** |

The repriced window is 6 hours, matching the gap since INDEXNOW 11-18a (01:07 IST). No priceHistory row was written in that window:
- DesiDime 11-18b, c and d found 0 fresh candidates.
- The IFS redirector stayed dead.
- Telegram's only new deal (#16773) is already in the newest 25.

Same-price confirms write no priceHistory row, so they cannot appear here.

#626 was already pinged on publication by `insert-blog-mdmeta.mjs` (HTTP 200 twice, CONTENT-SEO 11-18b). It is resubmitted here because the blog sitemap child has since picked it up.

## Freshness

- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design. #626 was published at about 06:42 IST, so it is past the 30-minute window.
- **`llms.txt`:** force-dynamic, so it is always current.
- **`feed.xml`:** deals only, by design.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.10s) |
| /blog | 200 (1.16s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

Run at 07:07 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,193 = 16,193 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,773 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,773 vs 16,773 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 07:07 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **Zero repricing in 6 hours:** a symptom of source yield, not of the ping. IFS is dead, DesiDime is dry and Telegram is in its overnight lull.
- **IFS redirector:** dead at g through p (10 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next INDEXNOW run is at about 13:05 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
