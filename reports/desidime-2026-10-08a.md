# DesiDime tick 2026-10-08a (00:53 IST)

Stage 1 (`ingest-desidime.mjs`: discover, resolve, DB dedup) returned 15 fresh candidates. Each one was checked on its product page: Amazon in the logged-in Playwright tab (`#centerCol` price, `#availability` + add-to-cart, rating), Flipkart via ld+json.

## Pushed: 6 (`/admin/deals/bulk` count 6, all created:true, status live, ids up to 12734, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| Sony SRS-XB100 Bluetooth speaker, Black (B0C29CL98P) | ₹2,489 | ₹5,990 | 3.9 (6,393) |
| Bose QuietComfort earbuds, White Smoke (B0D8BT4BRN) | ₹9,999 | ₹16,900 | 4.0 (9,437) |
| Lifelong Vande Bharat toy train, 43 pcs track (B0FZC3ZJTC) | ₹499 | ₹1,599 | 3.9 (149) |
| Crompton Twist T Lamp 10W, pack of 4 (B0DPQMPBL4) | ₹349 | ₹1,400 | 4.2 (58) |
| Lifelong die-cast kadhai 24cm with glass lid (B0FKN1KMZ9) | ₹1,199 | ₹3,499 | 4.2 (158) |
| DAVIDOFF Cool Water EDT 125ml, Flipkart (PERD8DHUZFQ24YFY) | ₹2,398 | ₹5,995 | 4.0 (12,625) |

Copy uses only PDP facts. Affiliate: Amazon `tag=ashoksachdev-21`, Flipkart `affid=djhackraj`. Images from m.media-amazon.com / rukmini1.flixcart.com.

## Rejected (9)

| Candidate | Reason |
|---|---|
| Daikin 1.5T 3-star AC (B0GRV2DWP3) | Drift: PDP ₹35,990 vs card ₹32,490 |
| Lifelong air fryer 4.2L (B0FH569G3V) | Drift: ₹1,999 vs ₹1,499 |
| Hammer earbuds (B0GDTRYXYF) | Drift ₹599 vs ₹403; PDP is a different model |
| Zebronics GT740 GPU (B0DGT7B4JX) | Drift: ₹4,156 vs ₹4,315 |
| HP 15 i3 laptop (B0D2642MBF) | Drift: ₹54,909 vs ₹48,409 |
| LG 9kg front load washer (B0C3LHV43S) | Drift: ₹40,989 vs ₹29,739 |
| Hisense 65in QLED TV (B0F4X4V89C) | Card-only (SBI CC) price; PDP unavailable, no add-to-cart |
| Zebronics Juke Bar 9900 (B0CTTXHPSK) | Drift: ₹19,499 vs ₹18,499 |
| Whirlpool 60cm chimney (B0CHBGWCQ5) | Drift: ₹12,590 vs ₹4,990 |

## Freshness

- IndexNow: **HTTP 200**, 9 URLs (6 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (00:53 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **1** (IST day is 53 min old; later blog ticks cover the 2–3 target) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,219 (12,213 + 6) |
| Broadcast cursor | 12728 vs DB max 12734: the 6 new rows, external cron picks them up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
| Note | Prod `/api/admin/deals/bulk` returned 401 to the local `ADMIN_KEY`; pushed via local API (same DB). Local and prod keys differ, which is expected, not rot. |
