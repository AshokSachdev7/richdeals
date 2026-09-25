# DEAL-INGEST indiafreestuff tick — 2026-09-25aa (08:47 IST)

**39 deals pushed LIVE: 38 Amazon and 1 Myntra. IndexNow returned HTTP 200 for 42 URLs.**

## Funnel
| Stage | Count |
|---|---|
| Listed on IFS `/deals` + superdeals | 72 |
| New (not in the seen index) | 52 |
| Myntra category URL (Kook N Keech), not a single product | −1 |
| Already in the DB (duplicate productId) | −6 |
| Verified on the product page | 45 |
| Accepted | **39** |

Rejected after checking the product page:

| Deal | Reason |
|---|---|
| B07S8PGF12 kurta | No buy box |
| B0DDX1W2PY Nilkamal Mini Medium | No buy box |
| B09WQPKFP3 Yamaha ZG01 | No buy box |
| B0BY1ZGP39 Nilkamal Mini Small | The product page shows no M.R.P. |
| B00915GCOS Rode NT2-A (₹15,913) | Same mic as B004L06ZCM, which is live at ₹13,148 |
| Flipkart boAt 20000mAh power bank | ₹1,475 vs ₹1,499 M.R.P. is only 2% off, so it is not a deal |
| Sonata watch on Myntra | Out of stock |

## Verification
- **Amazon:** checked in the logged-in tab by reading these fields from the product page:
  - `#corePriceDisplay` for the price
  - `#centerCol` for the M.R.P.
  - `#availability` for stock
  - the `hiRes` image on `m.media-amazon.com`
- **IFS card prices vs the product page:** IFS card prices were often post-coupon or post-card-offer. We push the product-page price before any coupon. When a clip coupon exists, the how-to step tells the buyer to tick it:
  - Goldmedal, Livpure and Nilkamal differed by their coupon amount.
  - vivo Y51 Pro differed by the card cashback (IFS ₹36,100 vs our ₹37,999).
- **Myntra (Michael Kors AK_MK9178):** price from `ld+json` (₹9,798, InStock) and M.R.P. from the page state (₹24,495). The link goes through InRDeals.
- **Other stock notes:** Aristocrat Airpro showed "only 1 left in stock", and the description says so.
- **Pre-flight gate** (`scripts/push-ifs-0925aa.mjs`) checks:
  - the title ₹ matches the price
  - price is below M.R.P.
  - the image comes from the store's CDN
  - the description is at least 900 characters
  - there are 4 how-to steps
  - no duplicate slugs
  - the Myntra link is an InRDeals link

## Push
- `/admin/deals/bulk` returned HTTP 201, with all 39 rows `created:true`.
- The payload was accidentally posted a second time. The upsert is by slug, and the DB check afterwards shows 39 rows, all LIVE, with 0 duplicate productIds.

## Freshness
- **IndexNow:** HTTP 200 for 42 URLs (39 slugs + 3 auto-added paths).
- **`sitemap.xml`:** ISR refresh at most every 30 min. There is no new static route.
- **`llms.txt`:** force-dynamic, so it already carries the batch.

## CEO audit (checked against the DB and prod)
| Check | Result |
|---|---|
| LIVE deals | 10824 (+39) |
| PENDING_REVIEW | 0 |
| LIVE deals with null price or null image | 0 / 0 |
| Posts | 329 in total, 0 coverless, 0 seoless |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **2 so far**. No day at 0. |
| Broadcast cursor | 11132, against a max id of 11171. The gap is this batch. The external broadcast cron catches it up, so it self-heals and is not rot. |
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all 200 (slowest: `/blog`, 0.60 s) |
| Unpushed commits | 0 (before this commit) |

Verdict: green. 39 deals shipped.
