# TELEGRAM-DEAL-MONITOR tick 2026-09-26ap (17:05 IST)

**2 deals pushed LIVE: `count: 2`, both created. IndexNow returned HTTP 200 for 5 URLs.**

## Sweep
- Scanned the 13 groups from `data/tg-groups.json` with one `browser_evaluate` over the sidebar.
- NonStopDeals was again not among the rendered rows (the list is virtualised).
- 2 new single-product links. Neither was in the seen list or the DB:
  - SB Loots → Amazon B0H2ZBPWYH
  - Dealdost → Flipkart PERH5FF6YZH4GZAE

## Accepted
| id | Deal | Verified | Affiliate |
|---|---|---|---|
| 11476 | Zebronics Keypad X3 wireless keyboard (2.4GHz + BT, 102 keys) | Amazon `#centerCol`: ₹899 vs M.R.P. ₹1,699 (47% off), in stock, 4.3★ from 350 reviews, no clip coupon | `/out/11476` 302 → `/dp/B0H2ZBPWYH?tag=ashoksachdev-21` |
| 11477 | Bellavita Night Fever EDP 100 ml | Flipkart ld+json: ₹299, InStock. Page M.R.P. ₹899 (67% off), 4.3★ from 11,251 ratings. "Buy at ₹284" is a bank offer and was not used | `/out/11477` 302 → `/p/itm41a6d1e00bf93?pid=PERH5FF6YZH4GZAE&affid=djhackraj` |

Push script: `apps/api/scripts/push-tg-0926ap.mjs`. The title, price, stock, image and URL gates all passed. Copy comes only from the PDP title, bullets and ratings.

## Rejected
| Group | Item | Reason |
|---|---|---|
| CoolzTricks | Projector roundup | Multi-product |
| Dealzone | "Photo" only | No link |
| IFS Tips | Swiggy Instamart Redmi search | Search promo, not a single product |
| Rogerkart | Cashew | Grocery |
| ONLINE SHOPPING DEALS, INDIAN CHEAP DEALS, Loot Deals 24x7 | Symbol jeans, handbag, Syska | Already live or already seen |
| Deal Dibba, Hidden Loot, OMG | Promos | Junk |

`data/tg-multi-seen.json` now has 2,084 entries.

## Freshness
- **IndexNow:** HTTP 200 for 5 URLs (2 slugs plus 3 hub paths).
- **Sitemap:** 10,448 `<loc>` (ISR `revalidate = 1800`). The batch lands within 30 min.
- **llms.txt:** 200 (`force-dynamic`, so it already carries the batch).
- **Prod deal page:** `/zebronics-keypad-x3-…-b0h2zbpwyh` returns 200.

## CEO audit
- **Prod:** all 7 endpoints return 200, all ≤0.49 s.
- **Deals:** 11,130 live (+2), 0 pending review, 0 with a null price, 0 with a null image. DB max is 11477.
- **Posts:** 334, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/3. No day is 0.
- **Broadcast cursor:** `lastId` is 11475 against a DB max of 11477. The 2 new deals are queued for the external cron, which self-heals.
- **Git:** 0 unpushed commits before this commit.

Verdict: green. 2 deals shipped.
