# TELEGRAM-DEAL-MONITOR — 2026-10-03p (15:00 IST)

**Swept the chat sidebar, then reloaded ONLINE SHOPPING DEALS for its newest posts. 4 fresh single-product Amazon deals, all verified on the product page in the logged-in Amazon tab, pushed LIVE (`count:4`, all created, ids 12,452–12,455). IndexNow returned HTTP 200 for 7 URLs.**

## Pushed

| Deal | ASIN | Price / M.R.P. | Rating | Source |
|---|---|---|---|---|
| DOCAT wooden book stand, 360° base | B0GKFH23KX | ₹1,999 / ₹4,999 (60%) | 4.0★ (88) | ONLINE SHOPPING DEALS |
| French Connection women's analog watch | B097PWJD2V | ₹1,079 / ₹6,950 (84%) | 4.1★ (271) | ONLINE SHOPPING DEALS |
| Beardo Whisky Smoke + Mariner EDP combo, 2×50 ml | B0CG1WX5YC | ₹357 / ₹1,698 (79%) | 4.1★ (979) | ONLINE SHOPPING DEALS |
| Skechers Mumbai Indians 2026 fan jersey | B0GR9VRL6W | ₹440 / ₹999 (56%) | 4.2★ (114) | CoolzTricks |

Every deal showed In stock and had an add-to-cart button. Affiliate links use `?tag=ashoksachdev-21`; the source tag `vivek123034-21` was stripped. Two of the new pages were spot-checked on prod and returned 200.

Notes:
- **Beardo:** the a-text-price field read ₹3.57, which is the per-ml rate. The real M.R.P. of ₹1,698 came from `#centerCol`.
- **Jersey:** the channel's ₹220 is the price after a 50% clip-on coupon. We list the verified ₹440 product-page price, and step 4 of the how-to points buyers to the coupon.

Payload builder: `scripts/push-tg-1003p.mjs`.

## Skipped

| Post | Reason |
|---|---|
| Dealdost anjeer + aloe gel | Food/health, and two products in one post |
| Chyawanprash, Keya pasta, anjeer (ONLINE SHOPPING DEALS) | Food/health |
| Maybelline palette, Bata slide, Ant Globe mouse | Older posts; marked seen |
| NonStopDeals Philips TAT1269, INDIAN CHEAP DEALS handbag, Loot Deals 24x7 Syska power bank | Already seen |
| SB Loots luggage, Dealzone handbags, Supercoins, Swiggy Dineout, "iPhone rates" | Category, loot or app posts |

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,976 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 361; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 3 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | 12,451 / 12,455. The 4 new deals go out on the next broadcast run. |
| Unpushed commits | 0 before this report |

No rot found.
