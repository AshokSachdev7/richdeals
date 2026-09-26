# TELEGRAM-DEAL-MONITOR tick 2026-09-26ad (14:04 IST)

**1 deal pushed LIVE: Story@Home 20-pack microfibre cloth roll, id 11413. `/admin/deals/bulk` returned count 1. IndexNow returned HTTP 200 for 4 URLs (1 slug + 3 hub paths).**

## Sweep
- One `browser_evaluate` read the sidebar for all 13 groups and found 3 new links.
- **Already seen:** iPhone B0HJ9W3ZND, Garnier B0dZWkCIM, Rogerkart cashew `fkrt.co/9OCMdL` (also grocery), Hidden Loot, INDIAN CHEAP DEALS and Loot Deals.
- **Not deals:** CoolzTricks (Visa/Poshvine gift-card promo), RichDeals (our own channel), IFS Tips (a CRED post) and Deal Dibba (spam).

## New links
| Group | Link | Resolved to | Verdict |
|---|---|---|---|
| SB Loots | `amazn.lt/HBrkSaQj` | B0FDFVQLRD, Story@Home microfibre cloth ×20 | **Pushed** |
| Dealzone | `link.amazon/B07ft6Sfr` | B0G8JVRTGK, Samsung 215 L Hydrangea Plum | Rejected (see below) |
| Dealdost | `amzn.to/4ybXNW1` | B0G8JVRTGK, the same fridge | Rejected |

**Samsung fridge:** the page shows ₹20,890 with an M.R.P. of ₹26,999, plus a ₹750 clip coupon. The channel's ₹18,390 only exists after that coupon and a ₹1,750 SBI EMI offer. It was rejected under the clip-coupon rule, the same rule used on IFS.

## Verification: Story@Home cloth pack
- **Price:** read from `#centerCol` in the logged-in tab. ₹215 against an M.R.P. of ₹699 (69% off), the same as the channel.
- **Coupon and stock:** no coupon, no "only N left".
- **Image:** `m.media-amazon.com/images/I/810nYdUWiJL._SL1500_.jpg`.
- **Duplicate check:** the ASIN was not already in the DB.
- **Affiliate check:** `/out/11413` returns 302 to `amazon.in/dp/B0FDFVQLRD?tag=ashoksachdev-21`.
- **Files:** the script is `apps/api/scripts/push-tg-0926ad.mjs`. All 3 new links were added to `data/tg-multi-seen.json`, now 2,072 entries.

## Freshness
- **IndexNow:** HTTP 200.
- **Sitemap:** 10,384 `<loc>`. It is ISR with a 1800 s window.
- **llms.txt:** 200.

## CEO audit
- **Prod:** all 7 endpoints return 200. The slowest was `/sitemap.xml` at 1.06 s, a cold ISR regeneration.
- **API vs DB:** `/api/deals` is headed by id 11413 with a total of 11,066, matching the DB.
- **Deals:** 11,066 live, 0 pending review, 0 with a null price, 0 with a null image.
- **Posts:** 333, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/2. No day is 0.
- **Broadcast cursor:** `lastId` is 11413, equal to the DB max.
- **Git:** 0 unpushed commits.

Verdict: green.
