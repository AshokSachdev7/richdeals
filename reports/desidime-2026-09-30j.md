# DesiDime ingest — 2026-09-30j

Stage 1: 33 discovered, 13 resolved, 3 already in DB, 10 fresh candidates.

## Pushed (3, all created:true, 3 LIVE in DB)

| Store | ID | Deal | Price | MRP | Off | Rating |
|---|---|---|---|---|---|---|
| Flipkart | HDRGFW6ZDFVRZA7G | Syska HD1625 1600W hair dryer | 822 | 1,799 | 54% | 4.0 (341) |
| Flipkart | HDRHH7R5FPCDWZXG | Havells GHPDDABPPK00 1000W hair dryer | 649 | 1,295 | 50% | 4.2 (1,243) |
| Amazon | B0FDKL3BT1 | Tukzer universal travel adapter 20W PD | 442 | 2,999 | 85% | 4.7 (16) |

## Rejected (7)

| ID | Reason |
|---|---|
| ACCHAX22HFHZQHYS Zebronics Zeb-Sniper mouse | price = MRP 599, discount is coins-back only |
| B0GZGRFGHW IFB 9/6/3 kg washer dryer | drift: PDP 52,990 vs card 50,341 |
| B0DSC481TK HP E45c 32" monitor | drift: 96,582 vs 91,754, only 1 left, no ratings |
| B0HKZ8Q2B5 LUMONY makeup pouch | 0 ratings |
| B0FDFRRMM3 boAt Aavante Prime 5.1 | drift: 11,999 vs 10,800 |
| CKSHBGX3TVTPCQX2 Sigri-wala | drift (stage 1) |
| 7ebe92a2a478 Longway fan (Myntra) | drift + loot slug (stage 1) |

## Freshness

IndexNow HTTP 200 (6 urls = 3 slugs + 3). Sitemap ISR 1800s, llms.txt dynamic.

## CEO audit

- Posts today (IST): 3. Coverless 0, seo-less 0.
- LIVE 11,744, null-price 0, null-image 0, PENDING_REVIEW 0.
- Broadcast cursor 12043 vs max 12117: external cron backlog, self-heals.
- Prod 7/7 200. Unpushed commits: 0.
- Rot: 0.
