# DesiDime tick 2026-10-19i — 2 pushed, IndexNow HTTP 200 (5 urls)

## Funnel
| Stage | Count |
|---|---|
| Discovered (cards) | 36 |
| Product-resolved | 24 |
| Already in DB | 7 |
| Fresh candidates | 17 (16 Amazon + 1 Instamart) |
| PDP price match ±₹1 + in stock | 2 |
| Pushed (bulk count) | 2 (both created:true, both slugs 200) |

## Pushed
| Deal | ASIN | Price / MRP |
|---|---|---|
| SOLARA insulated thermosteel bottle 650ml | B09M7TX2Q5 | ₹540 / 1,999 |
| Butterfly Granza non-stick kadai 280 mm + lid | B07GS317KP | ₹728 / 2,285 |

## Rejected
| Item | Reason |
|---|---|
| Home Stylish bedsheet B0DH2J8ZPM | drift 97→99 |
| Kenstar Nutrino mixer | drift 1140→1199 |
| Pure Air PA1 purifier | drift 3680→3999 |
| Orient I Tome Pro 1400mm fan | drift 2914→3699 |
| Vega Edge helmet | drift 623→676 |
| Japanese Formula massage gel | drift 39→129 |
| Solimo wall clock | drift 171→283 |
| ASUS Vivobook 15 | drift 54490→62990 (repeat) |
| Redmi Pad 2 | drift 13199→17499 |
| Samsung 550L fridge | drift 57390→74990 (repeat) |
| Lenovo Yoga Slim 7 | drift 92490→122990 |
| Acer Iconia Tab10 | drift 16249→18499 (repeat) |
| Karcher K3 | 10349 = bank price, PDP 11499 (repeat) |
| Free Kindle eBooks | multi-product freebie |
| Akshayakalpa cheddar (Instamart) | out of stock, hyperlocal grocery |

## CEO audit
- Posts today (IST): 3 ✓ · coverless 0 · seoless 0
- LIVE 13,298 · null-price 0 · null-image 0 · PENDING_REVIEW 0
- Broadcast cursor 13819 vs max 13821 — gap = this push; external cron picks it up
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all 200 (0.09–0.70s)
- Unpushed commits 0 · CronList 9/9 (verified SITEMON 10-19h)
