# TELEGRAM-DEAL-MONITOR tick 2026-09-27a (00:04 IST)

**2 deals pushed LIVE (Amazon). `/admin/deals/bulk` returned 201 with count 2 and created both. IndexNow returned HTTP 200 for 5 URLs (2 slugs + 3).**

## Sweep
- One `browser_evaluate` over `.chat-list .ListItem.Chat` read all 13 groups.
- Resolved 3 shortlinks (`amzn.to` ×2, `amazn.lt`) by curl, following redirects hop by hop.
- Deduped against `data/tg-multi-seen.json` and the live DB by `productId`. All 3 were new.

## Pushed (ids 11529–11530)
| Group | Product | Price / M.R.P. | Check |
|---|---|---|---|
| CoolzTricks | MILTON Town Case microwavable lunch box, 2 × 450 ml | 499 / 950 | `#centerCol` ₹499, "lowest price in 30 days", add-to-cart present, no clip coupon, 4.1★ |
| CoolzTricks | Solimo borosilicate mixing bowl, 1100 ml | 245 / 599 | `#centerCol` ₹245, add-to-cart present, no clip coupon, 4.2★ |

- All copy is original. Images come from `m.media-amazon.com`.
- `/out/11529` and `/out/11530` return 302 to `/dp/<ASIN>?tag=ashoksachdev-21`. Both prod pages return 200.

## Skipped
| Group | Post | Reason |
|---|---|---|
| SB Loots | Portable cordless blender B0HF42VVYY @585 | PDP shows ₹899; ₹585 only after a 35% clip coupon. Added to the seen file. |
| Dealzone | Panchmeva dry fruits 500 g | Grocery |
| LATEST IPHONE | iPhone 18 Pro "151 me" | Bait/fake price |
| Rogerkart / Hidden Loot / IFS Tips / Deal Dibba / OMG | Cashew, supercoins, Instamart, join-channel, video | Grocery or not a product |
| Dealdost / ONLINE SHOPPING / INDIAN CHEAP / Loot 24x7 | Serum, Roff, handbag, Syska | Already handled in 26bd/26bg |

The seen file now holds 2,109 entries.

## Freshness
- **IndexNow:** HTTP 200 for 5 URLs.
- **Sitemap:** 10,502 `<loc>`. It is ISR 1800 s, so this batch lands within 30 minutes.
- **llms.txt:** 200. It is dynamic, so it already includes the batch.

## CEO audit
- **Prod:** all 7 endpoints return 200, all ≤0.76 s.
- **Deals:** 11,183 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11530.
- **Posts:** 335, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/4.
- **Today (09-27):** 0 posts so far at 00:04 IST. The day is 4 minutes old; the blog cron (`9 */6`) is due. Watch item, not rot.
- **Broadcast cursor:** re-read the file: `lastId` is 11528 against a DB max of 11530. The gap is this batch, which the external cron drains.
- **Git:** 0 unpushed commits before this commit.

Verdict: green. 2 deals shipped and pinged.
