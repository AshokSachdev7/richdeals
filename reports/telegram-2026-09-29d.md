# TELEGRAM-DEAL-MONITOR tick: 2026-09-29d (03:04 IST)

## Scan
- Read the sidebar once (25 rows). The deal groups come from `data/tg-groups.json`.
- Read the ONLINE SHOPPING DEALS chat tail for the full links.

| Group | Post | Resolved | Verdict |
|---|---|---|---|
| ONLINE SHOPPING DEALS | ToyAffair Ludo + Snakes & Ladders ₹119 | Amazon B0DQQ586YL | skip: in seen list (earlier tick rejected it, not in DB) |
| ONLINE SHOPPING DEALS | Crompton Galaxy Pixel ladi light ₹97 | Amazon B0DC6JVW32 | dup: already LIVE |
| INDIAN CHEAP DEALS | Handbag ₹3,500 | Amazon B0G38DGNKM (Lavie Luxe) | dup: already LIVE |
| Loot Deals 24x7 | Syska 10000 mAh power bank ₹799 | Flipkart PWBGGD4THDQZYAY6 | skip: in seen list, not in DB |
| Rogerkart Deals | Yale fingerprint wardrobe lock ₹1,699 | rogerkart shortlink did not resolve | dup: B0FMRS5LTP LIVE (IFS 0929a) |

- Skipped without resolving:
  - our own channel
  - Tommy backpack (already pushed)
  - Timex/Casio multi-product post
  - face-wash loot
  - ConfirmTkt tip
  - BBD passes
  - supercoins
  - non-deal chats

## Push
- **0 new.** No push, no IndexNow ping (nothing to ping).

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,485 = API total (max id 11832) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 344; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 1. Today is not 0. |
| Broadcast cursor | 11832 = DB max |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 new (all dup or seen), 0 rot.**
