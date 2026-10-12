# CONTENT-SEO tick 2026-10-12b (06:42 IST)

Published post 481: `/blog/direct-cool-vs-frost-free-refrigerator-which-to-buy-india`. It is a TOFU post, following the BOFU geyser post (480).

| Field | Value |
|---|---|
| Title | Direct Cool vs Frost Free Refrigerator: How Each Works and Which to Buy |
| seoTitle | Direct Cool vs Frost Free Fridge: Which Should You Buy? (55 chars) |
| seoDesc | 157 chars |
| Words | ~1,590 (prose, URLs excluded) |
| Tags | refrigerator, direct cool, frost free, fridge buying guide, home appliances |
| Internal links | 11 live fridge deal pages (6 direct cool, 5 frost free), 1 fridge thermometer deal, 2 fridge blog posts, `/offers` twice. All return 200 on prod. |
| In-body image | 1, the Haier 190 L direct cool PDP image, with descriptive alt text |
| IndexNow | HTTP 200, sent by `insert-blog-mdmeta.mjs` |
| Cover | `og/direct-cool-vs-frost-free-refrigerator-which-to-buy-india.png` on DO Spaces, returns 200; og:image on the page points to it |
| Prod | `/blog/<slug>` returns 200 (0.65s, 0.95s) |

## Keyword research

The SERP for "direct cool vs frost free refrigerator" is led by brand and finance blogs (Haier India, Bajaj Finserv, NoBroker, simpleghar, priceindia). They agree on the basics (convection vs fan, manual vs auto defrost, direct cool cheaper and more efficient) but quote broad kWh ranges with no model behind them. They also give no defrost routine and no price gap at a real size.

This post adds:
- One real BEE label figure from a live deal (Bosch 207 L: 159 units a year, about ₹1,270 at ₹8/unit).
- The actual price gap between our cheapest live 241 L frost free fridge and our 207 L direct cool fridges.
- A 5-step safe defrost routine.
- A household-size table.

There is no overlap with existing posts. The fridge cluster had a single-door roundup and a general buying guide, but no direct cool vs frost free explainer. Both existing posts are cross-linked. Every product fact comes from the verified DB deal rows.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 2 (this one included) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,419 |
| Broadcast cursor | 12936, equal to DB max 12936 |
| Prod endpoints (7) | all 200 in 0.08–1.01s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |

## Sources

- [Haier India: direct cool vs frost free](https://shop.haierindia.com/blog/direct-cool-vs-frost-free-refrigerator/)
- [Bajaj Finserv: direct cool vs frost free](https://www.bajajfinserv.in/direct-cool-vs-frost-free-refrigerator)
- [NoBroker: direct cool vs frost free fridge](https://www.nobroker.in/appliance-services/guides/direct-cool-vs-frost-free-fridge/)
- [simpleghar: direct cool vs frost free](https://simpleghar.com/direct-cool-vs-frost-free-refrigerator/)
- [priceindia: frost free or direct cool](https://priceindia.in/frost-free-or-direct-cool-which-is-best/)
