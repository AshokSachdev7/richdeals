# INDEXNOW tick — 2026-11-17b

The tick resubmitted the newest deal and post URLs, plus the sitemaps and hubs, through `apps/api/scripts/indexnow-ping.mjs --paths` with `MSYS_NO_PATHCONV=1`. The URL list was built from the DB with Prisma. Run at about 07:05–07:06 IST.

**Result: IndexNow returned HTTP 200 for 41 URLs (api.indexnow.org, which fans out to Bing). Every CEO-audit check is green.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs and sitemaps | 9 | Listed by hand: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Newest LIVE deals | 25 | #16698–#16722 |
| Repriced deals | 1 | A priceHistory row in the last 12 h and not already in the newest group: #1411 (Dabur Gulabari shower gel, synced to ₹89 in desidime 11-17c) |
| Newest posts | 6 | #617–#622, as `/blog/<slug>`; includes #622, the air purifier filter guide |

The 41 URLs were all unique. `--paths` mode adds no URLs of its own, so the hubs were listed explicitly. `MSYS_NO_PATHCONV=1` stopped Git Bash from rewriting `/x` into `C:/Program Files/Git/x`.

No new deals have arrived since tick 11-17a (max id is still 16,722). This run re-pinged the same newest set, plus #622 and the one repriced row.

## Freshness

- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **`feed.xml`:** carries #622.

## CEO audit

Run at 07:06 IST.

| Endpoint | Status |
|---|---|
| / | 200 (0.18s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.65s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.58s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,142 = 16,142 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,722 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,722 vs 16,722 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 06:50 IST) | OK |

## Posts per day (IST)

11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS source dead:** eleven dry ticks in a row (redirector down since 11-16). DesiDime and Telegram carry ingest. If it is still dead after 11-17, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next INDEXNOW run is at about 13:05 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
