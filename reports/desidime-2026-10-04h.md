# DESIDIME-INGEST — 2026-10-04h (10:47 IST)

**1 pushed** (Amazon). Bulk returned `count 1`, `created:true`. IndexNow returned **HTTP 200** (4 urls). The deal page returns 200 on prod.

## Sweep

`ingest-desidime.mjs` stage 1:
- 37 cards discovered and 16 resolved.
- 2 were already in the DB, leaving 14 fresh.

## Pushed

| Product | Store | Price | M.R.P. | Rating |
|---|---|---|---|---|
| Nayasa Fusion airtight containers, 1000 ml × 6 | Amazon B07H72J7DL | ₹404 | ₹1,089 | 4.3 (2,272) |

Verified in the logged-in Amazon tab:
- priceToPay is ₹404, the same as the card.
- `#availability` says In stock and the add-to-cart button is present.

All copy is original.

## Rejected

| Product | Reason |
|---|---|
| Fastrack VOX Pro | Drift: PDP ₹2,399 vs card ₹1,050 |
| Acer PalmEase combo | Drift: PDP ₹999 vs card ₹488 |
| Prestige gas stove | Drift: PDP ₹5,605 vs card ₹1,749. Also rated 2.9. |
| ASUS TUF A15 | Card/bank-only price: PDP ₹1,04,990 vs ₹93,740. Only 2 ratings. |
| FRONTECH monitor | Drift: PDP ₹11,980 vs card ₹10,482. Only 3 ratings. |
| GAMDIAS cabinet | Drift: PDP ₹6,119 vs card ₹5,814. Only 6 ratings. |
| Bouncefit neckband | No price and no add-to-cart button (unavailable) |
| Diaper pants | Health/FMCG |
| Larah by Borosil dinner set, Bombay Shaving Co trimmer (Instamart) | ld+json matched, but the quick-commerce price is location-locked and there are no ratings. We have no Instamart rows in the DB, so I held them back. |
| Lifelong BLDC fan (Instamart) | Out of stock, and the live price ₹1,799 does not match the card's ₹1,445 |
| Lifelong weight machine (Bigbasket), Colgate combo (Jiomart) | No ld+json, so the price can't be verified. The Colgate combo is also FMCG. |
| ONIDA AC, Galaxy Z Fold4 (Flipkart) | Dropped by stage 1 |

## CEO audit

- live 12,037, pending 0, null price 0, null image 0
- posts 364, coverless 0, 2 posts so far today (IST). The blog cron covers the rest of the day.
- Broadcast cursor 12515 vs DB max 12516. The gap is exactly this batch, and the external cron picks it up on its next run.
- Unpushed commits: 0 before this commit
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200

Clean.
