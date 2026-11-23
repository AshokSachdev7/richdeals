# DESIDIME-INGEST tick — 2026-11-23b

This tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`) over the DesiDime `/new` and homepage cards at about 22:20 IST on 11-23. Stage 1 read the cards only, with no per-deal fetch, and applied the JUNK and GROCERY filters. It resolved each Buy Now link through `visit.desidime.com` and checked non-Amazon prices with `productLd()`, which requires the price to be within ₹1 and the item to be InStock. Amazon candidates were then read on the product page in the logged-in Playwright tab. Every product was deduplicated by `productId` against the live DB before the push.

**Result: 3 new deals pushed LIVE (#17082, #17083, #17084), and 1 duplicate LIVE row was repriced (#3405). IndexNow returned HTTP 200 for 7 URLs, and the CEO audit is green apart from the known missed blog days.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 35 |
| Dropped as junk, not a product or unresolvable | 21 |
| Resolved to a single product | 14 |
| Already in the DB (duplicate `productId`) | 2 |
| Fresh candidates | 12 |

Stage 1 dropped, among others:
- a Goibibo flash sale
- the Delhi Metro Sarthi app (a Play Store link)
- an ATTRO lunch box that resolved to an Amazon `/s?` search page
- a Pizza Hut and Domino's voucher that resolved to a Flipkart login page

## Candidates

| Candidate | Store | Card price | Live check | Outcome |
|---|---|---|---|---|
| XECH V-Gun NEO 4-in-1 cordless vacuum (B0HLZY1357) | Amazon | ₹1,299 | ₹1,299, M.R.P. ₹5,999, in stock, add to cart | **New #17082** |
| Skullcandy Icon ANC on-ear headphones, Primer (B0F797838S) | Amazon | ₹7,999 | ₹7,999, M.R.P. ₹29,999, in stock, add to cart | **New #17083** |
| Skybags Xpressionz 67L 8-wheel trolley (25221442) | Myntra | ₹3,738 | ld+json ₹3,738, InStock | **New #17084** (InRDeals link, no M.R.P. shown) |
| Khaitan Volt 5.5L geyser (B0H8PBSZMY) | Amazon | ₹3,150 | ₹3,499 | Rejected: price drift |
| P.N.Gadgil 1g 24kt gold ring (B0BYLK9PZC) | Amazon | ₹10,934 | ₹13,896 | Rejected: price drift (gold rate moved) |
| LG 1.5T window AC | Flipkart | ₹29,490 | ₹32,490 | Rejected: price drift |
| wear me mink blanket | Flipkart | ₹321 | ₹402 | Rejected: price drift |
| Rajdhani peanuts 500g | Flipkart | ₹39 | ₹104, not InStock | Rejected: out of stock |
| Digihaat hot water bag | Digihaat | ₹49 | No ld+json | Rejected: no verifiable price |
| Croma Black Friday "(Upcoming)" | Croma | n/a | No ld+json | Rejected: a sale page, not a product |
| SPT frozen peas | Visit | ₹109 | No ld+json | Rejected: grocery, no verifiable price |
| HDFC transactions voucher offer | n/a | n/a | No ld+json | Rejected: a bank offer, not a product |

**M.R.P.s:**
- XECH at 78% off and Skullcandy at 73% off are below the 80% line, so the product-page M.R.P.s were kept.
- Myntra's ld+json carries no M.R.P., so #17084 has none rather than a guessed one.

## Duplicates (LIVE rows re-verified)

| Deal | DB before | Product page now | Action |
|---|---|---|---|
| #3405 Dove Intense Repair Shampoo 650ml (B00CQ41JE4) | ₹400, no M.R.P. | ₹476, M.R.P. ₹1,082, in stock, add to cart (the card said ₹391) | Repriced to ₹476 with M.R.P. ₹1,082 (56% off). The title was updated and a price-history row added |
| #12963 Himalaya Total Care Baby Pants L 128 (B0H6BKQ1Q2) | ₹1,085, M.R.P. ₹2,398 | Desktop page: no price, no add-to-cart. Mobile page: "Currently unavailable", no add-to-cart | **Left unchanged.** The card's ₹839 could not be verified. Flagged: no buy box |

## Push

Pushed to `localhost:4000/admin/deals/bulk` with `status:live`.

**Affiliate links:**
- Amazon uses `ashoksachdev-21` on `/dp/ASIN`.
- Myntra goes through InRDeals.

| Deal | HTTP | count | Status | Slug |
|---|---|---|---|---|
| #17082 XECH V-Gun NEO vacuum | 201 | 1 | LIVE | matches |
| #17083 Skullcandy Icon ANC | 201 | 1 | LIVE | matches |
| #17084 Skybags Xpressionz 67L trolley | 201 | 1 | LIVE | matches |

All three rows were created, so no slug needed restoring.

#17084's first copy described the bag as "hard" and suggested a trip length, and neither is confirmed by the product page. Before the IndexNow ping, the title, slug and description were corrected through Prisma to `skybags-xpressionz-67l-medium-8-wheel-trolley-bag-25221442`.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200** for 7 URLs (4 deal slugs plus the 3 hubs the script adds) |
| Deal pages | All 4 slugs return 200 on prod |
| sitemap.xml | ISR `revalidate = 1800`, so it refreshes within 30 minutes. New deals outside the top 100 serve `noindex,follow` by design |
| llms.txt | `force-dynamic`, so it is rebuilt on every request |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200 | OK |
| DB LIVE vs API total | 16,477 = 16,477 (16,934 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,084 vs 17,081 | OK; the external cron will pick up this batch |
| Posts per day (IST) | 11-17 to 11-20: 3 each; **11-21: 0, 11-22: 0 (missed)**; 11-23: 2 | Flag for the past days; today is within the rule |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `desidime-2026-11-23a.md` existed, so this report uses suffix `b` | OK |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s, no buy box and related lists:**
  - see `tg-monitor-2026-11-23a.md` and `-23b.md`
  - plus #12963 Himalaya above, which has no buy box
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick did not touch Telegram, and none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
