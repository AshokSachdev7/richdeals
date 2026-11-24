# TELEGRAM-DEAL-MONITOR tick — 2026-11-24r

This tick ran at about 17:40–18:05 IST on 11-24. It was run inline in the Playwright MCP (richDeals profile). One `browser_evaluate` read the `.chat-list` sidebar, filtered to the titles in `data/tg-groups.json`. Shortlinks were resolved before the product id was read. Every candidate was checked for duplicates against `data/tg-multi-seen.json` and the live DB (by productId).

All four prices were read on the Amazon product page in the logged-in Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes image keyed by `landingAsinColor`. No captcha appeared.

**Result:**

- **3 new deals were pushed LIVE (#17272 to #17274).** Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed on read-back.
- **1 duplicate LIVE row was repriced in place (#2212).** It kept its slug.
- **IndexNow returned HTTP 200** for 7 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Sidebar

10 of the 13 tracked groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the sidebar. Source tags stripped this tick: `bhavesh015-21`, `collab-amafhh-21`, `7383-21`, `glitzdeal05-21`, `vivek123034-21`.

| Group | Newest post | Decision |
|---|---|---|
| SB Loots | Park Avenue Conquer EDP ₹290 (`amazn.lt` shortlink) | Resolved to B077P7K9VR |
| CoolzTricks | Same Park Avenue (`amzn.to` shortlink) | Same product |
| Dealdost | Boldfit walking pad ₹8,999 with ₹500 coupon | Resolved to B0HJZVN6ZP |
| Rogerkart | Same Boldfit | Same product (its shortlink did not resolve) |
| Dealzone | Solimo containers ₹584 | Resolved to B0CWPDBRK5 |
| ONLINE SHOPPING DEALS | RYLLZ toner ₹109 | Resolved to B0F7T656GW |
| IndiaFreeStuff Tips | Instamart loot | Skipped: loot |
| Hidden Loot | Swiggy Dineout | Skipped: not a product |
| INDIAN CHEAP DEALS | LG sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags | Skipped: category |

## Candidates

| ID | Product | Post price | Live read | Decision |
|---|---|---|---|---|
| B077P7K9VR | Park Avenue Conquer EDP, 100ml | ₹290 | ₹290, M.R.P. ₹799, in stock, add-to-cart present | Duplicate #2212 at ₹275 / ₹599. **Repriced** to ₹290 / ₹799 / 64% off |
| B0HJZVN6ZP | Boldfit walking pad treadmill, 3.5HP | ₹8,999 | ₹9,499, M.R.P. ₹32,999, in stock, "₹500 off coupon" shown | **Pushed as #17272** at ₹9,499 (71% off). The description says the coupon brings it to about ₹8,999 |
| B0CWPDBRK5 | Solimo modular storage containers, 1200ml, set of 6 | ₹584 | ₹584, M.R.P. ₹1,500, in stock | **Pushed as #17273** (61% off) |
| B0F7T656GW | RYLLZ Essentials lavender water toner, 100ml | ₹109 | ₹109, M.R.P. ₹477, in stock | **Pushed as #17274** (77% off) |

All four ids were added to `data/tg-multi-seen.json`. The file now has 5,838 entries.

## Push

`/admin/deals/bulk` was called once per new item on localhost, which writes to prod through the tunnel. All three returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, the right price and the slug that was sent.

| Row | Slug | Affiliate |
|---|---|---|
| #17272 | `boldfit-walking-pad-treadmill-3-5hp-b0hjzvn6zp` | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |
| #17273 | `solimo-modular-plastic-storage-containers-1200ml-set-of-6-b0cwpdbrk5` | Amazon |
| #17274 | `ryllz-essentials-pure-lavender-water-toner-100ml-b0f7t656gw` | Amazon |

Images are from `m.media-amazon.com`. Titles and descriptions are original rewrites. #2212 was repriced with `prisma.deal.update` plus a `priceHistory` row, because a bulk push matches on productId and would rewrite the slug; its title and description figures were updated to ₹290 / ₹799 / 64%. All three new pages and #2212 return 200 on prod (0.13–0.19s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 7 URLs: the 4 slugs (3 new + #2212), plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.08s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.41s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.56s. Slowest: `/blog` (0.56s) | OK |
| DB LIVE vs API total | 16,667 = 16,667 (16,664 at tg-monitor 11-24q, = +3) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,274 vs 17,271 | OK. The external broadcast cron will pick up this batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24a.md` to `-24q` already existed, so this report uses `r` | OK |
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

- **Stale reposts:** 22 rows repriced today, including #2212 in this tick.
- **Repeat drift:** BLACK+DECKER steam mop (B076KYPQMH), Khaitan Volt (B0H8PBSZMY) and ASUS VA259HGA (B0F9KBZ8W3).
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles. #2212's slug is the full Amazon listing title, kept to avoid a 404.
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
