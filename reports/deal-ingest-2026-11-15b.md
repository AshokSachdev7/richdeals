# DEAL-INGEST (indiafreestuff) tick — 2026-11-15b

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved the base64 `?rto=` Buy Now ids. Results:

- 3 fresh items.
- 55 already in the DB.
- 30 already rejected in the last 3 days.
- 1 Amazon `/b?node` category hub dropped.

Of the 3 fresh items, Holi gulal was rejected as low-ticket and seasonal. The other 2 are Flipkart products, and both were verified in the logged-in Playwright tab:

- Price, stock and image came from the ld+json of `fetch('/x/p/x?pid=…')`.
- The real `/p/itm…` path came from an in-tab `/search?q=` fetch. The PDP HTML only carries itm ids for recommended products.

All 48 Amazon dup ASINs were re-checked on the PDP in tab 1 (`#corePriceDisplay .a-price-whole`, `#availability`, add-to-cart). The tick ran at about 03:05 IST.

**Result: 2 new deals pushed LIVE (count:2, both created:true, #16586–16587). 3 dup rows were price-synced and #15890 stays EXPIRED. IndexNow returned HTTP 200 for 8 urls. Prod is 8/8 at 200 and every DB check is green.**

## Pushed

| Row | Slug | Price | MRP | Off |
|---|---|---|---|---|
| #16586 | zonezer-set-of-2-artificial-money-plants-with-white-pots-arfhsgfzsmhcysv3 | ₹199 | ₹799 | 75% |
| #16587 | dayneo-classic-t47-bluetooth-headphone-with-mic-acchsqy2gpfujffp | ₹396 | ₹2,564 | 85% |

- Each link is `flipkart.com/<slug>/p/itm…?pid=PID&affid=djhackraj`.
- Images are from `rukmini1.flixcart.com` at 1500px, with `?q=70` stripped.
- All copy is original, and the ₹ figure in each title equals the numeric price.
- Neither pid was in the DB before the push.

## Dup re-checks

| Row | Deal | Finding | Action |
|---|---|---|---|
| #9998 | NIVEA lip balm B00791D3QG | PDP ₹125, MRP ₹240. DB had ₹120. | Synced to ₹125 (48% off), with a priceHistory row. The description has no ₹ figure. |
| #16518 | Beardo roll-on B0HF87PLV4 | PDP ₹319, MRP ₹399. DB had ₹217. | Synced to ₹319 (20% off). Title, description and priceHistory updated. |
| #16521 | TAG KBWM1200 combo B0GX772S3S | PDP ₹654, MRP ₹1,450. DB had ₹645. | Synced to ₹654 (55% off). Title, description (old ₹645 and 56% fixed) and priceHistory updated. |
| #15890 | Corsair HS35 v2 B0CX4YC475 | Still unavailable | Stays EXPIRED |
| #16558 | Symbol shorts B0F79NPMPQ | Price matches, only 4 left | No change. Re-check next tick. |
| #7461 | B0CDPJ565Q | Price matches, only 2 left | No change. Re-check next tick. |
| Other 42 Amazon dups | — | PDP price matches the DB | No change |
| #16559–16565 | 7 IFS Flipkart cards | Card price matches the DB | No change |

## Rejected

| Item | Reason |
|---|---|
| Holi gulal | Low-ticket, seasonal |
| Amazon `/b?node` hub | Category page, not a single product |
| Lexton string light B0GHNMRFBD | Rejected at stage 1 |

B0GHNMRFBD was added to `data/dd-rejected.json` by hand (`Date.now()`), bringing it to 1,974 keys. That file carries earlier uncommitted changes, so it is not part of this commit.

The "13 IFS Flipkart cards" carry-over from 15a is closed: 7 are in the DB, 4 were rejected, and 2 were pushed this tick.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 2 new slugs plus the 3 synced slugs. It returned **HTTP 200** for 8 urls (5 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.16s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.50s) |
| new deal (DAYNEO) | 200 (0.14s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,008 = 16,008 (+2) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,585 vs 16,587 | Pending. The external broadcast run drains it and self-heals. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- Stage 1 still records only Flipkart rejects. Amazon rejects are added by hand.
- Stage 1 still nulls the `/indiafreestuff/p/` pids. The itm path has to be resolved in-tab through `/search?q=`.
- Same-price confirm paths still write no priceHistory row.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506 Shatras, #16558 Symbol shorts (4 left), #7461 (2 left).
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344, #3538). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
