# DESIDIME-INGEST · 2026-10-28e (10-28, afternoon IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Junk / grocery / other-store drops | 6 |
| Non-product drops (Flipkart `/product/p/itme` power bank, no pid) | 1 |
| Same product posted twice on the listing | 2 |
| Resolved to a product (`visit.desidime.com` → merchant) | 27 |
| Already in the DB or rejected within 24h | 12 (7 LIVE dups, re-verified below; 5 in the 24h reject window) |
| Fresh | 15 (5 Amazon, 7 Flipkart, 2 Myntra, 1 Klook) |
| Stage-1 skip (Flipkart `price-drift` ×4, Klook `no-ld-json`) | 5 |
| Rejected on title (Horlicks 1 kg, FMCG/grocery) | 1 |
| PDP-verified (Amazon + Flipkart in the logged-in Playwright tab, Myntra via `productLd()`) | 9 |
| Rejected after the PDP read | 5 |
| **Pushed LIVE** | **4** (ids 15280-15283) |
| Price-synced LIVE rows | 4 (#5029, #5336, #6343, #1183) |

## Pushed

| ID | Store | Product | ₹ | MRP |
|---|---|---|---|---|
| 15280 | Flipkart | Morphy Richards Kingsman Elite 3-in-1 grooming kit (TMRH3942RSEFVHWZ) | 669 | 1,999 (67%) |
| 15281 | Flipkart | Philips MG3750/33 waterproof grooming kit (TMRHEZRYGFFRVYF4) | 1,259 | 3,095 (59%, read off the PDP; card MRP equalled the price) |
| 15282 | Myntra | Kook N Keech men's regular-fit joggers, black (40275635) | 99 | null (₹1,999 implied 95% off, nulled per rule) |
| 15283 | Myntra | Kook N Keech men's regular-fit joggers, grey melange (40275640) | 159 | null (₹1,999 implied 92% off, nulled per rule) |

All 4 returned `created:true` (`count:4`). The title ₹ was diffed against `price` before POST. Flipkart links carry `affid=djhackraj`; Myntra goes through InRDeals. Images come from `rukmini1.flixcart.com` and `assets.myntassets.com`. The "100% supercoins back" angle on the Philips card was not claimed in the copy.

## Verify table

Amazon was read with a same-origin fetch of `/dp/ASIN?th=1&psc=1`, using `#corePriceDisplay .a-price-whole`, `.basisPrice`, `#availability`, add-to-cart and a `#centerCol` "with N percent savings" cross-check. There was no captcha, so the mobile-UA fallback was not needed. Flipkart was re-read in the logged-in tab (ld+json `Product.offers`).

| ID | Product | Card ₹ | Live ₹ | Result |
|---|---|---|---|---|
| TMRH3942RSEFVHWZ | Morphy Richards Kingsman Elite (Flipkart) | 669 | 669, InStock | **pushed** |
| TMRHEZRYGFFRVYF4 | Philips MG3750/33 (Flipkart) | 1259 | 1259, InStock | **pushed** |
| 40275635 | Kook N Keech joggers, black (Myntra) | 99 | 99, InStock | **pushed** |
| 40275640 | Kook N Keech joggers, grey melange (Myntra) | 159 | 159, InStock | **pushed** |
| HSTGRF6C7FG9GZXU | Morphy Richards 340042 straightener (Flipkart) | 649 | curl ld+json 649, logged-in tab **1749** | rejected: the two reads disagree, so the price is unverified |
| B0GRW5BSBW | boAt CineHead E1 projector | 6305 | 7499 (+ coupon badge) | rejected: drift |
| B07GWV71FQ | Durafit Dash 2.5HP treadmill | 7613 | 9799 | rejected: drift |
| B0BYKSXHYK | PNG Jewellers 2 g 24 kt gold ring | 29440 | 31440 | rejected: drift (gold reprices daily) |
| B0H3L7GWZC | Samsung 10 kg 5★ Eco Bubble washer | 23065 | 29390 (+ coupon badge) | rejected: drift (card was a coupon/bank price) |
| B00E3AP5KS | Horlicks chocolate 1 kg refill | 256 | not read | rejected: grocery/FMCG |
| RTRG7W568RUGBYXE | D-Link R15 Wi-Fi 6 router (Flipkart) | 1804 | 1999 | rejected: drift (stage 1) |
| MOBHQC8DMYUHNY2A | vivo T5 5G 6/128 (Flipkart) | 28974 | 34999 | rejected: drift (stage 1) |
| MOBHQCH6HZZH3BTH | Samsung Galaxy S25 FE 8/128 (Flipkart) | 42274 | 44999 | rejected: drift (stage 1) |
| HDRFSHH2PNCCYSYH | Philips BHC017/00 hair dryer (Flipkart) | 1019 | 1169 | rejected: drift (stage 1) |
| 6f90d6024061 | Klook Festival of Travel sale | n/a | no ld+json | rejected: promo hub, not a product (stage 1) |

- **Rejects:** all 11 were stamped in `data/dd-rejected.json` with `Date.now()` (6 by this tick, 5 by stage 1). The file now holds 713 entries.

## Duplicate re-verify (LIVE rows on the listing)

| ID | Row | DB ₹ | Live ₹ | Action |
|---|---|---|---|---|
| B0FJLSJ81W | #5029 Hisense 50" 4K QLED TV 50E75Q | 35990 | **32490** (card 27740) | **price-synced**: price, discountPct 46, title ₹/% and description ₹/% |
| B0FDFRGWLQ | #5336 boAt Aavante Orion Plus 160W soundbar | 5999 | **5299** (card 4270 was HDFC-CC only) | **price-synced**: price, discountPct 76, title and description |
| B0GY1419PY | #6343 SNITCH Loop 3-piece trolley set | 3999 | **3699** (card 3330) | **price-synced**: price, discountPct 74, title and description |
| B09GF6JBZN | #1183 Portronics Ruffpad 8.5E LCD pad | 166 | **141** | **price-synced**: price 141; MRP 799 implied 82% off, so MRP and discountPct were nulled. The thin "at Rs.166" title and description were rewritten |
| B0GNMKL3VP | #8676 Sony PS5 Slim | 69985 | 69985 (card 66237 was a bank price) | ok |
| B0DM1MTZ1X | #5206 GOBOULT X120 soundbar | 2013 | 2013 | ok |
| B0GQV895L5 | #2985 Parachute protein shampoo 1.2 L | 472 | 472 | ok (synced in 10-28d) |

All slugs were unchanged: the syncs used `prisma.deal.update`, not the bulk upsert.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 8 slugs (4 pushed, 4 synced) → **HTTP 200 for 11 URLs**.
- **Prod check:** the pages for #15281 and #15282 return 200, and prod `/api/deals` lists #15283 first.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,747 (+4), equal to the prod `/api/deals` total of 14,747 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15283 |
| Broadcast cursor | `lastId` 15279 against max 15283: the external cron has 4 to drain, not rot |
| Posts: total / coverless / missing SEO fields | 441 / 0 / 0 |
| Posts per IST day | 10-21: 3 · 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 3 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. 10-28 has 3 posts, which meets the daily rule.
