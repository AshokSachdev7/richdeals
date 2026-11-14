# DEAL-INGEST indiafreestuff tick — 2026-11-15c

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals`, `?page=2`, `?page=3` and `/deals/superdeals`, and resolved the base64 `?rto=` Buy Now ids. Results:

- 89 cards discovered.
- 75 resolved to a product (all Amazon).
- 14 dropped: 13 Flipkart cards with a null pid and 1 Amazon `/b?node` Rs.1-samples hub.
- 27 fresh by productId, but all 27 are in `data/dd-rejected.json`, rejected 2-6h ago (15a/15b), so all were skipped.
- 48 already in the DB.

Every dup was re-checked on its PDP with an in-tab fetch in the logged-in Amazon tab: `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability` and add-to-cart. There was no captcha on any of the 48. Run at about 05:00 IST.

**Result: 0 pushed (0 fresh). 46 of 47 LIVE dups match their PDP price, 1 row was price-synced (#16579) and 1 MRP was fixed (#9998). All 47 LIVE dups got a priceHistory row, so they now carry a priceValidUntil to 11-29. IndexNow returned HTTP 200 for 50 urls. Prod is 7/7 at 200 and every DB check is green.**

## Pushed

None. Every fresh card was already rejected in the last 24h.

## Dup re-checks

| Row | Deal | Card | PDP | Action |
|---|---|---|---|---|
| #16579 | Panasonic 3W hybrid downlight B0HBPL4KRR | ₹129 | ₹128, M.R.P. ₹320 | **Synced from ₹129 to ₹128 (60% off).** Title and PH row updated. |
| #9998 | NIVEA Cherry Shine lip balm B00791D3QG | ₹125 | ₹125, M.R.P. ₹225 | MRP fixed from ₹240 to ₹225, now 44% off instead of 48%. The title and description carry no MRP. PH row added. |
| #16575 | Skechers Go Run 400 B0DCK42QW6 | ₹1,931 | ₹2,099, M.R.P. ₹4,999 | The DB already has ₹2,099. The card's ₹1,931 is not on the PDP. PH row added. |
| #16518 | Beardo roll-on B0HF87PLV4 | ₹218 | ₹319 | The DB already has ₹319 (synced in 15b). PH row added. |
| #16521 | TAG KBWM1200 B0GX772S3S | ₹645 | ₹654 | The DB already has ₹654. PH row added. |
| #16524 | Buckleless belt B0HPZ1FK5B | ₹264 | ₹263 | The DB already has ₹263. PH row added. |
| #3538 | Bajaj Celesta LED downlight, pack of 6, B0DVGDRFKX | ₹448 | ₹1,033, M.R.P. ₹2,994 | The DB title is already the Bajaj Celesta, so the ASIN was not reused. The card's ₹448 is not on the PDP. PH row added. |
| #15890 | Corsair HS35 v2 B0CX4YC475 | ₹1,220 | No price, no add-to-cart | Stays EXPIRED |
| #16558, #7461, #16190 | Symbol shorts, Ant Esports HDMI, gaming mouse | — | Price matches. 4, 2 and 2 left. | PH rows added. Low stock, re-check next tick. |
| 37 other LIVE dups | — | Card = DB | PDP price matches the DB | Same-price PH row added to each |

IFS card prices lied again on 4 of 48 (#16575, #16518, #3538 and #15890). The PDP is the truth.

Slugs were not changed: `prisma.update` leaves them alone.

## Rejected / skipped

- 27 fresh Amazon cards, all already in `dd-rejected.json` from 15a/15b. They include Q-RIOUS, Lexton, ATHENA, Longway fan, 2 AIRDOPE, Vector X, ASUS, Reebok, a chair, Lenovo, Yogabar, tights, W pants, Groots, TVS helmet, a mirror, Bigbanana, 3 AutoCart, DOMO, 2 Khadi, gulal, Dove and Bajaj Ivora.
- Amazon `/b?node` hub: a category page, not a single product.
- 13 Flipkart null-pid cards:
  - 7 are already in the DB (#16559, #16561, #16563, #16564, #16565, #16586, #16587).
  - 6 are the same carry-over cards judged in 15b: RAPOO NX1600, LIMESTONE HEXA, GAUVIK pendant, TCL 1.5T AC, VEGA Aster helmet and Haier 1.5T AC. Not re-pushed.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 47 verified slugs. It returned **HTTP 200** for 50 urls (47 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.
- The #16579 prod page still shows Offer 129 from its ISR cache. It picks up ₹128 on the next revalidation.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.18s) |
| /offers | 200 (0.09s) |
| /blog | 200 (0.70s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.09s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.58s) |
| #16579 Panasonic deal page | 200 (Offer 129, ISR cache) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,008 = 16,008 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 487, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,587 = 16,587 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 1 so far**. The 06:39 IST CONTENT-SEO run must add the second post.

## Still open

- 11-15 IST has 1 of 2 posts. The 06:39 IST CONTENT-SEO run covers it.
- The same-price confirm paths in the scripts still write no priceHistory row. This tick added 47 rows by hand. The sitewide figure (94.7% of LIVE without priceValidUntil) needs the fix in the IFS dup-sync, desidime, TG and price-sync code.
- Stage 1 still records only Flipkart rejects. Amazon rejects are added by hand.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB, and it lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Low-stock rows to re-check: #16506 Shatras, #16558 Symbol shorts, #7461 and #16190.
- #7751 Nivia football is only 8% off. Expire it if the price has not dropped.
- Amazon reuses ASINs (#2351, #15344). #3538 checked this tick and is clean. Older rows are unchecked.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
