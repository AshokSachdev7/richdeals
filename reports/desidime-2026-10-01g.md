# DESIDIME-INGEST — 2026-10-01g

**29 discovered → 12 resolved → 5 already in DB → 7 fresh → 2 pushed LIVE (count 2, created 2/2). IndexNow HTTP 200 for 5 urls.**

## Pushed

| Store | ID | Deal | PDP price | MRP | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|---|
| Amazon | B0H6311BTC | Amazon Basics Pashan Wavy pendant lamp (E14) | ₹440 | ₹1,699 | 74% | 3.9 (2,729) | `?tag=ashoksachdev-21` |
| Flipkart | JCKGHUMKBDX77BFA | PKR SPORTS full-sleeve colorblock men's jacket | ₹458 | ₹2,699 | 83% | 4.0 (5,251) | `affid=djhackraj` |

Verification: Amazon via #centerCol + #availability + add-to-cart in logged-in tab; Flipkart ld+json in Playwright tab (InStock, "Only 9 left" — above the 1-2 reject floor).

## Rejected

- Syska bulb FK BLBG9BGGHBNGMRT2: drift, card ₹378 vs PDP ₹552.
- iFFalcon U75 55" FK TVSHCRFCSR7KUUZJ: price drift.
- UGAOO hose (Bigbasket): no ld+json, unverifiable.
- Tommy Hilfiger watch B0CBCG3B5R: unrated.
- Amazon Basics tap extender B0GZ54J1T4: rating 2.7 (5 ratings).

## CEO audit

- LIVE 11,787 · PENDING 0 · max id 12,265 · null price 0 / null image 0.
- Posts 354, coverless 0, seoless 0. Posts/day IST: 09-29 4, 09-30 4, 10-01 3 (met).
- Broadcast cursor 12,263 < max 12,265 → this batch, external tg-broadcast cron picks it up (self-heals).
- Prod endpoints 7/7 200. Unpushed commits 0 before this report.
- Carry: re-check GSC merchant listings 10-03.
