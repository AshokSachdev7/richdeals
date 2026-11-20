# DEAL-INGEST indiafreestuff tick — 2026-11-20f

This tick probed the IFS `?rto=` redirector on both `/deals` and `/deals/superdeals`, then re-read the coupon widget, which is the partial bypass found at 20e. Coupon cards carry the merchant URL url-encoded in `data-href`, so they do not depend on the base64 redirector. Requests to their domain were spaced at least 2.5s apart. Run at about 10:53–10:58 IST on 11-20.

**Result: 0 new deals. The redirector is still dead (0 of 4 probed). The coupon widget shows the same 5 items as at 20e. One of them, #16985, had dropped in price on Myntra, so the row was repriced in place. IndexNow returned HTTP 200. Prod returned 200 on every probed endpoint, and the CEO audit is green.**

## Stage 1 and the redirector

| Id | Decoded | Source | Result |
|---|---|---|---|
| `MzA4NTM0MDMyNA==` | 3085340324 | /deals (top card) | 302 → `https://www.indiafreestuff.in/` |
| `MzA4NTM0MTQzNQ==` | 3085341435 | /deals | 302 → `https://www.indiafreestuff.in/` |
| `MTE4Njk3MTI5MQ==` | 1186971291 | /deals/superdeals (top card) | 302 → `https://www.indiafreestuff.in/` |
| `MTM4NTI2ODEyNg==` | 1385268126 | /deals/superdeals | 302 → `https://www.indiafreestuff.in/` |

The top /deals id is new since 20e (3085333658 → 3085340324), so IFS is still posting. Only the redirector is broken. The full sweep was skipped so that we don't hammer their domain for nothing.

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
| **20f** | **0 of 4 probed** |

## Coupon widget

Both listings show the same 5 coupon cards as at 20e.

| Product | Merchant / id | PDP check (curl, embedded JSON) | Outcome |
|---|---|---|---|
| The Derma Co Kojic Acid combo | Myntra 29237734 | ₹399, M.R.P. ₹798, in stock (56 units) | Dup of LIVE #16985, which was at ₹464 / ₹928. **Repriced.** |
| Dr Batra's | Myntra 20784486 | ₹233, M.R.P. ₹325, in stock (99 units) | Dup of LIVE #16927, already at ₹233. No change. |
| AQUA RED talc ×2 | Myntra 41117440 / 41117437 | not re-read | Rejected at 20e: low-ticket FMCG (GROCERY policy). |
| Home Centre glass bowls | Ajio 700412986001 | not re-read | Rejected at 20e: out of stock. |

## Pushed

None.

## Repriced

| Row | Slug | Was | Now |
|---|---|---|---|
| #16985 | `the-derma-co-kojic-acid-anti-pigmentation-combo-face-wash-serum-292377` | ₹464, M.R.P. ₹928 (50% off) | ₹399, M.R.P. ₹798 (50% off) |

The update went through `prisma.deal.update` and changed the price, the M.R.P., the title and the description together. A re-read came back clean: the ₹ in the title matches the numeric price. The prod page returned 200 and already serves `"price":"399"` in its JSON-LD.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 4 URLs (the repriced slug plus the 3 default paths) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.41s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.62s |
| `/sitemap.xml` | 200 | 0.08s |
| `/feed.xml` | 200 | 0.09s |
| `/llms.txt` | 200 | 0.38s |
| #16985 page | 200 | |
| `/api/deals` | 200: total 16,388, newest id 16,995 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,388 = 16,388 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,995 | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,995 = 16,995 | OK. The external tg-broadcast cron has sent the whole DESIDIME 20f batch. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `deal-ingest-2026-11-20a` to `-e` existed, so this report uses suffix `f` | OK |
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
| **11-20** | **2** |

No day is 0 and none is above the cap of 4. The 12:39 IST CONTENT-SEO tick can add a third post for 11-20.

## Plan

The redirector stays probe-only for the rest of 11-20, and the coupon widget is re-read every tick for price drift on the two LIVE dups. If the 12:53 and later 11-20 ticks are also 0, the first 11-21 tick will repoint the `23 */2 * * *` slot to the coupon widget plus another source instead of the full /deals sweep.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** cards that resolve without an `itm` id (DESIDIME 20f: AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE) are dropped.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 11:01 |
| SITEMON | 11-20 11:14 |
| CONTENT-SEO | 11-20 12:39 |
| DESIDIME | 11-20 12:43 |
| DEAL-INGEST | 11-20 12:53 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
