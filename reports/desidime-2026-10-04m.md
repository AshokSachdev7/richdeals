# DESIDIME-INGEST — 2026-10-04m

**3 pushed** (2 Amazon, 1 Myntra).
- Bulk returned `count 3`, all `created:true`.
- IndexNow returned **HTTP 200** (6 urls).
- Deal pages return 200 on prod.

## Stage 1

`/new` + homepage: 32 cards, 13 resolved, 1 already in DB, 12 fresh. The script skipped the DANIEL KLEIN watch (price drift) and Instamart Glucoplus (no ld+json).

## Pushed

| Product | ID | Store | Price | M.R.P. | Rating |
|---|---|---|---|---|---|
| Acer DreamWave Bluetooth 5W speaker | B0GKHYTGB3 | Amazon | ₹998 | ₹4,000 | 3.9 (23) |
| Kids safety belt for two-wheelers, Spider Blue | B0HGMY6YVM | Amazon | ₹549 | ₹1,199 | 4.1 (29) |
| BLA BLI BLU Men Hustler perfume 90ml | b8c6e60582de | Myntra | ₹220 | ₹1,299 | 4.4 (22,832) |

**Amazon checks:** price from `#centerCol`, `#availability` In stock, add-to-cart present. The Acer speaker matched the card. On the kids belt, DesiDime's ₹54 was the "-54%" badge misread as a price, so we publish the PDP's ₹549.

**Myntra checks:** productLd showed 220 and InStock. The link goes through InRDeals, because Cuelinks is deactivated for Myntra. The image is from assets.myntassets.com.

The copy is original. The only ₹ figure in it is the live price.

## Rejected

| Product | Reason |
|---|---|
| Silicone body scrubber B0HJD42857 | 0 ratings |
| Lakme glycolic serum B0CPDNFW3Z | Skincare / FMCG |
| DANIEL KLEIN watch WATF6Y7UDDZTVYAV | Price drift (skipped by the script) |
| Instamart oats | Food |
| Instamart Glucoplus | Food, no ld+json |
| Foxin DDR5 RAM B0HGMHR2V3 | 0 ratings |
| Flipkart VIVO BBD | Category hub |
| Spyder Craft table B0GTZQFH8R | Drift: PDP ₹1,709 vs card ₹1,439 |
| HP Deskjet 2931 B0GS556XGK | No add-to-cart, rated 2.6 |

## CEO audit (20:47 IST)

- live 12,078 (+3), pending 0, null price 0, null image 0
- Broadcast cursor 12554 vs DB max 12557. The gap is exactly this batch; the external cron drains it.
- posts 366, coverless 0, 4 posts today (IST); daily blog rule met
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
