# TELEGRAM-DEAL-MONITOR tick — 2026-11-17b

The tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile). Every newest post in the sidebar was a category, coupon, grocery or already-seen post, except CoolzTricks' F Gear backpack. It then read the history of the open SB Loots chat, which had five bare "BUY" posts from 12:10 to 12:35 AM, all newer than tick 11-17a. The tick resolved the shortlinks, deduped them against `data/tg-multi-seen.json` and the live DB, and verified each price on the PDP: Amazon in the logged-in tab, Shopsy through its `finalPrice` field. Run at about 00:40–01:10 IST.

**Result: 1 deal pushed LIVE (#16722), `count:1`, `created:true`. IndexNow returned HTTP 200 for 4 URLs, and the page returns 200 on prod. Four low-ticket FMCG items were rejected. Every CEO-audit check is green, and all 9 session crons are armed.**

## Candidates

| Product | Id | Source | Outcome |
|---|---|---|---|
| F Gear Polaris 37L school backpack, Navy | B0GYHMBXWF | SB Loots `amazn.lt/9ioBPAkf`, CoolzTricks `amzn.to/4ADFava` | Pushed (#16722) |
| Set Wet Casually Cool hair gel, 250 g (₹112 / ₹280) | B079HWW3NM | SB Loots `amazn.lt/bcjUs1dk` | Rejected: low-ticket FMCG |
| Amazon Brand Presto! rose liquid handwash, 5 L (₹278 / ₹425) | B0GWS73DY2 | SB Loots `amazn.lt/EkpjWBOD` | Rejected: low-ticket household FMCG |
| Soft & Secure sanitary pads (Shopsy) | XAEGPEKHMFFHU9SH | SB Loots `bittli.in/y2OwjGyT` | Rejected: low-ticket personal hygiene |
| Whisper Bindazz night period panty (Shopsy) | SPPH8P8BHUNCYKAZ | SB Loots `bittli.in/UAv905Zv` | Rejected: low-ticket personal hygiene |

None of the five ids was in the seen list or the DB before this tick.

## Pushed

| Id | Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|---|
| 16722 | Amazon | F Gear Polaris 37L School Backpack, Navy (B0GYHMBXWF) | ₹780 | ₹1,560 | 50% |

Notes:
- **PDP check:** the PDP showed "Only 1 left in stock." with the add-to-cart button present. The price was read from `.a-price-whole` in `#corePriceDisplay`, and the M.R.P. from `#centerCol`.
- **Channel price vs PDP:** CoolzTricks posted "@385". The PDP read ₹780, so the gap is a clip coupon we cannot read from fetched HTML, or a short price drop that has ended. The deal is stored at the PDP price. The copy and the how-to step tell buyers to tick a clip coupon if one shows, and say the listed price is before any coupon.
- **Capacity:** the listing title says 37L but its feature list says 35L. The copy says "roughly 35 to 37 litres" and gives the 33 x 24 x 47 cm dimensions instead of picking one figure.
- **Image:** `colorImages` did not parse from the fetched HTML, so the image came from `#landingImage` `data-old-hires` with `landingAsinColor` "Navy": `m.media-amazon.com/images/I/81+KTIzvEzL._SL1500_.jpg` (200).
- **Affiliate link:** `https://www.amazon.in/dp/B0GYHMBXWF?tag=ashoksachdev-21`. The source tags (`bhavesh015-21`, `collab-amafhh-21`) were dropped.
- **Pre-flight check:** every ₹ figure in the title and copy matches the price or the M.R.P.
- **Push target:** local API (`localhost:4000`).

## Rejected / skipped

- **SB Loots category and loot posts:** Jack & Jones, HP accessories, Rare Rabbit (Myntra), women's cargos at ₹269 (4 links), men's footwear loot, Tokyo Talkies loot, a geyser category, and two "Upto 90% Off" loot lists.
- **CoolzTricks:** a second category link alongside the backpack.
- **RichDeals (our own channel):** the GOBOULT post, which is ours.
- **Dealzone:** Levi's category on Myntra.
- **NonStopDeals:** Caprese category.
- **LATEST IPHONE RATES:** OPPO coupon, not a product.
- **Dealdost:** coupon loot.
- **Rogerkart Anjeer:** grocery.
- **Hidden Loot and IndiaFreeStuff Tips (Swiggy Dineout):** not a product.
- **ONLINE SHOPPING DEALS Vega scalp brush:** low-ticket, already rejected in tick 11-16m.
- **INDIAN CHEAP DEALS LG washer B0DPHTSTYJ:** already seen; LIVE #5035.

All five candidate ids were added to `data/tg-multi-seen.json`, which now has 5,225 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the new slug plus 3 hub URLs returned **HTTP 200 for 4 URLs**.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.46s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.82s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.64s) |
| /f-gear-polaris-navy-37l-school-backpack-b0gyhmbxwf | 200 (0.22s) |

## CEO audit

The audit was run just before the push, so the max id and LIVE count below are the pre-push figures.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,141 = 16,141 (16,142 after #16722) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,721, now 16,722 | OK |
| Posts | 492, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,721 vs 16,722 | OK. #16722 is queued for the external broadcast cron. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 1**. 11-17 needs at least one more post; the CONTENT-SEO runs at 06:39 and 12:39 IST cover it.

## Still open

- **IFS source blocked:** every `?rto=` redirects home (8 dry ticks).
- **No buy box, on watch:** #9689 (Haier washer), #15663 (FRONTECH B0C5RX48VG), #14424 (HP 460 keyboard).
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:** #7461, #16506, #16558, #16610, #13537, #360; B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY; #16678, #16682, #16666, #10311; **#16722 (F Gear backpack, 1 left)**.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#16224 and #652:** slugs kept on purpose.
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at 02:03 IST (11-17). Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
