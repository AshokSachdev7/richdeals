# TELEGRAM-DEAL-MONITOR tick: 2026-11-28 (00:46 IST)

**Result:** 0 pushed. The 3 new Amazon links in the sidebar all resolved to `/s?` search pages, which are not single products. Every other group was showing the same post as tick 11-27k, or a non-Amazon, food or sale-hub post.

## Sidebar read (one `browser_evaluate`, Playwright richDeals profile)

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | Parachute body lotion, up to 72% off (`amazn.lt/PleGkort`) | Skipped: resolves to `/s?k=Parachute` (brand search) |
| CoolzTricks | Same Parachute post (`amzn.to/49kJhk0`) | Skipped: the same `/s?` search |
| Dealzone | Arrow blazer, up to 60% off (`link.amazon/B0hv9Gwpk`) | Skipped: resolves to `/s?k=Arrow+blazer` (search, source tag `glitzdeal05-21`) |
| Rogerkart | Symbol clothing and Lakme beauty | Skipped: category pages via the rogerkart redirector |
| Dealdost | Mufti Black Friday | Skipped: sale hub (same as 27k) |
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt | Same post as 27k, already rejected |
| Hidden Loot | Swiggy BIGBASH | Skipped: food coupon |
| IFS Tips & Tricks | Instamart item | Skipped: quick-commerce grocery |
| OMG LOOTDEALS | Credit card referral | Skipped: not a deal |
| INDIAN CHEAP DEALS | LG washing machine sale | Same post as 27k, a sale hub |
| NonStopDeals | Caprese handbags (`fkrt.it`) | Same post as 27k, a sale hub |
| Loot Deals 24x7, Deal Dibba | Not rendered in the sidebar | No read |

## Freshness

- **IndexNow:** not run, because nothing was pushed.
- **Seen list:** unchanged. The search links were not added, so a later single-product repost of the same item can still be picked up.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all returned 200.
- **Audit:**
  - 0 LIVE deals with a null price and 0 with a null image.
  - 0 PENDING_REVIEW.
  - Newest deal is #17594.
  - 1 post on 11-28 (IST), from CONTENT-SEO at 00:44.
  - 0 unpushed commits before this one.
