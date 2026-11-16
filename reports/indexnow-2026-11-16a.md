# INDEXNOW tick — 2026-11-16a

This tick resubmitted the newest deal and post URLs, plus the sitemap and hub pages, to IndexNow (api.indexnow.org, which fans out to Bing) with `indexnow-ping.mjs --paths`. `--paths` mode adds nothing on its own, so the hubs were listed by hand. Run at about 11:13 IST.

**Result: 44 urls submitted. api.indexnow.org returned HTTP 200. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs | 6 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Deals | 32 | The 25 newest LIVE deals (#16635–#16659) ∪ every LIVE deal with a priceHistory row in the last 12h (25 rows). The union adds 7 deals outside the newest 25, which are the 11-16a TG dup-syncs (#16134, #14458, #12798, #14012, #7683, #652, #16632). The newest 25 cover today's TG, deal-ingest and desidime pushes. |
| Posts | 6 | `/blog/<slug>` for ids 613–618; the newest is 618, do-thermal-blackout-curtains-keep-room-warm-winter-india |
| **Total** | **44** | api.indexnow.org → **HTTP 200** |

The script ran with `MSYS_NO_PATHCONV=1`, so Git Bash did not rewrite the `/x` paths into `C:/Program Files/Git/x`.

## Freshness

- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it is always current.
- No new static route was added, so `staticRoutes` needed no change.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.26s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.78s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.56s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,080 = 16,080 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,650 vs 16,659 | OK. The external broadcast cron is still picking up the 9 desidime rows. |
| Crons | 9/9 vs roster (CronList) | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. 11-16 is below the 2-post floor until the 12:39 IST CONTENT-SEO run adds the second post (the cap is 4).

## Still open

- Low-stock rows to re-check: #7461 ₹139, #16506 ₹151, #16558 ₹159, #16610, #13537, B0BWJWTRGC La Opala, #360 Sulfar, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68.
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
