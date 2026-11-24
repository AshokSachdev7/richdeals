# DEAL-INGEST tick — 2026-11-24l

This tick ran at about 22:50–23:10 IST on 11-24, inline. Stage 1 (`apps/api/scripts/ingest-ifs-proper.mjs`) swept indiafreestuff.in `/deals` and `/deals/superdeals`, and resolved each base64 `?rto=` Buy Now id to the real store URL. Every Amazon candidate was checked in the logged-in Playwright Amazon tab with a same-origin fetch: price from `#corePriceDisplay .a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus add-to-cart, and the hiRes MAIN image from `colorImages`. Every candidate was checked for duplicates by productId against the live DB. Telegram was not used.

**Result:**

- **15 new deals were pushed LIVE (#17331 to #17345)**, all Amazon. Each call returned HTTP 201 with count 1 and `created:true`, and each slug was confirmed on read-back.
- **6 duplicate LIVE rows were repriced in place** (#1544, #6697, #16671, #15292, #10231, #11195). The slugs were kept.
- **8 fresh candidates were rejected** because the card price had drifted from the live price.
- **IndexNow returned HTTP 200** for 24 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/deals` + `/deals/superdeals`) | 101 |
| Resolved to a product | 93 |
| Dropped: Flipkart `/indiafreestuff/p/` | 6 |
| Dropped: Flipkart Black Friday hub | 1 |
| Dropped: Amazon `/b?node` samples hub | 1 |
| Already in the DB | 53 (12 with card price ≠ DB price) |
| Rejected in the last 24h (skipped) | 17 |
| Fresh | 40 |

The 17 items skipped as recent rejects: B0HBQHXC7F, B07KK8C2YD, B0FLVYB67J, B0HLS25C4T, B0HDNMYXMN, B0HJ2B3B1R, B0CZXGTSZY, B0HPYF14R8, B0H25XC647, B0FV2XDGRH, B0HJD59MHG, B0H8HVWHGC, B0BW5P7PND, B098MQXDN2, B0G44C59R2, B0H5VWNMJL and B0H7MGMP1Q.

## Fresh candidates

15 were pushed (see Push below). 8 were rejected on drift and added to `data/dd-rejected.json` with `Date.now()` (now 2,272 keys):

