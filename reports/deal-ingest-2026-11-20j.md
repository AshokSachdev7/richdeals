# DEAL-INGEST indiafreestuff tick — 2026-11-20j

This tick ran stage 1 of `apps/api/scripts/ingest-ifs-proper.mjs` over `/deals` and `/deals/superdeals`, then resolved the base64 `?rto=` Buy Now ids. Every resolved product was verified on its live PDP in the logged-in Playwright Amazon tab. M.R.P. was read from the `#centerCol` text and the image from the first `hiRes` entry. Candidates were deduped by productId against the live DB, and the duplicate LIVE row was price-synced in place. The two open Myntra rows were also re-checked. Run at about 18:53–19:20 IST on 11-20.

**Result: 6 pushed (#17028–#17033), with HTTP 201, `count: 6`, all `created: true` and all LIVE. 2 rows repriced (#17024 Bata, #16985 Derma Co). IndexNow returned HTTP 200 for 12 URLs, a ping shared with TG 20t. Prod returned 200 everywhere and the CEO audit is green. The IFS redirector is partly alive again: 7 of 106 ids resolved, all of them Amazon.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Buy Now ids swept (`/deals` 33 + superdeals 41 + coupon widget) | 106 |
| Resolved to a real store URL | 7 (all Amazon) |
| Already in the DB (dup LIVE row, repriced below) | 1 (#17024 Bata B0GMJW5V2Q) |
| Fresh candidates | 6 |
| Verified on PDP and pushed | 6 |

Redirector history: 19j 7/92, 19k 0/92, 19l 0/90, 20a–20i 0, **20j 7/106**. It is alive but still Amazon-only, and still needs a probe before every sweep.

## PDP verification

| Product | ASIN | PDP (logged-in tab) | Outcome |
|---|---|---|---|
| Kohler July comfort-height lavatory faucet | B07RLDCHSF | ₹3,844, M.R.P. ₹6,900, add-to-cart present | Pushed |
| Note counting machine, 1,000 notes per minute | B01LZE27MH | ₹3,968, M.R.P. ₹6,999, add-to-cart present | Pushed |
| OHO Sunshine Bluetooth audio sunglasses | B0FH25RKYN | ₹999, M.R.P. ₹4,999, add-to-cart present | Pushed (M.R.P. looks inflated) |
| PremiumAV Prism 20W soundbar | B0FWKJRB3W | ₹1,278, M.R.P. ₹4,599, add-to-cart present | Pushed (M.R.P. looks inflated) |
| Magnet Wi-Fi bulb camera, 360° | B0CLVGLTV4 | ₹699, M.R.P. ₹2,900, add-to-cart present | Pushed (M.R.P. looks inflated) |
| BNF kids bike helmet, 3–8 years | B0GXV99JC9 | ₹554, M.R.P. ₹997, "Only 1 left" | Pushed (low stock) |

## Duplicate hits (LIVE rows re-checked)

| Deal | ID | DB vs live | Action |
|---|---|---|---|
| #17024 Bata men's derby shoes | B0GMJW5V2Q | ₹882 vs ₹2,179 | Repriced (below) |
| #16985 Derma Co kojic acid combo (Myntra) | 29237734 | ₹399 / ₹798 vs ₹449 / ₹898 | Repriced (below) |
| #16927 Dr Batra's (Myntra) | 20784486 | ₹233 / ₹325 = ₹233 / ₹325 | None |

## Pushed

| id | Slug | Price | M.R.P. | Off |
|---|---|---|---|---|
| 17028 | `/kohler-july-comfort-height-single-control-lavatory-faucet-29928in-4nd-cp-b07rldchsf` | ₹3,844 | ₹6,900 | 44% |
| 17029 | `/note-counting-machine-1000-notes-per-minute-b01lze27mh` | ₹3,968 | ₹6,999 | 43% |
| 17030 | `/oho-sunshine-bluetooth-audio-sunglasses-open-ear-10h-playtime-b0fh25rkyn` | ₹999 | ₹4,999 | 80% |
| 17031 | `/premiumav-prism-bluetooth-5-3-soundbar-20w-2-0-channel-rgb-b0fwkjrb3w` | ₹1,278 | ₹4,599 | 72% |
| 17032 | `/magnet-wifi-bulb-camera-360-degree-fisheye-indoor-b0clvgltv4` | ₹699 | ₹2,900 | 76% |
| 17033 | `/bnf-kids-bike-helmet-3-to-8-years-b0gxv99jc9` | ₹554 | ₹997 | 44% |

Affiliate links all use `/dp/<ASIN>?tag=ashoksachdev-21`, and the IFS tag was stripped. Images come from `m.media-amazon.com` and none from images.indiafreestuff.in. Titles and descriptions were rewritten, not copied from the IFS card. Each productId was checked against the DB right before the push, and all 6 rows were read back as LIVE.

## Repriced

- **#17024 Bata** (`/bata-men-casual-lace-up-derby-shoes-b0gmjw5v2q`): ₹882 to **₹2,179**, against an M.R.P. of ₹2,799 (22% off, previously shown as 68%). The title and description were updated to match. This also removes #17024 from the inflated-M.R.P. list.
- **#16985 Derma Co** (`/the-derma-co-kojic-acid-anti-pigmentation-combo-face-wash-serum-292377`): ₹399 / ₹798 to **₹449 / ₹898** (50% off). Still in stock on Myntra.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 12 URLs. That is the 6 pushed deals, the 2 repriced deals and TG 20t's #17034, plus the 3 hub URLs that slug mode adds. |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.39s |
| `/offers` | 200 | 0.10s |
| `/blog` | 200 | 0.71s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.09s |
| `/llms.txt` | 200 | 0.33s |
| `/kohler-…-b07rldchsf` | 200 (₹3,844 in the page) | 0.16s |
| `/note-counting-machine-…-b01lze27mh` | 200 (₹3,968 in the page) | 0.17s |
| `/oho-sunshine-…-b0fh25rkyn` | 200 (₹999 in the page) | 0.16s |
| `/premiumav-prism-…-b0fwkjrb3w` | 200 (₹1,278 in the page) | 0.14s |
| `/magnet-wifi-bulb-camera-…-b0clvgltv4` | 200 (₹699 in the page) | 0.17s |
| `/bnf-kids-bike-helmet-…-b0gxv99jc9` | 200 (₹554 in the page) | 0.15s |
| `/bata-men-casual-lace-up-derby-shoes-b0gmjw5v2q` | 200 (₹2,179 in the page) | 0.14s |
| `/the-derma-co-kojic-acid-…-292377` | 200 (₹449 in the page) | 0.16s |
| `/api/deals` | 200: total 16,427, newest id 17,034 | 0.08s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,427 = 16,427 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,034 (includes TG 20t's #17034) | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,027 vs 17,034 | OK. This is the batch just pushed; the external tg-broadcast cron sends it on its next run. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `deal-ingest-2026-11-20a` to `-i` existed, so this report uses suffix `j` | OK |
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

- Repriced #17024 and #16985 in place (above).

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is partly alive (7 of 106 resolved at 20j, all Amazon). Flipkart and other stores still don't resolve.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, plus the new #17030, #17031 and #17032. #17027 stays on watch. #17024 is off the list (now 22% off ₹2,799).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022, plus the new #17033.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), the IFB 241L refrigerator (B0GWQ46LC3) and the Vijaysales Voltas 1.5T AC (f987704ab186).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 19:15 |
| INDEXNOW | 11-20 19:23 |
| TG | 11-20 20:01 |
| DESIDIME | 11-20 20:43 |
| DEAL-INGEST | 11-20 20:53 |
| CONTENT-SEO | 11-21 00:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
