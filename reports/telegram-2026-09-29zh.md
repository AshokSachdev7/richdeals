# TELEGRAM-DEAL-MONITOR tick: 2026-09-29zh (20:04 IST)

## Scan
One `browser_evaluate` read the Telegram sidebar (Playwright, richDeals profile). Deal Dibba and NonStopDeals were not in the rendered chat list.

| Group | Latest post | Outcome |
|---|---|---|
| SB Loots | Spacewood wardrobe @5371 (amzn.lt/n9bkVbfa) | rejected: "Pay With Axis Card" = card-only price |
| ONLINE SHOPPING DEALS | Presto! kitchen towel roll (link.amazon/B0dyVC21F → B0DKFT4FVB) | **accepted** |
| Dealzone | car visor organizer (link.amazon/B0cJUnqlA → B0F4KP9F4T) | **accepted** |
| Dealdost | IndusInd credit card | skip (card promo) |
| Hidden Loot | supercoins | skip |
| IndiaFreeStuff Tips | ConfirmTkt | skip |
| OMG LOOTDEALS | "video dekho paisa kamao" | skip |
| CoolzTricks | CELLO dinner set | seen (pushed last tick) |
| Rogerkart / INDIAN CHEAP DEALS / Loot Deals 24x7 | FC watch / Lavie handbag / Syska power bank | seen |

Neither ASIN was in the seen list or the DB.

## Verified (logged-in Amazon tab, #centerCol)
| Product | Price | M.R.P. | Off | Stock | Rating |
|---|---|---|---|---|---|
| Amazon Brand Presto! non-woven kitchen towel roll, 2 × 50 pulls | ₹179 | ₹599 | 70% | In stock, add-to-cart | 4.4★ (2,810) |
| Car visor organizer, PU leather, zipper | ₹234 (₹234.06, DB is Int) | ₹999 | 77% | In stock, add-to-cart | 3.8★ (550) |

## Push
- `/admin/deals/bulk` returned **count 2**, both `created:true`, status live.
- Affiliate: `amazon.in/dp/<ASIN>?tag=ashoksachdev-21`.
- Seen list: +5 (3 shortlink codes + 2 ASINs), now 2,346 entries.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 5 urls (2 slugs + 3) |
| Deal pages | both return 200 |
| sitemap.xml / llms.txt | 200 / 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,575 = API total (max id 11924) |
| Pending / null price / null image | 0 / 0 / 0 |
| Posts | 347; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 → 09-29: 4 each |
| Broadcast cursor | 11924 = DB max |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **2 live, IndexNow 200, 0 rot.**
