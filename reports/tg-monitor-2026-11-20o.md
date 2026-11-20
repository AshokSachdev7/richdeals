# TELEGRAM-DEAL-MONITOR tick — 2026-11-20o

This tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright "richDeals" profile. It kept single-product deals from any store, resolved shortlinks, and deduped them against `data/tg-multi-seen.json` and the live DB productId. The one fresh candidate was checked on the Amazon PDP in the logged-in tab and on the mobile `/gp/aw/d/` page. Run at about 14:01–14:15 IST on 11-20.

**Result: 0 pushed, 0 repriced. The only fresh single-product candidate (Pepe Jeans, B0CJ9PKN6K) was rejected on the PDP because it has no buy box. Everything else was a grocery item, a multi-product post, a sale hub, a category, a bundle page, or already seen. Nothing was pushed, so IndexNow was not pinged. The CEO audit is green.**

## Candidates

| Group | Post | Link | Outcome |
|---|---|---|---|
| ONLINE SHOPPING DEALS | Pepe Jeans Men Mid Rise Regular Fit Jeans, channel ₹900 | `link.amazon/B0ezaYDjT` → B0CJ9PKN6K (source tag `vivek123034-21`) | Fresh, so it went to PDP verification |
| SB Loots | Kwality Corn Flakes 1kg ₹196 | `amazn.lt/rUtjiCGn` | Rejected: GROCERY policy |
| Dealzone | Reebok post | — | Skipped: it lists several products |
| CoolzTricks | Reebok post | — | Skipped: it lists several products |
| Rogerkart | Cello sipper (B0DZCXTVFV) | Amazon | Already rejected at 20n (no buy box); in the seen list |
| Dealdost | La-Fetch hoodies ×2, ₹1,499 | `bitIy.in/W24LAXi` → la-fetch.com bundle collection | Rejected: bundle collection page, not a single product |
| INDIAN CHEAP DEALS | LG washing machine sale | `link.amazon/B08FsUNwo` | Skipped: sale hub |
| NonStopDeals | Caprese handbags | `fkrt.it` | Skipped: category page |
| IndiaFreeStuff Tips | Instamart loot | — | Skipped: loot post |
| Hidden Loot | Swiggy Dineout | — | Skipped: not a product |
| Loot Deals 24x7, OMG LOOTDEALS, Deal Dibba | — | — | No new post in the loaded sidebar |

## PDP verification

| Product | Channel | Desktop PDP | Mobile `/gp/aw/d/` | Outcome |
|---|---|---|---|---|
| Pepe Jeans (B0CJ9PKN6K, size 38, Tinted Blue) | ₹900 | No price, no M.R.P., empty `#availability`, no add-to-cart; the buy box offers only "See All Buying Options" | Empty corePrice widget (`data-csa-c-asin=""`), empty availability message, no add-to-cart. "Currently unavailable" appears only in the twister JSON. | Rejected (no buy box) |

## Duplicate hits

None this tick.

## Pushed

None.

## Repriced

None.

## Seen list

`data/tg-multi-seen.json` gained B0CJ9PKN6K and now holds 5,725 entries. The file stays unstaged, as usual.

## Freshness

| Check | Result |
|---|---|
| IndexNow | Not pinged. Nothing was pushed or repriced, so there were no slugs to send. |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.22s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.48s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.39s |
| `/api/deals` | 200: total 16,398, newest id 17,005 | 0.13s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,398 = 16,398 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,005 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,005 = 17,005 | OK |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-n` existed, so this report uses suffix `o` | OK |
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
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is posting invite links that advertise child sexual abuse material. None of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 14:14 |
| DESIDIME | 11-20 14:43 |
| DEAL-INGEST | 11-20 14:53 |
| TG | 11-20 15:01 |
| CONTENT-SEO | 11-20 18:39 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
