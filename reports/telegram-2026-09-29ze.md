# TELEGRAM-DEAL-MONITOR tick: 2026-09-29ze (19:05 IST)

## Scan
One `browser_evaluate` read the sidebar of all 13 groups in `data/tg-groups.json` (Playwright, richDeals profile).

| Group | Latest post | Outcome |
|---|---|---|
| SB Loots | whey protein BOGO | skip (supplement/loot) |
| Dealdost | BBD passes | skip |
| Hidden Loot | supercoins | skip |
| IndiaFreeStuff Tips | ConfirmTkt | skip |
| OMG LOOTDEALS | "video dekho paisa kamao" | skip |
| ONLINE SHOPPING DEALS | Mancode lotion B0BWDN8GTL | seen |
| INDIAN CHEAP DEALS | Lavie handbag B0G38DGNKM | seen; DB #7110 re-read on PDP: ₹3,459 = DB, no change |
| Loot Deals 24x7 | Syska power bank PWBGGD4THDQZYAY6 | seen |
| Rogerkart | FC watch B0FHWS6LGZ | seen |
| CoolzTricks | CELLO dinner set (amzn.to/4hrLGNu → B07F3DCST3) | **accepted** |
| Dealzone | chef knife (link.amazon/B02WbZvvJ → B0G58PPXR8) | rejected: 1 rating; ₹239 channel price was post-coupon (PDP ₹299 + 20% clip) |

## Verified (logged-in Amazon tab, #centerCol)
- CELLO Tropical Lagoon Dazzle opalware dinner set, 37 pcs: **₹1,444**, M.R.P. ₹3,649 (60% off), In stock, add-to-cart present, 4.2★ from 17,186 ratings.

## Push
- `/admin/deals/bulk` returned **count 1**, `created:true`, status live.
- Affiliate: `amazon.in/dp/B07F3DCST3?tag=ashoksachdev-21`.
- Seen list: +4 (both shortlink codes + both ASINs), now 2,341 entries.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 4 urls (1 slug + 3) |
| Deal page | `/cello-tropical-lagoon-dazzle-opalware-dinner-set-37-pieces-b07f3dcst3` returns 200 |
| sitemap.xml / llms.txt | 200 / 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,573 = API total (max id 11922) |
| Pending / null price / null image | 0 / 0 / 0 |
| Posts | 347; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 → 09-29: 4 each |
| Broadcast cursor | 11921 vs max 11922: this deal is waiting for the external cron (self-heals) |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **1 live, IndexNow 200, 0 rot.**
