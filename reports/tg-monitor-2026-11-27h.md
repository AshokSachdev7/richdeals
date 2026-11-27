# TELEGRAM-DEAL-MONITOR tick: 2026-11-27h

**Result:** 0 new deals. Every candidate was either already seen, a search page, or a multi-product post. Because nothing was pushed, there was no IndexNow ping. All prod endpoints returned 200.

## Sidebar read

One `browser_evaluate` call in the Playwright richDeals profile read the newest post from each rendered source group. Personal chats and bots were skipped. Playwright was healthy, so the curl `t.me/s/` fallback was not needed.

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | "Card Offer - ₹3,250 off with HDFC Credit Card", `amazn.lt/qXhmyQDr` → B0F6ZLFNVT | Skipped: already in `tg-multi-seen.json` and not in the DB, so it was rejected in an earlier tick. The post is also a bank-card offer with no deal price. |
| Dealzone | "Upto 70% Off On Signoraware Products", 2 `link.amazon` links | Skipped: brand sale, multi-product |
| CoolzTricks | "LOOT FAST : Apply Coupon", `amzn.to/3Vc4WaN` and `amzn.to/4ftz2xi` | Skipped: both resolve to `/s/?keywords=wardrobe+organizer…` search pages |
| Dealdost | BE Neude buy-1-get-1 | Skipped: brand-wide offer (unchanged) |
| Rogerkart Deals | "Loot 29" | Skipped: loot post (unchanged) |
| Hidden Loot | Swiggy BIGBASH | Skipped: not a product (unchanged) |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt | Skipped: rejected in 11-27d (unchanged) |
| IndiaFreeStuff Tips & Tricks | Instamart item | Skipped: quick commerce (unchanged) |
| OMG LOOTDEALS | Credit card referral | Skipped: junk (unchanged) |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub (unchanged) |
| NonStopDeals | Caprese handbags | Skipped: sale hub (unchanged) |
| Loot Deals 24x7, Deal Dibba | Not rendered | Low activity, so the virtualized sidebar did not render them |

## Freshness

- **IndexNow:** no ping was sent, because nothing was pushed.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all returned 200.
- **Audit:** 0 LIVE deals with a null price or null image, 0 PENDING_REVIEW. Newest deal is #17556 (Human Hydro kadai). Unpushed commits: 0 before this report.
