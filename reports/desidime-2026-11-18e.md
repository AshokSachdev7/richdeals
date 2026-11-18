# DESIDIME-INGEST tick — 2026-11-18e

The tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`, cards only, JUNK/GROCERY filters, `visit.desidime.com` resolve). It then verified Amazon candidates with a same-origin PDP fetch in the logged-in Playwright tab, and the Myntra candidate with `productLd()`. The push went through `apps/api/_dd1118e-push.mjs` (scratch, not committed; a copy of `_dd1112bpush.mjs`). Run at about 08:30–08:50 IST.

**Result: 10 deals pushed LIVE (#16774–#16783): 9 Amazon and 1 Myntra. HTTP 201, `count:10`; readback 10 of 10 LIVE. IndexNow returned HTTP 200 for 13 URLs. DesiDime yield is back after 0 fresh in 18b, 18c and 18d. Every CEO-audit check is green and all 9 session crons are armed.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 37 |
| Junk, grocery or unsupported store dropped | 13 |
| Resolved | 24 |
| Dups vs live DB | 3 |
| Rejected within 24h | 5 |
| Fresh candidates | 16 |
| Passed verification | 10 |

## Pushed

| Id range | Product | Price | MRP | Store |
|---|---|---|---|---|
| #16774–#16783 | BKN wireless Type-C collar microphone (B09K6LMSYP) | ₹434 | ₹1,499 | Amazon |
| | Acrylic rectangle mirror wall stickers, set of 20 (B0C556VZKF) | ₹171 | ₹999 | Amazon |
| | HAMMER Bash Pro hybrid ANC headphones (B0D3M3DCRP) | ₹2,999 | ₹11,999 | Amazon |
| | CPENSUS 3D acrylic message board lamp (B0C38LLL2F) | ₹379 | ₹1,299 | Amazon |
| | ecofynd Bloom metal plant stand (B09ZHC6CC6) | ₹2,199 | ₹3,999 | Amazon |
| | Yera 250 ml glass dessert bowls, set of 6 (B0CRDJH5YZ) | ₹188 | — | Amazon |
| | PrettyKrafts shirt stacker organiser (B09SWQ5PKJ) | ₹98 | ₹499 | Amazon |
| | Wall1ders golden Om mirror sticker (B075LQ7G1F) | ₹140 | ₹999 | Amazon |
| | Wall1ders golden hexagon mirror stickers, set of 13 (B079471QKN) | ₹156 | ₹999 | Amazon |
| | Parachute Advansed Pro hair growth serum, 50 ml (Myntra 37476994) | ₹199 | ₹999 | Myntra (InRDeals) |

Amazon links carry `tag=ashoksachdev-21`. The Myntra link goes through InRDeals, per the affiliate matrix. Two images came back from the fallback as 300 px thumbnails (B0C38LLL2F, B0CRDJH5YZ); the size modifier was dropped so the full-resolution image is served.

## Rejected

| Candidate | Reason |
|---|---|
| SBI debit card offer | Not a product |
| B0CV7WJWW1 Hometown cabinet | Drift: card ₹23,610, PDP ₹25,110 |
| B0B4P2Q83T JXL car player | Drift: card ₹8,691, PDP ₹9,656 |
| B0CZM17KG3 Fashion Bizz polka top | Drift: card ₹289, PDP ₹299 |
| B0974YL8TT xcluma sensor | Minimum order quantity 3 (per-unit price misleads) |
| B07NDGTHSG towel ring | Minimum order quantity 2 |

## Dup re-checks

| Id | Product | Card | DB | PDP | Action |
|---|---|---|---|---|---|
| #10710 | B0FB9HZ7S4 | ₹42,749 | ₹45,999 | ₹45,999 | None. The card price is a bank-offer price. |
| #219 | B009319D46 | ₹104 | ₹211 | ₹211 | None |
| #16756 | B08CDZ3M5K | — | — | No buy box | Third tick with no buy box; stays on watch |

No price-sync was needed.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` on the 10 slugs returned **HTTP 200 for 13 URLs** (10 slugs plus 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.47s) |
| /offers | 200 (0.07s) |
| /blog | 200 (0.84s) |
| /sitemap.xml | 200 (0.15s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.16s) |
| /llms.txt | 200 (0.67s) |

The local API answers 200 on :4000. Every probe used `curl -m 30`.

## CEO audit

Run at 08:50 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,203 = 16,203 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,783 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,778 vs 16,783 | OK. The external broadcast cron is draining this batch. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 08:50 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **IFS redirector:** dead at g through p. Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 10:43 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
