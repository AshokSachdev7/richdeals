# DESIDIME-INGEST tick — 2026-11-17f

The tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`: listing cards only, JUNK/GROCERY filters, `visit.desidime.com` resolve). It then read every fresh and dup Amazon candidate in the logged-in Playwright tab (richDeals profile), deduped by productId against the live DB, price-synced the dup LIVE rows, and pushed the fresh deals `status:live` to `http://localhost:4000`. Run at about 10:15–10:52 IST.

**Result: 5 new deals pushed LIVE (#16729–#16733), and 6 dup LIVE rows price-synced to the PDP. IndexNow returned HTTP 200 for 14 URLs. Every CEO-audit check is green, and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards read (`/new` + homepage) | 37 |
| JUNK / GROCERY dropped | 12 |
| Outbound resolved | 20 |
| Dup of a LIVE row | 7 |
| Rejected in the last 24 h | 5 |
| Fresh | 8 |

The script also dropped Preethi and Allo (Flipkart `/a/p/b` landing), Allen Solly (`/s?` search), Ketikoe (category page) and Mobikwik (app link).

## 24h rejects

Klook, Crompton FlameStar (B0F3J89F8L), Lloyd AC (ACNHMRG29GVDTDXD), VIP Bonus (B09YV753WH) and Dettol (CBKHEPQZ8ARJZHGG) were all rejected in an earlier tick within 24 h, so they were not re-read.

## Fresh deals

| Id | Product | Card | PDP | Action |
|---|---|---|---|---|
| 16729 | Wipro 3-way multiplug adaptor with surge protection, 6 A (B08GMDSVC3) | ₹323 / ₹1,800 | ₹323, in stock | Pushed LIVE at ₹323. 82% off is ≥80%, so the M.R.P. was nulled. |
| 16730 | MAGIK Maximo Plus 9 W LED bulb, cool white, B22 (B0CBC42JMS) | ₹53 / ₹155 | ₹49.75 / M.R.P. ₹155, in stock | Pushed LIVE at ₹50 (68% off) |
| 16731 | Creative's Early Puzzles, numbers 1 to 5, water animals (B00WKM9SLI) | ₹101 / ₹225 | ₹101 / M.R.P. ₹225, in stock | Pushed LIVE at ₹101 (55% off) |
| 16732 | Softouch 2-ply kitchen tissue roll, pack of 6 (B0CWDV5CRJ) | ₹194 / ₹489 | ₹194 / M.R.P. ₹489, in stock | Pushed LIVE at ₹194 (60% off) |
| 16733 | Mini Steps ultra-soft washable dino plush toy (B0DWK2T9VS) | ₹234 / ₹1,299 | ₹237.83, in stock | Pushed LIVE at ₹238. 82% off is ≥80%, so the M.R.P. was nulled. |
| — | Samsung Galaxy S25 FE 5G, 128 GB (MOBHQCH6HZZH3BTH, Flipkart) | ₹43,499 / ₹89,999 | Price drift | Rejected |
| — | Inlight 120-inch fixed projector screen (B0C548CSPP) | ₹12,901 / ₹74,999 | ₹13,299, `#availability` empty | Rejected: drift and unclear stock |
| — | Solimo printed Vivo V30 case (B0CXHMBMMB) | ₹20 / ₹499 | No buy box | Rejected |

- **Push:** `{deals:[…]}` to `/admin/deals/bulk` returned `count:5`, all `created:true`, so no slug restore was needed.
- **Rows:** all five are LIVE with the Amazon store, the `ashoksachdev-21` tag on `/dp/ASIN`, a `m.media-amazon.com` image and one priceHistory row each. The payload carried `discountPct` on every row that has an M.R.P.
- **Source:** each row's `sourceUrl` is its `https://www.desidime.com/deals/<slug>` card permalink.

## Dup re-checks

| Id | Product | DB before | PDP | Action |
|---|---|---|---|---|
| 13809 | pTron Studio speaker | ₹649 | ₹599 / M.R.P. ₹2,599, in stock | Synced to ₹599 (77% off) |
| 11304 | Food storage containers | ₹370 | ₹385 / M.R.P. ₹1,399, in stock | Synced to ₹385 (72% off) |
| 14110 | Titan Bandhan analog couple watch set | ₹8,636 | ₹10,795 / M.R.P. ₹22,995, only 2 left | Synced to ₹10,795 (53% off). Added to the low-stock list. |
| 5727 | TrustBasket item | ₹50 | ₹52, in stock | Synced to ₹52. 87% off is ≥80%, so the M.R.P. was nulled. |
| 952 | Samsung 45 W adaptor | ₹995, no M.R.P. | ₹793 / M.R.P. ₹3,499, in stock | Synced to ₹793, with the M.R.P. added (77% off) |
| 219 | Creative's gift pack | ₹115 / ₹590 | ₹211 / M.R.P. ₹620, in stock | Synced to ₹211 (66% off). The card's ₹104 does not match any PDP price. |
| 14458 | Havells Glamax | ₹349 | ₹349 | None |

Each synced row got a new title and description with matching ₹ and %, plus a priceHistory row. The schema has no `priceValidUntil` column (the page computes +14 days), so the sync wrote price, mrp, discountPct, title and description only.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 5 new slugs and the 6 synced slugs returned **HTTP 200 for 14 URLs** (11 slugs plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.
- **Pages on prod:** the Wipro page returned 200 (0.24s), the Softouch page 200 (0.25s) and the synced Titan page 200 (0.28s).

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.27s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.85s) |
| /sitemap.xml | 200 (0.16s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.71s) |

## CEO audit

Run at 10:52 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,153 = 16,153 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,733 | OK |
| Posts | 493, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,728 vs 16,733 | OK. The 5-deal gap is this tick's push; the external broadcast cron picks it up on its next run. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 10:52 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 2**. The day is within target; the 12:39 IST CONTENT-SEO run can add a third post (cap is 4).

## Still open

- **IFS source dead:** twelve dry ticks in a row (redirector down since 11-16). DesiDime and Telegram carry ingest. The 10:53 IST DEAL-INGEST run probes one id; if it is still dead after 11-17, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 12:43 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
