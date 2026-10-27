# DESIDIME-INGEST · 2026-10-27f (~04:40Z / 10:10 IST 10-27)

## Funnel

| Stage | Count |
|---|---|
| Discovered (`/new` + homepage cards, no per-deal fetch) | 36 |
| Dropped by JUNK/GROCERY/other-store filters | 6 |
| Other stage-1 drops | Neck-pillow card (no resolvable link), Flipkart "Kids Scooters from Rs.499" (`/pr?sid=` category page) |
| Resolved to a single product | 28 |
| Dedup by resolved productId vs live DB | 16 hits, 12 fresh (none in `dd-rejected`) |
| PDP-verified | 10 |
| Rejected on price drift | 2 |
| **Pushed LIVE** | **10** (`HTTP 201 count=10`, all `created:true`, ids 15094–15103) |

## Verify table

All 12 fresh candidates were Amazon. Each was read in the logged-in Playwright tab via same-origin `fetch('/dp/ASIN')`, using `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. No captcha was served, so the mobile-UA fallback wasn't needed.

| ID | Product | Card ₹ / MRP | Live ₹ | Result |
|---|---|---|---|---|
| 9355626835 | Godan Kavya Roopantaran (Hindi book) | 82 / 300 | 82 | Pushed (73%) |
| B0G6KJ5XMV | SleepyHug OrthoSoft Plus 2" HR foam topper 72x60 | 3786 / 9165 | 3786 | Pushed (59%) |
| 9354886590 | Student Mind Power (Hindi book) | 61 / 400 | 61 | Pushed, MRP nulled (84.75%) |
| 9353229340 | Startup Success Stories (Hindi book) | 72 / 350 | 72 | Pushed (79%) |
| 8173156034 | Jeevan Jeene Ki Kala, Dalai Lama (Hindi book) | 97 / 250 | 97 | Pushed (61%) |
| 9350488221 | Manchahi Safalta Kaise Payen (Hindi book) | 68 / 250 | 68 | Pushed (73%) |
| B0GLGZBF2B | Non-scratch steel-wire dish cloth ×15 | 59 / 399 | 59 | Pushed, MRP nulled (85.2%) |
| 9390101891 | Bharat Ka Samvidhan (Hindi book) | 127 / 800 | 127 | Pushed, MRP nulled (84.1%) |
| 9355623275 | Yes Boss (Hindi book) | 72 / 350 | 72 | Pushed (79%) |
| 8193288858 | Hockey Ke 25 Top Bharatiya Khiladi (Hindi book) | 49 / 350 | 49 | Pushed, MRP nulled (86%) |
| B0D8JBJVXS | Halonix 10 m waterproof rope light | 581 | 599 | **Rejected** (+₹18) |
| B0C9HYYDLZ | Interio by Godrej Curv mesh chair | 3149 | 3499 | **Rejected** (+₹350) |

- All 10 pushed products are in stock with add-to-cart present.
- Images are `m.media-amazon.com` hiRes. For the two variant listings (topper, dish cloth), the image matches `#landingImage` for the landing variant. All 10 returned HEAD 200.
- Both rejects were added to `data/dd-rejected.json` with epoch-ms values. The file now holds 442 entries.
- Prod check: the topper page returned 200.
- MRP rule matches 10-27e: the MRP is nulled when it implies 80% off or more.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with 10 slugs → **HTTP 200 for 13 URLs** (the slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** ISR 1800s. **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,570 (+10) |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15103 |
| Broadcast cursor | `lastId` 15093. This batch just landed; the external tg-broadcast cron drains it |
| Git | even with `origin/master` before this commit |

Nothing is rotting.
