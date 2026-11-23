# DEAL-INGEST (indiafreestuff) tick — 2026-11-24a

This tick ran from about 00:56 to 01:18 IST on 11-24. Stage 1 of `ingest-ifs-proper.mjs` swept both `/deals` and `/deals/superdeals`. Each base64 `?rto=` Buy Now id was resolved to its merchant URL. Every candidate price was then checked on the product page: Amazon in the logged-in Playwright tab, with the mobile-UA `/gp/aw/d/` read as a fallback. All pushed copy was rewritten from scratch, and images come from `m.media-amazon.com` only.

**Result: 14 new Amazon deals pushed LIVE (HTTP 201, count 14, all `created:true`, so no slugs needed restoring). 8 existing rows were repriced in place, and one of them (#13516) was revived from EXPIRED. 34 candidates were rejected. IndexNow returned HTTP 200 for 25 URLs. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Pipeline

| Stage | Count |
|---|---|
| Candidates from `/deals` + `/deals/superdeals` | 85 |
| Already in the DB (dedup by productId) | 41 |
| Fresh | 44 |
| Fresh and verified on the product page, then pushed | 14 |
| Fresh and rejected (drift, no add-to-cart, no price) | 30 |
| Duplicates whose live price had moved, repriced in place | 8 |
| Duplicates whose price still matched | 32 |
| Duplicates flagged and left alone | 1 (#8707) |

## Pushed (all Amazon, `?tag=ashoksachdev-21`)

| Deal | ASIN | Price | M.R.P. |
|---|---|---|---|
| Marks & Spencer women's high-rise modern bikini underwear | B0DH4Z64L3 | ₹199 | nulled (₹999 implies 80% off) |
| Louis Philippe men's slim-fit pique polo | B0D4VR1BX9 | ₹533 | ₹1,499 (64%) |
| Giordano analog men's watch | B078JDYWQS | ₹1,499 | nulled (inflated) |
| Kabello cotton baby ear-flap cap | B08KHGXHPK | ₹149 | ₹349 (57%) |
| Kuber Industries 30L foldable laundry basket | B07QDR5MZS | ₹299 | none |
| Electric/charcoal dual-function barbecue grill | B08F7K54HP | ₹845 | ₹3,999 (79%) |
| Simon Carter green blazer | B0CRWGK153 | ₹1,899 | nulled (inflated) |
| NYRWANA Christmas tree window light | B0HRFP1HR8 | ₹299 | ₹999 (70%) |
| Bamboo vinegar herbal foot patches | B0G1YCBH2G | ₹99 | nulled (inflated) |
| XH-W3001 digital thermostat, DC 24V | B08Q4DGKR4 | ₹319 | ₹750 (57%) |
| Veera Paridhaan men's jute Nehru jacket, black | B01C2VX1NC | ₹399 | none |
| OCEANEVO 1200ml steel tumbler with 3 straws | B0D632CTK5 | ₹799 | ₹2,799 (71%) |
| Colgate Visible White toothpaste, pack of 4 | B086Q88V9H | ₹361 | none |
| 3-ply toilet paper, 4 rolls | B0HQ1D6D47 | ₹109 | none |

Before the POST, a validator checked that every ₹ figure in each title and how-to matched the price, and that each description quoted only the price or the M.R.P. It also checked that any M.R.P. was above the price and below an 80% implied discount, and that a nulled M.R.P. meant no "% Off" in the title.

## Repriced in place (dup LIVE rows, Prisma update + `priceHistory` row)

| Row | Product | Old → new | M.R.P. after |
|---|---|---|---|
| #16879 | Footloose by Skybags Nomad 26L backpack | ₹302 → ₹692 | ₹2,845 (76%) |
| #17085 | Mini Steps 8-inch LCD writing tablet | ₹93 → ₹169 | ₹599 (72%) |
| #17054 | Sedell Paris GlowScape illuminator palette | ₹136 → ₹725 | nulled; ₹725 is now the full price |
| #17058 | Women's lycra co-ord set | ₹428 → ₹499 | nulled (₹2,499 implies 80% off) |
| #12194 | ZEBRONICS Sonic Pod 15 Plus | ₹949 → ₹899 | ₹1,999 (55%); also fixed the old title/description mismatch (53% vs 50%) |
| #13516 | White Oud roll-on attar, 12 ml | EXPIRED ₹199 → LIVE ₹149 | nulled |
| #15554 | Beardo Whisky Smoke EDP, 20 ml | ₹125 → ₹150 | ₹349 (57%) |
| #8412 | BLA BLI BLU On The Hills perfume, Myntra | ₹220 → ₹259 | nulled (₹1,299 implies 80% off); InRDeals affiliate URL untouched |

Each title and description was rewritten so that every ₹ figure and percentage matches the new numbers. Slugs are unchanged, and prod returns `"price":"149"` for #13516.

**Flagged, not changed:** #8707 Reebok (B0FH9TZHHG) has no buy box on the product page, which reads ₹179 against ₹1,119 in the DB. This needs a recheck next tick before it is repriced or expired.

## Rejected

**Price drift (card → product page).** IFS listing prices are wrong again for most candidates. The CareDone block was rejected whole.

| Product | Card → page |
|---|---|
| Ap'pulse | ₹316 → ₹380 |
| Chewers | ₹346 → ₹965 |
| Baby walker B0HGB2LWQY | ₹94 → ₹99 |
| Baby walker B0HJ5C7ZMH | ₹99 → ₹1,599 |
| uNest | ₹79 → ₹99 |
| CareDone B0H7MB61SM | ₹104 → ₹110 |
| CareDone B0H7MCHZJ2 | ₹141 → ₹149 |
| Milton | ₹599 → ₹839 |
| New bee | ₹1,350 → ₹7,289 |
| TechKing | ₹920 → ₹939 |
| BOXJOY | ₹999 → ₹1,699 |
| Cricket ball | ₹154 → ₹533 |
| Sausome | ₹176 → ₹385 |
| Korners | ₹832 → ₹849 |
| Just Herbs | ₹366 → ₹385.57 |
| USB hub | ₹239 → ₹244 |
| Intel 270K | ₹33,250 → ₹35,500 |
| Cricket bag | ₹149 → ₹878 |
| Godrej AC | ₹31,740 → ₹34,490 |
| Pond's | ₹82 → ₹94 |
| I Action | ₹285 → ₹300 |
| Alarm clock | ₹290 → ₹299 |
| Dungaree | ₹353 → ₹399 |
| Dabur | ₹91 → ₹76 |
| Roller base | ₹374 → ₹749 |

**No add-to-cart:** Gear backpack (B01M8LNG7B), and Wild Stone (B0C1CBCH2G), which also drifted from ₹399 to ₹382.

**No price on the product page:** co-ord set (B0FBM947J3), Striders (B0GFM5ZDGX), Santa costume (B0BCVQVLDV).

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 22 slugs + 3 hub URLs) | HTTP 200 for 25 URLs |
| New deal pages on prod (Louis Philippe, toilet paper) and revived #13516 | 200 |
| sitemap.xml | ISR `revalidate = 1800`. Returns 200. The deals child is top-100 only by design |
| llms.txt | `force-dynamic`, rebuilt per request. Returns 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.53s | OK |
| DB LIVE vs API total | 16,520 = 16,520 (16,505 + 14 new + 1 revived; 16,976 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,126 vs 17,112 | OK; this tick's push, which the external broadcast cron picks up |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | No `deal-ingest-2026-11-24*` existed, so this report uses suffix `a` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far (CONTENT-SEO runs again at 06:39 IST) |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259, #12963, and now #8707.
- **Flipkart drops:** boAt Stone 510 and the Caprese sling bag.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick did not touch Telegram, and none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
