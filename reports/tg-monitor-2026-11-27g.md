# TELEGRAM-DEAL-MONITOR tick: 2026-11-27g

**Result:** 1 new Amazon deal is LIVE (#17554). The bulk push returned HTTP 201 with count 1 and `created:true`. IndexNow returned HTTP 200 for 4 URLs. One duplicate repost (Benetton bottle set, #17304) was re-read on its PDP; its price was already correct. All prod endpoints and the new deal page returned 200.

## Sidebar read

One `browser_evaluate` call in the Playwright richDeals profile read the newest post from each rendered source group. Personal chats and bots were skipped. Playwright was healthy, so the curl `t.me/s/` fallback was not needed.

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | Salt. Oral Care Blanco whitening toothpaste, ₹179, `amazn.lt/SEts9MtU` → B0DSJB2VJR | **Pushed** (source tag `bhavesh015-21` stripped) |
| Dealzone | "399", `link.amazon` → B0G4N8ZPZX (United Colors of Benetton 3-in-1 bottle set) | Duplicate of LIVE #17304. PDP shows ₹399 (M.R.P. ₹1,899), the same as the DB, so no sync |
| Rogerkart Deals | "Loot 29", `rogerkart.com/r/` | Skipped: loot post, no product |
| Dealdost | Nykaa Kiehl's buy-1-get-1 | Skipped: brand-wide offer |
| CoolzTricks | AJIO Jack & Jones | Skipped: multi-product |
| Hidden Loot | Swiggy BIGBASH coupon | Skipped: not a product |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt | Skipped: rejected in 11-27d (size-variant price) |
| IndiaFreeStuff Tips & Tricks | Instamart item | Skipped: quick commerce, depends on location |
| OMG LOOTDEALS | Credit card referral | Skipped: junk |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags | Skipped: sale hub |
| Loot Deals 24x7, Deal Dibba | Not rendered | Low activity, so the virtualized sidebar did not render them |

## Pushed

| # | Deal | ASIN | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|
| 17554 | Salt. Oral Care Blanco whitening toothpaste, 100g | B0DSJB2VJR | ₹179 | ₹345 | 48% | Logged-in PDP read of `#corePriceDisplay .a-price-whole`; in stock; add-to-cart present; no coupon badge |

- **Affiliate:** `?tag=ashoksachdev-21` on `/dp/ASIN`.
- **Image:** `m.media-amazon.com`, taken from `#landingImage` `data-old-hires`.
- **Copy:** the title and description are rewritten and answer-first. The ₹ guard passed.
- Both ASINs were added to `tg-multi-seen.json`, which now holds 5,867 entries.

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs (the new slug, `/`, `/offers` and `/sitemap.xml`).
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and the new deal page all returned 200.
- **Sitemap:** the deals child holds only the top-100 pinned set, so the new deal is noindex by design and is not in it.
- **llms.txt:** generated on each request, so the new deal shows up there without any extra step.
- **Audit after the push:** 0 LIVE deals with a null price or null image, 0 PENDING_REVIEW. Newest deal is #17554.
