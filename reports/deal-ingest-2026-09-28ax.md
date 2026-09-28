# IFS ingest tick 2026-09-28ax (16:40 IST)

## Discovery
- 4 listing pages, all 200, fetched ≥2.5 s apart. Found 103 slugs, 43 of them new.
- Dropped 4 before resolving: a sale-hub "upto N% off" page, a flat-20 Crocs coupon, a 2024 calendar, and one repeat.
- Resolved the base64 `?rto=` Buy Now links for the remaining 39: 19 Amazon ASINs and 20 Flipkart pids.
- Checked all 39 IDs against the DB with Prisma. All 39 are new.

## Verification (every product on its product page)
- **Amazon**: checked in the logged-in tab, reading `#centerCol` (price, M.R.P., `#availability`, add-to-cart).
  - 17 of 19 pass.
  - Rejected: Home Centre containers (only 5% off) and USI boxing gloves (1.3★).
- **Flipkart**: checked with a same-origin fetch, reading ld+json `offers.price` (InStock). The M.R.P. comes from the pid-matched `"ppd"` block, and the path from the pid-anchored `/p/itm` link, because the page also carries data for similar products.
  - 18 of 20 pass.
  - Rejected: both Nike Jordan Court Connect pairs. They sell at ₹7,095, which equals the M.R.P., so there is no discount.
  - Fixed during verification:
    - Fire-Boltt, Mark Wood and Wakeup India had pointed at the wrong itm path. All three now use the canonical path (Wakeup is the 4-inch single).
    - LRWOODEN has no ppd block, so its M.R.P. of ₹752 was taken from the page text.

## Push
- Sent to `localhost:4000/admin/deals/bulk` and got **count 35, created 35**, all status live.
  - Amazon: 17, with `?tag=ashoksachdev-21`.
  - Flipkart: 18, with `/p/itm…?pid=…&affid=djhackraj`.
- Every discount was re-checked against price and M.R.P. to within ±1% before the push.
- Images come only from the marketplace CDNs: `m.media-amazon.com` for Amazon and `rukmini1.flixcart.com` for Flipkart.
- Notable deals:
  - Fire-Boltt Hunter smartwatch: ₹1,299, −91%
  - EuroQon foldable desk: ₹996, −80%
  - Longway BLDC fan: ₹3,999
  - Wakeup India mattress: ₹3,929
  - Zebronics Sound Feast 110: ₹1,299
  - Pepe Jeans: ₹1,350
- Prod spot-check: the Fire-Boltt and Pepe Jeans slugs both return 200.

## Freshness
- IndexNow returned **HTTP 200 for 38 URLs** (35 slugs + 3).
- The sitemap (ISR, 30 min) and llms.txt (dynamic) pick up the new deals automatically.
- The IFS seen list now holds 1,879 entries.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,393 (+35) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3 (today 3, cap 4) |
| Broadcast cursor | 11705 vs DB max 11740. The gap is this batch of 35; it self-heals. |
| Prod 7 endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: 0 rot.
