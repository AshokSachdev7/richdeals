# Telegram deal monitor — 2026-09-30u

Sidebar scan across all groups in `data/tg-groups.json` (one `browser_evaluate`).

## Pushed (2, status LIVE, `count:2`, both `created:true`)

| Deal | Store | Price | M.R.P. | Off | Rating | Verified |
|---|---|---|---|---|---|---|
| Kenstar Black Pureza 8L RO+UV+UF purifier (WAPHBA97RGPHMG26) | Flipkart | ₹4,499 | ₹16,500 | 73% | 4.0 (25,514) | PDP ld+json, InStock |
| Kinsco Aqua Punch 15L RO+UV+UF purifier (WAPGHHYWDFYNSDGS) | Flipkart | ₹3,999 | ₹20,000 | 80% | 4.1 (46,980) | PDP ld+json, InStock |

The affiliate link is `affid=djhackraj`. No minimum-order note on either PDP.

## Rejected / skipped

| Candidate | Why |
|---|---|
| link.amazon/B0772U5Ag → B0HDJCR2B1 meat cleaver ₹399 | only 1 rating |
| rogerkart YEWtrDb → B0DWX6XK1F Spacewood wardrobe | no buybox/price (unavailable) |
| fkrt.to/bh9DFznp | Flipkart search page |
| SB Loots Myntra | category "upto 90% off" |
| Nat Habit hair spray | no link |
| Supercoins / ConfirmTkt / chatter | not deals |

## Freshness

- IndexNow: 2 slugs → 5 URLs, **HTTP 200**
- The sitemap is ISR (≤30 min); llms.txt is dynamic.
- `tg-multi-seen.json` → 2431 entries

## CEO audit

- Prod: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all 200
- LIVE null price 0, null image 0, PENDING_REVIEW 0
- Posts IST 09-28/29/30: 4/4/4
- 0 coverless, 0 seo-less
- Broadcast cursor 12161 vs DB max 12163: the 2 new deals are queued for the external cron (self-heals)
- 0 unpushed commits
