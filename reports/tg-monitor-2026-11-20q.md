# TELEGRAM-DEAL-MONITOR tick — 2026-11-20q

This tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright "richDeals" profile. It kept single-product deals from any store, resolved shortlinks, and deduped them against `data/tg-multi-seen.json` and the live DB productId. Every candidate, including the LIVE duplicate, was checked on the Amazon PDP in the logged-in tab. Run at about 16:01–16:20 IST on 11-20.

**Result: 0 pushed, 1 repriced (#5032 ZEBRONICS Zeb-Jaguar mouse, ₹299 → ₹289). Rejected 2 candidates: the VLCC facial kit sells at M.R.P. (0% off), and the Shimmer detergent is low-ticket FMCG (GROCERY policy). IndexNow returned HTTP 200 for 4 URLs. Prod returned 200 everywhere, and the CEO audit is green.**

## Candidates

| Group | Post | Link | Outcome |
|---|---|---|---|
| Dealzone | VLCC Diamond Facial Kit 50g + 10ml, channel ₹204 | `link.amazon/B01fpbM0d` → B007E9GV2Q (source tag `glitzdeal05-21` stripped) | Rejected on the PDP: no discount |
| SB Loots | Shimmer liquid detergent 5L | `amazn.lt/7yJPpz6a` → B0G2LLRV4B (source tag `bhavesh015-21`) | Rejected: GROCERY policy (low-ticket FMCG) |
| CoolzTricks | ZEBRONICS Zeb-Jaguar wireless mouse, channel ₹289 | `amzn.to/3V0x0hh` → B098JYT4SY (source tag `collab-amafhh-21`) | Dup of LIVE #5032, re-verified and repriced |
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
| VLCC Diamond Facial Kit (B007E9GV2Q) | ₹204 | ₹204, M.R.P. ₹204 (0% off), in stock, add-to-cart present, 4.0★ (8,432 ratings) | Rejected: it sells at M.R.P., so it is not a deal |
| Shimmer liquid detergent 5L (B0G2LLRV4B) | — | ₹259; the "M.R.P." ₹51.80 is the per-litre unit rate; 3.2★ | Rejected: GROCERY policy |
| ZEBRONICS Zeb-Jaguar wireless mouse (B098JYT4SY) | ₹289 | ₹289, M.R.P. ₹1,190, in stock, add-to-cart present, 3.9★ (16,279 ratings) | Matches the channel. DB had ₹299, so it was repriced. |

## Duplicate hits

| Deal | ASIN | DB → live | Action |
|---|---|---|---|
| #5032 ZEBRONICS Zeb-Jaguar wireless mouse | B098JYT4SY | ₹299 → ₹289 | Repriced |

## Pushed

None. There was nothing to bulk-push, so there was no `count` to read and no slug to restore.

## Repriced

- **#5032 ZEBRONICS Zeb-Jaguar wireless mouse** (`/zebronics-zeb-jaguar-wireless-mouse`): price ₹299 → ₹289, M.R.P. ₹1,190, discount 75% → 76%. The ₹ and % figures in the title and description were fixed, and a `priceHistory` row was written. The row was read back: ₹289, 76%, and no ₹299 left in the description. The prod page shows ₹289.

## Seen list

`data/tg-multi-seen.json` gained B007E9GV2Q, B0G2LLRV4B and B098JYT4SY, and now holds 5,731 entries. The file stays unstaged, as usual.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 4 URLs (1 repriced deal plus the 3 hub URLs slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.19s |
| `/offers` | 200 | 0.10s |
| `/blog` | 200 | 0.73s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.09s |
| `/llms.txt` | 200 | 0.47s |
| `/zebronics-zeb-jaguar-wireless-mouse` | 200 | 0.19s |
| `/api/deals` | 200: total 16,407, newest id 17,014 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,407 = 16,407 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,014 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,014 = 17,014 | OK. The external tg-broadcast cron has sent #17014. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-p` existed, so this report uses suffix `q` | OK |
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
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014.
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
| SITEMON | 11-20 16:14 |
| DESIDIME | 11-20 16:43 |
| DEAL-INGEST | 11-20 16:53 |
| TG | 11-20 17:01 |
| CONTENT-SEO | 11-20 18:39 |
| INDEXNOW | 11-20 19:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
