# TELEGRAM-DEAL-MONITOR tick — 2026-11-20s

This tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright "richDeals" profile. It kept single-product deals from any store, resolved shortlinks, and deduped them against `data/tg-multi-seen.json` and the live DB productId. Every candidate was checked on the Amazon PDP in the logged-in tab. Run at about 18:01–18:20 IST on 11-20.

**Result: pushed 1 deal LIVE (#17024 Bata men's Derby shoes, ₹882; bulk HTTP 201, `count: 1`, `created: true`). Rejected 2 candidates: the Philips T Beamer bulb drifted (channel ₹309, PDP ₹760), and the TE-A-ME tea tin is low-ticket FMCG (GROCERY policy). IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 everywhere, and the CEO audit is green.**

## Candidates

| Group | Post | Link | Outcome |
|---|---|---|---|
| SB Loots | Bata men's casual lace-up Derby shoes, channel ₹882 | `amazn.lt/8UJlf3sd` → B0GMJW5V2Q (source tag `bhavesh015-21`) | Verified and pushed as #17024 |
| CoolzTricks | PHILIPS T Beamer 20W rechargeable emergency LED bulb (B22D, cool day white), channel ₹309 | `amzn.to/3XCSAZT` → B097MZ9SV3 (source tag `collab-amafhh-21`) | Rejected on the PDP: price drift |
| ONLINE SHOPPING DEALS | TE-A-ME Earl Grey tea tin 50g | `link.amazon/B0hM63WMP` → B086Y8LQVY (source tag `vivek123034-21`) | Rejected: GROCERY policy (low-ticket FMCG) |
| Dealzone | Spykar up to 70% off | — | Skipped: category post |
| Rogerkart | Cello sipper (B0DZCXTVFV) | Amazon | Already rejected at 20n; in the seen list |
| IndiaFreeStuff Tips | Instamart loot | — | Skipped: loot post |
| Dealdost | La-Fetch loot | — | Skipped: loot post |
| INDIAN CHEAP DEALS | LG washing machine sale | — | Skipped: sale hub |
| NonStopDeals | Caprese handbags | — | Skipped: category page |
| Hidden Loot | Swiggy Dineout | — | Skipped: not a product |

## PDP verification

| Product | Channel | PDP | Outcome |
|---|---|---|---|
| Bata men's casual lace-up Derby shoes (B0GMJW5V2Q) | ₹882 | ₹882, M.R.P. ₹2,799 (68% off), in stock, add-to-cart present, 3.6★ (19 ratings) | Pushed. The description notes it is a newer listing with few ratings. |
| PHILIPS T Beamer 20W emergency LED bulb (B097MZ9SV3) | ₹309 | ₹760, M.R.P. ₹1,049 (28% off), in stock, add-to-cart present, 4.1★ (5,859 ratings) | Rejected: price drift |
| TE-A-ME Earl Grey tea tin 50g (B086Y8LQVY) | — | ₹147, M.R.P. ₹295, 4.2★ (26 ratings) | Rejected: GROCERY policy |

## Duplicate hits

None. All 3 ASINs were absent from the seen list and had no productId, affiliateUrl or slug match in the DB.

## Pushed

| id | Deal | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 17024 | Bata men's casual lace-up Derby shoes | ₹882 | ₹2,799 | 68% | Amazon `tag=ashoksachdev-21` |

The image comes from `m.media-amazon.com`, and the description is original copy. Bulk response: HTTP 201, `count: 1`, `created: true`, so no slug needed restoring. The id was read back from the DB as LIVE. The prod page returns 200 and shows ₹882.

## Repriced

None.

## Seen list

`data/tg-multi-seen.json` gained B0GMJW5V2Q, B097MZ9SV3 and B086Y8LQVY, and now holds 5,736 entries. The file stays unstaged, as usual.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 4 URLs (1 new deal plus the 3 hub URLs slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.17s |
| `/offers` | 200 | 0.07s |
| `/blog` | 200 | 0.60s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.07s |
| `/llms.txt` | 200 | 0.42s |
| `/bata-men-casual-lace-up-derby-shoes-b0gmjw5v2q` | 200 (₹882 in the page) | 0.28s |
| `/api/deals` | 200: total 16,417, newest id 17,024 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,417 = 16,417 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,024 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,023 vs 17,024 | OK. #17024 was pushed minutes ago; the external tg-broadcast cron will pick it up. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-r` existed, so this report uses suffix `s` | OK |
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

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** has been dead since 19k. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, plus the new #17024 Bata Derby (68%).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F) and, new this tick, the Philips T Beamer bulb (B097MZ9SV3).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 18:14 |
| CONTENT-SEO | 11-20 18:39 |
| DESIDIME | 11-20 18:43 |
| DEAL-INGEST | 11-20 18:53 |
| TG | 11-20 19:01 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
