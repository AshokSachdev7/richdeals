# DesiDime ingest — 2026-10-25f (~20:25 IST)

## Stage 1

`ingest-desidime.mjs` read the cards only, with no per-deal fetch.

| Step | Count |
|---|---|
| Discovered | 32 |
| Resolved to a product | 21 |
| Already in the DB | 7 |
| Fresh | 14 |

Stage 1 had already rejected the Flipkart toilet cleaner (TCNHZPBPZHK2VRHX) for price drift. I also skipped B0HL49QPJN, a "Multiple Samples" post with no price.

## Pushed LIVE: 2 deals (bulk count 2, both created:true)

| # | Product | Store | Price | MRP |
|---|---------|-------|-------|-----|
| 14823 | BENAVJI bird net, 10x12 ft, UV-stabilized (B0FG2K2TLS) | Amazon | ₹299 | ₹1,499 (80%) |
| 14824 | LG 27" 4K UHD IPS HDR10 monitor (B07PGL2WVS) | Amazon | ₹4,891 | ₹50,000 (90%) |

- **Checks:** both were verified in the logged-in Amazon tab. Price read from `.a-price-whole`, add-to-cart present, `#availability` In stock. Images are the hiRes from `#landingImage`.
- **Monitor:** the seller is Clicktech Retail, and the page showed "Only 1 left in stock". The price looks like a pricing error. The description says the deal may sell out within minutes and the seller may cancel the order. If it goes out of stock, the price-sync or the next repost sets it to EXPIRED.

## Rejected: Amazon price drift (>₹1, card price vs PDP)

| ASIN | Product | Card | PDP |
|---|---|---|---|
| B0GTZ8M66Y | LG 50" NU87 TV | ₹35,249 | ₹38,999 |
| B0CZ77BFYN | Supradyn Naturals Iron 30 | ₹179 | ₹189 |
| B0F3DBMCBQ | Godrej 7 kg 5★ washer | ₹12,491 | ₹14,990 |
| B0HF42D8WK | DLALA wooden hanger 2-pc | ₹299 | ₹999 |
| B0GGR9DCCB | VW 43" QLED TV | ₹18,949 | ₹20,699 |
| B0FD8S5FVR | Merlion Multani Mitti 200 g | ₹99 | ₹249 |
| B0CZTGRS2S | WHP 1 g gold pendant | ₹14,369 | ₹15,800 (3rd straight reject) |
| B0HGQDFL1H | Acer Aspire 3 Ultra 5 | ₹58,490 | ₹62,990 (3rd) |
| B0GMD5NPX6 | Godrej 1.5T 3★ AC | ₹28,490 | ₹31,490 (3rd) |
| B0GK9NHCL2 | VW 65" QLED TV | ₹36,499 | ₹41,999 (3rd) |

The card prices are post-bank-offer or post-coupon. We do not list them.

## Freshness

- `indexnow-ping.mjs` on 2 slugs (5 URLs) returned **HTTP 200**.
- `/benavji-…-b0fg2k2tls` returns 200 on prod.
- The sitemap is ISR with a 30-minute window; `llms.txt` is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,293 (+2) |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts today (IST) | 2 |
| Broadcast cursor | 14822 vs DB max 14824. These are the 2 new rows; the external cron will drain them. |
| Prod `/`, `/offers`, `/api/deals` | 200 |
| Unpushed commits | 0 before this commit |

Nothing rotting.
