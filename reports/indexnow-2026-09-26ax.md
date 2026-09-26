# INDEXNOW tick 2026-09-26ax (19:35 IST)

**102 URLs resubmitted → api.indexnow.org HTTP 200. Root cause of the recurring "IndexNow 422" found and fixed in `indexnow-ping.mjs`.**

## Window (last 6 h, from the DB)
- 96 LIVE deals created since 13:3x IST (IFS 26au batch, telegram and DesiDime rows, KeshKing 26av).
- 2 posts: `/blog/microfiber-cloth-gsm-guide-india-2026`, `/blog/edp-vs-edt-vs-body-spray-india-2026`.
- 4 hubs: `/`, `/offers`, `/blog`, `/sitemap.xml`.
- Total 102 URLs, sent as one POST.

## Statuses
| Attempt | Result |
|---|---|
| POST `--paths` (102) | 422 |
| Bing GET fallback (102, one per URL) | 403 ×102 |
| POST retry after 5 min (102) | 422 |
| Diagnosis: single-URL POST via curl `/` and `/offers` | 200 |
| POST `--paths` with `MSYS_NO_PATHCONV=1` (102) | **200** |
| POST `--paths /offers /blog` after the script fix, no env var | **200** |

## Root cause (fixed)
Git Bash (MSYS) rewrites any argument that starts with `/` into `C:/Program Files/Git/...` before node receives it. In `--paths` mode every URL became `https://richdeals.inC:/Program Files/Git/<path>`. The 422 body says it plainly: `InvalidRequestParameters — One or more URLs are not related to your verified domain`. The Bing GET loop mangled its URLs the same way, which explains the 403s.

This is why blog/`--paths` pings "intermittently" 422'd since 2026-08-09 while slug-mode deal pings always returned 200. The old theory that a 422 meant a rate limit on repeat POSTs was wrong.

**Fix:** `apps/api/scripts/indexnow-ping.mjs` now strips the `C:/Program Files/Git` prefix from its arguments. It was verified by the 200 in the last row above. The memory note was corrected to match.

**Impact to check:** earlier `--paths` pings reported as "422 → Bing GET 200/202" may have sent mangled URLs as well. Those URLs have since been re-covered by slug-mode pings and the sitemap, and this tick's 102 URLs include today's posts.

## CEO audit
- **Prod:** all 7 endpoints 200, all ≤0.52 s.
- **Deals:** 11,161 live, 0 pending review, 0 null price, 0 null image. DB max 11508.
- **Posts:** 335, 0 coverless, 0 seoless. Posts per IST day 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. No day is 0, today at the cap.
- **Broadcast cursor:** 11508 = DB max, drained.
- **Sitemap:** 10,482 `<loc>`.
- **Git:** 0 unpushed commits before this commit.

Verdict: green. Batch shipped with a 200, and the ping bug behind months of false 422s is closed.