| ASIN | Product | Card | Live |
|---|---|---|---|
| B07TX1TR3L | GRAZIA ladder | ₹2,870 | ₹2,990 |
| B07DC4SCXS | SJCAM action camera | ₹6,300 | ₹6,999 |
| B0BYXH6FZ4 | Dog shampoo | ₹156 | ₹174 |
| B08DM52NXS | Underjeans | ₹366 | ₹699 |
| B0CH83TPTZ | Spykar | ₹320 | ₹368 |
| B0H6BM3JBP | Himalaya pants (same brand block as #12963) | ₹513 | ₹529 |
| B0DWMXQVR6 | Sparnod | ₹8,599 | ₹8,899 |
| B0B97VX3TB | AGARO | ₹1,899 | ₹2,471 |

The other fresh cards were not pushed because the card was a lie, a multi-product post or out of stock on the product page.

## Duplicates (price sync)

Each row was updated with `prisma.deal.update`: price, M.R.P., discount, and a rewritten title and description for the new price. A `priceHistory` row was added for each. The slug was not changed and the status is still LIVE. The howTo steps on #6697 and #15292 still quoted the old price (₹89 and ₹999), so those were corrected as well. A scan of the 6 rows found no other stale rupee figure.

| Row | Product | DB before | Live now | M.R.P. | Discount |
|---|---|---|---|---|---|
| #1544 | REVLON Moisturising Compact Powder | ₹499 | ₹174 | ₹622 | 72%. The legacy title "72% Off : REVLON … @174." was rewritten to the standard format |
| #6697 | Cetaphil Gentle Exfoliating SA Lotion 29ml | ₹89 | ₹99 | ₹224 | 56% |
| #16671 | Samsung IC050 Type-C wired earphones | ₹484 | ₹438 | ₹1,099 | 60% |
| #15292 | realme Buds Wireless 5 Lite | ₹999 | ₹989 | ₹1,999 | 51% |
| #10231 | Global Grabbers sitting Buddha idol, 25 cm | ₹370 | ₹373 | ₹2,000 | 81%. The M.R.P. looks inflated |
| #11195 | Preethi Boltz 1000W mixer grinder, 4 jars | ₹4,909 | ₹5,699 | ₹14,399 | 60% |

Left unchanged after a re-read: #17272 (live ₹9,499; the card's ₹8,999 is wrong), #17253, #17258, #17241, #10710 (₹45,999, "Only 2 left") and #12963 (still no buy box).

## Push

`/admin/deals/bulk` was called on localhost, which writes to prod through the tunnel. Every call returned `201 {"count":1,...,"created":true}`. Titles and descriptions are original rewrites. Every affiliate link is Amazon `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`, and every image is from `m.media-amazon.com`.

| Row | Price | Slug |
|---|---|---|
| #17331 | ₹289 | `lavender-liquid-handwash-5-litre-refill-b0hnjpc15p` |
| #17332 | ₹899 | `homedy-flannel-fleece-fitted-bedsheet-with-2-pillow-covers-king-78x72-in-b0hs74tb3j` |
| #17333 | ₹149 | `babify-aloe-vera-baby-wipes-with-flip-top-lid-144-wipes-pack-of-2-b0fhqpc8ml` |
| #17334 | ₹168 | `prokart-20w-hot-melt-glue-gun-with-25-glue-sticks-7mm-b0fd45kh6v` (M.R.P. left null; the listed ₹1,500 would mean 89% off) |
| #17335 | ₹99 | `simply-herbal-plant-based-collagen-builder-sample-pack-10-capsules-b0hj7y783h` |
| #17336 | ₹2,699 | `zealsound-k66-pro-usb-condenser-microphone-with-boom-arm-and-rgb-b0fs731z8z` |
| #17337 | ₹319 | `myupchar-ayurveda-urjas-himalayan-shilajit-capsules-b0d1r22s46` |
| #17338 | ₹376 | `murphy-10w-ip66-led-oval-bulkhead-wall-lamp-pack-of-2-b0bqqs5t5h` |
| #17339 | ₹3,999 | `jlab-jbuds-lux-anc-over-ear-bluetooth-headphones-sage-b0crmb9z84` |
| #17340 | ₹2,491 | `foxin-256gb-pro-2-5-inch-sata-iii-internal-ssd-b0gn2sc8pp` |
| #17341 | ₹272 | `qraa-de-tan-kit-value-pack-320-g-pack-of-3-b07w8y5l5j` |
| #17342 | ₹164 | `nivea-men-pure-impact-body-wash-b00c92t37s` |
| #17343 | ₹79 | `quace-12m-multicolour-led-string-light-min-buy-2-b0cnt6gd56` |
| #17344 | ₹699 | `oppo-supervooc-45w-usb-fast-charger-adapter-cable-not-included-b0gtmj1vgv` |
| #17345 | ₹1,813 | `juarez-38-inch-linden-wood-cutaway-acoustic-guitar-with-bag-black-b076qhz4hz` |

Spot checks on prod: #17331 200 (0.16s), #17345 200 (0.14s), and repriced #11195 200 (0.14s).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 24 URLs: 15 new slugs, 6 repriced slugs, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.05s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.48s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | `/` 0.22s, `/offers` 0.08s, `/blog` 0.61s, `/sitemap.xml` 0.05s, `/feed.xml` 0.08s, `/api/deals` 0.09s, `/llms.txt` 0.48s, all 200 | OK |
| DB LIVE vs API total | 16,738 = 16,738 (16,723 at desidime 11-24l, = +15) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,345 vs 17,330 at audit, 17,335 when this report was written | OK. The external broadcast cron is working through this batch |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `deal-ingest-2026-11-24a.md` to `-24k` already existed, so this report uses `l` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The cap is 4 |

## Still open

- **IFS card prices:** 8 of the fresh cards drifted and 12 of 53 duplicates had a card price different from the DB. Every price still has to be read on the product page.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 33 rows repriced today (27 earlier plus this tick's 6).
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3 and B0GYD83B13.
- **Legacy slugs and titles:** #1530, #1590 and now #1544 (`72-off-revlon-…-B006LX`) slugs, kept to avoid a 404; #299 and #3366 titles.
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards (6 this tick).
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-24v).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
