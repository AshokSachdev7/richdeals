# DESIDIME-INGEST — 2026-10-01 (18:48 IST)

**33 cards → 13 junk/off-host dropped → 14 resolved → 1 already in DB → 13 fresh → 3 dropped by stage 1 for price drift → 10 verified → 4 pushed LIVE (1 Flipkart + 3 Shopsy). Bulk count 4, created 4/4. IndexNow HTTP 200 for 7 urls.**

## Pushed

| Store | PID | Deal | Live price | MRP | Off | Rating | Verified via |
|---|---|---|---|---|---|---|---|
| Flipkart | DKOHBFBJCSWWHGKK | MGKENTERPRISE 5-compartment storage trolley | ₹344 | ₹1,499 | 77% | 4.2 (8,162) | ld+json in Playwright, InStock |
| Shopsy | XSPGHZWFDD57N2JM | aob 35L water-resistant backpack | ₹276 | ₹1,499 | 82% | 3.8 (223) | ld+json via curl, InStock |
| Shopsy | TEKGMZSFX2XYPGMN | VYORA transparent pouch set of 4 | ₹220 | ₹1,499 | 85% | 4.3 (424) | ld+json via curl, InStock |
| Shopsy | XUMHD76TEXPS5F7T | Orange 2-fold silver-coated umbrella | ₹200 | ₹1,299 | 85% | 4.2 (88) | ld+json via curl, InStock |

Affiliate links: Flipkart uses `affid=djhackraj` (salescueli params stripped). Shopsy goes through Cuelinks, with the DesiDime `mcn`/`affid`/`cmpid` params stripped. All deals have original copy.

## Rejected

| Product | ID | Reason |
|---|---|---|
| Bajaj Reflecta 15L geyser | B0D49RC7DT | PDP price ₹8,599 vs card ₹7,740 (drift), and only 1 left |
| LAPCARE Lapcam 720p | B08CRVVWYV | PDP price ₹799 vs card ₹760 (drift) |
| Van Heusen turtleneck | B09VBXJDMJ | No add-to-cart and no price (unavailable) |
| Wonderchef air purifier | B0BHZ7LDMM | No add-to-cart, 3 ratings |
| AMERICANVIBER watch (Shopsy) | XWWHDBKGU3A2JB9D | Rating 3.5 (≤3.5 rule) |
| Canon G3000 | B07XH8GC5P | No MRP (rejected again, same as 10-01h) |
| LG 1.5T AC / Acer Aspire 14 / Redmi Note 14 Pro+ | FK | Price drift, flagged by stage 1 |
| Stage-1 drops (13) | — | App promos (Bajaj, Cred), gotrackier, Wonderchef `/s?` search, DesiDime FK landing page (Kenstar), Mijia FK, and others |

## CEO audit (18:48 IST)

| Check | Result |
|---|---|
| LIVE deals | 11,796 |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Max deal id | 12,274 |
| Broadcast cursor | 12,270, behind max by this batch of 4. The external tg-broadcast cron catches it up on its own. |
| Posts | 355, all with covers and SEO fields (0 coverless, 0 seo-less) |
| Posts per day (IST) | 09-23: 2, then 3–4 every day; 10-01: 4 (cap) |
| Endpoints | 7/7 return 200; new deal page returns 200 |
| Unpushed commits | 0 before this report |

No rot found.
