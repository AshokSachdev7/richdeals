# DEAL-INGEST indiafreestuff tick — 2026-11-24d

This tick ran at about 06:55–07:04 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals`, `?page=2`, `?page=3` and `/deals/superdeals` with a 2.6s gap between requests. It resolved the base64 `?rto=` Buy Now ids to store URLs and deduplicated by `productId` against the live DB. Every candidate, plus every duplicate whose card price differed from the DB, was then re-read on the Amazon product page through a same-origin fetch in the logged-in Playwright tab.

**Result: 0 deals were pushed. All 29 fresh candidates were rejected, 5 because the product page has no buy box and 24 because the price drifts from the card. They are the same ASINs at the same card prices as in 11-24c. The 6 duplicates whose card price differed from the DB all still match the DB on the product page, so no row was changed. IndexNow was not sent. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 96 |
| Resolved to a single product | 87 (86 Amazon, 1 Myntra) |
| Dropped | 9 |
| Already in the DB (duplicates) | 58 (all LIVE except #8707, which is EXPIRED) |
| Fresh candidates | 29 (all Amazon) |

The 9 drops:

- Flipkart cards that did not resolve to a product: boAt Aavante Prime 5050D, Sony WH-CH730N, boAt Stone 510, the Caprese sling bag, and the MURPHY Picture Light and Wallchiere wall lamps.
- Hub pages: the Flipkart Black Friday sale hub, the Amazon try-it-first samples page (`/b?node`) and a Pepe Jeans search (`/s?`).

## Candidates

The price was read from `#corePriceDisplay_desktop_feature_div .a-price-whole`, and stock from `#availability` plus `#add-to-cart-button`. The rule rejects any drift above ₹1 and any page without a buy box.

**No buy box (5):** B0FBM947J3, B0GFM5ZDGX, B0BCVQVLDV, B01M8LNG7B and B0C1CBCH2G. None has a core price or an add-to-cart button, only the "other sellers" panel.

**Price drift (24):**

| ASIN | Card | Product page |
|---|---|---|
| B07GFLKTQH | ₹316 | ₹336 (was ₹380 in 11-24c) |
| B092JDW7G7 | ₹346 | ₹965 |
| B0HGB2LWQY | ₹94 | ₹1,199 |
| B0HJ5C7ZMH | ₹99 | ₹1,599 |
| B0GD7MWVQ5 | ₹79 | ₹99 |
| B0H7MB61SM | ₹104 | ₹110 |
| B0HHMM2VH9 | ₹599 | ₹839 |
| B0BGBKY7V2 | ₹920 | ₹939 |
| B0H94NWNDV | ₹999 | ₹1,699 |
| B0H3M94795 | ₹154 | ₹533 |
| B0FBW7D1BY | ₹176 | ₹385 |
| B07P1M7GRY | ₹832 | ₹849 |
| B0HHK64X5Z | ₹366 | ₹385.57 |
| B0G4R8TW5F | ₹239 | ₹244 |
| B0GMLJCBBM | ₹33,250 | ₹35,500 |
| B0H9F7LNWX | ₹149 | ₹878 |
| B0GSZ9RBWZ | ₹31,740 | ₹34,490 |
| B00FMUOCX4 | ₹82 | ₹94 |
| B0H7MCHZJ2 | ₹141 | ₹149 |
| B0H8CG8HM7 | ₹285 | ₹300 |
| B0HHB41BHQ | ₹290 | ₹299 |
| B0GGZK4DND | ₹353 | ₹399 |
| B0868XBJN7 | ₹91 | ₹76, but the page requires a minimum purchase of 3, so the price is ambiguous |
| B0HK3XL66F | ₹374 | ₹749 |

The Myntra card (39961022) is already a LIVE duplicate and was verified in 11-24c.

## Duplicates (price-sync)

| Deal | Card | DB | Product page | Action |
|---|---|---|---|---|
| #17085 (B0DWK8PXF4) | ₹93 | ₹169 | ₹169, in stock | None |
| #17089 (B0DGQ4VTZS) | ₹2,141 | ₹2,140 | ₹2,140.79, in stock | None (within ₹1) |
| #17054 (B0FLJRQPYG) | ₹137 | ₹725 | ₹725, only 2 left | None |
| #17056 (B0FGVCBZ6N) | ₹186 | ₹185 | ₹185.99, in stock | None (within ₹1) |
| #1688 (B083KBJ93F) | ₹233 | ₹232 | ₹232.93, in stock | None (within ₹1) |
| #8707 (B0FH9TZHHG) | ₹800 | ₹1,119 | No buy box | None. The row is already EXPIRED (11-24c) and stays that way |

The other 52 duplicates had card prices equal to the DB and were not re-read.

## Push

None. With no candidate passing verification there was no `/admin/deals/bulk` call and no count to read. No DB row was updated.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent. No deals were pushed or changed |
| sitemap.xml | 200. ISR `revalidate = 1800` |
| llms.txt | 200. `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.58s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,521 = 16,521 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` to `-24c` existed, so this report uses suffix `d` | OK |
| Deploy | None. This was a data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 (ids 637 and 638). The 12:39 IST CONTENT-SEO run can add a third. The cap is 4 |

## Still open

- **IFS yield:** two sweeps in a row produced the same 29 candidates and all 29 failed verification. IFS card prices keep failing on the product page, so expect little from this source until its listing changes.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), boAt Stone 510, the Caprese sling bag, the two MURPHY wall lamps, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
