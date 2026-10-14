# DESIDIME tick 2026-10-14c (23:50 IST)

**1 pushed. IndexNow HTTP 200 (4 URLs).** Stage 1 found 34 cards, resolved 9 to a single product, 0 were already in the DB, so 9 were fresh. 8 failed verification.

The push also ends the deal-intake stall: the previous newest deal was from 10-13 22:47 IST (25 hours).

## Pushed

| Deal | Store | Price | Verification | Prod |
|---|---|---|---|---|
| [Motorola AmphisoundX 200W 2.1 soundbar](https://richdeals.in/motorola-amphisoundx-200w-2-1-bluetooth-soundbar-accgxtst9dghvpsb) (ACCGXTST9DGHVPSB) | Flipkart (`affid=djhackraj`) | ₹4,989 | ld+json ₹4,989, InStock, 4.2 from 15,301 ratings (read in the logged-in tab) | 200 |

Bulk push: `count:1`, `created:true`. DB dedup: the only other AmphisoundX row is the Vibe 220W (ACCHHJTD2DHHGNSU), which is a different SKU.

## Rejected

| Deal | Reason |
|---|---|
| CELLO bottle set (Instamart ba812f45b112) | No ld+json, multi-item pack |
| Presto tissue (B0854RNKDK) | Low-ticket FMCG |
| Lenovo IdeaPad (Flipkart COMHZGQWDCX9TKZ6) | Store price ₹57,990 vs card ₹54,520 |
| Lenovo Yoga Slim 7 (Flipkart COMHZFBNMQNSAJ9W) | Store price ₹1,04,990 vs card ₹93,990 |
| Myntra gift voucher (B0FNR6Z9PN) | Gift card (junk) |
| Samsung Galaxy Tab S10 FE (B0F29L7HJP) | PDP ₹43,999 vs card ₹39,649 |
| Razer Basilisk V3 Pro (B0BGS1KQ68) | PDP ₹9,495 vs card ₹8,046 (SBI card-only price) |
| French Connection watch (B0DP57B739) | PDP ₹3,025 vs card ₹2,722; only 14 ratings at 3.6 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-14) | 2 (cap 4) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,468 (+1) |
| Newest deal | 2026-10-14 23:45 IST (this push). The 25-hour stall is over, but intake is still thin. |
| Broadcast cursor | 12984 vs DB max 12985. The 1-row lag is the external cron's next run picking up this push. |
| Prod endpoints (7) | all 200 in 0.12–0.81s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
