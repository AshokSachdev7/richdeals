# CONTENT-SEO tick — 2026-11-23a

This tick checked posts per IST day first. 11-21, 11-22 and 11-23 had 0 posts each, because the session crons did not fire in that window. It then ran keyword research (WebSearch, the top-3 SERP results and our live deal clusters), avoiding the saturated best-X-under-Y and free-samples slugs. It wrote two original posts, one BOFU and one TOFU, inserted them through `insert-blog-mdmeta.mjs` (which pings IndexNow) and generated covers with `gen-blog-covers.mjs`. Run at about 20:30–20:41 IST on 11-23.

**Result: 2 posts published on 11-23 IST, both 200 on prod with a cover, IndexNow HTTP 200. 11-21 and 11-22 stay at 0 posts. They are recorded here as missed days and were not backdated.**

## Posts published

| Post | Funnel | Words | seoTitle / seoDesc | Internal links |
|---|---|---|---|---|
| [`/blog/ro-vs-uv-vs-uf-water-purifier-which-to-buy-by-tds-india`](https://richdeals.in/blog/ro-vs-uv-vs-uf-water-purifier-which-to-buy-by-tds-india) (id 635) | BOFU | 1,486 | 50 / 159 chars | 6 live purifier deals, `/offers`, 2 related posts |
| [`/blog/induction-vs-lpg-gas-cost-per-month-which-is-cheaper-india`](https://richdeals.in/blog/induction-vs-lpg-gas-cost-per-month-which-is-cheaper-india) (id 636) | TOFU | 1,381 | 54 / 158 chars | 4 cooktop deals + 3 cookware deals, `/offers`, 3 related posts |

Before insert, every internal link in both posts was probed on prod: all 14 deal and hub links and all 5 blog links returned 200.

## Keyword angle

- **RO vs UV vs UF by TDS:** the SERP is led by brand pages and generic explainers. Our angle is a TDS-band decision table, an explanation of why brand cutoffs disagree, running costs, and live deals mapped to each band.
- **Induction vs LPG monthly cost:** the SERP is news-led (LPG price stories) and gives savings claims from ₹180 to ₹1,000 with no worked method. Our angle is the slab-aware monthly maths with a worked Delhi example, a payback period, and live cooktop and cookware deals.

Research sources included theweek.in, digit.in, bajajfinserv.in, eurekaforbes.com and nobroker.in for the RO post, and angelone.in, goodreturns.in, businesstoday.in and glenindia.com for the induction post. No facts were copied; deal prices come from the live DB rows.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200, sent by `insert-blog-mdmeta.mjs` |
| sitemap.xml | ISR `revalidate = 1800`; the posts appear within 30 minutes |
| llms.txt | `force-dynamic`; already carries both posts |
| Covers | `/media/og/<slug>.png` returns 200 for both |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.13s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.56s |
| `/sitemap.xml` | 200 | 0.08s |
| `/feed.xml` | 200 | 0.08s |
| `/api/deals` | 200 | 0.13s |
| `/llms.txt` | 200 | 0.44s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,431 LIVE (16,888 rows in total) | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,038 | Flag: no deal intake since 11-20 (crons idle); DESIDIME, DEAL-INGEST and TG run next |
| Posts | 505, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,038 = 17,038 | OK |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | No `content-seo-2026-11-23*` existed, so this report uses suffix `a` | OK |
| Session crons vs roster | 9 of 9 (SCHEMA-AUDIT and SEO-AUDIT-FIX were recreated earlier this session) | OK |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| 11-20 | 3 |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| **11-23** | **2** |

11-23 now meets the 2–3 target. 11-21 and 11-22 broke the never-0 rule while the session was idle.

## Still open

- **GSC top rows:** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first (PRIORITY).
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead again (0 of 105 resolved at DEAL-INGEST 20k, after 7 of 106 at 20j).
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17030, #17031, #17032, #17035, #17036. #17027 stays on watch.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022, #17033.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), the IFB 241L refrigerator (B0GWQ46LC3), the Vijaysales Voltas 1.5T AC (f987704ab186), the Voltas Beko washer (B0FDH7M1QS), the Samsung 256L refrigerator (B0G8K4KSR6), the Haier 215L refrigerator (RFRHQNJQCKPHQVTJ) and the Lenovo IdeaPad Slim 5 (COMHZX8EUBZANC6Z).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It is not in `tg-groups.json`; none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
