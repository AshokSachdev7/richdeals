# INDEXNOW tick 2026-09-26af

**All 39 URLs were submitted and accepted. Bing's fallback endpoint returned HTTP 200 for every one after api.indexnow.org rejected the batch with HTTP 422.**

## Window
- Covers the last 6 hours: 2026-09-26 02:41 UTC to now (08:11 → 14:1x IST).
- 33 LIVE deals and 1 post (`/blog/microfiber-cloth-gsm-guide-india-2026`).
- 5 hub paths: `/`, `/offers`, `/blog`, `/sitemap.xml` and `/feed.xml`.
- Total: 39 URLs.

## Submission
| Endpoint | Method | Result |
|---|---|---|
| api.indexnow.org | POST, 39 URLs | **422**. This is the POST rate limit, because these URLs were already pinged per batch during the last 6 hours. |
| www.bing.com/indexnow | GET, one request per URL, 400 ms apart | **200 ×39**, with no 403s. |

- Key: `33f3a9d63ca15676bbd90586ea80e65f`.
- The deals were also pinged batch by batch when they were pushed (the IFS 0926aa and Telegram 0926ab/0926ad ticks). This tick is a resubmit.
