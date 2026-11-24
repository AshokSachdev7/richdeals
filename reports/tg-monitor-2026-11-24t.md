# TELEGRAM-DEAL-MONITOR tick — 2026-11-24t

This tick ran at about 19:40–20:15 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One `browser_evaluate` read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId).

Amazon prices were read on the product page in the logged-in Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes MAIN image from `colorImages`.

**Result:**

- **1 new deal was pushed LIVE (#17311)**, Amazon. The call returned HTTP 201 with count 1 and `created:true`, and the slug was confirmed on read-back.
- **3 duplicates were checked and left unchanged** (#17272, #17308, #17309).
- **1 candidate was rejected** on price drift (iFFALCON 65" TV).
- **IndexNow returned HTTP 200** for 4 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar.

| Group | Newest post | Decision |
|---|---|---|
| CoolzTricks | Everyuth tan removal night cream 50g ₹104 (`amzn.to`) | Resolved to B07DW9T61Z |
| SB Loots | iFFALCON 65" 4K Google TV ₹37,249 after coupon + ICICI offer, with a second 40" TV in the same post (`amazn.lt`) | Resolved to B0GYD83B13 |
| ONLINE SHOPPING DEALS | Salt toothpaste ₹189 | Duplicate #17308 |
| Dealdost | Premium mix dry fruits 1kg ₹436 | Duplicate #17309 |
| Rogerkart | Boldfit walking pad ₹8,999 with ₹500 coupon (`rogerkart.com/r/` shortlink, ASIN read from the page body) | Resolved to B0HJZVN6ZP, duplicate #17272 |
| Dealzone | Women's clothing up to 92% off, 3 brand links | Skipped: multi-product |
| IndiaFreeStuff Tips | Swiggy Instamart loot | Skipped: loot |
| Hidden Loot | ₹11 Swiggy Dineout | Skipped: not a product |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags up to 90% off (`fkrt.it`) | Skipped: category |

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B07DW9T61Z | Everyuth Naturals Tan Removal Choco Cherry Night Cream, 50g | ₹104 | ₹104, M.R.P. ₹349, in stock | **Pushed as #17311** (70% off) |
| B0GYD83B13 | iFFALCON 65U75 65" 4K Google TV | ₹37,249 | ₹49,999, M.R.P. ₹99,990 | Rejected: drift. The post price stacks a ₹4,000 coupon and a ₹1,500 ICICI card offer, which not every buyer gets |
| B0HJZVN6ZP | Boldfit walking pad | ₹8,999 | ₹9,499 plus an "Apply ₹500 coupon" | Duplicate #17272 (₹9,499). The row matches the price every buyer pays. No change |

Both new ids were added to `data/tg-multi-seen.json` (B0HJZVN6ZP was already there). The file now has 5,843 entries.

## Push

`/admin/deals/bulk` was called on localhost, which writes to prod through the tunnel. It returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, price ₹104 and the slug that was sent. The title and description are original rewrites.

| Row | Slug | Affiliate |
|---|---|---|
| #17311 | `everyuth-naturals-tan-removal-choco-cherry-night-cream-50g-b07dw9t61z` | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |

The image comes from `m.media-amazon.com`. The new page returns 200 on prod (0.13s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: the slug, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.42s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–1.19s. Slowest: `/` and `/api/deals` (1.19s each, up from 0.17s and 0.09s at sitemon 11-24s) | OK. A single slow read, likely a cold cache after the push. Watch it in the next SITEMON tick |
| DB LIVE vs API total | 16,704 = 16,704 (16,703 at sitemon 11-24s, = +1) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,311 vs 17,310 | OK. The external broadcast cron will pick up #17311 |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24s` already existed, so this report uses `t` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **Stale reposts:** 22 rows repriced today.
- **Repeat drift:** BLACK+DECKER steam mop (B076KYPQMH), Khaitan Volt (B0H8PBSZMY) and ASUS VA259HGA (B0F9KBZ8W3).
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **IFS yield:** 27 of 50 in deal-ingest 11-24j.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215 and #17288.
- **No buy box:** #7259, #12963, #14154, #13938 and #11249.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 groups loaded again this tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). This tick did not need it.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
