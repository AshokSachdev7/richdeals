# DesiDime ingest · 2026-10-26d

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Junk / other-store dropped | 10 |
| Product-resolved | 24 |
| Already in DB (by productId) | 16 |
| Fresh | 8 (all Amazon) |

One other drop: an ASUS Vivobook card, because its Flipkart URL was not a `/p/itm` product page.

## PDP verification

Each fresh candidate was checked with a same-origin fetch in the logged-in Amazon tab. The checks were `.a-price-whole` in `#corePriceDisplay`, `#availability`, and the add-to-cart button.

| ASIN | Product | DesiDime ₹ | PDP ₹ | Verdict |
|---|---|---|---|---|
| B0H2YCXLQ2 | Wooden piggy bank with lock | 99 | 99 (MRP 299), in stock | **PUSHED** |
| B0BSGN4RF3 | Lifelong foot massager | 1,999 | no buy box | rejected (no add-to-cart) |
| B0C7MKSCJT | Larah 44-pc dinner set | 1,625 | no buy box | rejected (no add-to-cart) |
| B0F2J4S8LP | John Players trunks | 212 | 549 | rejected (price drift) |
| B0FM7KQVMY | Borosil 2 L hard-anodized kadai | 771 | 1,439 | rejected (price drift) |
| B0F4K415FW | Bosch 8 kg front-load washer | 25,740 | 29,990 | rejected (price drift; DesiDime price was likely after a bank offer) |
| B0GXK5K633 | VW 32" QLED TV | 6,930 | 7,699 | rejected (price drift) |
| B0GW2MP53S | Nayasa 700 ml bottle | 120 | 222 | rejected (price drift) |

7 of 8 failed, so most DesiDime card prices had already expired by the time of this sweep. Nothing was pushed at a card price.

## Pushed LIVE: 1

- `/wooden-money-saving-box-with-lock-big-size-piggy-bank-b0h2ycxlq2`: ₹99 (67% off). The image is the hiRes image for the `landingAsinColor` variant.
- The bulk endpoint returned HTTP 201 with `count=1, created:true`.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` returned **HTTP 200** for 4 URLs: the slug plus the 3 hub paths.
- **Sitemap:** ISR with `revalidate = 1800`, so it can be up to 30 minutes stale.
- **`llms.txt`:** force-dynamic, so it is rebuilt on every request.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,347 |
| PENDING_REVIEW | 0 |
| Null price / null image (LIVE) | 0 / 0 |
| Posts without a cover | 0 |
| Broadcast cursor | 14872 vs DB max 14878. The external cron lags here by design and catches up on its next run, so this is not rot. |
| Unpushed commits | 0 before this commit |
