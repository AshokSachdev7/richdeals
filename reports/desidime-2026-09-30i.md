# DesiDime ingest — 2026-09-30i

## Stage 1 (`ingest-desidime.mjs`)
- **Discover:** 33 cards; 20 resolved to a product.
- **Dedup:** 5 were already in the DB, which left 15 fresh candidates.
- **Script skips (curl):**
  - 1 no-ld-json: NAFED rajma on Hamaramall, which is food and would be rejected anyway.
  - 4 Flipkart price-drift. I rechecked these in the browser; see below.

## Verify
- **Amazon:** logged-in tab, `#centerCol` + `#availability` + add-to-cart.
- **Flipkart:** ld+json read in a browser tab.
- **Shopsy:** `finalPrice`/`ppd` plus the rating block, from curl.

| Deal | Card | PDP | Verdict |
|---|---|---|---|
| ZEBRONICS Power Block 385 B0DQGKXYM6 | ₹999 | ₹999 / M.R.P. 2,999, 4.1★ (333), in stock | **pushed** |
| MILTON Kool Rover 12 jug (Shopsy) | ₹984 | ₹984 / M.R.P. 1,305, 4.3★ (773) | **pushed** |
| PANZIK men's sandals (Shopsy) | ₹172 | ₹172 / M.R.P. 599, 4.0★ (519) | **pushed** |
| Wonderchef Nutri Blend B0CLVFSNPW | ₹2,989 | ₹2,989, 3.5★ | reject: rating ≤3.5 |
| Casio W-218H-8 B0FD3HQTJ2 | ₹947 | no add-to-cart | reject: unavailable |
| Havells Ventil Air B091FBFFMM | ₹1,102 | ₹1,449 | reject: drift |
| Duracell AAA ×12 B0FF66QX9J | ₹104 | ₹104, 3 ratings, card marked [Expired] | reject: too few ratings |
| Milan 120 L dustbin B0FQJTT8Q7 | ₹1,531 | ₹1,610, 5 ratings | reject: drift + too few ratings |
| URBN MagSafe power bank B0DGQMTCMR | ₹1,045 | ₹1,099 | reject: drift |
| CAMPUS OG-31 high tops (Shopsy) | ₹1,032 | ₹1,032, 3 ratings | reject: too few ratings |
| LG FHD1207STB washer-dryer (Flipkart) | ₹56,049 | ₹58,999 (card is account-specific) | reject: drift |
| Inalsa Nutri Fry 3L (Flipkart) | ₹2,158 | ₹2,898 | reject: drift |
| Inalsa Tasty Fry 5.5L (Flipkart) | ₹2,513 | ₹3,295 | reject: drift |
| BERGNER Sherry Plus 6 pc (Flipkart) | ₹950 | ₹1,999 | reject: drift |
| NAFED rajma (Hamaramall) | ₹165 | — | reject: food |

## Push
`/admin/deals/bulk` returned **count 3, all created:true**, status live.
- Amazon link uses `tag=ashoksachdev-21`.
- Shopsy links go through Cuelinks with a clean `pid` URL; DesiDime's `mcn`/`cmpid=AFF_operation4` were stripped.
- Copy is original, and images come from the marketplace CDN.

## Freshness
- **IndexNow:** HTTP 200 for 6 URLs (3 slugs plus 3).
- **sitemap/llms:** no new routes were added, so both pick up the batch through ISR and force-dynamic.

## CEO audit (checked against the DB)
- **Deals:** LIVE 11,665 · null price 0 · null image 0 · PENDING_REVIEW 0 · DB max 12037.
- **Posts:** 3 today (IST) · coverless 0 · seo-less 0.
- **Broadcast cursor:** 12026, 11 behind. That is this batch (3) plus the tail of the IFS batch (8). The cursor moved from 12016 to 12026 since the last tick, so the external cron is draining it. Not rot.
- **Prod:** 7/7 endpoints return 200.
- **Unpushed commits:** 0 before this report.
- **External blocker, carried forward:** the DataForSEO account is paused, and the owner has to email their support.

## Result
3 pushed, IndexNow 200, 0 rot.
