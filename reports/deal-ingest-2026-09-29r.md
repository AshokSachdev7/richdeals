# DEAL-INGEST indiafreestuff tick: 2026-09-29r (14:40 IST)

## Discovery
- Fetched 4 IFS listing pages at ≥2.5 s intervals (all HTTP 200): 105 slugs, **40 new**.
- Dropped 3 before resolving: salve serum (health claim), LuvLap colic (baby health), Tokyo Talkies (vague listing).
- Resolved 37 base64 `?rto=` links: 29 Amazon, 3 Flipkart, 5 Myntra.
- Skipped before verification: Lifelong yoga mat SMTHJ7YWFDCNPF6H and Milton B0CKZ29C5V (already in DB), Milton green B0CKZ4BBKF (colour near-dup), Voltas B0FR9TXR73 (Axis card-only price).

## Verification (every price read on the store page)
- Amazon: logged-in tab, same-origin PDP fetch (`.priceToPay .a-price-whole`, savings %, `#availability`, add-to-cart, rating, clip coupon).
- Flipkart: ld+json in a Playwright tab.
- Myntra: `pdpData` (discounted, mrp, stock, rating).

| Rejected | Reason |
|---|---|
| Symbol chino B0B397T5NG, Pepe B0GP884774 | 1–2 left, rating ≤3.5 |
| FCUK B0FTV6S8HS, pressure pot B0FH6NDXF6, Puma Softride B0DJBZL8SB | only 1 left |
| Bata B0G5PJ1WCN, Cantus tent B0GVPC2YXV, Mischief B0H1QGZXQW | 1–7 ratings |
| DR.RASHEL B0H8NMH1K6, notice board B0GQJNZHPH | no ratings (board also had no image) |
| Cutting Edge B09W2WY1GH, Lexton B0BB9MR4F8, Fashion Colour B094SKV9PS | rating 3.0–3.4 |
| Khwaish bedsheet (FK) | drift, card 121 vs PDP 213 |
| DK men 24281060 (Myntra) | rating 3.2 |
| Nike hoodie 20073216 (Myntra) | dup of 31178218; card 1,478 was a coupon price vs 1,848 |

**Accepted: 17** (12 Amazon, 2 Flipkart, 3 Myntra), all in stock:
- Mokobara Sunflower Tote 18 L ₹6,499 · AstroAI clamp meter ₹2,149 · 6-inch cordless mini chainsaw ₹1,999
- Puma R78 Lightwind ₹1,800 · Red Tape women's slip-on ₹1,234 · PrettyKrafts 60 L laundry basket ₹1,147
- Dahua 2 MP dome camera ₹980 · BlissClub capris ₹849 · Lavie Emberlyn sling ₹849
- Essoti 75% shade net ₹395 · Machado cleaver ₹349 · USB milk frother ₹197
- American Tourister Valex 17" backpack (FK) ₹849 · Liv Plus LED temp flask (FK) ₹154
- Nike Jordan Brooklyn hoodie (Myntra) ₹1,848 · Daniel Klein DK.1.13219-6 (Myntra) ₹1,800 · Daniel Klein DK.1.12696-6 (Myntra) ₹1,200

Clip coupons (chainsaw 7%, AstroAI/Dahua/Machado 2%) are mentioned in the copy; the stored price is the pre-coupon PDP price.
Copy was written originally from PDP facts only. Images come from m.media-amazon.com, rukmini1.flixcart.com and assets.myntassets.com.
American Tourister exposes no `/p/itm…` slug path (canonical is `/p/p/itm?pid=`), so it uses the generic `/p/p/itm?pid=…&affid=djhackraj` URL, which one existing deal already uses and which returns 200.

## Push
- `/admin/deals/bulk` returned **count 17**, all `created:true`, status live.
- Affiliate: Amazon `?tag=ashoksachdev-21`; Flipkart `?pid=…&affid=djhackraj`; Myntra → InRDeals `inr678975705`.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 20 urls (17 slugs + 3) |
| sitemap.xml | 200 (ISR 1800 s) |
| llms.txt | 200, force-dynamic, no new hub |
| Sample deal page | `/nike-jordan-brooklyn-fleece-mens-pullover-hoodie-31178218` returns 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,553 = API total (max id 11900) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 346; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 3 |
| Broadcast cursor | 11883 vs max 11900: this batch is waiting for the external tg-broadcast cron (self-heals) |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **17 live, IndexNow 200, 0 rot.**
