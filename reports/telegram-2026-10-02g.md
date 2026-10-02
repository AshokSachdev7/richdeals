# TELEGRAM-DEAL-MONITOR — 2026-10-02 (15:58 IST)

**Read 13 groups in one sidebar read. 4 new links: 0 pushed, 1 stale LIVE price fixed, 3 rejected. IndexNow HTTP 200 for 4 urls.**

## Fixed (dedup hit on a LIVE row, price had moved)

| id | Deal | Before | After |
|---|---|---|---|
| 2985 | Parachute Advansed protein shampoo 1.2 L (B0GQV895L5) | ₹499, no M.R.P., no discount | ₹549, M.R.P. ₹1,299, 58% off, plus a coupon note |

- **Source post:** CoolzTricks posted "@374, apply 32% coupon".
- **Product page:** shelf price ₹549, In stock, add-to-cart present, rated 4.2 (718 ratings). ₹549 less the 32% coupon is ₹373.32, so the channel price is the price after the coupon.
- **What we store:** the shelf price, ₹549. The coupon goes in `couponNote` and the description.
- **Live page:** returns 200, and was included in the IndexNow ping.

## Rejected

| Post | Reason |
|---|---|
| SB Loots "Myntra: Pack of 2 T-shirts ₹199" (`myntr.it/KMAuGqe`) | Resolves to a Myntra listing page (`/amul-comfy-lounge-tshirts?rf=Discount Range`), not a single product |
| Dealzone "Upto 80% off Reebok clothing" (2 `amzn.to` links) | Category posts |
| ONLINE SHOPPING DEALS: Mamaearth soap 4-pack | Low-ticket consumer staple |

All other sidebar rows were already handled in tick 10-02f, are stale, or are not deal posts (bot chats, coin promos). 4 keys were added to `tg-multi-seen.json` (now 2,527 entries).

## CEO audit (15:58 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,860 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 357; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 2 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,338 / 12,338. Caught up. |
| Unpushed commits | 0 before this report |

No rot found.
