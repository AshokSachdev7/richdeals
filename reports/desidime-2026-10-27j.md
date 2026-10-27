# DESIDIME-INGEST · 2026-10-27j (10-27, evening IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Resolved to a product (`visit.desidime.com` → merchant) | 28 |
| Already in the DB (dedup by `productId`) | 9 |
| Fresh | 19 (13 Amazon, 6 non-Amazon) |
| Non-Amazon skipped at stage 1 | 6: price drift (Godrej, Zebronics, Instamart cookies); no ld+json (Bigbasket Pigeon kettle, Dellstore promo, Digihaat amla candy) |
| PDP-verified (Amazon, logged-in Playwright tab) | 13 |
| Rejected | 8 (6 price drift, 1 unavailable, 1 null image) |
| **Pushed LIVE** | **5** (`HTTP 201 count=5`, all `created:true`) |

## Verify table

Read with a same-origin fetch of `/dp/ASIN?th=1&psc=1`, using `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. There was no captcha. The MRP is nulled where it implies ≥80% off or looks bogus.

| ID | Product | Card ₹ | Live ₹ | MRP pushed | Result |
|---|---|---|---|---|---|
| B0HP9P9548 | Travel shoe bag | 19 | 19 | null (no PDP MRP) | pushed |
| B0HP6RSHRR | Women's beige ombré tunic | 99 | 99 | null (989 = 90%) | pushed |
| B0HN94FVY3 | Bio-collagen hydrogel mask | 34 | 34 | null (3400 bogus) | pushed |
| B0HNVT5SXR | 4-fork eyebrow pen | 49 | 49 | null (499 = 90%) | pushed |
| B0B2WMV8VV | Rusabl neem wooden comb | 99 | 99 | null (499 = 80.2%) | pushed |
| B0H8J2FG38 | Ryzen 5 3600 | 7995 | 7995 | — | rejected: null image |
| B08934ZQ6B | Samyang 85mm lens | 11468 | 13242 | — | rejected: drift |
| B094JR5FS3 | Vinod 25-pc kitchen set | 5363 | 6399 | — | rejected: drift |
| B0F3P4G8SY | Insta360 X5 | 49095 | 51990 | — | rejected: drift |
| B07TYKS8SF | AKASO V50X | 9441 | 10999 | — | rejected: drift |
| B0CHW83ST2 | IZI ONE Plus | 7295 | 8549 | — | rejected: drift |
| B0GVJSTKS6 | TCL 55" TV | 31240 | none | — | rejected: no add-to-cart |
| B0GKP2JBQZ | Portronics Tune Prime | 8301 | 9728 | — | rejected: drift |

- **Images:** all 5 pushed are `m.media-amazon.com` and each returned 200.
- **Affiliate:** `/dp/ASIN?tag=ashoksachdev-21`, with `desidime01-21` stripped.
- **Rejects:** all 8 were written to `data/dd-rejected.json` with `Date.now()`. The file now holds 545 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with the 5 slugs → **HTTP 200 for 8 URLs**.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,680 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15213 |
| Broadcast cursor | `lastId` 15208 (file re-read), 5 behind: that is this batch, which the external cron will drain |
| Posts: total / coverless | 438 / 0 |
| Unpushed commits | 0 before this commit |

Nothing is rotting.
