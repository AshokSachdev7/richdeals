# INDEXNOW tick — 2026-11-15b

This tick resubmitted the newest deal and post URLs, plus the sitemap and hub pages, to IndexNow (api.indexnow.org, which fans out to Bing) with `indexnow-ping.mjs --paths`. `--paths` mode adds nothing on its own, so the hubs were listed by hand. Run at about 07:06 IST.

**Result: 116 urls submitted. api.indexnow.org returned HTTP 200. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Submission

| Group | Count | Source |
|---|---|---|
| Hubs | 6 | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` |
| Deals | 104 | The 25 newest LIVE deals (#16565–#16589) ∪ every LIVE deal with a priceHistory row in the last 12h. All 25 newest already had a row, so the union is 104. It covers the 15c dup-sync (47 PH rows), the 15d syncs (#7461 ₹139, #16506, #16558) and the desidime 15d pushes (#16588 Solimo clock, #16589 HP 400 mouse). |
| Posts | 6 | `/blog/<slug>` for ids 612–617; the newest is 617, chapped-lips-winter-lip-balm-ingredients-that-work-india |
| **Total** | **116** | api.indexnow.org → **HTTP 200** |

The script ran with `MSYS_NO_PATHCONV=1`, so Git Bash did not rewrite the `/x` paths into `C:/Program Files/Git/x` (that rewrite is what caused the old 422s).

## Freshness

- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it is always current.
- No new static route was added, so `staticRoutes` needed no change.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.06s) |
| /blog | 200 (0.66s) |
| /sitemap.xml | 200 (0.06s) |
| /feed.xml | 200 (0.08s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.54s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,009 = 16,009 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,589 = 16,589 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post (the cap is 4).

## Still open

- Low-stock rows to re-check: #7461 ₹139, #16506 ₹151, #16558 ₹159.
- The same-price confirm paths in the scripts still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Amazon reuses ASINs (#2351, #15344).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
