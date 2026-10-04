# DESIDIME-INGEST — 2026-10-04l

**2 pushed** (Amazon).
- Bulk returned `count 2`, both `created:true`.
- IndexNow returned **HTTP 200** (5 urls).
- Both deal pages return 200 on prod.

## Stage 1

`/new` + homepage gave 36 cards. 22 were dropped as junk or other-store:
- Flipkart ASUS, KODAK and Lenovo
- the Flipkart Minutes SuperCoin landing page

10 were resolved to a product. 2 were already in the DB, which left 8 fresh. The script itself skipped 2 of those:
- the Myntra Mast & Harbour pair watch (price drift)
- Dabur Glucoplus (no ld+json)

## Pushed

| Product | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| Morphy Richards Icon Superb 750W mixer grinder, 4 jars, Dark Grey | B0C86BDB1F | ₹3,006 | ₹8,495 | 4.1 (7,380) |
| Skybags Brat Pro Max 35L laptop backpack, Black | B0H6JP1SM4 | ₹799 | ₹2,100 | 4.6 (230) |

**Checks:** both were verified in the logged-in Amazon tab:
- The `#centerCol` price equals the card price.
- `#availability` shows In stock and the add-to-cart button is present.
- There is no low-stock line.

Skybags' fetched `priceToPay` read empty, so the price was read from `#centerCol` in the live tab (₹799, Black, "Lowest price in 30 days"). The images are the landing-colour `data-old-hires`. The copy is original and uses PDP facts only.

## Rejected

| Product | Reason |
|---|---|
| Kidsmate tricycle B0CKFHQWXG | Card-only price (Prime reward credit card) |
| Huggies Wonder Pants B0DT12WTYJ | FMCG / diapers |
| YogaBar muesli (Instamart) | Food |
| Toy phone B0FR4WTQVM | Currently unavailable, no add-to-cart |
| Mast & Harbour watch (Myntra) | Price drift (script) |
| Dabur Glucoplus (Instamart) | Food, no ld+json (script) |

## CEO audit (18:47 IST)

- live 12,072 (+2), pending 0, null price 0, null image 0
- Broadcast cursor 12549 vs DB max 12551. The gap is exactly this batch; the external cron drains it.
- posts 366, coverless 0, 4 today (cap reached)
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
