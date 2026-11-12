# DESIDIME-INGEST tick — 2026-11-12f

Stage 1 `apps/api/scripts/ingest-desidime.mjs` read the `/new` and homepage cards only (no per-deal fetch), applied the JUNK/GROCERY filters and resolved each Buy Now link through `visit.desidime.com` to the real merchant URL. Every Amazon candidate was verified by in-tab fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart). Non-Amazon rows were verified via ld+json (`JSON.parse`, ±₹1, InStock). Dedup is by productId against the live DB. Text is rewritten and images come from the marketplace CDN.

**Result: 4 pushed** (`/admin/deals/bulk` returned 201, `count:4`, all `created:true`, so no slug restore was needed).

## Funnel

| Step | Count |
|---|---|
| Fresh (not in live DB) | 11 |
| Fresh rejected | 7 |
| Pushed | **4** |
| Dup of LIVE row, PDP re-verified | 10 (9 confirmed, 1 delisted) |

### Pushed

| ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|
| B0F5P3Q1TQ | Happy Cove kitchen storage container set, 15 pcs | ₹317 | 1,699 | 81% |
| B0CYLSFVCD | Pigeon Imperi cast iron 2-in-1 dosa tawa + grill, 31 cm | ₹1,031 | 3,395 | 70% |
| B0GPK846Y9 | Liora 2-ply facial tissue x6 (600 sheets) | ₹175 | 540 | 68% |
| B0CKTHFWLX | Party Propz LED crystal ball string lights, 3.5 m, 14 LEDs | ₹119 | 999 | 88% |

For B0F5P3Q1TQ (21.14) and B0GPK846Y9 (29.17), the PDP strike-through was a per-unit rate, so the card MRP was used. Every description closes with the "checked on the live product page" line.

### Fresh rejects

| ASIN | Product | Card ₹ | PDP ₹ | Reason |
|---|---|---|---|---|
| B0H4L5T84X | Samsung M47 | 23,749 | 24,999 | drift |
| B0F12YGB3D | Bosch fridge | 15,000 | 17,090 | drift |
| B095V6JMZX | Bosch sanding sheet | — | — | no price, no add-to-cart |
| B01FDEX7M0 | SMART PICKS 60 games | — | — | no price, no add-to-cart |
| B09NC7S62K | Vanguard mount | 1,604 | 5,216 | drift, 1 left |
| B0DVYXP2TX | BROLAVIYA ring light | 321 | 337 | drift (also rejected in IFS 12e) |
| B0CMHFYQBP | SKADIOO tap extension | 203 | 179 | drift |

## Dup LIVE rows: PDP re-verify

### Synced

None. Every dup PDP matched the DB price.

### Confirmed PDP = DB (9)

#16364 ₹649 · #16369 ₹1,199 · #16368 ₹300 · #16379 ₹3,199 · #9957 ₹580 · #16383 ₹299 · #16378 ₹1,209 · #16375 ₹1,14,990 · #16370 ₹349 (Myntra, ld+json InStock).

### Delisted (1)

#16406 `wesley-axe-anti-theft-15-6-laptop-backpack-camo-black-b0d5ycxwmq` → **EXPIRED**. It was pushed in IFS 12e at ₹640 with 1 left. The PDP now shows no price and no add-to-cart. The page stays live with the EXPIRED banner.

9 priceHistory rows were written (the 9 confirmed), so `priceValidUntil` now runs to 11-26 for each of them.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for 13 slugs (4 pushed + 9 confirmed) returned **HTTP 200** (16 URLs: 13 slugs + 3 hubs). #16406 was not pinged.
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.74s) |
| /sitemap.xml | 200 (0.14s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.77s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,837 = 15,837 (+4 pushed, −1 expired) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,407 vs 16,411 (lag 4 = this tick's push; the external broadcast cron picks them up) | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row. This tick handled it by hand for the rows it touched.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- The price-sync helper updates the ₹ figure but not "% Off/below/under" or "saves ₹X".
- **NEW:** #16406 went out of stock less than one tick after it was pushed (it had 1 left). Low-stock pushes are fragile: re-check any "only N left" row on the next tick, as was done here.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
