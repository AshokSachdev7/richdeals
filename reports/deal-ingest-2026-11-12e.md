# DEAL-INGEST tick (indiafreestuff) — 2026-11-12e

Stage 1 `apps/api/scripts/ingest-ifs-proper.mjs` swept `/deals` and `/deals/superdeals` and resolved the base64 `?rto=` Buy Now ids to real store URLs. Every Amazon price was verified by in-tab fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, hiRes image keyed by `landingAsinColor`). Dedup is by productId against the live DB. Text is rewritten and images come from the marketplace CDN.

**Result: 6 pushed** (`/admin/deals/bulk` returned 201, `count:6`, all `created:true`, so no slug restore was needed).

## Funnel

| Step | Count |
|---|---|
| Cards discovered | 103 |
| Resolved to a store URL | 99 |
| Dropped (incl. GROCERY B00O7XQPN2 Quaker) | 4 |
| Dup of LIVE row (productId) | 66 |
| Fresh | 33 |
| Fresh rejected | 27 |
| Pushed | **6** |

### Pushed

| ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|
| B07L6YQYZB | Anchor by Panasonic Roma Plus bell-push switch x20 | ₹722 | 3,400 | 79% |
| B0GKVKTZC3 | Frozen lunch box with cutlery | ₹226 | 999 | 77% |
| B0H3VSZ2XV | Magic eraser sponge x4 | ₹179 | 400 | 55% |
| B0HDTSW68V | Fastrack Revoltt XR1 Pro smartwatch | ₹2,040 | 3,499 | 42% |
| B0D5YCXWMQ | Wesley Axe backpack | ₹640 | 2,699 | 76% |
| B0GFD87CZF | JENSONS bowls x5 | ₹299 | 995 | 70% |

For B07L6YQYZB (36.1) and B0GFD87CZF (59.8), the PDP strike-through was a per-unit rate, so the card MRP was used. B0GKVKTZC3 showed ₹227 on the card and ₹226 on the PDP, and the PDP price was pushed. B0D5YCXWMQ had 1 left in stock.

### Fresh rejects

| ASIN | Product | Card ₹ | PDP ₹ | Reason |
|---|---|---|---|---|
| B0B6J7NV5N | Milton | 2,464 | 2,464 | matched, but rejected with the drifting Milton block |
| B0D73QPXBP | Milton | 30 | — | Min Buy 2 |
| B0GMFR8BD5 | Milton | 999 | 2,169 | drift (block) |
| B08HQCWYR4 | Milton Pro Cook Tope | 499 | 1,002 | drift (block) |
| B0HHMLJMW9 | Milton | — | — | no price (block) |
| B0DYYCH8HX | Chipmunks | — | — | Min Buy 2 |
| B0DVYXP2TX | — | 320 | 337 | drift |
| B0GWF65QCW | NACIA rug | 15 | 3,399 | card price is from another size variant |
| B015D1FO7O, B0DHZFDGWF, B08B4KRPPP, B0DLGJ826D, B0D71HVXHG, B0H9PF9X2C | — | — | — | no price or no add-to-cart |

Earlier rejects were re-checked, and all of them are still drifting (card ₹ → PDP ₹):

| ASIN | Product | Card ₹ | PDP ₹ |
|---|---|---|---|
| B0DTJ1S4C9 | FINGERS cable | 151 | 230 |
| B0C7MKRYGY | Larah dinner set | 3,866 | 6,244 |
| B0FQHZ6Y4Q | BBQ grill | 1,002 | 4,434 |
| B0CR7KY39D | BEDSPUN towels | 447 | 836 |
| B0F2J513N8 | John Players trunks | 255 | 399 |
| B0F8QYK8R2 | John Players bonded | 302 | 999 |
| B0G33XW8JF | Mrs Santa dress | 166 | 669 |
| B0H29Q8WPS | PEARLPET bottle | 130 | 238 |
| B0G3FY54LJ | Lunch box | 208 | 499 |
| B0042A9UXC | Energizer CR2032 x5 | 198 | 250 |
| B0FHKY29D7 | Madhabi flashcards | 93 | 272 |
| B0GFM1LKKT | STRIDERS scooter | 395 | 1,687 |

## Dup LIVE rows: PDP re-verify

### Synced (5)

| id | Product | DB ₹ | PDP ₹ | MRP | Off |
|---|---|---|---|---|---|
| #16381 | Sony WH-1000X | 49,787 | 54,990 | 69,990 | 21% |
| #4955 | AmazonBasics fan | 833 | 915 | 2,099 | 56% |
| #8762 | Pigeon pan | 770 | 759 | 3,795 | 80% |
| #11952 | Skybags | 1,399 | 999 | 1,900 | 47% |
| #11144 | Eveready refill | 113 | 100 | 160 | 38% |

The sync script swapped only the ₹ figure. That left stale copy that no longer matched the new numbers:
- "N% Off" in all 4 rows whose discount changed.
- "26% below … That saves ₹501" on #11952.
- "29% under" on #16381.

Two follow-up passes rewrote that copy, and both rows now read clean with no stale figure left. Title, description, Offer schema and visible copy agree again.

### Confirmed PDP = DB (9)

#16380 ₹21,299 · #16323 ₹4,799 · #16382 ₹178 · #16383 ₹299 · #16385 ₹940 · #16387 ₹215 · #16389 ₹10,299 · #16390 ₹9,999 · #16395 ₹6,999.

### Left alone

- #16388, #16391 and #2351 are already EXPIRED.
- #16349 requires Min Buy 2.

14 priceHistory rows were written (5 synced + 9 confirmed), so `priceValidUntil` now runs to 11-26 for each of them.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for 20 slugs (6 pushed + 5 synced + 9 confirmed) returned **HTTP 200** (23 URLs: 20 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.50s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.80s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.47s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,834 = 15,834 (+6 pushed) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,407 = 16,407 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row. This tick handled it by hand for the rows it touched.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- **NEW:** the price-sync helper updates the ₹ figure but not "% Off/below/under" or "saves ₹X". This tick fixed the copy by hand. The helper must recompute that copy itself, or every sync leaves the schema and the visible copy disagreeing.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
