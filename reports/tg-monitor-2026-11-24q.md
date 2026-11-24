# TELEGRAM-DEAL-MONITOR tick — 2026-11-24q

This tick ran at about 17:00–17:16 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One `browser_evaluate` read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId).

Both prices were read on the Amazon product page in the logged-in Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes image keyed by `landingAsinColor`. No captcha appeared.

**Result:**

- **1 new deal was pushed LIVE (#17271).** The call returned HTTP 201 with count 1 and `created:true`, and the slug was confirmed on read-back.
- **1 duplicate was checked and left unchanged** (#12664). It matches its live price.
- **IndexNow returned HTTP 200** for 4 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar.

| Group | Newest post | Decision |
|---|---|---|
| ONLINE SHOPPING DEALS | Bata fisherman sandals ₹349 (`link.amazon` shortlink) | Resolved to B091TMJFTR (source tag `vivek123034-21` stripped) |
| SB Loots | Fire-Boltt Fire-Lens Dune ₹1,599 (`amazn.lt` shortlink) | Resolved to B0FT86SBYS (source tag `bhavesh015-21` stripped) |
| CoolzTricks | Roadster sweaters (Myntra) | Skipped: category |
| Dealzone | Oversized tees | Skipped: category |
| Rogerkart | CareFoam ₹809 | Skipped: duplicate #17204, already checked last tick |
| Dealdost | IndusInd credit card | Skipped: not a product |
| IndiaFreeStuff Tips | Instamart loot | Skipped: loot |
| Hidden Loot | Swiggy Dineout ₹11 | Skipped: not a product |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags | Skipped: category |

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B091TMJFTR | Bata men's fisherman sandals (Tan) | ₹349 | ₹349, M.R.P. ₹999, in stock, add-to-cart present | **Pushed as #17271** (65% off) |
| B0FT86SBYS | Fire-Boltt Fire-Lens Dune smart glasses | ₹1,599 | ₹1,599, M.R.P. ₹8,999, in stock | Duplicate #12664 (₹1,599 / ₹8,999), no change |

Both ids were added to `data/tg-multi-seen.json`. The file now has 5,834 entries.

## Push

`/admin/deals/bulk` was called on localhost, which writes to prod through the tunnel. It returned `201 {"count":1,...,"created":true}`. The read-back confirmed status LIVE, ₹349 / ₹999 and the slug that was sent.

| Row | Slug | Affiliate |
|---|---|---|
| #17271 | `bata-mens-fisherman-sandals-b091tmjftr` | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |

The image is `m.media-amazon.com/images/I/61s5fBKddJL._SL1440_.jpg`. The title and description are original rewrites. The page returns 200 on prod (0.13s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: the slug, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.38s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.05–0.53s. Slowest: `/blog` (0.53s) | OK |
| DB LIVE vs API total | 16,664 = 16,664 (16,663 at deal-ingest 11-24i, = +1) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,271 vs 17,255 | OK. The external broadcast cron is working through the IFS batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24p` already existed, so this report uses `q` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-17 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The CONTENT-SEO run at 18:39 IST can add a third. The cap is 4 |

## Still open

- **Stale reposts:** 21 rows repriced today.
- **Repeat drift:** BLACK+DECKER steam mop (B076KYPQMH), Khaitan Volt (B0H8PBSZMY) and ASUS VA259HGA (B0F9KBZ8W3).
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **IFS yield:** 25 of 57 in deal-ingest 11-24i.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215.
- **No buy box:** #7259, #12963, #14154, #13938, #11249.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 groups loaded again this tick.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). This tick did not need it.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick read only the tracked group rows of the sidebar. It did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
