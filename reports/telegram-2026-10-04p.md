# TELEGRAM-DEAL-MONITOR — 2026-10-04p (10:58 IST)

**0 pushed.** Since tick o there are 4 new source posts. None of them is a pushable single-product deal. Nothing went to the bulk endpoint, so there was no IndexNow ping.

## New posts in the sidebar

| Group | Post | Decision |
|---|---|---|
| SB Loots 10:57 | Parachute Advansed shampoo 1.2L @297, [Apply 46% coupon] | Reject: FMCG, and the price only applies after the coupon |
| CoolzTricks 10:13 | Same Parachute shampoo post | Reject: same reasons |
| Dealzone 10:28 | "Apply 40% off coupon on lunch box" | Reject: `link.amazon` resolves to a `/s?hidden-keywords=` search across 5 ASINs, so it is multi-product. The post also gives no price. |
| ONLINE SHOPPING DEALS 09:12 | Puma Wish @1289 | Already pushed in tick o (B0BN6WV1PN, ₹1,289). The link is already in the seen list. |

RichDeals 10:49 is our own channel (the Nayasa broadcast), so it is not a source. All other groups are unchanged since tick m/o.

I added 3 links to `tg-multi-seen.json`, which now holds 2,673 entries.

## CEO audit

- live 12,037, pending 0, null price 0, null image 0
- DB max 12516 = broadcast cursor 12516. The DesiDime 1004h deal has been broadcast.
- posts 364, coverless 0, 2 posts so far today (IST). The blog cron covers the rest of the day.
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200
- 0 unpushed commits

Clean.
