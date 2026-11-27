# TELEGRAM-DEAL-MONITOR tick: 2026-11-28e (about 04:43 IST)

**Result:** 0 new deals went LIVE. One candidate was already LIVE: LG #5035 was re-checked on its PDP, its price matches, and a PriceHistory row was written for it. IndexNow returned HTTP 200 for 4 URLs.

## Sources

- Playwright profile richDeals: a single evaluate call read the `web.telegram.org/a/` sidebar.
- 11 of the 13 groups in `data/tg-groups.json` were visible. Loot Deals 24x7 and Deal Dibba were not rendered, because the chat list is virtualized.

## Candidates

All shortlinks were resolved with curl before the dedup check against `data/tg-multi-seen.json`.

| ASIN | Group / link | Seen | PDP read (logged-in tab, `#corePriceDisplay .a-price-whole`) | Outcome |
|---|---|---|---|---|
| B0F9YZBG7T SASSAFRAS crop shirt + pants | ONLINE SHOPPING DEALS, `link.amazon/B02rIKNK6` | yes, not in DB | ₹509 (M.R.P. ₹2,999), in stock. The channel price was ₹338.04 | Price has moved, rejected |
| B0DPHTSTYJ LG 8 kg top-load washer | INDIAN CHEAP DEALS, `link.amazon/B08FsUNwo` | yes, LIVE #5035 at ₹21,990 | ₹21,990 (M.R.P. ₹28,990), `#availability` in stock, add-to-cart present | Price matches. PriceHistory row 18012 (₹21,990) written |
| Arrow blazer | Dealzone, `link.amazon/B0hv9Gwpk` | — | Resolves to a `/s?` search page | Skipped |

**Why the PriceHistory row matters for #5035:** the previous newest row was ₹20,996 on 11-23. With the new row, `priceValidUntil` moves forward to about 12-12. This follows the schema-audit 11-28 recommendation that every confirmed PDP read should write a PriceHistory row.

## Skipped posts

| Group | Post | Reason |
|---|---|---|
| CoolzTricks | Jack & Jones / Spykar | Multi-product |
| Rogerkart | Symbol / Lakme | Multi-product |
| Dealdost | Mufti | Sale hub |
| Hidden Loot | Swiggy | Coupon, not a product |
| IFS Tips & Tricks | Instamart | Instamart loot post |
| OMG LOOTDEALS | Credit card | Not a product |
| NonStopDeals | Caprese (`fkrt.it`) | Category page |
| SB Loots | Settings post | Not a deal |

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs: the #5035 slug, `/`, `/offers` and `/sitemap.xml`.
- **Bulk push:** none, because there were 0 new deals.
- **Sitemap:** the deals child is the top-100 pinned set, so nothing changes there.
- **llms.txt:** generated on each request, so nothing to do.

## CEO audit (04:45 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.20s, `/offers` 0.09s, `/blog` 0.56s, `/sitemap.xml` 0.07s, `/feed.xml` 0.08s, `/api/deals` 0.10s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,039 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17645 (101 minutes old) / 17645 | OK |
| Posts on 11-28 (IST) | 1 | CONTENT-SEO runs at 06:39 |
| 11-26 posts | 0 | Already flagged, not backfilled |
| Crons | 9 of 9 (SCHEMA-AUDIT tick, 04:40) | OK |
| Unpushed commits | 0 before this report | OK |
