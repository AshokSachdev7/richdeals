# DESIDIME-INGEST · 2026-10-28f (10-28, evening IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Junk / grocery / other-store drops | 4 (Coocaa Instagram contest, Kook N Keech brand listing, Whisper/Stayfree category hub, Shopsy jacket) |
| Non-product drops (Flipkart `/item/p/product` Galaxy Watch8, no itm path) | 1 |
| Resolved to a product (`visit.desidime.com` → merchant) | 27 |
| Already in the DB or rejected within 24h | 18 (5 LIVE dups, re-verified below; the rest in the 24h reject window) |
| Fresh | 9 (7 Amazon, 2 Flipkart) |
| Stage-1 skip (Flipkart `price-drift` ×2) | 2 |
| PDP-verified (Amazon, logged-in Playwright tab) | 7 |
| Rejected after the PDP read | 1 |
| **Pushed LIVE** | **6** (ids 15301-15306) |
| Price-synced LIVE rows | 2 (#10273, #5198); 1 flipped to EXPIRED (#13210) |

## Pushed

| ID | Store | Product | ₹ | MRP |
|---|---|---|---|---|
| 15301 | Amazon | ASICS Patriot 13 men's running shoes (B0DV5HMPFK) | 2,474 | 5,499 (55%) |
| 15302 | Amazon | Woodland OGC 6479124 men's casual sneaker (B0G8FGYXN1) | 1,799 | 4,995 (64%) |
| 15303 | Amazon | Woodland 4092NW men's khaki sneaker (B0BR5MDL31) | 3,089 | 4,495 (31%) |
| 15304 | Amazon | Havells Turbo GS6110 10-in-1 grooming kit (B0DDSKBFSL) | 1,396 | 2,195 (36%) |
| 15305 | Amazon | boAt Stone Edge 45W Bluetooth speaker, Dune Beige (B0H9R3JTZ4) | 3,299 | 9,990 (67%) |
| 15306 | Amazon | MILTON Pacific 1 L fridge bottles, pack of 6 (B01BSY2ZTU) | 113 | 270 (58%) |

All 6 returned `created:true` (`count:6`). The title ₹ and discount % were diffed against `price`/`mrp` before POST. Amazon links carry `tag=ashoksachdev-21` (DesiDime's `desidime01-21` stripped). Images come from `m.media-amazon.com` (`#landingImage` hi-res).

## Verify table

Amazon was read with a same-origin fetch of `/dp/ASIN?th=1&psc=1` in the logged-in tab, using `#corePriceDisplay .a-price-whole`, `.basisPrice`, `#availability`, add-to-cart and a `#centerCol` savings-% cross-check. No captcha; the mobile-UA `/gp/aw/d/` page was used only to confirm the two no-price listings.

| ID | Product | Card ₹ | Live ₹ | Result |
|---|---|---|---|---|
| B0DV5HMPFK | ASICS Patriot 13 | 2474 | 2474, 1 left, ATC | **pushed** |
| B0G8FGYXN1 | Woodland OGC 6479124 | 1799 | 1799, ATC | **pushed** |
| B0BR5MDL31 | Woodland 4092NW | 3089 | 3089, 4 left, ATC | **pushed** |
| B0DDSKBFSL | Havells GS6110 | 1396 | 1396, in stock, ATC | **pushed** |
| B0H9R3JTZ4 | boAt Stone Edge | 3299 | 3299, in stock, ATC | **pushed** |
| B01BSY2ZTU | MILTON Pacific ×6 | 113 | 113, in stock, ATC | **pushed** |
| B0CZP7JBX2 | UGAOO push lawn mower | 1709 | no buy-box price; mobile page "Currently unavailable" | rejected: unavailable |
| CHYHZ4TJJTVGZKBK | Kaff KCF60 chimney (Flipkart) | 5938 | ld+json drift | rejected: drift (stage 1) |
| MOBHQCH6G5YNGNRG | Samsung Galaxy S25 12/256 (Flipkart) | 57949 | ld+json drift | rejected: drift (stage 1) |

- **Rejects:** all 3 are stamped in `data/dd-rejected.json` (UGAOO by this tick with `Date.now()`, 2 by stage 1). The file now holds 734 entries.

## Duplicate re-verify (LIVE rows on the listing)

| ID | Row | DB ₹ | Live ₹ | Action |
|---|---|---|---|---|
| B0D8WS7K3C | #10273 Ant Optical Mouse 03 | 287 | **218** | **price-synced**: price, discountPct 76; description rewritten with the new ₹ (the old "about a third" line was wrong) |
| B0DCG4T5Q6 | #5198 Pureit Wave Prime purifier | 6967 | **6799** | **price-synced**: price, discountPct 43, title ₹/% and description; description also corrected from RO+UV to RO+MF to match the PDP |
| B0FGPTK1N8 | #13210 Acer 15.6" laptop backpack | 1373 | no price, no ATC; mobile page "Currently unavailable" | **flipped to EXPIRED** (page stays live with the expired banner, never 404) |
| B0C4X6LS49 | #10375 Desidiya LED wall light | 169 | 169 | ok (MRP stays null: ₹1,350 implies 87% off) |
| B0DM1MTZ1X | #5206 GOBOULT X120 soundbar | 2013 | 2013 (card 1953 was a bank price) | ok |

All slugs were unchanged: the syncs used `prisma.deal.update`, not the bulk upsert.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 9 slugs (6 pushed, 3 synced/expired) → **HTTP 200 for 12 URLs**.
- **Prod check:** `/asics-patriot-13-mens-running-shoes-b0dv5hmpfk` returns 200, and prod `/api/deals` lists #15306 first.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,769 (+6 pushed, −1 expired), equal to the prod `/api/deals` total of 14,769 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15306 |
| Broadcast cursor | `lastId` 15300 against max 15306: the external cron has 6 to drain, not rot |
| Posts: total / coverless / missing SEO fields | 441 / 0 / 0 |
| Posts per IST day | 10-21: 3 · 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 3 |
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` all 200 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. 10-28 has 3 posts, which meets the daily rule.
