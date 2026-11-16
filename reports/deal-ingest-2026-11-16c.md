# DEAL-INGEST indiafreestuff tick — 2026-11-16c

Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` pages 1–3 and `/deals/superdeals`, with at least 2.5s between requests. Run at about 12:55–13:05 IST.

**Result: 0 pushed. IFS's Buy Now redirector now sends every `?rto=` id to the IFS homepage, for curl and a real browser alike. This is the second dry tick in a row (b was also 0). This tick ran the format check that 11-16b called for.**

Stage 1: 97 cards discovered, 0 resolved to a product. All 97 drops redirect to `https://www.indiafreestuff.in/`.

## Did IFS change its Buy Now format?

No. The links look the same as before, but the redirector no longer resolves them.

- **New deals exist.** 21 decoded ids are newer than tick b's top id (3,084,665,947). The newest is 3,084,693,722 (Daniel Hechter Bastille watch, ₹1,999). Others include the Cookwell Nutri blender (₹1,699), Wipro Garnet bulbs (₹158), a VZY 65" QLED (₹53,140), Haier 9kg top-load (₹21,170) and Toshiba 8kg front-load (₹33,140) washers, and Panasonic 1T (₹27,990) and Haier 1.2T (₹22,490) ACs.
- **The link format is unchanged.** The fresh deal page returns 200. Its `btn btn-primery buy_now` anchor carries the same `?rto=MzA4NDY5MzcyMg==` as the listing card. Ids still sit on the 1,111 grid (gaps of 1,111, 2,222 and 3,333). Tick a had the same grid and resolved all 7 of its new ids.
- **Every id redirects home, old and new.** Four methods were tried, and each got a 302 to `/`:
  1. Plain curl with a browser UA.
  2. Curl with the deal page as Referer.
  3. Curl with a cookie jar after loading the deal page first, so the `ifsv` cookie was set as it would be for a visitor.
  4. Playwright navigation in the real, logged-in Chrome profile.
- **Older ids** (2,889,476,579 and 2,375,702,406) also redirect home.
- **There is no fallback link.** The deal page shows no `/dp/ASIN` or `amzn.to` link, only the `?rto=` Buy Now.

Cause: IFS has either switched off outbound redirects site-wide or is blocking our IP. Playwright runs from the same IP, so the two cannot be told apart from here. Tick b got a 403 on a request with the full sec-fetch header set, which points to an IP-level block. Their domain was not hammered: every request kept the ≥2.5s gap.

The products were not guessed from card titles. IFS card prices are wrong about 68% of the time, and without a resolvable store link no price could be verified.

## Freshness

Not run, because 0 deals were pushed.

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
| DB LIVE vs API total | 16,091 = 16,091 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,670 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,670 vs 16,670 | OK. Caught up. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**.

## Still open

- **The IFS source is blocked.** The next IFS tick (14:23 IST) probes one fresh `?rto=` before running the full sweep. If it still redirects to `/`, it records 0 and stops. If it is still dead after 11-17, find a replacement source; until then TG and DesiDime carry the deal flow.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
