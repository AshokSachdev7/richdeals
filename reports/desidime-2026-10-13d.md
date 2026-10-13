# DESIDIME tick 2026-10-13d (06:47 IST)

**1 of 14 fresh candidates pushed.**

- Stage 1 found 35 deals and resolved 17 to a single product. 3 were already in the DB, leaving 14 fresh.
- Bulk push to local `/admin/deals/bulk`: `count:1`, `created:true`.
- The new deal page returns 200 on prod (0.24s).
- IndexNow returned HTTP 200 for 4 URLs: the slug plus the 3 hub pages.

## Pushed (1)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [Havells TruSteam 1600W steam iron with self cleaning](https://richdeals.in/havells-trusteam-1600w-steam-iron-self-cleaning-b0fvdz73r4) (B0FVDZ73R4) | Amazon | ₹999 | ₹2,399 | 58% | 4.0★ (94) | `?tag=ashoksachdev-21` |

**How it was checked:** a same-origin fetch in the logged-in Playwright Amazon tab.

- **Price:** `#centerCol` shows ₹999 against an M.R.P. of ₹2,399, which matches the card. No coupon.
- **Stock:** `#availability` reads "In stock", the add-to-cart button is present, and there is no "only N left" warning.
- **Image:** the landing hiRes image (single variant).
- **Copy:** original. It uses only the wattage, soleplate, tank size, steam rate, self-clean feature and rating read from the product page.

## Rejected (13)

| Deal | Reason |
|---|---|
| Amazon Basics 8-person tent (B0785MRPH6) | No price and no add-to-cart button (unavailable) |
| EASYMART 40-pc wooden blocks (B0FK5KCTYX) | Price drift: ₹126 listed vs ₹57 live |
| Lifelong sandwich griller (B08LVVTGZK) | Price drift: ₹722 listed vs ₹759 live |
| BIGASUO mini projector (B0HJ5N982M) | Price drift: ₹3,135 listed vs ₹3,299 live; 0 ratings |
| JIFAR HY320 projector (B0HJD5WKWR) | Price drift: ₹3,800 listed vs ₹3,999 live |
| Godrej Interio Emperor sofa (B0FFTK3X6Q) | Price drift: ₹12,316 listed vs ₹14,490 live; only 2 left |
| MetaShot smart cricket bat (B0F3CZ4P1R) | Price drift: ₹5,579 listed vs ₹6,499 live; the lower price needs a coupon |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190 live (eighth tick in a row) |
| Safe-X microfiber cloth roll (B0G4WJFVHL) | Price drift: ₹99 listed vs ₹299 live |
| Trunativ fiber supplement sample (B0B59MRG9M) | Health rule |
| Henonix LED bulb 10-pack (Shopsy) | Price drift: ₹206 listed vs ₹263 live |
| Yumzee raisins 1 kg (Shopsy) | Food rule and price drift |
| RED TAPE casuals (Flipkart) | Price drift, caught in stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,445 (+1, this push) |
| Broadcast cursor | 12961 vs DB max 12962. The new deal is waiting for the external broadcast cron; it clears on that cron's next run. |
| Prod endpoints (7) | all 200 in 0.10–0.68s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
