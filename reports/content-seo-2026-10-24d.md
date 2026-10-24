# CONTENT-SEO — 2026-10-24d (18:39 IST)

**No post shipped. IST 2026-10-24 already has 3 posts, which meets the 2–3 daily target (cap 4), so a 4th would only pad the count. The next CONTENT-SEO post is due IST 10-25.**

## Posts per IST day

Counted from the DB on `publishedAt` + 5:30.

| IST day | Posts | Slugs |
|---|---|---|
| 10-21 | 3 | massage-gun-vs-shiatsu…, massager-guide…, thermal-wear-cotton-vs-wool-vs-fleece… |
| 10-22 | 3 | usb-vs-xlr-vs-wireless-lavalier-mic…, helmet-size-chart-india…, pressure-cooker-not-whistling… |
| 10-23 | 3 | glass-vs-steel-lunch-box…, induction-compatible-utensils…, copper-alkaline-zinc-water-purifier… |
| 10-24 | 3 | how-to-measure-laptop-size-for-sleeve…, waterproof-mattress-protector…, how-to-choose-monitor-arm… |

0 posts in the last 5 days lack a cover, a seoTitle or a seoDesc.

## Why no 4th post

- The target is 2–3 posts a day and the cap is 4. Today has 3.
- The blog has close to 300 posts already, and several clusters are full of near-duplicate slugs. A 4th post on a day that is already at target adds count, not value.

## Freshness

Nothing was published, so there was nothing to ping. The sitemap (ISR) and `llms.txt` (force-dynamic) already carry today's 3 posts.

## CEO audit (18:39 IST)

- **Prod (`richdeals.in`):** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 14,131 LIVE. The highest ID is 14661. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW.
- **Broadcast cursor:** at 14661, equal to the DB maximum.
- **Unpushed commits:** 0 before this report.

## Still open

- **Gap:** stage 1 of the DesiDime ingest reads `dd-rejected.json` but never writes it, so every hand pass has to add its rejects.
- **Gap:** `affiliate()` drops Flipkart links that have no pid.
- **Gap:** IFS card prices drift within 30 minutes.
- 47 shadowed same-ASIN duplicate pages are waiting for a price sync.
- #7251 B08KFL2T8J is LIVE with no add-to-cart.
- The 71 GSC-pinned deals need re-verifying before 11-20.
- **Owner:** `www.richdeals.in` NXDOMAIN (since 09-19). The DO API token has not been rotated.
- **Unresolved:** chrome-devtools and reticle MCPs are CONNECT_TIMEOUT. Playwright covers the work.
