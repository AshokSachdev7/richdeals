# DEAL-INGEST (indiafreestuff) tick — 2026-11-16b

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved every base64 `?rto=` Buy Now id with curl. Run at about 11:35–11:46 IST, roughly 2.5 hours after tick a.

**Result: 0 pushed. The source was dry: 93 listing cards were discovered and 0 resolved to a product. 92 of them carry the same expired deal ids that tick a already classed as stale. IFS published 1 new id since tick a, and it already redirects to the IFS homepage. Nothing was pushed, so there was nothing to ping to IndexNow. Prod is 7/7 at 200 and every DB check is green.**

Stage 1 line: `DONE: 93 discovered, 0 resolved to a product`.

## Why 0

- Every `?rto=` 302s to `https://www.indiafreestuff.in/` and sets an `ifsv` cookie.
- Decoded deal ids range from 272,676,063 to 3,084,665,947. In tick a, the ids that resolved were 3,084,654,837–3,084,664,836. Only **1** id today is newer than that: 3,084,665,947, the Symbol puffer jacket card (₹1,709 / ₹4,999, Amazon, "Apply 5% Coupon").
- The Symbol id was checked every way: plain curl, curl with the `ifsv` cookie on a second hit, curl with a Referer, a direct navigation in the Playwright browser, and a trusted click on the deal page's `#btn_row_buy_box a.buy_now`. All of them land on the IFS homepage.
- The deal page HTML has no amazon.in product URL, no ASIN and no amzn.to link to fall back on.
- One curl run with the full sec-ch/sec-fetch header set got **403**. That was treated as a back-off signal and the IFS domain was not hit again this tick.
- Tick a saw the same pattern for old ids while newer ids still resolved. So the cause is the source, not a block on us: IFS keeps expired deals on its listing, and the single new deal expired, or had its outbound pulled, within the window.
- The Symbol card was not salvaged by an Amazon title search. Without the exact ASIN the variant and the coupon price cannot be verified on the PDP, and that is the rule.

## Freshness

- IndexNow: not run, because 0 deals were pushed.
- `sitemap.xml` and `llms.txt` need no change.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,086 = 16,086 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,665 vs 16,665 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. The 12:39 IST CONTENT-SEO run adds the second post for 11-16, and SITEMON b re-checks it.

## Still open

- IFS yield: if the next IFS tick also gets 0 new ids, check whether IFS changed its Buy Now format. That means checking the newest card's `?rto=` against a fresh deal page, not the listing.
- #9689 Haier washer: no buy box on the PDP. Re-check next tick; set EXPIRED if it stays unavailable.
- #14635 (Mivi, Flipkart): no priceValidUntil. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil; the same-price confirm paths still write no priceHistory row.
- Low-stock rows to re-check: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
