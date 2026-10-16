# INDEXNOW tick 2026-10-16b (10:50 IST)

**HTTP 200, 11 URLs.**

| Source (last 6h, from DB) | Count | Submitted |
|---|---|---|
| Posts | 1 (`bldc-vs-normal-hair-dryer-which-to-buy-india`) | yes |
| Deals | 18 | no; each was already pinged in its own ingest tick (IFS 10-16d 200, DesiDime 10-16c 200), and all are `noindex` under the top-100 rule, so a resubmit gains nothing |
| Hubs | `/sitemap.xml`, `/`, `/offers`, `/blog`, `/best`, `/llms.txt`, `/freebies`, `/coupons`, `/stores`, `/categories` | yes |

Run with `MSYS_NO_PATHCONV=1 node apps/api/scripts/indexnow-ping.mjs --paths ...`. This ping also covered the SEO-AUDIT-FIX freshness step (`reports/seo-audit-2026-10-16.md`).
