# DESIDIME-INGEST — 2026-10-01 (22:46 IST)

**33 cards → 13 junk/off-host dropped → 14 resolved → 2 already in DB → 12 fresh → 4 skipped by stage 1 → 8 checked → 3 pushed LIVE (2 Amazon + 1 Myntra). Bulk count 3, created 3/3. IndexNow HTTP 200 for 6 urls.**

## Pushed

| Store | ID | Deal | Live price | MRP | Off | Rating | Verified via |
|---|---|---|---|---|---|---|---|
| Amazon | B0CNLK7X34 | ANT Esports Flora digital body weighing scale (180 kg) | ₹289 | ₹2,199 | 87% | 4.2 (1,479) | #centerCol, In stock + ATC |
| Amazon | B0CBC75NLW | MAHARAJA plastic chair set with arm rests | ₹2,619 | ₹6,999 | 63% | 4.1 (185) | #centerCol, In stock + ATC |
| Myntra | 72957050159b | Mast & Harbour polo collar T-shirt | ₹160 | ₹1,499 | 89% | 4.3 (1,382) | ld+json via curl, InStock |

Affiliate links:
- Amazon: `tag=ashoksachdev-21`; the `desidime01-21` tag and `ascsubtag` were stripped.
- Myntra: InRDeals track URL wrapping the clean PDP; `/buy?shared=true` was dropped.

All deals have original copy. The new deal page returns 200.

## Rejected

| Product | ID | Reason |
|---|---|---|
| OnePlus N6x 4/64 | B0H7SB1JH7 | PDP ₹20,999 vs card ₹17,499 (drift; the card price likely includes a bank offer) |
| OnePlus N6 Lite (upcoming) | B0HBPNBC7B | PDP ₹16,999 vs card ₹14,749 (drift) |
| Sony BRAVIA 2M2 55" | B0F7XBC3J6 | No add-to-cart, no price |
| Canon PIXMA G3000 | B07XH8GC5P | PDP ₹13,781 vs card ₹12,403 (drift), and no MRP. Fourth reject today. |
| skyberry floor cleaner 3×1L (FK) | BCRHRC75FYZUVQK4 | Price ₹248 matched, but there is no aggregateRating (unrated) and the listing allows no returns |
| Mast & Harbour off-shoulder top (Myntra) | b5c6a9468730 | Price drift, flagged by stage 1 |
| LG AC / Acer Aspire 14 (FK) | — | Price drift, flagged by stage 1 (repeat) |
| Agatti sauf (Digihaat) | — | Food, and no ld+json |
| Stage-1 drops (13) | — | CRED, Amazon Pay rewards, Flipkart Plus login pages, Magicpin app, and others |

## CEO audit (22:46 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,799 (+3) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Max deal id / broadcast cursor | 12,277 / 12,274. The gap is this batch of 3; the external tg-broadcast cron catches it up on its own. |
| Posts | 355; 0 coverless, 0 seo-less |
| Posts per day (IST) | 09-25 → 10-01: 4 each (10-01 at cap) |
| Unpushed commits | 0 before this report |

No rot found.
