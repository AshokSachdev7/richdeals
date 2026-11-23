# DEAL-INGEST tick — 2026-11-23a

This tick ran stage 1 of `apps/api/scripts/ingest-ifs-proper.mjs` over indiafreestuff.in `/deals` and `/deals/superdeals`, resolved each base64 `?rto=` Buy Now id, and deduplicated by `productId` against the live DB. Every fresh candidate was then read on its Amazon product page in the logged-in Playwright tab (`.a-price-whole` in `#corePriceDisplay`, M.R.P. from `#centerCol`, add-to-cart present). Clean matches were pushed `status:live` through `/admin/deals/bulk` with original descriptions, Amazon CDN images and `?tag=ashoksachdev-21`. Duplicate LIVE rows whose price had moved were repriced in place. Run at about 20:45–21:40 IST on 11-23.

**Result: 102 discovered, 96 resolved (the IFS redirector is alive again), 87 fresh (all Amazon), 39 verified and pushed LIVE (ids 17039–17077, every POST returned count 1, every slug matched), 6 duplicate LIVE rows repriced in place, IndexNow HTTP 200 for 48 URLs.**

## Pipeline

| Step | Value |
|---|---|
| Discovered (`/deals` + `/deals/superdeals`) | 102 |
| `?rto=` resolved to a merchant URL | 96 (6 unresolved) |
| Fresh after productId dedup | 87, all Amazon |
| Verified on PDP and pushed | 39 (ids 17039–17077) |
| Duplicates repriced in place | 6 |
| Rejected | about 42 (see below) |

## Pushed (39)

All prices were read on the live product page and matched the push. Six items had low stock at check time, which is stated in their descriptions: B083LZYKWJ Nirlon cookware set (1 left), B0H1C3YFPJ Enakshi helmet cover (2), B0F99ZVVYD adidas Impulse shoes (2), B07HHD5K2F Giordano watch (1), B08XN6LLJG Thermaltake Tough Air 510 (2) and B0H45HKLS2 JCB backhoe toy (2).

Examples: ax950pro 256GB SSD ₹2,700, boAt Aavante Bar B30 ₹1,699, Qubo Neo HEPA H13 purifier ₹4,990, Thermaltake Tough Air 510 ₹4,939, iVoomi FHD webcam ₹999, Zebronics MagBoost-C car charger ₹999, EVM 256GB SSDs, Beardo SPF 60 sunscreen ₹119.

## Repriced in place (duplicate LIVE rows)

| Deal | ASIN | Old → new price | M.R.P. |
|---|---|---|---|
| #9993 Dynotrek laptop sleeve | B0CJ5XVFK5 | ₹249 → ₹199 | ₹1,999 |
| #13541 Zebronics Keypad X3 | B0H2Z4GS59 | ₹742 → ₹730 | ₹1,899 |
| #952 Samsung 45W adaptor | B0DSFTRX77 | ₹793 → ₹680 | ₹3,499 |
| #15720 Tamron 17-70mm | B08PFNNKCC | ₹44,490 → ₹45,990 | ₹67,500 |
| #6751 Havells Luna 6W | B0DT3CF9GK | ₹144 → ₹143 | ₹280 |
| #3477 SanDisk Optimus 5100 500GB | B0GJSFFLXZ | ₹11,299 → ₹11,339 | ₹47,600 |

#15394 (B07BH3TPSZ) was already correct at ₹150. #7259 (B0H5CLR14S) has no buy box and moves to the watch list.

## Rejected

- **Price drift (IFS card price wrong), whole brand blocks rejected:** BOXJOY B0H94NWNDV (₹1,699 vs card ₹999) and B0H94W8X7D (₹999 vs ₹499); B0H3M94795, B07P1M7GRY, B0HHK64X5Z, B0G4R8TW5F, B0H9F7LNWX, B0H5KFFDZZ, B0H7MCHZJ2, B0H8CG8HM7, B0HHB41BHQ, B0GGZK4DND, B0GLP3GMY4, B0G4NCDQ86, B0H4H57335, B0CHJTB7X8, Foxin B0GN2SC8PP.
- **High-ticket drift:** Intel B0GMLJCBBM (₹35,500 vs ₹33,250), Godrej AC B0GSZ9RBWZ (₹34,490 vs ₹31,740), Acer Nitro B0H9SGRP7H, Acer One B0H41ZZX45, Durafit B0F4RMPS7P (₹30,499 vs ₹12,599), IRIS bike B0738NZJFM (₹9,999 vs ₹5,039), HP Pro 14 B0GQ1513LK, HP 15 B0G8HBRT27, Moto Edge 70 B0GRMZ8X9R, Sony BRAVIA B0GZG99HL7. Every high-ticket electronics item drifted this sweep.
- **Havells block:** B078BC2MFS, B0FVDNDNQQ, B00B4BC5MU, B0D7VQXM2K.
- **No buy box:** B0GFM5ZDGX, B0BCVQVLDV, B0GWJJ6YKH, B0HFSTTPWL, B0G3B2CBR6.
- **Junk / grocery:** Sausome, Pond's, two Vokka listings, Lay's.
- **Skipped this tick (M.R.P. read was a per-unit rate):** B0CXPVWDVB, B0FL983H9M, B0GWRW92CY, B0H62DXXQY, B00BKY9I62, B0CK2KZRWM. **No image:** B0CH81WD88. Retry next tick.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 48 URLs (39 new + 6 repriced slugs + 3 hubs) |
| New deal pages | Spot check: 2 of 2 return 200 on prod |
| sitemap.xml | ISR `revalidate = 1800`; deals child is top-100 by design, so new rows appear only if they reach it |
| llms.txt | `force-dynamic`; reflects the batch on the next request |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200 at about 21:40 IST | OK |
| DB LIVE vs API total | 16,470 = 16,470 (16,927 rows in total) | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,077 | OK; deal intake resumed with this batch |
| Posts | 0 coverless | OK |
| Broadcast cursor vs DB max | 17,038 vs 17,077 | OK; the external broadcast cron picks up the 39 new rows on its next run |
| Unpushed commits | 0 before this report | OK |
| Report suffix | No `deal-ingest-2026-11-23*` existed, so this report uses suffix `a` | OK |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 | 3 |
| 11-18 | 3 |
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
- **IFS redirector** is alive again: 96 of 102 resolved at this tick (it was 0 of 105 at 20k).
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17030, #17031, #17032, #17035, #17036. #17027 stays on watch.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973, #7259 (B0H5CLR14S).
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022, #17033, plus the six low-stock items in this batch.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), the IFB 241L refrigerator (B0GWQ46LC3), the Vijaysales Voltas 1.5T AC (f987704ab186), the Voltas Beko washer (B0FDH7M1QS), the Samsung 256L refrigerator (B0G8K4KSR6), the Haier 215L refrigerator (RFRHQNJQCKPHQVTJ) and the Lenovo IdeaPad Slim 5 (COMHZX8EUBZANC6Z).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It is not in `tg-groups.json`; none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
