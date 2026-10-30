# CONTENT-SEO: 2026-10-31a (~00:45 IST)

**Result: 1 post published, #580 `how-to-descale-electric-kettle-limescale-hard-water-india`. It is a TOFU how-to (the last post was BOFU). It has a cover image, IndexNow returned HTTP 200, and the page serves 200 on prod. 10-31 is now at 1/4 posts (IST), against the 2-3/day rule. The remaining CONTENT-SEO ticks today (:09 every 6h) need to add 1-2 more posts. CEO audit is clean.**

## Post
| Field | Value |
|---|---|
| URL | https://richdeals.in/blog/how-to-descale-electric-kettle-limescale-hard-water-india |
| seoTitle | "How to Descale an Electric Kettle (Hard Water, India)" (53 chars) |
| seoDesc | 159 chars |
| excerpt | 158 chars |
| Length | about 1,500 words (1,600 tokens including table markup) |
| Tags | kitchen-appliances, how-to, electric-kettle, cleaning |
| Cover | `og/how-to-descale-electric-kettle-limescale-hard-water-india.png` on DO Spaces; the `alt` is the post title |
| Funnel | TOFU how-to, linked to BOFU deal pages |

## Keyword research
- The angle is "how to descale electric kettle", plus the long tails "white deposits", "limescale", "hard water", "vinegar vs citric acid" and "how often".
- The top results were Which?, KitchenAid, Wonderchef (whose page was fetched and read), NDTV Shopping (403 on fetch), hg.eu and canstarblue.
- Gaps in the Wonderchef page, which is the only India-specific result:
  - no citric-acid quantity
  - no warning to check the manual or warranty
  - no vinegar-fume caution
  - no way to gauge your own water hardness
  - no frequency guide by water source
- The post covers all of those, including a frequency table by water source (RO, municipal, tanker or borewell).
- Saturation check: only two kettle posts existed, both "best X" lists. There was no maintenance or how-to post, so this one does not duplicate a cluster.

## GEO patterns applied
- Answer-first **Short answer** paragraph with exact quantities and times.
- Two comparison tables: methods (amount, soak, smell, best for) and frequency by water source.
- Numbered 9-step procedure.
- "What not to do" list.
- 5-question FAQ written in Q&A form.
- No fabricated stats or prices; the deal links say "check the live price".

## Internal links (all 200 on prod)
- `/blog/best-electric-kettles-india-2026`
- 4 live deal pages:
  - `/judge-by-prestige-ace-electric-kettle-1-5-l-b0dkfwv2k8`
  - `/wonderchef-crescent-electric-kettle-1-5l-b0bm9vp9j5`
  - `/cadlec-aquanix-1-8-litre-stainless-steel-electric-kettle-b0ds1hsldy`
  - `/pigeon-swift-plus-1-5l-multi-cook-kettle-with-steamer-blue-b0cqm62nkj`
- `/offers`

## Freshness
- IndexNow was pinged through `insert-blog-mdmeta.mjs`: **HTTP 200**.
- The prod post page returns 200 on the first try, with the title and the og cover in place.
- `sitemap.xml` (ISR 1800 s) and `llms.txt` (force-dynamic) pick up the post from `getPosts()`.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.09–0.57 s) |
| API total vs DB LIVE | 15,138 = 15,138 |
| API newest id vs DB max | 15,692 = 15,692 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 451 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 1 (so far) |
| Broadcast cursor vs DB max | `lastId` 15,692 = 15,692, fully drained |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- The Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose remains on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
