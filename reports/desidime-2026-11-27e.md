# DESIDIME-INGEST tick: 2026-11-27e

**Result:** 2 new Amazon deals are LIVE (#17570, #17571). The bulk push returned HTTP 201 with count 2, and both rows came back `created:true`. One duplicate LIVE row (Samsung 25W adapter, #4923) had a stale price and was synced from its PDP. IndexNow returned HTTP 200 for 6 URLs. All prod endpoints, both new deal pages and the synced page returned 200.

## Stage 1

- `ingest-desidime.mjs` read cards only, from `/new` plus the homepage, with no per-deal fetches. 33 cards.
- JUNK/GROCERY filters killed 15. Examples: the Jio Play Store app, Amazon winter games `/ax/claim`, a Flipkart kids-footwear category page, the Myprotein homepage and cred.club.
- 13 resolved via `visit.desidime.com` to a single product. Of those: 3 were already in the DB (by productId, including the null-pid legacy check), 3 were rejected in the last 24 h (Kindle B01CSKD9AW, Motorola APFHN6YQKSHXJAYR, Kenstar B0HGF7VFK6), and 7 were fresh.

## Cards (7 fresh)

| Outcome | Count | Detail |
|---|---|---|
| **Pushed** | **2** | Below |
| Price drift (card vs PDP or ld+json, more than ₹1) | 3 | Xiaomi 65" Flipkart TVSHQZZNWBZKFGG7 (dropped by the script); Just Herbs Water Baby tint B0DQC79YDF; Xiaomi 43" Smartchoice X B0F6ZLFNVT |
| Junk / no ld+json | 2 | Bellavita at ₹1 (magicpin promo); Digihaat King chilli pickle at ₹19 (grocery) |

## Pushed

| # | Deal | ASIN | Price | M.R.P. | Off | How verified |
|---|---|---|---|---|---|---|
| 17570 | Pintola high-protein dark chocolate oats, 1 kg | B0CWH4NT7V | ₹478 | ₹620 | 23% | PDP |
| 17571 | RENEE Stay With Me matte liquid lipstick, Desire for Brown, 5 ml | B09NP64F6Y | ₹209 | ₹599 | 65% | PDP |

- **PDP** means a read in the logged-in Playwright tab: price from `#corePriceDisplay_desktop_feature_div .a-price-whole`, M.R.P. from the `#centerCol` regex, stock from `#availability` plus an add-to-cart button. Both rows were in stock.
- **Affiliate:** `?tag=ashoksachdev-21` on `/dp/ASIN`, with the source tag `desidime01-21` stripped.
- **Images:** `m.media-amazon.com`, from `#landingImage` `data-old-hires`. The RENEE card carried the wrong DesiDime image (a Samsung Wallet banner), so the PDP image was used instead.
- **Copy:** rewritten and answer-first, dated "checked on Amazon.in on 27 November 2026". Both items are single-variant, so how-to step 2 reads "Check the price shows ₹X". The Pintola card had no M.R.P., so the PDP value (₹620) was used. The ₹ guard passed before the POST.

## Price sync (duplicate LIVE rows)

| Row | Product | Before | After | Off |
|---|---|---|---|---|
| #4923 | Samsung Original 25W USB-C travel adaptor (B0D2R2MXXJ) | ₹622 / M.R.P. ₹1,699 | ₹419 / M.R.P. ₹1,699 (PDP) | 63% → 75% |
| #12224 | Toshiba V37SP 50" QLED (Flipkart TVSHZTYRVBSWQJS5) | ₹29,990 | ₹29,990, unchanged (ld+json in a Playwright tab, InStock) | 40% |

- **#4923:** the title, description and how-to were rewritten with the new figures and a dated check. The old copy said "Verified in stock today" with no date, and its how-to was empty. The ₹ guard passed and the slug is unchanged.
- **#12224:** the DesiDime card shows ₹24,990, which is the price after a bank offer. The list price is still ₹29,990, so no write was made.
- **Boldfit pump B0G43WXXRC:** a duplicate that was re-read last tick at ₹299, unchanged, so it was not re-read this tick.

## Rejects

| ID | Reason |
|---|---|
| B0DQC79YDF | Drift: card ₹153, PDP ₹160. A coupon badge is on the PDP, so the card shows the post-coupon price |
| B0F6ZLFNVT | Drift: card ₹21,749, PDP ₹24,999, likely a bank-offer price |
| TVSHQZZNWBZKFGG7 | Drift: Flipkart ld+json does not match the card's ₹37,499 |
| 880186bd78b2, e47d1c39cec4 | No ld+json; junk/grocery |

The two Amazon rejects were added to `data/dd-rejected.json` (2,353 keys).

## Freshness

- **IndexNow:** HTTP 200 for 6 URLs (2 new slugs, 1 synced slug, `/`, `/offers` and `/sitemap.xml`).
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, both new deal pages and the synced Samsung page all returned 200.
- **Sitemap:** the deals child is the top-100 pinned set, so the new deals are noindex by design and stay out of it.
- **llms.txt:** generated on each request, so the new deals and the synced price show up there without any extra step.
- **Audit after the push:** 0 LIVE deals with a null price, 0 with a null image, 0 PENDING_REVIEW. Newest deal is #17571.
