# TELEGRAM-DEAL-MONITOR tick — 2026-11-20l

This tick read the logged-in Telegram Web client through the Playwright MCP (richDeals profile). One `browser_evaluate` over `.chat-list .ListItem.Chat` returned the newest post in every sidebar group, and each was compared against the 13 groups in `data/tg-groups.json`. The client was confirmed live in two ways:
- the browser clock read Fri Nov 20 2026 11:01 IST;
- SB Loots, Dealzone, ONLINE SHOPPING DEALS and CoolzTricks all showed new posts since 20k (10:41–10:56), so the sidebar was moving.

Run at about 11:01–11:20 IST on 11-20.

**Result: 4 new posts. 1 passed verification and was pushed LIVE (count 1, created:true, #16996). 2 were reposts of LIVE deals whose price had moved, so both rows were repriced. 1 had no buy box and was skipped. IndexNow returned HTTP 200. Prod returned 200 on every probed endpoint, and the CEO audit is green.**

## Candidates

| Group | Newest post | Link | Outcome |
|---|---|---|---|
| SB Loots | Himalaya face wash @170 (10:56) | `amazn.lt/TaWYpbbh` → B0F6TZBQK4 | Dup of LIVE #6949. Price had moved, so the row was **repriced**. |
| Dealzone | "428 pack of 9" (10:54) | `link.amazon/B0izbdunP` → B0HG97GN9R (Cetaphil Baby bar 3×100 g) | Skipped: no buy box, no add-to-cart (already in the seen list) |
| ONLINE SHOPPING DEALS | Gap shirt ₹1,050 (10:52) | `link.amazon/B05oVvoFk` → B0F8QBRBF8 | **Pushed** |
| CoolzTricks | Medimix pack of 5 at 240 (10:41) | `amzn.to/4j90SzX` → B0B49L5JH2 | Dup of LIVE #14657. Price had moved, so the row was **repriced**. |
| Rogerkart, Dealdost, INDIAN CHEAP DEALS, NonStopDeals | Unchanged since 20k | — | Seen |
| Hidden Loot, IFS Tips | Swiggy Dineout tip | — | Not a product |

- The source tags were `bhavesh015-21` (SB Loots), `glitzdeal05-21` (Dealzone), `vivek123034-21` (ONLINE SHOPPING DEALS) and `collab-amafhh-21` (CoolzTricks). All were stripped, and our tag was applied.
- RichDeals (our own channel), "LATEST IPHONE RATES" (not in `tg-groups.json`), RichCEO and Ricautomate_bot were ignored.
- OMG LOOTDEALS, Deal Dibba and Loot Deals 24x7 are not in the top sidebar rows, so they have posted nothing recently.
- The seen list (`data/tg-multi-seen.json`) went from 5,715 to 5,717 entries (B0F8QBRBF8, B0B49L5JH2).

## PDP verification

All four products were read in the logged-in Amazon tab.

| Field | Gap (B0F8QBRBF8) | Himalaya #6949 (B0F6TZBQK4) | Medimix #14657 (B0B49L5JH2) | Cetaphil (B0HG97GN9R) |
|---|---|---|---|---|
| Price (`#corePriceDisplay .a-price-whole`) | ₹1,050 | ₹170 | ₹240 | — |
| M.R.P. | ₹2,999 (65% off) | ₹449 (62% off) | ₹440 (45% off) | — |
| Availability | Only 2 left, add-to-cart present | In stock, add-to-cart present | In stock, add-to-cart present | No buy box |
| Seller | Cocoblu Retail | RK World Infocom | RK World Infocom | — |
| Variant | Light Blue | Aloe Vera New Packaging | — | — |
| Image | `m.media-amazon.com/images/I/515v4+OsgML._SL1400_.jpg` | unchanged | unchanged | — |

## Pushed

| Row | Slug | Store | Price | M.R.P. | Affiliate |
|---|---|---|---|---|---|
| #16996 | `gap-men-cotton-slim-fit-full-sleeve-collared-chambray-shirt-light-blue-b0f8qbrbf8` | Amazon | ₹1,050 | ₹2,999 (65% off) | `?tag=ashoksachdev-21` |

`/admin/deals/bulk` returned HTTP 201 with `count: 1`, and the row came back `created: true`, so no slug restore was needed. The title and description were written fresh, and the ₹ in the title matches the numeric price. The deal page returned 200 on prod.

## Repriced

| Row | Slug | Was | Now |
|---|---|---|---|
| #6949 | `himalaya-hydrating-aloe-vera-face-wash-200ml` | ₹179 (60% off) | ₹170 (62% off), M.R.P. ₹449 unchanged |
| #14657 | `medimix-ayurvedic-skinfit-soap-125g-pack-of-5-b0b49l5jh2` | ₹199 (55% off) | ₹240 (45% off), M.R.P. ₹440 unchanged |

Both updates went through `prisma.deal.update`. The title, description and howTo were brought to the new ₹ and %, and a re-read came back clean on the first pass. The prod Himalaya page now serves `"price":"170"` in its JSON-LD.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 6 URLs (the 3 slugs plus the 3 default paths) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.21s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.59s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.40s |
| #16996 page | 200 | 0.16s |
| #6949 page | 200 | 0.14s |
| #14657 page | 200 | 0.13s |
| `/api/deals` | 200: total 16,389, newest id 16,996 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,389 = 16,389 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,996 (this push) | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,995 vs 16,996 | OK. The external tg-broadcast cron already covers the whole DesiDime 20f batch; #16996 goes out on its next run. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-k` existed, so this report uses suffix `l` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The 2–3 target is met, and the 12:39 IST CONTENT-SEO tick can add a third post. (The audit script's 7-day window starts partway through 11-16, so it reads that day as 2; earlier full-day reads put it at 3.)

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996 (new: the Gap shirt, 2 left).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 11:14 |
| TG | 11-20 12:01 |
| CONTENT-SEO | 11-20 12:39 |
| DESIDIME | 11-20 12:43 |
| DEAL-INGEST | 11-20 12:53 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
