# DESIDIME-INGEST · 2026-10-28g (10-28, late evening IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Junk / grocery / other-store drops | 5 |
| Non-product drops (Flipkart, no itm path / `/p/p/item`) | 3 (MSI Modern 14, boAt Nirvana Luxe, LG 1.5T AC) |
| Resolved to a product (`visit.desidime.com` → merchant) | 28 |
| Already in the DB or rejected within 24h | 14 (8 LIVE dups, re-verified below; the rest in the 24h reject window) |
| Fresh | 14 |
| Stage-1 skips | 4 (Flipkart `price-drift` ×3, Dell sitewide offer with no ld+json) |
| PDP-verified (Amazon, logged-in Playwright tab) | 9 |
| Rejected after the PDP read | 8 |
| **Pushed LIVE** | **2** (ids 15321-15322) |
| Price-synced LIVE rows | 2 (#14390, #6879) |

## Pushed

| ID | Store | Product | ₹ | MRP |
|---|---|---|---|---|
| 15321 | Amazon | Spykar men's oversized shirt, navy blue, size M (B0FLQGVQ35) | 298 | nulled (listed 1,499 implies 80% off) |
| 15322 | Flipkart | realme Buds T110 AI ENC wireless earbuds, Punk Black (ACCH4HY6GRGJYUU8) | 1,099 | 2,999 (63%) |

Both returned `created:true` (`count:2`). The title ₹ and discount % were diffed against `price`/`mrp` before POST, and neither productId was in the DB beforehand. Amazon carries `tag=ashoksachdev-21` (DesiDime's `desidime01-21` stripped). Flipkart uses `/p/itm…?pid=…&affid=djhackraj` (their `salescueli` affid stripped). Images come from `m.media-amazon.com` and `rukmini1.flixcart.com`.

## Verify table

Amazon was read with a same-origin fetch of `/dp/ASIN?th=1&psc=1` in the logged-in tab, using `#corePriceDisplay .a-price-whole`, `.basisPrice`, `#availability` and add-to-cart. There was no captcha, so the mobile-UA fallback was not needed. Flipkart was read through stage-1 ld+json, or with an in-tab `/a/p/i?pid=` lookup to get the itm path and then ld+json.

| ID | Product | Card ₹ | Live ₹ | Result |
|---|---|---|---|---|
| B0FLQGVQ35 | Spykar oversized shirt (M) | 298 | 298, ATC | **pushed** |
| ACCH4HY6GRGJYUU8 | realme Buds T110 (Flipkart) | 1099 | 1099, InStock (ld+json) | **pushed** |
| B0D8KX39QT | Fire-Boltt Dominion | — | `#outOfStock`, no ATC | rejected: unavailable |
| B08XC1NP9D | Luminous 1202 Mini UPS | — | `#outOfStock`, no ATC | rejected: unavailable |
| B08T8189P9 | AGARO Verge | 1755 | 1899, no coupon | rejected: drift |
| B0CR36G3G5 | COSTAR | 2554 | 2753, no coupon | rejected: drift |
| B0FND92771 | Sujata heater | 1141 | 1196, no coupon | rejected: drift |
| B0G4K6Z85C | Techking | 2654 | 2789, no coupon | rejected: drift |
| B0B9H572LC | Insta360 X3 | 26384 | 27772 (the card was the ICICI card price) | rejected: drift |
| B0FLKF5V9Y | Acer 50" TV | 23249 | 27999 (the card was the HDFC CC/EMI price) | rejected: drift |
| TMRHESVHZGEFYFYU | Braun Series 3 (Flipkart) | 1561 | 2309 | rejected: drift (stage 1) |
| COMHGWQESQN4BAHV | HP Victus (Flipkart) | 78490 | 92990 | rejected: drift (stage 1) |
| RFRHK72VP4NKZWAC | Godrej 244L (Flipkart) | 21140 | 26890 | rejected: drift (stage 1) |

- **Rejects:** this tick stamped 8 in `data/dd-rejected.json` with `Date.now()`, and stage 1 stamped the 3 Flipkart drifts. The file now holds 764 entries.

## Duplicate re-verify (LIVE rows on the listing)

| ID | Row | DB ₹ | Live ₹ | Action |
|---|---|---|---|---|
| B0FDKJB556 | #14390 HP Campus Core 16 backpack | 505 | **416** | **price-synced**: price, title and description (MRP stays null: ₹3,099 implies 87% off) |
| B0GMQLQGFW | #6879 LG24U411A 24" monitor | 7499 | **6799** | **price-synced**: price, discountPct 60 against MRP 17,000, title and description |
| B0DCG4T5Q6 | #5198 Pureit Wave Prime | 6799 | 6799 (card 5997 was a bank price) | ok |
| — | #15291 Billebon | 199 | 199 | ok |
| — | #1450 Optimist AC | 38990 | 38990 (card 33740 was HDFC) | ok |
| — | #10721 iQOO Z11 | 39999 | 39999 (card 30635) | ok |
| — | #13548 Ai+ Nova 2 Ultra (Flipkart, in-tab ld+json) | 21999 | 21999, InStock (card 16999) | ok |
| B0FGPTK1N8 | #13210 Acer backpack | — | still no price, no ATC | stays EXPIRED |

All slugs were unchanged: the syncs used `prisma.deal.update`, not the bulk upsert.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 4 slugs (2 pushed, 2 synced) → **HTTP 200 for 7 URLs**.
- **Prod check:** the new realme page returns 200, and prod `/api/deals` lists #15322 first.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,785 (+2), equal to the prod `/api/deals` total of 14,785 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15322 |
| Broadcast cursor | `lastId` 15320 against max 15322: the external cron has 2 to drain, not rot |
| Posts: total / coverless / missing SEO fields | 441 / 0 / 0 |
| Posts per IST day | 10-21: 3 · 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 3 |
| Prod endpoints | `/` 0.40s, `/offers` 0.18s, `/blog` 0.93s, `/sitemap.xml` 0.16s, `/feed.xml` 0.31s, `/api/deals` 0.19s, all 200 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. 10-28 has 3 posts, which meets the daily rule. Yield was low because 6 of the 9 Amazon cards were bank-card or coupon prices that did not hold on the PDP.
