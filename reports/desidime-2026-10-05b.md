# DesiDime tick — 2026-10-05b (02:44 IST)

**0 pushed.**

- **Swept:** 21 cards. 17 dropped as junk or non-product links, including CRED Play Store gift-card promos.
- **Resolved:** 2 product links. 1 was already in the DB, leaving 1 fresh candidate.
- **IndexNow:** n/a, nothing pushed.

## Rejects

| Candidate | Store | Card | Result of the check | Reason |
|---|---|---|---|---|
| Maggi Pazzta Cheese Macaroni | Digihaat | ₹24 | No ld+json | Food/FMCG (same reject as 05a) |

Acer ALG and Belkin MagSafe (both rejected in 05a) are no longer on the /new cards.

## CEO audit

- Live 12,090, pending 0, null price 0, null image 0.
- Broadcast cursor 12569 = DB max 12569. The external cron already picked up the IFS 05b batch.
- Posts 367, coverless 0, 1 post today (IST). It is 02:44 IST, and the BLOG cron `9 */6` covers the rest of the day.
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: 7/7 return 200.
- Unpushed commits: 0.

Clean.
