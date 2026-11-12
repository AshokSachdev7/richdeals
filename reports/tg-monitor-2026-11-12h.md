# TELEGRAM-DEAL-MONITOR tick — 2026-11-12h

The tick read the Telegram sidebar of the 13 groups in `data/tg-groups.json` with one `browser_evaluate` call in the Playwright richDeals profile. It extracted single-product deals, resolved shortlinks, and deduped them against `data/tg-multi-seen.json` and against productIds in the live DB. Every Amazon price was verified by an in-tab fetch in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, hiRes image keyed by colour). Text was rewritten, and images come from the marketplace CDN.

**Result: 3 pushed** (`/admin/deals/bulk` returned 201, `count:3`, all `created:true`, so no slug restore was needed).

## Funnel

| Step | Count |
|---|---|
| New single-product candidates, PDP-verified | 5 |
| Pushed | **3** |
| Fresh rejected | 1 |
| Dup of LIVE row, synced | 1 |
| Seen-file entries added | 10 (total 5,091) |

### Pushed

| ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|
| B0B869F992 | Davidoff Fine Aroma espresso capsules, 10 pods, intensity 7 | ₹495 | 989 | 50% |
| B0HGRK4Z4X | MollisHomes single bed comforter, 220 GSM, 150x220 cm | ₹404 | 1,799 | 78% |
| B07D5H1MCB | Milton Nutri insulated lunch box, 2 x 320 ml | ₹280 | 880 | 68% |

### Fresh rejects

| ASIN | Product | Channel ₹ | PDP ₹ | Reason |
|---|---|---|---|---|
| B08SPXBMPS | Wild Stone Beyond deodorant | 214 | 324 | drift |

## Dup LIVE rows: PDP re-verify

### Synced (1)

#3007 `just-herbs-luxe-illume-creme-concealer-b0gcdzpytg`: ₹350 → **₹249**, MRP 999, 75% off. The title carried no ₹ figure, so it is unchanged. 1 priceHistory row was written.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for 4 slugs (3 pushed + #3007) returned **HTTP 200** (7 URLs: 4 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.44s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.65s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.75s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,840 = 15,840 (+3 pushed) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,414 = 16,414 (lag 0) | OK |
| Crons | 9/9 vs roster (CONTENT-SEO now 7345e5c6, INDEXNOW now 11686422) | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-03 4, 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3.

## Still open

- The same-price confirm paths in the desidime, TG and IFS scripts still write no priceHistory row.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- The price-sync helper updates the ₹ figure but not "% Off/below/under" or "saves ₹X".
- Low-stock pushes are fragile (#16406). Re-check any "only N left" row on the next tick.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
