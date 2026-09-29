# SITEMON + CEO audit — 2026-09-29zp (22:51 IST)

## Prod endpoints
| Path | Status | Time |
|---|---|---|
| / | 200 | 0.26 s |
| /offers | 200 | 0.11 s |
| /blog | 200 | 0.44 s |
| /sitemap.xml | 200 | 0.31 s |
| /feed.xml | 200 | 0.17 s |
| /llms.txt | 200 | 0.44 s |
| /api/deals | 200 | 0.15 s |

Local API :4000 → 200.

## Deal-count sanity
DB live 11,555 = API total 11,555. Max id 11924. That is 20 below the last sitemon, because 20 confirmed-OOS Flipkart deals were moved to EXPIRED this evening. Their pages stay up and were pinged to IndexNow.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Pending review | 0 |
| Null price / null image | 0 / 0 |
| Posts | 347; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 4 (cap) |
| Broadcast cursor | 11924 = DB max (file re-read) |
| Unpushed commits | 0 before this report |

Result: **7/7 green, counts match, 0 rot, nothing to fix.**
