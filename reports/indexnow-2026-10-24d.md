# INDEXNOW — 2026-10-24d (19:24 IST)

**IndexNow returned HTTP 200 for 107 URLs in 2 batches. They cover all 94 LIVE deals pushed since INDEXNOW 10-24c (#14588–#14682), the 3 newest posts at their `/blog/` paths, and the hub and feed URLs. `/sitemap.xml` went in both batches, so 106 URLs are unique.**

| Batch | Mode | URLs | HTTP |
|---|---|---|---|
| Deals and posts | slug | 100 | 200 |
| Hubs | `--paths` | 7 | 200 |

- **Deals:** 94 LIVE rows in #14588–#14682. They came from the DESIDIME, TG and IFS ticks since 10-24c. The only non-LIVE row in the range, #14615 Solimo drip jar set, was set to EXPIRED at IFS 10-24j and was left out of this batch. That tick already pinged it.
  - Each deal had been pinged once by its own tick, so this is a resubmit.
  - Slug mode also adds `/`, `/offers` and `/sitemap.xml`.
- **Posts:** sent as `blog/<slug>`, so they resolve to `/blog/<slug>`. No post has been published since 10-24c, so all 3 are resubmits:
  - 525 `how-to-choose-monitor-arm-vesa-weight-desk-clamp-india`
  - 524 `waterproof-mattress-protector-buying-guide-size-depth-india`
  - 523 `how-to-measure-laptop-size-for-sleeve-bag-backpack-india`
- **Hubs** (`MSYS_NO_PATHCONV=1`, `--paths`): `/blog`, `/freebies`, `/coupons`, `/stores`, `/feed.xml`, `/llms.txt`, `/sitemap.xml`.
- **Pre-ping check on prod:** all of these returned 200 before the ping:
  - the 7 hubs
  - post 525
  - the first and last deal in the range (#14588 Presto detergent, #14682 Shrived diya holder)

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both `richdeals.in` and `richdeals-jw726.ondigitalocean.app`.
- **Deals:** 14,151 LIVE and 413 EXPIRED. The LIVE count matches the API total of 14,151, and the newest deal is #14682 in both. 0 LIVE deals have a null price, 0 have a null image, and 0 are in PENDING_REVIEW.
- **Posts per IST day:**

  | Day | Posts |
  |---|---|
  | 10-19 | 4 |
  | 10-20 | 2 |
  | 10-21 | 3 |
  | 10-22 | 3 |
  | 10-23 | 3 |
  | 10-24 | 3 |

  Every day had at least 1 post and none went over the cap of 4. 0 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14678, 4 behind the DB maximum. At SITEMON 10-24t, 9 minutes earlier, it was 14673. The external cron is still sending the IFS 10-24j batch, so the gap is not rot.
- **Unpushed commits:** 0 before this report.

## Still open

- IFS card prices are unreliable. At 10-24j, 28 of 51 Amazon cards drifted, and 9 of 11 Flipkart cards showed bank-offer prices.
- `affiliate()` drops Flipkart links that have no pid. The DesiDime ingest reads `dd-rejected.json` but never writes it.
- 47 shadowed same-ASIN duplicate pages are waiting for a price sync.
- #7251 B08KFL2T8J is LIVE but has no add-to-cart.
- The 71 GSC-pinned deals need re-verifying before 11-20.
- **Owner:** `www.richdeals.in` has had no DNS record (NXDOMAIN) since 09-19, and the DO API token has not been rotated.
- **Unresolved:** the chrome-devtools and reticle MCPs time out on connect (CONNECT_TIMEOUT). Playwright covers the work.
