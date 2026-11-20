# TELEGRAM-DEAL-MONITOR tick — 2026-11-20u

This tick read the newest message in every group from `data/tg-groups.json` with one `browser_evaluate` over the `.chat-list` sidebar (Playwright MCP, richDeals profile). It extracted single-product deals from all stores and resolved the shortlinks. Candidates were deduped against `data/tg-multi-seen.json` (an array) and the live DB productId, then each price was verified on the live product page. Run at about 20:01–20:10 IST on 11-20.

**Result: 1 pushed (#17035, the Orient Electric Aquator Edge 15L 5-star geyser on Amazon), with HTTP 201, `count: 1`, `created: true` and LIVE. The other posts were duplicates, category pages, multi-product loots or app-only offers. IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 everywhere and the CEO audit is green.**

## Candidates

| Post | ID | Check | Outcome |
|---|---|---|---|
| Orient Electric Aquator Edge 15L storage geyser, 5 star (Dealzone `link.amazon/B0dgmU1I4` and CoolzTricks `amzn.to/4AJubQD`, both resolved to the same ASIN) | B0FCYBZ351 | PDP ₹5,999 (exact match, no coupon), M.R.P. ₹14,490, In stock, add-to-cart present, "Lowest price in 30 days" | Pushed |
| Cosmic Byte controller (Dealdost, `fkrt.cc/ztWjv7W`) | — | Resolved to a Flipkart category page | Skipped |
| Cello sipper (Rogerkart `XDSsnbz`) | B0DZCXTVFV | Rejected at 20n, already seen | Skipped |
| LG washing machine (INDIAN CHEAP DEALS, `B08FsUNwo`) | B0DPHTSTYJ | Code already seen; #5035 is LIVE at ₹20,990 | Skipped |
| SB Loots | — | Amazon Now multi-product loot | Skipped |
| NonStopDeals | — | Caprese category page | Skipped |
| ONLINE SHOPPING DEALS | B0F3J89F8L | Crompton FlameStar, already rejected | Skipped |
| IndiaFreeStuff Tips / Hidden Loot | — | Instamart and Swiggy Dineout (app-only) | Skipped |

OMG LOOTDEALS, Loot Deals 24x7 and Deal Dibba had nothing new.

## Pushed

| id | Slug | Price | M.R.P. | Off |
|---|---|---|---|---|
| 17035 | `/orient-electric-aquator-edge-15l-storage-water-heater-5-star-b0fcybz351` | ₹5,999 | ₹14,490 | 59% |

The affiliate link is `https://www.amazon.in/dp/B0FCYBZ351?th=1&psc=1&tag=ashoksachdev-21`. The image is the marketplace CDN `m.media-amazon.com/images/I/517A1bUxAjL._SL1500_.jpg` (HTTP 200 image/jpeg). The description is original copy. The productId was checked against the DB right before the push, and the row was read back as LIVE at ₹5,999 / ₹14,490. The M.R.P. looks inflated for a 15L geyser, so #17035 joins the inflated-M.R.P. list.

The 5 new ids (B0FCYBZ351, B0dgmU1I4, 4AJubQD, ztWjv7W, XDSsnbz) were appended to `data/tg-multi-seen.json`, which now has 5,746 entries and stays unstaged, as usual.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 4 URLs (#17035 plus the 3 hub URLs that slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.21s |
| `/offers` | 200 | 0.65s |
| `/blog` | 200 | 0.56s |
| `/sitemap.xml` | 200 | 0.55s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.44s |
| `/orient-electric-aquator-edge-15l-storage-water-heater-5-star-b0fcybz351` | 200 (₹5,999 in the page) | 0.19s |
| `/api/deals` | 200: total 16,428, newest id 17,035 | 0.07s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,428 = 16,428 (16,885 rows in total) | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,035 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,034 vs 17,035 | OK. The cursor moved from 17,032 at SITEMON 20t; #17035 goes on the external tg-broadcast cron's next run. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-t` existed, so this report uses suffix `u` | OK |
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
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17030, #17031, #17032, plus the new #17035. #17027 stays on watch.
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
| SITEMON | 11-20 20:14 |
| DESIDIME | 11-20 20:43 |
| DEAL-INGEST | 11-20 20:53 |
| TG | 11-20 21:01 |
| CONTENT-SEO | 11-21 00:39 |
| INDEXNOW | 11-21 01:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
