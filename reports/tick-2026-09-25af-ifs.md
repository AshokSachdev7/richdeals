# DEAL-INGEST indiafreestuff tick — 2026-09-25af (10:37 IST)

**19 deals pushed LIVE, all from Amazon. IndexNow returned HTTP 200 for 22 URLs.**

## Funnel
| Stage | Count |
|---|---|
| Listed on IFS `/deals` + superdeals | 83 |
| New (not in the seen index) | 32 |
| Rakhi gift hamper (seasonal) | −1 |
| Buy Now links resolved (all Amazon) | 31 |
| Already in the DB (duplicate productId) | −12 |
| Verified on the product page and accepted | **19** |

The 12 duplicates: B0G549LZS2, B07P8KPQJ1, B0CT8KLJVQ, B08BCXT743, B0H425MVM4, B0DQV4XXBS, B0CXDNR7WL, B01BBNF6GM, B0FT3NWDLB, B098Q4NP69, B07KJ2TDMR, B0GNML8G4P.

## Verification
- **Amazon:** checked in the logged-in tab. The script read these fields from the product page:
  - `#corePriceDisplay` for the price
  - `#centerCol` for the M.R.P.
  - `#availability` for stock
  - the `hiRes` image on `m.media-amazon.com`
  - the buy box (all 19 had one)
- **Guess GW0964G3:** IFS showed ₹6,009, which is the price after the Axis credit-card EMI offer. We pushed the product-page price of ₹6,675.
- **Clip coupons** (the how-to step tells the buyer to tick the coupon):
  - Aristocrat Oasis Plus: 15%
  - Meridian 3-piece set: 5%
  - Murphy Flora: 2%
- **Stock notes:**
  - Halonix batten 6-pack showed "only 1 left", and the description says so.
  - The RR Signature geyser had a blank availability line but a buy box, so it was accepted.
- **Pre-flight gate** (`scripts/push-ifs-0925af.mjs`) checks:
  - the title ₹ matches the price
  - price is below M.R.P.
  - the image comes from the store's CDN, with no thumbnail sizes
  - the description is at least 900 characters (Murphy was 896 at first, so one factual sentence was added)
  - there are 4 how-to steps
  - no duplicate slugs

## Push
- `/admin/deals/bulk` returned HTTP 201, with all 19 rows `created:true`.
- DB check afterwards: 19 rows, all LIVE.

## Freshness
- **IndexNow:** HTTP 200 for 22 URLs (19 slugs + 3 auto-added paths).
- **`sitemap.xml`:** ISR refresh at most every 30 min. There is no new static route.
- **`llms.txt`:** force-dynamic, so it already carries the batch.

## CEO audit (checked against the DB and prod)
| Check | Result |
|---|---|
| LIVE deals | 10847. Max deal id is 11194. |
| PENDING_REVIEW | 0 |
| LIVE deals with null price or null image | 0 / 0 |
| Posts | 329 in total, 0 coverless, 0 seoless |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **2 so far**. No day at 0. |
| Broadcast cursor | 11175, against a max id of 11194. The gap is this batch. The external broadcast cron catches it up, so it self-heals and is not rot. |
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all 200 (slowest: `/blog`, 0.44 s) |
| Unpushed commits | 0 (before this commit) |

Verdict: green. 19 deals shipped.
