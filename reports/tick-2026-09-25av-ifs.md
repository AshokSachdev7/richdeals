# IFS tick 2026-09-25av — indiafreestuff ingest

**53 deals live** (ids 11247–11299), all Amazon, pushed with `apps/api/scripts/push-ifs-0925av.mjs`.
Bulk response: `count: 53`, every row `created: true`. IndexNow: **HTTP 200 for 56 URLs** (53 slugs + 3).

## Funnel

| Stage | Count |
|---|---|
| Homepage cards | 104 |
| New (not in seen index) | 95 |
| Buy Now resolved to a candidate | 88 |
| DB duplicate (B0BP7GTLM3, already LIVE as 686) | −1 |
| Rejected upfront: grocery (#35), bank-card-only price (#48, #49), min qty 2 (#62, #63) | −5 |
| Flipkart (#17, #32, #65, #87) + Myntra (#40), not verified this tick | −5 |
| Amazon ASINs checked on PDP (logged-in tab) | 77 |
| Price read null (#9, 13, 21, 27, 36, 39, 59, 60, 68, 88) | −10 |
| Price drift vs IFS > ₹1 (#11, 22, 23, 69, 80, 81, 82) | −7 |
| Coupon-dependent price mismatch (#19, 53, 55, 58, 61, 86) | −6 |
| Passed (price ±₹1, in stock, below M.R.P.) | 54 |
| Dropped: lingerie with thumbnail-only image (#24) | −1 |
| **Pushed live** | **53** |

## Gates in the push script

- Price, M.R.P., stock and image loaded from the PDP read (`.playwright-mcp/az0925av.json`), not retyped.
- Title ₹ equals price. Every hand-typed `at ₹X` in the copy is diffed against the price.
- Price is an integer below M.R.P. and within ±₹1 of IFS. Availability is In stock or "only N left".
- Images are `m.media-amazon.com` `_SL1500_`; the one `_SX` thumbnail (#54) was upgraded.
- Exactly 4 howTo steps; slugs and ASINs are unique.
- The 12 low-stock rows carry "only N left in stock at this price when checked".

## Notes on the copy

- American Tourister Nexa: the title says 36L and the bullets say 32 L, so the copy states neither figure as fact.
- Baseus Super Si 25W: the copy notes its EU two-pin plug.
- Kingsway car cover: the copy says it fits only the BYD Atto 3.

## CEO audit (18:33 IST)

- DB: live 10,952, pending 0, null price 0, null image 0, max deal 11299.
- Posts: 331; 0 without a cover, 0 without SEO fields. Today (IST) has 4 posts, which is the cap.
- Broadcast cursor is at 11246 and the DB max is 11299. The 53-deal backlog is from this batch and the external broadcast cron will drain it; this is not rot.
- Prod: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and a new deal page all return 200.
- No unpushed commits before this one.
