# CONTENT-SEO: 2026-11-01a (~00:45 IST)

**Result: 1 original TOFU post published (#584, ukulele size guide). IndexNow returned HTTP 200. Cover generated and uploaded. The post and all 5 internal links return 200 on prod. 11-01 IST is now at 1/4. CEO audit clean.**

## Post
| Field | Value |
|---|---|
| id | 584 |
| Slug | `/blog/ukulele-size-guide-soprano-vs-concert-vs-tenor` |
| Funnel stage | TOFU. It follows the BOFU posts that capped 10-31 |
| Words | ~1,770 (`wc -w`, which counts table markup) |
| seoTitle (55 chars) | Ukulele Size Guide: Soprano vs Concert vs Tenor (India) |
| seoDesc (157 chars) | Soprano, concert or tenor ukulele? Compare sizes, scale length, tone and tuning, see which size suits kids, adults and big hands, and what to check in India. |
| Tags | ukulele, musical-instruments, buying-guide, beginners |
| Cover | `richdeals.sfo3.digitaloceanspaces.com/og/ukulele-size-guide-soprano-vs-concert-vs-tenor.png`, HEAD 200. Alt text = post title, from the template |
| Prod | 200 in 0.77 s |

## Cluster check
- 454 slugs existed before this post. None covered ukulele, guitar or musical instruments, so this is a new cluster.
- It avoids the saturated near-duplicate clusters (best-X-under-Y, free-samples).

## Keyword research
- **Global SERP:** the leader is Yousician's ukulele-sizes post, about 1,200 words. Prices are in USD only. It has nothing on scale length, setup or action, strings, or care.
- **India SERP:** results are Bajaao collection pages plus a Torrins blog. No India guide gives INR prices or tells readers what to check before buying.
- **Gaps this post fills:**
  - a scale-length table
  - action and setup
  - strings settling in after a new set
  - what's in the box (tuner)
  - return policy
  - monsoon and AC care
  - links to live deals with a dated price

## GEO patterns
- A `**Short answer:**` paragraph that answers the question first.
- 2 comparison tables (sizes, and a choose-by-situation table).
- Key facts in bold.
- An FAQ with 5 questions as H3s.
- A dated price statement ("₹1,709 when we checked on 1 November 2026") taken from the deal row.
- No invented specs: lengths are labelled as approximate ranges.

## Internal links (all 200 on prod)
| Link | Status |
|---|---|
| `/juarez-estrella-23-inch-concert-ukulele-spruce-top-b08h11gtg2` (#15903, ₹1,709 / ₹6,990) | 200 0.21 s |
| `/offers` | 200 0.13 s |
| `/guitar-ukulele-bass-fretboard-oil-conditioner-wipes-maintain-for-guitar-acoustic-b0ds2fl6mg` | 200 0.26 s |
| `/arctic-ar-gh-01-guitar-wall-mount-hanger-with-rubber-padded-hook-b07gdzmpld` | 200 0.24 s |
| `/amazon-basics-folding-guitar-stand-electric-bass-acoustic-b0cglfdp2j` | 200 0.21 s |

## Freshness
- `insert-blog-mdmeta.mjs` upserted the post and pinged IndexNow: **HTTP 200**.
- The sitemap is ISR (1800 s), so the post shows up within 30 minutes.
- `/feed.xml` and `llms.txt` are dynamic.
- No new static route was added.

## CEO audit (~00:45 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.32 s, `/offers` 0.19 s, `/blog` 0.73 s, `/sitemap.xml` 0.18 s, `/feed.xml` 0.13 s, `/llms.txt` 0.41 s, `/api/deals` 0.13 s, `/robots.txt` 0.16 s |
| API total vs DB LIVE | prod 15,351 = local 15,351 = DB 15,351 |
| DB max id | 15,906 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 455 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4, 11-01: 1 (more posts due on cadence) |
| Broadcast cursor vs DB max | `lastId` 15,906 = max. Fully drained |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of the 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting.
- #1665 and #1656 have no ld+json price.
- #6405 and #6426 need someone to look at the product page by hand.
- Prose drift on deals outside the top 100: 118 descriptions and 32 titles.
- The DO API token needs rotating.
