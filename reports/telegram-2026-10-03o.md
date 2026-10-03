# TELEGRAM-DEAL-MONITOR — 2026-10-03o (~14:00 IST)

**The sidebar showed 4 new candidates. 2 passed verification and went LIVE (`count:2`, both created, ids 12,434–12,435). IndexNow returned HTTP 200 for 5 URLs.**

## Pushed

| Deal | Source group | Price / M.R.P. | Verification |
|---|---|---|---|
| GRAPHENE 67-pc electric train set (Amazon, B0HKD9QSN6) | CoolzTricks | ₹1,299 / ₹5,999 (78% off) | Logged-in Amazon tab: In stock, add-to-cart present. New listing with no reviews yet. |
| VM BOND 4-layer kitchen rack (Flipkart, FVBHFAGFYKS5ZHZY) | SB Loots (fktr.in) | ₹244 / ₹999 (76% off) | Flipkart ld+json: ₹244, InStock, 4.1★ from 18,701 ratings. The ₹231 price needs a card, so it wasn't used. |

- **Affiliate links:** Amazon uses `?tag=ashoksachdev-21` (their `collab-amafhh-21` tag was stripped). Flipkart uses `/p/itm…?pid=…&affid=djhackraj` (the EarnKaro tracking redirect was dropped).
- **Payload builder:** `scripts/push-tg-1003o.mjs`.
- **Prod pages:** both returned 200.

## Rejected or skipped

| Candidate | Reason |
|---|---|
| Dealzone link.amazon/B01PXHH7C (Deniklo) | Resolves to a `/s?` search page, not a product |
| Bata slide and Ant Globe mouse (ONLINE SHOPPING DEALS) | Already in the seen list |
| Baidyanath chyawanprash, Keya pasta | FMCG and grocery |

## Freshness

- **IndexNow:** 2 slugs plus `/`, `/offers` and `/sitemap.xml` (5 URLs), HTTP 200.
- **Sitemap:** ISR (30 min) will pick up the new deals.
- **llms.txt:** dynamic, so it already lists them.
- **Seen list:** now 2,601 entries.

## CEO audit (DB-verified)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE / EXPIRED deals | 11,956 / 391 |
| PENDING_REVIEW | 0 |
| Null price / null image | 0 / 0 |
| Posts | 361; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-03: 3; 10-02: 3 |
| Broadcast cursor vs max deal id | 12,433 / 12,435. The 2 new deals go out on the next external cron run. |
| Unpushed commits | 0 before this report |

IFS tick 10-03g is still down after the low-memory kill. It has not been restarted, per the memory-kill rule.
