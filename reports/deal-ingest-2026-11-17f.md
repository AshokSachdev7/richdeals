# DEAL-INGEST (indiafreestuff) tick — 2026-11-17f

Following the redirector-dead rule, the tick probed one IFS Buy Now id first. The probe returned a 302 to Amazon instead of the homepage, so the tick ran the full stage 1 sweep (`apps/api/scripts/ingest-ifs-proper.mjs`, `/deals` plus `/deals/superdeals`, base64 `?rto=` ids resolved). It then read every resolved candidate on the PDP in the logged-in Playwright Amazon tab (richDeals profile). Run at about 10:53–11:05 IST.

**Result: 1 new deal pushed LIVE (#16734). The IFS redirector has partly recovered: 7 of 93 cards resolved, all to Amazon, and the other 86 still go to the homepage. This ends the run of twelve dry IFS ticks. IndexNow returned HTTP 200 for 4 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards read (`/deals` + `/deals/superdeals`) | 93 |
| Buy Now resolved to the IFS homepage (dead) | 86 |
| Resolved to a store | 7 (all Amazon) |
| Dup of a LIVE row | 0 |
| Fresh candidates | 7 |

## Candidates

| Product | ASIN | Card | PDP | Action |
|---|---|---|---|---|
| Allen Solly pump sandals | B0DBLXD93R | ₹594 | No buy box | Rejected |
| Allen Solly heeled shoes | B0GY4RMZ3B | ₹600 | ₹2,851, 2 left | Rejected: drift |
| Allen Solly mid-calf boots | B0DR9BH4G3 | ₹703 | ₹2,633, 1 left | Rejected: drift |
| Havells Bianca+ 15 L geyser | B0FBLX3PXW | ₹10,308 | ₹12,008.70 | Rejected: drift |
| Havells HeatKing room heater | B0HL8WCDJM | ₹2,151 | ₹2,390 | Rejected: drift |
| Refurbished i5-2400 desktop | B0928XK39Z | ₹11,999 | ₹12,999 | Rejected: drift |
| Nice premium 400 ml glass water bottle | B09YH7CMQK | ₹97 / ₹538 | ₹97 / M.R.P. ₹538, in stock, add-to-cart present | Pushed LIVE as #16734 |

The Allen Solly and Havells blocks drift on every card, so each was rejected as a whole, in line with the IFS-card-prices-lie rule.

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:1`, `created:true` (HTTP 201), so no slug restore was needed. Slug: `nice-premium-400ml-glass-water-bottle-leakproof-b09yh7cmqk`.
- **Row:** LIVE, Amazon store, the `ashoksachdev-21` tag on `/dp/B09YH7CMQK`, image `m.media-amazon.com/images/I/61aoq0JZj4L._SL1100_.jpg`, one priceHistory row. 82% off is ≥80%, so the M.R.P. and discountPct were nulled. The rewritten description notes that the listing requires a minimum purchase of 2.
- **Source:** the Deal model has no `sourceUrl` column (bulk accepts the key and drops it), and `sourceSlug` was left null.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the new slug returned **HTTP 200 for 4 URLs** (1 slug plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **Page on prod:** the bottle page returned 200 (0.18s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.35s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.93s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.82s) |

## CEO audit

Run at 11:04 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,154 = 16,154 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,734 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,734 vs 16,734 | OK. The external broadcast cron has already picked up #16729–#16734. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 11:04 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). Keep sweeping every tick; if the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DEAL-INGEST run is at about 12:53 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
