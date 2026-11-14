# TELEGRAM-DEAL-MONITOR tick — 2026-11-14b

Read the newest post of each group in `data/tg-groups.json` with one `browser_evaluate` over the logged-in Telegram Web sidebar. The ONLINE SHOPPING DEALS sidebar text was cut off, so that chat was opened with a trusted click to read the full links. Kept only single-product links and deduped against `data/tg-multi-seen.json` and the live DB. Verified every candidate price on the Amazon PDP in the logged-in tab, reading `.a-price-whole`, the `#centerCol` M.R.P., `#availability` and add-to-cart.

**Result: 7 new deals pushed (count:7, all created:true, all LIVE). One stale row was fixed: #1028 (Wild Stone face wash) went from ₹96 to ₹92. IndexNow returned HTTP 200 for 11 urls. Prod 7/7 returned 200 and every DB check is green.**

## Pushed

| ID | Deal | ASIN | Price | MRP | Off | Source group |
|---|---|---|---|---|---|---|
| #16500 | VAS Collections 280 GSM plush double blanket, Charcoal Black | B0HNSDJS4W | ₹2,199 | ₹2,999 | 27% | SB Loots |
| #16501 | RR Nuts Afghani Anjeer 1kg | B0HMHFZ2ZM | ₹399 | ₹999 | 60% | Dealdost |
| #16502 | ASICS men's sports shoes, Grey | B0DVGJD8VG | ₹3,000 | ₹5,999 | 50% | ONLINE SHOPPING DEALS |
| #16503 | Medallix Bento lunch box, Blue | B0G44C6C74 | ₹252 | ₹1,299 | 81% | ONLINE SHOPPING DEALS |
| #16504 | Aliensware insulated lunch bag | B0GSB1QTDN | ₹233 | ₹1,299 | 82% | ONLINE SHOPPING DEALS |
| #16505 | Wiki 33.5L backpack, Brown | B0DW47V9HM | ₹500 | ₹2,669 | 81% | ONLINE SHOPPING DEALS |
| #16506 | Shatras Panchgavya soap, pack of 3 | B0F2M184N3 | ₹151 | ₹999 | 85% | ONLINE SHOPPING DEALS |

All 7 use the affiliate URL `amazon.in/dp/<ASIN>?tag=ashoksachdev-21`, an `m.media-amazon.com` hiRes image and a rewritten blurb. The anjeer PDP's `a-text-price` showed ₹39.90, which is a per-100g rate. The real MRP of ₹999 came from the `#centerCol` M.R.P. line. The soap PDP showed "Only 1 left in stock", so re-check it.

## SEEN re-checks

| Row | Deal | Finding | Action |
|---|---|---|---|
| #1028 | Wild Stone Edge face wash B07KSPKVGL (Dealzone and CoolzTricks, both ₹92) | DB had ₹96. PDP shows ₹92, MRP ₹185, in stock. | Repriced to ₹92 (50% Off). Title and description fixed, slug kept, pinged. |
| #5035 | LG 8kg washer B0DPHTSTYJ (INDIAN CHEAP DEALS) | PDP ₹20,990, MRP ₹28,990, same as the DB | No change |

## Rejected

| Group | Item | Reason |
|---|---|---|
| Rogerkart | Myntra Libas "upto 87%" | Sale hub |
| NonStopDeals | Caprese "Surf All Pages" | Category page |
| Hidden Loot / IFS Tips | Swiggy Dineout | Not a product |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | Not rendered in the virtualized sidebar; read next tick |

The 7 new ASINs were appended to `data/tg-multi-seen.json`, which now has 5,136 entries.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 7 new slugs plus #1028 and returned **HTTP 200** for 11 urls (8 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. Deals are top-100 only by design.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,928 = 15,928 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 485, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,499 vs 16,506 | OK. The gap is this tick's 7 new rows, and the external broadcast cron picks them up. |
| Session crons | 9/9 (CronList) | OK |
| Unpushed commits | 0 before this report | OK |

Posts per day (IST): 11-05 3, 11-06 3, 11-07 3, 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, **11-14 1 so far**. The next CONTENT-SEO run (18:39 IST) must publish the 2nd post.

## Still open

- CONTENT-SEO: 11-14 IST has 1 post, and the rule is 2-3 per day. The 18:39 IST run must publish.
- Low stock to re-check: #16506 Shatras soap (1 left), plus the 11-14a list.
- The other items carried from 11-14a still apply: #14635 Mivi PDP, #3593 lapse, #11896 Flipkart drift, same-price paths that write no priceHistory row, and DO token rotation (owner action).
