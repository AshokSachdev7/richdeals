# CONTENT-SEO tick 2026-10-13b (06:43 IST)

**Result:** 1 BOFU post shipped, making 2 posts today (IST). The cap is 4.

## Keyword pick

- **Query:** "diaper price per piece" / "cheapest diaper pack India" (BOFU, buyer comparing packs).
- **Why this query:**
  - Our live deal cluster has 6 verified diaper packs, plus wipes and cloth diapers, to build a real per-piece table from.
  - Existing baby posts are `free-diaper-samples-india-2026` and `newborn-baby-essentials-checklist-india-2026`, so this is not a near-duplicate.
- **The SERP gap:**
  - navparent.com covers only Large-size pants, with no tape diapers and no size method.
  - mumpa.in has no brand table and no pant vs tape comparison.
  - babyjunctions.in and favouritehub.com are brand lists with no live prices.
- **Evergreen?** Yes. The method holds, and prices are framed as "at time of writing" with links to the live deal pages.

## Post

| Item | Value |
|---|---|
| URL | https://richdeals.in/blog/baby-diaper-price-per-piece-how-to-compare-packs-india (200, id 485) |
| Words | 1,333 |
| Structure | Answer-first lede, 8 H2s, a 6-row per-piece table, a 3-step method, monthly budget formula, 5 traps, 5-question FAQ |
| seoTitle | "Diaper Price Per Piece: How to Find the Cheapest Pack" (53 chars) |
| seoDesc | 153 chars |
| Internal links | 10, all 200: 8 live deal pages, `/offers`, and `/blog/newborn-baby-essentials-checklist-india-2026` |
| In-body images | none |
| Cover | `og/baby-diaper-price-per-piece-how-to-compare-packs-india.png` 200, set as og:image |
| Pipeline | `insert-blog-mdmeta.mjs` → `gen-blog-covers.mjs` |

Every number in the post is computed from the live deal rows (price ÷ count). No fabricated stats.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200, sent by the insert script |
| sitemap.xml | ISR, refreshes within 1800 s |
| llms.txt | Dynamic, rebuilt on every request |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,444 |
| Broadcast cursor | 12961, equal to DB max 12961 |
| Prod endpoints (7) | all 200 in 0.10–0.59s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
