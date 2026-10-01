# Telegram deal monitor — 2026-10-01 12:05 IST

Sidebar read (1 evaluate, tab 0). New since 11:02: 3 single-product Amazon posts + 1 Coolz Baidyanath lot-code loot (skipped).

## Pushed (3) — `/admin/deals/bulk` count 3, all created:true

| ASIN | Deal | Price / MRP | Rating | Source |
|---|---|---|---|---|
| B09VGRNCJ7 | Tata Classic Instant Coffee 200g | ₹281 / ₹500 (44%) | 4.4 (1,742) | SB Loots (amazn.lt) |
| B0FZH9448V | Livon Keratin Shampoo 340ml | ₹123 / ₹299 (59%) | 4.2 (933) | Dealzone (link.amazon) |
| B0CW9VDNZY | Amazon Basics 13-pocket file folder | ₹275 / ₹799 (66%) | 4.3 (718) | ONLINE SHOPPING DEALS |

All verified on PDP (#centerCol price, In stock, add-to-cart present). Affiliate `?tag=ashoksachdev-21`. DB dedup by productId: 0 existing rows.

IndexNow: **HTTP 200 for 6 urls** (3 slugs + 3).

## CEO audit
- LIVE 11,754 · EXPIRED 389 · max id 12,231 · +245 deals/24h
- null price 0 · null image 0 · PENDING_REVIEW 0
- posts 353, coverless 0, seoless 0; IST/day: 09-28 2 · 09-29 4 · 09-30 4 · 10-01 2
- prod 7/7 200 (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals)
- broadcast cursor 12228 vs max 12231 — the 3 new rows; external cron picks them up next run (self-heals)
- unpushed commits 0
