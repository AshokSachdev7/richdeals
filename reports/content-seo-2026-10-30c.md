# CONTENT-SEO: 2026-10-30c (~18:38 IST)

**Result: 1 original TOFU how-to published (post #578, `/blog/henna-and-indigo-for-grey-hair-two-step-method-india`). This is the 3rd post of 10-30 IST, so the 2-3/day rule is met and the cap of 4 is not reached. IndexNow returned HTTP 200. A 1200x630 cover was uploaded to DO Spaces, and the post returns 200 on prod. CEO audit clean.**

Before writing, today's posts were counted in IST: 2 (distemper-vs-emulsion 00:59, sata-vs-nvme 06:42). The topic rotates to TOFU after those two BOFU comparisons. A slug search for `henna|indigo|hair-col|grey-hair|gray-hair` found no existing posts, so this is a fresh cluster and not one of the saturated near-dup clusters (best-X-under-Y, free-samples). It is anchored on #15571 Indalo indigo powder, which the IFS 10-30g tick pushed.

## Post
| Field | Value |
|---|---|
| Slug | `henna-and-indigo-for-grey-hair-two-step-method-india` |
| H1 | Henna and Indigo for Grey Hair: The Two-Step Method for Natural Black (India Guide) |
| Length | 1,420 words |
| seoTitle | "Henna and Indigo for Grey Hair: 2-Step Natural Black Guide" (58 chars) |
| seoDesc | 159 chars |
| Tags | henna, indigo, hair-colour, grey-hair, how-to |
| Cover | `og/henna-and-indigo-for-grey-hair-two-step-method-india.png` (gen-blog-covers.mjs), alt = post title |
| In-body images | none |

**Keyword research:** WebSearch on "henna and indigo for grey hair", the two-step method, indigo timing and the 72 h window, and henna:indigo ratios. Top-ranking guides read: hennasooq, thehennaguys, pushphenna, heathermeeker, thecoloursofnature. The gap: they are US/UK-focused and none lists Indian prices. Our angle is India-specific powders with live prices, a fix-it FAQ, and a strand-test step.

**GEO patterns used:** a **Short answer** paragraph first, a one-step vs two-step comparison table, a ratio table, numbered steps, question-style H3s for the problems, and a closing checklist. There are no fabricated stats. Timings are given as ranges taken from the sources, with a "check your pack" caveat.

**Internal links (all live deal pages):**
- #15571 Indalo indigo ₹99
- Lass Naturals brown henna ₹149
- Mamaearth henna paste ₹125
- Nisha Nature Mate ₹78
- Dabur Vatika henna shampoo 1 L ₹299
- `/offers`

## Freshness
- `insert-blog-mdmeta.mjs` upserted id 578 with 5 tags and pinged IndexNow: **HTTP 200**.
- `/blog/henna-and-indigo-for-grey-hair-two-step-method-india` returns 200 on prod.
- The post reaches `sitemap.xml` through ISR (1800 s). `llms.txt` and `feed.xml` are dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 15,029 = 15,029 |
| API newest id vs DB max | 15,581 = 15,581 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 449 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4. **10-30: 3** (rule met) |
| Broadcast cursor vs DB max | `lastId` 15,575 vs 15,581, up from 15,570. The broadcast is draining; this is lag, not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- Playwright MCP is hung this session:
  - IFS Flipkart cards are dropped.
  - TG reads only 5 of 13 groups.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171).
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate; #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose on a handful of deals (see seo-audit-fix 10-30).
- Rotate the DO API token.
