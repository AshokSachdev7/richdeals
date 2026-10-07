# DesiDime tick 2026-10-07j (20:46 IST)

`ingest-desidime.mjs` discovered 32 cards. 17 resolved to a single product, 1 was already in the DB, and 16 were fresh candidates. Every Amazon price was read on the PDP in the logged-in tab (`.priceToPay`, `#availability`, add-to-cart, `#acrPopover`).

## Pushed: 1 (`/admin/deals/bulk` count 1, created:true, status live, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| HP 410 Slim Bluetooth mouse, 1200 DPI (B0B2PGJHMT) | ₹667 | ₹2,697 (75% off) | 3.6 (256) |

The copy uses only PDP bullets and the title. The image is `m.media-amazon.com` `_SL1500_`, and the link uses `?tag=ashoksachdev-21`.

## Rejected (15)

| Candidate | Reason |
|---|---|
| Dove hand wash 250ml, Rose hand wash 5L | FMCG / personal care |
| GOQii Insure+ (health insurance bundle) | Health |
| Dyson V8 Absolute (Flipkart) | Price drift (stage 1, ld+json) |
| WROGN luggage set of 3 (Flipkart) | Price drift (stage 1, ld+json) |
| HP 15 Core 5 120U (B0GZ3FBR3W) | Price drift: PDP ₹80,990 vs card ₹59,990 |
| ASUS Vivobook 15 2026 (B0H8P895HL) | Price drift (₹66,990 vs ₹64,990); 4 ratings |
| U.S. Polo Assn. Coba 2.0 (B0G4VNCLKW) | Price drift (₹2,950 vs ₹2,591); 3 left |
| Glen auto-clean chimney (B0BX4DJNKF) | Price drift (₹20,894 vs ₹6,890) |
| Samsung Galaxy Z Fold7 (B0FDL5K6SV) | No add-to-cart |
| Elica 60cm cassette chimney (B0F9485YWZ) | No add-to-cart |
| Glen split chimney (B09717SPPF) | Only 2 left; 6 ratings (also rejected in tick 07i) |
| Sonata blue dial watch (B0DCN9WR3Y) | 3 ratings |
| Daniel Klein DK.1.13653-4 (B0CXPXL2D1) | No ratings |
| TIGC men jacket (B0BNLN8LT2) | Colour variant of the same listing (3.7, 31 ratings) as id 12702, pushed in tick 07i; a thin duplicate |

## Freshness

- IndexNow: **HTTP 200**, 4 URLs (1 slug plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (20:46 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **2.** The rule (2–3 per day) is met. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,201 |
| Broadcast cursor | 12713 vs DB max 12714 (the new row; the next run picks it up) |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
