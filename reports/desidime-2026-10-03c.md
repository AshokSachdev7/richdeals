# DESIDIME-INGEST — 2026-10-03 (04:44 IST)

**Stage 1 (`ingest-desidime.mjs`): 30 cards → 12 single-product → 4 already in DB → 8 fresh. All 8 rejected on PDP verification. 0 pushed. There was no bulk call and no IndexNow ping, because nothing changed.**

## Candidates

| Candidate | Store / ID | Price | Result |
|---|---|---|---|
| Veeba Eggless Mayonnaise 800g | Jiomart | ₹75 | **Rejected:** food, and the page has no ld+json |
| Kissan Tomato Ketchup 1.1 kg | Jiomart | ₹100 | **Rejected:** food, and the page has no ld+json |
| Saffola Oats 1 kg + 300 g | Jiomart | ₹185 | **Rejected:** food, and the page has no ld+json |
| Casaliving Porto sofa | Amazon B0FD3QWML7 | ₹14,399 | **Rejected:** the price is an account-specific "Amazon Rewards" price |
| Men's faux-leather jacket | Amazon B0HLQBFG7J | ₹274 | **Rejected:** re-checked; no price, no buybox, no add-to-cart, 0 ratings |
| Flower tealight candles ×16 | Amazon B0HKTGD28N | ₹199 | **Rejected:** the price matched and it is in stock, but it has 0 ratings (inside the 0–7 band) |
| Jiomart Mak chargers & cables | Store1 | ₹49 | **Rejected:** category page |
| Free Kindle eBooks | Amazon B0899KPV4S | ₹0 | **Rejected:** multi-product loot |

Stage 1 also dropped an AMKETTE hub link on Flipkart as junk.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,934 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 359; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 1 (the day is 4 h 44 min old; 3 blog cron runs remain); 10-02: 3; 10-01: 4 |
| Broadcast cursor vs max deal id | File re-read: 12,413 / 12,413 |
| Unpushed commits | 0 before this report |

No rot found.
