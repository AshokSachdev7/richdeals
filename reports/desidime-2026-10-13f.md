# DESIDIME tick 2026-10-13f (10:48 IST)

**5 of 17 fresh candidates pushed.**

- Stage 1 found 34 deals and resolved 21 to a single product. 4 were already in the DB, leaving 17 fresh.
- Bulk push to local `/admin/deals/bulk`: `count:5`, all `created:true`.
- All 5 new deal pages return 200 on prod (0.22–0.31s).
- IndexNow returned HTTP 200 for 8 URLs: the 5 slugs plus the 3 hub pages.

## Pushed (5)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [TIMEX Classics analog watch, unisex, silver](https://richdeals.in/timex-classics-analog-watch-unisex-silver-b01n56x1ew) (B01N56X1EW) | Amazon | ₹2,389 | ₹4,995 | 52% | 4.4★ (777) | `?tag=ashoksachdev-21` |
| [Reebok women's sneaker, black (100074382)](https://richdeals.in/reebok-womens-sneaker-black-100074382-b0c77xjys6) (B0C77XJYS6) | Amazon | ₹1,012 | ₹4,599 | 78% | 4.3★ (179) | `?tag=ashoksachdev-21` |
| [Skybags Rubik soft cabin trolley, red](https://richdeals.in/skybags-rubik-soft-cabin-trolley-bag-red-b07z9wh63c) (B07Z9WH63C) | Amazon | ₹1,399 | ₹6,680 | 79% | 4.2★ (19,191) | `?tag=ashoksachdev-21` |
| [Highlander men's cargo joggers, light khaki](https://richdeals.in/highlander-mens-cargo-jogger-trousers-light-khaki-b0f2tys2tf) (B0F2TYS2TF) | Amazon | ₹300 | ₹1,999 | 85% | 3.7★ (302) | `?tag=ashoksachdev-21` |
| [Calvin Klein CK Be EDT 200 ml](https://richdeals.in/calvin-klein-ck-be-eau-de-toilette-200ml-perfy9p8z5ufxrgh) (PERFY9P8Z5UFXRGH) | Flipkart | ₹3,273 | ₹6,295 | 48% | — | `?pid=…&affid=djhackraj` on `/p/itm…` |

**How they were checked:**

- **Amazon:** a same-origin fetch in the logged-in Playwright Amazon tab. The `#centerCol` price matched the card price exactly on all 4, with no coupon needed. `#availability` reads "In stock", the add-to-cart button is present, and none shows an "only N left" warning. Images are the `#landingImage` hiRes, and `landingAsinColor` matches the variant (Silver / Black / Red Cabin / Light Khaki).
- **Flipkart:** stage 1 read the ld+json price at ₹3,273, which matches the card, and InStock.
- **Size-variant pricing:** the sneaker and joggers are size-variant apparel, so their how-to steps tell the buyer to confirm the price for their size.
- **Highlander rating:** the 3.7 rating is just above the 3.5 cutoff, and the copy says so honestly.
- **Copy:** original, built only from the title, bullets and rating on the product page. The CK copy adds the per-ml maths: ₹3,273 ÷ 200 ≈ ₹16/ml.

## Rejected (12)

| Deal | Reason |
|---|---|
| Better Home triply saucepan (B0DR9162WB) | Price drift: ₹560 listed vs ₹589 live (the card price needs a coupon). Rating 2.5 from 2. |
| Lenovo Idea Tab with pen (B0HBBTV4J4) | Price drift: ₹16,499 listed vs ₹18,999 live. Rating 3.6 from 9. |
| Wipro Garnet 10W LED 3-pack (B0F37YZ67V) | Unavailable: no price, no add-to-cart button. |
| HRX Zanzibar cabin suitcase (B0HLQCCPKQ) | 0 ratings. |
| BoroPlus body lotion 400 ml (B0BVVSGS6S) | Low-ticket FMCG (₹149, the grocery/FMCG rule). |
| LG 322L refrigerator (B0GMQBMGGN) | Unavailable. Price drift: ₹28,990 listed vs ₹39,990 live. |
| AQUA D PURE RO (B0B79QLL1K) | Price drift: ₹4,417 listed vs ₹4,908 live. |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190 live (tenth tick in a row). |
| Sony SRS-XV500 speaker (B0CQF7TQP4) | Price drift: ₹17,990 listed vs ₹21,989 live. |
| Amazon Basics 8-person tent (B0785MRPH6) | Unavailable. |
| DELL Alienware 16 (Flipkart) | Price drift: ₹81,829 listed vs ₹1,54,990 live (stage 1). |
| Kenstar Veda Pro RO (Flipkart) | Price drift: ₹4,098 listed vs ₹4,341 live (stage 1). |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,452 (+5, this push) |
| Broadcast cursor | 12964 vs DB max 12969. The gap is this tick's 5 deals, waiting for the external broadcast cron; it clears on that cron's next run. |
| Prod endpoints (7) | all 200 in 0.12–0.53s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
