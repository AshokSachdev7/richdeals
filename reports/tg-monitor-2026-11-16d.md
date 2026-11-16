# TELEGRAM-DEAL-MONITOR tick — 2026-11-16d

The tick read all 13 groups from `data/tg-groups.json` in one `browser_evaluate` over the Telegram Web sidebar (Playwright, richDeals profile). It deduped against `data/tg-multi-seen.json` and the live DB productId, and verified every price on the Amazon PDP in the logged-in tab. Run at about 13:00–13:14 IST.

**Result: 2 pushed LIVE (bulk count 2, both `created:true`). IndexNow returned HTTP 200 for 5 urls. Both deal pages return 200 on prod.**

## Pushed

| Id | Store | Deal | Price | MRP | Off |
|---|---|---|---|---|---|
| 16671 | Amazon | Samsung Original IC050 Type-C Wired Earphones, Black | ₹484 | ₹1,099 | 56% |
| 16672 | Amazon | Arrow Men's Zero Calorie Slim Fit All Over Printed Blazer, Light Grey | ₹3,600 | ₹7,999 | 55% |

- Source groups: ONLINE SHOPPING DEALS (Samsung) and SB Loots (Arrow).
- Source tags stripped: `vivek123034-21` (Samsung) and `bhavesh015-21` (Arrow). Both carry `?tag=ashoksachdev-21` on `/dp/ASIN`.
- Both PDPs were read from `#corePriceDisplay_desktop_feature_div .a-price-whole`, and both were in stock with an add-to-cart button.
- Images come from `#landingImage` data-old-hires on m.media-amazon.com, the variant that was checked.
- The Arrow post listed several Arrow blazers ("starting ₹3,600"). Only the first, single product was taken. Its copy says other colours and sizes can be priced differently.
- Pre-flight passed: every ₹ in the copy equals the price, the discount is in the first line, the title ₹ equals the price, the image URL is valid and the slugs are unique.
- Slugs: `samsung-original-ic050-type-c-wired-earphones-black-b0b51sr4k9`, `arrow-men-s-zero-calorie-slim-fit-all-over-printed-blazer-light-grey-b0f5qgdbxn`.

## Dup re-checks

| ASIN | Deal | Outcome |
|---|---|---|
| B0FM8D7C1Z | GM Balin 15L geyser (Dealzone repost at ₹5,498) | Pushed in tick c at ₹5,499 after a PDP read an hour earlier. ₹1 difference, inside tolerance, no change. |
| B0H4W3VKR2 | Jam & Honey foosball (CoolzTricks) | Already seen, no change. |

## Rejected / skipped

- Dealdost: Scapia card referral loot.
- Hidden Loot and IFS Tips: Swiggy Dineout vouchers.
- Rogerkart: photo-only post at 00:39, no link.
- INDIAN CHEAP DEALS and NonStopDeals: stale, and both were category posts (LG, Caprese).

`data/tg-multi-seen.json` now has 5,174 entries (not committed).

## Freshness

- IndexNow: `indexnow-ping.mjs` with the 2 slugs (plus its 3 hub urls) returned **HTTP 200 for 5 urls**.
- `sitemap.xml`: ISR, at most 30 min stale. The deals child is top-100 only, by design.
- `llms.txt`: force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |
| /samsung-original-ic050-type-c-wired-earphones-black-b0b51sr4k9 | 200 |
| /arrow-men-s-zero-calorie-slim-fit-all-over-printed-blazer-light-grey-b0f5qgdbxn | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,093 = 16,093 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,672 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,670 vs 16,672 | OK. The external broadcast cron picks up this batch on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**.

## Still open

- The IFS source is blocked (every `?rto=` redirects home). The 14:53 IST IFS tick probes one id first.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
