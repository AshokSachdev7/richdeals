# TELEGRAM-DEAL-MONITOR tick: 2026-11-27f

**Result:** 1 new Amazon deal is LIVE (#17521). The bulk push returned HTTP 201 with count 1 and `created:true`. IndexNow returned HTTP 200 for 4 URLs. One duplicate repost (Havells, #17417) was re-read on its PDP; its price was already correct. All prod endpoints and the new deal page returned 200.

## Sidebar read

One `browser_evaluate` call in the Playwright richDeals profile read the newest post from each rendered source group. Personal chats and bots were skipped. Playwright was healthy, so the curl `t.me/s/` fallback was not needed.

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | boAt Rockerz 650 Pro, ₹2,549, `amazn.lt/vSsEGfEL` → B0DV5J28LW | **Pushed** (source tag `bhavesh015-21` stripped) |
| Dealzone | "Havells 750 Watt" mixer grinder, ₹1,790, `link.amazon` → B0DZX4LWW5 | Duplicate of LIVE #17417. PDP shows ₹1,790 (M.R.P. ₹3,895), the same as the DB, so no sync. The product is the Pulse **500 W**; the channel's "750 Watt" was wrong, and our title is correct |
| Dealdost | Stuffcool power banks, 3 `amzn.to` links | Skipped: multi-product |
| CoolzTricks | Philips speakers, up to 40% off, several links | Skipped: multi-product |
| Rogerkart Deals | Disney Princess doll on AJIO, ₹450 | Skipped: already seen |
| Hidden Loot | Swiggy Black Friday coupon BIGBASH | Skipped: not a product |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt, ₹338 | Skipped: rejected in 11-27d (size-variant price) |
| IndiaFreeStuff Tips & Tricks | Instamart item | Skipped: quick commerce, depends on location |
| OMG LOOTDEALS | Credit card referral | Skipped: junk |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags, `fkrt.it` | Skipped: sale hub |
| Loot Deals 24x7, Deal Dibba | Not rendered | Low activity, so the virtualized sidebar did not render them |

## Pushed

| # | Deal | ASIN | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|
| 17521 | boAt Rockerz 650 Pro wireless headphones, Dolby Audio, 80H battery | B0DV5J28LW | ₹2,549 | ₹8,990 | 72% | Logged-in PDP read of `#corePriceDisplay .a-price-whole`; in stock; add-to-cart present |

- **Affiliate:** `?tag=ashoksachdev-21` on `/dp/ASIN`.
- **Image:** `m.media-amazon.com`, taken from `#landingImage` `data-old-hires`.
- **Copy:** the title and description are rewritten and answer-first. The ₹ guard passed.
- Both ASINs were added to `tg-multi-seen.json`, which now holds 5,865 entries.

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs (the new slug, `/`, `/offers` and `/sitemap.xml`).
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and the new deal page all returned 200.
- **Sitemap:** the deals child holds only the top-100 pinned set, so the new deal is noindex by design and is not in it.
- **llms.txt:** generated on each request, so the new deal shows up there without any extra step.
