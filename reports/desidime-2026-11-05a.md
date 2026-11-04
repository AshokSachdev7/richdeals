# DESIDIME-INGEST 2026-11-05a (~00:50 IST)

**Result: 6 deals pushed LIVE and every one was checked on the product page. 3 dup LIVE rows were price-synced and 4 candidates were rejected.**
- IndexNow returned 200 for 12 URLs.
- All 6 new pages return 200 on prod.
- CEO audit is clean: prod 8/8 200, API = DB LIVE 15,610, max id 16,174, 0 pending, 0 null price, 0 null image, cursor 16,173 (draining), crons 9/9.

## Method

1. Stage 1, `apps/api/scripts/ingest-desidime.mjs`, read the cards on `/new` and the homepage. It does not fetch per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`.
2. Amazon candidates were checked on the product page in the logged-in Playwright tab, using `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart.
3. Non-Amazon candidates were checked with `productLd()` (ld+json price within ±₹1, InStock). Flipkart was read in the Playwright tab.
4. Affiliate links:
   - Amazon: `?tag=ashoksachdev-21`.
   - Myntra: InRDeals (`inr.deals/track?id=inr678975705…`).
5. Dedup by productId against the live DB. A guard aborted the push if any pid already existed, because bulk upsert rewrites the slug.
6. Push via `/admin/deals/bulk` as `status:live`. The response was 201, count 6. Count: `{"NEW":6,"EXISTS":0,"SYNCED":3}`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Junk / app dropped | 3 (Jio app, Amazon rewards, Cred app) |
| Resolved to a merchant product | 23 |
| Already in DB | 5 |
| Rejected in the last 24h | 8 (B0CZTGRS2S, MIXEJ9YXZ9PAU6JU, IRNHHMMEEHYFWWPE, Klook, B0FDW642FG, PUTGJH74WPFDAAFT, B0H3NQXG9F, CONHRGS8ABTCSSET) |
| Fresh candidates | 10 |
| Rejected this tick | 4 |
| Pushed LIVE | 6 |
| Dup price sync | 3 |

## Pushed

| # | ID | Deal | Price | MRP | PDP check |
|---|---|---|---|---|---|
| 16169 | B0DPCGD1V3 | Amazon Basics M.2 B-Key SSD to USB-C enclosure (2TB, 5Gbps) | ₹329 | ₹1,999 | ₹329, In stock, add-to-cart |
| 16170 | B0FDB9MSKN | TAG Airlink 300Mbps USB WiFi adapter | ₹171 | ₹799 | ₹171, In stock, add-to-cart |
| 16171 | B0CGQ4HRSM | ASRock H610M-HDV/M.2+ D5 LGA 1700 motherboard | ₹4,737 | ₹11,000 | ₹4,737, In stock, add-to-cart |
| 16172 | B0HBPYSZHX | Lifelong 8-in-1 USB-C hub with SD/microSD | ₹599 | ₹1,499 | ₹599, In stock, add-to-cart |
| 16173 | B0HC3NJPD6 | Kids piano keyboard with mic, 37 keys | ₹691 | ₹2,999 | ₹691, In stock, add-to-cart |
| 16174 | Myntra 44311975 | Moda Rapido regular-fit light fade jeans | ₹399 | ₹2,499 | ld+json ₹399, InStock. 84% off. Linked through InRDeals |

## Dups price check

Each sync updated price, MRP and discountPct, rewrote the ₹ in the title and description, and added a priceHistory row.

| ID | ASIN | Deal | DB before | Product page / DB now |
|---|---|---|---|---|
| #8433 | B0HDPNQ63T | Bergner Essential Plus 5-pc cookware | ₹3,999 | ₹1,600 (card said ₹1,201) |
| #4792 | B0FX9R121C | Razer Game On bundle | ₹2,495 | ₹2,400 |
| #12194 | B0HF44NWSJ | ZEBRONICS Sonic Pod 15 Plus | ₹999 | ₹949, MRP ₹1,999 (53% off) |

- **#16051, B0HLKNLXQD (Nirmalaya sample, ₹1):** unchanged.
- **#16165, B07QD6R5L7 (SanDisk Switch 256GB):** the product page now reads unavailable or unpriced. The row was left as is and flagged below.

## Rejected this tick

All 4 were logged to `data/dd-rejected.json` with `Date.now()`. The file now holds 1,652 keys.

| ID | Reason |
|---|---|
| B0H429WPBC | Core trolley set ×3, price drift: ₹3,060 → ₹3,399 |
| WGYHZE7ZEFEZREHE | Flipkart Kenstar 15L geyser, ₹4,949, price drift |
| MONHBF2XTHU8UPW5 | Flipkart LG UltraGear 32", ₹15,499, price drift |
| 06464ce68f4d | Hamaramall Zoff chilli powder: no ld+json, and grocery |

## Freshness

- `indexnow-ping.mjs` returned **HTTP 200 for 12 URLs** (6 new slugs, 3 synced slugs and the 3 hub URLs slug mode adds).
- All 6 new deal pages return 200 on prod.
- The sitemap is ISR (30 min). `llms.txt` is force-dynamic.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,610 / 15,610 | equal |
| DB max id | 16,174 | ok |
| PENDING_REVIEW / LIVE null price / LIVE null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 461 / 0 / 0 | ok |
| Posts per day (IST) | 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:2, 11-05:0 so far | The 11-05 IST day is under an hour old. CONTENT-SEO 210ebce0 is the next run |
| Broadcast cursor | `lastId` 16,173 vs max 16,174 (file re-read) | draining. The external cron is mid-batch |
| Crons | 9/9: CronList matches the roster | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **TG 11-04l:** dedup ran, but no product page was checked.
  - B0GXB76VRW, Samsung 43" TV: dup #4983 is LIVE at ₹29,750. The channel's ₹25,175 is after a coupon and an HDFC offer, so re-read the PDP.
  - BPRHZEE5HKFCZ5YA, Flipkart Vyom ×2, ₹498: fresh.
  - BPRHZEHHXUYRZSPZ, Flipkart Vyom ×3, ₹686: fresh.
  - PWBGGD4THDQZYAY6, Syska 10000mAh, ₹799: fresh.
  - CELLO Kidzbee bowl set: link not yet extracted.
  - Never checked: B0G2BBWKCP Redmi 15C (₹16,999 is after an HDFC discount), KTAGY3VM4MDQBXVM Shopsy kurta, B07BK983NP Philips 20W ×2 ₹239, B0CGQ834KW Crompton pump ₹4,079, ENVH9AFZTTYXS38D Shopsy envelopes.
- **IFS 11-04k:** 79 resolved candidates were never checked on the product page.
- **DESIDIME 11-04i:** B0H429WPBC is now checked and rejected for drift (this tick). Still never checked on the product page:
  - Amazon: B0FYGSLVRW.
  - Myntra: 45523791, 25483026, 32632547, 39321987, 45374830.
  - Shopsy: PERHDFTZNYBDCY7R.
  - Flipkart: GSTH5NTJRGPPXBH8, GSTHFMD5S3VBH2XY.
- **#16165 SanDisk B07QD6R5L7:** the product page reads unavailable or unpriced. Re-check, and mark it EXPIRED if it stays that way.
- **INDEXNOW 11-04c:** the helper still uses `createdAt` on priceHistory (it should be `postedAt`) and has a stray `publishedAt` OR clause.
- **CONTENT-SEO:** 11-05 IST has 0 posts so far and needs 2-3 (cap 4). 210ebce0 is the next run.
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
