# INDEXNOW — 2026-10-24b (07:23 IST)

**IndexNow returned HTTP 200 for 29 URLs in 2 batches: the 16 deals pushed since INDEXNOW 10-24a (#14521–#14536), the re-priced #14512, the 2 newest posts at their `/blog/` paths, and the hub and feed URLs. `/sitemap.xml` went in both batches, so 28 URLs are unique.**

| Batch | Mode | URLs | HTTP |
|---|---|---|---|
| Deals and posts | slug | 22 | 200 |
| Hubs | `--paths` | 7 | 200 |

- **Deals:** 16 LIVE rows, #14521–#14536, from the DESIDIME, TG and IFS batches since 10-24a. #14512 (GLUN baby bed sheet) was added because IFS 10-24d re-priced it from ₹142 to ₹127. Slug mode also adds `/`, `/offers` and `/sitemap.xml`.
- **Posts:** sent as `blog/<slug>` arguments, so they resolve to `/blog/<slug>`:
  - 524 `waterproof-mattress-protector-buying-guide-size-depth-india`. Its first ping came from `insert-blog-mdmeta.mjs`.
  - 523 `how-to-measure-laptop-size-for-sleeve-bag-backpack-india`. This is a resubmit.
- **Hubs** (`MSYS_NO_PATHCONV=1`, `--paths`): `/blog`, `/freebies`, `/coupons`, `/stores`, `/feed.xml`, `/llms.txt`, `/sitemap.xml`. All 7, plus post 524 and deal #14536, returned 200 on prod before the ping.

## CEO audit

- **Prod:** `/`, `/offers`, `/api/deals` plus the 7 hubs above all return 200.
- **Deals:** 14,005 LIVE, matching the API total of 14,005. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14536.
- **Posts (IST 2026-10-24):** 2, meeting the daily minimum. The next CONTENT-SEO tick (12:39) can ship #3. 0 of 428 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14536, which equals the DB maximum. The external cron picked up #14536.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
