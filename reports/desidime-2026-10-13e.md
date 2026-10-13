# DESIDIME tick 2026-10-13e (08:46 IST)

**2 of 14 fresh candidates pushed.**

- Stage 1 found 35 deals and resolved 17 to a single product. 3 were already in the DB, leaving 14 fresh.
- Bulk push to local `/admin/deals/bulk`: `count:2`, both `created:true`.
- Both new deal pages return 200 on prod (0.25–0.32s).
- IndexNow returned HTTP 200 for 5 URLs: the 2 slugs plus the 3 hub pages.

## Pushed (2)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [Himalaya Total Care baby pants, Large, 128 count](https://richdeals.in/himalaya-total-care-baby-pants-diaper-large-128-count-b0h6bkq1q2) (B0H6BKQ1Q2) | Amazon | ₹1,030 | ₹2,398 | 57% | 4.1★ (85,531) | `?tag=ashoksachdev-21` |
| [LOVESIDE 80W Type-C cable for Vivo/iQOO](https://richdeals.in/loveside-80w-type-c-flash-charging-cable-vivo-iqoo-b0h5x4c3h4) (B0H5X4C3H4) | Amazon | ₹65 | ₹599 | 89% | 4.0★ (16) | `?tag=ashoksachdev-21` |

**How they were checked:** a same-origin fetch in the logged-in Playwright Amazon tab.

- **Price:** the `#centerCol` price matched the card price exactly, and neither deal needs a coupon.
- **Stock:** `#availability` reads "In stock" and the add-to-cart button is present on both. Neither shows an "only N left" warning.
- **Image:** the `#landingImage` hiRes image. For the diaper pack, `landingAsinColor` is "Large 128.0", which is the right variant.
- **Cable title:** DesiDime listed the cable as "Vivo 80W Original". `#bylineInfo` shows the brand is LOVESIDE, a third-party maker, so the title and copy name LOVESIDE and say it is not made by Vivo.
- **Copy:** original. The diaper copy adds the per-piece maths: ₹1,030 ÷ 128 ≈ ₹8.05.

## Rejected (12)

| Deal | Reason |
|---|---|
| Himalaya Complete Care toothpaste 2×150g (B01MV5G8K6) | Low-ticket FMCG (₹80, the grocery/FMCG rule). The price matched but a coupon block is shown. |
| Bajaj Chetak C3503 e-scooter (B0HKML1HR5) | No add-to-cart button. Price drift: ₹1,15,698 listed vs ₹1,24,157 live. |
| LG 27G411B 27" monitor (B0HFSLVGBK) | No add-to-cart button. Price drift: ₹9,450 listed vs ₹10,499 live. |
| iQOO Z11xa 5G 8/128 (B0HG929FR4) | Price drift: ₹23,748 listed vs ₹28,998 live. The card price is a bank-card price. |
| Acer Aspire One Ryzen 5 (B0H465RX6P) | Price drift: ₹36,249 listed vs ₹42,999 live. The card price is a bank-card price. Rating 3.7 from 17. |
| Sony SRS-XV500 speaker (B0CQF7TQP4) | Price drift: ₹17,990 listed vs ₹21,989 live. |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190 live (ninth tick in a row). |
| Safe-X microfiber cloth roll (B0G4WJFVHL) | Price drift: ₹99 listed vs ₹299 live. |
| Trunativ fiber supplement sample (B0B59MRG9M) | Health rule. |
| Softsens baby wipes 420 (Shopsy) | Price drift: ₹270 listed vs ₹365 live (stage 1). |
| Henonix LED bulb 10-pack (Shopsy) | Price drift: ₹206 listed vs ₹263 live (stage 1). |
| RED TAPE casuals (Flipkart) | Price drift (stage 1). |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,447 (+2, this push) |
| Broadcast cursor | 12962 vs DB max 12964. The gap is this tick's 2 deals, waiting for the external broadcast cron; it clears on that cron's next run. |
| Prod endpoints (7) | all 200 in 0.10–1.10s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
