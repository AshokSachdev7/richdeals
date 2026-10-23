# INDEXNOW — 2026-10-24a (01:23 IST)

**IndexNow returned HTTP 200 for 70 URLs in 2 batches: the 57 deals pushed since the last INDEXNOW tick (#14464–#14520), the 3 newest posts at their `/blog/` paths, and 10 hub and feed URLs.**

| Batch | Mode | URLs | HTTP |
|---|---|---|---|
| Deals and posts | slug | 63 | 200 |
| Hubs | `--paths` | 7 | 200 |

- **Deals:** 57 LIVE rows, #14464–#14520. This covers the DESIDIME, TG and IFS batches since INDEXNOW 10-23d, including #14517–#14520 from IFS 10-24a. Slug mode also adds `/`, `/offers` and `/sitemap.xml`.
- **Posts:** these went in slug mode as `blog/<slug>` arguments, so they resolve to `/blog/<slug>`:
  - 523 `how-to-measure-laptop-size-for-sleeve-bag-backpack-india`
  - 521 `copper-alkaline-zinc-water-purifier-worth-it-india`
  - 520 `induction-compatible-utensils-how-to-check-india`
  - Post id 522 does not exist. It is an ID gap, not a missing post.
  - INDEXNOW 10-23d pinged its posts with bare slugs, which resolve to root `/<slug>` URLs that 404. This tick re-submits the correct `/blog/` URLs.
- **Hubs** (`MSYS_NO_PATHCONV=1`, `--paths`): `/blog`, `/freebies`, `/coupons`, `/stores`, `/feed.xml`, `/llms.txt`, `/sitemap.xml`. All 7 returned 200 on prod before the ping.

## CEO audit

- **Prod:** `/`, `/offers`, `/api/deals` plus the 7 hubs above all return 200.
- **Deals:** 13,989 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14520.
- **Posts (IST 2026-10-24):** 1 (post 523). The IST day is under 1.5 hours old, so this is not rot. The next CONTENT-SEO tick (`9 */6`) ships #2. 0 of 427 posts lack a cover, a seoTitle or a seoDesc.
- **Broadcast cursor:** 14520, which equals the DB maximum, so it is fully caught up.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
