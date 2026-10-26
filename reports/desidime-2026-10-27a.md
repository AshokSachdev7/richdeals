# DESIDIME-INGEST · 2026-10-27a (~18:55Z 10-26 / 00:25 IST)

## Stage 1

`ingest-desidime.mjs` read the listing cards only (no per-deal fetch).

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Dropped by JUNK/GROCERY regex or as another store | 10 |
| Dropped as a non-product link | Neelam steel `/s?` search page |
| Resolved to a single product | 24 |
| Already in the DB (by productId) | 17 |
| Fresh candidates | 7 |

PayByCard.in (bill-payment service, no ld+json) was rejected in stage 1, which left 6 Amazon candidates.

## Amazon verify

All six product pages were fetched same-origin in the logged-in Playwright tab, 2.6 s apart. Each read checked `#corePriceDisplay .a-price-whole`, the M.R.P. line, `#availability` and `#add-to-cart-button`. No captcha came up, so the mobile-UA fallback was not needed.

| ASIN | Product | Card ₹ | Product page ₹ | Verdict |
|---|---|---|---|---|
| B0HL61BRXX | 1-pc magic eraser sponge | 45 | 45 (M.R.P. 199), in stock, add-to-cart present | **PUSHED** |
| B0BNKM9CW1 | SSP pure asafoetida 10 g | 349 | 349 (M.R.P. 750), add-to-cart present | **PUSHED** |
| B0F6ZLFNVT | Xiaomi 43" Smartchoice X 4K TV | 20,334 | 24,999 | rejected: drift (bank-offer price) |
| B0DG8RPQNS | LG 7 kg front-load washer | 23,240 | 29,990 | rejected: drift (bank-offer price) |
| B0GGHXCQSR | Fire-Boltt Ninja Phantom watch | 899 | no buy box, no add-to-cart | rejected: unavailable |
| B0DXFPB7M3 | Reebok athleisure jogger | 389 | no buy box, no add-to-cart | rejected: unavailable |

The magic eraser page had no `hiRes` image, so the image came from the `colorImages` `large` entry (`51amKlKsrbL`).

## Push

- **Shadow-row check:** no DB row matched either ASIN by `productId`, `affiliateUrl` or slug.
- **Bulk push:** `POST /admin/deals/bulk` returned **HTTP 201, `count: 2`**, both `created: true`, so the slugs are intact.
  - `magic-eraser-cleaning-sponge-for-kitchen-bathroom-walls-and-car-b0hl61brxx`
  - `ssp-pure-asafoetida-hing-10-g-b0bnkm9cw1`
  - Affiliate links use `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`.
  - Titles and descriptions were rewritten (no DesiDime copy).
  - Both `m.media-amazon.com` images return 200.
- **Reject list:** `data/dd-rejected.json` went from 396 to 401 keys: PayByCard from stage 1 plus the 4 Amazon rejects. The change only appends and keeps HEAD's 2-space indent.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` sent the 2 slugs → **HTTP 200** (5 URLs).
- **Prod deal pages:** both return 200.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,514 (+2) |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Broadcast cursor | `lastId` 15046 vs DB max 15048. The external cron already drained TG 10-26t; the gap is this tick's 2 deals |
| Posts per IST day | 10-25: 2 · 10-26: 4 (cap met). 10-27 IST is 25 minutes old with 0 posts; CONTENT-SEO's :09/6h run (~00:39 IST) opens the day. Not rot yet |
| Unpushed commits | 0 before this commit |

**Yield:** 2 of 7. The misses were the usual bank-offer TV and washer prices plus two listings with no buy box. Nothing rotting.
