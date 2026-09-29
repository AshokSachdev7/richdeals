# DEAL-INGEST indiafreestuff tick: 2026-09-29g (12:39 IST)

## Discovery
- Fetched 4 IFS listing pages (home, /deals, ?page=2, ?page=3) at 2.6 s intervals: 96 slugs, **48 new**.
- Dropped 3 before resolving: Alpha Tribe ×2 (Ajio sale hubs), Tokyo Talkies tops (vague listing).
- Resolved 45 base64 `?rto=` links: 35 Amazon, 4 Flipkart, 6 Myntra. DB dedup by productId: 0 present.

## Verification (every price read on the store page)
- Amazon: logged-in tab, same-origin PDP fetch (price, M.R.P., `#availability`, add-to-cart, rating).
- Flipkart: ld+json in a Playwright tab; real `/p/itm…` path read from the PDP.
- Myntra: `pdpData` via curl (discounted, mrp, outOfStock, rating).

| Rejected | Reason |
|---|---|
| Rose / bird-of-paradise / thyme / peony seeds | seeds, low or no ratings |
| Symbol jogger B097MS6MT8, sweatshirt B088C4SKV6 | near-dups of last tick's pushes |
| Athom towel, CRAE tape, Reebok Energy Runner, Tokyo Talkies top | only 1–2 left |
| HammerSmith shirt, USI gloves, Wugatti sandals, Pepe jeans | rating ≤3.3 |
| Japanese pain-relief gel | health claim, 2 ratings |
| Dio muffler, TVS helmet | no price / no cart |
| Plant food B0G1K54MC3 | suspicious M.R.P., no ratings |
| Timex B0DLBF822J | 4 ratings |
| IGC puffer B0DKFNHRTT | only 4 left, 3.5 |
| COOLCOLD HDMI | drift, card 244 vs PDP 249 |
| Milky sunscreen | drift, 268 vs 274 |
| Rupa Jon vests | drift, 288 vs 320 |
| Whirlpool 192 L fridge (FK) | drift, 16,141 vs 16,990 |
| Oppo K14 Plus (FK) | M.R.P. unverifiable (61,999 in page JSON vs 32,999 strike) |
| Style Quotient shrug (Myntra) | drift, coupon price 301 vs 317 |
| AXE deo set (Myntra) | drift, 282 vs 314 |
| Daniel Klein DK10949 (Myntra) | out of stock |

**Accepted: 17** (12 Amazon, 2 Flipkart, 3 Myntra), all in stock:
- Nasher Miles laptop backpack ₹4,997 · Noise Pro 6 ₹3,999 · Levi's men's jeans ₹1,053
- Provogue Cavo Pro 14 L ₹886 · KWW 9 W bulb ×10 ₹399 · One94 10 m rope light ₹389
- Li-Ning No.7 string ₹386 · Boldfit women's sliders ₹349 · ANT kitchen scale ₹219
- Shuban zip folder ₹207 · Wipro Garnet 5 W downlight ₹207 · Amitasha squishy toy ₹199
- Philips TAH4050-RT (FK) ₹1,399 · Philips TAE2146BK (FK) ₹379
- Daniel Klein DK11396 (Myntra) ₹1,270 · Teakwood Concentrix 38 L trolley (Myntra) ₹849 · Killer KLR-GR055 (Myntra) ₹493

Copy was written originally from PDP facts only. Images come from m.media-amazon.com, rukmini1.flixcart.com and assets.myntassets.com.

## Push
- `/admin/deals/bulk` returned **count 17**, all `created:true`, status live.
- Affiliate: Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`; Myntra → InRDeals `inr678975705`.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 20 urls (17 slugs + 3) |
| sitemap.xml | 200 (ISR 1800 s) |
| llms.txt | 200, force-dynamic, no new hub |
| Sample deal page | `/teakwood-leathers-concentrix-38-l-hard-cabin-trolley-30646090` returns 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,534 = API total (max id 11881) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 346; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 3 |
| Broadcast cursor | 11864 vs max 11881: this batch is waiting for the external tg-broadcast cron (self-heals) |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **17 live, IndexNow 200, 0 rot.**
