# DESIDIME-INGEST — 2026-10-04g (08:46 IST)

**1 pushed** (Amazon). Bulk `count 1`, `created:true`. IndexNow **HTTP 200** (4 urls). The deal page returns 200 on prod.

## Stage 1

- 33 cards, 13 resolved to a product, 4 already in the DB, 9 fresh (7 Amazon, 1 Myntra, 1 JioMart).

## Pushed

| Product | Store | Price | M.R.P. | Rating |
|---|---|---|---|---|
| FRONTECH 1.5 m HDMI cable (copper-clad steel) | Amazon B0CRL6SXTQ | ₹69 | ₹399 | 3.7 (43) |

Verified in the logged-in Amazon tab:
- Whole-rupee priceToPay is ₹69, the same as the DesiDime card.
- `#availability` says In stock and the add-to-cart button is present, with no low-stock line.

All copy is original.

## Rejected (verified on the PDP)

| Product | Store | Reason |
|---|---|---|
| Fastrack Noir Charm smartwatch (B0G8JXCJ3J) | Amazon | Rating 3.3 (13) ≤ 3.5 |
| Solimo flower vase (B0D2HR3ZKT) | Amazon | Paise price ₹177.45 |
| Daniel Klein watch (B07QM1W4JF) | Amazon | `#outOfStock`, no add-to-cart |
| FRONTECH gaming mouse (B0CQJKBPYL) | Amazon | Rating 3.4 (80) ≤ 3.5 |
| FRONTECH 17.3" portable monitor (B0GRV8F3T4) | Amazon | Drift (card ₹10,482 vs PDP ₹11,980), 3 ratings |
| GAMDIAS Athena M4M cabinet (B0FY3QV2PG) | Amazon | Drift (card ₹5,814 vs PDP ₹6,119), 6 ratings |
| Milton Elegance Jr. casserole ×3 | Myntra | Stage-1 price drift |
| Colgate gel | JioMart | FMCG, and the page has no ld+json |

## CEO audit

- live 12,029 (+1), pending 0, null price 0, null image 0
- posts 364, coverless 0, 2 posts so far today (IST); the blog cron covers the rest of the day
- Broadcast cursor 12507 vs DB max 12508. The gap is exactly this batch, and the external cron picks it up on its next run.
- Unpushed commits: 0 before this commit
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200

Clean.
