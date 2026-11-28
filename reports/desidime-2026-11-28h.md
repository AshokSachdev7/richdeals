# DESIDIME-INGEST tick: 2026-11-28h (about 14:30 IST)

**Result:** **0 new deals.** All 5 fresh items failed verification. **1 stale LIVE duplicate was repriced** (#5192 Havells geyser, ₹7,190 → ₹8,429) with a PriceHistory row. 6 other duplicates match the DB. IndexNow returned **HTTP 200** for 4 URLs (1 slug plus 3 hub URLs).

## Stage 1 (`ingest-desidime.mjs`, cards only)

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 31 |
| Dropped by JUNK/GROCERY or other filters (incl. a Flipkart supercoin login link) | 14 |
| Resolved to a single product | 16 |
| Duplicates already in the DB | 7 |
| Rejected within the last 24h | 4 (Flipkart ILIFE VCLHNF5DGSUCSZTU, Flipkart Xiaomi TVSHQZZNWBZKFGG7, Amazon Xiaomi B0F6ZLFNVT, Amazon Kindle B01CSKD9AW) |
| Fresh | 5 |

The legacy null-pid check (productId, affiliateUrl and slug) found 0 hits for the 3 fresh Amazon ASINs.

## Pushed

None. All 5 fresh items were rejected (below).

## LIVE duplicates re-verified

| id | Item | Card | PDP now | Result |
|---|---|---|---|---|
| 17697 | Purina Friskies 6 kg | ₹561 | ₹1,767 (M.R.P. ₹1,900) | = DB |
| 14309 | MILTON Comet 1 L bottle | ₹217 | ₹217 | = DB |
| 17667 | HIFRESH | ₹7,999 | ₹7,999 | = DB |
| 1414 | Livon Hyaluron shampoo | ₹102 | ₹120 | = DB; the card price is after a 15% coupon |
| 17504 | Boldfit | ₹299 | ₹481 | = DB |
| 12224 | Toshiba (Flipkart) | ₹24,990 | ld+json ₹29,990, InStock | = DB |
| **5192** | **Havells Vertex Neo 25L 4-star geyser** | ₹5,148 | **₹8,429**, M.R.P. ₹12,965, in stock, add-to-cart present, no coupon shown | **Repriced ₹7,190 → ₹8,429 (35% off)** |

The #5192 update went through `prisma.deal.update` (price, mrp, discountPct, title, description, howTo) plus a `PriceHistory` row for ₹8,429. The old copy claimed a 20% clip-on coupon taking it to about ₹5,752. The current PDP shows no coupon, so that claim was removed. The ₹ guard passed: every ₹ figure in the copy equals the price or the MRP, and every "% off" equals discountPct. The page returns 200 on prod.

## Rejects

| Item | Card | PDP now | Reason |
|---|---|---|---|
| Clay diya B0HKB5LP2B | ₹19 | — | Amazon Now hyperlocal listing: no price, no add-to-cart |
| realme Techlife robot vacuum B0999MY3DN | ₹8,999 | ₹9,999 | Price up |
| Razer DeathAdder Essential B092R5MCB3 | ₹974 | ₹1,099 | Price up |
| Samsung S25 FE (Flipkart MOBHQCH6HZZH3BTH) | ₹40,850 | — | Price drift (stage-1 ld+json) |
| iPhone 17 (Flipkart MOBHQV9YCUG4ZQZK) | ₹84,600 | ₹89,100 | Price drift |

The 3 Amazon rejects were added to `data/dd-rejected.json` (2,363 entries).

## Freshness

- **IndexNow:** `indexnow-ping.mjs havells-vertex-neo-25l-4-star-storage-geyser` returned **HTTP 200** for 4 URLs.
- **Sitemap:** the deals child is the top-100 pinned set; no new rows this tick.
- **llms.txt:** generated on each request from `getDeals()`.

## CEO audit (about 14:30 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.17s, `/offers` 0.07s, `/blog` 0.54s, `/sitemap.xml` 0.06s, `/feed.xml` 0.07s, `/api/deals` 0.09s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,090 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17697 / 17697 | OK, caught up |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. 11-26 IST had 0 posts (outage gap). The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
