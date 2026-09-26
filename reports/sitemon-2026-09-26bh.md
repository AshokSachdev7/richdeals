# SITEMON + CEO audit 2026-09-26bh (23:15 IST)

**Verdict: green. All 7 endpoints are up. Fixed the stale-price backlog: 3 live deals repriced to the current Amazon price. IndexNow returned HTTP 200.**

## Prod endpoints
| Path | HTTP | Time |
|---|---|---|
| / | 200 | 0.22 s |
| /offers | 200 | 0.10 s |
| /blog | 200 | 0.37 s |
| /sitemap.xml | 200 | 0.13 s |
| /feed.xml | 200 | 0.09 s |
| /llms.txt | 200 | 0.38 s |
| /api/deals | 200 | 0.12 s (newest item is id 11528) |

## CEO audit (DB-verified)
- **Deals:** 11,181 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11528.
- **Sitemap:** 10,502 `<loc>`, which is 10,496 + 6 (IFS 26bf 4 + TG 26bg 2). ISR has caught up.
- **Posts:** 335, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. No day is 0, and today is at the cap.
- **Broadcast cursor:** re-read the file: `lastId` is 11528, equal to the DB max. Fully drained.
- **Git:** 0 unpushed commits before this commit.

## Fixed: stale prices (open since 26au and 26bg)
Prices were read off each product page's `#centerCol` in the logged-in Amazon tab. All three had add-to-cart present and no clip coupon.

| id | Deal | Old price | New price / M.R.P. | Discount |
|---|---|---|---|---|
| 7988 | Wipro Nowa 6A bell push ×20 | ₹761 | ₹518 / ₹4,300 | 82% → 88% |
| 7714 | Dabur Vatika 1 L refill | ₹327 | ₹252 / ₹699 | null → 64% |
| 10419 | HRX Kyoto cabin trolley | ₹2,199 | ₹1,299 / ₹9,999 | 78% → 87% |

- The ₹ figures and discount percentages in each title and description were patched to match, so no stale ₹ figure is left in the copy.
- Script: `apps/api/scripts/reprice-0926bh.mjs`.
- The prod deal pages already serve the new price in their JSON-LD.
- IndexNow: HTTP 200 for 6 URLs (3 slugs + 3).

## Open item (not rot)
- **Index coverage:** GSC showed about 12% indexed. Pruning the sitemap is for the next SEO tick.
