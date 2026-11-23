# DEAL-INGEST indiafreestuff tick — 2026-11-24b

This tick ran from about 02:25 to 03:10 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved each base64 `?rto=` Buy Now id to a store URL. Candidates were deduped by productId against the live DB. Every fresh Amazon ASIN, and every duplicate whose card price differed from the DB, was then read on the desktop product page in the logged-in Playwright tab: price from `#corePriceDisplay_desktop_feature_div .a-price-whole`, stock from `#availability` plus `#add-to-cart-button`, and the image from `#landingImage`.

**Result: 2 new deals pushed LIVE (HTTP 201, count 2, both created). 1 duplicate LIVE row was repriced in place. 29 of the 31 fresh cards failed price verification. IndexNow returned HTTP 200 for 6 URLs. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/deals` + `/deals/superdeals`) | 96 |
| Resolved to a store URL | 87 |
| Dropped | 9: 6 Flipkart `/indiafreestuff/p/` cards with no `itm` id, the Black Friday hub, an Amazon `/b?node` page and a Pepe Jeans `/s?` search page |
| Already in the DB | 56 |
| Fresh | 31 |

## Fresh candidates

| Verdict | ASINs |
|---|---|
| **Pushed** (product page matches the card) | B09C5N71GB, B09XQMFF1B |
| Rejected for drift (card → product page) | B07GFLKTQH 316→380, B092JDW7G7 346→965, B0HGB2LWQY 94→1,199, B0HJ5C7ZMH 99→1,599, B0GD7MWVQ5 79→99, B0H7MB61SM 104→110, B0HHMM2VH9 599→839, B0BGBKY7V2 920→939, B0H94NWNDV 999→1,699, B0H3M94795 154→533, B0FBW7D1BY 176→385, B07P1M7GRY 832→849, B0HHK64X5Z 366→385, B0G4R8TW5F 239→244, B0GMLJCBBM 33,250→35,500, B0H9F7LNWX 149→878, B0GSZ9RBWZ 31,740→34,490, B00FMUOCX4 82→94 (availability blank), B0H7MCHZJ2 141→149, B0H8CG8HM7 285→300, B0HHB41BHQ 290→299, B0GGZK4DND 353→399, B0HK3XL66F 374→749 |
| Rejected as ambiguous | B0868XBJN7 Dabur: card "Min Buy 003" at ₹91, product page ₹76, and the M.R.P. field is a per-unit rate (253.33) |
| Rejected with no price and no add-to-cart | B0FBM947J3, B0GFM5ZDGX, B0BCVQVLDV, B01M8LNG7B, B0C1CBCH2G |

The IFS card-drift pattern held again: almost every fresh card price was stale or wrong, so no card price was trusted without a product-page read.

## Duplicates (price-sync)

| Deal | Card | DB before | Product page | Action |
|---|---|---|---|---|
| **#1688 Biotique Starshine matte lipstick, Stupid Cupidi, 3.5 g (B083KBJ93F)** | — | ₹254 / ₹600 (58%) | ₹232 against ₹600, in stock, add-to-cart | **Repriced** to ₹232 (61%) |
| #17085 B0DWK8PXF4 | ₹93 | ₹169 | ₹169 | No change. The card is wrong |
| #17089 B0DGQ4VTZS | — | ₹2,140 | ₹2,140 | No change |
| #17054 B0FLJRQPYG | — | ₹725 | ₹725 | No change |
| #17056 B0FGVCBZ6N | — | ₹185 | ₹185 | No change |
| #8707 Reebok CN4076 (B0FH9TZHHG) | — | ₹1,119 | No price, no add-to-cart | No change. Still on the no-buy-box list |

The other duplicates matched their card price and were verified or pushed in recent ticks.

The #1688 reprice was a Prisma `deal.update` plus a `priceHistory` row. The old title ("Biotique Matte Lipstick at ₹254") and description (₹254, 58%) were rewritten with the shade and size, and the slug is unchanged.

## Push

| Slug | Price / M.R.P. | Product page | Result |
|---|---|---|---|
| `handmade-rose-bath-soap-pack-of-3-b09c5n71gb` | ₹269 / none | ₹269, in stock, add-to-cart, sold by Angel. Enterprise. The card's ₹597 M.R.P. was not confirmed on the page, so M.R.P. and discount are null | HTTP 201, created. Prod 200 |
| `new-bee-rgb-headphone-stand-usb-c-charging-black-b09xqmff1b` | ₹1,350 / ₹5,000 (73%) | ₹1,350 against ₹5,000, in stock, add-to-cart, sold by Cocoblu Retail. Rejected in an earlier tick for drift; it matches now | HTTP 201, created. Prod 200 |

Both carry the Amazon `tag=ashoksachdev-21` affiliate link and an `m.media-amazon.com` image (`61J+tCNBXlL`, `61ZNuwopW0L`). Before the push, a validator checked the copy:
- Every ₹ figure in the title and how-to equals the price.
- Every ₹ figure in the description is the price or the M.R.P.
- A null M.R.P. means no "% Off" in the title. Otherwise the percentage equals the computed discount and is under 80%.

The same checks ran on the #1688 rewrite.

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 2 new slugs + #1688 + 3 hub URLs) | HTTP 200 for 6 URLs |
| New and repriced deal pages on prod | 200, 200, 200 |
| sitemap.xml | ISR `revalidate = 1800`. The deals child lists only the top 100, so these pages serve `noindex,follow` by design |
| llms.txt | `force-dynamic`, rebuilt per request. Returns 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.52s | OK |
| DB LIVE vs API total | 16,523 = 16,523 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 vs 17,127 | OK. The 2 new deals are waiting for the external broadcast cron |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | Only `deal-ingest-2026-11-24a.md` existed, so this report uses suffix `b` | OK |
| Deploy | None. This was a content-only tick | n/a |

**Timestamp correction:** `desidime-2026-11-24b.md` says it ran "from about 08:05 to 08:20 IST on 11-24". The clock at the end of this tick read 03:05 IST on 11-24, so that report most likely added the IST offset twice. Its data is unaffected.

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far (#637 at 00:45). CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259, #12963 and #8707 (#8707 re-checked this tick, still no buy box).
- **Copy mismatches (new):** #8707's title says "(65% Off)" while its M.R.P. and discountPct are null, and #12963's text says 55% while the row says 57%. Both are no-buy-box rows, so they get fixed when their next product-page read finds a price.
- **Flipkart drops:** boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from this sweep, which need a browser-tab pid → `itm` resolve.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick did not touch Telegram, did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
