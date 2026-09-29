# DEAL-INGEST indiafreestuff tick: 2026-09-29f

## Discovery
- Fetched 4 IFS listing pages (home, /deals, ?page=2, ?page=3) at 2.6 s intervals and found 95 slugs, **26 new**.
- Dropped 2 before resolving: Nautica Myntra (sale hub) and Swasa omega-3 (supplement).
- Resolved the base64 `?rto=` links for 24: 22 Amazon, 2 Flipkart.
- DB dedup by productId: 0 already present.

## Verification (every price read on the PDP)
- Amazon was checked in a logged-in tab by reading `#centerCol` (price, M.R.P.), `#availability` and the add-to-cart button.
- Flipkart was checked through ld+json in a Playwright tab.

| Rejected | Reason |
|---|---|
| Birthday décor B0CPCTG2S2 | rating 2.9 |
| Alan Jones pants B0DK22RKQ1 | price drift, card 581 vs PDP 599 |
| BigPlayer dongle B08K5PJ98V | rating 2.6 |
| Geonix RAM B0F1TVNRZM | rating 3.2 |
| Hexon pillow speaker B0H4LGGR1C | price drift, 339 vs 350; rating 1.0 |
| Satyam Kraft flowers B0BQZXBKQQ | only 1 left in stock |
| Chandbali earrings B0H3CD8FVT | ₹1.29 price glitch (100% off) |
| Symbol sweatshirt B097F1LK4B | second colour, near-duplicate of B09B79SY46 |
| VW 8 kg washing machine (FK) | invalid pid, no ld+json |

**Accepted: 15** (14 Amazon + 1 Flipkart), all in stock:
- Alienware AW2726DL 27" QHD 280Hz, ₹21,999
- American Tourister Mystic 70.5 cm, ₹2,899
- HRX Parabola trolley, ₹2,099
- Dr. Fixit Roofseal 10 L, ₹2,819
- Puma R78 Lightwind, ₹1,800
- Zebronics EnergiUPS 4K, ₹1,099
- Vastrachhaya neck massager, ₹998 (time-limited deal)
- Levi's 726, ₹994
- French Connection watch, ₹961
- Lifelong 45W GaN, ₹609
- Symbol kurta ₹519, joggers ₹499, women's sweatshirt ₹399
- Boldfit sliders, ₹399
- Zigma Charm Plus 300 mm wall fan (FK), ₹1,299 (ld+json InStock, M.R.P. ₹3,299)

Copy was rewritten originally from PDP facts only. Images come from m.media-amazon.com and rukmini1.flixcart.com.

## Push
- `/admin/deals/bulk` returned **count 15**, all `created:true`, status live.
- Affiliate links: Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm7fac794d42fe4?pid=…&affid=djhackraj`.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 18 urls (15 slugs + 3) |
| sitemap.xml | 200 (ISR 1800 s) |
| llms.txt | 200, force-dynamic, no new hub |
| Sample deal page | `/zigma-charm-plus-300-mm-high-speed-wall-fan-fangxjv8bzxzf5ab` returns 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,513 = API total (max id 11860) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 345; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 2 |
| Broadcast cursor | 11845 vs max 11860. The gap is this batch waiting for the external tg-broadcast cron (self-heals). |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Note: the first audit run hit P2037 (connection slots full) because it ran 8 counts in parallel against about 22 PG slots. A sequential rerun with `connection_limit=1` worked. It was a tooling issue, not rot in prod.

Result: **15 live, IndexNow 200, 0 rot.**
