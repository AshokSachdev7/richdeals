# DESIDIME tick 2026-10-19a (11:10 IST)

**1 new Amazon deal pushed LIVE.** The bulk call returned 201 with count 1, created:true, and the slug returns 200. IndexNow returned HTTP 200 for 4 URLs (the slug plus the 3 hubs).

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 39 |
| Resolved to a single product | 23 |
| Already in the DB | 11 |
| Fresh candidates | 12 (11 Amazon, 1 Bigbasket) |
| Non-Amazon rejected | 1. Bigbasket baby wipes have no ld+json and are a grocery-type item. |
| Passed Amazon PDP verification | 1 |

## Pushed

| ASIN | Deal | Price / M.R.P. |
|---|---|---|
| B08X1HCVWF | Shocknshop digital sports watch, black dial (315RED) | ₹199 / ₹1,119 (82%), in stock, add-to-cart present |

It uses `?tag=ashoksachdev-21` and an `m.media-amazon.com` hi-res image. The title and description are original.

## Rejected (card price → PDP price)

The DesiDime card prices are after a bank offer. Every rejected listing is 10-15% higher on the PDP.

| ASIN | Deal | Card → PDP |
|---|---|---|
| B0F8W3C19R | Aquaguard Sure Delight UV+UF | ₹6,412 → ₹7,124 |
| B0GPQY19P2 | Kamiliant Harrier Edge 3-piece set | ₹3,186 → ₹3,649 |
| B0FR4LJDPG | V-Guard Zio 15L water heater | ₹5,290 → ₹6,099 |
| B0H1WXCRHT | iQOO Z11 Lite 4/128 | ₹16,997 → ₹19,497 |
| B0GGQ1C6QD | Zebronics 550W Dolby Atmos soundbar | ₹11,499 → ₹12,999 |
| B0H4R4D1F6 | Bhima 24K gold ring 2g | ₹29,517 → ₹32,717 |
| B0HM181PCS | Footloose Head Spin set of 3 | ₹2,835 → ₹3,149 |
| B0CRVQ43VC | CELLBELL C190 office chair | ₹3,960 → ₹4,399 |
| B0BHKYMNRP | French Connection automatic watch | no buy box |
| B0DHVWY583 | Kalyan 24K gold coin 2g | no buy box |

## CEO audit (11:11 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-17: 4, 10-18: 4, 10-19: 1 so far. The CONTENT-SEO cron still has runs left today. |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,203 (+16 since the TG 10-19a tick: IFS 13, TG 2, DesiDime 1) |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal | id 13727, 0 min old |
| DB max id / broadcast cursor | 13727 / 13716. The gap of 11 is the last minutes of ingest batches, which the external broadcast cron is still working through. Not flagged. |
| Prod endpoints (7) | all 200, max 0.83 s (`/blog`) |
| Unpushed commits | 0 before these reports |
| Session crons | 9 in CronList, the whole roster |

No rot found.
