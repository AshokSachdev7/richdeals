# TELEGRAM-DEAL-MONITOR tick — 2026-11-20p

This tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright "richDeals" profile. It kept single-product deals from any store, resolved shortlinks, and deduped them against `data/tg-multi-seen.json` and the live DB productId. Every candidate, including the LIVE duplicate, was checked on the Amazon PDP in the logged-in tab. Run at about 15:00–15:10 IST on 11-20.

**Result: pushed 1 deal LIVE (#17014 Boldfit sleeping bag; bulk HTTP 201, `count: 1`, `created: true`). Rejected 1 candidate for price drift (Premchand boxed set). The one duplicate hit (#17012 CareFoam) still matches its PDP price, so nothing was repriced. IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 everywhere, and the CEO audit is green.**

## Candidates

| Group | Post | Link | Outcome |
|---|---|---|---|
| ONLINE SHOPPING DEALS | Boldfit Sleeping Bag SleepMax Pro, channel ₹999 | `link.amazon/B05atYfky` → B0G261KHFT (source tag `vivek123034-21` stripped) | Fresh, verified on the PDP, pushed |
| ONLINE SHOPPING DEALS | Premchand Katha Sahitya boxed set (Hindi), channel ₹170 | `link.amazon/B01OPwOw4` → 9362140020 | Rejected: price drift (PDP ₹749) |
| ONLINE SHOPPING DEALS | CareFoam car neck rest, channel ₹460.67 | `link.amazon/B0j7n6H83` → B0D9XQHTKL | Dup of LIVE #17012, re-verified |
| SB Loots | U.S. Polo (Myntra) post | — | Skipped: it lists several products |
| CoolzTricks | U.S. Polo post | — | Skipped: it lists several products |
| Dealzone | Kook N Keech loot | — | Skipped: loot post |
| Rogerkart | Cello sipper (B0DZCXTVFV) | Amazon | Already rejected at 20n; in the seen list |
| IndiaFreeStuff Tips | Instamart loot | — | Skipped: loot post |
| Dealdost | La-Fetch bundle | — | Skipped: bundle, not a single product |
| INDIAN CHEAP DEALS | LG sale | — | Skipped: sale hub |
| NonStopDeals | Caprese | — | Skipped: category page |
| Hidden Loot | Swiggy Dineout | — | Skipped: not a product |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | — | No new post in the loaded sidebar |

## PDP verification

| Product | Channel | PDP | Outcome |
|---|---|---|---|
| Boldfit Sleeping Bag SleepMax Pro (B0G261KHFT, Navy) | ₹999 | ₹999, M.R.P. ₹3,699 (73% off), in stock, add-to-cart present, "Lowest price in 30 days", 4.2★ (16 ratings), Amazon's Choice | Pushed. The description says plainly that the M.R.P. looks generous. |
| Premchand Katha Sahitya boxed set (9362140020) | ₹170 | ₹749, M.R.P. ₹1,179, in stock | Rejected: price drift |
| CareFoam car neck rest (B0D9XQHTKL) | ₹460.67 | ₹460.67, M.R.P. ₹2,999, in stock, add-to-cart present | Matches DB ₹460. No change. |

## Duplicate hits

| Deal | ASIN | DB → live | Action |
|---|---|---|---|
| #17012 CareFoam car neck rest | B0D9XQHTKL | ₹460 = ₹460 | None |

## Pushed

| id | Deal | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 17014 | Boldfit Sleeping Bag SleepMax Pro | ₹999 | ₹3,699 | 73% | Amazon `tag=ashoksachdev-21` |

The image is from `m.media-amazon.com`, and the description is original copy. Bulk response: HTTP 201, `count: 1`, `created: true`, so no slug needed restoring. The row was read back from the DB as LIVE at ₹999. `/boldfit-sleeping-bag-sleepmax-pro-b0g261khft` returns 200 on prod.

## Repriced

None.

## Seen list

`data/tg-multi-seen.json` gained B0G261KHFT, 9362140020 and B0D9XQHTKL, and now holds 5,728 entries. The file stays unstaged, as usual.

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
| `/offers` | 200 | 0.10s |
| `/blog` | 200 | 0.63s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.09s |
| `/llms.txt` | 200 | 0.40s |
| `/boldfit-sleeping-bag-sleepmax-pro-b0g261khft` | 200 | 0.15s |
| `/api/deals` | 200: total 16,407, newest id 17,014 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,407 = 16,407 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,014 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,013 vs 17,014 | OK. The external tg-broadcast cron picks up #17014 on its next run. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-o` existed, so this report uses suffix `p` | OK |
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
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, plus the new #17014 Boldfit sleeping bag (73%).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75) and the Lenovo L22-4e + 210 combo (B0HKNG4SCJ).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 15:14 |
| TG | 11-20 16:01 |
| DESIDIME | 11-20 16:43 |
| DEAL-INGEST | 11-20 16:53 |
| CONTENT-SEO | 11-20 18:39 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
