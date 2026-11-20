# DEAL-INGEST indiafreestuff tick — 2026-11-20e

This tick ran the liveness probe on the IFS `?rto=` redirector and then tried a new bypass: the IFS coupon widget. Coupon cards carry the merchant URL url-encoded in `data-href` (`https://www.indiafreestuff.in/?rto=https%3A%2F%2F...`), so they do not depend on the dead base64 redirector. Every candidate was verified on the merchant PDP before push. Run at about 08:53–09:10 IST on 11-20.

**Result: 1 new deal pushed LIVE (count 1, created:true). IndexNow returned HTTP 200. The redirector is still dead (0 of 3), but the coupon widget gave 5 real products, of which 1 passed verification. Prod returned 200 on all probed endpoints, and the CEO audit is green.**

## Stage 1 and the redirector

| Id | Source | Result |
|---|---|---|
| `MzA4NTMzMzY1OA==` | /deals (top card) | 302 → `https://www.indiafreestuff.in/` |
| `MzA4NTMzMjU0Nw==` | /deals | 302 → `https://www.indiafreestuff.in/` |
| `MjQzMjc0MjI1Nw==` | /deals/superdeals (top card) | 302 → `https://www.indiafreestuff.in/` |

The top /deals id is new since 20d, so IFS is posting again; only the redirector is broken.

**Redirector history:**

| Tick | Resolved |
|---|---|
| 19j | 7 of 92 (last non-zero tick) |
| 19k | 0 of 92 |
| 19l | 0 of 90 |
| 20a | 0 of 3 probed |
| 20b | 0 of 2 probed |
| 20c | 0 of 2 probed |
| 20d | 0 of 2 probed |
| **20e** | **0 of 3 probed** |

## Coupon widget (new bypass)

| Product | Merchant / id | PDP check | Outcome |
|---|---|---|---|
| Dr Batra's | Myntra 20784486 | ₹233, in stock | Dup of LIVE #16927. DB already ₹233; the IFS ₹209 is post-coupon. No change. |
| AQUA RED talc | Myntra 41117440 | ₹72, M.R.P. ₹398, in stock | Rejected: low-ticket FMCG (GROCERY policy). |
| AQUA RED talc | Myntra 41117437 | ₹72, M.R.P. ₹398, in stock | Rejected: low-ticket FMCG (GROCERY policy). |
| The Derma Co Kojic Acid combo | Myntra 29237734 | ₹464, M.R.P. ₹928, in stock (132 units) | **Pushed.** The IFS ₹417 is post-coupon, so the page carries the verified ₹464. |
| Home Centre glass bowls | Ajio 700412986001 | Out of stock, no Add to Bag; page prices ₹799 / ₹559 / ₹500 / ₹1,999 | Rejected: out of stock, and nothing near the IFS ₹199. |

Myntra was read with curl (embedded `discountedPrice` / `mrp` / `outOfStock` / `sellableInventoryCount`). Ajio returns 403 to curl, so it was read in the Playwright tab.

**Plan:** the redirector stays probe-only for the rest of 11-20. The coupon widget is a partial bypass: it only covers coupon-attached products (mostly Myntra and Ajio), and its prices are post-coupon, so every item still needs a PDP read. Use it on every remaining 11-20 tick. If the redirector is still 0 at the first 11-21 tick, repoint the `23 */2 * * *` slot so that it runs the coupon widget plus another source instead of the full /deals sweep.

## Pushed

| Row | Slug | Store | Price | M.R.P. | Affiliate |
|---|---|---|---|---|---|
| #16985 | `the-derma-co-kojic-acid-anti-pigmentation-combo-face-wash-serum-292377` | Myntra | ₹464 | ₹928 (50% off) | InRDeals |

`/admin/deals/bulk` returned HTTP 201, `count: 1`, `created: true`, so no slug restore was needed. The title and description were written fresh. The ₹464 in the title matches the numeric price. The image is from the Myntra CDN (`assets.myntassets.com`). The deal page returned 200 on prod.

## Repriced

None. The one dup (#16927) already matched its PDP.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 4 URLs (the slug plus the 3 default paths) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.17s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.55s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.48s |
| New deal page | 200 | 0.18s |
| `/api/deals` | 200: total 16,378, newest id 16,985 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,378 = 16,378 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,985 (the new push) | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 vs 16,985 | OK. The one-row gap is this push; the external tg-broadcast cron picks it up on its next run. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `deal-ingest-2026-11-20a` to `-d` existed, so this report uses suffix `e` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The target is met, and the 12:39 IST CONTENT-SEO tick can add a third post.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead: 0 resolved since 19j. The coupon widget is a partial bypass only.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).
- **Cover lag after publish** is known behaviour and self-heals within 300s.

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 09:01 |
| SITEMON | 11-20 09:14 |
| DESIDIME | 11-20 10:43 |
| DEAL-INGEST | 11-20 10:53 |
| CONTENT-SEO | 11-20 12:39 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
