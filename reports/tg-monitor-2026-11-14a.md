# TELEGRAM-DEAL-MONITOR tick — 2026-11-14a

Read the newest post of each group in `data/tg-groups.json` with one `browser_evaluate` over the logged-in Telegram Web sidebar. Kept only single-product links and deduped against `data/tg-multi-seen.json` and the live DB. Verified every candidate price on the Amazon PDP in the logged-in tab. Run at about 12:03–12:10 IST. (The earlier 11-14a attempt was interrupted before it wrote a file, so this run takes the `a` suffix.)

**Result: 0 new deals pushed. One stale row was fixed: #16496 (Cult yoga mat) had ₹217 in the DB, but the PDP shows ₹398, so it was repriced and pinged to IndexNow (HTTP 200). Prod 7/7 returned 200 and every DB check is green.**

## Pushed

None new.

## SEEN re-checks

| Row | Deal | Finding | Action |
|---|---|---|---|
| #16496 | Cult 4mm EVA anti-slip yoga mat B0FGWBK7RF (Blue) | DB had ₹217 (78% off). PDP shows ₹398, MRP ₹999, in stock, add-to-cart present. The channel said ₹210.01. | Repriced to ₹398 (60% Off). Title and description fixed, slug kept. IndexNow HTTP 200 (4 urls). |
| #5035 | LG 8kg washer B0DPHTSTYJ (INDIAN CHEAP DEALS) | PDP ₹20,990, MRP ₹28,990, in stock | No change |

## Rejected

| Group | Item | Reason |
|---|---|---|
| ONLINE SHOPPING DEALS | Gear Classic anti-theft laptop backpack B07G4D13LB, channel ₹459 | No buybox (unavailable), so the price cannot be verified |
| SB Loots | Dabur Gulabari shower gel 250 ml B0CJLY8XS3 (amazn.lt, source tag stripped) | Low-ticket FMCG. DB #1411 stays EXPIRED. |
| CoolzTricks | Recharge cashback | Junk |
| Dealzone | Solimo kitchenware "upto 82%" | Sale hub |
| Dealdost | ₹294 after a ₹13 coupon | Post-coupon loot price |
| Hidden Loot / IFS Tips | Swiggy Dineout | Not a product |
| Rogerkart | Myntra Libas | Sale hub |
| NonStopDeals | Caprese "Surf All Pages" | Category page |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | Not rendered in the virtualized sidebar; read next tick |

B07G4D13LB and B0CJLY8XS3 were added to `data/tg-multi-seen.json` (5,129 entries).

## Freshness

- IndexNow: `indexnow-ping.mjs cult-4mm-eva-anti-slip-yoga-mat-with-carry-strap-blue-b0fgwbk7rf` returned **HTTP 200** for 4 urls (the slug plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. #16496 is an existing slug, so nothing new is needed.
- `llms.txt`: force-dynamic, so it already carries the new price.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.69s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.58s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,918 = 15,918 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 484, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,496 = 16,496 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, **11-14 0 so far (FAIL)**. The 12:39 IST CONTENT-SEO run must publish.

## Still open

- CONTENT-SEO: 11-14 IST has 0 posts, and the 12:39 IST run must publish. A ready topic is `yoga-mat-thickness-4mm-vs-6mm-vs-8mm-eva-vs-tpe-vs-nbr-india`, which links to the yoga deal pages (including #16496, now at its verified ₹398), `/blog/best-yoga-mats-india-2026` and `/offers`.
- DEAL-INGEST 11-14 (90 stage-1 rows, card prices unverified) and DESIDIME 11-14 (6 new, 5 dup-syncs) are unfinished. The 12:53 and 12:43 IST crons redo them.
- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of LIVE deals with no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses TODAY (11-14). Re-verify it.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG, LONGWAY B0HC3G1FF5 (1 left), SilverArrow B0GD1K98VM (5 left).
- #7751 Nivia football is only 8% off; expire it if it has not dropped.
- Bank-offer rejects B08SW56CDQ (Sennheiser) and B0H9FK9XZZ (CG Iraya) are not in `dd-rejected.json`, so they come back as candidates on every sweep.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
