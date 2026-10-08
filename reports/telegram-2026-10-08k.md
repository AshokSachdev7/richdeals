# Telegram tick 2026-10-08k (10:59 IST)

I read the sidebar for all groups in `data/tg-groups.json` with one `browser_evaluate`.

Skipped without a PDP read:
- **Card-only / loot:** CoolzTricks (gold loot, multi-link), iPhone Rates (SBI EMI), NonStopDeals (Caprese category).
- **FMCG / health:** Dealzone (Livon shampoo), Online Shopping Deals (Origami tissues ₹99), Dealdost (`fkrt.cc/zHPwMGE` → Phillauri skin care kit CBKH3FY3DYJFBDZV, cosmetics).
- **Location-locked:** IndiaFreeStuff Tips (Swiggy Instamart).
- **Not deals:** Hidden Loot (sale teaser), own RichDeals channel, OMG LOOTDEALS (spam).
- **Already handled:** INDIAN CHEAP DEALS (handbag B0G38DGNKM, re-priced earlier), Loot Deals 24x7 (Syska power bank, rejected earlier).

Shortlinks resolved: `amzn.lt/d1ZRqBLM` → B0GDTSH5BW (source tag `bhavesh015-21` stripped), `rogerkart.com/r/B8k9CJi` → B0CTHF8V89.

## Pushed: 1 (`/admin/deals/bulk` count 1, created:true, status live, id 12773)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| Zebronics Zeb-Blanc dual-mode wireless mouse, Grey (B0GDTSH5BW) | ₹335 | ₹799 | 4.0 (9,528) |

PDP-verified in logged-in tab: price matches post, in stock, add-to-cart present. Image keyed to `landingAsinColor`. Affiliate `tag=ashoksachdev-21`.

## Rejected (1)

| Candidate | Reason |
|---|---|
| Cockatoo ADB-01 24kg adjustable dumbbell set (B0CTHF8V89), ₹10,791 | Card-only: PDP ₹11,990; posted price needs ₹1,199 SBI card discount |

Seen list is now 2,890 entries.

## Freshness

- IndexNow: **HTTP 200**, 4 URLs (1 deal slug plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (10:59 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 2 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,254 |
| Broadcast cursor | 12772 vs DB max 12773: the new row, external cron picks it up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
