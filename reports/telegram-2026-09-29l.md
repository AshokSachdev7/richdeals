# TELEGRAM-DEAL-MONITOR tick: 2026-09-29l (11:05 IST)

## Sidebar scan (all groups in data/tg-groups.json, one evaluate)
| Post | Resolved | Result |
|---|---|---|
| Nike Air Max Alpha Trainer 5 ₹3747 | B0B6FTJ3DW | **NEW, pushed** |
| Wonderchef Milano 4pc cookware | B0DF23RXX2 | **NEW, pushed** |
| Lakme lip treatment @159 | B0GGB2RWF3 | repost of LIVE id 5268 at ₹163. PDP ₹159, so the price was fixed |
| Lavie handbag | B0G38DGNKM | repost of LIVE id 7110. PDP ₹3459 = DB, no change |
| Syska 10000mAh (FK) | PWBGGD4THDQZYAY6 | already seen, skip |
| French Connection watch | B0FHWS6LGZ | already live, skip |

Everything else in the sidebar was a loot, multi-product, pass or app post, so it was skipped.

## Verification (Amazon PDP, logged-in tab, #centerCol)
| ASIN | Price / M.R.P. | Off | Stock | Rating |
|---|---|---|---|---|
| B0B6FTJ3DW Nike | 3747 / 7495 | 50% | in stock + cart | 4.2 (1,546) |
| B0DF23RXX2 Wonderchef | 3009 / 3900 | 23% | in stock + cart | 3.8 (355) |
| B0GGB2RWF3 Lakme | 159 / 399 | 60% | in stock | 4.0 (23) |

## Push
- `/admin/deals/bulk` returned **count 2**, both `created:true`, status live. Amazon links use `?tag=ashoksachdev-21`.
- Lakme id 5268 was updated with `prisma.update`: price 163→159, discount 59→60%, and the ₹ figures in the title and description.
- Both new deal pages return 200 on prod.

## Freshness
- IndexNow: **HTTP 200**, 6 urls (3 slugs + 3).
- sitemap.xml returns 200 (ISR 1800 s). llms.txt returns 200 (force-dynamic).

## CEO audit (DB)
| Check | Result |
|---|---|
| Live | 11,515 = API total (max 11862) |
| Pending / null price / null image | 0 / 0 / 0 |
| Posts | 345; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 2 |
| Broadcast cursor | 11860 vs max 11862. The gap is this batch waiting for the external cron (self-heals). |
| Prod endpoints | 7/7 return 200 |
| Unpushed | 0 before this report |

Result: **2 new + 1 price fix, IndexNow 200, 0 rot.**
