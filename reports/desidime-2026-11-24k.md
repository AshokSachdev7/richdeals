# DESIDIME-INGEST tick — 2026-11-24k

This tick ran at about 20:15–20:45 IST on 11-24, inline. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `desidime.com/new` and the homepage without fetching any deal page. It applied the JUNK and GROCERY filters, resolved each Buy Now through `visit.desidime.com`, and checked non-Amazon candidates with `productLd()` (ld+json price within ±₹1, InStock). Amazon candidates were checked in the logged-in Playwright Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes MAIN image keyed by `landingAsinColor`. Every candidate was checked for duplicates by productId against the live DB.

**Result:**

- **2 new deals were pushed LIVE (#17312 and #17313)**: 1 Amazon and 1 Myntra. Both calls returned HTTP 201 with count 1 and `created:true`, and both slugs were confirmed on read-back.
- **9 candidates were rejected** on price drift or missing data: 5 Amazon at the product-page check and 4 at stage 1. Most of the Amazon card prices were net of a bank offer.
- **3 duplicates were checked and left unchanged** (#17164, #17275, #17205).
- **IndexNow returned HTTP 200** for 5 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 32 |
| Junk dropped | 9 |
| Resolved to a product | 22 |
| Already in the DB | 3 |
| Rejected in the last 24h | 8 |
| Fresh | 11 |

Stage 1 rejected 4 of the 11 fresh candidates itself:

| ID | Product | Reason |
|---|---|---|
| e47d1c39cec4 | Digihaat Nafed moong | No ld+json |
| TVSHA75EKGRHADFH | Xiaomi 43" TV | Drift: ₹26,499 → ₹31,999 |
| ACNHHG4MJQUP5GTK | Lloyd AC | Drift: ₹47,990 → ₹55,990 |
| WAPHY885HRQ33C29 | Pureit purifier | Drift: ₹6,047 → ₹6,999 |

## Fresh candidates

| ID | Product | Card | Live read | Decision |
|---|---|---|---|---|
| B08LKKL3YJ | Helios shoe shiner | ₹199 | ₹277 | Rejected: drift |
| B0GX9K5JJF | ASUS Zenbook | ₹118,331 | ₹125,990 | Rejected: drift (bank-offer net price) |
| B0HLS25C4T | HP 15 laptop | ₹43,133 | ₹45,400 | Rejected: drift (bank-offer net price) |
| B0FLVYB67J | ALKETRON all-in-one PC | ₹28,281 | ₹29,781 | Rejected: drift (bank-offer net price) |
| B0H9T73HJ7 | Bosch fridge | ₹30,490 | ₹39,990 | Rejected: drift |
| B0BNQDLGMR | LG 24" IPS Full HD monitor | ₹1,998 | ₹1,998, in stock ("Only 1 left"), sold by Clicktech Retail, ships from Amazon, 171 ratings | **Pushed as #17312.** The live M.R.P. is ₹17,100, which implies 88% off, so M.R.P. was set to null (≥80% rule). The card itself said "(OOS, But Check if available)" |
| Myntra 40914237 | Sport Street by Glitchez windcheater | ₹883 | ₹883, M.R.P. ₹2,599, InStock (`productLd` ok) | **Pushed as #17313** (66% off) |

All 5 rejected ASINs were added to `data/dd-rejected.json` with `Date.now()`.

## Duplicates (price sync)

| Row | Product | DB | Live | Action |
|---|---|---|---|---|
| #17164 | EcoLink (B0GD8MV3SC) | ₹1,827 | ₹1,826 (card ₹1,645) | None. Within ±₹1. The card price is likely post-coupon |
| #17275 | Roadster bomber (Myntra 14306506) | ₹724 | Not re-read | None. The card price (₹724) matches the DB |
| #17205 | GAP tee (Flipkart TSHHB2C6GFZZXEXD) | ₹386 | Not re-read | None. The card price (₹386) matches the DB |

## Push

`/admin/deals/bulk` was called on localhost, one deal per call, which writes to prod through the tunnel. Each call returned `201 {"count":1,...,"created":true}`, and the read-back confirmed status LIVE, the price and the slug that was sent. Titles and descriptions are original rewrites.

| Row | Slug | Price | M.R.P. | Affiliate |
|---|---|---|---|---|
| #17312 | `lg-24-inch-ips-full-hd-monitor-with-hdr10-freesync-and-height-adjust-b0bnqdlgmr` | ₹1,998 | null | Amazon `?th=1&psc=1&tag=ashoksachdev-21` |
| #17313 | `sport-street-by-glitchez-stand-collar-windcheater-jacket-40914237` | ₹883 | ₹2,599 | InRDeals |

Images come from `m.media-amazon.com` and `assets.myntassets.com`. Both new pages return 200 on prod (0.20s and 0.19s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 5 URLs: the 2 slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.08s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.39s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.60s, `/offers` 0.09s, `/blog` 0.58s, `/sitemap.xml` 0.08s, `/feed.xml` 0.10s, `/api/deals` 0.09s, `/llms.txt` 0.39s, all 200 | OK |
| DB LIVE vs API total | 16,706 = 16,706 (16,704 at sitemon 11-24t, = +2) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,313 vs 17,313 | OK. The external broadcast cron has already picked up both new rows |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24*` up to `-24j` already existed, so this report uses `k` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-12 | 3 |
| 11-13 to 11-15 | 2 each |
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **DesiDime Amazon card drift:** 5 of the 6 Amazon candidates this tick had a stale or bank-offer-net price on the card.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
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
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-24t).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
