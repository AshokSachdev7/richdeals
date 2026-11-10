# DesiDime ingest — 2026-11-10h (20:47 IST)

**Result: 2 pushed LIVE (#16264 VAS AC blanket ₹399, #16265 hoi polloi backpack ₹964), 1 dup LIVE row price-synced (#9746 Longway Aero fan ₹1,999→₹1,899), 7 rejected, IndexNow HTTP 200 (6 URLs).**

## Stage 1

- `ingest-desidime.mjs` swept `/new` and the homepage and found 35 cards. 10 were dropped by the junk and other filters.
- 6 cards were not single products: 3 Amazon `/s?` searches, 1 Flipkart search, 1 Ajio `/s/` listing and 1 carvaidya listing.
- 19 cards resolved to a product. 2 were already in the DB, 6 were rejected in the last 24h, and 11 were fresh.

## Pushed

| # | Item | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 16264 | VAS COLLECTIONS Cotton AC Blanket for Double Bed, 220x230 cm, Reversible (B0GN7Y5VPP) | Amazon | ₹399 | — | — |
| 16265 | hoi polloi RAYRAY 20L Laptop Backpack, fits up to 16-inch laptops (B0FGJS7BVH) | Amazon | ₹964 | — | — |

- Price was read from the Amazon PDP in the logged-in Playwright tab, from `.a-price-whole` under `#corePriceDisplay`. Both had `#availability` in stock and add-to-cart present.
- MRP is null for both. The PDP MRP selector read empty, so the MRP is unconfirmed and was not published.
- Images: `81pLLx85mnL` (Golden Leaf Garden variant) and `61HwBSV7q3L`. Each colorImages hiRes matches `#landingImage` `data-old-hires`.
- Affiliate link: `/dp/ASIN?tag=ashoksachdev-21`.
- Bulk API: HTTP 201, `count:2`, both `created:true`.

## Price sync (dup LIVE rows, Amazon PDP read)

| # | Item | DB before | Live now | MRP | Off |
|---|---|---|---|---|---|
| 9746 | Longway Aero 1200mm BLDC fan (B0HFNJHG1G) | ₹1,999 | ₹1,899 | ₹4,181 | 55% |
| 16232 | Storio (B08D8HDD3W) | ₹197 | ₹197 | — | unchanged |

- #9746 was updated with `prisma.update` and a priceHistory row was written. The bulk endpoint was not used, so the slug stays the same.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| ASIAN Adventure-52 shoes (B0FQ425ZZF) | ₹658 | ₹699 | drift |
| Galaxy curtains (B0B1PZJ81C) | ₹168 | ₹173 | drift |
| Karbonn Rebel PRO (B0HMRW4MT9) | ₹11,499 | ₹12,499 | drift |
| Marshall Woburn III (B09GYQVJ3F) | ₹43,749 | ₹46,999 | drift |
| Sony 55" BRAVIA 3II (B0GY3JRP3X) | ₹78,240 | ₹84,990 | drift |
| Toshiba 75Z570SP (B0H5R8H71S) | ₹80,055 | ₹88,827 | drift |
| Ferrero Rocher Golden Diya (B0HK362P73) | ₹749 | — | GROCERY/FMCG |

- Jiomart `568b04b08a16` (no ld+json) and Shopsy `997ac2828c32` (price drift) were already logged.
- `dd-rejected.json` went from 1,820 to 1,826 keys. One of the 7 was already a key, and its timestamp was refreshed.

## Freshness

- `indexnow-ping.mjs` was run with 3 slugs (#16264, #16265, #9746), and the script added the 3 hubs. Result: **HTTP 200 for 6 URLs**.
- sitemap.xml is ISR with a 1800s revalidate. llms.txt is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 (`/blog` 0.87s is the slowest) |
| DB LIVE vs API total | 15,697 = 15,697 |
| Max deal id vs broadcast cursor | 16,265 vs 16,263. The lag of 2 is this tick's rows, and the external broadcast cron drains it. |
| PENDING_REVIEW / null price / null image | 2 / 0 / 0. The 2 pending rows are the member queue (#16261, #16262). |
| Posts | 476. 0 coverless, 0 without SEO fields. |
| Posts per IST day | 11-10: 3, 11-09: 3, 11-07: 3, 11-06: 3, 11-05: 3, 11-04: 2, 11-03: 4 (11-08: 0, 11-02: 0, 11-01: 1 — missed) |
| Session crons | 9/9 |
| Unpushed commits | 0 (before this report) |

## Still open

- Member queue: #16261 and #16262 need the title, image and MRP fixed before a deal-review approval.
- The 11-11 IST run must publish 2-3 posts (next CONTENT-SEO at 00:39 IST).
- Same-price dup confirmations (#16232 this tick) write no PH row.
- TG groups Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba are not in the sidebar. The TG 11-04l backlog is still open.
- Price drift: #11896 Flipkart, 16 bare Flipkart links, 96 drift rows.
- The DO API token still needs rotating (owner action).
