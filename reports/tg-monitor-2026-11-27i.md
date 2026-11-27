# TELEGRAM-DEAL-MONITOR tick: 2026-11-27i

**Result:** 2 new deals are LIVE: #17568 (Amazon) and #17569 (Nykaa, through Cuelinks). The bulk push returned HTTP 201 with count 2, and both rows came back `created:true`. One duplicate repost (Park Avenue Harmony EDP, #10340) had a stale price and was synced from its PDP. IndexNow returned HTTP 200 for 6 URLs. All prod endpoints, both new pages and the synced page returned 200.

## Sidebar read

One `browser_evaluate` call in the Playwright richDeals profile read the newest post from each rendered source group. Personal chats and bots were skipped. Playwright was healthy, so the curl `t.me/s/` fallback was not needed.

| Group | Newest post | Outcome |
|---|---|---|
| Dealzone | Prestige 1.5L kettle ₹699, `link.amazon/B0ccW3woK` → B07VNFP3C2 | **Pushed** (source tag `glitzdeal05-21` stripped) |
| Dealdost | Nykaa MARS Double Trouble Mascara ₹270, `bitli.in/n2U8GwF` → nykaa.com `/p/6955038` | **Pushed** (non-Amazon, Cuelinks) |
| SB Loots And Deals | Park Avenue Harmony EDP 100ml @264, `amazn.lt/wBy0fezo` → B07845CN2K | Duplicate of LIVE #10340. The price had moved, so the row was **synced** (see below) |
| CoolzTricks | Loot perfume ₹99 with a coupon, 2 links | Skipped: loot, multi-product |
| Rogerkart Deals | "Loot 29" | Skipped: loot post |
| Hidden Loot | Swiggy coupon | Skipped: not a product |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt | Skipped: rejected earlier (size-variant price) |
| IndiaFreeStuff Tips & Tricks | Instamart item | Skipped: quick commerce |
| OMG LOOTDEALS | Credit card referral | Skipped: junk |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags | Skipped: sale hub |
| Loot Deals 24x7, Deal Dibba | Not rendered | Low activity, so the virtualized sidebar did not render them |

## Pushed

| # | Deal | Store | ID | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|---|
| 17568 | Prestige 1.5 Litre electric kettle, red | Amazon | B07VNFP3C2 | ₹699 | ₹1,445 | 52% | Logged-in PDP, `#corePriceDisplay .a-price-whole`; in stock; add-to-cart present |
| 17569 | MARS Double Trouble Mascara, 14 ml | Nykaa | 6955038 | ₹270 | ₹329 | 18% | Nykaa page in a Playwright tab (curl got 403). ld+json `offers.price` 270 INR, InStock; "Add to bag" present |

- **Affiliate:** Amazon uses `?tag=ashoksachdev-21` on `/dp/ASIN`. Nykaa is wrapped in Cuelinks (`cid=527`), per the ALL STORES rule. The bulk API attached it to the existing store "Nykaa Beauty".
- **Images:** `m.media-amazon.com` for Amazon; the Nykaa CDN `images-static.nykaa.com` for Nykaa.
- **Copy:** titles and descriptions are rewritten and answer-first, and each description gives the date the price was checked. How-to step 2 reads "Check the price shows ₹X", since both items are single-variant. The ₹ guard passed on both.
  - The kettle copy gives no wattage, because the PDP contradicts itself: the title says 1500 W and the bullets say 1350 W.
  - The source post's Nykaa sitewide code (PINKFRIDAY800, minimum ₹5,000) was left out, because it is cart-wide rather than part of this product's price.

## Price sync (duplicate LIVE row, re-read on PDP)

| Row | Product | Before | After (PDP) | Off |
|---|---|---|---|---|
| #10340 | Park Avenue Harmony EDP men, 100 ml (B07845CN2K) | ₹263 / M.R.P. ₹799 | ₹264 / M.R.P. ₹749 | 67% → 65% |

- The title and description were rewritten with the new ₹ figures and %, and the description now gives the date the price was checked. The ₹ guard passed. The slug is unchanged.

## Freshness

- **IndexNow:** HTTP 200 for 6 URLs (2 new slugs, 1 synced slug, `/`, `/offers` and `/sitemap.xml`).
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, both new deal pages and the synced page all returned 200.
- **Sitemap:** the deals child is the top-100 pinned set, so the new deals are noindex by design and stay out of it.
- **llms.txt:** generated on each request, so the new deals show up there without any extra step.
- **Seen list:** `tg-multi-seen.json` now holds 5,870 entries (+B07VNFP3C2, +B07845CN2K, +`nykaa:6955038`).
- **Audit after the push:** 0 LIVE deals with a null price, 0 with a null image, 0 PENDING_REVIEW. Newest deal is #17569.
