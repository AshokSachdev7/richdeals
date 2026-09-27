# TELEGRAM-DEAL-MONITOR tick 2026-09-27zj (~12:04 IST)

**Result:** 1 new deal live. Live deals went from 11,222 to 11,223.

## Sweep
- **Read:** one `browser_evaluate` over the sidebar rows of the 13 groups in `data/tg-groups.json`.
- **New single-product post:** 1, Bru Gold coffee (`link.amazon/B0iApATUr`).
- **Skipped as category or search posts:**
  - Milton "upto 67%" (`amzn.lt/veAYaAo8`, no redirect)
  - Puma shoes 70-75% in 2 groups (both resolve to `/s?`)
  - Rogerkart Skybags
  - IFS Swiggy search
- **Already seen:** BOLDFIT (`fkrt.it/kBCL2RNN`), handbag, Syska.
- **Non-deals:** Deal Dibba join-channel, supercoins, OMG, iPhone group (not in `tg-groups`).

## Pushed (`/admin/deals/bulk`, HTTP 201, count 1, `created:true`)
| Deal | Store | Price | M.R.P. | Verified by |
|---|---|---|---|---|
| Bru Gold Edition coffee 100 g with double-walled glass mug (B0FRG7731C) | Amazon | ₹354 | ₹534 | Logged-in tab: `.priceToPay` 354, `#availability` "In stock", add-to-cart present, no coupon, 4.3 stars (1,881). |

- **Before push:** the productId was not in the DB, so no slug was overwritten.
- **Affiliate link:** `tag=ashoksachdev-21`.
- **Script:** `apps/api/scripts/push-tg-0927zj.mjs`.
- **Note:** "Currently unavailable" matched in the `#centerCol` text, but it came from a twister JSON string (`currentlyUnavailableMessage`), not from the buy box. `#availability` was the real stock read.

All 5 keys were added to `tg-multi-seen` (now 2,135).

## Freshness
- **IndexNow:** HTTP 200 for 4 URLs (1 slug plus the 3 standard paths).
- **Sitemap:** ISR 1800, so it picks up the deal within 30 minutes.
- **llms.txt:** force-dynamic, so it is already current.
- **Spot check:** the Bru deal page returns 200 on prod.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,223 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 |
| Posts today (IST) | 2 (rule is 2–3; the CONTENT-SEO cron runs later) |
| Broadcast cursor | 11569, DB max 11570 (this deal is waiting for the external broadcast cron; not rot) |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |
