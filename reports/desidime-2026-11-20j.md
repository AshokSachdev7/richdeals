# DESIDIME-INGEST tick — 2026-11-20j

This tick ran stage 1 `apps/api/scripts/ingest-desidime.mjs`. It read listing cards only, with no per-deal fetch, applied the JUNK and GROCERY filters, and resolved `visit.desidime.com` links. Amazon candidates were then verified in the logged-in Playwright tab, and non-Amazon candidates through the product page's ld+json (±₹1, InStock). Candidates were deduped by productId against the live DB. Duplicate LIVE rows were re-checked for price drift. Run at about 18:43–18:50 IST on 11-20.

**Result: 3 pushed (#17025 Acer Nitro 5Pro, #17026 Havells HD2222, #17027 boAt Aavante Bar B30). HTTP 201, `count: 3`, all `created: true`. 4 rejected and none repriced. IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 everywhere and the CEO audit is green.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Dropped by JUNK / GROCERY / noise filters | 21 |
| Resolved to a single product | 14 |
| Already in the DB (dup LIVE rows, re-checked below) | 5 |
| Rejected in the last 24h (OnePlus Pad Go TABGTHGMBPDCHWGP, 24K gold bar B0HDZDX4KW) | 2 |
| Fresh candidates | 7 |

## PDP verification

| Product | ID | Card | PDP | Outcome |
|---|---|---|---|---|
| Acer Nitro 5Pro i5-14450HX RTX 4050 | B0H9SHLNJM (Amazon) | ₹1,44,990 | ₹1,44,990, M.R.P. ₹2,48,990, add-to-cart present | Pushed |
| Havells HD2222 hair dryer | HDRFSHSVYYDMBGCF (Flipkart) | ₹988 | ₹988, M.R.P. ₹1,595, in stock | Pushed |
| boAt Aavante Bar B30 25W soundbar | ACCHQU2GMKBAZHQA (Flipkart) | ₹2,099 | ₹2,099, M.R.P. ₹5,990, in stock | Pushed |
| ViewSonic monitor | B0CMPW1698 (Amazon) | — | No buy box: no price or add-to-cart, and the variant shown is 170Hz | Rejected |
| IFB 241L refrigerator | B0GWQ46LC3 (Amazon) | ₹21,990 | ₹26,490 | Rejected: price drift |
| Jiomart umbrella | c7e2815d906c | — | No ld+json on the page | Rejected: price can't be verified |
| Vijaysales Voltas 1.5T AC | f987704ab186 | ₹44,990 | ₹34,992 | Rejected: price drift |

All 4 rejects were written to `data/dd-rejected.json` with `Date.now()`. The file now holds 2,169 entries and stays unstaged, as usual.

## Duplicate hits (LIVE rows re-checked)

| Deal | ID | DB vs live | Action |
|---|---|---|---|
| #17003 Billion air fryer | AFRHPHNXNGCY5DNN (Flipkart) | ₹2,599 = ₹2,599 | None |
| #17006 Solimo quilt | — | ₹329 = ₹329 | None |
| #7689 Toshiba | B0FDL28K43 | ₹15,741 = ₹15,741 | None. The card's ₹11,740 is not the live price. |
| #16993 Electrolux | B0H34QMH74 | ₹73,990 = ₹73,990 | None. The M.R.P. read is 100× the price, so M.R.P. stays null. |
| #12116 Havells dryer | GHPDDABPPK00 | ₹649 = ₹649 | None |

## Pushed

| id | Slug | Price | M.R.P. | Off |
|---|---|---|---|---|
| 17025 | `/acer-nitro-5pro-gaming-laptop-i5-14450hx-rtx-4050-b0h9shlnjm` | ₹1,44,990 | ₹2,48,990 | 42% |
| 17026 | `/havells-hd2222-hair-dryer-hdrfshsvyydmbgcf` | ₹988 | ₹1,595 | 38% |
| 17027 | `/boat-aavante-bar-b30-25w-2-0-channel-bluetooth-soundbar-acchqu2gmkbazhqa` | ₹2,099 | ₹5,990 | 65% |

Affiliate links: Amazon `/dp/B0H9SHLNJM?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj` for both Flipkart deals. Images come from `m.media-amazon.com` and `rukmini1.flixcart.com`. Each productId was checked against the DB right before the push, and all 3 rows were read back as LIVE.

## Repriced

None. All 5 duplicate LIVE rows matched their live prices.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 6 URLs (3 pushed deals plus the 3 hub URLs slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.25s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.71s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.53s |
| `/acer-nitro-5pro-gaming-laptop-i5-14450hx-rtx-4050-b0h9shlnjm` | 200 (₹1,44,990 in the page) | 0.19s |
| `/havells-hd2222-hair-dryer-hdrfshsvyydmbgcf` | 200 (₹988 in the page) | 0.15s |
| `/boat-aavante-bar-b30-25w-2-0-channel-bluetooth-soundbar-acchqu2gmkbazhqa` | 200 (₹2,099 in the page) | 0.16s |
| `/api/deals` | 200: total 16,420, newest id 17,027 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,420 = 16,420 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,027 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,024 vs 17,027 | OK. This is the batch just pushed; the external tg-broadcast cron sends it on its next run. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `desidime-2026-11-20a` to `-i` existed, so this report uses suffix `j` | OK |
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

No day is 0 and none is above the cap of 4.

## Fixes

None needed beyond the push.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** has been dead since 19k. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17024. #17027 (boAt, 65% off ₹5,990) is the Flipkart-listed M.R.P. and is worth watching.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), and from this tick the IFB 241L refrigerator (B0GWQ46LC3) and the Vijaysales Voltas 1.5T AC (f987704ab186).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-20 18:53 |
| TG | 11-20 19:01 |
| SITEMON | 11-20 19:14 |
| INDEXNOW | 11-20 19:23 |
| DESIDIME | 11-20 20:43 |
| CONTENT-SEO | 11-21 00:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
