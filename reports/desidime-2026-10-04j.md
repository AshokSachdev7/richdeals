# DESIDIME-INGEST — 2026-10-04j

**1 pushed** (Amazon).
- Bulk returned `count 1`, `created:true` (HTTP 201).
- IndexNow returned **HTTP 200** (4 urls).
- The deal page returns 200 on prod.

## Stage 1

36 cards were discovered and 13 resolved to a product. 4 were already in the DB and 9 were new. 20 were dropped as junk or other-store posts. 3 Flipkart links were also dropped because they pointed to a brand listing, a category listing or a placeholder item page, not a product.

## Pushed

| Product | ASIN | Price | M.R.P. | Rating |
|---|---|---|---|---|
| SanDisk Ultra Curve 64GB USB 3.2 pen drive, Black | B0B4N243KC | ₹800 | none on the page | 4.2 (9,716) |

Checked in the logged-in Amazon tab:
- `#centerCol` showed ₹800, which matched the card.
- `#availability` showed In stock, and the add-to-cart button was present.

The product page shows no M.R.P., so the deal was pushed with `mrp:null`. The title has no "% Off" and the copy makes no discount claim. `push-dd-1004j.mjs` now accepts a missing M.R.P. The SanDisk feature bullets were generic (they mention 16GB and "cruzer blade"), so the copy uses only the title, model number and rating.

## Rejected

| Product | Reason |
|---|---|
| Carlton London pink-dial watch B08L1ZHDBX | No add-to-cart button and no buy box |
| French Connection white-dial watch B0BGJ9P4KT | No add-to-cart button and no buy box |
| Intex IT-KB335 keyboard B0HDPTNMFQ | 0 ratings |
| Graco Airpop car seat B09S3NH88J | Drift: PDP ₹8,121 vs card ₹7,716 |
| D'lecta cheese slices (Instamart) | Food |
| Lenovo 110 keyboard (Instamart) | No ld+json |
| Cetaphil lotion (Bigbasket) | Cosmetic, no ld+json |
| Superbottoms giveaway | Not a product |

## CEO audit

- live 12,056 (+1), pending 0, null price 0, null image 0
- Broadcast cursor 12534 vs DB max 12535. The gap is exactly this deal.
- posts 365, coverless 0, 3 posts so far today (IST)
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
