# INDEXNOW — 2026-10-23b (07:23 IST)

**43 URLs were resubmitted and both pings returned HTTP 200: the 30 newest LIVE deals, the 3 newest posts, and the hub pages. Prod returns 200 on every endpoint checked. No CEO-audit rot.**

| Batch | Mode | URLs | HTTP |
|---|---|---|---|
| Newest 30 LIVE deals plus newest 3 posts | slug (adds `/`, `/offers`, `/sitemap.xml`) | 36 | 200 |
| Hubs | `--paths` (adds nothing) | 7 | 200 |

- **Deals:** IDs 14267 (Fire-Boltt Spin SpO2 smartwatch) down to 14238 (multi-purpose kitchen scissors). That covers every deal pushed since INDEXNOW 10-23a (14254–14267) plus the IFS 10-23a block, which is being resubmitted.
- **Posts:** #520 `induction-compatible-utensils-how-to-check-india` (new since 10-23a), #519 `glass-vs-steel-lunch-box-which-to-buy-india`, #518 `pressure-cooker-not-whistling-leaking-steam-gasket-fix-india`.
- **Hubs:** `/blog`, `/freebies`, `/coupons`, `/stores`, `/feed.xml`, `/llms.txt`, `/sitemap.xml`. All 7 return 200 on prod before the ping.

## CEO audit

- **Prod:** `/`, `/offers`, `/api/deals` and all 7 hubs return 200 on richdeals.in.
- **Posts (IST 2026-10-23):** 2 (#519, #520). The minimum is met. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,737 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14267.
- **Broadcast cursor:** 14267, equal to the highest deal ID.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
