# TELEGRAM-DEAL-MONITOR tick — 2026-11-20r

This tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright "richDeals" profile. It kept single-product deals from any store, resolved shortlinks, and deduped them against `data/tg-multi-seen.json` and the live DB productId. Both LIVE duplicates were re-checked on the Amazon PDP in the logged-in tab. Run at about 17:02–17:20 IST on 11-20.

**Result: 0 pushed, 2 repriced (#7749 Bournvita 2kg, ₹559 → ₹577; #6340 CELLO Crystal bottles, ₹169 → ₹179). Nothing was rejected. One category post was skipped. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 everywhere, and the CEO audit is green.**

## Candidates

| Group | Post | Link | Outcome |
|---|---|---|---|
| CoolzTricks | Bournvita chocolate nutrition drink 2kg, channel ₹577 | `amzn.to/4t77raJ` → B07FS7C7B8 (source tag `collab-amafhh-21`) | Dup of LIVE #7749, re-verified and repriced |
| SB Loots | CELLO Crystal 1L water bottles, set of 6 | `amazn.lt/wSYE5cg3` → B01BYBTRAM (source tag `bhavesh015-21`) | Dup of LIVE #6340, re-verified and repriced |
| Dealzone | "Min 50% Off On Levi's Innerwear" | `link.amazon/B04IQQc94` | Skipped: category post, several products |
| Rogerkart | Cello sipper (B0DZCXTVFV) | Amazon | Already rejected at 20n; in the seen list |
| ONLINE SHOPPING DEALS | Boldfit sleeping bag (B0G261KHFT) | Amazon | Already pushed at 20p as #17014 |
| IndiaFreeStuff Tips | Instamart loot | — | Skipped: loot post |
| Dealdost | La-Fetch loot | — | Skipped: loot post |
| INDIAN CHEAP DEALS | LG sale | — | Skipped: sale hub |
| NonStopDeals | Caprese | — | Skipped: category page |
| Hidden Loot | Swiggy Dineout | — | Skipped: not a product |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | — | No new post in the loaded sidebar |

## PDP verification

| Product | Channel | PDP | Outcome |
|---|---|---|---|
| Bournvita chocolate nutrition drink 2kg (B07FS7C7B8) | ₹577 | ₹577, in stock, add-to-cart present, 4.3★ (43,675 ratings), Amazon's Choice, 6K+ bought in the past month. The "M.R.P." read of ₹28.85 is the per-100g unit rate, so M.R.P. stays null. | Matches the channel. DB had ₹559, so it was repriced. |
| CELLO Crystal 1L water bottles, set of 6 (B01BYBTRAM) | — | ₹179, M.R.P. ₹275 (35% off), Limited time deal, add-to-cart present, 3.9★ (7,754 ratings) | DB had ₹169 / 39%, so it was repriced. |

## Duplicate hits

| Deal | ASIN | DB → live | Action |
|---|---|---|---|
| #7749 Bournvita 2kg | B07FS7C7B8 | ₹559 → ₹577 | Repriced |
| #6340 CELLO Crystal bottles, set of 6 | B01BYBTRAM | ₹169 → ₹179 | Repriced |

## Pushed

None. There was nothing to bulk-push, so there was no `count` to read and no slug to restore.

## Repriced

- **#7749 Bournvita 2kg** (`/bournvita-chocolate-nutrition-drink-2kg`): price ₹559 → ₹577, M.R.P. null (only a unit rate is shown). A `priceHistory` row was written and the row was read back. The prod page shows ₹577.
- **#6340 CELLO Crystal bottles** (`/cello-crystal-1l-water-bottles-set-of-6`): price ₹169 → ₹179, M.R.P. ₹275, discount 39% → 35%. A `priceHistory` row was written and the row was read back. The prod page shows ₹179.

## Seen list

`data/tg-multi-seen.json` gained B07FS7C7B8 and B01BYBTRAM, and now holds 5,733 entries. The file stays unstaged, as usual.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 5 URLs (2 repriced deals plus the 3 hub URLs slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.15s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.56s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.07s |
| `/llms.txt` | 200 | 0.38s |
| `/bournvita-chocolate-nutrition-drink-2kg` | 200 (₹577 in the page) | 0.15s |
| `/cello-crystal-1l-water-bottles-set-of-6` | 200 (₹179 in the page) | 0.14s |
| `/api/deals` | 200: total 16,416, newest id 17,023 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,416 = 16,416 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,023 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,023 = 17,023 | OK. The external tg-broadcast cron has sent the whole DESIDIME 20i batch. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-q` existed, so this report uses suffix `r` | OK |
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
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ) and Tukzer Baggita (B0BR9PH49F).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 17:14 |
| TG | 11-20 18:01 |
| CONTENT-SEO | 11-20 18:39 |
| DESIDIME | 11-20 18:43 |
| DEAL-INGEST | 11-20 18:53 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
