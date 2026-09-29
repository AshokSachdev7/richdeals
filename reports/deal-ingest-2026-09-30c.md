# DEAL-INGEST indiafreestuff — 2026-09-30c (02:30 IST)

## Result: 1 new deal LIVE (count:1, created:true)

| Store | Deal | Price |
|---|---|---|
| Amazon | STEELLOCK steel airtight containers, 4 x 350 ml (B095CP874M, #11943) | ₹340 / M.R.P. ₹540, 37% off, 4.1★ (307) |

IndexNow: **HTTP 200**, 4 urls (1 slug + 3). Page live 200.

## Funnel
- 103 slugs on 4 pages (all 200, 2.6s gap) → 7 new.
- Not a single product: Levi's "upto 70% off" Myntra hub.
- Already live: JBL Vibe Beam 2 (pushed by desidime 0930b).
- Myntra 34655290 Daniel Klein watch: rejected, 0 ratings (same verdict as telegram 0930b).
- Amazon PDP verify (#centerCol, logged-in tab), 4 checked, all prices matched IFS:
  - B0CFVDRNGP Symbol sweatshirt ₹299: rejected, rating 3.5 (≤3.5 rule).
  - B0H49W283D DIY computer table ₹2,549: rejected, 0 ratings.
  - B0GZXBHFB2 Joy casserole ₹505: rejected, 0 ratings.
  - B095CP874M STEELLOCK: passed, pushed.

## CEO audit
| Check | Value |
|---|---|
| Endpoints | 7/7 200 |
| Live deals | 11574 = API total |
| pending / nullPrice / nullImage | 0 / 0 / 0 |
| posts / coverless / seoless | 348 / 0 / 0 |
| posts 09-30 IST | 1 (day 2.5h old; blog cron every 6h) |
| broadcast cursor | 11942 vs maxDeal 11943 (new deal, external cron catches up) |
| unpushed commits | 0 |
