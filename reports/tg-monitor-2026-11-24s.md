# TELEGRAM-DEAL-MONITOR tick — 2026-11-24s

This tick ran at about 19:10–19:30 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One `browser_evaluate` read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId).

Amazon prices were read on the product page in the logged-in Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes image keyed by `landingAsinColor`. The Shopsy item was read from its product data (`finalPrice`/`mrp`), with stock taken from the absence of the Sold Out widget, because Shopsy serves no ld+json.

**Result:**

- **3 new deals were pushed LIVE (#17308 to #17310)**: 2 Amazon and 1 Shopsy. Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed on read-back.
- **2 duplicates were checked and left unchanged** (#17272, #17274). Both match their live price.
- **1 candidate was rejected** on price drift (Bosch fridge).
- **IndexNow returned HTTP 200** for 6 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar.

| Group | Newest post | Decision |
|---|---|---|
| CoolzTricks | Salt Dusk Night toothpaste ₹189 | Resolved to B0CH9PMY7N |
| Dealdost | Bhuvenika mix dry fruits 1kg ₹436 | Resolved to B0HLG1JX2V |
| SB Loots | Inklenzo men's loafers (Shopsy) | Resolved to EOEGWAMKUBF9N6YJ |
| Rogerkart | B0HJZVN6ZP at ₹8,999 | Duplicate #17272 |
| ONLINE SHOPPING DEALS | B0F7T656GW at ₹109 | Duplicate #17274 |
| Dealzone | Bosch fridge ₹30,490 | Resolved to B0H9T73HJ7 |
| INDIAN CHEAP DEALS | Sale post | Skipped: sale hub |
| NonStopDeals | Category post | Skipped: category |
| IndiaFreeStuff Tips | Loot post | Skipped: loot |
| Hidden Loot | Non-product offer | Skipped: not a product |

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B0CH9PMY7N | Salt Oral Care Dusk Night toothpaste, French Vanilla, 100g | ₹189 | ₹189, M.R.P. ₹295, in stock | **Pushed as #17308** (36% off) |
| B0HLG1JX2V | Bhuvenika Premium Mix Dry Fruits, 1kg | ₹436 | ₹436, M.R.P. ₹1,099, in stock | **Pushed as #17309** (60% off) |
| EOEGWAMKUBF9N6YJ | Inklenzo men's black loafers (Shopsy) | ₹397 | ₹397, M.R.P. ₹999, in stock | **Pushed as #17310** (60% off) |
| B0HJZVN6ZP | — | ₹8,999 | ₹9,499 | Duplicate #17272 (₹9,499). The post was wrong, not the row. No change |
| B0F7T656GW | — | ₹109 | ₹109 | Duplicate #17274 (₹109), no change |
| B0H9T73HJ7 | Bosch refrigerator | ₹30,490 | ₹39,990 | Rejected: drift |

On Shopsy, `finalPrice` (₹357) is a special price that needs a basket or payment discount. The listing total of ₹397 is what any buyer pays, so that is the price used.

All 6 ids were added to `data/tg-multi-seen.json`. The file now has 5,841 entries.

## Push

`/admin/deals/bulk` was called once per item on localhost, which writes to prod through the tunnel. All 3 returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, the right price and the slug that was sent. Titles and descriptions are original rewrites.

| Row | Slug | Affiliate |
|---|---|---|
| #17308 | `salt-oral-care-dusk-night-toothpaste-french-vanilla-100g-b0ch9pmy7n` | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |
| #17309 | `bhuvenika-premium-mix-dry-fruits-1kg-b0hlg1jx2v` | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |
| #17310 | `inklenzo-men-s-black-loafers-for-formal-and-casual-wear-eoegwamkubf9n6yj` | Cuelinks (Shopsy is not Flipkart) |

The Amazon images come from `m.media-amazon.com` and the Shopsy image from `rukminim3.flixcart.com`. The new Shopsy page returns 200 on prod (0.16s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 6 URLs: the 3 slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.06s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.37s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.54s. Slowest: `/blog` (0.54s) | OK |
| DB LIVE | 16,703 (16,700 at deal-ingest 11-24j, = +3) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,310 vs 17,285 | OK. The external broadcast cron is working through the IFS batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24r` already existed, so this report uses `s` | OK |
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
