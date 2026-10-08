# Telegram tick 2026-10-08i (08:59 IST)

I read the sidebar for all groups in `data/tg-groups.json` with one `browser_evaluate`.

Skipped without a PDP read:
- **FMCG:** Dealdost (Dettol soap 5-pack).
- **Coupon/cashback stack:** CoolzTricks (Bosch 302L fridge: cashback + code + bank offer).
- **Card-only:** iPhone Rates (Samsung Fold 7, SBI no-cost EMI).
- **Already seen / not deals:** Rogerkart (MAXIMA watch), Hidden Loot (sale teaser), IndiaFreeStuff Tips (Instamart, location-locked), NonStopDeals (Caprese category), own RichDeals channel.

3 shortlinks resolved: `amazn.lt/SbLXLVUI` → B0DQLDF4G2, `amzn.to/4jJU1yO` → B0BCYPXJR8, `link.amazon/B0bWueesY` → B076DNJMCV.

## Pushed: 2 (`/admin/deals/bulk` count 2, both created:true, status live, ids up to 12759, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| Lavie Women's Raya tote handbag (B0DQLDF4G2) | ₹711 | ₹4,599 (85% off) | 4.2 (42), in stock, add-to-cart; optional 2% clip coupon noted in how-to |
| EVEREADY 30W LED hammer bulb, B22, 6500K (B076DNJMCV) | ₹212 | ₹699 (70% off) | 4.2 (1,816), in stock, add-to-cart |

Copy uses only PDP facts. Affiliate: Amazon `tag=ashoksachdev-21`. Images from m.media-amazon.com.

## Rejected (1)

| Candidate | Reason |
|---|---|
| Rupa Jon printed panty (B0BCYPXJR8) | Drift: the post said ₹169, but the PDP shows ₹648 for a pack of 9 |

Seen list is now 2,884 entries.

## Freshness

- IndexNow: **HTTP 200**, 5 URLs (2 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (08:59 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 2 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,240 (12,238 + 2) |
| Broadcast cursor | 12757 vs DB max 12759: the 2 new rows, external cron picks them up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
