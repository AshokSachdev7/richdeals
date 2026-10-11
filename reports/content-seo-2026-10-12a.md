# CONTENT-SEO tick 2026-10-12a (00:43 IST)

Published post 480: `/blog/instant-vs-storage-geyser-which-to-buy-india`. It is a BOFU post, following the TOFU emergency-bulb post (479).

| Field | Value |
|---|---|
| Title | Instant vs Storage Geyser: Which One to Buy (3L, 5L, 10L, 15L or 25L) |
| seoTitle | Instant vs Storage Geyser: Which to Buy & What Size (51 chars) |
| seoDesc | 157 chars |
| Words | ~1,400 |
| Tags | geyser, water heater, instant geyser, storage geyser, buying guide |
| Internal links | 11 live geyser deal pages (5 instant, 6 storage; all return 200 on prod), 3 geyser blog posts, `/offers` twice |
| In-body image | 1, the Haier Aqualis PDP image, with descriptive alt text |
| IndexNow | HTTP 200, sent by `insert-blog-mdmeta.mjs` |
| Cover | `og/instant-vs-storage-geyser-which-to-buy-india.png` on DO Spaces, returns 200; og:image on the page points to it |
| Prod | `/blog/<slug>` returns 200 (0.93s, 0.57s) |

## Keyword research

The SERP for "instant vs storage geyser" is led by brand blogs (Voltas, Glen) and size guides (NoBroker, checkandbuy). They give general advice ("instant for the kitchen, storage for bathing") but no numbers on heat-up time, hot water per bucket, or the 13 A wiring load of a 3 kW unit. This post adds those, worked out from basic physics, and gives a size table by household.

There was no overlap with existing posts. Our geyser cluster (best geysers 2026, immersion rod vs geyser, units per bath, glassline vs SS tank) had no instant-vs-storage comparison. All 3 related posts are cross-linked. Every product fact in the post comes from the verified DB deal rows.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 1 (this one) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,413 |
| Broadcast cursor | 12930, equal to DB max 12930 |
| Prod endpoints (7) | all 200 in 0.11–0.83s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |

## Sources

- [Voltas: instant vs storage geyser](https://www.voltas.com/blogs/articles/instant-geyser-vs-storage-geyser-which-one-is-right-for-you)
- [NoBroker: geyser size for your family](https://www.nobroker.in/blog/geyser-size-is-right-for-your-family/)
- [checkandbuy: storage vs instant buying guide](https://checkandbuy.in/buying-guides/water-heater-geyser-buying-guide-storage-vs-instant-india)
- [Glen: instant vs storage water heater](https://glenindia.com/blogs/news/instant-vs-storage-water-heater-geyser)
- [neverowned: which saves electricity](https://neverowned.in/blogs/news/geyser-buying-guide-india-instant-vs-storage)
