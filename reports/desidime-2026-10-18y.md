# DESIDIME tick 2026-10-18y (00:33 IST, 10-19)

**2 new Amazon deals pushed LIVE.** The bulk call returned 201 with count 2, all created:true, and both slugs return 200. IndexNow returned HTTP 200 for 5 URLs (the 2 slugs plus the 3 hubs).

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 34 |
| Junk / hub / tracking dropped by stage 1 | 10 |
| Resolved to a single product | 20 |
| Already in the DB | 4 |
| Fresh candidates | 16 (11 Amazon, 5 non-Amazon) |
| Non-Amazon rejected by stage 1 (ld+json) | 5 |
| Passed Amazon PDP verification | 2 |

## Pushed

| ASIN | Deal | Price / M.R.P. |
|---|---|---|
| B0DWCRZBBP | Skullcandy In-Ear Wired Earbuds, USB-C + mic | ₹799 / ₹3,999 (80%), in stock, add-to-cart present |
| B0F4N3T2PH | ZEBRONICS Silencio 111 Wireless Headphone, hybrid ANC | ₹1,499 / ₹8,999 (83%), in stock, add-to-cart present |

Both use `?tag=ashoksachdev-21` and an `m.media-amazon.com` hi-res image. Titles and descriptions are original.

## Rejected

| Store | ID | Deal | Card price → live price |
|---|---|---|---|
| Amazon | B0D6BYR3GX | NB NOIZZYBOX Starlight+ speaker | ₹374 → ₹399 |
| Amazon | B0G39ZNLHY | Mivi Nex 650 soundbar | ₹5,850 → ₹6,499 |
| Amazon | B0753ZSGGL | SIGNORA 370 ml glass container | ₹100 → ₹390 (it was ₹299 at the TG tick, so the price moved again) |
| Amazon | B0DHVWY583 | Kalyan 24K 2 g gold coin | No buy box, no add-to-cart (third tick running) |
| Amazon | B0H4R4D1F6 | Bhima 24K 2 g ring | ₹29,517 → ₹32,518 |
| Amazon | B08GNZ7KMQ | TCL 55" Mini LED TV | ₹49,490 → ₹55,990 |
| Amazon | B0HKMBDZ5Y | ASUS Vivobook 15 Core 3 | ₹46,390 → ₹52,990 (same as the 18w tick) |
| Amazon | B0HG1VM9Q8 | HP AiO i5-1334U | ₹87,790 → ₹99,990 (same as the 18w tick) |
| Amazon | B0HMY12TBH | Generic kids sweatshirt ₹99 / ₹599 | Price matches, but the brand is Generic and ₹99 is one size or colour variant. Skipped for quality. |
| Flipkart | COMHZFBNGMGZGY3A, COMHPH5FCNRH7RXP, AFRHCVUKZQGBNNAV | Lenovo Slim 5 OLED, Alienware 15, Greenchef air fryer | Price drift (ld+json) |
| Flipkart | MOBHR3ZPV9NEHPY6 | Mivi One 5G | Out of stock |
| Instamart | 88b6f38ec429 | Wireless powerbank | Price drift |

Stage 1 dropped a Flipkart BSU sale hub, an Amazon rewards ad, and the Eglo lamp and JBL Partybox cards (Flipkart tracking / non-`/p/itm` paths).

## CEO audit (00:33 IST 10-19)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-17: 4, 10-18: 4. 10-19 is 33 minutes old; the CONTENT-SEO tick covers it. |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,185 (+2) |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal | id 13709, 0 min old |
| DB max id / broadcast cursor | 13709 / 13707. The gap of 2 is this batch. |
| Prod endpoints (7) | all 200, max 0.59 s (`/blog`) |
| Unpushed commits | 0 before this report |
| Session crons | 9 running, the whole roster (CronList checked at the 00:07 sitemon) |

No rot found.
