# TELEGRAM-DEAL-MONITOR tick: 2026-09-29m (12:04 IST)

## Sidebar scan (one evaluate over all groups)
| Post | Resolved | Result |
|---|---|---|
| SB Loots: Zebronics 4K projector, M.R.P. 14999 | `amazn.lt` → B0FSCSQN4D | **NEW, pushed** |
| Online Shopping Deals: Mancode body lotion ₹161 | `link.amazon` → B0BWDN8GTL | **NEW, pushed** |
| Dealzone: Clinic Plus 355 ml at 196 | B0FXSS3MPV | rejected: PDP shows ₹365, a price drift of 169 |
| CoolzTricks: "31" | B0D54BS4HP (AmazonBasics ink) | rejected: no price, no add-to-cart |
| Nike / Wonderchef / Lavie / Syska / FC watch | — | already handled last tick |

Everything else was a loot, pass, supercoins or app post, or non-deal chatter, so it was skipped.

## Verification (Amazon PDP, #centerCol)
| ASIN | Price / M.R.P. | Off | Stock | Rating |
|---|---|---|---|---|
| B0FSCSQN4D Zebronics projector | 5499 / 14999 | 63% | in stock + cart | 3.9 (545) |
| B0BWDN8GTL Mancode lotion | 161 / 349 | 54% | in stock + cart | 4.0 (33) |

DB dedup by productId: 0 hits.

## Push
- `/admin/deals/bulk` returned **count 2**, both `created:true`, status live, `?tag=ashoksachdev-21`.
- Both pages return 200 on prod. All 4 ASINs were added to `tg-multi-seen.json`.

## Freshness
- IndexNow: **HTTP 200**, 5 urls (2 slugs + 3). sitemap and llms.txt return 200.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live | 11,517 = API total (max 11864) |
| Pending / null price / null image | 0 / 0 / 0 |
| Posts | 345; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 2 |
| Broadcast cursor | 11862 vs max 11864. The gap is this batch waiting for the external cron (self-heals). |
| Prod endpoints | 7/7 return 200 |
| Unpushed | 0 before this report |

Result: **2 new, 2 rejected, IndexNow 200, 0 rot.**
