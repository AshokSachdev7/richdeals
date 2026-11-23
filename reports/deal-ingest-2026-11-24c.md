# DEAL-INGEST indiafreestuff tick — 2026-11-24c

This tick ran from about 04:45 to 05:05 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved each base64 `?rto=` Buy Now id to its store URL. Candidates were deduped by productId against the live DB. Every fresh candidate, and every duplicate whose card price differed from the DB, was then read on the Amazon mobile product page (`/gp/aw/d/ASIN`): price from `priceAmount` / `.a-price-whole`, stock from `#availability` plus `add-to-cart-button`.

**Result: 0 new deals pushed and 0 rows repriced. All 29 fresh candidates failed verification: 24 drifted from the card price and 5 had no buy box. The 5 drifted duplicates still match their DB rows. One duplicate LIVE row, the Reebok CN4076 sneakers (#8707), has had no buy box across several ticks and was moved to EXPIRED. IndexNow returned HTTP 200 for 4 URLs. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/deals` + `/deals/superdeals`) | 96 |
| Resolved to a store URL | 87 (86 Amazon, 1 Myntra) |
| Dropped | 9: Flipkart `/indiafreestuff/p/` cards (murphy wall lamp, boAt Aavante Prime 5050D soundbar, Sony WH-CH730N, boAt Stone 510, Caprese sling bag and others), the Flipkart Black Friday hub, an Amazon `/b?node=` samples page and a Pepe Jeans `/s?` search page |
| Already in the DB (all LIVE) | 58 |
| Fresh | 29 |

## Candidates

All 29 fresh candidates were rejected. The pattern from earlier ticks holds: IFS card prices are mostly wrong.

**Rejected for drift (card → product page):**

| ASIN | Card | Product page |
|---|---|---|
| B07GFLKTQH | ₹316 | ₹380 |
| B092JDW7G7 (dog biscuits) | ₹346 | ₹965 |
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
| B0868XBJN7 | ₹91 | ₹76, minimum purchase of 3 (ambiguous) |
| B0HK3XL66F | ₹374 | ₹749 |

**Rejected for no buy box** (unavailable, out of stock or no add-to-cart): B0FBM947J3, B0GFM5ZDGX, B0BCVQVLDV, B01M8LNG7B, B0C1CBCH2G.

## Duplicates (price-sync)

Duplicates whose card price matched the DB were not re-read. The 6 that differed were:

| Deal | Card | DB | Product page | Action |
|---|---|---|---|---|
| #17085 (B0DWK8PXF4) | ₹93 | ₹169 | ₹169 | No change. The card is wrong |
| #17089 (B0DGQ4VTZS) | ₹2,141 | ₹2,140 | ₹2,140.79 | No change |
| #17054 (B0FLJRQPYG) | ₹137 | ₹725 | ₹725 | No change. The card is wrong |
| #17056 (B0FGVCBZ6N) | ₹186 | ₹185 | ₹185.99 | No change |
| #1688 Biotique lipstick (B083KBJ93F) | ₹233 | ₹232 | ₹232.93 | No change |
| #8707 Reebok CN4076 sneakers (B0FH9TZHHG) | ₹800 | ₹1,119 | "Currently unavailable", no add-to-cart | **Moved to EXPIRED** |

## Status change

| Row | Product | Change | Prod page |
|---|---|---|---|
| #8707 | Reebok men's CN4076 sneakers (`/reebok-men-s-cn4076-sneakers`) | LIVE → EXPIRED (Prisma `deal.update`, status only) | 200, with the EXPIRED banner |

The page stays live, as the expired-deal rule requires. This follows the #17081 precedent from tg-monitor 11-24c. It also closes #8707's two Still-open items (no buy box, and the "(65% Off)" title with null M.R.P.), since the page no longer presents an active offer.

## Push

Nothing to push. No admin bulk call was made.

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 1 slug + 3 hub URLs) | HTTP 200 for 4 URLs |
| Expired deal page on prod | 200, banner present |
| sitemap.xml | 200. ISR `revalidate = 1800`. No new deals this tick |
| llms.txt | 200. `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.59s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,521 = 16,521 (16,979 rows in total). One fewer LIVE than before this tick because of the #8707 expiry | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` and `-24b.md` existed, so this report uses suffix `c` | OK |
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
- **No buy box:** #7259 and #12963 (#8707 is now EXPIRED).
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** this tick's boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), boAt Stone 510 and Caprese sling bag, plus the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
