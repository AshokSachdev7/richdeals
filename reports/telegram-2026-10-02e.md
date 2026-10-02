# TELEGRAM-DEAL-MONITOR — 2026-10-02 (13:58 IST)

**Sidebar read for all groups → 5 new links → 0 new deals pushed, 1 stale LIVE row fixed (id 6153). IndexNow returned HTTP 200 for 4 urls.**

## Fix: id 6153 (Parachute Advansed Amla hair oil, 500 ml)

A CoolzTricks repost ("@98 with a 17% coupon") pointed to B0F6D1D2XV, which is already LIVE. Because a repost usually means the price moved, I re-read the Amazon product page (#centerCol). The real price is **₹119** (MRP ₹310), and the 17% clip coupon takes it to about ₹98 (119 × 0.83 = 98.8). The DB row was stale at ₹111 with an old "20% coupon" note.

| Field | Before | After |
|---|---|---|
| price | 111 | 119 |
| discountPct | 64 | 62 |
| couponNote | "Extra 20% off coupon … net about ₹89" | "Clip the 17% coupon … about ₹98" |
| title | "… at ₹111 – Amazon" | "… at ₹119 – Amazon" (the title ₹ is matched to the price) |

The live page's Offer JSON-LD now shows `"price":"119"`. IndexNow was pinged for the slug and returned HTTP 200 (4 urls).

## Rejected

| Group | Post | Reason |
|---|---|---|
| ONLINE SHOPPING DEALS | Organic India Tulsi green tea | Food/beverage |
| SB Loots | Claris James handbags "from ₹273" (Myntra) | Category listing |
| Dealzone | "Upto 85% off" branded shoes, 6 links | Multi-product / category |
| Rogerkart | VPN claim | Not a product |
| NonStopDeals, Dealdost, INDIAN CHEAP DEALS, Loot Deals 24x7, IFS Tips | Same posts as the 10-02d tick | Already in the seen list |

4 keys were added to `tg-multi-seen.json` (now 2,506 entries).

## CEO audit (13:58 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,848 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 357; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 2 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,326 / 12,326. Fully drained. |
| Unpushed commits | 0 before this report |

No rot found.
