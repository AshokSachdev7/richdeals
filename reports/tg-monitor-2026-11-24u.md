# TELEGRAM-DEAL-MONITOR tick — 2026-11-24u

This tick ran at about 20:55–21:20 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One read-only evaluate read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId and affiliate URL).

Amazon prices were read on the product page in the logged-in Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes MAIN image from `colorImages`.

**Result:**

- **1 new deal was pushed LIVE (#17329)**, Amazon. The call returned HTTP 201 with count 1 and `created:true`, and the slug was confirmed on read-back.
- **2 candidates were rejected** on price drift (Bata sandals and a Terabyte HDMI cable).
- **IndexNow returned HTTP 200** for 4 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar.

| Group | Newest post | Decision |
|---|---|---|
| CoolzTricks | Bata men's fisherman sandals @₹349, plus women/men category links (`amzn.to`) | First link resolved to B091TKRF6M; category links skipped |
| SB Loots | Bata up to 84% off, women/men links (`amazn.lt`) | Skipped: category |
| ONLINE SHOPPING DEALS | Tuco kids soap (3x75g+1x75g) ₹194 (`link.amazon`) | Resolved to B0G81HHQMK |
| Dealzone | "230" with one `link.amazon` link | Resolved to B0B63V5N7B |
| Dealdost | Premium mix dry fruits 1kg ₹436 | Duplicate #17309 |
| Rogerkart | Boldfit walking pad ₹8,999 | Duplicate #17272 |
| IndiaFreeStuff Tips | Swiggy Instamart loot | Skipped: loot |
| Hidden Loot | ₹11 Swiggy Dineout | Skipped: not a product |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese up to 90% off (`fkrt.it`) | Skipped: category |

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B0G81HHQMK | Tuco Kids Soap, natural vitamin C, Avocado & Citrus 75g (pack of 4) | ₹194 | ₹194, M.R.P. ₹350, in stock | **Pushed as #17329** (44% off) |
| B091TKRF6M | Bata men's fisherman sandals (Tan) | ₹349 | ₹879, M.R.P. ₹1,099 | Rejected: drift. ₹349 was probably one size only |
| B0B63V5N7B | Terabyte 4K HDMI cable | ₹230 | ₹1,099, M.R.P. ₹1,499 | Rejected: drift |

All 3 ids were added to `data/tg-multi-seen.json` (now 5,846 entries). The 2 rejects were added to `data/dd-rejected.json` with `Date.now()` (now 2,260 keys).

## Push

`/admin/deals/bulk` was called on localhost, which writes to prod through the tunnel. It returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, price ₹194 and the slug that was sent. The title and description are original rewrites.

| Row | Slug | Affiliate |
|---|---|---|
| #17329 | `tuco-kids-soap-with-natural-vitamin-c-avocado-and-citrus-75g-pack-of-4-b0g81hhqmk` | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |

The image comes from `m.media-amazon.com`. The new page returns 200 on prod (0.17s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: the slug, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.50s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.16s, `/offers` 0.09s, `/blog` 0.41s, `/sitemap.xml` 0.05s, `/feed.xml` 0.08s, `/api/deals` 0.10s, `/llms.txt` 0.50s, all 200 | OK |
| DB LIVE vs API total | 16,722 = 16,722 (16,721 at deal-ingest 11-24k, = +1) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,329 vs 17,318 | OK. The external broadcast cron is working through the deal-ingest batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24t` already existed, so this report uses `u` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **TG post-price drift:** 2 of 3 candidates this tick had a post price far below the live price (size- or variant-specific "from" prices).
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 26 rows repriced today.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3 and B0GYD83B13.
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215 and #17288.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 groups loaded again this tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). This tick did not need it.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
