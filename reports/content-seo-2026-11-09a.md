# CONTENT-SEO tick 2026-11-09a (22:44 IST)

## Result
3 original posts LIVE, covers 3/3, IndexNow 200. 11-09 IST = 3 (rule 2-3 met, cap 4 safe).

| id | slug | seoTitle | words | internal links |
|---|---|---|---|---|
| 600 | how-to-choose-a-baby-stroller-india | How to Choose a Baby Stroller in India (2026 Guide) | 1521 | deal pages + /offers |
| 601 | robot-vacuum-vs-stick-vacuum-which-to-buy-india | Robot Vacuum vs Stick Vacuum: Which to Buy in India | 1294 | 6 deals (Dreame L50/D30, Eureka Atom, AGARO Regal/Rapid, KENT Dash) + /offers |
| 602 | washing-machine-shaking-fix-stand-anti-vibration-pads | Washing Machine Shaking? Causes, Fixes, Stands and Pads | 1432 | 6 deals (pads, Hipkoo/Zolmix/adjustable stands, Dettol cleaner, VW semi-auto) + /offers |

Keyword angles: buying-guide (stroller: recline/harness/wheels/fold/budget), comparison (robot vs stick, Indian tile/marble + mopping), problem-fix (shaking/walking during spin, transit bolts, stand vs pads).
All: seoTitle ≤60, seoDesc 150-160 (washing machine trimmed 165→158), answer-first bold intro, question H2s, comparison table, FAQ, 4 tags, real prices from live deal rows ("when we checked").

## Freshness
- insert-blog-mdmeta.mjs: 3 upserted, IndexNow HTTP 200.
- gen-blog-covers.mjs: 3 covers → richdeals.sfo3.digitaloceanspaces.com/og/<slug>.png, alt = title.
- Prod /blog/<slug> ×3 = 200. sitemap ISR ≤30 min; llms.txt force-dynamic.

## CEO audit
| Check | Value | Status |
|---|---|---|
| Prod endpoints | 7/7 200 | OK |
| API total vs DB LIVE | 15,657 = 15,657 | OK |
| PENDING_REVIEW | 0 | OK |
| LIVE null price / image | 0 / 0 | OK |
| DB max vs broadcast cursor | 16,223 = 16,223 | OK |
| Posts total | 473, 0 coverless, 0 seo-less | OK |
| Posts/day IST | 11-09 3, 11-08 0, 11-07 3, 11-06 3, 11-05 3 | 11-08 MISSED |
| Unpushed commits | 0 | OK |
| Crons | 9/9: TG :37, IFS 2h :23, DESIDIME 2h :13, CONTENT-SEO 6h :09, INDEXNOW 6h :53, SCHEMA-AUDIT 04:09, SITEMON :47, AI-OVERVIEW Wed 11:09, SEO-AUDIT-FIX 05:28 | OK |

## Still open
- Blog: 11-08 IST shipped 0 (missed day, cannot backfill without faking dates).
- SEO-AUDIT-FIX queue: IFS + DesiDime dup-row price-sync must insert priceHistory.
- TG 11-04l: B0GXB76VRW dups #4983; unchecked Vyom ×2/×3, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- Drift: #11896 FK ₹664 vs DB ₹899; 16 bare FK links; 96 drift rows (#37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396).
- SCHEMA 11-08 ran 31/31 PASS but report file never written.
- DO token rotation = owner.
