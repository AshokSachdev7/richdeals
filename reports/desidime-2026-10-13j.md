# DESIDIME tick 2026-10-13j (18:47 IST)

**2 of 12 fresh candidates pushed.**

- Stage 1 found 35 deals and resolved 16 to a single product. 4 were already in the DB, leaving 12 fresh.
- Bulk push to local `/admin/deals/bulk`: HTTP 201, `count:2`, both `created:true`.
- Both new deal pages return 200 on prod (0.17–0.25s).
- IndexNow returned HTTP 200 for 5 URLs: the 2 slugs plus the 3 hub pages.

## Pushed (2)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [Longway Super Dlx juicer mixer grinder, 750W, 4 jars](https://richdeals.in/longway-super-dlx-juicer-mixer-grinder-750w-4-jars-b0c33flxjj) (B0C33FLXJJ) | Amazon | ₹1,377 | ₹3,899 | 65% | 3.8★ (2,739) | `?tag=ashoksachdev-21` |
| [PHILIPS TAT1269 TWS earbuds](https://richdeals.in/philips-tat1269-true-wireless-earbuds-40h-ipx5-b0fhkht717) (B0FHKHT717) | Amazon | ₹899 | ₹1,999 | 55% | 3.8★ (1,752) | `?tag=ashoksachdev-21` |

**How they were checked:** a same-origin fetch in the logged-in Playwright Amazon tab.

- The `#corePriceDisplay` price matched the card price on both.
- `#availability` reads "In stock" and the add-to-cart button is present on both.
- The rating is the `#acrPopover` title.
- **Longway M.R.P.:** the page's first strike-through value is a ₹1,37,700 artifact, so the real M.R.P. of ₹3,899 was used.
- **Copy:** original, using only facts from the product page's bullet points.
- **Images:** the PDP hiRes image on m.media-amazon.com.

## Rejected (10)

| Deal | Reason |
|---|---|
| Orient Proton BLDC fan (B0FM3V9558) | Price drift: ₹3,449 listed vs ₹3,699 live. The card price is the price after a coupon. |
| Bajaj Pulsar NS125 (B0D83WJJTM) | Ex-showroom vehicle listing, not a product. |
| Highlander men jeans (B0F493D3FG) | Price drift: ₹410 listed vs ₹431 live. Also only 3 left, and 19 ratings. |
| ARTO 3D face-recognition lock (B0FNWZ3HNF) | 0 ratings. The price matched at ₹28,799. |
| Samsung Galaxy M47 5G (B0H4L5T84X) | Price drift: ₹24,749 listed vs ₹26,999 live. The card price is a bank-card price. |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190 live (thirteenth tick in a row). |
| Samsung 215L fridge (Flipkart) | Price drift (stage 1). |
| LG LR60 32" TV (Flipkart) | Price drift (stage 1). |
| POCO C85 5G (Flipkart) | Price drift (stage 1). |
| BookMyShow voucher | Gift voucher; no ld+json. |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 4 (cap reached) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,460 (+2, this push) |
| Broadcast cursor | 12975 vs DB max 12977. The gap is this tick's 2 deals, waiting for the external broadcast cron. |
| Prod endpoints (7) | all 200 in 0.10–0.93s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
