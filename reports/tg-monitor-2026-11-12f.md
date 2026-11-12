# TELEGRAM-DEAL-MONITOR tick — 2026-11-12f

The Playwright MCP (richDeals profile) read the `.chat-list` sidebar for all 13 groups in `data/tg-groups.json` in one `browser_evaluate`. Single-product deals from all stores were extracted and shortlinks resolved. Dedup ran against `data/tg-multi-seen.json` and the live DB productId. Amazon prices were verified by in-tab fetch in the logged-in tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, coupon/promo blocks checked).

**Result: 0 pushed.** Both fresh candidates were "loot" channel prices the PDP does not honour, and there was no coupon to explain the gap.

## Funnel

| Step | Count |
|---|---|
| Groups scanned | 13 |
| Single-product candidates | 4 |
| Skipped (already seen and rejected) | 1 (Shopsy XWAGUVD6RMSZ7DD8 Moonatic clock) |
| Dup of LIVE row (productId) | 1 |
| Fresh | 2 |
| Fresh rejected (channel ≠ PDP, no coupon) | 2 |
| Pushed | **0** |

### Fresh rejects: channel price vs PDP

| ASIN | Product | Group | Channel ₹ | PDP ₹ |
|---|---|---|---|---|
| B0G6KD4TVY | Treo by Milton Glare & Snacks 4-pc gift set | CoolzTricks | 199 ("Loot") | 770, in stock, ATC, no coupon |
| B0FFN3J26J | Milton Marvel Power Bite tiffin, 2 × 320 ml | CoolzTricks | 180 | 329 / MRP 625, coupon and promo blocks empty |

Both ASINs were appended to the seen list (5,081 entries) so later ticks skip them.

## Dup LIVE rows: PDP re-verify

### Synced

None.

### Confirmed PDP = DB (1)

#16371 MuscleTrail Organic Ashwagandha, 60 veggie capsules: ₹399, still LIVE. A priceHistory row was written, so `priceValidUntil` now runs to 11-26.

### Delisted

None.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for the 1 touched slug returned **HTTP 200** (4 URLs: 1 slug + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.76s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.10s) |
| /api/deals | 200 (0.09s) |
| /llms.txt | 200 (0.53s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,826 = 15,826 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,398 = 16,398 (lag 0) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row, so most LIVE Offers lack `priceValidUntil`. This tick handled it by hand for #16371.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
