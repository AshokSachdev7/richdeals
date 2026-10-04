# DESIDIME-INGEST tick — 2026-10-04f (06:45 IST)

**0 pushed** (7 fresh candidates, all rejected). IndexNow n/a (nothing to ping).

## Sweep

`/new` + homepage gave 31 cards. 17 were dropped as junk or other-store. 14 resolved to a product: 7 already in the DB, 7 fresh.

## Rejected (verified on the PDP in the logged-in Amazon tab)

| Product | Store | Reason |
|---|---|---|
| Milton Elegance Jr. casserole set ×3 | Myntra | Stage-1 price drift (₹427 on the card) |
| Solimo flower vase, grey (B0D2HR3ZKT) | Amazon | Paise price ₹177.45; "Only 1 left" |
| Daniel Klein DK11873-4 watch (B07QM1W4JF) | Amazon | `#outOfStock`, no add-to-cart |
| FRONTECH MS-0050 gaming mouse (B0CQJKBPYL) | Amazon | Rating 3.4 (80) ≤ 3.5 |
| Plastic 6" nursery pots ×10 (B0GMRSPWB6) | Amazon | Rating 3.2 (103) ≤ 3.5 |
| FRONTECH 17.3" portable monitor (B0GRV8F3T4) | Amazon | 3 ratings (also rejected in 1004c) |
| GAMDIAS Athena M4M Wood cabinet (B0FY3QV2PG) | Amazon | 6 ratings (also rejected in 1004c) |

## CEO audit

- live 12,027; null price 0; null image 0; pending 0
- DB max 12506 = broadcast cursor 12506
- posts 364; coverless 0; seoless 0
- IST posts/day, 09-25 → 10-04: 4,4,4,4,4,4,4,3,4,2 (never 0)
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- Unpushed commits: 0 before this commit

Clean.
