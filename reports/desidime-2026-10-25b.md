# DesiDime ingest — 2026-10-25b

Stage 1: 35 cards discovered, 11 junk/other dropped, 22 resolved, 8 already in DB, 14 fresh.

## Pushed LIVE (bulk 201, 7 created)

| # | Product | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 14701 | Amazon Basics folding guitar stand (B0CGLFDP2J) | Amazon | 381 | 999 | 62% |
| 14702 | HP GK400Y mechanical keyboard (B0CX8MH9XN) | Amazon | 1,299 | 3,999 | 68% |
| 14703 | MILTON Aqua 1000 920 ml, set of 3 (B07CVZ8G7T) | Amazon | 596 | 1,323 | 55% |
| 14704 | ZEBRONICS MB10000S15 power bank (B0D22ZZM34) | Amazon | 649 | 2,099 | 69% |
| 14705 | Intex LTC 278A toner (B0FMS38FD1) | Amazon | 459 | null (2,799 = 84% off, guard) | – |
| 14706 | Garmin Venu 3 Slate/Black (B0CDC6H66Y) | Amazon | 34,990 | 50,490 | 31% |
| 14707 | Wildcraft Gypsos 22" 4-wheel suitcase (STCGHR2W6GYBCP3J) | Flipkart | 996 | null (6,748 = 85% off, guard) | – |

Amazon verified in logged-in tab (`.a-price-whole` in #corePriceDisplay, #availability In stock, add-to-cart present, hiRes keyed by landingAsinColor). Flipkart via productLd() 996 ±1, InStock.

## Rejected

- Nasher Miles Istanbul luggage set (B083M243LT): card 8,100, PDP 8,999 (drift).
- Lifelong leg massager (B0CTH76PKB): card 9,000, PDP 9,999 (drift).
- New Balance ARISIN (B0F53GG1BM): no price, no add-to-cart (size-gated / Prime reward).
- Wowper baby diaper pants (B09FDWD1JH, 176): low-ticket FMCG.
- Flipkart LG fridge, Nothing Phone (4b), Acer Aspire 3: price-drift in stage 1.

## Freshness

IndexNow HTTP 200 (10 urls = 7 slugs + 3 hubs). Spot check prod 200 on #14701 + #14707.
