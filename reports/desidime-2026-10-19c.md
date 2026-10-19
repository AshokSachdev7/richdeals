# DesiDime tick 2026-10-19c — 7 pushed, IndexNow HTTP 200 (10 urls)

## Funnel
| Stage | Count |
|---|---|
| Discovered (cards) | 35 |
| Product-resolved | 24 |
| Already in DB | 5 |
| Fresh candidates | 19 (all Amazon) |
| PDP price match ±₹1 + in stock | 7 |
| Pushed (bulk count) | 7 (all created:true, all slugs 200) |

## Pushed
| Store | Deal | Price / MRP | Affiliate |
|---|---|---|---|
| Amazon | Nippo ZEN 1200mm BLDC fan B0H87SLQ1D | ₹2,249 / 4,999 | tag=ashoksachdev-21 |
| Amazon | POND'S Bright Beauty day cream 35g B077ND8562 | ₹121 / 199 | tag |
| Amazon | Ethiglo foam face wash B01MT6LNNQ | ₹399 / 520 | tag |
| Amazon | Luxor 5-subject B5 notebook B00LHZW91A | ₹162 / 270 | tag |
| Amazon | Visio World 24" QLED TV B0H5R6C68N | ₹5,299 / 12,999 | tag |
| Amazon | Safari Genius Theo trolley set of 2 B0FNDDMQTC | ₹2,482 / null | tag |
| Amazon | SS utensil dish rack B0CLVGZBSG | ₹199 / 699 | tag |

## Notes
- Safari MRP ₹16,798 nulled (implied 85% off ≥80% rule).
- Images = hiRes keyed by landingAsinColor (Safari Pearl Blue, Nippo Smoky Brown) — match.

## Rejected
| ASIN | Reason |
|---|---|
| B00HN6J6N6 Kiwi sponge | ₹92 vs MRP 95, 3% off — not a deal |
| B0BSWMZ76G Body Cupid | drift 880→921 |
| B0GLYN8DK3 Dylect pump | drift 3499→4999 (SBI CC price) |
| B095CRM8NF Derma Co sunscreen | drift 338→384 |
| B07DX1H6JW Mee Mee brush | drift 168→183 |
| B07L6GZYDV Wakefit pillow | drift 686→717 |
| B00RAEXL0K Wakefit mattress | drift 9680→11853 |
| B0748GD9DD JPG Scandal | drift 6279→7770 |
| B0GMJ4S7RY Galaxy Buds4 Pro | drift 15149→17399 |
| B0C2Z5SQN9 GOVO soundbar | drift 5580→6199 |
| B0H6Q4B3BH Lenovo IdeaPad | drift 64990→74990 |
| B0H2FD3L97 Lenovo Idea Tab | drift 27999→32999 |

## CEO audit
- LIVE 13241, null price 0, null image 0, PENDING_REVIEW 0.
- Posts today (IST) 3; coverless 0, seo-less 0.
- Broadcast cursor 13758 vs maxDealId 13765 — the 7 new deals; external cron picks them up.
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all 200 (0.14–0.81s).
- Crons 9/9 vs roster. Unpushed commits 0.
