# DESIDIME-INGEST tick — 2026-11-18f

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards without fetching any deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were then verified on the PDP in the logged-in Playwright tab (same-origin fetch, `.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, `#availability`, add-to-cart, MOQ popover). The Flipkart candidate was verified in a Flipkart tab via the ld+json `Product.offers`, since curl gets a 403 there. Each productId was deduplicated against the live DB with Prisma before the push. Run at about 10:30–10:48 IST.

**Result: 7 new deals pushed LIVE (#16785–#16791): 6 Amazon and 1 Flipkart. 2 Amazon candidates were rejected. IndexNow returned HTTP 200. Every CEO-audit check is green and all 9 session crons are armed. This is the best DesiDime yield today after 18e (10 pushed).**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 37 |
| Junk / other filters dropped | 19 |
| Product URL resolved | 18 |
| Already in DB (dedup) | 4: B0HJ4TP8K8 tent ₹299, B0FB9HZ7S4 Fujifilm X Half ₹42,749, B08CDZ3M5K Lifelong LLM270 massager ₹546, B009319D46 Creative's gift pack ₹104 |
| Rejected within the last 24 h | 5: Havells B08GM68XW4, Krisons B0FRFY488S, Zepto Snickers, VIP B09YV753WH, Flipkart Dettol CBKHEPQZ8ARJZHGG |
| Fresh candidates | 9 |
| Passed verification | 7 |

## Pushed

`POST localhost:4000/admin/deals/bulk` returned **HTTP 201, count 7**, every result `created:true`, so no slug restore was needed. A readback found 7 of 7 rows, all LIVE. The Prisma pre-check found none of the 7 productIds already in the DB.

| Id | Product | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| #16785–#16790 (Amazon, ids in push order) | Zebronics VS750Z 750W PSU (B0G1CJ8DHH) | Amazon | ₹2,775 | ₹8,499 | 67% |
| | DSC Rave legguard, youth, left hand (B0FSLDG5Q1) | Amazon | ₹997 | ₹2,599 | 62% |
| | WildHorn leather ladies purse, Black (B0C1BPVT87) | Amazon | ₹599 | ₹1,999 | 70% |
| | Zebronics 450W Black Gold PSU (B0BZJKDWJZ) | Amazon | ₹689 | ₹1,291 | 47% |
| | Solimo cartoon pop-up toothpick holder (B0GXP5X1FQ) | Amazon | ₹189 | ₹799 | 76% |
| | Symbol women's quilted puffer jacket, Camel (B08CNP31ZY) | Amazon | ₹1,249 | ₹4,499 | 72% |
| #16791 | LITTLE RIDES Explorer baby stroller (STRHDNN4K7CV7KGR) | Flipkart | ₹2,260 | ₹12,999 | 83% |

Notes:
- **Toothpick holder:** the card said ₹183, but the PDP read ₹189. The PDP price was pushed.
- **B0BZJKDWJZ MRP:** the first `M.R.P.` match on the page (₹24,505) is bogus. The second match (₹1,291) agrees with the card and was used.
- **Images:** colour-keyed hiRes images were used for the purse (Black) and the jacket (Camel). The stroller image comes from the Flipkart CDN (`rukmini1.flixcart.com`).
- **Stroller:** ld+json reads `price 2260`, `InStock`, MRP 12999. The listing is replacement-only for 7 days.
- **Affiliate links:** Amazon uses `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. Flipkart uses `/p/itm8af861f318530?pid=STRHDNN4K7CV7KGR&affid=djhackraj`.
- **Titles:** every title's ₹ equals the numeric price.

## Rejected

| ASIN | Product | Reason |
|---|---|---|
| B0GL27838J | Customisable neon name light | Customisation-gated: the page shows only the customise popover and Buy Now, with no add-to-cart. The ₹63 shown is a base price, not a real offer |
| B0GF27FYGH | ZORBES laptop cooling pad | No buy box: no price and no add-to-cart |

Both were added to `data/dd-rejected.json` with `Date.now()` timestamps (2,078 → 2,080 entries).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 7 slugs → **HTTP 200** for 10 URLs (7 deals plus the 3 hub paths).
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design, so new deals are not expected there.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.42s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.77s) |
| /sitemap.xml | 200 (0.17s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.63s) |
| /little-rides-explorer-…-strhdnn4k7cv7kgr | 200 (0.35s) |

All probes used `curl -m 30`.

## CEO audit

Run at 10:48 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,211 = 16,211 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,791 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,784 vs 16,791 | OK. The 7-row gap is this batch, pushed minutes before the audit. The external tg-broadcast cron picks it up on its next run |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 10:48 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **Old rows with contradictory copy:** rows created before the title-vs-price check may carry a title ₹ or howTo ₹ that differs from `price`. A sweep that diffs them would find the rest.
- **IFS redirector:** dead at g through q (11 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next DESIDIME-INGEST run is at about 12:43 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
