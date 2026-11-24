# DESIDIME-INGEST tick — 2026-11-24l

This tick ran at about 22:15–22:50 IST on 11-24, inline. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage without fetching any deal page. It applied the JUNK and GROCERY filters, resolved each Buy Now through `visit.desidime.com`, and checked non-Amazon candidates with `productLd()` (ld+json price within ±₹1, InStock). The one Amazon candidate was checked in the logged-in Playwright Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes MAIN image from `colorImages`. Every candidate was checked for duplicates by productId against the live DB. Telegram was not used.

**Result:**

- **1 new deal was pushed LIVE (#17330)**, Amazon. The call returned HTTP 201 with count 1 and `created:true`, and the slug was confirmed on read-back.
- **8 candidates were rejected at stage 1**: 4 on price drift, 3 out of stock and 1 with no ld+json.
- **3 duplicates were checked and left unchanged** (#17110, #17312, #17205).
- **IndexNow returned HTTP 200** for 4 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Junk or unsupported store dropped | 13 |
| Resolved to a product | 20 |
| Already in the DB | 3 |
| Rejected in the last 24h (skipped) | 8 |
| Fresh | 9 |
| Rejected by stage 1 | 8 |

The 8 items skipped as recent rejects: B0HBQHXC7F, B08LKKL3YJ, Digihaat e47d1c39cec4, TVSHA75EKGRHADFH, B0H9T73HJ7, B0H8PBSZMY, B0F9KBZ8W3 and FANGHSKG6GKVCYMP.

Stage 1 rejected 8 of the 9 fresh candidates itself:

| ID | Product | Card | Reason |
|---|---|---|---|
| MOBHQCH6Y8PWYUNX | Samsung Galaxy S25 FE | ₹46,074 | Drift |
| MOBHQCH6G5YNGNRG | Samsung Galaxy S25 | ₹57,949 | Out of stock |
| PJTHRJSZDCUSG3TD | Vartanu pooja thali | ₹589 | Out of stock |
| NDFHHUFVHCCXZYNW | Flipkart Minutes almonds | ₹374 | Drift |
| SAKHJWAYHXDCEHHW | Delish ketchup 2kg | ₹62 | Drift |
| ACNHMKN3G8BVHGF5 | Daikin AC | ₹35,490 | Drift |
| PLSHDVGHERMKDBSJ | Rajdhani peanuts | ₹39 | Out of stock |
| 1d8eafb10167 | HDFC voucher offer | — | No ld+json |

The script wrote these to `data/dd-rejected.json` itself.

## Fresh candidates

| ID | Product | Card | Live read | Decision |
|---|---|---|---|---|
| B072QR5X96 | Razer Goliathus Mobile Stealth Edition mouse pad | ₹499 | ₹499, M.R.P. ₹849, in stock, add-to-cart present | **Pushed as #17330** (41% off) |

## Duplicates (price sync)

| Row | Product | Card | DB | Decision |
|---|---|---|---|---|
| #17110 | Rexona roll-on pack of 2 | ₹123 | ₹123 (repriced in tg-monitor 11-24v) | Unchanged |
| #17312 | LG monitor | ₹1,998 | ₹1,998. Re-read live: still ₹1,998, M.R.P. ₹17,100, "Only 1 left", add-to-cart present | Unchanged, still on watch |
| #17205 | GAP item | ₹386 | ₹386 | Unchanged |

## Push

`/admin/deals/bulk` was called on localhost, which writes to prod through the tunnel. It returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, price ₹499 and the slug that was sent. The title and description are original rewrites.

| Row | Slug | Affiliate |
|---|---|---|
| #17330 | `razer-goliathus-mobile-stealth-edition-portable-gaming-mouse-pad-black-b072qr5x96` | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |

The image is `m.media-amazon.com/images/I/31EoxYp1k9L._SL1000_.jpg`. The new page returns 200 on prod (0.15s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: the slug, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.08s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.40s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.19s, `/offers` 0.08s, `/blog` 0.48s, `/sitemap.xml` 0.08s, `/feed.xml` 0.08s, `/api/deals` 0.12s, `/llms.txt` 0.40s, all 200 | OK |
| DB LIVE vs API total | 16,723 = 16,723 (16,722 at tg-monitor 11-24v, = +1) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,330 vs 17,329 | OK. The external broadcast cron will pick up #17330 |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a.md` to `-24k` already existed, so this report uses `l` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **DesiDime yield:** 1 pushed of 9 fresh this tick; Flipkart card prices drift or go out of stock fast.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Re-read this tick, unchanged. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 27 rows repriced today.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3 and B0GYD83B13.
- **Legacy slugs and titles:** #1530 and #1590 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215 and #17288.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-24v).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
