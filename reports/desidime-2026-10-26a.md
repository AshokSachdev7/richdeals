# DesiDime ingest — 2026-10-26a (~00:25 IST)

## Stage 1

Stage 1 (`ingest-desidime.mjs`) read the `/new` and homepage cards only, with no per-deal fetch.

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Dropped by the JUNK/GROCERY filters, other-store rules or hub URLs (Myntra category, Amazon `/s?`) | 11 |
| Resolved to a product | 21 |
| Already in the DB | 8 |
| Fresh candidates | 13 |

The 13 fresh candidates were 11 Amazon items plus 2 that stage 1 skipped: Flipkart Inalsa stand mixer (price drift) and a Farmley voucher (no ld+json, and not a product anyway).

## Pushed LIVE: 2 (bulk count 2, both created:true)

| # | Product | Store | Price | MRP |
|---|---------|-------|-------|-----|
| 14840 | Plaeto men's Classic 929 sneaker, off white (B0F6CY91HL) | Amazon | ₹660 | ₹3,299 (80%), only 3 left |
| 14841 | LONGWAY Creta P1 1200 mm ceiling fan, smoked brown (B09VDHHL8C) | Amazon | ₹1,159 | ₹2,481 (53%) |

- **Price and stock:** card price = PDP `.a-price-whole` exactly on both; add-to-cart present.
- **Copy and images:** rewritten from the PDP title and bullets; image is the landing colour's `data-old-hires`.
- **Affiliate link:** `/dp/ASIN?tag=ashoksachdev-21`, DesiDime's `desidime01-21` stripped.

## Rejected

| Reason | Items |
|--------|-------|
| Unavailable (no price, no add-to-cart) | Havells Enticer fan 2-pack B0CKZ9NZ6W, Whirlpool chimney B0FBK9NJQG, Plaeto sneakers B0DPG6P1HK + B0DPG71YW5 |
| PDP price drift from the card | WHP 1 g pendant 14,369→15,800 · Acer Aspire 3 58,490→62,990 · Godrej 1.5T AC 28,490→32,990 · Luminous Edge GO P1000 25,800→28,999 · VW 65" QLED 36,499→41,999 |

WHP, Acer, Godrej and VW have now been rejected 5 ticks running (bank-offer card prices). All 9 Amazon rejects were written to `data/dd-rejected.json` this time, so stage 1 skips them for 24 h instead of re-reading them every tick.

## Freshness

- `indexnow-ping.mjs` was run on 2 slugs (5 URLs) and returned **HTTP 200**.
- The sitemap is ISR with a 30-minute window; `llms.txt` is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,310 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts today (IST) | 0 at 00:25. New IST day; CONTENT-SEO runs at 00:39. Not rot yet |
| Coverless / seo-less posts | 0 / 0 |
| Broadcast cursor | 14839 vs DB max 14841. This batch is new; the external cron will drain it. Not rot. |
| Prod `/`, `/offers`, `/api/deals` | 200 / 200 / 200 |
| Unpushed commits | 0 before this commit |

Nothing rotting.
