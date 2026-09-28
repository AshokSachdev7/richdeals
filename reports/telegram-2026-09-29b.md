# TELEGRAM-DEAL-MONITOR tick: 2026-09-29b (01:04 IST)

## Scan
- Read the 13 groups from `data/tg-groups.json` in one sidebar `browser_evaluate` (Playwright, richDeals profile).
- Also read the tail of the open chat, ONLINE SHOPPING DEALS.

| Group | Latest | Outcome |
|---|---|---|
| Rogerkart | Yale biometric lock ₹1,699 | Dup: B0FMRS5LTP is already LIVE from IFS 09-29a |
| Dealzone | Tommy Hilfiger backpack ₹1,099 | **Pushed** |
| SB Loots | Women's sweaters from ₹269 | Skipped: category/multi-product |
| CoolzTricks | Timex/Casio up to 65% | Skipped: category |
| Dealdost | Face wash ₹41 each, add 2 + coupon | Skipped: loot/multi-qty, and the link is already seen |
| ONLINE SHOPPING DEALS | ToyAffair Ludo ₹119, Crompton ladi ₹97 | Both links already seen |
| IFS Tips | ConfirmTkt cash | Skipped: not a product |
| Hidden Loot | Supercoins challenge | Skipped: not a product |
| INDIAN CHEAP DEALS | Ladies handbag ₹3,500 | Link already seen |
| Loot Deals 24x7 | Syska 10000 mAh ₹799 (Flipkart) | Link already seen |
| OMG LOOTDEALS | "Video dekho paisa kamao" | Skipped: junk |
| Dealdost / NonStopDeals / Deal Dibba | Nothing newer | — |

## Verify + push
- **B07N8HR66T**, Tommy Hilfiger Joshua 15-inch laptop backpack, 21 L, navy.
- Amazon `#centerCol` shows ₹1,099, M.R.P. ₹3,199 and 66% off. The card said ₹1,099, so it matches. In stock with a cart button, rating 4.3 (3,394), no coupon.
- The source tag `glitzdeal05-21` was stripped and replaced with `?tag=ashoksachdev-21`.
- The image is from m.media-amazon.com (51wRSWJOmhL).
- `/admin/deals/bulk` returned **count 1**, `created:true`. The prod page returns 200.
- Added the shortlink and the ASIN to tg-multi-seen, which now has 2,304 entries.

## Freshness
- IndexNow: **HTTP 200**, 4 urls (1 slug + 3).
- The sitemap uses ISR 1800 s, and llms.txt is dynamic, so both pick up the new deal on their own.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,482 (max id 11829) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 344; coverless 0, seo-less 0 |
| Posts today (IST) | 1 at 01:04 IST |
| Broadcast cursor | 11823 vs max 11829. It is draining and self-heals. |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **1 pushed, IndexNow 200, 0 rot.**
