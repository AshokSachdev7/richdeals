# TELEGRAM-DEAL-MONITOR tick — 2026-09-25y (08:05 IST)

**2 pushed LIVE** (`/admin/deals/bulk` returned count 2, both created). **IndexNow: HTTP 200, 5 urls.**

## Funnel
- **Sidebar:** one `browser_evaluate` over all 13 groups. Only ONLINE SHOPPING DEALS had a new post; the other 12 were unchanged since 0925v.
- **ONLINE SHOPPING DEALS:** the chat had 2 unseen `link.amazon` deals, plus a "Sneakers @ ₹18" join-channel ad that was skipped. Both deals were resolved and verified in the logged-in Amazon tab (`#corePrice`, `#centerCol` M.R.P., `#availability`, no coupon). Neither was in the seen file or the DB.

| ASIN | Product | Price | MRP | Off | Slug |
|---|---|---|---|---|---|
| B07P5TXZ9V | Solimo stainless steel steamer, 4L, induction base | ₹599 | ₹1,100 | 46% | `solimo-stainless-steel-steamer-with-glass-lid-4l-induction-base-b07p5txz9v` |
| B07XLSP6Y6 | PrettyKrafts 3-shelf hanging wardrobe organiser, grey | ₹85 | ₹799 | 89% | `prettykrafts-3-shelf-hanging-wardrobe-organiser-with-engineered-wood-base-grey-b07xlsp6y6` |

- **Affiliate:** `amazon.in/dp/ASIN?tag=ashoksachdev-21`. Images are `m.media-amazon.com` `_SL` hi-res.
- **Script:** `apps/api/scripts/push-tg-0925y.mjs`. Pre-flight gates passed (title matches price, image host, description ≥900 chars, 4 howTo steps).
- **Seen file:** 1956 → 1960 entries (2 ASINs + 2 shortlinks).

## Freshness
- **IndexNow:** HTTP 200 for 5 urls (2 slugs + 3 auto-added paths).
- **Sitemap:** ISR, picks up the 2 new deals within 30 min.
- **llms.txt:** dynamic, already includes them. No new routes were added.

## CEO audit (checked against the DB and prod)
- **Deals:** 10785 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image. Max deal id is 11132.
- **Posts:** 329 in total, 0 coverless, 0 seoless.
- **Posts per day (IST), 09-17 → 09-25:** 3, 3, 3, 2, 1, 3, 2, 3, **2 so far**. No day at 0.
- **Broadcast cursor:** 11130, 2 behind max id 11132. The gap is the 2 deals pushed this tick; the external broadcast cron will catch up. Not rot.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200 (slowest: `/blog`, 0.73 s).
- **Git:** 0 unpushed commits before this tick.

Verdict: green, 2 shipped.
