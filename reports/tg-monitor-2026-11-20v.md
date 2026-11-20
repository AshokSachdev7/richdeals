# TELEGRAM-DEAL-MONITOR tick — 2026-11-20v

This tick read the newest message in every group from `data/tg-groups.json` with one `browser_evaluate` over the `.chat-list` sidebar (Playwright MCP, richDeals profile). It extracted single-product deals from all stores and resolved the shortlinks. Candidates were deduped against `data/tg-multi-seen.json` (an array) and the live DB productId, and the one duplicate hit was price-checked on the live product page. Run at about 21:02–21:12 IST on 11-20.

**Result: nothing to push. The only fresh single-product post (Nayasa containers, Dealzone) resolved to B0CRDZ4TPC, which is already LIVE as #16809; its product page still shows ₹259, the same as the DB, so no repricing was needed. The other posts were grocery, multi-product loots, a credit card, category pages, app-only offers or already seen. No IndexNow ping was needed. Prod returned 200 everywhere and the CEO audit is green.**

## Candidates

| Post | ID | Check | Outcome |
|---|---|---|---|
| Nayasa Easy Containers 2000 ml, set of 2, @₹260 (Dealzone `link.amazon/B0drdRrnV`, source tag `glitzdeal05-21`) | B0CRDZ4TPC | Duplicate of #16809 (LIVE at ₹259). PDP ₹259, In stock, add-to-cart present | No change |
| Apis Himalaya honey 500g, pack of 2, @₹199 (SB Loots `amazn.lt/z7RUBO3p`) | — | Grocery / low-ticket FMCG | Rejected |
| CoolzTricks | — | Amazon Now multi-link loot | Skipped |
| Dealdost (`bitli.in/JwIKu6x`) | — | IndusInd Tiger credit card, not a product | Skipped |
| ONLINE SHOPPING DEALS | B0F3J89F8L | Crompton FlameStar, already rejected | Skipped |
| Rogerkart (`XDSsnbz`) | B0DZCXTVFV | Cello sipper, already seen | Skipped |
| INDIAN CHEAP DEALS (`B08FsUNwo`) | B0DPHTSTYJ | LG washer, already seen; #5035 is LIVE | Skipped |
| NonStopDeals | — | Caprese `fkrt.it` category page | Skipped |
| IndiaFreeStuff Tips / Hidden Loot | — | Instamart and Swiggy Dineout (app-only) | Skipped |

OMG LOOTDEALS, Loot Deals 24x7 and Deal Dibba had nothing new. The M.R.P. selector on the Nayasa page read ₹129.50, which is a per-unit rate rather than the M.R.P., so the DB M.R.P. was left as it is.

The 5 new ids (B0drdRrnV, B0CRDZ4TPC, z7RUBO3p, 4zY0o6S, JwIKu6x) were appended to `data/tg-multi-seen.json`, which now has 5,751 entries and stays unstaged, as usual.

## Pushed

None.

## Freshness

| Check | Result |
|---|---|
| IndexNow | Not pinged. No slugs were pushed or changed. |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.26s |
| `/offers` | 200 | 0.10s |
| `/blog` | 200 | 0.50s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.43s |
| `/nayasa-easy-containers-22-2000-ml-set-of-2-b0crdz4tpc` | 200 | 0.22s |
| `/api/deals` | 200: total 16,429, newest id 17,036 | — |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,429 = 16,429 (16,886 rows in total) | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,036 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,036 vs 17,036 | OK |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-u` existed, so this report uses suffix `v` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **3** |

No day is 0 and none is above the cap of 4.

## Fixes

None needed.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead again (0 of 105 resolved at DEAL-INGEST 20k, after 7 of 106 at 20j). DesiDime and Telegram carry deal intake until it recovers.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17030, #17031, #17032, #17035, #17036. #17027 stays on watch.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022, #17033.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), the IFB 241L refrigerator (B0GWQ46LC3), the Vijaysales Voltas 1.5T AC (f987704ab186), the Voltas Beko washer (B0FDH7M1QS), the Samsung 256L refrigerator (B0G8K4KSR6), the Haier 215L refrigerator (RFRHQNJQCKPHQVTJ) and the Lenovo IdeaPad Slim 5 (COMHZX8EUBZANC6Z).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It is not in `tg-groups.json` and was skipped; none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 21:14 |
| TG | 11-20 22:01 |
| DESIDIME | 11-20 22:43 |
| DEAL-INGEST | 11-20 22:53 |
| CONTENT-SEO | 11-21 00:39 |
| INDEXNOW | 11-21 01:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
