# INDEXNOW: 2026-10-30c (window 2026-10-30T01:53Z → 07:53Z, IST 07:23 → 13:23)

**Result: 66 URLs submitted. api.indexnow.org returned HTTP 200 and Bing (www.bing.com/indexnow) returned HTTP 200, both for 66 URLs. The key file, the hubs and the sampled new and synced pages all return 200 on prod. The blog sitemap child and llms.txt carry the newest post (#578). CEO audit clean.**

Method:
- `$S/win1030c.cjs` read the DB window since the last INDEXNOW tick (10-30b, 01:53Z):
  - LIVE deals created in the window;
  - LIVE rows with a `PriceHistory.postedAt` in the window that are not new (price-synced; `updatedAt` is the click counter, so it is not used);
  - posts created in the window.
- `node apps/api/scripts/indexnow-ping.mjs <slugs...>` in slug mode, with `MSYS_NO_PATHCONV=1`. Slug mode prefixes each arg with `/` and adds `/`, `/offers` and `/sitemap.xml` itself.

## Submitted
| Group | URLs | Notes |
|---|---|---|
| New LIVE deals | 46 | #15539–15584 (DESIDIME f–g, IFS f–g, TG l–m) |
| Price-synced LIVE rows | 13 | #753, #1424, #1650, #1812, #5208, #6017, #7057, #7277, #7353, #7669, #11139, #11302, #12254 |
| New post | 1 | #578 `/blog/henna-and-indigo-for-grey-hair-two-step-method-india` |
| Hubs (listed by hand) | 3 | `/blog`, `/feed.xml`, `/llms.txt` |
| Hubs (auto, slug mode) | 3 | `/`, `/offers`, `/sitemap.xml` |
| **Total** | **66** | |

## Endpoints
| Endpoint | HTTP | URLs |
|---|---|---|
| api.indexnow.org/indexnow | 200 | 66 |
| www.bing.com/indexnow | 200 | 66 |

## Spot checks (prod)
| URL | HTTP |
|---|---|
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` | 200, body = key |
| `/`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt`, `/api/deals`, `/sitemap.xml` | all 200 |
| `/blog/henna-and-indigo-for-grey-hair-two-step-method-india` (#578) | 200 |
| `/indalo-natural-indigo-powder-for-hair-colour-b0b5t3n95q` (#15571, new) | 200 |
| `/safari-nudge-laptop-backpack-grey-blue-b097bgplyv` (#15578, new) | 200 |
| `/zebronics-ns1200-adjustable-laptop-stand-b0ckzggrt4` (#15581, new) | 200 |
| `/wipro-polycarbonate-alpha-10w-round-downlight-...-B0CNCY` (#753, synced) | 200 |
| `/kamiliant-by-american-tourister-3-pc-harrier-edge-...-b0gpqr` (#1424, synced) | 200 |

## Freshness
- **Sitemap:** the index lists 3 children (pages, deals, blog).
  - The first fetch of `/sitemaps/blog/sitemap.xml` was a stale ISR copy without #578.
  - The re-fetch (`x-nextjs-cache: HIT`, regenerated) carries it: 431 `<loc>` entries, newest `<lastmod>` 2026-10-30T07:37:58Z.
  - This is ISR stale-while-revalidate (1800 s) working as designed. Nothing to fix.
- **llms.txt:** force-dynamic, and it carries #578.
- **feed.xml:** deals-only by design (0 `/blog/` links), so it is not expected to carry the post. Its newest items are the TG 10-30m deals (#15582–15584).

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 15,032 = 15,032 |
| API newest id vs DB max | 15,584 = 15,584 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 449 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4. 10-30: 3 (rule met; cap 4) |
| Broadcast cursor vs DB max | `lastId` 15,584 = 15,584 (fully drained) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS Flipkart cards are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
