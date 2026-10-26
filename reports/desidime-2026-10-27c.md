# DESIDIME-INGEST · 2026-10-27c (~22:55Z 10-26 / 04:25 IST 10-27)

## Funnel

I ran stage 1 with `node scripts/ingest-desidime.mjs`. It reads the `/new` and homepage cards only; no per-deal pages are fetched.

| Step | Count |
|---|---|
| Cards discovered | 31 |
| Dropped by JUNK, GROCERY or other-store rules | 17 |
| Resolved through visit.desidime.com | 14 |
| Already in the DB by productId | 12 |
| Fresh | 2. Both are Amazon, and a Prisma recheck by productId and affiliateUrl found 0 rows for either |
| Verified and **pushed** | **0** |
| Rejected | 2, both for price drift |

## Verify (Amazon, logged-in Playwright tab, same-origin `/dp/` fetch, no captcha)

| ASIN | Product | Card ₹ | PDP `.a-price-whole` | Stock | Result |
|---|---|---|---|---|---|
| B0H69QFTKL | DROGO Monarch-X massage office chair | 17,655 | **19,899** (MRP 35,990) | In stock, add-to-cart | **Rejected.** Drift of ₹2,244. The PDP HTML has both a "5% coupon" and an "Apply ₹3000.00 coupon" string. 17,655 / 19,899 = 0.887, which is not a clean coupon fraction, so the card price is stacked coupon or bank math that nobody gets at checkout by default |
| B0H8P1NCMN | ASUS Vivobook 15 (2026), i3 100U, 8GB/512GB | 41,490 | **52,990** (MRP 86,990) | In stock, add-to-cart | **Rejected.** Drift of ₹11,500 |

## Push

None. 0 rows were sent to `/admin/deals/bulk`.

`data/dd-rejected.json` went from 432 to 433 keys. B0H8P1NCMN was already in the file from 10-26 20:54Z, but stage 1 still surfaced it as fresh. **Gap:** stage 1's reject-file filter does not catch this Amazon pid. The only cost was one extra PDP read.

## Freshness

- **IndexNow:** not applicable, since nothing was pushed.
- **Sitemap and llms.txt:** unchanged.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,546 |
| PENDING_REVIEW | 0 |
| LIVE null price / null image | 0 / 0 |
| Broadcast cursor | `lastId` 15080 = DB max 15080 |
| Posts total / coverless / seo-less | 436 / 0 / 0 |
| Posts per IST day | 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 1. CONTENT-SEO runs at ~06:39 IST |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. DesiDime card prices were wrong for 2 of the 2 fresh cards, so verifying on the PDP is still the gate that matters.
