# INDEXNOW tick — 2026-11-16b

This tick resubmitted the newest deal and post URLs, plus the sitemap and hub pages, to IndexNow (api.indexnow.org, which fans out to Bing) with `indexnow-ping.mjs --paths`. `--paths` mode adds nothing on its own, so the hubs and sitemap children were listed by hand. Run at about 13:14 IST, right after TG tick d.

**Result: 55 urls submitted. api.indexnow.org returned HTTP 200. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs | 9 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/sitemaps/pages/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Deals | 40 | The 25 newest LIVE deals (#16648–#16672) ∪ every LIVE deal with a priceHistory row in the last 12h. The union adds 15 deals outside the newest 25: the day's price-syncs (#652, #1822, #7683, #12798, #13311, #14012, #14458, #16134, #16632) and #16642–#16647. The newest 25 include TG d (#16671, #16672), TG c, and the DesiDime c batch. |
| Posts | 6 | `/blog/<slug>` for ids 614–619. The newest is 619, oil-filled-radiator-vs-fan-heater-vs-convector-which-to-buy-india. |
| **Total** | **55** | api.indexnow.org → **HTTP 200** |

The script ran with `MSYS_NO_PATHCONV=1`, so Git Bash did not rewrite the `/x` paths into `C:/Program Files/Git/x`. Tick a listed only the sitemap index; this tick also lists the three sitemap children.

## Freshness

- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it is always current.
- No new static route was added, so `staticRoutes` needed no change.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.30s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.58s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,093 = 16,093 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,670 vs 16,672 | OK. The external broadcast cron picks up TG d on its next run. |
| Crons | 9/9 vs roster (CronList) | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The floor is met; the 18:39 IST CONTENT-SEO run may add a third (cap 4).

## Still open

- The IFS source is blocked (every `?rto=` redirects home). The 14:53 IST IFS tick probes one id first.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
