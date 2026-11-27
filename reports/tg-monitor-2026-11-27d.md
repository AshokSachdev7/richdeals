# TELEGRAM-DEAL-MONITOR tick: 2026-11-27d

**Result:** 1 new Amazon deal is LIVE (#17486). The bulk push returned HTTP 201 with count 1 and `created:true`. IndexNow returned HTTP 200 for 4 URLs. The new deal page returns 200 on prod.

## Sidebar read

One `browser_evaluate` call in the Playwright richDeals profile read the newest post from each of the 13 source groups. Personal chats and bots were skipped.

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | pTron Bassbuds Astra, `amazn.lt` → B0D78Y3KRP | **Pushed** |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt, `link.amazon` → B0F9YZBG7T | Rejected: channel ₹338, PDP ₹509 (size-variant price). Already in the seen list, not in the DB |
| INDIAN CHEAP DEALS | LG washing machine sale → `/clp/` | Skipped: category page |
| Rogerkart Deals | Disney doll on AJIO, 4936631230 | Skipped: already seen |
| Dealzone, CoolzTricks | Libas clothing, 80-87% off, 4 links | Skipped: multi-product loot |
| NonStopDeals | Caprese handbags sale, `fkrt.it` | Skipped: sale hub |
| Dealdost | Palmonas, B1G1 code | Skipped: coupon/sale |
| Hidden Loot | Swiggy coupon | Skipped: not a product |
| IndiaFreeStuff Tips | Instamart item | Skipped: quick commerce, depends on location |
| OMG LOOTDEALS | Credit card referral | Skipped: junk |

## Pushed

| # | Deal | ASIN | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|
| 17486 | pTron Bassbuds Astra TWS Earbuds, 50H Playtime | B0D78Y3KRP | ₹599 | ₹2,899 | 79% | Logged-in PDP read `#corePriceDisplay .a-price-whole`, in stock, add-to-cart present |

- **Affiliate:** `?tag=ashoksachdev-21` on `/dp/ASIN`. The source tag `bhavesh015-21` was stripped.
- **Image:** `m.media-amazon.com`, from `#landingImage` `data-old-hires`.
- **Copy:** title and description are rewritten and answer-first. The ₹ guard passed.

## Freshness

- **IndexNow:** HTTP 200 for 4 URLs (the new slug, `/`, `/offers` and `/sitemap.xml`).
- **Sitemap:** the deals child is the top-100 pinned set, so the new deal is noindex by design and stays out of it.
- **llms.txt:** dynamic, so the new deal appears there automatically.
