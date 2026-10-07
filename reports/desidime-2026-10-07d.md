# DesiDime tick 2026-10-07d (17:17 IST)

Stage 1 (`ingest-desidime.mjs`) found 36 cards. 11 of them resolved to a single product: 2 were already in the DB and 9 were fresh. The junk filter dropped the rest (Myntra category/sale pages, a Flipkart tracking landing page).

## Pushed: 1 (`/admin/deals/bulk` count 1, created:true, status live, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| SanDisk Phone Drive USB-C 1TB, Seafoam Green (B0F21ZCWVG) | ₹10,457 | ₹27,600 | 3.9 (13) |

The price was read from the Amazon PDP (`#centerCol`) with a same-origin fetch in the logged-in tab. It matches the card exactly; the item is in stock with add-to-cart present. The copy uses only the PDP's real bullets.

## Rejected (8)

| Candidate | Reason |
|---|---|
| FlySky FS-i6 RC transmitter (B0DP6HCN9V) | ₹5,760 is the SBI-card price; the PDP shows ₹6,399 (card-only price) |
| iQOO Z11xa 5G 8/128 (B0HG96MZ9P) | ₹24,999 on the card vs ₹28,999 on the PDP (launch/bank offer) |
| iQOO Z11 Lite 5G 4/128 (B0H1WY1D37) | ₹15,499 on the card vs ₹19,999 on the PDP |
| Bromine mug tree stand (B0HM7MC6VT) | No ratings (₹30) |
| Cruise 2T 3-star inverter AC (B0GHFLHJBB) | No buy box |
| TECHNOVIEW lavalier mic (B0CQRPLMRM) | No buy box, rated 2.6 |
| Bergner Earth tawa and Bergner Sorrento cooker (Instamart) | Swiggy Instamart: location-locked, and the stage-1 price check showed drift |

## Freshness

- IndexNow: **HTTP 200**, 4 URLs (1 deal slug plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (17:17 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **1.** The 18:09 BLOG cron makes it 2. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,183 |
| Broadcast cursor | 12659 vs DB max 12666. These are the 7 newest rows; the external cron is draining them (it moved from 12654 to 12659 since the last tick). |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
