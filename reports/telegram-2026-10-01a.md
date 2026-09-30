# TELEGRAM-DEAL-MONITOR — 2026-10-01a (00:04 IST)

**Pushed 1 / count 1 (created:true) · 1 LIVE row re-priced · IndexNow HTTP 200 (5 urls = 2 + 3)**

## Sidebar sweep (13 groups, one evaluate)
3 new candidates. The rest were already seen or not single-product: Dealdost Draliet, Nat Habit, water purifier, Rogerkart, IFS ConfirmTkt, Hidden Loot Supercoins, handbag, Syska.

## Pushed (live, Amazon `?tag=ashoksachdev-21`)
| ASIN | Deal | PDP price | MRP | Off | Rating | Source |
|---|---|---|---|---|---|---|
| B0F6MY4T2S | Milton Kool Windsor 900 insulated water bottle, 700 ml | ₹113 | ₹225 | 50% | 3.8 (160) | Dealzone `link.amazon/B0gw7WYct` |

## Re-priced (dedup hit on a LIVE row → PDP re-read)
- **VEGA Cleanball body trimmer VHTH-33** (B0CL9STL6B, row 73): ₹999 → **₹880**, MRP ₹2,499, 65% off. Title and description rewritten, slug kept. Source link `amzn.lt/wm2vA2rA` does not resolve (NXDOMAIN), so the row was matched by title search in the DB.

## Rejected
- SG cricket balls B0GS5C7HPL (CoolzTricks `amzn.to/46OXowS`), ₹240: no ratings.

## CEO audit
- Prod 7/7 return 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`
- DB: LIVE 11,712 · EXPIRED 388 · max id 12,188 · null price 0 · null image 0 · PENDING_REVIEW 0
- Posts: 351 total · coverless 0 · seo-less 0 · IST/day: 09-28 4, 09-29 4, 09-30 4. 10-01 IST started at 00:00, so the BLOG cron has the whole day ahead.
- Broadcast cursor is 12187 and the DB max is 12188. The one-row gap is the Milton push above; the next external tg-broadcast run picks it up (self-heals, not rot).
- Unpushed commits: 0 before this report
- Seen list: 2,450 entries
