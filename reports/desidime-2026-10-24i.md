# DESIDIME — 2026-10-24i (16:26 IST)

**2 new deals pushed LIVE:**
- **#14640** STRIFF gas-spring monitor arm: ₹1,169, MRP ₹3,999, 71% off (Amazon)
- **#14641** Dennis Lingo pink slim-fit shirt: ₹363 (Myntra via InRDeals; MRP nulled by the guard)

**IndexNow returned HTTP 200 for 5 URLs:** the 2 slugs plus `/`, `/offers` and `/sitemap.xml`.

Of the 18 cards that survived the JUNK/GROCERY filter, 16 were rejected. Most had drifted from the card price.

## Method

- **Stage 1:** `node apps/api/scripts/ingest-desidime.mjs` over `/new` and the homepage. It returned 12 candidates after the JUNK/GROCERY filter, and resolved each `visit.desidime.com` link to the merchant URL.
- **6 Flipkart cards were dropped by `affiliate()`** (no `pid`, or a non-`itm` path). They were re-resolved by hand:
  - each visit link resolved with curl
  - card prices taken from the `/new` and homepage HTML
  - pid and price read in the Flipkart tab with in-tab `fetch`, from the ld+json `offers`
- **Amazon check:** in-tab `fetch('/dp/ASIN?th=1&psc=1')` in a logged-in tab:
  - price from `#corePriceDisplay_desktop_feature_div .a-price-whole`
  - MRP from `.basisPrice`
  - stock from `#availability` and `#add-to-cart-button`
  - image from `#landingImage[data-old-hires]`
- **Non-Amazon check:** `productLd()` reads the ld+json price; it must be within ±₹1 of the card and InStock.
- **MRP guard:** `(!m||m<=p||m>=p*100||p/m<=0.2) → null`. Dennis Lingo is at 363/1849 = 0.196, so the guard fired and its title and description carry no % or M.R.P. text.
- **Dedup:** productId, affiliateUrl and slug checked against the live DB with Prisma. For Myntra, both the md5 pid `2510ae324abf` and style id `7488102` were checked. Neither deal was in the DB.
- **Push:** `apps/api/_dd24i-push.cjs`. The ₹ and % validators passed, the endpoint returned 201 with `count: 2`, and both rows came back `created: true`.

## Candidates

| Product id | Item | Card | Page | DB before | Action |
|---|---|---|---|---|---|
| B0G34F4VH6 | STRIFF monitor arm | ₹1,169 | ₹1,169 / ₹3,999, in stock, add-to-cart | — | **pushed #14640** |
| 2510ae324abf | Dennis Lingo pink shirt (Myntra 7488102) | ₹363 | ₹363, InStock (ld+json) | — | **pushed #14641** |
| B0GCFSQ4X7 | Midea 1.36T inverter AC | ₹26,740 | ₹32,990 | — | reject, drift |
| B0HFW15QRS | LINSO STORM air purifier | ₹10,799 | ₹18,999 | — | reject, drift |
| B0H2YVXLBR | Dreame D30 Ultra robot vacuum | ₹39,449 | ₹44,999 | — | reject, drift |
| B0F13828HW | Livpure Allura Prime RO | ₹8,495 | ₹11,399 | — | reject, drift |
| B0CPJG92ZS | Samsung 8 kg front load | ₹26,740 | ₹34,490 | — | reject, drift |
| B0FPXH248P | Walltron Rain Shield 20 L | ₹3,422 | no price, no add-to-cart | — | reject, unavailable |
| B0GVJSTKS6 | TCL 55" QLED Google TV | ₹36,935 | no price, no add-to-cart | — | reject, unavailable |
| B0797MY6JB | Sony HT-S100F soundbar | ₹6,514 | no price, no add-to-cart | — | reject, unavailable |
| SFSHQ4GBPBC6CQVW | Godrej Interio Cresco 3+1+1 sofa | ₹21,632 | ₹25,990 | — | reject, drift |
| e9f7afade904 | Lakmé 9to5 face palette | ₹999 | no ld+json | — | reject, unverifiable |

### Flipkart cards dropped by `affiliate()`, re-resolved by hand: all drifted

| Pid | Item | Card | Page |
|---|---|---|---|
| MONH5NUBVNUW335Z | Samsung Odyssey G9 | 165249 | 169999 |
| ACCH3MUYEGHH2WGD | Mivi H750 | 7199 | 7999 |
| COMHZEEDEP4E92NJ | ASUS TUF A15 | 80490 | 104499 |
| TABHZYDZ7AHXY5E6 | Lenovo Idea Tab | 25999 | 30999 |
| MOBHPR97RGZJSE7X | Moto g max | 18527 | 19499 |
| MOBHN973UQNPMAAN | Moto g06 power | 11402 | 11999 |

Most of these card prices look like bank-offer or coupon prices.

- **Junk filter:** dropped the gift-card, cashback, recharge and "flat N% off" cards before stage 1 finished.

## Copy

- Both titles and descriptions are original and use only product-page facts:
  - STRIFF: 13"–32" screens, 8 kg, VESA 75/100, gas spring, 180° swivel, ±90° tilt, aluminium
  - Dennis Lingo: pink, slim fit, casual
- Images come from the marketplace CDNs (`m.media-amazon.com` and `assets.myntassets.com`).
- Myntra uses the clean style URL (the `/buy`, `atgSessionId` and Cuelinks utm parameters were stripped), wrapped in InRDeals.

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs.
- **Prod JSON-LD:** both deal pages return 200, with Offer prices 1169 and 363.
- **Sitemap:** ISR revalidates every 1800 s. No new static route was added.
- **`llms.txt`:** force-dynamic, so it is already current.

## CEO audit (16:26 IST)

- **Deals:** 14,111 LIVE. The highest ID is 14641. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW.
- **Posts per IST day:** 10-21: 3, 10-22: 3, 10-23: 3, 10-24: 3. 0 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** at 14639, 2 behind the DB maximum. The gap is this batch, and the external cron picks it up. Not rot.
- **Unpushed commits:** 0 before this report.
- **Crons:** CronList shows 9 of 9 roster jobs.

## Still open

- **Gap:** `affiliate()` in `lib/ingest-common.mjs` returns null for Flipkart links that have no `pid`, and the card then goes into `dd-dead.json` permanently. DesiDime Flipkart links often lack the pid, so real products get dropped and only a hand pass catches them. Fix: resolve the pid in-tab instead of marking the card dead. This tick lost nothing (all 6 drifted), but it will.
- 47 shadowed same-ASIN duplicate pages are waiting for a price sync.
- #7251 B08KFL2T8J is LIVE with no add-to-cart.
- The 71 GSC-pinned deals need re-verifying before 11-20.
- **Owner:** `www.richdeals.in` NXDOMAIN (since 09-19). The DO API token has not been rotated.
- **Unresolved:** chrome-devtools and reticle MCPs are CONNECT_TIMEOUT. Playwright covers the work.
