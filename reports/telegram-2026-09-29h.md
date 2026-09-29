# TELEGRAM-DEAL-MONITOR tick: 2026-09-29h (07:03 IST)

## Scan
- Playwright profile richDeals, web.telegram.org/a/. One `browser_evaluate` over `.chat-list .ListItem.Chat` read the newest post of every group in `data/tg-groups.json`.
- Read the last 3 messages of the chat that was already open (ONLINE SHOPPING DEALS).

## Candidates
| Group | Post | Resolved | Verdict |
|---|---|---|---|
| Rogerkart Deals | Yale biometric wardrobe lock ₹1,699 | rogerkart `/r/` | seen |
| Dealzone | Tommy Hilfiger backpack ₹1,099 | B07N8HR66T | seen |
| INDIAN CHEAP DEALS | Ladies handbag ₹3,500 | B0G38DGNKM | seen |
| Loot Deals 24x7 | Syska 10000 mAh power bank ₹799 (Flipkart) | PWBGGD4THDQZYAY6 | seen |
| ONLINE SHOPPING DEALS | ToyAffair ludo ₹119 | B0DQQ586YL | seen |
| ONLINE SHOPPING DEALS | Crompton ladi lights ₹97 | B0DC6JVW32 | seen |
| CoolzTricks | Timex/Casio watches "upto 65%" | - | skip: category |
| Dealdost | face wash, add 2 + coupon | - | skip: multi-qty loot |
| IFS Tips, Hidden Loot, OMG, SB Loots | app cash / supercoins / promo | - | skip: not a product |

- Every new link was already in `data/tg-multi-seen.json` (2,307 entries). **0 new**, so nothing was pushed and no IndexNow ping was needed.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,486 = API total (max id 11833) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 345; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 2 |
| Broadcast cursor | 11833 = DB max (file re-read) |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 new (all dup/seen/category), 0 rot.**
