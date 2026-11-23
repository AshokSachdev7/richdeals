# DESIDIME-INGEST tick — 2026-11-24c

This tick ran from about 04:30 to 04:50 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the `/new` and homepage cards without fetching any deal page. It applied the JUNK and GROCERY filters, resolved each Buy Now through `visit.desidime.com`, and deduped by productId against the live DB. Amazon duplicates were then read on the desktop product page in the logged-in Playwright tab: price from `#corePriceDisplay_desktop_feature_div .a-price-whole`, stock from `#availability` plus `#add-to-cart-button`. The Flipkart duplicate was read from its ld+json in a Playwright tab, and the Myntra duplicate from its page JSON with curl.

**Result: 0 new deals pushed. The only fresh card failed price verification, and all 8 duplicate LIVE rows still match their product pages, so nothing was repriced. No IndexNow ping was sent because no deal was pushed or changed. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 29 |
| Dropped as junk or unsupported | 15, including Chewers dog biscuits (grocery) and an Amazon `/clp/B092JDW7G7` category page |
| Resolved to a store URL | 13 |
| Already in the DB | 8 |
| Rejected in the last 24 hours | 4: Wild Stone kit B0C1CBCH2G, LG window AC ACNHKZYFMQCKKGAH, P.N.Gadgil ring B0BYLK9PZC, an HDFC offer |
| Fresh | 1 |

## Candidates

| Candidate | Card | Product page | Action |
|---|---|---|---|
| Blanket (Amazon) | ₹321 | ₹402 | **Rejected** for drift |

## Duplicates (price-sync)

| Deal | Store | Card | DB | Product page | Action |
|---|---|---|---|---|---|
| #3405 Dove shampoo (B00CQ41JE4) | Amazon | ₹391 | ₹476 | ₹476, in stock, add-to-cart | No change. The card is wrong |
| #4090 Konvio (B08HSN58RK) | Amazon | — | ₹299 / ₹699 | ₹299 / ₹699, in stock | No change |
| #17110 Rexona (B0CMQKR8CJ) | Amazon | — | ₹136 | ₹136, in stock | No change |
| #15316 Lifelong (B0DFYG64PD) | Amazon | — | ₹436 / ₹1,299 | ₹436 / ₹1,299, in stock | No change |
| #17111 Crompton (B0HCV3ZW58) | Amazon | — | ₹428 / ₹2,000 | ₹428 / ₹2,000, in stock | No change |
| #17127 Baby walker (B0HGR4K47X) | Amazon | — | ₹1,599 / ₹2,999 | ₹1,599 / ₹2,999, in stock | No change |
| #12224 Toshiba V37SP 50-inch QLED TV (TVSHZTYRVBSWQJS5) | Flipkart | ₹24,990 | ₹29,990 / ₹49,999 | ld+json ₹29,990, InStock | No change. The card price is most likely a bank-offer price |
| #17084 Skybags Xpressionz 67 L trolley (25221442) | Myntra | — | ₹3,738 / none | `discountedPrice` ₹3,738, `available:true`, M.R.P. ₹11,800 | No change |

Myntra lists an M.R.P. of ₹11,800 for #17084 (68% off). The row's M.R.P. was left null, in line with the inflated-M.R.P. caution in the 11-23 reports.

## Push

Nothing to push. No admin bulk call was made.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent. No deals were pushed or changed |
| sitemap.xml | 200. ISR `revalidate = 1800` |
| llms.txt | 200. `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.60s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,522 = 16,522 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a.md` and `-24b.md` existed, so this report uses suffix `c` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far. CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259, #12963 and #8707.
- **Copy mismatches:** #8707's title says "(65% Off)" while its M.R.P. and discountPct are null, and #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick did not touch Telegram, did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
