# INDEXNOW — 2026-10-24c (13:24 IST)

**IndexNow returned HTTP 200 for 64 URLs in 2 batches: all 51 LIVE deals pushed since INDEXNOW 10-24b (#14537–#14587), the 3 posts of IST 10-24 at their `/blog/` paths, and the hub and feed URLs. `/sitemap.xml` went in both batches, so 63 URLs are unique.**

| Batch | Mode | URLs | HTTP |
|---|---|---|---|
| Deals and posts | slug | 57 | 200 |
| Hubs | `--paths` | 7 | 200 |

- **Deals:** 51 LIVE rows, #14537–#14587, from the DESIDIME, TG and IFS batches since 10-24b. No row in that range is non-LIVE. Each was already pinged once by its own tick; this is the resubmit. Slug mode also adds `/`, `/offers` and `/sitemap.xml`.
- **Posts:** sent as `blog/<slug>` arguments, so they resolve to `/blog/<slug>`:
  - 525 `how-to-choose-monitor-arm-vesa-weight-desk-clamp-india`. Its first ping came from `insert-blog-mdmeta.mjs` (CONTENT-SEO 10-24c).
  - 524 `waterproof-mattress-protector-buying-guide-size-depth-india`. Resubmit.
  - 523 `how-to-measure-laptop-size-for-sleeve-bag-backpack-india`. Resubmit.
- **Hubs** (`MSYS_NO_PATHCONV=1`, `--paths`): `/blog`, `/freebies`, `/coupons`, `/stores`, `/feed.xml`, `/llms.txt`, `/sitemap.xml`. All 7, plus post 525 and deals #14537 and #14587, returned 200 on prod before the ping.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200 on both hosts.
- **Deals:** 14,056 LIVE, matching the API total of 14,056. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14587.
- **Posts (IST 2026-10-24):** 3 (ids 523, 524, 525). The cap is 4. 0 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14586, one behind the DB maximum. The external cron is still sending the IFS 10-24g batch, so the gap is not rot.
- **Unpushed commits:** 0 before this report.
- **Still open:** 47 shadowed same-ASIN duplicate pages are waiting for a price sync (from TG 10-24j).
- **Still open:** #7251 B08KFL2T8J has no add-to-cart but is still LIVE.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
