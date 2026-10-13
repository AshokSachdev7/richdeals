# DESIDIME tick 2026-10-13l (22:47 IST)

**1 of 19 fresh candidates pushed. IndexNow returned HTTP 200.**

- Stage 1 found 37 deals and resolved 25 to a single product. 6 were already in the DB, leaving 19 fresh.
- Bulk push to local `/admin/deals/bulk`: `count:1`, `created:true`.
- The new deal page returns 200 on prod (0.22s).
- IndexNow returned HTTP 200 for 4 URLs: the slug plus the 3 hub pages.

## Pushed (1)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [Ambrane RAAP M20 20W Type-C PD charger](https://richdeals.in/ambrane-raap-m20-20w-type-c-pd-fast-charger-b0dqy9djf7) (B0DQY9DJF7) | Amazon | ₹299 | ₹1,199 | 75% | 4.0★ (579) | `?tag=ashoksachdev-21` |

**How it was checked:** a same-origin fetch in the logged-in Playwright Amazon tab. The `#corePriceDisplay` price matched the card at ₹299, `#availability` reads "In stock", and the add-to-cart button is present. The copy is original and makes no claim about a bundled cable.

## Rejected (18)

| Deal | Reason |
|---|---|
| Samsung 7kg Ecobubble washing machine (B0B8NHX62W) | Price drift: ₹15,390 listed vs ₹17,990 live. |
| Rangoli MDF stencil (B0HJC7XXLQ) | Price drift: ₹99 listed vs ₹499 live. 1 rating. |
| Sony LinkBuds Open WF-L910 (B0DGVQXZPZ) | Price drift: ₹5,390 listed vs ₹7,989 live. Rated 3.3★. |
| Samsung 236L convertible fridge (B0G8JRG8LT) | Price drift: ₹22,990 listed vs ₹27,490 live. |
| Portronics Pure Sound 110 home theatre (B0H9M7KLJ6) | 0 ratings. The price matched at ₹3,999. |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190 live (fifteenth tick in a row). |
| Apple MacBook Neo (B0GR64G4H6) | Price drift: ₹63,940 bank price vs ₹67,990 live. |
| VASU Ayurvedic tablet (B0HCC7RRF2) | Health rule. |
| Fiama body wash (B06ZY81GGQ) | Low-ticket personal-care FMCG. |
| Zebster monitor (Flipkart) | SuperCoins promo card, no card price. |
| Acer Iconia tab (Flipkart) | No ratings. |
| Dettol (Instamart) | FMCG, no ld+json. |
| Samsung G3 monitor (Flipkart) | Price drift (stage 1). |
| VWash (Flipkart) | Price drift (stage 1). Intimate hygiene. |
| BLUE HEAVEN makeup kit (Flipkart) | Price drift (stage 1). |
| Samsung 60W charger (Flipkart) | Price drift (stage 1). |
| Longway fan (Myntra) | Price drift (stage 1). |
| Digismart fan (Myntra) | Price drift (stage 1). |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 4 (cap) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,467 (+1, this push) |
| Broadcast cursor | 12983 vs DB max 12984. The gap is this tick's deal, waiting for the external broadcast cron. |
| Prod endpoints (7) | all 200 in 0.11–0.76s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
