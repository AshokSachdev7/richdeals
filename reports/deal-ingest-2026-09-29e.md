# DEAL-INGEST indiafreestuff tick: 2026-09-29e (08:36 IST)

## Discovery
- Fetched 4 IFS listing pages at 2.6 s intervals and found 95 slugs, **18 new**.
- Dropped 1 before resolving: `campus-sneakers-upto-65-off`, a sale hub.
- Resolved the base64 `?rto=` links for 17 deals: 11 Amazon, 6 Flipkart.
- DB dedup by productId: B0B61DSF17 (beatXP scale) was already LIVE as id 987 and was dropped.

## Verification (every price read on the PDP)
- Amazon was checked in a logged-in tab by reading `#centerCol`, `#availability` and the add-to-cart button. No PDP showed a coupon.
- Flipkart was checked through ld+json in a Playwright tab. Every Flipkart product was InStock.

| Deal | Card | PDP | Verdict |
|---|---|---|---|
| Symbol cotton formal shirt | 519 | 519 | **accept** (3.8, 14,563) |
| Assembly Vintage 24" trolley | 5499 | 5499 | **accept** (4.3) |
| Havells Adonia-i 15 L geyser | 12092 | 14342 | reject: price drift |
| Lifelong 12" step stool | 459 | 459 | **accept** |
| Lifelong 3-in-1 mosquito racket | 699 | 699 | **accept** (4.0, 329) |
| Lifelong foldable storage box | 999 | 999 | **accept** |
| Lifelong air blower | 2399 | 2399 | reject: rating 3.2 |
| Lifelong J-shaped pregnancy pillow | 1348 | 1348 | **accept** |
| Safari Broadway set of 3 | 5899 | 5899 | **accept** (4.2, 833) |
| CP Plus 4MP PTZ (FK) | 4427 | 4437 | reject: price drift |
| CP Plus CP-E21Q (FK) | 2399 | 2399 | **accept** |
| CP Plus CP-E31Q (FK) | 2699 | 2699 | **accept** (3.9, 87) |
| CP Plus E34Q (FK) | 2688 | 2698 | reject: price drift, rating 3.0 |
| CP Plus E38Q (FK) | 2887 | 2897 | reject: price drift |
| Dollar Bigboss brief (FK) | 199 | 199 | **accept**; the pack-of-3 claim was dropped because the PDP does not state it |
| Kenstar AeroTik Max table fan (FK) | 1185 | 1185 | **accept** |

- Copy was rewritten originally, using only PDP facts.
- Images come from m.media-amazon.com and rukmini1.flixcart.com.

## Push
- `/admin/deals/bulk` returned **count 11**, all `created:true`, status live.
- Affiliate links: Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 14 urls (11 slugs + 3) |
| sitemap.xml | 200 (ISR 1800 s) |
| llms.txt | 200, force-dynamic, no new hub |
| Sample deal page | `/kenstar-aerotik-max-300mm-high-speed-table-fan-fanhh8h2nxhrtarn` returns 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,497 = API total (max id 11844) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 345; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 2 |
| Broadcast cursor | 11833 vs max 11844. The gap is this batch waiting for the external tg-broadcast cron (self-heals). |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **11 live, IndexNow 200, 0 rot.**
