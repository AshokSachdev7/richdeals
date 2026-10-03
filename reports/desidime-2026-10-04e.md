# DESIDIME-INGEST — 2026-10-04e (04:45 IST)

**0 pushed.** IndexNow was not pinged because there were no slugs to ping.

## Sweep

`/new` + homepage gave 32 cards.

- 16 dropped as junk or other-store, including:
  - BHIM UPI cashback
  - 2× CRED app promos
- 13 resolved to a product.
- 5 already in the DB.
- **8 fresh candidates.**

## Verdicts

| Candidate | Store | Result |
|---|---|---|
| Solimo iron flower vase B0D2HR3ZKT | Amazon | **Reject**, paise price: PDP is ₹177.45 against an M.R.P. of ₹999. In stock, 4.2 (128). |
| Daniel Klein DK11873-4 watch B07QM1W4JF | Amazon | **Reject**: currently unavailable, no add-to-cart |
| FRONTECH MS-0050 gaming mouse B0CQJKBPYL | Amazon | **Reject**: rating 3.4 (80), at or below 3.5 |
| 6-inch nursery pots ×10 B0GMRSPWB6 | Amazon | **Reject**: drift (PDP ₹333 vs card ₹167, clip coupon) and rating 3.2 |
| FRONTECH 17.3" portable monitor B0GRV8F3T4 | Amazon | **Reject**: already rejected in 10-04c (card drift, 3 ratings) |
| GAMDIAS Athena M4M cabinet B0FY3QV2PG | Amazon | **Reject**: already rejected in 10-04c (card drift, 6 ratings) |
| Milton Elegance Jr. casserole ×3 | Myntra | **Reject**: stage-1 price drift. The same set is already live from Amazon at ₹506 (10-04c). |
| Mother's ginger-garlic paste 500 g | BigBasket | **Reject**: food, and the page has no ld+json |

Amazon was read in the logged-in Playwright tab:

- `#centerCol` for price and M.R.P.
- `#availability` for stock.
- `#add-to-cart-button`.
- `#acrPopover` for rating.

## CEO audit

- **Deals:** live 12,027, null price 0, null image 0, pending 0.
- **Posts:** 363, 0 coverless, 0 seoless.
- **IST posts per day** (09-25 → 10-04): 4,4,4,4,4,4,4,3,4,1. Never 0; 10-04 is in progress.
- **Broadcast cursor:** 12506 = DB max.
- **Prod endpoints** `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200.
- **Unpushed commits:** 0 before this commit.

Clean.
