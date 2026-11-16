# DEAL-INGEST (indiafreestuff) tick — 2026-11-16a

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals` and `/deals/superdeals` and resolved every base64 `?rto=` Buy Now id. Candidates from all stores were deduped by productId against the live DB and `data/dd-rejected.json`. Every price was then read on the PDP: Amazon in the logged-in tab (`#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, `#availability`, add-to-cart), Flipkart via the page's ld+json `offers` in a Playwright tab. Run at about 10:50–11:05 IST.

**Result: 6 pushed LIVE (bulk count 6, all created): 5 Amazon, 1 Flipkart. 2 candidates rejected. 83 of 91 listing cards were stale (expired ids). IndexNow returned HTTP 200 for 9 urls. Prod is 7/7 at 200 and every DB check is green.**

## Pushed

| Store | Deal | Price | MRP | Off |
|---|---|---|---|---|
| Amazon | LUKER Radial Glow 1200mm BLDC ceiling fan with remote, BEE 5-star, Black (B0DVPL3BFB) | ₹3,091 | ₹6,580 | 53% |
| Amazon | Reebok women's training tights, Black (B09MJCSBQ2) | ₹597 | ₹2,999 | 80% |
| Amazon | Reebok women's tights, Black (B094RHH82D) | ₹499 | ₹2,599 | 81% |
| Amazon | Woodland men's leather sandal, Khaki (B096CHYS68) | ₹1,198 | ₹2,995 | 60% |
| Amazon | Woodland men's sneaker, Dubai Khaki (B0BR5N918L) | ₹2,099 | ₹5,295 | 60% |
| Flipkart | Acer ICONIA Tab iM11-12M 8GB/128GB 11.45" Wi-Fi + 4G, Blue (TABHQ7F3HHYFEHPH) | ₹20,999 | ₹39,990 | 47% |

- Amazon links use `?tag=ashoksachdev-21` on `/dp/ASIN`. The Flipkart link uses the real `/p/itm867f04645f6b3` path with `pid` + `affid=djhackraj` (the IFS `/indiafreestuff/p/` tracking path and `affid=adminnxtify` were dropped).
- Images come from `m.media-amazon.com` and `rukmini1.flixcart.com`.
- Titles and descriptions are original copy. The builder pre-flight passed: every ₹ in the copy equals the price, price < MRP, the image matches the CDN pattern, and there are no duplicate slugs. One unverifiable line ("Woodland rarely discounts this deep") was cut before the push.
- Acer: the IFS card said ₹19,649, which is a PNB credit-card offer price (it is in their slug). We list the honest base price of ₹20,999, which the ld+json confirms (`offers.price` 20999, InStock), and the copy says card offers can lower it further.
- None of the 6 productIds existed in the DB, so no slug restore was needed. The Acer page returns 200 on prod.
- The Reebok tights and the Woodland sandal showed "only 1–5 left" on the PDP. They are added to the low-stock re-check list.

## Dup re-checks

None this tick. All 8 resolved productIds were new to the DB.

## Rejected / skipped

- B0D6MYHVVM Skechers Go Run Consistent: the PDP shows ₹2,418 against the card's ₹2,224 (drift).
- B0GYDSVNPC Woodland OGC 6614124: no buy box and no add-to-cart button.

Both were added to `data/dd-rejected.json` with `Date.now()` values (1,996 entries). The other two Woodland rows matched the PDP exactly, so the Woodland block was not rejected as a whole.

**Stale IFS cards:** 83 of the 91 listing cards redirect to the IFS homepage when their Buy Now is resolved. Their decoded deal ids (272,676,063–3,084,663,725) are older than the ids that resolve (3,084,654,837–3,084,664,836). The deal-page buy_now goes to the same id and also 302s to `/`, even with a cookie and Referer, so this is not bot-blocking. The IFS listing keeps showing expired deals, and expired ids redirect to the homepage. Those cards are skipped; nothing is lost.

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 6 new slugs and returned **HTTP 200** for 9 urls (6 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child carries the top 100 only, by design.
- `llms.txt`: force-dynamic, so it already reflects the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.21s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.14s) |
| /llms.txt | 200 (0.62s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,071 = 16,071 (16,065 + 6) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 489, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,644 vs 16,650 | OK. The external broadcast cron picks up the 6 new rows on its next run. |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 1**. The next CONTENT-SEO run adds the second post for 11-16 (the cap is 4).

## Still open

- Low-stock rows to re-check: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC La Opala, #360 Sulfar, Reebok MACHRUN M (B0HKNB18Q6), and today's B09MJCSBQ2, B094RHH82D and B096CHYS68.
- The same-price confirm paths still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- #7751 Nivia football is only 8% off.
- Amazon reuses ASINs (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug, which contains "676" from the old junk title. Changing it would 404 the existing URL, so it stays.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
