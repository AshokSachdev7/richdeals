# DesiDime tick 2026-10-10g (18:16 IST)

**Result:** 1 deal pushed (count 1, created true). IndexNow returned **HTTP 200** for 4 URLs. The new deal page returns 200 on prod.

Stage 1 found 27 cards. 15 resolved to a product, 3 were already in the DB, which left 12 fresh candidates.

## Pushed

| Deal | ASIN | Price / M.R.P. | Rating | id |
|---|---|---|---|---|
| Zebronics ZEB-TT60+ 60W braided Type-C cable | B0D8TPR7DL | ₹129 / ₹999 (87% off) | 4.2★ from 676 ratings | 12899 |

Verified on the PDP in the logged-in Amazon tab: in stock, with an add-to-cart button. Slug: `zebronics-zeb-tt60-60w-type-c-to-type-c-braided-fast-charging-cable-b0d8tpr7dl`.

## Rejected (11)

| Candidate | Reason |
|---|---|
| Calvin Klein women's watch B0CBSFTXFV | No add-to-cart (unavailable), only 6 ratings |
| boAt Airdopes 141 Gen 2 B0F8BVSK21 | Price drift: card ₹749, PDP ₹799 |
| Royal Enfield SpeedX helmet B0F1N47YJW | Price drift: card ₹3,213, PDP ₹3,570; only 7 ratings |
| HP Victus i5 RTX 3050 B0GWQGM5FJ | Price drift: card ₹85,490, PDP ₹1,04,990 |
| Xiaomi 43" FX Pro QLED B0F3JKY28G | Price drift: card ₹19,337, PDP ₹26,999. The gap is too large for a clip coupon, so it is a bank or card offer. |
| Samsung 223 L fridge B0G8JGJLKW | No add-to-cart (unavailable) |
| Hero HF Deluxe / Xtreme 125R, Bajaj Platina | Bike booking listings, not a real product price |
| SAFARI 30 L backpack (Flipkart) | Price drift (ld+json) |
| Portronics Mport 4D hub (Instamart) | Out of stock |

## CEO audit (18:16 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 2 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,382 |
| Broadcast cursor | 12898 vs DB max 12899. The gap is this tick's deal; the external broadcast cron will pick it up. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
| Session crons | 6 running. telegram-deal-monitor, deal-ingest IFS and AI-OVERVIEW are still missing (owner: "restore all crons"). |
