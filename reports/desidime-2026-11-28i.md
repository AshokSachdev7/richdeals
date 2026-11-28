# DESIDIME-INGEST tick: 2026-11-28i (about 16:33 IST)

**Result:** **3 new deals went LIVE** (#17699–#17701, all Amazon). **1 stale LIVE duplicate was repriced** (#1306 atomberg Renesa Halo fan, ₹4,069 → ₹4,199) with a PriceHistory row. 1 other duplicate matches the DB. IndexNow returned **HTTP 200** for 7 URLs (4 slugs plus 3 hub URLs).

## Stage 1 (`ingest-desidime.mjs`, cards only)

| Step | Count |
|---|---|
| Dropped by filters | 3 (ASUS ExpertBook resolved to empty; Bajaj credit-card cashback is a Play Store link; Flipkart "Buy Buy Sale" is the homepage) |
| Skipped at stage 1 | 3 (Flipkart ZEBRONICS Music Bomb i10 ACCHHNFUWBMHSGHD ₹599 has price drift; Crocs 4508078138f1 is a sale-hub page with no ld+json; Ajmal 5805828c1508 is a buy-any-3 bundle with no ld+json) |
| Duplicates already in the DB | 2 (#1306, #1414) |
| Rejected within the last 24h | 2 (Amazon realme B0999MY3DN ₹8,999, Flipkart Xiaomi TVSHQZZNWBZKFGG7 ₹37,499) |
| Fresh | 8 |

The legacy null-pid check (productId, affiliateUrl and slug) found 0 hits.

## Pushed (Amazon, verified in the logged-in Playwright tab)

| id | Deal | Price | MRP | Off | Check |
|---|---|---|---|---|---|
| 17699 | Longway 25 L 5-star automatic storage water heater (gray) | ₹4,597 | ₹8,669 | 47% | `.a-price-whole` 4,597, M.R.P. from the `#centerCol` text, in stock, add-to-cart present |
| 17700 | Kratos Type-C to Lightning 20W fast charging cable (white) | ₹149 | ₹899 | 83% | In stock, add-to-cart present |
| 17701 | Mivi DuoPods Maxx TWS earbuds (Hazel Green) | ₹899 | ₹2,999 | 70% | In stock, add-to-cart present; hiRes image keyed by landingAsinColor |

The pids were checked against the DB again just before the push: 0 hits. The bulk call returned `201 count 3`, and all 3 rows were created as LIVE. The ₹ guard passed. Every image returned 200 on a HEAD check, and all 3 pages return 200 on prod.

## LIVE duplicates re-verified

| id | Item | Card | PDP now | Result |
|---|---|---|---|---|
| **1306** | **atomberg Renesa Halo Smart 1400 mm BLDC ceiling fan (Misty Teal)** | — | **₹4,199**, M.R.P. ₹7,800, in stock, add-to-cart present | **Repriced ₹4,069 → ₹4,199 (46% off); M.R.P. was ₹6,900** |
| 1414 | Livon Hyaluron shampoo | ₹102 | ₹120 (M.R.P. ₹325) | = DB; the card price is after a 15% coupon |

The #1306 update went through `prisma.deal.update` (price, mrp, discountPct, title, description, howTo) plus a `PriceHistory` row for ₹4,199. The legacy copy was rewritten. The ₹ guard passed: every ₹ figure in the copy equals the price or the MRP, and every "% off" equals discountPct. The slug was not changed, and the page returns 200 on prod.

## Rejects

| Item | Card | PDP now | Reason |
|---|---|---|---|
| Herrlich B09VGNLG6Z | ₹879 | ₹949 | Price up |
| PASEO B01CFS5U5O | ₹100 | ₹259 | Price up; also grocery/FMCG |

The 2 rejects were added to `data/dd-rejected.json` (2,368 entries).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the 3 new slugs and the #1306 slug and returned **HTTP 200** for 7 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design.
- **llms.txt:** generated on each request from `getDeals()`.

## CEO audit (about 16:33 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.18s, `/offers` 0.08s, `/blog` 0.54s, `/sitemap.xml` 0.07s, `/feed.xml` 0.07s, `/api/deals` 0.08s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,094 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17701 / 17698 | OK. #17699–#17701 have not been broadcast yet; the external cron picks them up on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. 11-26 IST had 0 posts (outage gap). The IFS 11-28h stage 1 was killed by the low-memory reaper; the next cron run is 16:53. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
