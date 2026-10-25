# DesiDime ingest — 2026-10-25g (~22:10 IST)

## Stage 1

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch. It found 34 cards.

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Dropped by the JUNK/GROCERY filters, other-store rules or non-`/p/itm` Flipkart URLs | 10 |
| Resolved to a product | 20 |
| Already in the DB | 10 |
| Fresh candidates | 10 |

The 10 fresh candidates were 9 Amazon items and 1 Flipkart item. The Flipkart item was skipped in stage 1 for price drift.

## Pushed LIVE: 4 (bulk count 4, all created:true)

| # | Product | Store | Price | MRP |
|---|---------|-------|-------|-----|
| 14831 | LAKMÉ 9to5 Hya Matte foundation, Warm Wood 25 ml (B0DVMQXQDW) | Amazon | ₹386 | ₹899 (57%) |
| 14832 | Borosil 400 ml borosilicate glass food storage container, blue (B0G58RD54R) | Amazon | ₹250 | ₹505 (50%) |
| 14833 | Ubon Champion SX201 20000 mAh 15W power bank (B0FV8CDZBX) | Amazon | ₹749 | ₹2,999 (75%) |
| 14834 | Gear Statement Maxis 3.0 29L duffle gym bag, yellow-black (B0D87R3JLD) | Amazon | ₹799 | ₹2,999 (73%) |

- **Price and stock:** the card price matched the PDP `.a-price-whole` exactly for all four, and add-to-cart was present on each. Ubon's `#availability` was blank but add-to-cart was present.
- **Copy and images:** the copy was rewritten from the PDP title and bullets, and the image is the `data-old-hires` of the landing colour.
- **Gear bag:** DesiDime called it a backpack, but the PDP says it is a duffle/gym bag, so the copy follows the PDP.
- **Affiliate link:** `/dp/ASIN?tag=ashoksachdev-21`, with DesiDime's `desidime01-21` tag stripped.

## Rejected: Amazon price drift

| ASIN | Product | Card | PDP |
|---|---|---|---|
| B0FKNNQ6KY | Lifelong Fit Pro spin bike | ₹5,990 | ₹7,999 |
| B0CZTGRS2S | WHP 1 g gold pendant | ₹14,369 | ₹15,800 |
| B0HGQDFL1H | Acer Aspire 3 Ultra 5 | ₹58,490 | ₹62,990 |
| B0GMD5NPX6 | Godrej 1.5T 3★ AC | ₹28,490 | ₹31,490 |
| B0GK9NHCL2 | VW 65" QLED TV | ₹36,499 | ₹41,999 |

The last four have now been rejected 4 ticks running. DesiDime's card prices for them include a bank offer.

## Freshness

- `indexnow-ping.mjs` was run on 4 slugs (7 URLs) and returned **HTTP 200**.
- The sitemap is ISR with a 30-minute window; `llms.txt` is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,303 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts today (IST) | 2. CONTENT-SEO runs next at 00:39 |
| Broadcast cursor | 14830 vs DB max 14834. This batch is new; the external cron will drain it. Not rot. |
| Prod `/`, `/offers`, `/api/deals` | 200 / 200 / 200 |
| Unpushed commits | 0 before this commit |

Nothing rotting.
