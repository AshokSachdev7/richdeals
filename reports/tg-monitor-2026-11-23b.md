# TELEGRAM-DEAL-MONITOR tick — 2026-11-23b

This tick read the Telegram Web sidebar at about 21:27 IST on 11-23. It used one `browser_evaluate` over `.chat-list .ListItem.Chat` in the Playwright richDeals profile, which reads the newest post in every loaded group. Shortlinks were resolved with curl. Each product was then checked against `data/tg-multi-seen.json` and the live DB by `productId`, and every price was read on the product page. Finished at about 22:04 IST.

**Result: 2 new deals pushed LIVE (#17080, #17081), and 2 LIVE reposts were re-verified and repriced (#12939, #8822). IndexNow returned HTTP 200 for 7 URLs, and the CEO audit is green.**

## Candidates

| Group | Post | Resolved to | Outcome |
|---|---|---|---|
| CoolzTricks | Havells 1250W steam iron "@₹809 after ₹390 coupon" | Amazon B0FG7JPPVY | **New #17080** at ₹1,199 |
| ONLINE SHOPPING DEALS | GKD coaster set of 6, "Deal Price ₹90" | Amazon B0D2KSQ7DP | **New #17081** at ₹90 |
| Dealzone | EcoLink 20W LED batten, pack of 4, ₹469 | Amazon B09GPKP1LY | Duplicate of LIVE #12939. Repriced from ₹470 to ₹469 |
| CoolzTricks | Havells 1000W dry iron "@₹465 after ₹250 coupon" | Amazon B07LDPLSZC | Duplicate of LIVE #8822. Repriced from ₹799 to ₹714, coupon note added |
| SB Loots And Deals | "BUY -" (no price), `bittli.in` shortlink | Shopsy everteen XXL sanitary pad (XAEGFQZW5YJ3QF6H) | **Skipped** (see below) |

**Not taken from the sidebar:**
- **Dealdost:** Sony CH730N and CH530, already pushed as #17078 and #17079.
- **Rogerkart:** a Myntra category loot.
- **IFS Tips and Hidden Loot:** Swiggy promotions.
- **INDIAN CHEAP DEALS and NonStopDeals:** older category posts.
- **Not loaded in the sidebar:** Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba.

## Price verification

All Amazon prices were read through a same-origin fetch in the logged-in Amazon tab:
- price from `.a-price-whole` in `#corePriceDisplay`
- M.R.P. from `#centerCol`
- stock from `#availability` plus the add-to-cart button
- image from the first `colorImages` hiRes entry on `m.media-amazon.com`

| ASIN | Product page | M.R.P. | Stock | Channel price | Check |
|---|---|---|---|---|---|
| B0FG7JPPVY | ₹1,199 | ₹1,899 | In stock, add to cart | ₹809 after a ₹390 coupon | 809 + 390 = 1,199. Pushed at the page price with a coupon note |
| B0D2KSQ7DP | ₹90 | ₹999 | In stock, add to cart | ₹90 | Exact match |
| B09GPKP1LY | ₹469 | ₹1,800 | In stock, add to cart | ₹469 | Exact match |
| B07LDPLSZC | ₹714 | ₹1,190 | In stock, add to cart | ₹465 after a ₹250 coupon | 465 + 250 = 715, within ₹1. Repriced at the page price with a coupon note |

**How coupon prices were handled:**
- The channel prices for both Havells irons are after a clip coupon.
- Coupon selectors read empty on fetched HTML, so the stored price is the product-page price.
- The coupon note says the coupon was reported and gives the effective price "if it shows for your account".

**Why the Shopsy pad was skipped:**
- The page returns three `finalPrice` values: ₹167, ₹199 (with 50% off) and ₹199.
- The pack size is not clear.
- The channel post gave no price to check against.
- It is also low-ticket FMCG.
- With no single confirmed price, it was not published.

**M.R.P. caveat:** the GKD coaster M.R.P. of ₹999 (91% off) is what the page shows, but it looks inflated for a ₹90 product. It joins the inflated-M.R.P. list.

## Push

New deals were pushed to `localhost:4000/admin/deals/bulk` with `status:live` and the Amazon tag `ashoksachdev-21` on `/dp/ASIN`.

| Deal | HTTP | count | Status | Slug |
|---|---|---|---|---|
| #17080 Havells Glaze 1250W steam iron | 201 | 1 | LIVE | matches |
| #17081 GKD wooden coaster set of 6 | 201 | 1 | LIVE | matches |

Both rows were created, so no slug needed restoring.

The two reposts were updated in place through Prisma, with price, M.R.P., discount and title. Each also got a new price-history row, so `priceValidUntil` runs 14 days from today. #8822's title carries no rupee amount, so there was nothing to change in it.

The 10 link codes and product ids from this tick were added to `data/tg-multi-seen.json`, which now has 5,770 entries.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200** for 7 URLs (4 deal slugs plus the 3 hubs the script adds) |
| New deal pages | `/havells-glaze-1250w-…-b0fg7jppvy` and `/gkd-wooden-coaster-…-b0d2ksq7dp` both return 200 on prod |
| sitemap.xml | ISR `revalidate = 1800`, so the deals child refreshes within 30 minutes. New deals outside the top 100 serve `noindex,follow` by design |
| llms.txt | `force-dynamic`, so it is rebuilt on every request |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200 at about 22:04 IST | OK |
| DB LIVE vs API total | 16,474 = 16,474 (16,931 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,081 vs 17,081 | OK; the external cron has caught up |
| Posts per day (IST) | 11-17 to 11-20: 3 each; **11-21: 0, 11-22: 0 (missed)**; 11-23: 2 | Flag for the past days; today is within the rule |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-23a.md` existed, so this report uses suffix `b` | OK |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s, no buy box, low stock, drift retries and ASIN reuse:** the list in `tg-monitor-2026-11-23a.md`, plus the GKD coaster above.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It was masked in the sidebar read, was not opened, and none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
