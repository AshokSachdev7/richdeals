# DEAL-INGEST indiafreestuff tick — 2026-11-20i

This tick fetched `/deals` and `/deals/superdeals` (both HTTP 200; 33 and 41 unique `rto=` ids), probed the IFS `?rto=` redirector with 3 base64 ids, and re-read the coupon widget. Coupon cards carry the merchant URL url-encoded in `data-href`, so they don't depend on the base64 redirector. Requests to their domain were spaced at least 2.5s apart. Run at about 16:55–17:02 IST on 11-20.

**Result: 0 new deals and 0 repriced. The redirector is still dead (0 of 3 probed). The coupon widget shows the same 5 items as at 20e to 20h, and both LIVE Myntra dups still match their PDP prices. Nothing was pushed, so IndexNow was not pinged. Prod returned 200 on every probed endpoint, and the CEO audit is green.**

## Stage 1 and the redirector

| Id | Decoded | Source | Result |
|---|---|---|---|
| `MzA4NTUwNTg2Mw==` | 3085505863 | /deals (top card) | 302 → `https://www.indiafreestuff.in/` |
| `MzA4NTUwNDc1Mg==` | 3085504752 | /deals | 302 → `https://www.indiafreestuff.in/` |
| `Mjg0OTEzMjgzNg==` | 2849132836 | /deals/superdeals | 302 → `https://www.indiafreestuff.in/` |

The top /deals id is new since 20h (3085476977 → 3085505863), so IFS is still posting. Only the redirector is broken. The full sweep was skipped again so that we don't hammer their domain for nothing.

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
| 20g | 0 of 3 probed |
| 20h | 0 of 3 probed |
| **20i** | **0 of 3 probed** |

## Coupon widget

Both listings show the same 5 coupon cards as at 20e to 20h.

| Product | Merchant / id | PDP check (curl, embedded JSON) | Outcome |
|---|---|---|---|
| The Derma Co Kojic Acid combo | Myntra 29237734 | ₹399, M.R.P. ₹798 | Dup of LIVE #16985 at ₹399 / ₹798. No change. |
| Dr Batra's | Myntra 20784486 | ₹233, M.R.P. ₹325 | Dup of LIVE #16927 at ₹233 / ₹325. No change. |
| AQUA RED talc ×2 | Myntra 41117440 / 41117437 | not re-read | Rejected at 20e: low-ticket FMCG (GROCERY policy). |
| Home Centre glass bowls | Ajio 700412986001 | not re-read (Ajio returns 403 to curl) | Still rejected: out of stock at 20e, and the price can't be verified. |

## Pushed

None.

## Repriced

None. Both LIVE dups match the PDP to the rupee.

## Freshness

| Check | Result |
|---|---|
| IndexNow | Not pinged. Nothing was pushed or repriced, so there were no slugs to send. The 19:23 IST INDEXNOW tick resubmits the newest URLs anyway. |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.18s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.85s |
| `/sitemap.xml` | 200 | 0.08s |
| `/feed.xml` | 200 | 0.07s |
| `/llms.txt` | 200 | 0.41s |
| `/api/deals` | 200: total 16,416, newest id 17,023 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,416 = 16,416 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,023 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,019 vs 17,023 | OK. The external tg-broadcast cron is partway through the DESIDIME 20i batch (#17015 to #17023). |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `deal-ingest-2026-11-20a` to `-h` existed, so this report uses suffix `i` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):**

| Day | Posts |
|---|---|
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **3** |

No day is 0 and none is above the cap of 4. 11-20 is done, so the 18:39 IST CONTENT-SEO tick should skip.

## Fixes

None needed.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** has been dead since 19k. The coupon widget is only a partial bypass. DesiDime and Telegram are carrying deal intake.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75) and the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ) and Tukzer Baggita (B0BR9PH49F).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| TG | 11-20 17:01 |
| SITEMON | 11-20 17:14 |
| CONTENT-SEO | 11-20 18:39 |
| DESIDIME | 11-20 18:43 |
| DEAL-INGEST | 11-20 18:53 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
