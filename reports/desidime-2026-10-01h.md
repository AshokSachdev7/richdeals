# DESIDIME-INGEST — 2026-10-01 (16:48 IST)

**30 discovered → 18 resolved → 5 already in DB → 13 fresh → 3 script-level skips → 10 verified → 5 pushed LIVE. Count 5, created 5/5. IndexNow HTTP 200 for 8 urls.**

## Pushed

| ID | Deal | Store | PDP price | MRP | Off | Rating |
|---|---|---|---|---|---|---|
| B0CNQ75PC8 | EvoFox Spectre wired RGB gaming mouse | Amazon | ₹289 | ₹799 | 64% | 4.4 (2,658) |
| B0CQ1Y7KHV | Intel Core i5-14400F (10C/16T) | Amazon | ₹16,499 | ₹47,999 | 66% | 4.3 (664) |
| B0H62QB76G | Amazon Basics Warli Whispers blue table lamp | Amazon | ₹901 | ₹3,099 | 71% | 4.0 (113) |
| B0FKY5MFPS | Milton Marvel Kool Elite 400 kids bottle | Amazon | ₹123 | ₹245 | 50% | 3.8 (280) |
| BATH89BBYWSZEAE9 | HRSGS Hitman tennis-ball cricket bat (12–14 yrs) | Shopsy (Cuelinks) | ₹256 | ₹1,199 | 79% | 3.9 (8,087) |

Amazon: #centerCol price + #availability + add-to-cart in logged-in tab. Shopsy: ld+json offers.price / InStock; DesiDime `mcn`/`cmpid` params stripped before the Cuelinks wrap. EvoFox copy uses the PDP DPI steps (max 3600), not the card's "7200 DPI" claim.

## Rejected

- Script: Scapia credit card (card promo, no ld+json); Redmi Note 14 Pro+ FK and iFFalcon U75 FK (price drift).
- Drift >₹1: OnePlus Watch 2R (card ₹8,999 → PDP ₹9,999), ATH-M20x (₹3,949 → ₹3,999), Mafatlal bedsheet (₹449 → ₹699), Canon G3000 (₹12,403 → ₹13,781, no MRP).
- Health claim: blestaaa Amla Reetha anti-hair-fall shampoo (Shopsy; price ambiguous ₹159/₹213).

## CEO audit

- LIVE 11,792 · PENDING 0 · max id 12,270 · null price 0 / null image 0.
- Posts 354, coverless 0, seo-less 0. Posts/day IST: 09-29 4, 09-30 4, 10-01 3 (met).
- Broadcast cursor 12,265 < max 12,270 → this batch; external tg-broadcast cron picks it up (self-heals).
- Prod endpoints 7/7 200 (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals).
- Unpushed commits 0 before this report. 0 rot.
