# INDEXNOW — 2026-10-22c (19:40 IST)

**Two submissions to api.indexnow.org, both HTTP 200, covering 44 URLs.**

| Batch | Mode | URLs | HTTP |
|---|---|---|---|
| Newest 30 LIVE deals + newest 3 posts | slug mode (adds `/`, `/offers`, `/sitemap.xml`) | 36 | 200 |
| Hubs | `--paths` (adds nothing) | 8 | 200 |

- **Deals:** the 30 highest-ID LIVE rows, from `wonderchef-vista-neo-mixer-grinder-500w-32d905a06c84` (IFS 10-22g) down through the DesiDime 10-22g batch (CELLO bottles, anti-vibration pads, Lifelong toiletry bag).
- **Posts:**
  - `blog/pressure-cooker-not-whistling-leaking-steam-gasket-fix-india` (#518, CONTENT-SEO 10-22c)
  - `blog/helmet-size-chart-india-how-to-measure-head-mm-cm`
  - `blog/usb-vs-xlr-vs-wireless-lavalier-mic-which-to-buy-india`
- **Hubs:** `/blog`, `/freebies`, `/coupons`, `/stores`, `/feed.xml`, `/llms.txt` and `/sitemap.xml` all return 200 on prod.
- **Bad URL:** `/blog/feed.xml` was included by mistake and returns 404. It is harmless, because engines drop a 404 from an IndexNow ping, but the blog feed is `/feed.xml`. Leave it out next time.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-22):** 3. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,631 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14161.
- **Broadcast cursor:** 14137 against a highest ID of 14161. It is advancing.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
