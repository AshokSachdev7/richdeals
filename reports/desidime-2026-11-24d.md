# DESIDIME-INGEST tick — 2026-11-24d

This tick ran at about 06:46–06:51 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the cards on `/new` and the homepage without fetching any per-deal page. It applied the JUNK and GROCERY filters, resolved Buy Now through `visit.desidime.com`, and deduplicated by `productId` against the live DB.

**Result: 0 fresh deals, so nothing was pushed. 8 duplicates matched LIVE rows. The 2 whose card price differed from the DB were re-read on the product page, and both still match the DB, so no row was changed. IndexNow was not sent. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 28 |
| Dropped as junk, grocery or other non-product | 15 |
| Resolved to a single product | 13 |
| Already in the DB (duplicates) | 8 |
| Rejected in the last 24 hours (skipped) | 5 |
| Fresh candidates | 0 |

## Candidates

None. The 5 skipped items were rejected in earlier ticks within the last 24 hours:

- Wild Stone kit (B0C1CBCH2G), ₹399
- LG window AC (ACNHKZYFMQCKKGAH), ₹29,490
- P.N.Gadgil ring (B0BYLK9PZC), ₹10,934
- wear me blanket (BLAGUX9GJJBEZME2), ₹321
- An HDFC card offer, ₹7,000 (not a product)

## Duplicates (price-sync)

| Deal | Store | Card | DB | Product page | Action |
|---|---|---|---|---|---|
| #3405 Dove Intense Repair Shampoo 650ml (B00CQ41JE4) | Amazon | ₹391 | ₹476 | ₹476 in `#corePriceDisplay` `.a-price-whole`, In stock, add-to-cart present, M.R.P. ₹1,082 | None. The card price is most likely a coupon or Subscribe & Save price |
| #12224 Toshiba V37SP 50" QLED (TVSHZTYRVBSWQJS5) | Flipkart | ₹24,990 | ₹29,990 | ld+json `Product.offers.price` 29,990, InStock. ₹24,990 and ₹25,490 appear on the page only as bank-offer prices | None. The card shows the bank-offer price |
| #17127 baby walker (B0HGR4K47X) | Amazon | ₹1,599 | ₹1,599 | Not re-read. Card is identical to 11-24c, which verified it | None |
| #4090 Konvio (B08HSN58RK) | Amazon | ₹299 | ₹299 | Not re-read (same reason) | None |
| #17110 Rexona (B0CMQKR8CJ) | Amazon | ₹136 | ₹136 | Not re-read (same reason) | None |
| #15316 Lifelong (B0DFYG64PD) | Amazon | ₹436 | ₹436 | Not re-read (same reason) | None |
| #17111 Crompton (B0HCV3ZW58) | Amazon | ₹428 | ₹428 | Not re-read (same reason) | None |
| #17084 Skybags (25221442) | Myntra | ₹3,738 | ₹3,738 | Not re-read (same reason) | None |

## Push

None. With no fresh candidates there was no `/admin/deals/bulk` call and no count to read. No DB row was updated.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent. No deals were pushed or changed |
| sitemap.xml | 200. ISR `revalidate = 1800` |
| llms.txt | 200. `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.54s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,521 = 16,521 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a.md` to `-24c` existed, so this report uses suffix `d` | OK |
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

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
