# DesiDime tick 2026-10-07c (12:49 IST)

Stage 1 (`ingest-desidime.mjs`): 27 cards discovered. 14 were dropped as junk or other-store sale hubs (Ajio curated sales and similar). 10 resolved to a single product, 1 was already in the DB, and 9 were fresh (8 Amazon, 1 Myntra).

## Pushed: 2 (`/admin/deals/bulk` count 2, both created:true, status live, prod 200)

| Deal | Price | MRP | Rating | Affiliate |
|---|---|---|---|---|
| HMD Gaming Outfit for HMD Fusion, 18-button gamepad (B0DJR4FJZ4) | ₹522 | ₹4,999 | 3.6 (219) | Amazon tag |
| Jockey kids' cotton knee-length socks, pack of 2 (Myntra 30238770) | ₹131 | ₹219 | 4.1 (15) | InRDeals |

- **HMD:** the Amazon PDP (same-origin fetch in the logged-in tab) shows ₹522, In stock, with add-to-cart present. The copy says it fits the HMD Fusion only (Smart Pins).
- **Jockey:** Myntra ld+json `discountedPrice` is 131, matching the card. Only size 5-6Y was in stock (54 units), and the copy says so.

## Rejected (7)

| Candidate | Reason |
|---|---|
| Porpoise courier bags (B0F3JRPZBG) | Price drift: ₹5,199 on the PDP vs ₹1,206 on the card; 4 ratings |
| Sparkmate scrub pad (B0C77HBQTB) | FMCG / consumable |
| Rupa Jon trunk (B074VD5PV7) | Price drift: ₹339 vs ₹175; rating 3.4 |
| Lapcare Surgee 5 strip (B0CRB4H72S) | No buy box |
| AmazonBasics condenser mic (B0DCW64ZYK) | Only 1 left; rating 3.4 |
| Safety jacket (B0D6GSZRHW) | No buy box |
| Fire-Boltt Solaris (B0C5CZFKR7) | No buy box |

## Freshness

- IndexNow: **HTTP 200**, 5 URLs (2 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (12:49 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **1** (AMOLED vs TFT, 12:09 run). The 18:09 BLOG run brings it to 2. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,166 (12,164 + 2) |
| Broadcast cursor | 12649 = DB max 12649 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
