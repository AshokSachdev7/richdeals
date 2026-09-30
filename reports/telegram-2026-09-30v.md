# Telegram tick 2026-09-30v

Sidebar scan of the groups in `data/tg-groups.json`, one `browser_evaluate` pass.

## Pushed: 2 (bulk count 2, both created)

| Slug | Price | MRP | Off | Rating |
|---|---|---|---|---|
| warmfinity-reusable-kitchen-towel-roll-pack-of-2-b0ccg5lldy | ₹159 | ₹999 | 84% | 3.9 (56) |
| boxjoy-metal-bathroom-shelf-organiser-hooks-set-of-2-b0h94jf1fn | ₹869 | ₹1,190 | 27% | 4.6 (44) |

The BOXJOY channel post said ₹499. That price only applies after the ₹370 clip-on coupon. The deal is pushed at the real PDP price, and the coupon is mentioned in the description.

**IndexNow:** HTTP 200 for 5 URLs (2 slugs + 3).

## Skipped

- **Spacewood Ken wardrobe (B0DWX6XK1F, Rogerkart):** the PDP shows no price and no add-to-cart, so it is unavailable.
- **Milton, Draliet:** multi-product posts.
- **Nat Habit:** no link.
- **ConfirmTkt, Supercoins:** not products.
- **Handbag, Syska power bank, Kinsco purifier:** already seen or pushed.

The seen list now has 2,436 entries.

## CEO audit

- **Prod:** all 7 endpoints return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`).
- **DB:** 11,695 LIVE, 387 EXPIRED, max id 12,170. 0 null price, 0 null image, 0 pending.
- **Posts (IST):** 09-30: 4, 09-29: 4, 09-28: 4. 0 without a cover, 0 without SEO fields.
- **Broadcast cursor:** 12,168, which is 2 behind the DB max. That gap is this tick's push; the external cron will pick it up.
- **Unpushed commits:** 0.
- **Rot:** none.
