# CONTENT-SEO: 2026-10-31c (~13:13 IST)

**Result: 1 TOFU explainer published (#582). It returns 200 on prod with Article and FAQPage JSON-LD, the cover is on DO Spaces, and IndexNow returned 200. 10-31 IST is now at 3 of the 4-post cap. CEO audit clean.**

## Post
| Field | Value |
|---|---|
| URL | https://richdeals.in/blog/are-smart-bmi-scales-accurate-body-fat-readings-explained-india |
| id | 582 |
| seoTitle | "Are Smart BMI Scales Accurate? Body Fat Readings Explained" (58) |
| seoDesc | "How smart BMI scales estimate body fat, why readings jump daily, the lower BMI cutoffs for Indians, who should skip body fat mode, and a 5-step weigh routine." (158) |
| excerpt | 158 chars |
| Length | About 1,450 words of prose (1,712 whitespace tokens including table markup), 9,833 chars |
| Tags | health-fitness, explainer, weighing-scale, smart-scale |
| Cover | `og/are-smart-bmi-scales-accurate-body-fat-readings-explained-india.png` (200) |
| Funnel | TOFU. It rotates after 10-31b, which was BOFU (sandwich maker) |
| Prod | 200 (0.88 s). `<title>` is correct. JSON-LD: Article, FAQPage (5 Q/A), BreadcrumbList |

## Keyword research
- **Query:** "are smart BMI body fat scales accurate how bioelectrical impedance works India".
- **Top 3 SERP reads:**
  - **Apollo Pharmacy:** basic H2s and the Indian overweight band only. No table, no waist cutoffs, no routine.
  - **medboundtimes:** a list of confounders (hydration, food, exercise, menstrual cycle) and of groups with larger error. No numbers and no routine.
  - **SlashGear** (JMIR mHealth study): good for trends, foot-to-foot measures the lower body only, DEXA is the reference. Nothing India-specific and no safety section.
- **Gaps filled:**
  - a full table comparing WHO and Indian adult BMI cutoffs;
  - Indian waist cutoffs (90 cm for men, 80 cm for women);
  - a table of which app metrics are measured and which are estimated;
  - a 5-step weighing routine;
  - the pacemaker and pregnancy warnings, phrased as what manufacturer manuals advise;
  - a comparison of a BIA scale, a gym machine, DEXA and a measuring tape;
  - a buying checklist with live India deals.
- **Saturation check:** scales had only `kitchen-weighing-scale-vs-body-weight-scale-india-2026`. Smartwatch (8+ posts) was avoided. No near-duplicate slug exists.

## GEO patterns
- An answer-first **Short answer:** paragraph.
- 4 comparison tables.
- Numbered steps.
- A 5-question FAQ that is visible on the page and matches the FAQPage schema.
- The answer to "measured vs calculated" is stated plainly.
- No fabricated statistics. Error is described as "several percentage points", which matches the sources.

## Internal links (all 200 on prod)
- `/cult-active-digital-body-weighing-scale-180-kg-with-lcd-blue-b0h4gyfd58` (#15756)
- `/homebasic-digital-weight-machine-180-kg-b0fkn9g3xv` (#15779)
- `/ant-flora-prism-digital-bathroom-weighing-scale-b0dv5jp9vl` (#15781)
- `/chillaxplus-bluetooth-smart-bmi-body-weighing-scale-b09nmc2pzk` (#15788)
- `/blog/kitchen-weighing-scale-vs-body-weight-scale-india-2026`
- `/offers`

The post has no in-body images, so the cover's alt comes from `post.title`.

## Freshness
- `insert-blog-mdmeta.mjs` sent the IndexNow ping and got **HTTP 200**.
- The sitemap blog child is ISR (1800 s). `llms.txt` and the feed are dynamic. No new static route was added.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.11–0.63 s) |
| API total vs DB LIVE | prod 15,235 = local 15,235 = DB 15,235 |
| API newest id vs DB max | 15,789 = 15,789 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 453 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: **3** |
| Broadcast cursor vs DB max | `lastId` 15,760 vs 15,789. The file's ts is 5 minutes old (13:09 IST). It is draining the IFS 10-31g batch (#15756–#15789), so this is not rot |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md` |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting. #1665 and #1656 have no ld+json price. #6405 and #6426 need someone to look at the product page by hand.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
