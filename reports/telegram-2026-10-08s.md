# Telegram tick 2026-10-08s (18:58 IST)

**1 pushed.** `/admin/deals/bulk` count 1, `created:true`. Live page returns 200. IndexNow **HTTP 200** for 4 URLs.

I read the newest post in each group in one sidebar read.

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| [Caresmith Revive scalp massager, green](https://richdeals.in/caresmith-revive-scalp-massager-96-silicone-points-green-b09zv233rh) (B09ZV233RH), from Dealdost | ₹899 | ₹1,500 | 40% | 4.0★ (2,598) |

The channel posted ₹799 "apply 12% coupon". The product page `#centerCol` shows ₹899 with a 12% clip coupon (₹899 × 0.88 ≈ ₹791). I published the verified pre-coupon ₹899, and the coupon is noted in `couponNote` and in the description. `#availability` showed In stock and add-to-cart was present. Affiliate link is `/dp/ASIN?tag=ashoksachdev-21`.

## Rejected or skipped

| Group | Post | Reason |
|---|---|---|
| Dealzone | "192" (amzn.to → B0GL8KLTNQ, Dabur Glucoplus-C 1kg) | Health/food product |
| CoolzTricks | Makhana 1kg | Food |
| ONLINE SHOPPING DEALS | F Gear tote bag | Already rejected in tick 08q (1 rating) |
| INDIAN CHEAP DEALS | Ladies handbag ₹3,500 | Already LIVE (id 7110), checked in tick 08m |
| Loot Deals 24x7 | Syska power bank | Already in the seen list |
| Rogerkart, NonStopDeals, SB Loots, Hidden Loot | Trase/Caprese "70–90% off", innerwear loot, masterlink | Multi-product or category posts |
| iPhone rates | iPhone 17 at ₹80,749 | Price only with an ICICI card |
| IFS Tips | Instamart search tip | Location-specific, not a product |

Both new ASINs were added to `data/tg-multi-seen.json`.

## CEO audit (18:58 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 4 (at the cap) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,294 |
| Broadcast cursor | 12811 vs DB max 12812. Only the new row is waiting; the external cron picks it up on its own. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
