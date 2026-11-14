# TELEGRAM-DEAL-MONITOR tick — 2026-11-15a

Read the newest post of each group in `data/tg-groups.json` with one `browser_evaluate` over the logged-in Telegram Web sidebar. Kept only single-product links, deduped against `data/tg-multi-seen.json` and the live DB, and verified the candidate's price on the Amazon PDP in the logged-in tab. Run around 00:00 IST.

**Result: 1 new deal pushed LIVE (`count:1`, `created:true`), #16567 Gven men's cotton underwear, pack of 6. IndexNow HTTP 200 (4 urls). Prod 7/7 returned 200 and every DB check is green.**

## Pushed

| Row | Deal | PDP | Source |
|---|---|---|---|
| #16567 | Gven Men's Cotton Underwear, Pack of 6, B0D355X73X | ₹330, MRP ₹1,499 (78% Off), in stock, add-to-cart present | Rogerkart. The `/r/` link was read from the page HTML and their `rogerkart-21` tag was stripped. |

- Affiliate link: `amazon.in/dp/B0D355X73X?tag=ashoksachdev-21`.
- Image: `m.media-amazon.com` `#landingImage` hi-res.
- The copy is original and includes the per-piece maths (about ₹55 each).

## Rejected

| Group | Item | Reason |
|---|---|---|
| Dealzone, SB Loots | Symbol clothing, "upto 92%/90%" | Sale hub |
| CoolzTricks | Havells coupon, amzn.to/4f6mb3S | Resolves to a `/s?` search page (their tag `collab-amafhh-21`) |
| Dealdost | Anjeer B0HMHFZ2ZM | Already #16501 |
| ONLINE SHOPPING DEALS | Shatras soap B0F2M184N3 | Already #16506, and it is low-ticket FMCG |
| Hidden Loot / IFS Tips | Swiggy Dineout | Not a product |
| INDIAN CHEAP DEALS | LG sale (Oct 29) | Hub |
| NonStopDeals | Caprese "Surf All Pages" (Oct 5) | Category page |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | Not rendered in the virtualized sidebar; read next tick |

B0D355X73X was added to `data/tg-multi-seen.json`, which now has 5,139 entries.

## Freshness

- IndexNow: `indexnow-ping.mjs gven-mens-cotton-underwear-pack-of-6-b0d355x73x` returned **HTTP 200** for 4 urls (the slug plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child is top-100 only by design, so the new row stays `noindex,follow` until it ranks into it.
- `llms.txt`: force-dynamic, so it already carries the row.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.23s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.60s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,989 = 15,989 (+1) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 486, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,559 vs 16,567 | Pending. The external broadcast run drains it and self-heals |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2. 11-15 IST is minutes old and has 0 posts so far. Its first CONTENT-SEO run is due now. OK.

The first audit query hit `P2037`, "remaining connection slots are reserved", because the managed PG slots were full. It worked on retry with `connection_limit=1`. The local API holds most of the roughly 22 slots, so audit scripts should keep using a single connection.

## Still open

- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Same-price confirm paths in the other ingests still write no priceHistory row.
- Low-stock rows to re-check: #16506 Shatras and Symbol shorts B0F79NPMPQ, plus the earlier carry-overs.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
