# DESIDIME-INGEST — 2026-10-04c (00:45 IST)

**1 pushed.** Bulk `count 1`, `created:true`. IndexNow **HTTP 200** (4 urls).

## Stage 1

33 cards. 19 dropped as junk or non-product: Rare Rabbit category hub, Moto Watch and Axe (Flipkart non-product), Amazon `/s?` mouse search, Hubble app. 9 resolved to a product, 4 already in the DB, 5 fresh.

## Pushed

| Product | Store | Price | M.R.P. | Rating |
|---|---|---|---|---|
| MILTON Elegance Jr. casserole set of 3 (395 ml / 750 ml / 1.35 L) | Amazon B0BX91Z8KX | ₹506 | ₹1,299 | 4.0 (494) |

Checked on the product page in the logged-in Amazon tab:
- core ₹506 matches the DesiDime card
- `#availability` says In stock
- add-to-cart is present
- no "only N left" line

Copy is original.

## Rejected

- FRONTECH 17.3" portable monitor: card ₹10,482 vs PDP ₹11,980, and only 3 ratings
- GAMDIAS Athena M4M cabinet: card ₹5,814 vs PDP ₹6,119, and only 6 ratings
- Dabur Red gel toothpaste (JioMart): FMCG
- BigBasket eggs: food

FRONTECH and GAMDIAS showed the same drift in tick 10-04b. Their DesiDime cards are stale.

## CEO audit

- live 12,022 (+1), pending 0, null price 0, null image 0
- posts 363, coverless 0, seoless 0
- IST posts/day 09-25 → 10-04: 4,4,4,4,4,4,4,3,4,1 (today has 1 so far)
- broadcast cursor 12500 vs max 12501: the 1-deal gap is this push; the external cron picks it up
- prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- unpushed commits: 0 before this commit

Clean.
