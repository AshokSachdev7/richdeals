# DESIDIME-INGEST — 2026-10-04d (02:46 IST)

**2 pushed** (both Amazon). Bulk `count 2`, both `created:true`. IndexNow **HTTP 200** (5 urls).

## Stage 1

- 35 cards from `/new` + the homepage.
- 16 dropped as junk or non-product: Amazon rewards ad, Tata CLiQ edit hub, Myntra belt category.
- 16 resolved to a product. 6 were already in the DB, leaving 10 fresh.

## Pushed

| Product | Store | Price | M.R.P. | Rating |
|---|---|---|---|---|
| Energizer Max AA alkaline ×2 (E91BP2) | Amazon B006T9AM2M | ₹77 | ₹110 | 4.6 (139) |
| HELLCAT boys printed tee, combo of 2 | Amazon B0BXQ37P33 | ₹557 | ₹6,495 | 3.8 (11,027) |

Both checked in the logged-in Amazon tab: core price matches the DesiDime card, `#availability` In stock, add-to-cart present, no "only N left" line. All copy is original.

## Rejected

- Paise price: Solimo flower vase ₹177.45
- Unavailable / no add-to-cart: Daniel Klein DK11873-4 watch
- Rating ≤3.5: FRONTECH MS-0050 mouse 3.4; plastic pots ×10 at 3.2, which also drifted (₹167 on the card vs ₹333 on Amazon)
- Card-vs-PDP drift + too few ratings:
  - FRONTECH 17.3" monitor: ₹10,482 vs ₹11,980, 3 ratings
  - GAMDIAS Athena M4M: ₹5,814 vs ₹6,119, 6 ratings
  - Both were rejected in 10-04c as well.
- Myntra Milton casserole: price drift, caught by the stage-1 ld+json check
- Food: BigBasket Mother's ginger-garlic paste

## CEO audit

- live 12,027 (+2), pending 0, null price 0, null image 0
- posts 363, coverless 0, seoless 0
- IST posts/day 09-25 → 10-03: 4,4,4,4,4,4,4,3,4 (never 0). 10-04 has 1 so far at 02:46 IST; the 6-hourly BLOG cron covers the rest of the day.
- Broadcast cursor 12504 vs DB max 12506: the gap is exactly this batch, and the external cron picks it up on its next run.
- Unpushed commits: 0 before this commit
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200

Clean.
