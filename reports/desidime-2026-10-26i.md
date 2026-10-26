# DESIDIME-INGEST · 2026-10-26i (14:56Z / 20:26 IST)

## Stage 1

`ingest-desidime.mjs` read the listing cards only (no per-deal fetch).

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Dropped by JUNK/GROCERY regex or as another store | 9 |
| Dropped as a non-product link | Flipkart Big Bang Diwali hub, Amazon `/s?` Reebok search, Amazon `/s?` Pampers search, Skybags (non-`/p/itm` Flipkart path) |
| Resolved to a single product | 23 |
| Already in the DB (by productId) | 8 |
| Fresh candidates | 15 |

## Verification

Five non-Amazon candidates failed stage-1 `productLd()`:

| Product | Store | Reason |
|---|---|---|
| PUMA medium check-in suitcase | Flipkart | price drift |
| WROGN set of 3 luggage | Flipkart | price drift |
| Mokobara Access Trunk | mokobara | no ld+json |
| Zelocity leggings | brand CDN | no ld+json |
| Tata Sampann hing | JioMart | no ld+json; also low-ticket FMCG |

Ten Amazon PDPs were fetched same-origin in the logged-in Playwright tab, 2.6 s apart. Each read checked `#corePriceDisplay .a-price-whole`, the M.R.P. line, `#availability` and `#add-to-cart-button`. There was no captcha, so the mobile-UA fallback was not needed.

| ASIN | Product | Card ₹ | PDP ₹ | Verdict |
|---|---|---|---|---|
| B07TPJRT8C | Prestige PMC 1.0+ multi cooker, 1 L | 1,037 | 1,037 (M.R.P. 1,995), in stock | **PUSHED as #15007**, 48% off |
| B0FR27R9BB | AMO electric scooter | 39,500 | 48,500 | rejected: drift (the card price needs an AXIS/ICICI card offer) |
| B0D7HZ8V9K | Blue Tyga sunscreen jacket | 1,006 | 1,108 | rejected: drift |
| B0F5X17PLB | Whirlpool 60 cm cassette chimney | 4,499 | 5,390 | rejected: drift |
| B0HKJSQGZJ | Samsung Galaxy Tab S12 Ultra | 1,39,749 | 1,64,999 | rejected: drift (bank-offer price) |
| B0DMS8VK96 | LG 27GS60QC 27" QHD monitor | 13,049 | 14,999 | rejected: drift |
| B0GQT3W35R | Haier 8 kg top-load washer | 14,930 | 19,180 | rejected: drift |
| B0G8JR8VNZ | Samsung 183 L single-door fridge | 14,366 | 16,990 | rejected: drift |
| B0BYLK9PZC | P.N. Gadgil 1 g 24 kt gold ring | 14,305 | 15,778 | rejected: drift (the price tracks the gold rate) |
| B0CB8KG44H | KENT Supreme Plus RO purifier | 12,599 | 13,999 | rejected: drift |

### Push

- **Shadow-row check:** no DB row matched B07TPJRT8C by `productId`, `affiliateUrl` or slug.
- **Bulk push:** HTTP 201, `count: 1`, `created: true`, so the slug is intact.
  - Slug: `prestige-pmc-1-0-electric-multi-cooker-1-litre-b07tpj`.
  - Affiliate URL: `amazon.in/dp/B07TPJRT8C?tag=ashoksachdev-21`.
  - Title and description were rewritten (no DesiDime copy).
- **Reject list:** the 9 Amazon rejects were added to `data/dd-rejected.json`, now 341 keys.
  - A normalize step dropped 17 legacy `{reason,at}` entries mid-edit.
  - They were restored from HEAD in HEAD key order, so the final diff only appends.

## Freshness

- **IndexNow:** `indexnow-ping.mjs prestige-pmc-1-0-electric-multi-cooker-1-litre-b07tpj` → **HTTP 200** (4 URLs).
- **Prod deal page:** 200.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,475 |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Broadcast cursor | `lastId` 15006 vs DB max 15007. The external cron already took TG #15006 and will take #15007 next run |
| Unpushed commits | 0 before this commit |

**Yield:** low this tick, 1 of 15. In 9 of the 10 Amazon misses the card showed a bank-card or expired flash price, the usual DesiDime failure. Nothing rotting.
