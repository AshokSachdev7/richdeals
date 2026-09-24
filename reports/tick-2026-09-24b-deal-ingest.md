# DEAL-INGEST indiafreestuff tick — 2026-09-24b (11:11 UTC / 16:41 IST)

**Published: 11 deals LIVE** through `/admin/deals/bulk`. The response was `count:11` with all 11 rows `created:true`, and each read back as LIVE (ids 10990–11000).
IndexNow: **HTTP 200 for 14 URLs** (11 slugs + 3 hub paths).

## Funnel
| Stage | Count |
|---|---|
| Cards on /deals + /deals/superdeals (2.6s gap, no 403/429) | 68 |
| Not seen in earlier ticks | 61 |
| Left after the junk filter | 44 |
| Resolved to a single product (base64 `?rto=`) | 18 |
| Fresh after productId dedup against the DB | 17 |
| Published after the PDP check | **11** |

- **Junk filter (17 dropped):** hub "upto N% off" pages, credit cards, gift cards, coupons, Myntra BFF, early-bird offers, the HDFC quiz, min-buy multipacks, select-pincode offers and the kemei trimmer hub.
- **Resolve:** 26 Buy Now links landed on Flipkart `dl/indiafreestuff?pid=` pages with no `/p/itm` path, so they were dropped. The 18 real products were 16 Amazon ASINs, 1 Myntra link and 1 Flipkart itm link.
- **Dedup:** B07KSPKVGL (Wild Stone face wash) was already LIVE.

## Published
| Product | ASIN | Price | MRP | Off |
|---|---|---|---|---|
| Orient Ventilator DX 200mm exhaust fan | B01AT95TJS | 1139 | 1730 | 34% |
| Lavie Rex satchel handbag (only 1 left) | B08Z83Y2N5 | 999 | 3999 | 75% |
| SHARP EM-S34N-W 300W stand mixer | B0B7GCYJN1 | 2599 | 13200 | 80% |
| Parker Jotter Originals ball pen, yellow | B0CQ556CGW | 221 | 380 | 42% |
| Ant Esports ALS05 laptop stand | B0CQXMY5RG | 220 | 1499 | 85% |
| Puma Kardio slip-on sneaker (only 5 left) | B0D41CW6YP | 1350 | 4499 | 70% |
| E GATE C212 20W Bluetooth speaker | B0DC73VHG5 | 790 | 2100 | 62% |
| Kamiliant Savvy 55cm cabin trolley | B0F29HX8Z7 | 1299 | 8500 | 85% |
| SLEEPSPA 3-fold 3" single foam mattress | B0FLYFXZNY | 3625 | 4200 | 14% |
| Stainless steel dish drying rack | B0GHFBNVSM | 100 | 699 | 86% |
| Kamiliant Ather 55cm cabin trolley | B0H3L1QMW9 | 1349 | 8700 | 84% |

## Rejected after the PDP read
| Product | Reason |
|---|---|
| Nike deo (B07S493VBS) | card ₹192, live ₹618 (drift) |
| Sony WF-C710N (B0DWH4F1CJ) | card ₹3,575, live ₹8,490 (drift) |
| EVM mouse (B0G1MVCH7W) | card ₹179, live ₹199 (drift) |
| Impulse rucksack (B0D5RBBNHZ) | currently unavailable |
| Myntra Pepe Jeans sneakers (30440976) | card ₹1,299, live ₹1,399, and most sizes unavailable |
| Flipkart MacBook Neo 256GB | the ₹63,900 price needs an ICICI/Axis credit card |

## Gates
- Title ₹ equals price, and price is below MRP.
- Images are hi-res from `m.media-amazon.com`.
- Descriptions are original, ≥900 chars, with no copy from the source. Unverifiable specs were left out: the dish rack weight, the Ather wheel count (title and bullets disagree), and Lavie details, since the listing has no bullets.
- Each deal has 4 howTo steps. The percentage line matches `discountPct`.
- Affiliate: Amazon `?tag=ashoksachdev-21`. Script: `apps/api/scripts/push-ifs-0924b.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10653, EXPIRED 259, max id 11000, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 325 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=1. It is 16:41 IST, so the 18:09 IST CONTENT-SEO run has not happened yet. It must add 1–2 posts; the next audit checks this.
- **Broadcast cursor:** re-read the file. lastId is 10989 against a max of 11000, a gap of exactly this batch. The external cron drains 5 per run, so it self-heals.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.
