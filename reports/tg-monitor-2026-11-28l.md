# TELEGRAM-DEAL-MONITOR tick: 2026-11-28l (about 11:48 IST)

**Result:** **3 new deals went LIVE** (#17664–#17666, two Amazon and one Flipkart). **2 stale LIVE duplicates were repriced** to the current PDP price, each with a PriceHistory row. 1 candidate was rejected as unavailable. IndexNow returned **HTTP 200** for 8 URLs (5 slugs plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0), then the open SB Loots chat was read for posts after 11-28k. The `t.me/s` fallback was not needed.
- **Shortlinks:** resolved with `curl -L` before dedup. Flipkart was verified from ld+json in a logged-in Flipkart tab (tab 4).

| Post | Result |
|---|---|
| Arrow Tailored Fit 2-piece suit, B0FN4TPX19 | **LIVE #17664** |
| U.S. Polo Assn. Denim Co. men's jacket, B0CPFF23XC | **LIVE #17665** |
| TRIGGR Arcus One headphones, Flipkart ACCHKBKZGA8Y7ZGZ | **LIVE #17666** |
| Dabur Gulabari rose soap ×4, B0D6B9HZ6N | Already LIVE as #13290 at ₹144 → **repriced** |
| ATTRO Food Bite lunch box, B0F2N5VDPQ | Already LIVE as #8725 at ₹128 → **repriced** |
| Livon shampoo, B0FNMZS3KB | Already LIVE as #1648; PDP ₹231 = DB (the channel's ₹196 is after the 15% coupon) |
| Dettol Surface Cleanser, B00MFXNS86 | Rejected: no price and no add-to-cart on the PDP |
| HRX jackets 10:45 (Myntra), Pantaloons 10:56 | Multi-product |

## Pushed

| id | Deal | Store | Price | MRP | Off | Check |
|---|---|---|---|---|---|---|
| 17664 | Arrow Tailored Fit 2-piece suit for men | Amazon | ₹5,267 | ₹10,534 | 50% | `.a-price-whole` 5,267, "Only 3 left", add-to-cart present |
| 17665 | U.S. Polo Assn. Denim Co. men's jacket | Amazon | ₹2,500 | ₹4,999 | 50% | In stock, add-to-cart present |
| 17666 | TRIGGR Arcus One wireless headphones (60H, 4-mic ENC, BT 6.0) | Flipkart | ₹630 | ₹4,999 | 87% | ld+json `offers.price` 630, InStock; affiliate `/p/itm…?pid=…&affid=djhackraj` |

The bulk call returned `201 count 3`, and all 3 rows were created as LIVE. Every image returned 200 on a HEAD check, and the new pages return 200 on prod.

## Reprice

| id | Item | Old | New | MRP | Off |
|---|---|---|---|---|---|
| 13290 | Dabur Gulabari rose soap 150 g ×4 | ₹144 | ₹121 | ₹289 | 58% |
| 8725 | ATTRO Food Bite kids' 3-compartment lunch box | ₹128 | ₹94 | ₹249 | 62% |

Each went through `prisma.deal.update` (price, mrp, discountPct, title, description, howTo; #8725 had an empty howTo, now filled) plus a `PriceHistory` row. The ₹ guard passed: every ₹ figure in the copy equals the price or the MRP.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the 3 new and 2 repriced slugs and returned **HTTP 200** for 8 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design.
- **llms.txt:** generated on each request from `getDeals()`.
- **Seen list:** B0FN4TPX19, B0CPFF23XC, B0D6B9HZ6N, B00MFXNS86, B0F2N5VDPQ, ACCHKBKZGA8Y7ZGZ and B0FNMZS3KB were added (5,886 entries).

## CEO audit (about 11:48 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.17s, `/offers` 0.10s, `/blog` 0.59s, `/sitemap.xml` 0.08s, `/feed.xml` 0.07s, `/api/deals` 0.10s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,060 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17666 / 17663 | OK. The 3 deals pushed this tick have not been broadcast yet; the external cron picks them up on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups. #17602 Symbol jeans reads unavailable (watch) | Carried |
