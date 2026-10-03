# DesiDime ingest — 2026-10-04b (IST 2026-10-03 22:47)

Stage 1: 31 cards (/new + homepage), 17 resolved, 3 already in DB, **14 fresh**.

## Pushed — 4 (count 4, all created:true)

| ASIN | Deal | Price | M.R.P. | Rating |
|---|---|---|---|---|
| B0CB3VH6JQ | Solimo Giraffe 2-in-1 garden slide | ₹1,498 | ₹4,000 | 4.2 (5,720) |
| B0GZQ8WK5Y | GLUN 4" rubber bands 50 g | ₹118 | ₹599 | 4.3 (645) |
| B00J4YGNGS | Camlin Scholar geometry box | ₹80 | ₹140 | 4.4 (2,105) |
| B0FHF1WHTD | Longway LWIR01 2000W immersion rod | ₹399 | ₹1,119 | 3.8 (116) |

All read in logged-in Amazon tab: core price == card, #availability In stock, add-to-cart, no low-stock line.
Script: `apps/api/scripts/push-dd-1004b.mjs`.

## Rejected — 10

- Drift card vs PDP: Portronics Key2 (855 vs 899), Lenovo IdeaCentre i7 (1,22,551 vs 1,29,000), ZEBRONICS A24FHD (5,400 vs 5,999), Milton Elfin (568 vs 932), FRONTECH 17.3" portable (10,482 vs 11,980, 3 ratings), GAMDIAS Athena (5,814 vs 6,119, 6 ratings)
- Paise price + 1 rating: Solimo triply cooker (1,317.90)
- No ratings: Sutli bomb candles
- Food: Anjeer, BigBasket eggs

## Freshness

- IndexNow: **HTTP 200**, 7 URLs (4 slugs + 3 hubs)
- Sitemap ISR ≤30 min; llms.txt force-dynamic. New deal page 200.

## CEO audit

- live 12,015 · pending 0 · null price 0 · null image 0 · maxDeal 12494
- posts 362 · coverless 0 · seoless 0 · IST days 09-25→10-03 all 3–4 (10-03 = 4)
- broadcast cursor 12490 vs max 12494 — external cron, self-heals
- prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` 7/7 200 · unpushed 0
- Clean.
