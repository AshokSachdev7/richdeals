# CONTENT-SEO: 2026-10-31b (~06:45 IST)

**Result: 1 BOFU post shipped (#581). The page returns 200 on prod, the cover is set, and IndexNow returned HTTP 200. 10-31 IST is now at 2 of 4 posts, inside the 2–3/day rule. CEO audit clean.**

## Post
| Field | Value |
|---|---|
| URL | https://richdeals.in/blog/sandwich-maker-toast-vs-grill-vs-3-in-1-which-to-buy-india |
| id | 581 |
| seoTitle (54) | Sandwich Maker: Toast vs Grill vs 3-in-1, Which to Buy |
| seoDesc (156) | Toast, grill or 3-in-1 sandwich maker? Choose by plate type, 2 vs 4 slices, wattage and hinge, with a decision table, cleaning tips and live deals in India. |
| excerpt (156) | Toast, grill or 3-in-1 sandwich maker? Pick by plate type, 2 vs 4 slices, 750W+ wattage and a floating hinge, with a decision table and live deals in India. |
| Length | 1,581 prose words (1,664 raw, counting table syntax), 9,861 chars |
| Tags | kitchen-appliances, buying-guide, sandwich-maker, breakfast |
| Cover | `og/sandwich-maker-toast-vs-grill-vs-3-in-1-which-to-buy-india.png` (DO Spaces 200, it is the og:image) |
| Funnel | BOFU. The previous post, 10-31a #580 kettle descale, was TOFU |
| Prod | 200 (0.68 s), `<title>` correct, Article + FAQPage JSON-LD present |

## Keyword research
- **SERP read:** 2 WebSearches plus a fetch of instacuppastore's guide. The other ranking pages were wonderchef, mishry (403 to fetch), chefpicks.in, desikitchenfinds, digirake and magicdrop.
- **Gaps the post fills:**
  - Floating vs fixed hinge, which no competitor covers.
  - A toast vs grill vs 3-in-1 decision table.
  - 2- vs 4-slice choice by household size, plus the warning that "slice" is used loosely on listings.
  - Panini press vs grill.
  - Cleaning fixed vs removable plates.
- **Saturation check:** 0 existing "sandwich" slugs (toaster 1, air-fryer 5, mixer 6, geyser 6), so this is not a near-duplicate cluster.

## GEO patterns
- Answer-first **Short answer:** paragraph.
- 5 tables and numbered steps.
- FAQ with 5 Q&As.
- No fabricated stats or prices. Wattage figures are given as typical ranges, and every deal line says "check the live price".

## Internal links (all 200 on prod)
- Deal pages: #13500 Lifelong 4-slice, #13056 iBELL (Amazon), #12670 iBELL (Flipkart), #12595 Mr Tru, #10170 Italia, #15356 Lifelong air fryer.
- Blog: `/blog/best-pop-up-toasters-under-2000-india-2026`.
- Hub: `/offers`.

## Freshness
- `insert-blog-mdmeta.mjs` IndexNow ping returned **HTTP 200**.
- Sitemap is ISR (1800 s), so the post appears within 30 min. No new static route.
- `llms.txt` is force-dynamic, so it already reflects the post.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.10–0.70 s) |
| API total vs DB LIVE | 15,166 = 15,166 (local and prod API) |
| API newest id vs DB max | 15,720 = 15,720 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 452 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 2 |
| Broadcast cursor vs DB max | `lastId` 15,720 = 15,720 (drained) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`, so nothing was recreated |

## Still open (carried forward)
- Playwright MCP is hung and reticle fails with CONNECTION_CLOSED. As a result:
  - TG reads 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
