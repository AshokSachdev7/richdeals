# DesiDime tick 2026-10-06c

Stage 1: 34 cards → 18 product-resolved → 3 already in DB → 15 fresh.

## Pushed: 4 (`/admin/deals/bulk` count 4, all created:true, status live, all prod 200)

All four are Shopsy listings. Shopsy has no ld+json, so the price comes from `finalPrice` and stock from the absent Sold Out widget. Affiliate links go through Cuelinks.

| Deal | Price | MRP | Rating |
|---|---|---|---|
| IRU Creation Analog Wall Clock 20 cm (XWAHMSFZSU54NXQH) | ₹170 | ₹999 | 4.0 (2,681) |
| AMK Enterprise Mixer Grinder Jar Combo 400/600 ml (XZYHMM4ZSWGJGNQ7) | ₹344 | ₹999 | 4.0 (32) |
| SHUBHSWAR Georgette Saree (XPSGH3MHVNJ3X4HU) | ₹248 | ₹999 | 4.0 (134) |
| ZIYARAT COLLECTION Women Casual Sandals (SNDHFY5T9HHZ5ZEJ) | ₹165 | ₹999 | 3.8 (138) |

## Rejected: 11

| Candidate | Reason |
|---|---|
| Digihaat pooja thali | Random item, no ld+json |
| THE MAN COMPANY perfume | Cosmetics |
| Ajio Netplay polo ×2 | No ld+json, could not verify |
| Walkaroo flats ×2 | Effectively 0% off |
| RIVARAJ "study table" | The image shows a different product |
| HP backpack | Likely a knock-off listing |
| Ant Esports AE200M | Rating 3.5 |
| BISSELL SpotClean | Price drift: ₹8,810 on the PDP vs ₹7,692 on the card |
| Philips TAT1179 | Rating 3.3 |

## Freshness

- IndexNow: **HTTP 200**, 7 URLs (4 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 2. Rule met (2–3); cap is 4. |
| Coverless posts | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 |
