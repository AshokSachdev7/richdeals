# TELEGRAM tick: 2026-09-28bb (18:04 IST)

## Scan
- Read the sidebar of all 13 source groups with one `browser_evaluate`.
- Resolved 4 new shortlinks.
- **1 pushed.** The rest were skipped:

| Group | Post | Outcome |
|---|---|---|
| SB Loots | BP monitor @599 + ₹350 coupon: amazn.lt/KwP7I7mi → B0GQHD4JKK | **PUSHED** |
| CoolzTricks | "Apply coupon": amzn.to/4rwLAbX → B0HK8Q36RC, Vaku Luxos smartwatch ₹999 / ₹4,999 | Skipped: unproven no-name listing with 1 rating and an inflated M.R.P. |
| Dealdost | Bellavita soap ×3 @149: amzn.to/46Jz8w6 → B0DVGS1F9Y | Already live at ₹149 (id 10786), no change |
| Dealzone | "113": link.amazon/B0ceB57RF → B0F2JHSFRH, Mamaearth Vit C sunscreen | Skipped: the product page shows ₹203 / ₹225, only 10% off, so the ₹113 cannot be reproduced |
| Rogerkart / ONLINE SHOPPING DEALS / INDIAN CHEAP DEALS / Loot Deals 24x7 | AT trolley, AT Quad backpack, handbag, Syska | Already handled |
| IFS Tips / iPhone rates / Deal Dibba / Hidden Loot / OMG | ConfirmTkt, BBD pass, Supercoins | Not deals |

## Verification (logged-in Amazon tab, `#centerCol`)
- B0GQHD4JKK, Dr Vaku talking BP monitor:
  - ₹949 / M.R.P. ₹2,999, −68%.
  - In stock, add-to-cart present, rated 4.1★ from 1,556 ratings.
- The channel's @599 is the price after the coupon (949 − 350). The deal is pushed at the base price of ₹949, and the tip mentions the coupon.

## Push
- Sent to `localhost:4000/admin/deals/bulk` and got **count 1, created:true**, live, with `?tag=ashoksachdev-21`.
- Prod slug `/dr-vaku-automatic-talking-bp-monitor-b0gqhd4jkk` returns 200.
- `tg-multi-seen.json` now has 2,268 entries; all 4 ASINs were added.

## Freshness
- IndexNow returned **HTTP 200 for 4 URLs** (1 slug + 3).
- The sitemap (ISR) and llms.txt (dynamic) pick up the deal automatically.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,395 (+1) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 342 |
| Coverless / seoless | 0 / 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/3 (today 3, cap 4) |
| Broadcast cursor | 11741 vs DB max 11742. The gap is this deal; it self-heals. |
| Prod 7 endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: 0 rot.
