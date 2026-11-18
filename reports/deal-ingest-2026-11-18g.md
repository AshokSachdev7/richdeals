# DEAL-INGEST (indiafreestuff) tick — 2026-11-18g

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved each base64 `?rto=` Buy Now id. Every resolved product was deduped against the DB by productId and against `data/dd-rejected.json`, then verified with a same-origin fetch of the PDP in the logged-in Playwright Amazon tab (`.a-price-whole` in the core price block, `#availability`, add-to-cart button, hiRes image from `colorImages`). Run at about 12:53–13:12 IST.

**Result: 4 deals pushed LIVE (#16801–16804), all Amazon. The bulk endpoint returned HTTP 201 with count 4, and the readback shows 4 of 4 LIVE. IndexNow returned HTTP 200 for 7 URLs. Every CEO-audit check is green.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 99 |
| `?rto=` resolved to a product | 7 (all Amazon) |
| `?rto=` redirected to the IFS homepage | 92 |
| Already in the DB | 0 |
| Rejected in the last 24h | 1 (B0DDPY9J3J Skullcandy, "Currently unavailable" in DESIDIME 18g) |
| Price drift on the PDP | 2 |
| Pushed | 4 |

The IFS redirector is still mostly dead: 7 of 99 resolved today, against 7 of 93 on 11-17.

## Pushed

| id | productId | Product | Price | MRP |
|---|---|---|---|---|
| 16801 | B0H3TV2KCS | Longway Eggo 350W Egg Boiler for 7 Eggs with 3 Modes | ₹389 | ₹789 (51% off) |
| 16802 | B0DF4W86SJ | Urban Chef Ease Pro 1000W Dry Iron, Purple and Black | ₹469 | ₹1,095 (57% off) |
| 16803 | B0HBKMNFYN | Panasonic 8W Circular LED Downlighter for False Ceilings | ₹149 | ₹400 (63% off) |
| 16804 | B0BM3QWJ38 | Gesto 5m Blue LED Rope Light, IP65 Waterproof | ₹249 | ₹999 (75% off) |

Each row was In stock with an add-to-cart button, and the PDP price matched the card exactly. Images come from `m.media-amazon.com`. Affiliate links use `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Titles and descriptions were rewritten; no IFS text was copied.

## Rejected

| productId | Product | Reason |
|---|---|---|
| B0DZSTZLQW | Lux Nitro men's brief, pack of 3 | Price drift: PDP ₹589 vs card ₹236 |
| B0DMFBMQMN | Acer Aspire 3, R5 7430U, 16GB/512GB | Price drift: PDP ₹58,990 vs card ₹57,740 |
| B0DDPY9J3J | Skullcandy Smokin Buds XT | Already in `dd-rejected.json` (unavailable) |

The two drift rejects were written to `data/dd-rejected.json` with `Date.now()`. Each drift was a single item from a different brand, so no brand block was involved.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 4 new slugs, **HTTP 200 for 7 URLs** (4 slugs and the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.48s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.97s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.74s) |
| /longway-eggo-350w-egg-boiler-for-7-eggs-with-3-modes-b0h3tv2kcs | 200 (0.33s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 13:12 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,224 = 16,224 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,804 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,800 vs 16,804 | OK. The 4 new rows await the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at about 13:00 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down ~70% since 10-28** (3 clicks / 222 impressions in 28 days, AI-OVERVIEW 11-18).
- **IFS redirector:** 7 of 99 resolve (Amazon only); the rest 302 to the homepage.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Same-price confirms:** write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 14:53 IST per CronList.
