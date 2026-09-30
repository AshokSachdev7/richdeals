# DesiDime ingest 2026-09-30k

Stage 1: 12 fresh candidates after DB dedup. **7 pushed** to `/admin/deals/bulk`, which returned `count 7`, all `created:true`. IndexNow returned HTTP 200 for 10 urls (7 slugs + 3). A prod page spot-check returned 200.

## Pushed (price verified on the live PDP)

| Deal | Store | Price / MRP | Off | Rating |
|---|---|---|---|---|
| Dove Renewing Raspberry and Lime Body Wash | Flipkart | 270 / 949 | 72% | 4.4 (4,650) |
| V-Guard Increda Plus Nutri Blender 500 W | Flipkart | 2,368 / 4,899 | 52% | 4.1 (195) |
| Dynebeam 10+1 LED string light connector | Shopsy | 173 / 399 | 57% | 4.1 (273) |
| Worthful Creations green polypropylene carpet | Shopsy | 415 / 2,099 | 80% | 3.8 (173) |
| Loyal Choice 60 L trekking rucksack | Shopsy | 427 / 3,999 | 89% | 4.3 (602) |
| Spotwalk SW-Fitman slip-on sneakers | Shopsy | 249 / 999 | 75% | 3.9 (1,607) |
| HikeHaven women's flats | Shopsy | 198 / 399 | 50% | 4.0 (768) |

- V-Guard: the card said 2,399 and the live price is 2,368. The drift is downward, so it was pushed at the live price. Flipkart's "Buy at 2,249" bank-offer figure was not used.
- Affiliate links: Flipkart uses `pid` + `affid=djhackraj`. Shopsy (not Flipkart) goes through Cuelinks with the clean `/p/itm…?pid=` URL.
- Shopsy `productId` is the real Shopsy `pid`, not the stage-1 hash, so future dedup matches. None of the pids existed in the DB before the push.

## Rejected (5)

| Candidate | Reason |
|---|---|
| NATURALTEIN plant protein 1 kg (Flipkart) | Health/food, and the price drifted from 1,506 on the card to 1,769 live |
| iQOO 15 and iQOO Z11 (Amazon) | Titles say "Upcoming", so they cannot be bought yet |
| Sharp 0.95 T AC (Amazon) | PDP shows "Currently unavailable" with no add-to-cart |
| Globus Naturals scrub combo (Digihaat) | No ld+json price, and it is a cosmetic/health product |

## Freshness

- IndexNow: HTTP 200.
- The sitemap (ISR 1800 s) and `llms.txt` (force-dynamic) pick up the rows automatically.
