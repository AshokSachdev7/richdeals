# DesiDime tick 2026-10-09f (10:46 IST)

**Stage 1:** 33 cards discovered, 19 resolved to a product, 6 already in the DB, 13 fresh. The 12 Amazon candidates were checked on the PDP in the logged-in tab (`#corePriceDisplay` price, `#centerCol` M.R.P., `#availability` + add-to-cart, rating).

## Pushed: 4 (bulk response `count:4`, all `created:true`)

| ASIN | Product | Price | MRP | Off | Rating |
|---|---|---|---|---|---|
| B095SFQ9QT | Prestige 27.5 cm non-stick dosa tawa | ₹599 | ₹1,100 | 46% | 4.1 (5,462) |
| B0C5DW4D3G | INALSA Ozoy Plus 700W stick vacuum | ₹1,896 | ₹3,995 | 53% | 3.9 (1,707) |
| B0BSNQVFK9 | INALSA 12 L 1200W wet and dry vacuum | ₹3,899 | ₹12,995 | 70% | 4.0 (1,526) |
| B0FNKKJ37N | LAVNA 49 L digital safe locker | ₹6,890 | ₹23,990 | 71% | 4.4 (117) |

## IndexNow

4 slugs plus `/`, `/offers` and `/sitemap.xml`: **HTTP 200 for 7 URLs**.

## Rejected: 9

- **Price drift (DesiDime price vs PDP price):**
  - Lenovo Idea Tab: ₹17,248 → ₹20,998, coupon-dependent, only 2 ratings
  - PNG Jewellers gold ring: ₹74,310 → ₹80,810
  - Muthoot Pappachan gold pendant: ₹29,867 → ₹33,132
  - Redmi Pad 2 Pro: ₹22,449 → ₹26,999
  - AMD Ryzen 5 5600: ₹11,934 → ₹13,259
  - Nike Jordan Court Connect (Flipkart): price needs a bank offer, and stage 1 flagged drift
- **Rating 3.5 or below, or too few ratings:**
  - Printed kurta (rated 3.1, 14 ratings)
  - GameSir speaker (4 ratings)
  - Sturlite extension board (no ratings)

## CEO audit (10:46 IST)

| Check | Result |
|---|---|
| Audit counts | `{posts:2,cov:0,seo:0,np:0,ni:0,pend:0,live:12362,max:12879}` |
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | all 200 |
| Broadcast cursor | `lastId 12875` against DB max 12879. The 4-row gap is this batch. |
| Unpushed commits | 0 before this commit |

Clean.
