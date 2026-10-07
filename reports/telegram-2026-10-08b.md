# Telegram tick 2026-10-08b (01:59 IST)

I read the sidebar for all groups in `data/tg-groups.json` with one `browser_evaluate`.

Skipped without a PDP read:
- **Card-only / loot / category:** SB Loots (Rare Rabbit), iPhone Rates (Samsung 75in with advance coupon), Rogerkart (ASUS Vivobook at the SBI card price), NonStopDeals (Caprese category).
- **FMCG / food:** CoolzTricks (Saffola honey), Online Shopping Deals (NIVEA deo, unchanged).
- **Location-locked:** IndiaFreeStuff Tips (Instamart).
- **Already handled:** Indian Cheap Deals (handbag, re-priced in 08a), Loot Deals 24x7 (Syska, already in the seen list).
- **Not a deal:** Hidden Loot (sale teaser).

2 shortlinks resolved: `fkrt.cc/zZttOhm` → Flipkart PWBHZGD4FESHZ2VG, `amzn.to/4yBYAjj` → B0CVMWYPM1.

## Pushed: 1 (`/admin/deals/bulk` count 1, created:true, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| boAt 10000mAh power bank, Flipkart (PWBHZGD4FESHZ2VG) | ₹699 (72% off) | ₹2,499 | 4.0 (4,111) |

Verified from ld+json: InStock, ₹699 matches the post. Affiliate is the canonical `/boat-10000-mah-power-bank/p/itm39c132797822b` with `affid=djhackraj`.

## Re-priced: 1 (dup repost, re-verified on PDP)

| Deal | Was | Now |
|---|---|---|
| Vaseline Sun Protect SPF 30 body lotion 600ml (B0CVMWYPM1), id 1471 | ₹405; title said "@242" | **₹255** (74% off, MRP ₹985), 4.3 (7,543), in stock, add-to-cart. Title rewritten to "at ₹255 (74% Off)"; the stale ₹ figure in the description fixed too. |

## Rejected: 0

Seen list is now 2,872 entries.

## Freshness

- IndexNow: **HTTP 200**, 5 URLs (2 slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (01:59 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **1** (IST day is 2 hours old; later blog ticks cover the 2–3 target) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,220 |
| Broadcast cursor | 12734 vs DB max 12735: the boAt row just pushed, the external cron picks it up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
