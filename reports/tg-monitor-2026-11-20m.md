# TELEGRAM-DEAL-MONITOR tick — 2026-11-20m

This tick read the logged-in Telegram Web client through the Playwright MCP (richDeals profile). One `browser_evaluate` over `.chat-list .ListItem.Chat` returned the newest post in every sidebar group, and each was compared against the 13 groups in `data/tg-groups.json`. The client was confirmed live because SB Loots, CoolzTricks, Dealzone and ONLINE SHOPPING DEALS all showed posts newer than tick 20l (11:13–11:58). The ONLINE SHOPPING DEALS chat was then opened with a trusted sidebar click to read the posts between the Gap shirt (20l) and the newest one.

Run at about 12:01–12:25 IST on 11-20.

**Result: 3 new single-product posts. All 3 passed PDP verification and were pushed LIVE (count 3, all created:true, #16997–#16999). IndexNow returned HTTP 200. Prod returned 200 on every probed endpoint, and the CEO audit is green.**

## Candidates

| Group | Newest post | Link | Outcome |
|---|---|---|---|
| SB Loots | Water heater category post (11:58) | `amazn.lt` → category page | Skipped: not a single product |
| CoolzTricks | Same water heater category post (11:57) | `amzn.to` → category page | Skipped: not a single product |
| Dealzone | Borosilicate bottle at ₹350 (11:13) | → B0F8QDZVB8 | **Pushed** |
| ONLINE SHOPPING DEALS | NOC cold brew shot at ₹145 | → B0FRRHPJZB | **Pushed** |
| ONLINE SHOPPING DEALS | Scotch-Brite cooktop wand at ₹338 (posted between the Gap shirt and NOC) | → B07PYFD589 | **Pushed** |
| Rogerkart, Dealdost, INDIAN CHEAP DEALS, NonStopDeals | Unchanged since 20l | — | Seen |
| Hidden Loot, IFS Tips | Swiggy / Dineout tips | — | Not a product |

- The source tags were `glitzdeal05-21` (Dealzone) and `vivek123034-21` (ONLINE SHOPPING DEALS). Both were stripped, and our tag was applied.
- RichDeals (our own channel), "LATEST IPHONE RATES" (not in `tg-groups.json`), RichCEO and Ricautomate_bot were ignored.
- OMG LOOTDEALS, Deal Dibba and Loot Deals 24x7 are not in the top sidebar rows, so they have posted nothing recently.
- No ASIN was in the seen list, and the DB dedup (`productId` or `affiliateUrl` contains the ASIN) returned no match for any of the 3.
- The seen list (`data/tg-multi-seen.json`) went from 5,717 to 5,720 entries.

## PDP verification

All three products were read with a same-origin fetch in the logged-in Amazon tab.

| Field | Bottle (B0F8QDZVB8) | NOC (B0FRRHPJZB) | Scotch-Brite (B07PYFD589) |
|---|---|---|---|
| Price (`#corePriceDisplay .a-price-whole`) | ₹350 (matches post) | ₹145 (matches post) | ₹338 (matches post) |
| M.R.P. | ₹1,300 (73% off). The first `.a-text-price` read was a ₹175.13 per-unit rate; `#centerCol` text gave the real M.R.P. | ₹325 (55% off) | ₹1,500 (77% off, likely inflated) |
| Coupon | none | 2% coupon | none |
| Availability | In stock, add-to-cart present | In stock, add-to-cart present | In stock, add-to-cart present |
| Seller | RetailEZ Pvt Ltd | Morning Brew Pvt Ltd | Clicktech Retail |
| Variant | Set of 2, 750 ml | 20 ml | 1 count (pack of 1) |
| Image | `61wE5zSi6rL._SL1254_.jpg` | `61Q8of9WUWL._SL1500_.jpg` | `713WAHm0z9L._SL1500_.jpg` |

All images are on `m.media-amazon.com/images/I/`.

## Pushed

| Row | Slug | Store | Price | M.R.P. | Affiliate |
|---|---|---|---|---|---|
| #16997 | `cutting-edge-750ml-borosilicate-glass-water-bottle-red-sleeve-set-of-2-b0f8qdzvb8` | Amazon | ₹350 | ₹1,300 (73% off) | `?tag=ashoksachdev-21` |
| #16998 | `noc-high-caffeine-cold-brew-coffee-shot-2-4x-caffeine-liquid-concentrate-20ml-b0frrhpjzb` | Amazon | ₹145 | ₹325 (55% off) | `?tag=ashoksachdev-21` |
| #16999 | `scotch-brite-950-ct-w-glass-cooktop-cleaning-wand-with-2-refill-pads-b07pyfd589` | Amazon | ₹338 | ₹1,500 (77% off) | `?tag=ashoksachdev-21` |

`/admin/deals/bulk` returned HTTP 201 with `count: 3`, and every row came back `created: true`, so no slug restore was needed. The titles and descriptions were written fresh, and the ₹ in each title matches the numeric price. The NOC coupon is carried in `couponNote` and the howTo steps. All 3 deal pages returned 200 on prod.

## Repriced

None.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 6 URLs (the 3 slugs plus the 3 default paths) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.23s |
| `/offers` | 200 | 0.10s |
| `/blog` | 200 | 0.58s |
| `/sitemap.xml` | 200 | 0.09s |
| `/feed.xml` | 200 | 0.11s |
| `/llms.txt` | 200 | 0.52s |
| #16997 page | 200 | 0.17s |
| #16998 page | 200 | 0.18s |
| #16999 page | 200 | 0.14s |
| `/api/deals` | 200: total 16,392, newest id 16,999 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,392 = 16,392 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,999 (this push) | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,996 vs 16,999 | OK. The external tg-broadcast cron sends #16997–#16999 on its next run. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-l` existed, so this report uses suffix `m` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The 2–3 target is met, and the 12:39 IST CONTENT-SEO tick can add a third post. (The audit script's window starts partway through 11-16, so it reads that day as 2.)

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999 (new: Scotch-Brite at ₹1,500).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 12:14 |
| CONTENT-SEO | 11-20 12:39 |
| DESIDIME | 11-20 12:43 |
| DEAL-INGEST | 11-20 12:53 |
| TG | 11-20 13:01 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
