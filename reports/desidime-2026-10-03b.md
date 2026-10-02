# DESIDIME-INGEST — 2026-10-03 (02:45 IST)

**Stage 1 (`ingest-desidime.mjs`): 32 cards discovered → 16 dropped as junk or app links → 14 resolved to a product → 5 already in the DB → 9 fresh candidates → 0 pushed. No bulk call and no IndexNow ping, because there was nothing to send.**

## Candidates (9), all rejected

- **Amazon items:** read in the logged-in Amazon tab via a same-origin product-page fetch (price, `#availability`, add-to-cart button, rating).
- **Flipkart item:** ld+json read in Playwright tab 2, because curl gets a 403 reCAPTCHA.

| ID | Item | Store | Card price | Store page | Reject reason |
|---|---|---|---|---|---|
| B0FD3QWML7 | Casaliving Porto 4-seater L-shape sofa | Amazon | ₹14,399 | No buybox price, no add-to-cart; 4.2 (114) | Price is "Amazon Rewards, account-specific", not a public price |
| B0HLQBFG7J | Men's faux-leather jacket J-4899 | Amazon | ₹274 | No buybox price, no add-to-cart, 0 ratings | 0 ratings; no live offer |
| B0HKTGD28N | Flower tealight candles, set of 16 | Amazon | ₹199 | ₹199, MRP ₹799, in stock | 0 ratings (same as tick 10-03a) |
| B0B91B1LFY | BSB HOME double bedsheet + 2 pillow covers | Amazon | ₹199 | ₹199, MRP ₹1,299, in stock; 3.3 (6,227) | Rating ≤ 3.5 |
| B0D9Y23BPM | Homeybiz eco laundry balls, 10 pcs | Amazon | ₹99 | ₹99, MRP ₹589, in stock; 4.5 (2) | Only 2 ratings (0–7 band) |
| BKPGTBQFTYYY5VNY | HP X Entry 32 L laptop backpack | Flipkart | ₹324 | ld+json **₹398**, InStock; 4.0 (23,933) | Price drift ₹74 (the card price is likely a bank or SuperCoin price) |
| — | Saffola oats 1 kg + 300 g | JioMart | ₹185 | No ld+json | Food/FMCG |
| — | JioMart Mak chargers & cables | Store1 | ₹49 | No ld+json | Category page |
| B0899KPV4S | Free Kindle eBooks "& more" | Amazon | ₹0 | — | Multi-product loot |

Stage 1 also dropped these before resolving: MakeMyTrip bus app promo, BHIM cashback.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200 |
| LIVE deals | 11,934 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 359; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 1 (the day is 2.75 h old); 10-02: 3; 10-01: 4 |
| Broadcast cursor vs max deal id | File re-read: 12,413 / 12,413 |
| Unpushed commits | 0 before this report |

No rot found. This is the 2nd DesiDime tick in a row with 0 pushes: overnight yield is low-rated filler.
