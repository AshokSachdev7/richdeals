# TELEGRAM-DEAL-MONITOR tick: 2026-11-27e

**Result:** 0 new deals. No candidate qualified: every newest post was loot, a sale hub, a coupon or already seen. Nothing was pushed, so there was no IndexNow ping. All prod endpoints returned 200.

## Sidebar read

One `browser_evaluate` call in the Playwright richDeals profile read the newest post from each rendered source group. Personal chats and bots were skipped. Playwright was healthy, so the curl `t.me/s/` fallback was not needed.

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | YOHO footwear, up to 91% off, `amazn.lt/wyx7pjd2` | Skipped: resolves to `amazon.in/s?k=YOHO…` (search page, source tag `bhavesh015-21`) |
| CoolzTricks | Myntra GAP clothing, 70-72% off, 4 `myntr.in` links | Skipped: multi-product loot |
| Dealzone | Libas, 80-87% off, 4 `link.amazon` links | Skipped: multi-product loot (same post as 11-27d) |
| Dealdost | Palmonas Black Friday, B1G1 code | Skipped: coupon/sale |
| Rogerkart Deals | Disney Princess doll on AJIO, ₹450 | Skipped: already seen |
| Hidden Loot | Swiggy Black Friday coupon BIGBASH | Skipped: not a product |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt, ₹338 | Skipped: rejected in 11-27d (PDP ₹509, size-variant price) |
| IndiaFreeStuff Tips & Tricks | Instamart item | Skipped: quick commerce, depends on location |
| OMG LOOTDEALS | Credit card referral | Skipped: junk |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags, `fkrt.it` | Skipped: sale hub |
| Loot Deals 24x7, Deal Dibba | Not rendered | Low activity, so the virtualized sidebar did not render them |

## Pushed

None.

## Freshness

- **IndexNow:** not pinged, because there were no new slugs.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all returned 200.
