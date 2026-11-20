# DEAL-INGEST indiafreestuff tick — 2026-11-20g

This tick probed the IFS `?rto=` redirector on both `/deals` and `/deals/superdeals`, then re-read the coupon widget. Coupon cards carry the merchant URL url-encoded in `data-href`, so they do not depend on the base64 redirector. Requests to their domain were spaced at least 2.5s apart. Run at about 12:58–13:05 IST on 11-20.

**Result: 0 new deals and 0 repriced. The redirector is still dead (0 of 3 probed). The coupon widget shows the same 5 items as at 20f, and both LIVE Myntra dups still match their PDP prices. Nothing was pushed, so there was nothing to ping to IndexNow. Prod returned 200 on every probed endpoint, and the CEO audit is green.**

## Stage 1 and the redirector

| Id | Decoded | Source | Result |
|---|---|---|---|
| `MzA4NTQzOTIwMw==` | 3085439203 | /deals (top card) | 302 → `https://www.indiafreestuff.in/` |
| `MzA4NTQzODA5Mg==` | 3085438092 | /deals | 302 → `https://www.indiafreestuff.in/` |
| `Mjg3NDE5NDc3NA==` | 2874194774 | /deals/superdeals (top card) | 302 → `https://www.indiafreestuff.in/` |

The top /deals id is new since 20f (3085340324 → 3085439203), so IFS is still posting. Only the redirector is broken. The full sweep was skipped again so that we don't hammer their domain for nothing.

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
| 20e | 0 of 3 probed |
| 20f | 0 of 4 probed |
| **20g** | **0 of 3 probed** |

## Coupon widget

Both listings show the same 5 coupon cards as at 20e and 20f.

| Product | Merchant / id | PDP check (curl, embedded JSON) | Outcome |
|---|---|---|---|
| The Derma Co Kojic Acid combo | Myntra 29237734 | ₹399, M.R.P. ₹798, InStock | Dup of LIVE #16985 at ₹399 / ₹798. No change. |
| Dr Batra's | Myntra 20784486 | ₹233, M.R.P. ₹325, InStock | Dup of LIVE #16927 at ₹233 / ₹325. No change. |
| AQUA RED talc ×2 | Myntra 41117440 / 41117437 | not re-read | Rejected at 20e: low-ticket FMCG (GROCERY policy). |
| Home Centre glass bowls | Ajio 700412986001 | Ajio returned HTTP 403 to curl | Still rejected. It was out of stock at 20e, and the price can't be verified now. |

## Pushed

None.

## Repriced

None. Both LIVE dups match the PDP to the rupee.

## Freshness

| Check | Result |
|---|---|
| IndexNow | Not pinged. Nothing was pushed or repriced, so there were no slugs to send. The 13:23 IST INDEXNOW tick resubmits the newest URLs anyway. |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.18s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.66s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.44s |
| `/api/deals` | 200: total 16,396, newest id 17,003 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,396 = 16,396 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,003 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,003 = 17,003 | OK. The external tg-broadcast cron has sent the DESIDIME 20g batch (#17000–#17003). |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `deal-ingest-2026-11-20a` to `-f` existed, so this report uses suffix `g` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):**

| Day | Posts |
|---|---|
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **3** |

No day is 0 and none is above the cap of 4. 11-20 is done.

## Plan

This is the third 0-new tick in a row on 11-20 (20e, 20f, 20g), and the redirector has been dead since 19k. As the 20f plan set out, the first 11-21 tick will repoint the `23 */2 * * *` slot to the coupon widget plus another source, instead of the full /deals sweep, unless a probe resolves before then. Until then, each tick stays a cheap probe of 3–4 ids plus a widget re-read.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 13:01 |
| SITEMON | 11-20 13:14 |
| INDEXNOW | 11-20 13:23 |
| DESIDIME | 11-20 14:43 |
| DEAL-INGEST | 11-20 14:53 |
| CONTENT-SEO | 11-20 18:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
