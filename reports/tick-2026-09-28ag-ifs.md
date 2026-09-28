# IFS ingest tick 2026-09-28ag (~10:34 IST)

**Result:** 10 new deals pushed LIVE (`count:10`, all `created:true`). IndexNow returned **HTTP 200 for 13 URLs** (10 slugs + 3).

## Discovery
- Sources: homepage plus `/deals?page=1..3`, 2.6s apart, all 200. That gave 106 slugs, of which 16 were new against the seen list.
- Every Buy Now `?rto=` link was resolved from the `btn-primery buy_now` anchor, 2.6s apart.

## Pushed (every price verified on the PDP)
| Store | Product | Price | M.R.P. | Off |
|---|---|---|---|---|
| Amazon | Symbol men's stretch chino shorts (B07TLN5NRS) | ₹449 | ₹1,999 | 78% |
| Amazon | HMD 100 keypad phone (B0G1M5GC77) | ₹899 | ₹1,099 | 18% |
| Amazon | Luxor Schneider LX Glider pens, pack of 3 (B0CL9CJD6T) | ₹126 | ₹180 | 30% |
| Amazon | Screaming Monster fidget toy (B0HKWL81JZ), plus a 35% coupon | ₹299 | ₹899 | 67% |
| Amazon | Crossbody sling chest bag (B0HBBB5551) | ₹499 | ₹999 | 50% |
| Amazon | Stone crystal plating agent (B0HL4Z6BMF) | ₹149 | ₹799 | 81% |
| Amazon | Universal travel adaptor with surge protection (B0HFK5V826), plus a 25% coupon | ₹379 | ₹499 | 24% |
| Amazon | Urban Wipe kitchen cleaner spray (B0CLTWHF13) | ₹174 | ₹299 | 42% |
| Flipkart | Midea 7.5 kg top-load washing machine (WMNHMPFFZCUBPDQC) | ₹10,490 | ₹19,990 | 47% |
| Flipkart | Nakpro Perform whey 1 kg coffee (PSLG5RMQBJCAZE5A) | ₹2,089 | ₹3,600 | 42% |

**How each deal was checked:**
- **Affiliate links:** Amazon uses `?tag=ashoksachdev-21`. Flipkart uses `/p/itm…?pid=…&affid=djhackraj`. Their tags (`dealhind-21`, `adminpais` + `affExtParam*`) were stripped.
- **Images:** marketplace CDN only.
- **Dedup:** all 10 productIds were absent from the DB before the push.
- **Flipkart gotcha:** the IFS Flipkart links use `pid=itm…`, which is an item id, not a pid. It renders a generic page. `/x/p/itm…` resolves to the real product and its ld+json.

## Skipped (6)
| Item | Reason |
|---|---|
| Bellavita soaps "upto 40%" | Category post |
| Cantabil men's "upto 73%" (Myntra) | Category post |
| Cantabil women's "upto 71%" (Myntra) | Category post |
| Mysuru filter coffee 100g | Grocery |
| Puma PL Neo Cat sneakers (B0D6VV2FZ8) | "Currently unavailable", no add-to-cart |
| Arto bath mat (B0BQZVJCPN) | ₹379 with no M.R.P. or discount on the PDP, so not a deal |

## Freshness
- **IndexNow:** 200.
- **Spot check:** the new deal page returns 200.
- **sitemap.xml:** ISR, 30 min at worst.
- **llms.txt:** force-dynamic.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,296 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 341 |
| Posts per day (IST, 09-19 → 09-28) | 1/2/1/3/2/3/4/4/4/2. Never 0. |
| Broadcast cursor | 11638 vs DB max 11643. This is the batch just pushed; the external cron picks it up. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |

**Watch:** 09-28 IST has 2 posts. The next BLOG tick should add 1–2, keeping the day at 4 or fewer.
