# DesiDime tick 2026-10-06g

Stage 1 (`ingest-desidime.mjs`): 10 candidates left after the junk/grocery filters and the DB dedup.

## Pushed: 2 (`/admin/deals/bulk` count 2, both created:true, status live, both prod 200)

| Deal | Price | MRP | Rating | Affiliate |
|---|---|---|---|---|
| Nippon Paint n-Shield Wax-n-Shine Car Wash Shampoo 250 ml (B0FPCZZWHT) | ₹155 | ₹525 | 3.8 (156) | Amazon tag |
| Daniel Klein men's watch DK.1.14291-1 (Myntra d5fc670dfbc7) | ₹2,310 | ₹3,255 | 4.1 (176) | InRDeals |

The Amazon price was read from the PDP with a same-origin fetch in the logged-in tab: it matches the card, the item is in stock and add-to-cart is present, and the image is the 250 ml variant. The Myntra price comes from ld+json (stage 1): ₹2,310, matching the card and in stock.

## Rejected (8)

| Candidate | Reason |
|---|---|
| French Connection men's watch (B0FHWS3JTJ) | No buy box |
| FC women's watch (B09M6CQWV4) | Rated 3.4, only 3 left |
| BISSELL (B0DHS41MPF) | Price drift: ₹8,810 on the PDP vs ₹7,692 on the card |
| Flipkart DJ light mixer | Out of stock |
| Flipkart Whirlpool fridge | Price drift |
| Philips TAT1179 (Flipkart) | Rated 3.3 |
| JioMart Globus face wash, Instamart saucepan | No ld+json, so the price can't be verified; the face wash is also a cosmetic |

## Freshness

- IndexNow: **HTTP 200**, 5 URLs (2 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 2. Rule met (2–3); cap is 4. |
| Coverless posts | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 |
