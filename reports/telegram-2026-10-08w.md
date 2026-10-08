# Telegram tick 2026-10-08w (23:00 IST)

**3 pushed.** `/admin/deals/bulk` returned count 3, all `created:true`. All 3 live pages return 200. IndexNow **HTTP 200** for 6 URLs.

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| [Aquaguard Sure Delight RO+MC 1X water purifier](https://richdeals.in/aquaguard-sure-delight-ro-mc-1x-water-purifier-b0cw62435r) (B0CW62435R) | ₹6,299 | ₹13,000 | 52% | 4.3★ (6,027) |
| [Panasonic 20W TheaLED batten, pack of 10](https://richdeals.in/panasonic-20w-thealed-batten-tube-light-6500k-pack-of-10-b0drcd16gn) (B0DRCD16GN) | ₹899 | ₹4,700 | 81% | 4.1★ (646) |
| [MiniExplorer 44-piece kids kitchen playset](https://richdeals.in/miniexplorer-44-piece-kids-kitchen-playset-with-sound-light-and-running-water-b0gvt4jdfn) (B0GVT4JDFN) | ₹747 | ₹2,499 | 70% | 4.0★ (219) |

All three were checked on the Amazon product page in the logged-in tab: price matched the channel price, `#availability` showed In stock, and add-to-cart was present. For Aquaguard, `#centerCol` returned the "worth ₹2000" figure from the title, so the price was read from `.priceToPay` instead (₹6,299). Affiliate link is `/dp/ASIN?tag=ashoksachdev-21`.

## Already LIVE, re-verified

| Deal | Result |
|---|---|
| Beetel PB20 power bank (B0GHL3KLX4) | id 12806, ₹890 matches the product page |
| Helios Emily sofa (B07THV17WM) | id 12813, ₹12,999 matches the product page |

## Skipped

| Group / post | Reason |
|---|---|
| ELLE flats (B0D8LDNVNV) | Unavailable, 1 rating |
| Rogerkart IFB 206L fridge (B0GW345QCM) | ₹19,990 on the page vs ₹14,241 posted (coupon plus SBI card price); 3.6★ from 28 ratings |
| Park Avenue grooming kit, Beardo brush, Engage perfume | Personal care |
| Godrej Ninja dog food | Food |
| SB Loots Pampers | Baby / personal care |
| Dealzone, CoolzTricks, Dealdost, Hidden Loot, NonStopDeals | Loot or multi-link posts |
| iPhone rates LG TV | SBI EMI loot |
| IFS Tips | Instamart, location-specific |
| INDIAN CHEAP DEALS handbag, Loot Deals 24x7 Syska | Already in the seen list |

## CEO audit (23:00 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 4, at the 4/day cap. No more blog posts today. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,317 |
| Broadcast cursor | 12832 vs DB max 12835. The 3 new rows are waiting for the external broadcast cron, which catches up on its own. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
