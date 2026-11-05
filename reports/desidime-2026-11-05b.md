# DESIDIME-INGEST 2026-11-05b (~12:25 IST)

**Result: 6 deals pushed LIVE and every one was checked on the product page. 3 dup LIVE rows were price-synced, 1 dup was marked EXPIRED and 7 candidates were rejected.**
- IndexNow returned 200 for 13 URLs.
- All 6 new pages return 200 on prod.
- CEO audit: prod 8/8 200, API = DB LIVE 15,615, max id 16,180, 0 pending, 0 null price, 0 null image, cursor drained. **11-05 IST has 0 posts at ~12:25 IST (ROT).** CONTENT-SEO runs next in this queue.

## Method

1. Stage 1, `apps/api/scripts/ingest-desidime.mjs`, read the cards on `/new` and the homepage. It does not fetch per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`.
2. Amazon candidates were checked on the product page in the logged-in Playwright tab, using `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. A per-unit MRP below the price was treated as bogus.
3. Non-Amazon candidates were checked with `productLd()` (ld+json price within ±₹1, InStock).
4. Affiliate links: Amazon `?tag=ashoksachdev-21`.
5. Dedup by productId against the live DB. A guard aborted the push if any pid already existed, because bulk upsert rewrites the slug.
6. Push via `/admin/deals/bulk` as `status:live`. The response was 201, count 6. Count: `{"NEW":6,"EXISTS":0,"SYNCED":3}`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 36 |
| Junk / app dropped | 8 |
| Resolved to a merchant product | 28 |
| Already in DB | 6 |
| Rejected in the last 24h | 9 |
| Fresh candidates | 13 |
| Rejected this tick | 7 |
| Pushed LIVE | 6 |
| Dup price sync | 3 |
| Dup marked EXPIRED | 1 |

## Pushed

| # | ID | Deal | Price | MRP | PDP check |
|---|---|---|---|---|---|
| 16175 | B0DB1RGG3X | Amazon Basics 2026 undated diary | ₹101 | ₹919 | ₹101, In stock, add-to-cart |
| 16176 | B07BK4MKS1 | Type-C to HDMI 4K hub | ₹480 | ₹9,999 | ₹480, In stock, add-to-cart |
| 16177 | B008QTK47Q | Philips GC1905/21 steam iron | ₹1,197 | ₹2,295 | ₹1,197, In stock, add-to-cart |
| 16178 | B004ZJWZIC | HP 920XL magenta ink cartridge | ₹263 | ₹2,324 | ₹263, In stock, add-to-cart |
| 16179 | B098MV3MTP | Crystal Tripro saucepan 14cm | ₹808 | ₹2,690 | ₹808, In stock, add-to-cart |
| 16180 | B0D34VY98P | Lifelong insulated mug 510ml | ₹498 | ₹2,400 | ₹498, In stock, add-to-cart |

## Dups price check

Each sync updated price, MRP and discountPct, rewrote the ₹ in the title and description, and added a priceHistory row.

| ID | Deal | DB before | Product page / DB now |
|---|---|---|---|
| #15733 | BonKaso door handle | ₹499 | ₹400 |
| #14856 | Amazon Basics 4-in-1 USB-C hub | ₹233 | ₹221 |
| #11937 | Tower 22cm fry pan | ₹363 | ₹338 |

- **#16173 (kids piano, ₹691) and #12194 (ZEBRONICS Sonic Pod, ₹949):** unchanged.
- **#16165, B07QD6R5L7 (SanDisk Switch 256GB):** still unavailable on the product page (flagged in 05a). Marked **EXPIRED**. The page stays live with the EXPIRED banner.

## Rejected this tick

All 7 were logged to `data/dd-rejected.json` with `Date.now()`. The file now holds 1,658 keys.

| ID | Reason |
|---|---|
| B0CT3DTPGD | GAMDIAS case, price drift: ₹2,893 → ₹4,169 |
| B0BH4KPQP8 | ASRock B650, price drift: ₹7,729 → ₹8,865 |
| B078R44L1V | HP dock: unavailable, no add-to-cart |
| B0F8PJGK4Z | Orient Wall 91 fan, price drift: ₹1,760 → ₹2,122 |
| B0GYQ67LRB | Hero scooter: vehicle, not a shippable deal |
| B0B6FDHK4Q | Crompton LED strip: MRP is a per-unit ₹150.99, no real discount |
| B0H1CLGYWQ | Borosil glass ×2: MRP is a per-unit ₹129.90, no real discount |

## Freshness

- `indexnow-ping.mjs` returned **HTTP 200 for 13 URLs** (6 new slugs, 3 synced slugs, 1 expired slug and the 3 hub URLs slug mode adds).
- All 6 new deal pages return 200 on prod.
- The sitemap is ISR (30 min). `llms.txt` is force-dynamic.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,615 / 15,615 | equal |
| DB max id | 16,180 | ok |
| PENDING_REVIEW / LIVE null price / LIVE null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 461 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:2, **11-05:0 at ~12:25 IST** | **ROT.** CONTENT-SEO publishes 2-3 posts next in this queue |
| Broadcast cursor | `lastId` 16,180 = max 16,180 (file re-read) | drained |
| Crons | 9/9 at 05a. CronList re-diff runs in the SITEMON tick next | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **CONTENT-SEO:** ROT. 11-05 IST has 0 posts at ~12:25 IST and needs 2-3 (cap 4).
- **TG 11-04l:** dedup ran, but no product page was checked.
  - B0GXB76VRW, Samsung 43" TV: dup #4983 is LIVE at ₹29,750. The channel's ₹25,175 is after a coupon and an HDFC offer, so re-read the PDP.
  - BPRHZEE5HKFCZ5YA, Flipkart Vyom ×2, ₹498: fresh.
  - BPRHZEHHXUYRZSPZ, Flipkart Vyom ×3, ₹686: fresh.
  - PWBGGD4THDQZYAY6, Syska 10000mAh, ₹799: fresh.
  - CELLO Kidzbee bowl set: link not yet extracted.
  - Never checked: B0G2BBWKCP Redmi 15C (₹16,999 is after an HDFC discount), KTAGY3VM4MDQBXVM Shopsy kurta, B07BK983NP Philips 20W ×2 ₹239, B0CGQ834KW Crompton pump ₹4,079, ENVH9AFZTTYXS38D Shopsy envelopes.
- **IFS 11-04k:** 79 resolved candidates were never checked on the product page.
- **DESIDIME 11-04i:** B0H429WPBC was rejected in 05a. Still never checked on the product page:
  - Amazon: B0FYGSLVRW.
  - Myntra: 45523791, 25483026, 32632547, 39321987, 45374830.
  - Shopsy: PERHDFTZNYBDCY7R.
  - Flipkart: GSTH5NTJRGPPXBH8, GSTHFMD5S3VBH2XY.
- **INDEXNOW 11-04c:** the helper still uses `createdAt` on priceHistory (it should be `postedAt`) and has a stray `publishedAt` OR clause.
- **#11896:** Flipkart shows ₹664 but the DB has ₹899.
- **16 bare Flipkart links:**
  - With an itm id: #12919, #12958, #1396, #12771, #15066.
  - Without one: #12263, #12380, #12111, #12215, #12216, #12379, #12155, #12153, #12168, #12212, #12213.
- **96 drift rows.**
- **Single deals still to check:** #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- **#2913:** the description still mentions the HDFC EMI offer.
- **#6409:** only 7% off.
- **IFB:** duplicate rows for B0GW2Q1JV7.
- **Reticle MCP:** CONNECTION_CLOSED. Not needed.
- **DO token:** still needs rotating. Owner's job.
