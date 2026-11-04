# DESIDIME-INGEST 2026-11-04g (~21:00 IST)

**Result: 4 deals pushed LIVE and every one was checked on the product page. No rows were synced: the one dup (#759 IFB) already had the right price. 14 candidates were rejected.**
- IndexNow returned 200 for 7 URLs.
- All 4 new pages return 200 on prod.
- CEO audit is clean: prod 8/8 200, API = DB LIVE 15,604, max id 16,168, 0 pending, 0 null price, 0 null image, cursor drained, crons 9/9.

## Method

1. Stage 1, `apps/api/scripts/ingest-desidime.mjs`, read the cards on `/new` and the homepage. It does not fetch per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`.
2. Amazon candidates were checked on the product page in the logged-in Playwright tab, using `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart.
3. Non-Amazon candidates were checked with `productLd()` (ld+json price within ±₹1, InStock). Flipkart was read in the Playwright tab.
4. Affiliate links:
   - Amazon: `?tag=ashoksachdev-21`.
   - The Auric: Cuelinks. A new store row (#507) was created for it.
5. Dedup by `store_product` against the live DB, falling back to slug.
6. Push with Prisma as `status:LIVE`, adding a priceHistory row for each deal. Count: `{"NEW":4,"EXISTS":0,"SYNCED":0}`.

## Funnel

| Stage | Count |
|---|---|
| Cards discovered | 34 |
| Resolved to a merchant product | 25 |
| Already in DB | 3 |
| Rejected in the last 24h | 4 (B0H25X3W7F ASUS, Klook, TVSGYDXTMHNQFEFS, CONHRGS8ABTCSSET) |
| Fresh candidates | 18 |
| Rejected this tick | 14 |
| Pushed LIVE | 4 |
| Dup price check | 1 (#759, no change) |

## Pushed

| # | ID | Deal | Price | MRP | PDP check |
|---|---|---|---|---|---|
| 16165 | B07QD6R5L7 | SanDisk microSDXC UHS-I 256GB for Nintendo Switch | ₹2,975 | null | ₹2,975 with add-to-cart. `#availability` is empty, but add-to-cart is present |
| 16166 | B0GVK6ZW74 | Amazon Basics 6W Bluetooth speaker with RGB | ₹599 | null | ₹599, In stock, add-to-cart. The candidate's MRP of ₹3,398 would mean 82% off, so MRP is null |
| 16167 | B0G452FS75 | SanDisk Type-C 64GB flash drive, FIFA WC 2026 edition | ₹899 | null | ₹899, In stock, add-to-cart |
| 16168 | 6b893cd95857 | The Auric Liv365 effervescent tablets | ₹890 | null | ld+json ₹890, InStock. Linked through Cuelinks. The copy makes no health claims |

## Dups price check

- **#759 IFB 197L, B0GW2YHFCX:** the DesiDime card says ₹12,045, the product page says ₹17,690, and the DB already has ₹17,690. No sync was needed. The card price was wrong.

## Rejected this tick

All 14 were logged to `data/dd-rejected.json` with `Date.now()`. The file now holds 1,645 keys.

| ID | Reason |
|---|---|
| B0F3JKY28G | Price drift: ₹19,879 → ₹25,999 |
| B0C85PPNBW | Price drift: ₹2,235 → ₹2,349 |
| B0D9R4GYTN | Price drift: ₹2,591 → ₹3,990 |
| B0GCFSQ4X7 | Price drift: ₹25,240 → ₹32,490 |
| B0HKDDQWBX | Price drift: ₹199 → ₹599. Also a sample listing |
| B0GYD6YC2N | Price drift: ₹51,999 → ₹69,499 |
| B0FDW642FG | Price drift: ₹15,549 → ₹16,799 |
| B0CZTGRS2S | Price drift: ₹14,394 → ₹15,719 |
| B0GX5BBLHW | Price drift: ₹77,290 → ₹85,990 |
| B0FX9KJWH2 | Price drift: ₹7,360 → ₹8,399 |
| B0H3NQXG9F | Haier, no buy box |
| IRNHHMMEEHYFWWPE | Flipkart Havells iron, price drift |
| PUTGJH74WPFDAAFT | Flipkart Morphy Richards toaster, price drift |
| TVSHM44HKGAY3HVR | Flipkart TCL 75", price drift |

## Freshness

- `indexnow-ping.mjs` for the 4 slugs returned **HTTP 200 for 7 URLs** (4 slugs plus the 3 URLs slug mode adds).
- All 4 new deal pages return 200 on prod.
- The sitemap is ISR (30 min). `llms.txt` is force-dynamic.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,604 / 15,604 | equal |
| DB max id | 16,168 | ok |
| PENDING_REVIEW / LIVE null price / LIVE null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 461 / 0 / 0 | ok |
| Posts per day (IST) | 10-25:2, 10-26:4, 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, 11-04:2 | 11-04 meets the rule. 11-01 and 11-02 are past misses |
| Broadcast cursor | `lastId` 16,168 = max 16,168 (file re-read) | drained. The external cron has already sent this batch |
| Crons | 9/9: CronList matches the roster | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **TG 11-04:** three candidates were never verified.
  - B07BK983NP, Philips 20W ×2, ₹239.
  - B0CGQ834KW, Crompton pump, ₹4,079.
  - Shopsy ENVH9AFZTTYXS38D, envelopes.
- **INDEXNOW 11-04c:** the helper still uses `createdAt` on priceHistory (it should be `postedAt`) and has a stray `publishedAt` OR clause.
- **IFS 11-04g/h/j:** the candidates were never checked on the product page. DesiDime 11-04g is now covered by this tick.
- **CONTENT-SEO:** a 3rd post for 11-04 is optional and must stay ≤4.
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
