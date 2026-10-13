# DESIDIME tick 2026-10-13h (14:46 IST)

**1 of 15 fresh candidates pushed.**

- Stage 1 found 36 deals and resolved 19 to a single product. 4 were already in the DB, leaving 15 fresh.
- Bulk push to local `/admin/deals/bulk`: `count:1`, `created:true`.
- The new deal page returns 200 on prod (0.40s).
- IndexNow returned HTTP 200 for 4 URLs: the slug plus the 3 hub pages.

## Pushed (1)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [Lakmé 9 to 5 Eyeconic Kajal twin pack, pack of 2](https://richdeals.in/lakme-9-to-5-eyeconic-kajal-twin-pack-of-2-kjlf7vnfp2kxucvq) (KJLF7VNFP2KXUCVQ) | Flipkart | ₹166 | ₹450 | 63% | 4.4★ (361,388) | `affid=djhackraj` |

**How it was checked:** the Flipkart ld+json `Product` block.

- **Price:** `offers.price` is 166, which matches the card.
- **Stock:** InStock.
- **Rating:** `aggregateRating` is 4.4 from 361k ratings.
- **Affiliate:** the source tag (`affid=salescueli` plus the `affExtParam`s) was stripped and ours applied.
- **Copy:** original, including the per-pencil maths (₹166 ÷ 2 ≈ ₹83). The 24-hour wear figure is attributed to Lakmé's own marketing, not stated as a fact.

## Rejected (14)

| Deal | Reason |
|---|---|
| Dove Men+Care moisturizer (B0F9X6K3HH) | Price drift: ₹130 listed vs ₹150 live, and M.R.P. is ₹150, so there is no discount. |
| BRINKL 2L water bottle (B0H21LHFFF) | ₹69 plus a ₹99 delivery charge, so the headline price is misleading. Only 9 ratings, unknown brand. |
| Lenovo Tab Plus Gen 2 (B0H5C6YBPN) | Price drift: ₹28,249 listed vs ₹31,999 live. The card price is a bank-card price. |
| Xiaomi Pad 8 (B0GPVX566R) | Price drift: ₹40,499 listed vs ₹47,999 live. |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190 live (eleventh tick in a row). |
| Hero Xtreme 160R (B0F7WB4D4P) | A booking listing, not a product. |
| Hero Destini scooter (B0GRGBKF52) | A booking listing, not a product. |
| Health Ok multivitamin (B0BRNPKW29) | Health rule. |
| Jaspo kids tennis ball (Instamart) | ₹29, quick-commerce and location-locked. |
| NOICE eggs (Instamart) | Food rule. Price drift. |
| ADIDAS Blockz sneaker (Flipkart) | Price drift: ₹1,200 listed vs ₹1,644 live. |
| Philips 20000mAh power bank (Flipkart) | Price drift: ₹1,377 listed vs ₹1,598 live. |
| Aqueria anti-dandruff shampoo (Flipkart) | Price drift: ₹298 listed vs ₹268 live. |
| Samsung 65" Mini LED TV (Flipkart) | Price drift: ₹61,990 listed vs ₹74,990 live. |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 3 (within the 2-3 rule, cap 4) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,458 (+1, this push) |
| Broadcast cursor | 12974 vs DB max 12975. The gap is this tick's deal, waiting for the external broadcast cron; it clears on that cron's next run. |
| Prod endpoints (7) | all 200 in 0.10–0.88s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
