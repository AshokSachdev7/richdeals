# TELEGRAM-DEAL-MONITOR tick — 2026-09-25e (01:03 IST)

**3 pushed LIVE** (2 new + 1 existing row refreshed).
- `/admin/deals/bulk` returned **count 3**.
- LIVE deals went from 10746 to 10748, and the max deal id is now 11095.
- IndexNow returned **HTTP 200** for 6 URLs (3 deal slugs plus 3 hub URLs).

## Funnel
- **Sidebar:** 1 `browser_evaluate` over all 13 groups returned 8 deal-shaped posts.
- **Shortlinks resolved:**
  - `amzn.to` and `link.amazon` go to Amazon.
  - `fkrt.it` and `fkrt.co` go to Flipkart.
  - rogerkart `/r/` pages are Amazon links hidden behind JS. The ASIN was grepped out of the page HTML.

| Post (group) | Resolved | Result |
|---|---|---|
| Homeor 3-layer trolley organizer (Rogerkart) | Amazon B0CR1MK3T9 | **LIVE** ₹1,161 / ₹5,999, In stock. The row already existed (`created:false`), so price and copy were refreshed. |
| "Looot" (iPhone rates) | Amazon B07438SX12, Eveready 9W LED | **LIVE** ₹85 / ₹300, In stock |
| Nutriburst marine collagen (Dealdost) | Flipkart VSLHQSFPARJYYNKK | **LIVE** ₹417 / ₹999, not sold out. Verified from the visible PDP price block; Flipkart served no ld+json for this product. |
| Xiaomi 17 12/512 @59,999 (CoolzTricks) | Amazon B0GMQWN8NR | Skip. The ₹59,999 needs a ₹10,000 coupon, and the price to pay can't be read (only the ₹1,19,999 MRP shows). |
| Ladies handbag (Indian Cheap Deals) | Amazon B0G38DGNKM | Duplicate (DB id 7110, Lavie) |
| Syska 10000 mAh power bank (Loot Deals 24x7) | Flipkart PWBGGD4THDQZYAY6 | Duplicate (already in the seen file) |
| Refrigerator bank offer (Dealzone), midnight loot (Hidden Loot) | — | Skip: category page or no product |
| CADLEC Breeza fan (Online Shopping Deals) | — | Skip: the sidebar preview is cut off before the link. Left for the next tick. |

**Affiliate links:** Amazon uses `?tag=ashoksachdev-21`; Flipkart uses `/p/itm…?pid=…&affid=djhackraj`. The source tags `rogerkart-21`, `collab-amafhh-21`, `khushalsing07-21` and `hyflip`/`adminpais` were stripped.

**Content and images:** all copy is original: 3 paragraphs of at least 900 characters and a 4-step how-to per deal. Images come from `m.media-amazon.com` `_SL1500_` and `rukminim2.flixcart.com`.

**Script:** `apps/api/scripts/push-tg-0925e.mjs`. The seen file now holds 1954 entries (5 added).

## Freshness
- **IndexNow:** HTTP 200.
- **Prod:** the new Nutriburst page returns 200.
- **Sitemap:** served under ISR (1800 s).
- **llms.txt:** force-dynamic, so it is already current.

## CEO audit (checked against the DB and prod)
- **Deals:** 10748 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image.
- **Posts:** 328 in total, 0 coverless, 0 seoless.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3, 09-25=1 so far (it is 01:03 IST). No finished day at 0.
- **Broadcast cursor:** 11093, against a max deal id of 11095. The external cron is catching up, as expected.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
