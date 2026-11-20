# TELEGRAM-DEAL-MONITOR tick — 2026-11-20k

This tick read the logged-in Telegram Web client through the Playwright MCP (richDeals profile). One `browser_evaluate` over `.chat-list .ListItem.Chat` returned the newest post in every sidebar group, and each was compared against the 13 groups in `data/tg-groups.json`. The client was confirmed live in two ways:
- `navigator.onLine` was true and there was no ConnectionStatus banner.
- The browser clock read Fri Nov 20 2026 10:01 IST, and SB Loots and Dealzone showed new posts since 20j (09:28–09:56), so the sidebar was moving.

Run at about 10:01–10:06 IST on 11-20.

**Result: 5 new posts. 2 passed verification and were pushed LIVE (count 2, both created:true). 1 was a repost of a LIVE deal whose price had moved, so that row was repriced. 2 were category posts and were skipped. IndexNow returned HTTP 200. Prod returned 200 on every probed endpoint, and the CEO audit is green.**

## Candidates

| Group | Newest post | Link | Outcome |
|---|---|---|---|
| SB Loots | Park Avenue Good Morning deo ₹119 (09:28) | `amazn.lt/SiRWdl10` → B007E9I11K | **Pushed** |
| SB Loots | Fire-Boltt Ninja X Ring ₹999 (09:44) | `amazn.lt/SqSlILSr` → B0G61F9SDY | **Pushed** |
| SB Loots | "BUY" (09:36) | `amazn.lt/g03hkQuF` → B0HHJN8WPR | Dup of LIVE #13144. Price had moved, so the row was **repriced**. |
| SB Loots | Fubar kurtas (09:56) | `myntr.it/sbZsmVy` | Skipped: category post |
| Dealzone | Solimo kitchenware (09:45) | `link.amazon/B0idrgR1F` | Skipped: category post |
| CoolzTricks | Pigeon chopper | `amzn.to/4j1EVCP` | Seen (#16986, pushed at 20j) |
| Rogerkart, Dealdost, ONLINE SHOPPING DEALS, INDIAN CHEAP DEALS, NonStopDeals | Unchanged since 20j | — | Seen |
| Hidden Loot, IFS Tips | Swiggy Dineout tip | — | Not a product |

- The SB Loots `amazn.lt` links carried the source tag `bhavesh015-21`. It was stripped, and our tag was applied.
- RichDeals (our own channel), "LATEST IPHONE RATES" (not in `tg-groups.json`), RichCEO and Ricautomate_bot (a DM and a bot) were ignored.
- OMG LOOTDEALS, Deal Dibba and Loot Deals 24x7 are not in the top sidebar rows, so they have posted nothing recently.
- B007E9I11K and B0G61F9SDY were absent from both the seen list and the live DB.
- The seen list (`data/tg-multi-seen.json`) went from 5,707 to 5,715 entries.

## PDP verification

All three products were read in the logged-in Amazon tab.

| Field | Park Avenue (B007E9I11K) | Fire-Boltt (B0G61F9SDY) | #13144 (B0HHJN8WPR) |
|---|---|---|---|
| Price (`#corePriceDisplay .a-price-whole`) | ₹119 | ₹999 | ₹699 |
| M.R.P. | ₹199 (40% off) | ₹9,999 (90% off) | ₹1,800 (61% off) |
| Availability | In stock, add-to-cart present | In stock, add-to-cart present | In stock |
| Seller | RK World Infocom | Clicktech Retail | RetailEZ |
| Variant | Body Deodorant | Blush Pink | Blue |
| Coupon | None (only a ₹3 Amazon Pay cashback) | — | — |
| Image | `m.media-amazon.com/images/I/71OI9DfSTPL._SL1500_.jpg` | `m.media-amazon.com/images/I/61wT6-UtrlL._SL1500_.jpg` | unchanged |

The Fire-Boltt M.R.P. of ₹9,999 is inflated, so #16988 joins the inflated-M.R.P. watch list.

## Pushed

| Row | Slug | Store | Price | M.R.P. | Affiliate |
|---|---|---|---|---|---|
| #16987 | `park-avenue-good-morning-deodorant-spray-men-150ml-b007e9i11k` | Amazon | ₹119 | ₹199 (40% off) | `?tag=ashoksachdev-21` |
| #16988 | `fire-boltt-ninja-x-ring-smart-watch-1-96-bluetooth-calling-b0g61f9sdy` | Amazon | ₹999 | ₹9,999 (90% off) | `?tag=ashoksachdev-21` |

`/admin/deals/bulk` returned HTTP 201 with `count: 2`, and both rows came back `created: true`, so no slug restore was needed. The titles and descriptions were written fresh, and the ₹ in each title matches the numeric price. Both deal pages returned 200 on prod.

## Repriced

| Row | Slug | Was | Now |
|---|---|---|---|
| #13144 | `american-tourister-zevo-25l-daypack-blue-b0hhjn8wpr` | ₹509 (72% off) | ₹699 (61% off), M.R.P. ₹1,800 unchanged |

The update went through `prisma.deal.update`. The title, description and howTo were all brought to ₹699 and 61%. The first pass left "(72% Off)" in the title, so a second update fixed it, and a re-read came back clean. The prod page now serves `"price":"699"` in its JSON-LD.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 6 URLs (the 3 slugs plus the 3 default paths) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.18s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.66s |
| `/sitemap.xml` | 200 | 0.08s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.53s |
| #16987 page | 200 | 0.22s |
| #16988 page | 200 | 0.16s |
| #13144 page | 200 | 0.16s |
| `/api/deals` | 200: total 16,381, newest id 16,988 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,381 = 16,381 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,988 (this push) | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,988 = 16,988 | OK. The external tg-broadcast cron has already picked up both new rows. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-j` existed, so this report uses suffix `k` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The 2–3 target is met, and the 12:39 IST CONTENT-SEO tick can add a third post.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 10:14 |
| DESIDIME | 11-20 10:43 |
| DEAL-INGEST | 11-20 10:53 |
| TG | 11-20 11:01 |
| CONTENT-SEO | 11-20 12:39 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
