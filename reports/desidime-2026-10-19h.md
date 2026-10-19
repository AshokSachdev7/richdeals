# DesiDime tick 2026-10-19h — 5 pushed, IndexNow HTTP 200 (8 urls)

## Funnel
| Stage | Count |
|---|---|
| Discovered (cards) | 38 |
| Product-resolved | 27 |
| Already in DB | 9 |
| Fresh candidates | 18 (17 Amazon + 1 Bigbasket) |
| PDP price match ±₹1 + in stock | 5 |
| Pushed (bulk count) | 5 (all created:true, all slugs 200) |

## Pushed
| Deal | ASIN | Price / MRP |
|---|---|---|
| GRAPHENE RC fighter jet toy | B0HFWZLDDF | ₹1,099 / null |
| Philips 40W B22 LED bulb | B01KAFDKPQ | ₹217 / 1,050 |
| Presto! Clean spin mop + 2 refills | B0F8C6XLDF | ₹839 / 2,299 |
| Crompton Surebreeze Sea Sapphira 1200mm fan | B0GC54GBWJ | ₹1,549 / 2,599 |
| Consistent Voltedge 450W SMPS | B0GNMF2331 | ₹719 / 2,350 |

GRAPHENE MRP ₹7,999 nulled (implied 86% off, ≥80% rule). All tag=ashoksachdev-21; images = colour-keyed hiRes.

## Rejected
| Item | Reason |
|---|---|
| Lacto Calamine wipes (Bigbasket) | hyperlocal grocery |
| Solimo wall clock B0CFY4LDYG | 171→219 + different variant |
| CELLBELL C190 chair | drift 3959→4399 |
| Carrier 1.5T AC | drift 39240→44990 |
| ASUS Vivobook 15 | drift 54490→62990 |
| Samsung 65" Mini LED TV | no price / no ATC |
| Midea 1.36T AC | drift 25490→31490 |
| iPhone 18 Pro 256GB | drift 158900→164900 |
| Redmi Pad 2 | drift 13899→17499 |
| Samsung 550L fridge | drift 57390→74990 |
| Lenovo Yoga Slim 7 | drift 92490→114990 |
| Acer Iconia Tab10 | drift 16249→18499 |
| Karcher K3 | 10349 = bank price, PDP 11499 |

## CEO audit
- LIVE 13,269 · null-price 0 · null-image 0 · PENDING_REVIEW 0 · max id 13793
- Posts today (IST) 3 ✓ · coverless 0 · seoless 0
- Broadcast cursor 13788 vs max 13793 — gap = this batch, external cron picks it up
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all 200 (0.11–0.58s)
- Unpushed commits 0 · CronList 9/9 vs roster
