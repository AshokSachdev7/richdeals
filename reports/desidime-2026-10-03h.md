# DESIDIME-INGEST — 2026-10-03h (14:44 IST)

**Stage 1 found 30 cards. 12 resolved to a product, 3 were already in the DB and 9 were new. 0 passed verification, so nothing was pushed. IndexNow: n/a (0 slugs).**

## Rejected

| Candidate | Reason |
|---|---|
| Samsung ViewFinity S7 (B0HDPNQSD9) | Product page shows ₹18,899 against a card price of ₹17,399; no ratings |
| Portronics Muffs M2 (B0C4HBW653) | Product page shows ₹864 against a card price of ₹699 |
| Acer Nitro XV272U (B0D3VF2LTF) | Product page shows ₹19,439 against a card price of ₹18,467 |
| Presto cleaner (B0755FBFMJ) | Price is in paise (₹169.55); M.R.P. ₹84.50 is per unit; household cleaner |
| B0HK4TSY6V | Card ₹99, product page ₹6,299. The listing is actually a Flovtrix ceiling fan, with no ratings |
| Popwings sweatshirt (B0CM99GZ6N) | Only 4 ratings (3.8★), which fails the 0–7 ratings rule |
| GOVO GoSurround 900 (B09YV5LC7F) | Product page shows ₹4,999 against a card price of ₹4,185; the card price needs a bank card (same as tick e) |
| GOG Bounty Train | ld+json price is 0.99, so the game is not free (same as tick e) |
| Samsung G3 monitor (Flipkart MONHQ5UXTGZAUPVG) | Price drift at ₹7,829 |
| Syska bulb, Jupiter app, Bajaj app, Hillgrove (`/hi/`) | Dropped in stage 1: an `/item` URL, app links and a non-product URL |

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,972 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 361; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 3 (meets the 2–3 rule) |
| Broadcast cursor vs max deal id | 12,450 / 12,451. The external cron sends the last row on its next run. |
| Unpushed commits | 0 before this report |

No rot found.
