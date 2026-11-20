# DESIDIME-INGEST tick — 2026-11-20i

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only (no per-deal fetch), applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com`. Amazon candidates were verified on the PDP in the logged-in Playwright tab; non-Amazon candidates were checked with `productLd()` (±₹1, InStock). Candidates were deduped by productId against the live DB, and LIVE duplicates were re-read and repriced where the price had moved. Run at about 16:43–17:00 IST on 11-20.

**Result: pushed 9 deals LIVE (#17015 to #17023; bulk HTTP 201, `count: 9`, all `created: true`) and repriced 3 LIVE duplicates (#7689, #5583, #7311). Rejected 5 candidates (3 price drift, 2 with no add-to-cart). IndexNow returned HTTP 200 for 15 URLs. Prod returned 200 everywhere, and the CEO audit is green.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Dropped as junk or other-store noise | 12 (including a Bajaj UPI Play Store link and a 1 g gold bar on a `/clp/` page) |
| Resolved to a product | 21 |
| Already in the DB | 5 |
| Rejected in the last 24h | 0 |
| Fresh | 16 |

Stage 1 also rejected two Flipkart tablets for price drift: OnePlus Pad Go (TABGTHGMBPDCHWGP, ₹20,649) and Acer Iconia (TABH7E9WKTS9FGVG, ₹16,640). Both were already in `data/dd-rejected.json`.

## PDP verification

| Product | Card | PDP | Outcome |
|---|---|---|---|
| ASICS GT-1000 14 running shoes (B0F5WQ8CWF) | ₹4,999 | ₹4,999, M.R.P. ₹9,999 | Pushed |
| ASICS unisex Jog 100S sneakers (B0FBLXXG4Q) | ₹3,440 | ₹3,440, M.R.P. ₹7,999 | Pushed |
| ASICS men's lace-up running shoes (B0F5BKN7TR) | ₹4,139 | ₹4,139, M.R.P. ₹8,999 | Pushed |
| ASICS Patriot 13 running shoes (B0DV5GYCGL) | ₹2,475 | ₹2,475, M.R.P. ₹5,499 | Pushed |
| adidas Lightrun Zoomer M (B0H1CZB3LV) | ₹2,226 | ₹2,226, M.R.P. ₹5,599 | Pushed |
| adidas Run Steady M (B094QBJZBD) | ₹2,519 | ₹2,519, M.R.P. ₹6,299 | Pushed |
| adidas Calicoz sneakers (B0DSFSM2NW) | ₹2,399 | ₹2,399, M.R.P. ₹5,299 | Pushed |
| adidas Snugpro M (B0DBZLJG3X) | ₹1,599 | ₹1,599, M.R.P. ₹3,999, only 4 left | Pushed |
| pTron Boom Play X5 wired earphones (B0FWCP5HLF) | ₹399 | ₹399, M.R.P. ₹1,499 | Pushed. The description says plainly that the M.R.P. looks generous. |
| Tukzer Baggita (B0BR9PH49F) | ₹538 | ₹849 | Rejected: price drift |
| Havells Nucleus Slim stove (B0DX7CG4CW) | ₹6,490 | ₹7,490 | Rejected: price drift |
| Havells GEOSLIM Jumbo stove (B0GJ5ZTWGJ) | ₹4,941 | ₹6,490 | Rejected: price drift |
| Personalised RFID metal visiting card (B0C34GJBPF) | ₹257 | ₹257, no add-to-cart (customisation product) | Rejected |
| 24K 2 g gold bar pendant (B0HDZDX4KW) | — | No price, no add-to-cart | Rejected |

All 5 rejects were appended to `data/dd-rejected.json` (now 2,165 keys; the file stays unstaged, as usual).

## Duplicate hits (LIVE rows re-checked)

| Deal | ASIN / pid | DB → live | Action |
|---|---|---|---|
| #7689 Toshiba 32" | B0FDL28K43 | ₹14,990 → ₹15,741, M.R.P. ₹24,999 (37% off) | Repriced |
| #5583 Havells Greta Pro geyser | B0FBLWJPTW | ₹8,149 → ₹8,145, M.R.P. ₹16,690 (51% off) | Repriced |
| #7311 Ezee garbage bags | B017K68A94 | ₹108 → ₹109, M.R.P. ₹270 (60% off) | Repriced |
| #16993 Electrolux | B0H34QMH74 | ₹73,990 = ₹73,990 | None |
| #17003 Billion air fryer | Flipkart AFRHPHNXNGCY5DNN | ₹2,599 = ₹2,599, InStock (ld+json) | None |

## Pushed

| id | Deal | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 17015 | ASICS GT-1000 14 running shoes | ₹4,999 | ₹9,999 | 50% | Amazon `tag=ashoksachdev-21` |
| 17016 | ASICS unisex Jog 100S sneakers | ₹3,440 | ₹7,999 | 57% | Amazon `tag=ashoksachdev-21` |
| 17017 | ASICS men's lace-up running shoes | ₹4,139 | ₹8,999 | 54% | Amazon `tag=ashoksachdev-21` |
| 17018 | ASICS Patriot 13 running shoes | ₹2,475 | ₹5,499 | 55% | Amazon `tag=ashoksachdev-21` |
| 17019 | adidas Lightrun Zoomer M running shoes | ₹2,226 | ₹5,599 | 60% | Amazon `tag=ashoksachdev-21` |
| 17020 | adidas Run Steady M running shoes | ₹2,519 | ₹6,299 | 60% | Amazon `tag=ashoksachdev-21` |
| 17021 | adidas Calicoz sneakers | ₹2,399 | ₹5,299 | 55% | Amazon `tag=ashoksachdev-21` |
| 17022 | adidas Snugpro M running shoes | ₹1,599 | ₹3,999 | 60% | Amazon `tag=ashoksachdev-21` |
| 17023 | pTron Boom Play X5 wired earphones | ₹399 | ₹1,499 | 73% | Amazon `tag=ashoksachdev-21` |

Images come from `m.media-amazon.com`, and every description is original copy. Bulk response: HTTP 201, `count: 9`, all `created: true`, so no slug needed restoring. Ids were read back from the DB, all LIVE. New pages return 200 on prod.

## Repriced

- **#7689 Toshiba 32":** price ₹14,990 → ₹15,741, M.R.P. ₹24,999, discount 37%. The description had said 32% off; fixed. A `priceHistory` row was written.
- **#5583 Havells Greta Pro geyser:** price ₹8,149 → ₹8,145, M.R.P. ₹16,690, discount 51%. "Rs." in the copy became "₹". A `priceHistory` row was written.
- **#7311 Ezee garbage bags:** price ₹108 → ₹109, M.R.P. ₹270, discount 60%. A `priceHistory` row was written.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 15 URLs (9 new, 3 repriced, plus the 3 hub URLs slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.31s |
| `/offers` | 200 | 0.19s |
| `/blog` | 200 | 0.68s |
| `/sitemap.xml` | 200 | 0.18s |
| `/feed.xml` | 200 | 0.09s |
| `/llms.txt` | 200 | 0.33s |
| `/asics-gt-1000-14-running-shoes-b0f5wq8cwf` | 200 | 0.28s |
| `/adidas-snugpro-m-running-shoes-b0dbzljg3x` | 200 | 0.36s |
| `/toshiba-32-inch-hd-ready-smart-led-tv-32v35rp` | 200 | 0.37s |
| `/api/deals` | 200: total 16,416, newest id 17,023 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,416 = 16,416 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,023 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,019 vs 17,023 | OK. The external tg-broadcast cron is partway through this batch. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `desidime-2026-11-20a` to `-h` existed, so this report uses suffix `i` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Posts per day (IST)

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

- Repriced #7689, #5583 and #7311 (see above).

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** has been dead since 19k. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, plus the new #17023 pTron earphones (73%).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, plus #17022 (4 left).
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ) and Tukzer Baggita (B0BR9PH49F).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-20 16:55 |
| TG | 11-20 17:01 |
| SITEMON | 11-20 17:14 |
| CONTENT-SEO | 11-20 18:39 |
| DESIDIME | 11-20 18:43 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
