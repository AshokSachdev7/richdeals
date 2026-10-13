# DESIDIME tick 2026-10-13i (16:45 IST)

**0 of 9 fresh candidates pushed. Every candidate failed a reject rule.**

- Stage 1 found 35 deals and resolved 11 to a single product. 2 were already in the DB, leaving 9 fresh.
- Nothing was pushed, so there was no bulk call and no IndexNow ping.

## Rejected (9)

| Deal | Reason |
|---|---|
| USHA Aquabuddy 15L water heater (B0BDZR1YT2) | Price drift: ₹8,622 listed vs ₹9,580 live. Also "Only 1 left", and rated 3.0★ from 11. |
| Xiaomi Smartchoice X 43" 4K TV (B0F6ZLFNVT) | Price drift: ₹22,249 listed vs ₹24,999 live. The card price is a bank-card price. |
| ARTO WiFi biometric door lock (B0FNWS9PL8) | "Only 1 left", and 0 ratings. The price matched. |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190 live (twelfth tick in a row). |
| Helix Metalfit SPO2 smartwatch (B09CPLJKK7) | Rated 3.5★ (the rule rejects ≤3.5). The price matched at ₹699. |
| CELLO Air-Vel USB fan (B0FV8Z9P77) | No buy-box price and no add-to-cart button. Rated 3.4★ from 16. |
| Harley-Davidson X440 T (B0G6Z6QV5C) | A booking listing, not a product. |
| NATIVE Lock Pro (Flipkart) | Price drift (stage 1). |
| VEGA Turbolite beard trimmer (Flipkart) | Price drift (stage 1). |

**How they were checked:** each Amazon deal was read with a same-origin fetch in the logged-in Playwright Amazon tab, checking the `#corePriceDisplay` price, `#availability`, the add-to-cart button, and `#acrPopover` plus the review count.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 3 (within the 2-3 rule, cap 4) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,458 (unchanged) |
| Broadcast cursor | 12975, equal to DB max 12975 |
| Prod endpoints (7) | all 200 in 0.13–0.82s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
