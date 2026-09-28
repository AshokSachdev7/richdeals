# TELEGRAM-DEAL-MONITOR tick — 2026-09-28ao (13:05 IST)

## Scan
- One `browser_evaluate` read the latest message of every group in the sidebar; all 13 source groups were present.
- Also opened the ONLINE SHOPPING DEALS chat (by clicking its row) and read its last 6 messages, because the sidebar preview cut off the link.
- Most groups had nothing usable:

| Group | Latest post | Why skipped |
|---|---|---|
| Rogerkart | VPN giveaway (pinned) | not a deal |
| SB Loots | Puma/Adidas "upto 75%" | category links |
| IFS Tips | ConfirmTkt cashback | not a product |
| Deal Dibba | t.me join spam | not a deal |
| Hidden Loot | supercoins | not a product |
| OMG | "video dekho" | not a deal |
| Dealdost | door stopper `fkrt.it` | resolves to a Flipkart collection page `/pr?sid=`, not a product |

## Candidates (shortlinks resolved)

| ASIN / pid | Product | Result |
|---|---|---|
| B0CGZZV1CY | Kids play tent (CoolzTricks) | already in seen list |
| B0G38DGNKM | Ladies handbag (Indian Cheap Deals) | already in seen list |
| PWBGGD4THDQZYAY6 | Syska 10000mAh power bank, Flipkart (Loot 24x7) | already in seen list |
| B0DSG45SQM, B09QRMRQQF, B0CYGLTZ6N | Nano tape, Scorpio fender light, American Tourister backpack | already live in DB (ids 11650, 11651, 10972) |
| B0H69DS3TW | Mother Touch clappers "₹29" | **rejected**: PDP shows ₹599 and there is no add-to-cart button (unavailable) |
| B08D3V6GJS | Dabur Ashwagandha 60 tabs | **pushed at ₹167**, MRP ₹240, 30% off. The channel said ₹135, but the PDP price wins; the Subscribe & Save price of ₹158.65 is mentioned in the tip. |
| B0H6JD6TWL | Zebronics K16 wired keyboard (Dealzone) | **pushed at ₹299**, MRP ₹799, 63% off, in stock, add-to-cart present |

- The keyboard title uses "Rupee Key" instead of "₹ Key", so the title's ₹ symbol cannot conflict with the price field.

## Push
- `/admin/deals/bulk` returned **count 2**, both `created:true`, status live.
- Affiliate link uses `?tag=ashoksachdev-21`; images are m.media-amazon.com `_SL1500_`.
- Both deal pages return 200 on prod.
- `tg-multi-seen.json` now has 2,250 entries (+6).

## Freshness
- IndexNow: **HTTP 200, 5 URLs** (2 slugs + 3).
- The sitemap updates on its own (ISR, every 30 min). llms.txt lists posts, stores and categories only, so it needs no change.

## CEO audit (DB)

| Check | Result |
|---|---|
| Live deals | 11,339 (+2) |
| Pending review | 0 |
| Null price / image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3 (today 3, cap 4) |
| Broadcast cursor | 11678 vs DB max 11686 (was 11663 last tick), so it is catching up |
| Prod endpoints (7) | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: 0 rot.
