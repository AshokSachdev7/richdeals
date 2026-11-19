# DESIDIME-INGEST tick — 2026-11-19d

The tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`). Stage 1 reads only the listing cards from `desidime.com/new` and the homepage, with no per-deal fetch. It applies the JUNK and GROCERY filters, resolves Buy Now through `visit.desidime.com`, and verifies non-Amazon candidates with `productLd` (±₹1, InStock). It dedups against live DB productIds and skips productIds rejected in the last 24 hours.

The tick read the Amazon candidate and the five Amazon duplicates in the logged-in Playwright tab with a same-origin fetch. It took the price from `.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, stock from `#availability` plus the add-to-cart button, and the M.R.P. from `#centerCol`. It read the Myntra duplicate's ld+json with curl. Run at about 06:50–07:00 IST.

**Result: 2 fresh deals pushed LIVE (`201`, count 2, both `created:true`): a Beardo perfume pack on Amazon and a TVS Racing helmet on Flipkart. This ends a two-tick run of 0 fresh deals. IndexNow returned HTTP 200 for 5 URLs. All 6 duplicate LIVE rows matched their PDP price, so nothing was written to them. Every CEO-audit check is green.**

## Stage 1

| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Dropped (junk or unsupported store) | 12 |
| Product-resolved | 21 |
| Already in DB | 6 |
| Rejected in last 24h | 13 |
| **Fresh** | **2** |

Two of the dropped cards are worth noting. The Magnus lunch box resolved to a Flipkart `/a/p/b` link, and the JBL PartyBox 130 resolved to an Amazon `/clp/` landing page. Neither is a single-product page.

The 13 cards rejected in the last 24 hours were skipped without being re-read:

- Apple: iPad Air M4, iPad mini and iPhone 18 Pro
- Orient Litpod emergency lamp
- Cooler Master Storm controller
- FableStreet shirt
- Bajaj StyloHot geyser
- Panasonic 1.45 ton AC
- Godrej 472 L fridge
- VIP Bonus vest
- Flipkart: LiveShop cashews, Coway Airmega 50 and the Dettol body wash

## Fresh deals pushed

| id | productId | Product | Store | Price | M.R.P. | Verification |
|---|---|---|---|---|---|---|
| 16898 | B0HG5C4R4V | Beardo Sea Borne & LSD Perfume for Men, 100 ml pack of 2 | Amazon | ₹663 | ₹3,000 (78% off, kept) | PDP ₹663 matched the card. In stock, with an add-to-cart button. |
| 16899 | HLMHACQ5UEERWZNX | TVS Racing Anti Matter Motorbike Helmet (Blue) | Flipkart | ₹1,595 | ₹2,399 (34% off) | Stage 1 `productLd`: ld+json ₹1,595, InStock (`verify: ok`) |

**Affiliate links:**

- Amazon: `/dp/B0HG5C4R4V?th=1&psc=1&tag=ashoksachdev-21`. DesiDime's `desidime01-21` tag was stripped.
- Flipkart: `/p/itm7b84f0169c072?pid=…&affid=djhackraj`. DesiDime's `affid=salescueli` and `affExtParam` values were stripped.

**Content:** both titles and descriptions were rewritten. The ₹ figure in each title was diffed against the numeric price before the POST. The Beardo description gives the per-bottle price (about ₹332 per 100 ml), worked out from the listing. The helmet description adds a sizing note and no specifications.

**Images:** the Beardo image is from the `m.media-amazon.com` landing image. The helmet image is from Flipkart's `rukmini1.flixcart.com` CDN, taken from the ld+json.

## Duplicate LIVE rows

| id | productId | Product | Card | DB | PDP | Action |
|---|---|---|---|---|---|---|
| 12328 | B07XY5LX2W | Cello melamine mugs, set of 4 | ₹293 | ₹293 | ₹293, in stock | Same price, no write |
| 16885 | 30918417 | KLOTTHE sherpa winter night suit | ₹649 | ₹649 | ₹649, InStock (ld+json) | Same price, no write. The M.R.P. stays null (Myntra's ₹4,999 implies 87% off). |
| 16884 | B0DM63JQ9Q | Istyle ribbed zip-collar top | ₹289 | ₹289 | ₹289, in stock | Same price, no write |
| 4927 | B0H36MXL3V | Bouncefit MG-203 massage gun | ₹389 | ₹499 | ₹499, in stock | No write. The PDP disagrees with the card, so the card's ₹389 is probably a coupon or a bank-offer price. The M.R.P. stays null (₹2,999 implies 83% off). |
| 174 | B0GZQBMXTZ | Shimmer Pro Max toilet cleaner 10 L | ₹495 | ₹495 | ₹495, in stock | Same price, no write |
| 219 | B009319D46 | Creative's kids gift pack | ₹104 | ₹145 | ₹145, in stock | No write. The PDP disagrees with the card, so the card's ₹104 is probably a post-coupon price. |

The Cello M.R.P. on the PDP is ₹719, but #12328 stores ₹440. The stored value is lower, so the visible discount is understated, not inflated. It stays on the M.R.P. watch list.

## Freshness

| Check | Result |
|---|---|
| IndexNow | `indexnow-ping.mjs` with the 2 slugs (2 slugs plus 3 hub URLs) returned HTTP 200 for 5 URLs |
| sitemap.xml | ISR with `revalidate = 1800`, so it is stale for at most 30 minutes. The deals child is TOP-100 only, so the new rows may not appear in it, by design. |
| llms.txt | `force-dynamic`, so the new rows show on the next request |
| Prod deal page | `/beardo-sea-borne-lsd-perfume-men-100ml-pack-of-2-b0hg5c4r4v` returned 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.37s) |
| /offers | 200 (0.11s) |
| /blog | 200 (0.79s) |
| /sitemap.xml | 200 (0.11s) |
| /feed.xml | 200 (0.12s) |
| /api/deals | 200 (0.21s) |
| /llms.txt | 200 (0.66s) |

All probes used `curl -m 30`.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,291 = 16,291 (+2 from this tick) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,899 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Posts per day (IST) | 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 2** | OK |
| Broadcast cursor vs max | 16,897 vs 16,899 | OK. These are this tick's two new rows; the external broadcast cron picks them up on its next run. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Still open

- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`. Six more same-price confirms this tick.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** zero resolves from 18j through 19c. If it stays dead, the first 11-20 DEAL-INGEST tick repoints the slot to reading Telegram history.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| DEAL-INGEST | 06:53 |
| TG | 07:01 |
| INDEXNOW | 07:05 |
| SITEMON | 07:14 |
| DESIDIME | 08:43 |
| CONTENT-SEO | 12:39 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
