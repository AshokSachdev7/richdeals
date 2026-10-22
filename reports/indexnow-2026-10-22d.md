# INDEXNOW — 2026-10-22d (19:47 IST)

**Two submissions to api.indexnow.org, both HTTP 200, covering 43 URLs.**

| Batch | Mode | URLs | HTTP |
|---|---|---|---|
| Newest 30 LIVE deals + newest 3 posts | slug mode (adds `/`, `/offers`, `/sitemap.xml`) | 36 | 200 |
| Hubs | `--paths` (adds nothing) | 7 | 200 |

- **Deals:** the 30 highest-ID LIVE rows, from `halonix-astron-star-12w-b22-led-bulb-pack-2-b07gsjlny7` (IFS 10-22h, ID 14168) down to `flameless-led-diya-b0fpbmsbly` (IFS 10-22g). This covers all 7 of IFS 10-22h and most of 10-22g.
- **Posts:**
  - `blog/pressure-cooker-not-whistling-leaking-steam-gasket-fix-india` (#518)
  - `blog/helmet-size-chart-india-how-to-measure-head-mm-cm`
  - `blog/usb-vs-xlr-vs-wireless-lavalier-mic-which-to-buy-india`
- **Hubs:** `/blog`, `/freebies`, `/coupons`, `/stores`, `/feed.xml`, `/llms.txt` and `/sitemap.xml` all return 200 on prod. `/blog/feed.xml` (a 404) was left out this time.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-22):** 3. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,638 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14168.
- **Broadcast cursor:** 14147 against a highest ID of 14168. It is advancing.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
