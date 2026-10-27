# DESIDIME-INGEST · 2026-10-27g (10-27 IST)

## Funnel

| Stage | Count |
|---|---|
| Stage-1 cards (`/new` + homepage, cards only, no per-deal fetch) | 35 |
| Dropped in stage 1 (JUNK/GROCERY, other non-product links: an ASUS TUF Flipkart listing, an Organic India collection page) | 12 |
| Already in the live DB (dedup by resolved productId) | 14 |
| Fresh candidates | 9 (all Amazon) |
| Rejected after the PDP read | 4 |
| **Pushed LIVE** | **5** (`HTTP 201 count=5`, all `created:true`, ids 15125–15129) |

## Verify table

Every candidate was read in the logged-in Playwright Amazon tab using `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. None of the 9 hit a captcha, so the mobile-UA fallback was not needed. The MRP is nulled wherever it implies ≥80% off.

| ID | Product | Card ₹ | Live ₹ | MRP pushed | Result |
|---|---|---|---|---|---|
| B0FK5JD7JT | Skybags Porto 40L weekender backpack | 1599 | 1599 | 4998 (68%) | Pushed #15125 |
| B0CKL31L7Z | Amazon Basics Cat 7 ethernet cable 7.6 m | 629 | 629 | 1399 (55%) | Pushed #15126 |
| B0H8SSDB2Y | Desidiya 200 LED waterfall curtain lights | 399 | 399 | null (80%) | Pushed #15127 |
| 9350480492 | Jago Grahak Jago (book) | 49 | 49 | null (80.4%) | Pushed #15128 |
| B0D1CSN1QR | Bose SoundLink Max speaker | 29,990 | 29,990 | 41,900 (28%) | Pushed #15129 |
| B00U8TQPGQ | Dr Batra's moisturizing cream | 189 | 199 | — | **Rejected** (+₹10) |
| B0FPLDFK2W | Yogabar protein oats 1 kg | 392 | no price | — | **Rejected**: no add-to-cart (the MRP read ₹39.20, a per-unit trap) |
| B0DGQRWY1P | Dabur Kids Elsa toothpaste | 49 | no price | — | **Rejected**: no add-to-cart |
| B0H5C6YBPN | Lenovo Tab Plus Gen 2 | 27,249 | 31,999 | — | **Rejected** (+₹4,750) |

- All 4 rejects were added to `data/dd-rejected.json` with epoch-ms values. The file now holds 455 entries.
- All 5 images are `m.media-amazon.com`. Each returned HEAD 200.
- Affiliate: `/dp/ASIN?tag=ashoksachdev-21`, with DesiDime's `desidime01-21` stripped.
- Prod check: `/bose-soundlink-max-portable-bluetooth-speaker-black-b0d1csn1qr` returned 200.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with 5 slugs → **HTTP 200 for 8 URLs** (the slugs plus `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic, so it picks up the batch on the next request.

## CEO audit (DB re-read after the push)

| Check | Result |
|---|---|
| LIVE deals | 14,596 |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15129 |
| Broadcast cursor | `lastId` 15124. That equals the max before this batch; the external tg-broadcast cron drains it |
| Posts: total / coverless | 437 / 0 |
| Posts per IST day | 10-25: 2 · 10-26: 4 · 10-27: 2. The minimum is met; CONTENT-SEO runs next |
| Prod endpoints | 7/7 return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`) |
| Unpushed commits | 0 before this commit |

Nothing is rotting.
