# DESIDIME-INGEST tick — 2026-11-20h

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards only (no per-deal fetch), applied the JUNK and GROCERY filters, and resolved each Buy Now through `visit.desidime.com`. Amazon candidates were verified on the PDP in the logged-in Playwright tab; non-Amazon candidates were checked with `productLd()` (±₹1, InStock). Candidates were deduped by productId against the live DB, and LIVE duplicates were re-read and repriced where the price had moved. Run at about 14:43–15:05 IST on 11-20.

**Result: pushed 8 deals LIVE (#17006 to #17013; bulk HTTP 201, `count: 8`, all `created: true`) and repriced 2 LIVE duplicates (#7569, #11234). Rejected 3 candidates (2 price drift, 1 GROCERY) and skipped 1 non-product. IndexNow returned HTTP 200 for 13 URLs. Prod returned 200 everywhere, and the CEO audit is green.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Cards discovered | 36 |
| Dropped as junk or other-store noise | 16 |
| Resolved to a product | 19 |
| Already in the DB | 6 |
| Rejected in the last 24h | 1 (TCL 65" QLED, Flipkart TVSHM44HM6VHUUFQ, ₹40,640) |
| Fresh | 12 |

## PDP verification

| Product | Card | PDP | Outcome |
|---|---|---|---|
| Solimo double microfiber quilt (B0D73T7R7W) | ₹329 | ₹329, M.R.P. ₹1,599 | Pushed |
| iNFiRe Fusion 12W speaker (B0GDTXVFDB) | ₹586 | ₹586 | Pushed. M.R.P. ₹2,999 (80.5% off) nulled as inflated. |
| Richardson Sheffield Artisan serrated knife, peeler and scissors set (B0CY8SPFCB) | ₹295 | ₹295 | Pushed |
| Richardson Sheffield Artisan 6-piece knife block set (B0CY8NZ7SG) | ₹862 | ₹862 | Pushed |
| HAMMER Screen TWS ANC earbuds (B0D2J4FT99) | ₹1,399 | ₹1,399 | Pushed. M.R.P. ₹8,999 (84% off) nulled as inflated. |
| Spigen SA-TW P20 TWS (B0DGX3GMJY) | ₹1,894 | ₹1,894, M.R.P. ₹4,299 | Pushed |
| CareFoam memory foam car neck rest (B0D9XQHTKL) | ₹460 | ₹460 | Pushed. M.R.P. implied 85% off, nulled. |
| Cutting EDGE woven mini storage baskets, set of 6 (B08VDGNF25) | ₹449 | ₹449 | Pushed |
| Hindware Cleo Plus 60 chimney (B0CSD8PG75) | ₹7,498 | ₹7,690 | Rejected: price drift. Retry on a later tick. |
| Lenovo L22-4e + 210 combo (B0HKNG4SCJ) | ₹6,220 | ₹6,911 | Rejected: price drift. Retry on a later tick. |
| Vaseline lip balm (B07VLKB66C) | — | — | Rejected: GROCERY policy |
| BHIM milestone offer | — | — | Skipped: not a product |

## Duplicate hits (LIVE rows re-checked)

| Deal | ASIN / pid | DB → live | Action |
|---|---|---|---|
| #16956 Lenovo L22-4e | B0G1T71B9Z | ₹5,532 = ₹5,532 | None |
| #7689 Toshiba 32" | B0FDL28K43 | ₹14,990 = ₹14,990 | None |
| #16993 Electrolux | B0H34QMH74 | ₹73,990 = ₹73,990 | None |
| #17003 Billion air fryer | Flipkart AFRHPHNXNGCY5DNN | ₹2,599 = ₹2,599, InStock (ld+json) | None |
| #7569 Lamel lipstick 403 | B0CCYQN91G | ₹164 → ₹106 | Repriced |
| #11234 Solimo container set of 21 | B0GHNTD4NC | ₹849 → ₹629 | Repriced |

## Pushed

| id | Deal | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 17006 | Solimo double microfiber quilt | ₹329 | ₹1,599 | 79% | Amazon `tag=ashoksachdev-21` |
| 17007 | iNFiRe Fusion 12W portable Bluetooth speaker | ₹586 | — | — | Amazon `tag=ashoksachdev-21` |
| 17008 | Richardson Sheffield Artisan serrated knife, peeling knife and scissors set | ₹295 | — | — | Amazon `tag=ashoksachdev-21` |
| 17009 | Richardson Sheffield Artisan 6-piece knife block set | ₹862 | — | — | Amazon `tag=ashoksachdev-21` |
| 17010 | HAMMER Screen TWS ANC earbuds | ₹1,399 | — | — | Amazon `tag=ashoksachdev-21` |
| 17011 | Spigen SA-TW P20 TWS earbuds | ₹1,894 | ₹4,299 | 56% | Amazon `tag=ashoksachdev-21` |
| 17012 | CareFoam memory foam car neck rest pillow | ₹460 | — | — | Amazon `tag=ashoksachdev-21` |
| 17013 | Cutting EDGE woven mini storage baskets, set of 6 | ₹449 | — | — | Amazon `tag=ashoksachdev-21` |

Images come from `m.media-amazon.com`, and every description is original copy. The #17006 description says plainly that the M.R.P. looks generous. Bulk response: HTTP 201, `count: 8`, all `created: true`, so no slug needed restoring. Ids were read back from the DB, all LIVE with the right price, M.R.P. and `discountPct`. New pages return 200 on prod.

## Repriced

- **#7569 Lamel lipstick 403:** price ₹164 → ₹106, M.R.P. ₹395, discount 58% → 73%. The ₹ and % figures in the title and description were fixed. A `priceHistory` row was written. The PDP shows only 1 left in stock.
- **#11234 Solimo container set of 21:** price ₹849 → ₹629, M.R.P. ₹1,599, discount 47% → 61%. The title was fixed and "about ₹40 a container" became "about ₹30 a container". A `priceHistory` row was written.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 13 URLs (8 new, 2 repriced, plus the 3 hub URLs slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.16s |
| `/offers` | 200 | 0.07s |
| `/blog` | 200 | 0.56s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.40s |
| `/solimo-double-microfiber-quilt-b0d73t7r7w` | 200 | 0.16s |
| `/cutting-edge-woven-mini-storage-baskets-set-of-6-b08vdgnf25` | 200 | 0.12s |
| `/amazon-brand-solimo-plastic-container-set-with-airtight-lids-bpa-free-set-of-21-b0ghntd4nc` | 200 | 0.13s |
| `/api/deals` | 200: total 16,406, newest id 17,013 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,406 = 16,406 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,013 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,005 vs 17,013 | OK. The external tg-broadcast cron picks up #17006 to #17013 on its next run. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `desidime-2026-11-20a` to `-g` existed, so this report uses suffix `h` | OK |
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

- Repriced #7569 and #11234 (see above).

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, plus the new #17006 Solimo quilt (79%).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, plus #7569 (1 left).
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75) and the Lenovo L22-4e + 210 combo (B0HKNG4SCJ).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is posting invite links that advertise child sexual abuse material. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-20 14:53 |
| TG | 11-20 15:01 |
| SITEMON | 11-20 15:14 |
| DESIDIME | 11-20 16:43 |
| CONTENT-SEO | 11-20 18:39 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
