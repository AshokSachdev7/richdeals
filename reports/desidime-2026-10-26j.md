# DESIDIME-INGEST · 2026-10-26j (~16:50Z / 22:20 IST)

## Stage 1

`ingest-desidime.mjs` read the listing cards only (no per-deal fetch).

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 36 |
| Dropped by JUNK/GROCERY regex or as another store | 7 |
| Dropped as a non-product link | Acer Aspire 14 (non-`/p/itm` Flipkart path), Amazon `/s?` perfume search, Amazon Now `/tez/browse` diya |
| Resolved to a single product | 26 |
| Already in the DB (by productId) | 14 |
| Fresh candidates | 12 |

Stage-1 `productLd()` results on the 3 non-Amazon candidates:

| Product | Store | Result |
|---|---|---|
| Mamma Love 3-wheel kick scooter | Flipkart | **ok**: ld+json ₹499, in stock |
| Veni brass choker | Nykaa | rejected: no ld+json |
| Atomberg Renesa Elite fan | Flipkart | rejected: price drift |

## Amazon verify

Nine PDPs were fetched same-origin in the logged-in Playwright tab, 2.6 s apart. Each read checked `#corePriceDisplay .a-price-whole`, the M.R.P. line, `#availability` and `#add-to-cart-button`. There was no captcha, so the mobile-UA fallback was not needed.

| ASIN | Product | Card ₹ | PDP ₹ | Verdict |
|---|---|---|---|---|
| B0G1C91MWM | One94Store 20 m warm-white LED rope light | 399 | 399 (M.R.P. 1,499; the card's 1,999 was wrong), in stock | **PUSHED** |
| B0G2HJQ1DX | 25-pack non-scratch wire dishcloths | 169 | 169 (M.R.P. 599), in stock | **PUSHED** |
| B0H6MMJKH5 | Metal railing planter box | 250 | 1,349 | rejected: drift |
| B0H6WHHSHR | Lenovo IdeaPad Slim 3 i5-13420H | 65,740 | 74,990 | rejected: drift (bank-offer price) |
| B0HK7CVVNM | Acer Aspire 3 i3-1315U | 45,116 | 49,490 | rejected: drift (bank-offer price) |
| B0DSFP9FCS | Dell 15 i7-1355U | 67,354 | 70,604 | rejected: drift (bank-offer price) |
| B0H8PS4R1H | iFFALCON 40" FHD Google TV | 17,090 | 20,990 | rejected: drift |
| B0F6DCT9DM | Johnson EcoClean bidet seat | 712 | no buy box, no add-to-cart | rejected: unavailable |
| B0HLLMYG24 | Bajaj Pulsar N160 (ex-showroom) | 1,17,807 | no buy box, no add-to-cart | rejected: unavailable |

## Push

- **Shadow-row check:** no DB row matched any of the 3 by `productId`, `affiliateUrl` or slug.
- **Bulk push:** `POST /admin/deals/bulk` returned **HTTP 201, `count: 3`**, all `created: true`, so the slugs are intact.
  - `one94store-20-meter-warm-white-led-rope-light-waterproof-b0g1c91mwm`, `amazon.in/dp/B0G1C91MWM?tag=ashoksachdev-21`.
  - `25-pack-non-scratch-wire-dishcloth-steel-scrubbers-b0g2hjq1dx`, `amazon.in/dp/B0G2HJQ1DX?tag=ashoksachdev-21`.
  - `mamma-love-3-wheel-foldable-kick-scooter-for-kids-otyhrshasp8zgb5k`, Flipkart `?pid=OTYHRSHASP8ZGB5K&affid=djhackraj`. The source params `affid=salescueli&affExtParam1/2` were stripped.
  - Titles and descriptions were rewritten (no DesiDime copy).
  - All 3 images return 200: 2 from `m.media-amazon.com`, 1 from `rukmini1.flixcart.com`.
- **Reject list:** `data/dd-rejected.json` went from 361 to 370 keys: Nykaa and Atomberg from stage 1, plus the 7 Amazon rejects.
  - The script re-serialized the file with a 1-space indent, which turned the diff into an 833-line churn. It was re-written with HEAD's 2-space indent.
  - The final diff only appends: +9 keys, 0 keys lost or changed (checked against `git show HEAD`).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` sent the 3 slugs → **HTTP 200** (6 URLs).
- **Prod deal pages:** all 3 return 200.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,498 (+3) |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Broadcast cursor | `lastId` 15029 vs DB max 15032. The external cron already drained the TG 10-26r batch; the gap is this tick's 3 deals |
| Unpushed commits | 0 before this commit |

**Yield:** 3 of 12. The misses were the usual bank-offer laptop and TV prices plus two listings with no buy box. Nothing rotting.

**Fixed:** `ingest-desidime.mjs:100` wrote `dd-rejected.json` with a 1-space indent while the committed file uses 2, so every tick produced a whole-file diff. It now writes `null, 2`, matching HEAD.
