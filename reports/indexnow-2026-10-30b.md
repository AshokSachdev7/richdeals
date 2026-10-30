# INDEXNOW · 2026-10-30b (window 2026-10-29T19:54Z → 2026-10-30T01:53Z / IST 01:24 → 07:23)

**Result: 93 URLs submitted. api.indexnow.org returned HTTP 200 and www.bing.com/indexnow returned HTTP 200. The key file, the new pages and the hubs all return 200 on prod. The sitemap blog child and `llms.txt` both carry the newest post (#577). CEO audit clean.**

Method, same as 10-30a:
- The window was selected from the DB:
  - new LIVE deals by `createdAt`;
  - price-synced deals by `PriceHistory.postedAt` (not `updatedAt`, which is the click counter);
  - new posts by `createdAt`.
- From `apps/api`, ran `MSYS_NO_PATHCONV=1 node scripts/indexnow-ping.mjs <90 args>`. This is slug mode, which adds `/`, `/offers` and `/sitemap.xml` automatically.
- The same 93-URL body was POSTed directly to Bing.

## Submitted
| Group | URLs | Notes |
|---|---|---|
| New LIVE deals | 6 | #15533–15538 |
| Price-synced LIVE rows | 82 | Every deal with a `PriceHistory` row in the window, all LIVE. This includes the SEO-AUDIT-FIX 10-30 top-100 re-sync (73 rows, already pinged once at 200) and the IFS/DesiDime dup syncs (#1367, #4020, #6215). Re-submitting is harmless and keeps the batch in one notification |
| New post | 1 | `blog/sata-vs-nvme-ssd-which-to-buy-laptop-upgrade-india` (#577) |
| Hubs | 4 | `/blog`, plus `/`, `/offers` and `/sitemap.xml` added by slug mode |
| **Total** | **93** | |

## Endpoints
| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org | 200 | 93 |
| www.bing.com/indexnow (POST) | 200 | 93 |

## Spot checks (prod)
| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` (body = key) | 200 |
| `/beardo-acid-and-g-t-eau-de-parfum-combo-for-men-2-x-30-ml-b0hgb11xt1` (#15536) | 200 |
| `/boldfit-women-s-full-zip-polyester-sweatshirt-b0dknvwfgl` (#15537) | 200 |
| `/pulseitjump-adjustable-skipping-rope-tangle-free-b0dtk619mk` (#15538) | 200 |
| `/samsung-galaxy-buds-core-3399-B0FDGV` (synced) | 200 |
| `/100w-supervooc-fast-charger-with-type-c-cable-original-qc-3-0-charging-adapter-c-B0GFMR` (synced) | 200 |
| `/blog/sata-vs-nvme-ssd-which-to-buy-laptop-upgrade-india` | 200 |
| `/`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt`, `/api/deals`, `/sitemap.xml` | all 200 |

## Freshness
- **Sitemap index:** lastmod 2026-10-30T01:27:51Z, with 3 children: pages 63, deals 100 (top 100 by design), blog 430.
- **Blog child:** carries #577. The first fetch served the stale ISR copy (429 locs, no #577). The re-fetch a few seconds later returned 430 locs including #577. This is ISR stale-while-revalidate working as designed.
- **`llms.txt`:** carries #577 (force-dynamic).

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,986 = 14,986 |
| API newest id vs DB max | 15,538 = 15,538 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 448 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4 (cap). 10-30: 2 so far (rule met); CONTENT-SEO next fires 12:32 local |
| Broadcast cursor vs DB max | `lastId` 15,538 = 15,538 |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session: 7 Flipkart top-100 deals are unverified and TG reads only 5 of 13 groups. reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
