# TELEGRAM-DEAL-MONITOR tick: 2026-11-27j

**Result:** 2 new deals are LIVE: #17572 (Amazon) and #17573 (Nykaa, through Cuelinks). The bulk push returned HTTP 201 with count 2, and both rows came back `created:true`. IndexNow returned HTTP 200 for 5 URLs. All prod endpoints and both new pages returned 200.

## Sidebar read

One `browser_evaluate` call in the Playwright richDeals profile read the newest post from each rendered source group. Personal chats and bots were skipped. Playwright was healthy, so the curl `t.me/s/` fallback was not needed.

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | TVS Racing Anti Matter helmet, `amazn.lt/X26eNRdw` → B0F1MNKFZ9 | **Pushed** (source tag `bhavesh015-21` stripped) |
| Dealdost | Insight Cosmetics Pro Concealer Palette ₹217, `bitli.in/m7TPtrR` → nykaa.com `/p/728630` | **Pushed** (non-Amazon, Cuelinks) |
| Dealzone | Red Chief shoes, `link.amazon/B0aPvJthM` → `/s?k=Red+Chief` | Skipped: search/sale hub |
| CoolzTricks | Same Red Chief post | Skipped: sale hub |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt | Skipped: rejected earlier (size-variant price) |
| Rogerkart Deals | "Loot 29" | Skipped: loot post |
| Hidden Loot | Swiggy coupon | Skipped: not a product |
| IndiaFreeStuff Tips & Tricks | Instamart item | Skipped: quick commerce |
| OMG LOOTDEALS | Credit card referral | Skipped: junk |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags (`fkrt.it`) | Skipped: sale hub |
| Loot Deals 24x7, Deal Dibba | Not rendered | Low activity, so the virtualized sidebar did not render them |

## Pushed

| # | Deal | Store | ID | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|---|
| 17572 | TVS Racing Anti Matter full-face helmet (Blue, M) | Amazon | B0F1MNKFZ9 | ₹1,994 | ₹2,399 | 17% | Logged-in PDP with `?th=1&psc=1` (the parent page has no size selected and reads a null price), `#corePriceDisplay .a-price-whole`; in stock; add-to-cart present; no coupon |
| 17573 | Insight Cosmetics Pro Concealer Palette, Corrector, 15 g | Nykaa | 728630 | ₹217 | ₹255 | 15% | Nykaa page in a Playwright tab. ld+json `offers.price` 217 INR, InStock; "Add to Bag" present; M.R.P. read from the price block under the product name |

- **Affiliate:** Amazon uses `?tag=ashoksachdev-21` on `/dp/ASIN`. Nykaa is wrapped in Cuelinks (`cid=527`), per the ALL STORES rule. The bulk API attached it to the existing store "Nykaa Beauty".
- **Images:** `m.media-amazon.com` for Amazon; the Nykaa CDN `images-static.nykaa.com` for Nykaa.
- **Copy:** titles and descriptions are rewritten and answer-first, and each description gives the date the price was checked. The helmet is a variant item, so its how-to step 2 reads "Pick your size or colour" and its description says other sizes can cost more. The concealer is single-variant, so its step 2 reads "Check the price shows ₹217". The ₹ guard passed on both.
  - The helmet PDP's bank offer (up to ₹1,750) was left out, because it depends on the card used.
  - The source post's Nykaa sitewide code (PINKFRIDAY800, minimum ₹5,000) was left out, because it is cart-wide rather than part of this product's price.

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs (2 new slugs, `/`, `/offers` and `/sitemap.xml`).
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and both new deal pages all returned 200.
- **Sitemap:** the deals child is the top-100 pinned set, so the new deals are noindex by design and stay out of it.
- **llms.txt:** generated on each request, so the new deals show up there without any extra step.
- **Seen list:** `tg-multi-seen.json` now holds 5,872 entries (+B0F1MNKFZ9, +`nykaa:728630`).
- **Audit after the push:** 0 LIVE deals with a null price, 0 with a null image, 0 PENDING_REVIEW. Newest deal is #17573. Posts on 11-27 (IST): 2. Unpushed commits before this one: 0.
