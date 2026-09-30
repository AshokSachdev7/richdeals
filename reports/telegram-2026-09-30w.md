# Telegram tick 2026-09-30w

Sidebar scan of the groups in `data/tg-groups.json`, one `browser_evaluate` pass.

## Pushed: 1 (bulk count 1, created)

| Slug | Price | MRP | Off | Rating |
|---|---|---|---|---|
| biotique-honey-gel-foaming-face-wash-200ml-b07qf7m56y | ₹156 | ₹415 | 62% | 4.2 (32,804) |

Source: SB Loots (`amazn.lt/CoAxEa8U`).

**IndexNow:** HTTP 200 for 4 URLs (1 slug + 3).

## Skipped

- **Dealzone "Loot 1470" (`link.amazon/B0fx2uEcX`):** resolves to the Nilkamal Mystique chair set, B07LDD79F6. The PDP shows no price and no add-to-cart, so the loot has ended.
- **CoolzTricks facial kits:** category post.
- **Dealdost Draliet:** multi-product post.
- **Rogerkart Spacewood wardrobe:** unavailable, already handled at 0930v.
- **Kinsco purifier, handbag, Syska power bank:** already seen.
- **Everything else:** non-deal chats.

The seen list now has 2,441 entries.

## CEO audit

- **Prod:** all 7 endpoints return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`).
- **DB:** 11,696 LIVE, 387 EXPIRED, max id 12,171. 0 null price, 0 null image, 0 pending.
- **Posts (IST):** 09-30: 4, 09-29: 4, 09-28: 4. 0 without a cover, 0 without SEO fields.
- **Broadcast cursor:** 12,170, which is 1 behind the DB max. That gap is this tick's push; the external cron will pick it up.
- **Unpushed commits:** 0.
- **Rot:** none.
