# Telegram tick 2026-10-08t (19:59 IST)

**2 pushed.** `/admin/deals/bulk` count 2, both `created:true`. Both live pages return 200. IndexNow **HTTP 200** for 5 URLs.

## Pushed

| Group | Deal | Price | M.R.P. | Off | Rating | Checked on |
|---|---|---|---|---|---|---|
| ONLINE SHOPPING DEALS | [Home Centre Helios Emily 3-seater fabric sofa](https://richdeals.in/home-centre-helios-emily-3-seater-fabric-sofa-rich-brown-b07thv17wm) (B07THV17WM) | ₹12,999 | ₹33,998 | 62% | 4.0★ (1,275) | Amazon product page: in stock, add-to-cart present |
| Dealdost | [OSCAR 11 Forever Scents For Her perfume set, pack of 11](https://richdeals.in/oscar-11-forever-scents-for-her-perfume-gift-set-pack-of-11-pergvhsc5z97rhye) (PERGVHSC5Z97RHYE) | ₹249 | ₹1,257 | 80% | 4.1★ (7,171) | Flipkart ld+json: InStock, price matches |

The perfume's coupon note records Flipkart's "Buy at ₹228" figure, which needs offers applied at checkout. Affiliate links: Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`.

## Rejected

| Group | Post | Reason |
|---|---|---|
| Dealzone and CoolzTricks (same ASIN) | "449" → Solimo 1.5L karahi (B0D927SK86) | Rated 3.5★ from 61 ratings, which fails the ≤3.5 rule. The ₹449 price itself was correct. |
| SB Loots | Electric scooter | Price needs an SBI card offer; two links |
| Rogerkart | Bikes and scooters | Multiple products, vehicle booking |
| Hidden Loot | "Loot Lo @ 30-40" | Masterlink |
| NonStopDeals | Caprese "surf all pages" | Category |
| iPhone rates | iPhone 17 at ₹80,749 | Card-only price |
| IFS Tips | Instamart | Location-specific tip |
| INDIAN CHEAP DEALS, Loot Deals 24x7 | Handbag, Syska power bank | Same posts as earlier ticks, already handled |

B0D927SK86, B07THV17WM and PERGVHSC5Z97RHYE are added to `data/tg-multi-seen.json`.

## CEO audit (19:59 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 4, at the daily cap |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,296 |
| Broadcast cursor | 12812 vs DB max 12814. The 2 new rows are waiting for the external broadcast cron. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
