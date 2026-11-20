# TELEGRAM-DEAL-MONITOR tick — 2026-11-20t

This tick read the newest message in every group from `data/tg-groups.json` with one `browser_evaluate` over the `.chat-list` sidebar (Playwright MCP, richDeals profile). It extracted single-product deals from all stores and resolved the shortlinks. Candidates were deduped against `data/tg-multi-seen.json` (an array) and the live DB productId, then each price was verified on the live product page. Run at about 19:01–19:20 IST on 11-20.

**Result: 1 pushed (#17034, a Koktailkitchan 12-pack of containers on Shopsy), with HTTP 201, `count: 1`, `created: true` and LIVE. The other posts were duplicates, grocery or FMCG, or category and search pages. IndexNow returned HTTP 200 for 12 URLs, a ping shared with DEAL-INGEST 20j. Prod returned 200 everywhere and the CEO audit is green.**

## Candidates

| Post | ID | Check | Outcome |
|---|---|---|---|
| Koktailkitchan pack of 12 plastic grocery containers, 500 ml, black (Shopsy) | XCCH9Y4QNAP4Q8M2 | finalPrice ₹292, M.R.P. ₹599; no "Sold Out" widget on the page | Pushed |
| Crompton FlameStar | B0F3J89F8L | Already seen and rejected within 24h (PDP reads ₹2,808 with add-to-cart) | Skipped |
| TE-A-ME tea | B086Y8LQVY | FMCG, already seen | Skipped |
| SB Loots Myntra shortlinks | Aqyl31D, fG9bjwp | Resolved to category and search pages, not single products | Skipped |
| DiSano peanut butter | — | Grocery | Skipped |
| Walnuts | NDFHZNAETF3XJ8UQ | Grocery | Skipped |
| Hub posts, Instamart, B0DZCXTVFV | — | Hub or app links; B0DZCXTVFV was already rejected | Skipped |

Shopsy pages have no ld+json, so the price was read from the `finalPrice` / `mrp` page state and stock from the absence of the "Sold Out" widget, per the Shopsy recipe. Shopsy is not Flipkart, so the link goes through Cuelinks.

## Pushed

| id | Slug | Price | M.R.P. | Off |
|---|---|---|---|---|
| 17034 | `/koktailkitchan-pack-of-12-plastic-grocery-container-500-ml-black-xcch9y4qnap4q8m2` | ₹292 | ₹599 | 51% |

The affiliate link is `https://linksredirect.com/?cid=527&source=linkkit&url=<encoded clean Shopsy URL>`. The image is the marketplace CDN `rukmini1.flixcart.com` (832×832, returns HTTP 200 image/jpeg). The description is original copy. The productId was checked against the DB right before the push, and the row was read back as LIVE.

The 5 new ids (XCCH9Y4QNAP4Q8M2, Aqyl31D, fG9bjwp, NDFHZNAETF3XJ8UQ and the DiSano post) were appended to `data/tg-multi-seen.json`, which now has 5,741 entries and stays unstaged, as usual.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 12 URLs. That is #17034 plus DEAL-INGEST 20j's 6 pushed and 2 repriced deals, plus the 3 hub URLs that slug mode adds. |
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
| `/koktailkitchan-pack-of-12-plastic-grocery-container-500-ml-black-xcch9y4qnap4q8m2` | 200 (₹292 in the page) | 0.17s |
| `/api/deals` | 200: total 16,427, newest id 17,034 | 0.08s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,427 = 16,427 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,034 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,027 vs 17,034 | OK. These are the batches just pushed (#17028–#17034); the external tg-broadcast cron sends them on its next run. |
| Unpushed commits | 0 after `git fetch`, before these reports | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-s` existed, so this report uses suffix `t` | OK |
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
- **IFS redirector** is partly alive (7 of 106 resolved at DEAL-INGEST 20j, all Amazon).
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17030, #17031, #17032. #17027 stays on watch.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022, #17033.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), the IFB 241L refrigerator (B0GWQ46LC3) and the Vijaysales Voltas 1.5T AC (f987704ab186).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It is not in `tg-groups.json` and was skipped; none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

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
