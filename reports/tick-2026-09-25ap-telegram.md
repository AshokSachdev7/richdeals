# TELEGRAM-DEAL-MONITOR tick: 2026-09-25ap (14:06 IST)

**1 new deal went live (id 11232, MacBook Neo Blush). IndexNow returned HTTP 200 for 4 URLs.**

## Scan
One sidebar read of the 13 groups in `data/tg-groups.json` found 3 new links. The rest were already in the seen list or were not single-product posts.

| Group | Link | Resolves to | Result |
|---|---|---|---|
| Dealzone | `link.amazon/B0h1X4WDp` | B0GR6HXPB9 Apple MacBook Neo 13″ A18 Pro 8GB/256GB, Blush | PDP ₹71,990 / M.R.P. ₹79,900, in stock, sold by Clicktech. **Pushed live at ₹71,990.** The channel's ₹67,990 needs an SBI card (up to ₹1,750 off), so it can't be reproduced. The SBI offer is noted in howTo |
| ONLINE SHOPPING DEALS | `link.amazon/B0g8s6I6w` | B0D6VPTZ52 Puma Flexfocus Lite shoe | Already live as id 10950 at the same ₹1,650. Skipped |
| SB Loots | `bittli.in/NZCnKO9y` | Shopsy AOLTURI lunch box `itm7e938d974fb39` | Rejected: the price depends on the user. It shows ₹144 for new users, ₹172 as the listing price and ₹176 as fsp, and the channel said ₹163 |

The other groups had nothing usable:
- CoolzTricks: text only.
- Dealdost: a stock post.
- Hidden Loot: a Swiggy CCD offer.
- Deal Dibba: a t.me link.
- IFS Tips: Instamart.
- Rogerkart, INDIAN CHEAP DEALS and Loot Deals 24x7: already in the seen list.

## Push
- Script: `apps/api/scripts/push-tg-0925ap.mjs`.
- `/admin/deals/bulk` returned **count 1, `created:true`**.
- DB check: id 11232 is LIVE at ₹71,990 / ₹79,900 with a hiRes `m.media-amazon.com` image.
- A sibling colour, B0GR6J183B, is live separately as id 1514.
- Seen list: 6 keys appended, so it now holds 1998.
- IndexNow: `indexnow-ping.mjs` sent 1 slug + 3 = **HTTP 200, 4 URLs**.

## CEO audit
| Check | Result |
|---|---|
| LIVE deals | 10885. None pending, none with a null price or null image |
| Posts | 330. None missing a cover, none missing SEO fields |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **3** |
| Broadcast cursor | 11231 against max 11232. The only gap is this tick's row, which the external cron will pick up |
| Prod endpoints | `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: all 200, 0.29–0.76 s |
| `sitemap.xml` | 10200 `<loc>`. It is ISR-cached for 30 min, so the new row will show up on the next refresh |
| Unpushed commits | 0 before this commit |

**Verdict:** green.
