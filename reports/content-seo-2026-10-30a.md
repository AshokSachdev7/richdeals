# CONTENT-SEO: 2026-10-30a (~01:00 IST)

**Result: 1 post published: #576 `/blog/distemper-vs-emulsion-paint-which-to-buy-india` (about 1,520 prose words, TOFU decision guide that hands off to BOFU paint deals). IndexNow returned 200. Cover generated, prod returns 200. Posts for 10-30 IST: 1 of the 4 cap. CEO audit clean.**

## Topic and keyword research
- **Cluster gap:** 0 existing posts on paint or home repainting, checked against all 446 slugs. Not a near-dup of the saturated best-X-under-Y or free-samples clusters.
- **Timing:** post-Diwali is repaint season. This tick also brought in fresh paint deals: #15519 Ajooba 20 L, #15517 Ajooba 10 L, #4649 Sadolin price-synced.
- **Query:** "distemper vs emulsion paint which is better India".
  - SERP top results: housing.com, studiomatrx.org, asianpaints.com, constructionestimatorindia.com, nerolac.com, bergerpaints.com, bricknbolt.com, homelane.com, tatasteel aashiyana.
  - Pages read: studiomatrx and nerolac. housing.com returned 406 and was skipped.
- **Gap exploited:** no single result combines all of these:
  - a comparison table
  - a litres formula with a worked example
  - the scrape → putty → primer rule for emulsion over distemper
  - room-by-room picks
  - 10-year cost reasoning
  - live deals
- **Fact rule:** no brand coverage figures are invented. The post tells readers to check the tin. Every price quoted comes from a DB-verified row.

## Post
| Field | Value |
|---|---|
| id / slug | #576 `distemper-vs-emulsion-paint-which-to-buy-india` |
| Words | about 1,520 prose (1,623 raw tokens including table pipes) |
| seoTitle | "Distemper vs Emulsion Paint: Which to Buy in India (2026)" (57 chars) |
| seoDesc | 155 chars, unique |
| Tags | paint, home-improvement, buying-guide, home-decor |
| GEO patterns | answer-first "Short answer", comparison table, numbered how-to steps, worked calculation, decision table, 5-Q FAQ |
| Internal links (all prod 200) | `/magic-paints-ajooba-acrylic-distemper-wall-paint-20-l-daffodil-b0d97xyzn1` (₹1,311), `/magic-paints-ajooba-acrylic-distemper-wall-paint-10-l-daffodil-b0d97x2wly` (₹708), `/nippon-paint-quick-coat-interior-emulsion-10-kg-white-b0dsvcfdbn` (no price stated), `/sadolin-by-dulux-pu-wood-polish-gloss-4l` (₹1,231), `/offers` |
| In-body images | none (so no alt-text risk) |
| Cover | `https://richdeals.sfo3.digitaloceanspaces.com/og/distemper-vs-emulsion-paint-which-to-buy-india.png` (200, present in the page HTML) |

## Freshness
1. `insert-blog-mdmeta.mjs` IndexNow returned **HTTP 200**.
2. Prod `/blog/<slug>` returned 200 with `<title>` = seoTitle.
3. `sitemap.xml` is ISR with a 1800 s revalidate.
4. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,988 = 14,988 |
| API newest id vs DB max | 15,531 = 15,531 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 447 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 1 (next CONTENT-SEO tick ~06:09 IST) |
| Broadcast cursor vs DB max | `lastId` 15,527 (file re-read) vs 15,531, draining |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new):
- Playwright MCP is hung. Amazon is verified by curl with the mobile-UA fallback, and Flipkart PDPs cannot be verified.
- reticle MCP failed to connect. It is not used by any tick.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync.
