# DESIDIME-INGEST — 2026-10-04n

**0 pushed.** There was no bulk call and no IndexNow ping, because there were no new slugs. Prod returned 200.

## Stage 1

`ingest-desidime.mjs` discovered 30 cards:
- 15 were dropped as junk or other-store (including a Flipkart BLACK membership).
- 14 resolved to a product. 5 of those were already in the DB, leaving 9 fresh.

## Rejected

| Product | ID | Reason |
|---|---|---|
| Silicone body scrubber set 4pc | B0HJD42857 | 0 ratings |
| Foxin 16GB DDR5 SODIMM | B0HGMHR2V3 | 0 ratings |
| Spyder Craft center table | B0GTZQFH8R | Drift: PDP ₹1,709 vs card ₹1,439 |
| DANIEL KLEIN ladies watch (Flipkart) | WATF6Y7UDDZTVYAV | Price drift (ld+json) |
| Flipkart Big Billion Days: VIVO mobiles | MOBHQC8ZMRCP62TS | Category/sale hub, no price |
| Lakme Glycolic serum 15 ml | B0CPDNFW3Z | FMCG skincare |
| only Earth protein oats (Instamart) | 071a26ea8862 | Food |
| Glucoplus C glucose powder (Instamart) | 852e892dea08 | Food, no ld+json |
| Royal Family mochi (Instamart) | 57724645b847 | Food, out of stock |

## CEO audit (22:44 IST)

- live 12,081, pending 0, null price 0, null image 0
- Broadcast cursor 12560 == DB max 12560. The cursor is caught up.
- posts 366, coverless 0, 4 posts today (IST)
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
