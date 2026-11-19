# TELEGRAM-DEAL-MONITOR tick — 2026-11-19g

The tick read the Telegram Web sidebar in the Playwright richDeals profile. It found nothing new since 19f, so it read the ONLINE SHOPPING DEALS chat history instead (73 codes). Shortlinks were resolved to ASINs and deduped against `data/tg-multi-seen.json` and live DB productIds. Every candidate was checked on its Amazon PDP with a same-origin fetch in the logged-in tab: price from `.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, stock from `#availability` plus the add-to-cart button, and M.R.P. from the `#centerCol` text. When a duplicate LIVE row was re-read, it was repriced only if the PDP had moved. Run at about 05:40–06:25 IST.

**Result: 6 new Amazon deals pushed (`201`, count 6, all `created:true`). 7 LIVE rows repriced to their PDP price, each with a priceHistory row. #4444 was delisted to EXPIRED because its ASIN returns 404 on both the desktop and mobile URLs. IndexNow returned HTTP 200 for 17 URLs. Prod returned 200 on 7 of 7 endpoints.**

## Pushed (new)

| Slug | Price | M.R.P. | Off |
|---|---|---|---|
| `max-urbn-men-solid-sweatshirt-green-b0dcvtk164` | ₹308 | ₹699 | 56% |
| `bata-kafi-womens-sandals-dark-brown-b091q7drfh` | ₹251 | ₹649 | 61% |
| `solimo-cotton-bath-towel-500-gsm-spanish-red-b07jfbzm4b` | ₹254 | ₹800 | 68% |
| `waterproof-bike-cover-bajaj-pulsar-150-125-bs6-blue-b0csb2tht6` | ₹179 | ₹599 | 70% |
| `esquire-elegant-blue-360-spin-mop-extra-refill-b09p3mvzr5` | ₹373 | ₹1,199 | 69% |
| `skechers-mens-cotton-half-terry-ankle-socks-3-pack-b0cj4slgfn` | ₹359 | ₹599 | 40% |

All six use `/dp/ASIN?tag=ashoksachdev-21` with an `m.media-amazon.com` image. Before the POST, every ₹ figure in each title and howTo was checked against the price, and every ₹ figure in the description against the price or the M.R.P.

## Repriced (duplicate LIVE rows)

| id | Product | Old → new | M.R.P. | Off | Copy change |
|---|---|---|---|---|---|
| 16627 | Longway Super Pro mixer grinder | ₹1,489 → ₹1,599 | ₹3,399 (was ₹3,939) | 53% | Corrected from 4 jars to 3. The slug was kept. |
| 11369 | SIMPARTE glass containers, set of 3 | ₹770 → ₹655 | ₹1,875 | 65% | — |
| 16691 | Milton Oyster casserole set of 3 | ₹429 → ₹1,938 | ₹2,420 | 20% | Removed the stale 82% figure |
| 12651 | HP Campus Core 16 backpack, Green | ₹999 → ₹317 | ₹2,199 (was ₹2,299) | 86% | The howTo said ₹550; it now says ₹317. Notes that only one unit was left. |
| 14012 | CareFoam memory foam pillow | ₹879 → ₹398 | ₹1,799 | 78% | — |
| 6989 | Go24 pexpo 950ml bottle | ₹579 → ₹355 | ₹1,098 | 68% | The listing is now a single bottle, not a pack of 2. The slug was kept. |
| 16686 | Treo by Milton glass tiffin 3×400ml | ₹654 → ₹807 | ₹1,399 | 42% | — |

**Delisted:** #4444 boAt Sailor Play kids headphone went from LIVE to EXPIRED. The page stays up with the expired banner and is noindex.

**Same-price confirm:** #5084 Philips HD9200 is still ₹5,599, so nothing was written.

## Rejected

| Reason | Items |
|---|---|
| Price drift (posted price vs PDP) | Milton Felice ₹399 vs ₹1,040 · BLACK+DECKER chainsaw ₹5,219 vs ₹11,479 · Beardo ₹112 vs ₹281 · Amul vest ₹237 vs ₹253 · Derma Co ₹139 vs ₹314 · Vega ₹129 vs ₹249 · Van Heusen ₹479 vs ₹1,039 · Maybelline ₹199 vs ₹670 · Boldfit ₹299 vs ₹499 |
| No buy box | Allen Solly sandal (B0FH9XDZCN), Crompton FlameStar (B0F3J89F8L) |
| Supplement | Curowise (B0H4G7NR6D) |
| Shortlink did not resolve | Allen Solly boots |
| Grocery | Teacurry (B09JK1BBKZ), Celest tea (B0F7R75BSM) |

All 54 resolved codes plus the 6 pushed ASINs were added to the seen list, which went from 5,495 to 5,571 entries.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run on the 14 changed slugs (6 new, 7 repriced, 1 delisted). The script adds 3 URLs, for 17 in total. **HTTP 200.**
- **`sitemap.xml`:** ISR 1800s. Under the owner's 10-16 directive, the deals child lists only the top 100 deals, so new deals stay out of it.
- **`llms.txt`:** force-dynamic, so it is current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.70s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.18s) |
| /llms.txt | 200 (0.67s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 06:23 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,289 = 16,289 (+6 pushed, −1 delisted) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,897 | OK |
| Posts | 498, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,891 vs 16,897 | OK. The gap is this batch; the external broadcast cron moves the cursor on its next run. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 1**. CONTENT-SEO runs at 06:39 and should add the next post. No day has 0 posts and none is over the cap of 4.

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves from 18j through 19c. If it stays dead, the first 11-20 DEAL-INGEST tick repoints the slot to reading Telegram history.
- **DesiDime:** 0 fresh deals for two ticks running.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the new Max sweatshirt (1 left).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-19): SITEMON 06:23, CONTENT-SEO 06:39, DESIDIME 06:43, DEAL-INGEST 06:53, TG 07:01 and INDEXNOW 07:05. SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
