# CONTENT-SEO tick 2026-11-10a

IST run 00:39-00:50. 11-10 IST had 0 posts going in; this tick ships 3 (rule met, cap 4 respected).

## Result

| id | slug | seoTitle (len) | seoDesc len | words | internal links |
|---|---|---|---|---|---|
| 603 | cat6-vs-cat5e-vs-cat7-lan-cable-which-to-buy-india | Cat6 vs Cat5e vs Cat7 LAN Cable: Which to Buy in India (54) | 153 | ~1250 | 11 deal pages + /offers |
| 604 | air-fryer-food-not-crispy-causes-fixes | Air Fryer Food Not Crispy? 6 Causes and Easy Fixes (50) | 155 | ~1350 | 8 deal pages + 2 posts + /offers |
| 605 | quartz-vs-automatic-vs-solar-watch-which-to-buy-india | Quartz vs Automatic vs Solar Watch: Which to Buy in India (57) | 157 | ~1300 | 10 deal pages + 3 posts + /offers |

- Published via `insert-blog-mdmeta.mjs` (4 tags each). IndexNow HTTP 200.
- Covers: `gen-blog-covers.mjs` 3/3 → `richdeals.sfo3.digitaloceanspaces.com/og/<slug>.png`, alt = title.
- Prod `/blog/<slug>` 200 ×3.

## Keyword angles

- LAN cable: "cat6 vs cat5e", "is cat7 worth it", "which lan cable for 1 gbps". Answer-first: Cat6 for homes; Cat7 mostly a label; avoid CCA. Category table + per-job picks.
- Air fryer: "air fryer food not crispy", "soggy fries air fryer". 6-cause table (wet, crowding, preheat, shake, oil, temp) + Indian snacks (samosa, pakora, frozen, chana). Distinct from existing size guide / best-of posts (linked, not duplicated).
- Watches: "quartz vs automatic vs solar". Accuracy / battery / reserve / servicing table, first-watch verdict. Links winder + water-resistance + men's-analog posts.

All deal links = live RichDeals rows; prices as listed on those rows. No fabricated specs or stats.

## Freshness

- IndexNow 200 (slug mode via insert script).
- sitemap.xml ISR 1800s, picks up posts automatically. llms.txt force-dynamic. No new static routes.

## CEO audit (00:49 IST)

| check | value |
|---|---|
| prod 7 endpoints | 7/7 200 |
| DB LIVE / API total | 15,664 / 15,664 |
| max deal id / broadcast cursor | 16,230 / 16,230 |
| pending / null price / null image | 0 / 0 / 0 |
| posts | 476, 0 coverless, 0 seo-less |
| posts/day IST | 11-10 3, 11-09 3, 11-08 0, 11-07 3, 11-06 3, 11-05 3, 11-04 2, 11-03 4, 11-02 0, 11-01 1 |
| crons | 9/9 (CronList = roster) |
| unpushed | 0 |

## Still open

- Blog misses: 11-08 0, 11-02 0, 11-01 1. Past days can't be backfilled; keep every day ≥2.
- IFS / DesiDime dup-row price-sync must write priceHistory (SEO-AUDIT-FIX item).
- TG 11-04l backlog unchecked: Vyom ×2/×3, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D. TG pending: MILTON tiffin, TIED RIBBONS toran, Sounce mouse pad.
- Drift: #11896 Flipkart ₹664 vs DB ₹899; 16 bare Flipkart links; 96 drift rows (#37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396).
- SCHEMA 11-08 report never written (run was 31/31 PASS).
- DO token rotation: owner.
