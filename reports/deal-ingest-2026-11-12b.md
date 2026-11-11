# Deal-ingest (indiafreestuff) — 2026-11-12b

Stage 1 `ingest-ifs-proper.mjs` over `/deals` + `/deals/superdeals`, base64 `?rto=` Buy Now ids resolved. Every price verified on the live Amazon PDP in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `.basisPrice` MRP, `#availability` + add-to-cart). Text rewritten, images from `m.media-amazon.com` only.

## Funnel

| Step | Count |
|---|---|
| Cards discovered | 106 |
| Resolved to merchant URL (all Amazon) | 102 |
| Dropped at stage 1 (3 Flipkart `/indiafreestuff/p/` low-value/multi-qty, 1 Amazon `/b?node=` samples category) | 4 |
| Already in DB (all LIVE) | 65 |
| Dups PDP-checked (B0D267C6CD 1699, B09FMM9V9N 274) → price-synced | 0 (both matched DB) |
| Fresh | 37 |
| PDP-verified + pushed LIVE | **19** |
| Rejected at PDP | 18 |

Push: HTTP 201, `count:19`, 19/19 `created:true`, readback 19/19 LIVE (ids 16380–16398). Affiliate: Amazon `/dp/ASIN?tag=…-21`.

## Accepted (card vs PDP)

| ASIN | Deal | Card ₹ | PDP ₹ | MRP | Off |
|---|---|---|---|---|---|
| B0HL6K8XZV | ASUS ExpertCenter PN42 Fanless Mini PC | 20049 | **21299** | 75000 | 72% |
| B0GY4RH3MX | Sony 1000X THE COLLEXION headphones | 36287 | **49787** | 69990 | 29% |
| B01FOCZ5W6 | Expresso steel tiffin 420 ml | 171 | **178** | 450 | 60% |
| B0GD64WHT3 | Hopping walking dog toy | 284 | **299** | 999 | 70% |
| B0BTCZZN5N | ASUS Vivobook Go 15 (Ryzen 5 7520U, 16/512) | 82900 | 82900 | 98990 | 16% |
| B09RVH3YBY | Linist camping sleeping bag | 911 | **940** | 1790 | 47% |
| B0C58BNM38 | Energizer 10000mAh wireless power bank | 1999 | 1999 | 3339 | 40% |
| B0D8HWZZJ6 | Energizer AAA, pack of 12 | 194 | **215** | 300 | 28% |
| B0GYSBY4F3 | MIKANIX extendable fan duster | 215 | **259** | 499 | 48% |
| B0HLPWTQGH | USHA Aquerra 15L water heater | 8240 | **10299** | 20990 | 51% |
| B0GWJGC2JL | INALSA 14L double-basket air fryer | 7115 | **9999** | 22999 | 57% |
| B0CCDJXJF2 | Bluetooth neckband V5.1 | 193 | **197** | 2499 | 92% |
| B09J3H1HHB | MIRADH 300 LED curtain lights | 387 | **399** | 1999 | 80% |
| B0CVB1K426 | TP-Link VIGI NVR2016H 16-ch NVR | 8033 | **9199** | 26999 | 66% |
| B0BN857VJ7 | Havells Innova Neo 3W spot | 200 | **204** | 380 | 46% |
| B0H98RXQSW | Da URBAN Merlion Pro office chair | 6300 | **6999** | 29999 | 77% |
| B00W9EM9OU | MILTON Odyssy 3-container lunch box | 622 | 621 | 1195 | 48% |
| B0C7MG65VF | Larah Belle 21-pc dinner set | 1334 | 1333 | 3460 | 61% |
| B08CW6VN1L | Gadgets Wrap wall decal 29 cm | 49 | 49 | — (1001 fails 20x MRP guard) | — |

13/19 card prices stale, published PDP price only.

## Rejected

- No buybox / no add-to-cart (5): B0FHKY29D7 flashcards, B0D71HVXHG Casio MW-620H, B0GFM1LKKT Peppa scooter, B0HHMLJMW9 MILTON Utsav casserole, B0H9PF9X2C bean bag cover.
- Card price drifted ≥1.5x, deal gone (11): B0DTJ1S4C9 FINGERS cable 151→230, B0C7MKRYGY Larah Pansy 66pc 3866→6244, B0FQHZ6Y4Q BBQ grill 1002→5925, B0CR7KY39D BEDSPUN towel 447→836, B0F2J513N8 + B0F8QYK8R2 John Players trunks 255→399 / 302→999 (block rejected whole), B0G33XW8JF Santa dress 166→719, B0H29Q8WPS PEARLPET bottle 130→238, B0G3FY54LJ lunch box 208→499, B0F91PS1PP MILTON Modulo 299→866, B0F1JZHHTP R59 Trax bag 363→799.
- No discount, PDP = MRP (2): B00O7XQPN2 Quaker Oats 86, B0042A9UXC Energizer CR2032 250.

## Freshness

- IndexNow: **HTTP 200, 22 urls** (19 deals + 3 hubs).
- sitemap.xml ISR 1800s; llms.txt force-dynamic. No new static route.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,829 = 15,829 | OK |
| PENDING_REVIEW | 2 (16261, 16262) member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,363 vs 16,398 (lag 35 = this tick + DD 11-12b tail; was 16,343, draining) | OK |
| Unpushed commits | 0 | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap, not fixable retroactively), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

Session crons auto-expire ~11-19; owner says "restore all crons" to re-arm.
