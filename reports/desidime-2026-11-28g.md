# DESIDIME-INGEST tick: 2026-11-28g (about 12:44 IST)

**Result:** **3 new deals went LIVE** (#17667–#17669) and **2 stale LIVE duplicates were repriced** to the current PDP price, each with a PriceHistory row. 3 fresh items were rejected. IndexNow returned **HTTP 200** for 8 URLs (5 slugs plus 3 hub URLs).

## Stage 1 (`ingest-desidime.mjs`, cards only)

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 33 |
| Dropped (JUNK/GROCERY, Flipkart SuperCoin login, Swiggy code, other) | 13 |
| Resolved to a single product | 18 |
| Already in DB (productId) | 6 |
| Rejected in the last 24h (skip list) | 3 |
| Stage-1 skips (Flipkart price drift ×2, Max Fashion with no ld+json) | 3 |
| Fresh (all Amazon) | 6 |

- **Stage-1 skips:** ILIFE A30 robot vacuum (Flipkart VCLHNF5DGSUCSZTU) and Sonos Arc Ultra (Flipkart ACCHBZGDX2ZBEKZH) drifted on ld+json price. The Max Fashion "Buy 2 Get 1" item is a multi-product offer with no ld+json.
- **Skip list (rejected <24h):** Xiaomi 65" TVSHQZZNWBZKFGG7, Xiaomi 43" B0F6ZLFNVT, ₹0 Kindle bundle B01CSKD9AW.
- **Legacy null-pid check:** the 3 pushed ASINs had no match on `productId`, `affiliateUrl` or `slug`.

## Pushed (Amazon, verified in the logged-in Playwright tab)

| id | Deal | Price | MRP | Off | Check |
|---|---|---|---|---|---|
| 17667 | HIFRESH air purifier, 300 m³/h CADR, AQI display (B0GVSTNZMH) | ₹7,999 | ₹24,999 | 68% | `.a-price-whole` 7999, in stock, add-to-cart present |
| 17668 | Portronics SONO 10W Bluetooth speaker (B0H1VC21Z1) | ₹999 | ₹1,999 | 50% | "Only 1 left in stock", add-to-cart present |
| 17669 | Boldfit lightweight running shoes for men (B0H9L3H1D1) | ₹1,439 | ₹4,999 | 71% | In stock, add-to-cart present |

The bulk call returned `201 count 3`, and all 3 rows were created as LIVE. Every image returned 200 on a HEAD check. All 3 pages return 200 on prod.

## LIVE duplicates re-verified

| Deal | Store / pid | DesiDime card | PDP now | DB before | Outcome |
|---|---|---|---|---|---|
| #9155 EcoLink 3W LED spot light | Amazon B0D2LDZ29N | ₹140 | ₹140 | ₹177 | **Repriced → ₹140** (MRP ₹400, 65%). The legacy copy was rewritten and the empty howTo filled |
| #6186 Fastrack Dezire FX1 smartwatch | Amazon B0D6YGXNZV | ₹2,199 | ₹2,199 | ₹2,399 | **Repriced → ₹2,199** (MRP ₹4,999, 56%) |
| #17662 Head & Shoulders 340 ml | Amazon B0769LRX82 | ₹185 | — | ₹185 | Matches the DB (pushed and verified at 11:05) |
| #17663 Wild Stone Beyond, pack of 2 | Amazon B08SPXBMPS | ₹214 | — | ₹214 | Matches the DB (pushed and verified at 11:05) |
| #17504 Boldfit pump | Amazon B0G43WXXRC | ₹299 | — | ₹481 | Card price differs from DB, but 11-28f re-read the PDP at ₹481. Not re-read this tick |
| #12224 Toshiba 50" QLED | Flipkart TVSHZTYRVBSWQJS5 | ₹24,990 | — | ₹29,990 | Card shows a bank-offer price; 11-28f confirmed ₹29,990 on ld+json. Not re-read this tick |

Each reprice went through `prisma.deal.update` (price, mrp, discountPct, title, description, howTo) plus a `PriceHistory` row. The ₹ guard passed: every ₹ figure left in the copy equals the price or the MRP.

## Rejects

| Item | Card | PDP now | Reason |
|---|---|---|---|
| Razer DeathAdder Essential B092R5MCB3 | ₹974 | ₹1,099 | Price up |
| Symbol men's jogger chinos B0B3JJRJ96 | ₹263 | ₹309 | Price up |
| boAt Stone 350 B0CJRWP3YW | ₹1,499 | — | PDP returns 404 (dead ASIN) |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the 3 new and 2 repriced slugs and returned **HTTP 200** for 8 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design. The pages and blog children are ISR (30 min).
- **llms.txt:** generated on each request from `getDeals()`.

## CEO audit (about 12:44 IST)

| Check | Value | Status |
|---|---|---|
| Prod | all 6 endpoints returned 200 at 12:39 (sitemon 11-28m) | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,063 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17669 / 17666 | OK. The 3 deals pushed this tick have not been broadcast yet; the external cron picks them up on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) | OK |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups. #17602 Symbol jeans reads unavailable (watch) | Carried |
