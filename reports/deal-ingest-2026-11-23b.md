# DEAL-INGEST indiafreestuff tick — 2026-11-23b

This tick ran stage 1 of `apps/api/scripts/ingest-ifs-proper.mjs` across `/deals` and `/deals/superdeals`, resolving the base64 `?rto=` Buy Now ids. Each candidate was deduplicated against the live DB by `productId`. Every Amazon price was then read on the product page in the logged-in Playwright tab, using `.a-price-whole` in `#corePriceDisplay` for price, `#centerCol` for M.R.P., and `#availability` plus add-to-cart for stock. No captcha appeared, so the mobile-UA fallback was not needed. Survivors were pushed to `localhost:4000/admin/deals/bulk` with `status:live`, original copy, `m.media-amazon.com` images and the `ashoksachdev-21` tag on `/dp/ASIN`. Finished at about 23:09 IST.

**Result: 25 new deals pushed LIVE (#17085 to #17109, every one HTTP 201 with count 1), and 7 duplicate LIVE rows repriced in place. IndexNow returned HTTP 200 for 35 URLs, and the CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Pipeline

| Stage | Count |
|---|---|
| Stage 1 candidates (`/deals` plus `/deals/superdeals`) | 89 |
| Duplicates of existing rows | 37 |
| Fresh | 52 |
| Fresh rejected for price drift | 23 |
| Fresh rejected for no buy box | 4 |
| **Fresh pushed LIVE** | **25** |
| Duplicates repriced in place | 7 |
| Duplicates unchanged | 29 |
| Duplicates with no buy box | 1 (#12963) |
| Flipkart cards dropped by stage 1, unresolved | 2 |

## Pushed

All 25 were created (count 1), so no slug needed restoring.

| Deal | ASIN | Price | M.R.P. |
|---|---|---|---|
| #17085 Mini Steps 8-inch LCD writing tablet | B0DWK8PXF4 | ₹93 | nulled |
| #17086 Heavenglow motorcycle speedometer cluster | B0HS7DWB8D | ₹1,850 | ₹2,960 |
| #17087 Giordano 1772-06 men's watch | B01MQTS6AV | ₹3,499 | ₹8,950 |
| #17088 Sanfe under-eye cream | B0DN1QV5YF | ₹177 | ₹399 |
| #17089 Lifelong hot and cold compression device | B0DGQ4VTZS | ₹2,140 | ₹5,499 |
| #17090 Water ring toss handheld game | B0FVZ4HB5H | ₹185 | nulled |
| #17091 Primate Bluetooth helmet headset | B0F6VHRHNS | ₹1,499 | ₹3,999 |
| #17092 VikriDA 500-in-1 retro console | B0D3F7P2NF | ₹995 | nulled |
| #17093 Pee Safe period panties, pack of 8 | B0CX8RWCMK | ₹199 | ₹398 |
| #17094 AX650 256GB SATA SSD | B0H7WD82YQ | ₹2,700 | ₹8,750 |
| #17095 Caredone intimate wash 50ml | B0CXPVWDVB | ₹149 | ₹599 |
| #17096 Kenstar Infra Lumo Neo infrared cooktop | B0H5KFFDZZ | ₹2,499 | ₹7,990 |
| #17097 Handcrafted lion ride-on toy | B0GWJJ6YKH | ₹472 | nulled |
| #17098 Vokka Womania pocket perfume | B0GKGSM9NZ | ₹75 | ₹199 |
| #17099 Nodens knee support brace | B0FL983H9M | ₹149 | ₹499 |
| #17100 Utkarsh plant food sticks combo | B0GWRW92CY | ₹249 | ₹599 |
| #17101 Premium Plus diaper pants XL (38 + 2) | B0H62DXXQY | ₹309 | ₹999 |
| #17102 Vokka Desert Oud pocket perfume | B0DMVNRRHG | ₹80 | ₹199 |
| #17103 Spykar slim fit round neck tee | B0CH81WD88 | ₹420 | ₹1,399 |
| #17104 Attro Dazzle 18-piece steel dinner set | B0BZZ9W6N6 | ₹999 | ₹1,899 |
| #17105 La French Hang Out perfume | B0CCYMBG8Q | ₹199 | ₹299 |
| #17106 Recluse B-7000 adhesive glue | B0GKGX26RS | ₹149 | ₹499 |
| #17107 Solimo cast iron shallow fry pan | B08FRZW4QH | ₹884 | ₹2,000 |
| #17108 Vector X VXB-150 badminton racquet | B0BH4Y64PD | ₹423 | ₹749 |
| #17109 Wonderchef Nutri-blend | B07FL3NQQG | ₹3,399 | ₹6,800 |

M.R.P. was nulled where the page showed none, or where it was at or below the price, absurd, or implied 80% off or more. Copy was written fresh for each deal; claims that could not be confirmed on the page (a "10-inch loop handle" on the Solimo pan, a "full copper motor" on the Wonderchef) were cut before the push.

## Repriced

These duplicate LIVE rows were updated through Prisma with price, M.R.P., discount and the rupee amount in the title, and each got a new price-history row.

| Deal | Product | Old → new | M.R.P. |
|---|---|---|---|
| #11866 | ANT AEKS100 kitchen scale | ₹219 → ₹199 | ₹1,399 implied 86% off, so nulled |
| #2210 | Panasonic 9W LED bulb, pack of 4 | ₹189 → ₹202 | ₹680 (70% off) |
| #3513 | Presto! reusable kitchen towel roll | ₹255 → ₹265 | ₹1,125 (76% off) |
| #6365 | Pigeon Cruise 1800W induction cooktop | ₹1,799 → ₹1,599 | ₹3,195 (50% off) |
| #6803 | Crompton Param 12W LED bulb | ₹85 → ₹70 | ₹250 (72% off) |
| #12706 | Solimo 4-tier utility cart | ₹759 → ₹708 | ₹1,999 (65% off) |
| #5856 | Lifelong digital body weighing scale | ₹347 → ₹393 | ₹1,399 (72% off) |

The other 29 duplicates, including #17039 to #17062 from tick 23a, still matched their stored price.

## Rejected

**Price drift (23).** The card price on indiafreestuff did not match the product page:

| Product | Card → page |
|---|---|
| New Bee stand | ₹1,350 → ₹7,289 |
| TechKing | ₹920 → ₹939 |
| BOXJOY | ₹999 → ₹1,699 |
| Cricket ball | ₹154 → ₹533 |
| Sausome | ₹176 → ₹385 |
| Korners | ₹832 → ₹849 |
| Just Herbs | ₹366 → ₹385 |
| USB hub | ₹239 → ₹244 |
| Intel 270K | ₹33,250 → ₹35,500 |
| Cricket bag | ₹149 → ₹878 |
| Godrej AC | ₹31,740 → ₹34,490 |
| Pond's | ₹82 → ₹94 |
| CareDone maternity panties | ₹141 → ₹149 |
| I Action balm | ₹285 → ₹300 |
| Alarm clock | ₹290 → ₹299 |
| Dungaree | ₹353 → ₹399 |
| Bloomingo | ₹367 → ₹675 |
| Acer Nitro | ₹1,87,740 → ₹1,92,990 |
| Acer One | ₹42,730 → ₹43,990 |
| Durafit | ₹12,599 → ₹30,499 |
| IRIS | ₹5,039 → ₹9,999 |
| Lenovo Yoga | ₹1,36,490 → ₹1,46,990 |
| BSB blanket | ₹241 → ₹249 |

The high-ticket electronics block (Intel, Godrej, Acer, Lenovo) drifted together again and was rejected whole.

**No buy box (4):** co-ord set B0FBM947J3, Striders, a Santa costume and a bike cover.

**Duplicate with no buy box:** #12963 Himalaya (B0H6BKQ1Q2). It was left as it is.

**Flipkart cards dropped by stage 1 (2):** boAt Stone 510 (pid ACCHQ9YT3WE7SWZA, card ₹2,099) and a Caprese sling bag. These were not resolved this tick.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200** for 35 URLs (32 deal slugs plus the 3 hubs the script adds) |
| New deal pages | `/mini-steps-8-inch-lcd-writing-tablet-for-kids-b0dwk8pxf4` (#17085) and `/wonderchef-nutri-blend-juicer-mixer-grinder-chopper-b07fl3nqqg` (#17109) both return 200 on prod |
| sitemap.xml | ISR `revalidate = 1800`. New deals outside the top 100 serve `noindex,follow` by design |
| llms.txt | `force-dynamic`, so it is rebuilt on every request |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200 at about 23:09 IST | OK |
| DB LIVE vs API total | 16,502 = 16,502 (16,959 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,109 vs 17,089 | OK; the external cron is working through this batch |
| Posts per day (IST) | 11-17 to 11-20: 3 each; **11-21: 0, 11-22: 0 (missed)**; 11-23: 2 | Flag for the past days; today is within the rule |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report | OK |
| CronList vs roster | 9 of 9 present | OK; nothing recreated |
| Report suffix | `deal-ingest-2026-11-23a.md` existed, so this report uses suffix `b` | OK |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Flipkart drops:** boAt Stone 510 and the Caprese sling bag above.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick did not touch Telegram, and none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
