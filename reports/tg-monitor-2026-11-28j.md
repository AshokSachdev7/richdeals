# TELEGRAM-DEAL-MONITOR tick: 2026-11-28j (about 09:50 IST)

**Result:** 0 new deals went LIVE. **1 LIVE duplicate was repriced:** #954 Park Avenue grooming kit went from ₹397 to ₹356, with a PriceHistory row. 2 candidates were rejected after the PDP check. IndexNow returned **HTTP 200** for 4 URLs (1 slug plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0). Since 11-28i, only SB Loots (last post 09:38) and CoolzTricks (08:44) have posted.
- **SB Loots history:** the open chat's `.MessageList` was scrolled to the bottom to load posts from 08:20 onward. The `t.me/s` fallback was not needed.
- **Shortlinks:** `amazn.lt` links were resolved with `curl -L` before dedup.

| Group | Post | Result |
|---|---|---|
| SB Loots 08:20 | Dabur shower gel B0CJLY8XS3 | Seen |
| SB Loots 08:22 | Parachute Advansed hair mask B0D9YMT9KM (coupon post) | Rejected: PDP has no add-to-cart and empty availability |
| SB Loots 08:31 | Arrow blazer | Seen |
| SB Loots 08:46 | Unibic cookies | Rejected: grocery/FMCG |
| SB Loots 09:01 | DiSano peanut butter | Rejected: grocery/FMCG |
| SB Loots 09:17, 09:36 | Park Avenue 7-in-1 kit @356, B07YY7YPLT | Already LIVE as #954 at ₹397 → **repriced** |
| SB Loots 09:38 | `amazn.lt/Xpxr5BL1` → B0G4N8ZPZX | Seen |
| SB Loots (overnight) | Bellavita De-Tan soap ×3 @61, B0FSS7FJ5L | Rejected: PDP shows ₹299 (M.R.P. ₹349) |
| SB Loots (overnight) | Flipkart men's shirts / HDFC card offer | Category post / not a product |
| CoolzTricks 08:44 | Fort Collins jackets (separate women and men links) | Multi-product |
| Other 11 groups | Last post unchanged since 11-28i | — |

## Reprice

| id | Item | Old | New | MRP | Off | Check |
|---|---|---|---|---|---|---|
| 954 | Park Avenue Good Morning Grooming Collection 7-in-1 kit | ₹397 | ₹356 | ₹849 | 58% | `.a-price-whole` ₹356, in stock, add-to-cart present |

The update went through `prisma.deal.update` (price, discountPct, title, description, howTo) plus a `PriceHistory` row (the deal now has 2). The ₹ guard passed: the only ₹ figures left in the copy are 356 and 849. The prod page returns 200.

## Freshness

- **IndexNow:** `indexnow-ping.mjs park-avenue-good-morning-grooming-collection-y7yplt` returned **HTTP 200** for 4 URLs.
- **Bulk push:** none (0 new deals).
- **Sitemap and llms.txt:** no change needed.
- **Seen list:** B0D9YMT9KM, B0FSS7FJ5L and B07YY7YPLT were added (5,877 entries).

## CEO audit (about 09:50 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.23s, `/offers` 0.07s, `/blog` 0.49s, `/sitemap.xml` 0.07s, `/feed.xml` 0.09s, `/api/deals` 0.08s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,043 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17649 / 17649 | OK |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups (joining replacement channels is an owner action) | Carried |
