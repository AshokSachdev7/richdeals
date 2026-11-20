# TELEGRAM-DEAL-MONITOR tick — 2026-11-20j

This tick read the logged-in Telegram Web client through the Playwright MCP (richDeals profile). One `browser_evaluate` over `.chat-list .ListItem.Chat` returned the newest post in every sidebar group, and each was compared against the 13 groups in `data/tg-groups.json`. The client was confirmed live in three ways:
- `navigator.onLine` was true and there was no ConnectionStatus banner.
- The browser clock read Fri Nov 20 2026 09:01 IST.
- The CoolzTricks public preview (`t.me/s/`) showed exactly one post since 20h, `amzn.to/4j1EVCP` at 2026-11-20T03:12:49Z (08:42 IST). That matches the sidebar.

Run at about 09:01–09:10 IST on 11-20.

**Result: 1 candidate, which passed verification and was pushed LIVE (count 1, created:true). IndexNow returned HTTP 200. Prod returned 200 on every probed endpoint, and the CEO audit is green.**

## Candidates

| Group | Newest post | Link | Outcome |
|---|---|---|---|
| CoolzTricks | Pigeon 300W Electric Chopper ₹859 (08:42) | `amzn.to/4j1EVCP` → B0C7BV8X5W | **Pushed** |
| Dealzone | Same Pigeon chopper (08:44) | `link.amazon/B00zMjDfm` | Same product as the CoolzTricks post. The shortlink code is not the ASIN. |
| SB Loots | "Missed Some Loots" settings post (02:33) | — | Not a deal |
| Rogerkart | Basics speaker ₹756 | `rogerkart.com/r/ePvPCjC` | Seen |
| Dealdost | La-Fetch hoodies (Thu) | `W24LAXi` | Seen |
| ONLINE SHOPPING DEALS | U.S. Polo ₹1,181 | `link.amazon/B0fI4zRXn` | Seen |
| INDIAN CHEAP DEALS | LG | `B08FsUNwo` | Seen |
| NonStopDeals | Caprese | `fkrt.it/dyoEV7uuuN` | Seen |
| Hidden Loot, IFS Tips | Swiggy Dineout tip | — | Not a product |

- RichDeals (our own channel), "LATEST IPHONE RATES" (not in `tg-groups.json`), RichCEO and Ricautomate_bot (a DM and a bot) were ignored.
- OMG LOOTDEALS, Deal Dibba and Loot Deals 24x7 are not in the top sidebar rows, so they have posted nothing recently.
- B0C7BV8X5W was absent from both the seen list and the live DB (no match on `productId` or `affiliateUrl`).
- The seen list (`data/tg-multi-seen.json`) went from 5,704 to 5,707 entries: `4j1EVCP`, `B00zMjDfm` and `B0C7BV8X5W` were added.

## PDP verification

The product page was read in the logged-in Amazon tab.

| Field | Value |
|---|---|
| Title | Pigeon Ultra Fast Electric 300 Watts Electric Chopper, Twin Blade, 600 ml Chop-N-Store bowl, Red |
| Price | `#corePriceDisplay .a-price-whole` = 859, and `#centerCol` reads "₹859.00 with 67 percent savings" |
| M.R.P. | ₹2,595 |
| Availability | `#availability` "In stock", and an add-to-cart button is present |
| Seller | RetailEZ Pvt Ltd |
| Coupon | None. The channel's ₹859 is the plain price, not a post-coupon price. |
| Rating | 4.1 from 1,192 reviews, Amazon's Choice |
| Image | `m.media-amazon.com/images/I/51HbbDH3yiL._SL1500_.jpg` (hiRes) |

## Pushed

| Row | Slug | Store | Price | M.R.P. | Affiliate |
|---|---|---|---|---|---|
| #16986 | `pigeon-300w-electric-chopper-600ml-twin-blade-b0c7bv8x5w` | Amazon | ₹859 | ₹2,595 (67% off) | `?tag=ashoksachdev-21` |

`/admin/deals/bulk` returned HTTP 201 with `count: 1` and `created: true`, so no slug restore was needed. The title and description were written fresh, and the ₹859 in the title matches the numeric price. The deal page returned 200 on prod.

## Repriced

None.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 4 URLs (the slug plus the 3 default paths) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.19s |
| `/offers` | 200 | 0.10s |
| `/blog` | 200 | 0.48s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.36s |
| New deal page | 200 | 0.14s |
| `/api/deals` | 200: total 16,379, newest id 16,986 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,379 = 16,379 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,986 (this push) | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 vs 16,986 | OK. The 2-row gap is the 20e deal-ingest push and this push; the external tg-broadcast cron picks them up on its next run. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-i` existed, so this report uses suffix `j` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The 2–3 target is met, and the 12:39 IST CONTENT-SEO tick can add a third post.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 09:14 |
| TG | 11-20 10:01 |
| DESIDIME | 11-20 10:43 |
| DEAL-INGEST | 11-20 10:53 |
| CONTENT-SEO | 11-20 12:39 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
