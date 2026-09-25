# TELEGRAM-DEAL-MONITOR tick — 2026-09-25ab (09:05 IST)

**1 pushed LIVE.** `/admin/deals/bulk` returned HTTP 201, count 1, `created:true`. **IndexNow: HTTP 200 for 4 URLs.**

## Funnel
- **Sidebar:** one `browser_evaluate` over all 13 groups. 3 posts looked new.
- **Resolved and checked for duplicates:**

| Group | Link | ASIN | Result |
|---|---|---|---|
| Dealdost | amzn.to/4wm0oeC (Onida 50" QLED) | B0FJ8GYB2L | Already in DB (id 1522, LIVE) |
| ONLINE SHOPPING DEALS | link.amazon/B0jbMZzTl (Elevate study table) | B0HC469Y9L | Already in DB (id 11114, LIVE) |
| CoolzTricks | amzn.to/4z1svBw (Maybelline Matte Ink) | B0FL411HHN | **New, pushed** |

- **Other groups:** nothing new since 0925y:
  - Rogerkart, 𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘, Indian Cheap Deals and Loot Deals 24x7 were duplicates.
  - Dealzone was a category page.
  - SB Loots, Deal Dibba, Hidden Loot and IFS Tips posted no deals.
  - RichDeals is our own channel.

## Pushed
| ASIN | Product | Price | MRP | Off | Slug |
|---|---|---|---|---|---|
| B0FL411HHN | Maybelline Superstay Matte Ink liquid lipstick, shade Warrior | ₹259 | ₹749 | 65% | `maybelline-new-york-superstay-matte-ink-liquid-lipstick-warrior-b0fl411hhn` |

- **Verified in the logged-in Amazon tab:**
  - price from `#corePrice`: ₹259
  - M.R.P. from `#centerCol`: ₹749
  - no coupon
  - stock: ships in 1-2 days
  - image: `m.media-amazon.com` `_SL1000_` hiRes
- **Affiliate link:** `amazon.in/dp/B0FL411HHN?tag=ashoksachdev-21`
- **Script:** `apps/api/scripts/push-tg-0925ab.mjs`. The pre-flight gate passed.
- **Seen file:** 1960 → 1966 entries: the 3 ASINs and 3 shortlinks, including the 2 DB duplicates so they are skipped next tick.

## Freshness
- **IndexNow:** HTTP 200 for 4 URLs (1 slug + 3 auto-added paths).
- **Sitemap:** ISR, refreshes within 30 min.
- **`llms.txt`:** dynamic. No new routes.

## CEO audit (checked against the DB and prod)
- **Deals:** 10825 LIVE, 0 PENDING_REVIEW, 0 with a null price or image. Max deal id is 11172.
- **Posts:** 329, 0 coverless, 0 seoless. Posts per day (IST), 09-17 → 09-25: 3, 3, 3, 2, 1, 3, 2, 3, 2 so far. No day at 0.
- **Broadcast cursor:** 11152 (file re-read) against a max id of 11172. The external cron is working through the IFS batch, so the gap closes on its own.
- **Prod endpoints:** all 7 return 200 (slowest: `/blog`, 0.52 s).
- **Unpushed commits:** 0 before this commit.

Verdict: green.
