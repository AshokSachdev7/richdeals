# DESIDIME-INGEST tick: 2026-11-28f (about 10:25 IST)

**Result:** **4 new deals went LIVE** (#17650–#17653) and **3 stale LIVE duplicates were repriced** to the current PDP price, each with a PriceHistory row. 1 fresh item was rejected. IndexNow returned **HTTP 200** for 10 URLs (7 slugs plus 3 hub URLs).

## Stage 1 (`ingest-desidime.mjs`, cards only)

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 33 |
| Dropped (JUNK/GROCERY, `/s?` search, Play-store, Flipkart Liveshop) | 13 |
| Resolved to a single product | 15 |
| Already in DB (productId, including null-pid legacy rows) | 6 |
| Rejected in the last 24h (skip list) | 4 |
| Fresh | 5 |

- **Drops of note:** Amazon `/s?` searches (Jack & Jones, Spykar), the Myntra-cash and Bhim Play-store links, and a Flipkart Liveshop link.
- **Skip list (rejected <24h):** Xiaomi 65" TVSHQZZNWBZKFGG7 (Flipkart, ₹37,499), Xiaomi 43" B0F6ZLFNVT (₹21,749), ₹0 Kindle bundle B01CSKD9AW, Motorola AirShield APFHN6YQKSHXJAYR (Flipkart, ₹3,471).

## Pushed

| id | Deal | Store | Price | MRP | Off | Check |
|---|---|---|---|---|---|---|
| 17650 | The Souled Store Hydros men's clogs with Naruto charms | Amazon | ₹719 | ₹1,799 | 60% | `.a-price-whole`, in stock, add-to-cart present |
| 17651 | Amazon Basics memory foam travel neck pillow + eye mask + ear plugs | Amazon | ₹324 | ₹1,199 | 73% | In stock |
| 17652 | Lavish Musk luxury attar roll-on, 12 ml | Amazon | ₹102 | ₹1,059 | 90% | In stock; MRP read from the `M.R.P.:` text in the core price block (the first selector returned a per-ml rate) |
| 17653 | Bangalore Refinery 1g 24K (999.9) gold bar | Flipkart | ₹13,300 | ₹18,800 | 29% | ld+json `offers.price` 13300, InStock; MRP from `ppd.mrp` (the card's ₹14,500 was wrong) |

The bulk call returned `201 count 4`, and all 4 rows were created as LIVE. Every image returned 200 on a HEAD check. The new pages return 200 on prod.

## LIVE duplicates re-verified

| Deal | Store / pid | DesiDime card | PDP now | DB before | Outcome |
|---|---|---|---|---|---|
| #11148 Haier 6 kg top-load washer | Amazon B0HBB6W6GQ | ₹12,501 (bank-offer price) | ₹13,890 | ₹13,740 | **Repriced → ₹13,890** (MRP ₹22,400, 38%) |
| #10407 Amazon Basics laundry hamper | Amazon B0H3KLKJGJ | ₹370 | ₹370 | ₹599 | **Repriced → ₹370** (MRP ₹1,999, 81%) |
| #2932 Athena ribbed bodycon dress | Amazon B0FGD7LN1K | ₹169 | ₹821 ("Only 1 left") | ₹183 | **Repriced → ₹821** (MRP ₹2,299, 64%) |
| #2205 Livon shampoo | Amazon B0FNN4954M | ₹202 (post-coupon) | ₹238 | ₹238 | No change |
| #17504 Boldfit pump | Amazon B0G43WXXRC | ₹299 | ₹481 | ₹481 | No change |
| #12224 Toshiba 50" QLED | Flipkart TVSHZTYRVBSWQJS5 | ₹24,990 | ₹29,990, InStock (ld+json) | ₹29,990 | No change (the card's price was a bank offer) |

Each reprice went through `prisma.deal.update` (price, discountPct, title, description, howTo) plus a `PriceHistory` row. The ₹ guard passed: every ₹ figure left in the copy equals the price or the MRP.

## Rejects

| Item | Card | PDP now | Reason |
|---|---|---|---|
| Athom towel pack of 2, B0B1VC8842 | ₹170 | ₹237, different variant | Price up |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the 4 new and 3 repriced slugs and returned **HTTP 200** for 10 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design. The pages and blog children are ISR (30 min).
- **llms.txt:** generated on each request from `getDeals()`.

## CEO audit (about 10:25 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.16s, `/offers` 0.08s, `/blog` 0.52s, `/sitemap.xml` 0.06s, `/feed.xml` 0.08s, `/api/deals` 0.09s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,047 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17653 / 17649 | OK. The 4 deals pushed this tick have not been broadcast yet; the external cron picks them up on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
