# CONTENT-SEO: 2026-10-30d (~18:45 IST)

**Result: 1 post published, `laptop-privacy-screen-filter-size-guide-india` (id 579, ~1,480 words). It was upserted through `insert-blog-mdmeta.mjs`, which returned IndexNow HTTP 200. `gen-blog-covers.mjs` then generated and uploaded the cover. The post returns 200 on prod. Today (10-30 IST) now has 4 posts, so the daily cap is reached and no more posts should go out today. CEO audit clean: 450 posts, 0 coverless, 0 seo-less.**

IST count before publishing was 3/4: #576 distemper-vs-emulsion (00:59), #577 sata-vs-nvme (06:42) and #578 henna-and-indigo (13:07). The last two posts were TOFU/how-to, so this one is a BOFU buying guide. Saturated clusters were avoided: power bank, dinner set, massage, soundbar, USB hub, best-X-under-Y and free-samples. A slug scan for `privacy|screen-filter|anti-glare` found no existing post.

## Post
| Field | Value |
|---|---|
| Slug | `laptop-privacy-screen-filter-size-guide-india` |
| H1 | Laptop Privacy Screen Filter: How to Pick the Right Size, Type and Mount |
| Length | ~1,480 words (8,214 chars) |
| seoTitle | "Laptop Privacy Screen Filter: Size, Type and Mount Guide" (56 chars) |
| seoDesc | 160 chars |
| Tags | laptop-accessories, privacy-screen, work-from-home, buying-guide, how-to |
| Cover | `og/laptop-privacy-screen-filter-size-guide-india.png` on DO Spaces, alt = post title |
| In-body images | none, so there was no alt text to fill |

**Keyword research.** Two WebSearch passes covered "laptop privacy screen filter size guide" and "privacy filter 16:9 vs 16:10 magnetic vs adhesive", and the top SERP pages were read. They agree on four points:
- Measure the active display area, not the bezel.
- Matching the aspect ratio matters as much as the diagonal.
- 2-way filters suit laptops, while 4-way filters are dimmer.
- Magnetic mounts suit frequent removal, but some are not touch-compatible.

The gap: the SERP is mostly thin vendor and affiliate listicles. None of them is India-specific, and none gives a worked size table in mm.

**GEO patterns** (`.claude/geo-rewrite-playbook.md`):
- an answer-first `**Short answer:**` lead
- a mechanism explanation (micro-louvres, angle not distance)
- numbered measuring steps
- a resolution → ratio lookup
- a computed size table in mm and inches
- a mount comparison table
- question-style H3s
- a decoded model-name example (Kensington "W10" = 16:10)
- a checkbox buying checklist

Every claim is a mechanism or arithmetic. No fabricated stats.

**Internal links** (all return 200 on prod):
- `/kensington-fp141w10-14-1-inch-laptop-privacy-screen-filter-b0821bvqrr` (#15615, LIVE ₹646)
- `/wecool-4-port-usb-hub-b0c77b4gzr` (#15628, LIVE ₹249)
- `/offers`

## Freshness
- IndexNow returned HTTP 200 on publish via `insert-blog-mdmeta.mjs`.
- `sitemap.xml` blog child is ISR (1800 s), so it picks up the post within 30 min. `llms.txt` is force-dynamic. `feed.xml` returns 200.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 15,082 = 15,082 |
| API newest id vs DB max | 15,635 = 15,635 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 450 total (+1), 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4. 10-30: 4 (cap reached) |
| Broadcast cursor vs DB max | `lastId` 15,635 = 15,635 (re-read this tick; fully drained) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS and DesiDime Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
