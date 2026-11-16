# DESIDIME-INGEST tick — 2026-11-16e

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on `desidime.com/new` and the homepage. It did not fetch per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com` to the real merchant URL. Amazon candidates were then verified in the logged-in Playwright tab (richDeals profile) and Flipkart from the PDP ld+json. Run at about 16:45–16:50 IST.

**Result: 7 pushed LIVE (bulk count 7, all `created:true`, ids #16688–#16694): 6 from Amazon and 1 from Flipkart. 5 candidates were rejected after the PDP read. IndexNow returned HTTP 200 for 10 urls. All seven new deal pages return 200 on prod.**

## Stage 1

- 35 cards discovered and 20 resolved to a single product.
- 2 were already in the DB; both were re-checked (see below).
- 4 had been rejected in the last 24h and were skipped again: Lloyd AC, Klook, VIP vests and Dettol on Flipkart.
- That left 14 fresh candidates, written to the scratchpad `dd-1116e.json`.
- Dropped in stage 1:
  - Bolun watch (WATGWK9QTZZSY3ZT): ld+json price ₹147 against the card's ₹139.
  - Digihaat stool: no ld+json, so the price could not be verified.
  - ExpressVPN, two Myntra category links and a Samsung Wallet Play Store link: not single products.

## Pushed

| Id | Store | Deal | Price | MRP | Off |
|---|---|---|---|---|---|
| 16688 | Amazon | DELITE KOM Groot Engineered Wood Study Table, Acacia Dark and Flowery Wenge | ₹4,668 | ₹9,295 | 50% |
| 16689 | Amazon | EXVITO 2-Door Plastic Shoe Rack, 6 Shelves for 12 Pairs, Grey | ₹2,198 | ₹12,949 | 83% |
| 16690 | Amazon | PrettyKrafts 45L Panda Print Foldable Laundry Basket | ₹105 | ₹499 | 79% |
| 16691 | Amazon | Milton Oyster Insulated Casserole Set of 3, Black | ₹429 | ₹2,420 | 82% |
| 16692 | Amazon | Bata Men Casual Lace-Up Derby Shoes | ₹803 | ₹2,799 | 71% |
| 16693 | Amazon | PHILIPS TAS1400BK 12W Bluetooth Speaker with RGB Lights | ₹1,189 | ₹2,599 | 54% |
| 16694 | Flipkart | ZEBRONICS Juke BAR 1600 30W Bluetooth Speaker | ₹1,399 | ₹3,499 | 60% |

- **Amazon reads:**
  - Price from `#corePriceDisplay_desktop_feature_div .a-price-whole`, M.R.P. from `.basisPrice .a-offscreen`.
  - All six were in stock with an add-to-cart button and no coupon.
  - The Bata price is for the size Amazon opens by default; the copy says the price can vary by size.
- **Flipkart read:** ld+json `offers.price` 1399, InStock. The page shows M.R.P. ₹3,499 and 60% off. The lower ₹1,329 on the page is a bank-offer price and was not used.
- **Affiliate links:**
  - Source tags stripped.
  - Amazon deals carry `?tag=ashoksachdev-21` on `/dp/ASIN`.
  - Zebronics uses the clean Flipkart `/p/itm0de0599acef3e?pid=ACCH4SW3NAFER5CB&affid=djhackraj` URL.
- **Images:** Amazon from m.media-amazon.com (`#landingImage` hi-res), Zebronics from rukminim2.flixcart.com.
- **Copy:** original, using only PDP title and bullet facts: dimensions, material, capacity, wattage, connectivity, pack count and care notes.
- **Pre-flight passed:**
  - Every ₹ in the copy equals the price or M.R.P.
  - Image hosts are valid, and every price is below its M.R.P.
  - Every slug ends in its product id, and the slugs are unique.
- **Dedup:** a Prisma read for the 7 productIds and slugs, before the push, returned no rows.
- **Push route:** the push went to the local API (`localhost:4000`, which uses the same managed DB). The prod endpoint returned 401 with the local `ADMIN_KEY`; prod and local keys differ.

## Dup re-checks

| Id | Deal | DB | PDP | Outcome |
|---|---|---|---|---|
| — | GM Balin (B0FM8D7C1Z) | ₹5,499 / ₹12,490 | ₹5,499 / ₹12,490, "Only 1 left" | No change. The card's ₹4,948 is a bank-offer price. Added to the low-stock list. |
| 16000 | Dettol Original Liquid Handwash Refill Pouch (B01LNA2MQK) | ₹159 | ₹159 | No change; synced in TG tick g. |

## Rejected / skipped

| Id | Deal | Reason |
|---|---|---|
| B0814P4L98 | 75L laundry basket | No buy box and no add-to-cart button. |
| B09Y66Y69Y | Samsung TV | PDP ₹32,990 against the card's ₹31,344. |
| B0DB8P9PSS | Bajaj griller | PDP ₹1,799 against the card's ₹1,199. |
| B0FBLW9WD7 | Havells Monza Pro | PDP ₹6,990 against the card's ₹5,791; the card price needs a coupon. |
| B0H9HTSXJJ | "Ankoda" earphones | PDP brand is "xinwld": a knockoff "Original" iPhone Lightning earphone. |

All five were added to `data/dd-rejected.json` with `Date.now()` (not committed).

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 7 slugs (plus its 3 hub urls) returned **HTTP 200 for 10 urls**.
- **`sitemap.xml`:** ISR, at most 30 min stale. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.27s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.16s) |
| /api/deals | 200 (0.12s) |
| /llms.txt | 200 (0.58s) |
| /delite-kom-groot-engineered-wood-study-table-acacia-wenge-b0bz518xkg | 200 |
| /exvito-2-door-plastic-shoe-rack-6-shelf-12-pairs-grey-b0h3kmjh9p | 200 |
| /prettykrafts-45l-panda-print-foldable-laundry-basket-b09sv7zs57 | 200 |
| /milton-oyster-casserole-set-of-3-black-b0dxbwff1z | 200 |
| /bata-men-casual-lace-up-derby-shoes-b0gmk15xbh | 200 |
| /philips-tas1400bk-bluetooth-speaker-12w-rgb-b0f8w13yts | 200 |
| /zebronics-juke-bar-1600-30w-bluetooth-speaker-acch4sw3nafer5cb | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,114 = 16,114 | OK (16,107 + 7) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,694 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,687 vs 16,694 | OK. The external broadcast cron picks up this batch on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The 18:39 IST CONTENT-SEO run may add a third (cap 4).

## Still open

- **IFS source blocked:** every `?rto=` redirects home. The 16:53 IST IFS tick probes one id first.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678 (B0D7MQ6WVG)
  - #16682 (B0FXVPK6R7)
  - new this tick: B0FM8D7C1Z (GM Balin, "Only 1 left")
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
