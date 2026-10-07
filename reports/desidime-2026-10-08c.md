# DesiDime tick 2026-10-08c (04:46 IST)

Stage 1 (`ingest-desidime.mjs`) returned 4 fresh candidates. I checked each one on its product page: the Amazon item in the logged-in Playwright tab, and the Flipkart items through their ld+json.

## Pushed: 1 (`/admin/deals/bulk` count 1, created:true, status live, id 12748)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| Rexona Shower Fresh roll-on deodorant for women, 50ml (B018HSHIJM) | ₹49 | ₹225 (78% off) | 4.3 (7,213), in stock, add-to-cart |

Affiliate link: Amazon `tag=ashoksachdev-21`. Image from m.media-amazon.com. The copy uses only facts from the product page.

## Rejected (3, added to `dd-rejected.json`, which now has 105 entries)

| Candidate | Reason |
|---|---|
| EcoLink AiroMax BLDC 1200mm fan, Flipkart (FANHPKZPXCUUY2BG) | Price drift: ₹2,299 in ld+json vs ₹1,300 on the card |
| Insta360 X3, Flipkart (SAYGHU4BKRSZ88WD) | Price drift: ₹24,990 vs ₹19,413 on the card |
| Bergner Tripro Mini 3pc triply set, Instamart | Instamart is location-locked quick commerce |

## Freshness

- IndexNow: **HTTP 200**, 4 URLs (the new slug plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (04:46 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 1 (later blog ticks cover the 2–3 target) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,229 |
| Broadcast cursor | 12747 vs DB max 12748 (the new row; the external cron will pick it up) |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
