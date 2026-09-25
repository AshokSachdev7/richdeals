# TELEGRAM-DEAL-MONITOR tick: 2026-09-25as (15:05 IST)

**1 price-drop refresh: Solimo 2-pc steel cookware, ₹328 → ₹277 (id 4209). IndexNow returned 200.**

## Scan: one `browser_evaluate` over the sidebar, 13 groups
| Group | Post | Resolved | Outcome |
|---|---|---|---|
| Rogerkart Deals | Cetaphil Restoring Water Gel 48 g @ ₹611 | Myntra 38976654 | **Rejected.** The page reads ₹899 against ₹1,799, so ₹611 has drifted |
| SB Loots And Deals | "Loot 277" amazn.lt | B0BZWBFQR2 Solimo cookware | Already LIVE at ₹328. The PDP reads **₹277** against ₹1,999, In stock, sold by RetailEZ → **refresh** |
| CoolzTricks | GO DESi Besan Laddu 150 g @ ₹116 | B0FDB6YRGK | Already LIVE at ₹116, unchanged → skip |
| Dealdost | Face wash, ₹300 coupon, at ₹399 | B07K7CFTDJ | Already LIVE at ₹699. ₹399 is the price after the coupon, so it is unchanged → skip |
| Others | MacBook Neo, Puma, Swiggy/Instamart, t.me promos | — | Already seen, or not a single product |

All 4 shortlinks and their 4 product ids were added to `data/tg-multi-seen.json` (2006 entries).

## Push
`scripts/push-tg-0925as.mjs` → POST `/admin/deals/bulk` → **count 1**, `created:false` (upsert, slug pinned).
- The row was thin before: no M.R.P. and a 3-step howTo. It now has original copy, M.R.P. ₹1,999 (86% off), a 4-step howTo and a hiRes `_SL1500_` image.
- The DB re-read shows id 4209 LIVE at ₹277 / ₹1,999.

## Freshness
| Check | Result |
|---|---|
| IndexNow (1 slug + 3) | **HTTP 200**, 4 URLs |
| sitemap.xml | 200. 10201 `<loc>` (ISR 1800 s) |
| llms.txt | 200 (force-dynamic) |

## CEO audit (DB + prod; covers IFS tick 0925ar as well)
| Check | Result |
|---|---|
| LIVE deals | 10898 (up 14 from 10884). None pending, none with a null price or null image |
| Posts | 330. None missing a cover, none missing SEO fields |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **3**. No day is 0, none is over 4 |
| Broadcast cursor (file re-read) | 11237 against DB max 11245. The external cron is draining the new IFS ids (it was at 11232) |
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` | All 200, 0.25–2.3 s |
| sitemap.xml | 10201 `<loc>` |
| Unpushed commits | 0 before this commit |

**Verdict:** green.
