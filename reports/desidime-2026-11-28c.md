# DESIDIME-INGEST tick: 2026-11-28c (about 04:26 IST)

**Result:** 0 fresh deals. Every card was filtered out, already LIVE, or rejected within the last 24 hours. Re-verifying the LIVE duplicates found 1 drifted price: Boldfit #17504 was repriced to the verified PDP price with a prisma update. IndexNow returned HTTP 200 for 4 URLs.

## Stage 1 (`ingest-desidime.mjs`, cards only)

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 28 |
| Dropped by filters (JUNK / GROCERY / non-product) | 17 |
| Resolved to a product (`visit.desidime.com` → merchant) | 11 |
| LIVE duplicates (productId, including null-pid legacy rows) | 4 |
| Rejected in the last 24 hours | 7 |
| Fresh | 0 |

## Duplicates re-verified

| ID | Deal | DB | PDP | Outcome |
|---|---|---|---|---|
| 17594 | Dabur (Amazon) | ₹170 | ₹170, in stock | OK |
| 17640 | Adidas (Myntra) | ₹8,639 | ld+json ₹8,639, InStock | OK |
| 17504 | Boldfit Foot Bicycle Pump with Pressure Gauge (Amazon B0G43WXXRC) | ₹299, 80% off | ₹481, M.R.P. ₹1,499, -68%, `#availability` in stock, add-to-cart present | **Repriced** to ₹481 / 68% off |
| 12224 | Toshiba (Flipkart) | ₹29,990 | Card shows ₹24,990, which is a bank-offer price | Left as is; a Flipkart PDP check needs a browser tab and was not run |

For #17504, the ₹ and % figures in the title, description and howTo were rewritten too (the description is dated 28 November 2026), so the Product/Offer schema, the FAQ and the visible copy agree.

## Rejected in the last 24 hours (skipped again)

| Item | Card price |
|---|---|
| Hindware geyser, Flipkart WGYHPAH4HPUVQDAD | ₹6,991 |
| Horlicks, JioMart | ₹235 |
| ASUS, Amazon B0GTVZ47CS | ₹151,990 |
| Xiaomi TV, Flipkart TVSHQZZNWBZKFGG7 | ₹37,499 |
| Xiaomi, Amazon B0F6ZLFNVT | ₹21,749 |
| Kindle freebies, Amazon B01CSKD9AW | ₹0 |
| Motorola, Flipkart APFHN6YQKSHXJAYR | ₹3,471 |

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs (the #17504 slug plus `/`, `/offers` and `/sitemap.xml`).
- **Prod:** `/boldfit-foot-bicycle-pump-with-pressure-gauge-b0g43wxxrc` returned 200.
- **Sitemap:** the deals child is the top-100 pinned set, so nothing changes there.
- **llms.txt:** generated on each request, so nothing to do.
- **Audit (SITEMON 11-28e):**
  - Prod: all 6 endpoints returned 200.
  - 0 LIVE deals with a null price and 0 with a null image.
  - 0 PENDING_REVIEW.
  - 1 post on 11-28 (IST). CONTENT-SEO runs next at 06:39, with 3 ticks left today.
  - Crons: 9 of 9.
  - 0 unpushed commits before this one.
