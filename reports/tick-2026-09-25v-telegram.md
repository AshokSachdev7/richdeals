# TELEGRAM-DEAL-MONITOR tick — 2026-09-25v (07:04 IST)

**0 pushed.** All 13 groups show the same newest post as at 0925r, so nothing was sent to `/admin/deals/bulk`.

## Funnel
- **Sidebar:** one `browser_evaluate` over all 13 groups.
- **Seen file:** the resolved ids are present — `B0CR1MK3T9` (Homeor), `VSLHQSFPARJYYNKK` (Nutriburst), `B07438SX12`. The seen file stores resolved ids, not shortlinks.
- **Handled in earlier ticks:**
  - Xiaomi 17 skipped: the price is post-coupon and can't be read.
  - Lavie handbag: duplicate of DB id 7110.
  - Syska power bank: duplicate.
  - Refrigerator bank offer: category page.
  - CADLEC fan: already seen.
- **Not deals:** SB Loots settings message, Deal Dibba join-channel ad, Hidden Loot `fkrt.cc` teaser, IFS Tips Instamart post.
- **Seen file:** 1956 entries, unchanged.

## Freshness
- **IndexNow:** not run, because no slugs were pushed.
- **Sitemap and llms.txt:** unchanged.

## CEO audit (checked against the DB and prod)
- **Deals:** 10783 LIVE, 0 PENDING_REVIEW, 0 with null price or null image. Max deal id 11130.
- **Posts:** 329 in total, 0 coverless, 0 seoless.
- **Posts per day (IST), 09-17 → 09-25:** 3, 3, 3, 2, 1, 3, 2, 3, **2 so far**. No day at 0, and today has met the minimum of 2.
- **Broadcast cursor:** 11130, equal to the max id.
- **Prod endpoints:** `/`, `/offers`, `/blog` (0.79 s), `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this report.

Verdict: green. The tick yielded nothing, which is normal for Telegram in the early morning.
