# TELEGRAM-DEAL-MONITOR tick: 2026-09-29y (22:33 IST)

## Scan
One `browser_evaluate` over the sidebar (Playwright profile richDeals) covered all 13 groups in `data/tg-groups.json`.

| Group | Latest post | Decision |
|---|---|---|
| CoolzTricks | Tokyo Talkies women's clothing, up to 93% off | skip: category post |
| SB Loots | realme 16x 5G at ₹24,999 with a coupon (amazn.lt → B0HD1C11G6) | reject: PDP shows "Currently unavailable", no add-to-cart, no price |
| Dealzone | "199", link.amazon → B0DS5Q7DBS | dup of live #11443 (Milton Evoke casserole); PDP re-read gives ₹199 (M.R.P. 485), in stock, same as DB, no update |
| Dealdost | Flipkart BBD TV pass | skip: pass/promo |
| ONLINE SHOPPING DEALS | Mancode lotion B0BWDN8GTL | already seen |
| Rogerkart | French Connection watch (Xyvv4Bt) | already seen |
| IFS Tips | ConfirmTkt free cash | skip: app promo |
| Hidden Loot | Supercoins challenge | skip: promo |
| INDIAN CHEAP DEALS | Ladies handbag (B05yvriRF) | already seen |
| Loot Deals 24x7 | Syska power bank (l5KOxl) | already seen |
| OMG LOOTDEALS | "Video dekho paisa kamao" | skip: not a deal |
| NonStopDeals, Deal Dibba | nothing in the visible sidebar | no new post |

`tg-multi-seen.json` gained 4 keys (now 2,334).

## Push
**0 new.** No bulk push and no IndexNow ping (nothing to ping).

## CEO audit (DB)
| Check | Result |
|---|---|
| Prod endpoints | 7/7 return 200 (/ 0.21 s · /offers 0.10 · /blog 0.47 · /sitemap.xml 0.10 · /feed.xml 0.10 · /llms.txt 0.48 · /api/deals 0.10) |
| Live deals | 11,563 = API total (max id 11911) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 346; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 3 |
| Broadcast cursor | 11911 = DB max |
| Unpushed commits | 0 before this report |

Result: **0 new, 0 rot.**
