# DESIDIME-INGEST tick — 2026-11-23a

This tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`) against `https://www.desidime.com/new` and the homepage at about 20:42 IST on 11-23. Both returned 0 cards. A direct curl with a browser user agent returned HTTP 521 ("error code: 521") on `/new` twice, about two minutes apart. 521 is Cloudflare's "origin web server is down": DesiDime's edge is up but cannot reach its own origin. Nothing on our side needs fixing.

**Result: 0 candidates, 0 verified, 0 pushed. No IndexNow ping was needed because nothing was pushed. The next DESIDIME tick (or the external `7,37 * * * *` cron) will pick up the backlog once DesiDime's origin recovers.**

## Stage 1

| Step | Value |
|---|---|
| `/new` | 0 cards, 5,576-byte response (Cloudflare 521 page) |
| Homepage | 0 cards |
| Direct probe | HTTP 521 at 20:42 and 20:44 IST |
| JUNK / GROCERY rejects | n/a |
| Resolved, verified, pushed | 0 / 0 / 0 |

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent; no deals were pushed |
| sitemap.xml / llms.txt | Unchanged by this tick |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200 at 20:41 IST | OK |
| DB LIVE vs API total | 16,431 LIVE (16,888 rows in total) | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,038 | Flag: no deal intake since 11-20 (crons idle); DESIDIME source down, DEAL-INGEST and TG run next |
| Posts | 505, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,038 = 17,038 | OK |
| Unpushed commits | 0 (master = origin/master before this report) | OK |
| Report suffix | No `desidime-2026-11-23*` existed, so this report uses suffix `a` | OK |
| Session crons vs roster | 9 of 9 | OK |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-19 | 3 |
| 11-20 | 3 |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |

## Still open

- **GSC top rows:** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first (PRIORITY).
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead again (0 of 105 resolved at DEAL-INGEST 20k, after 7 of 106 at 20j).
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17030, #17031, #17032, #17035, #17036. #17027 stays on watch.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022, #17033.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), the IFB 241L refrigerator (B0GWQ46LC3), the Vijaysales Voltas 1.5T AC (f987704ab186), the Voltas Beko washer (B0FDH7M1QS), the Samsung 256L refrigerator (B0G8K4KSR6), the Haier 215L refrigerator (RFRHQNJQCKPHQVTJ) and the Lenovo IdeaPad Slim 5 (COMHZX8EUBZANC6Z).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It is not in `tg-groups.json`; none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
