# TELEGRAM-DEAL-MONITOR tick — 2026-09-25ai (12:04 IST)

**2 deals pushed LIVE (Bajaj Maxima fan, BOLTT EVO phone). IndexNow HTTP 200 (5 URLs).**

## Funnel
13 groups scanned via one `.chat-list .ListItem.Chat` sidebar read.

| Candidate | Source | Resolved | Outcome |
|---|---|---|---|
| Bajaj Maxima 600mm ceiling fan | SB Loots `amazn.lt/ve8zhrun` | B00KL56N8C | **Accepted** — PDP ₹1,284, M.R.P. ₹2,890 (56% off), in stock, buy box present. Source tag `bhavesh015-21` stripped |
| BOLTT EVO 64 GB + 4 GB | Dealdost / CoolzTricks `fkrt.cc/hpIqM5c` | MOBHPP59WKSV4FYG | **Accepted** — Flipkart PDP ₹9,999, M.R.P. ₹17,999 (44% off), not sold out. Channel ₹8,999 is after a ₹1,000 coupon; we list the pre-coupon PDP price and name the coupon/bank offers in the copy. Source `affid=rohanpouri` + ENKR params stripped |

Every other group's newest post was already handled in tick 0925ag (Preethi, Wonderchef, Lavie, Homeor, Syska) or was chatter, Swiggy vouchers or loot joins.

Dedup: both keys absent from `data/tg-multi-seen.json` and from the DB (`productId` query, 0 rows). Seen list +4 → 1984 (local state, gitignored).

## Push
- Script: `apps/api/scripts/push-tg-0925ai.mjs` (pre-flight gate: title ₹ = price, price < M.R.P., store-CDN image, ≥900-char description, 4 how-to steps)
- `/admin/deals/bulk` HTTP 201, `count:2`, both `created:true`
- Affiliate: Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`

## Freshness
- IndexNow: HTTP 200, 5 URLs (2 slugs + 3 auto paths)
- `sitemap.xml`: ISR ≤30 min, no new static route
- `llms.txt`: force-dynamic, already current

## CEO audit (DB + prod)
| Check | Result |
|---|---|
| LIVE deals | 10850 (+2), max id 11197 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 329, 0 coverless, 0 seoless |
| Posts/day IST 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **2 so far** — no zero day |
| Broadcast cursor | 11195 vs max 11197 — gap is this batch, external cron drains it |
| Prod endpoints | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all 200 |
| Unpushed commits | 0 (before this commit) |

Verdict: green.
