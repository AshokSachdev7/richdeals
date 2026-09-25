# CONTENT-SEO tick: 2026-09-25ax (18:21 IST)

**1 post published: "Car Charger Buying Guide: Watts, PD vs QC" (id 390). IndexNow returned 200 and the cover is live. That makes 4 posts today in IST, the daily cap.**

## Pre-check
Before this tick there were 3 posts today (IST), so one more was allowed.

## Keyword research
- **Clusters to avoid:** the container/jar cluster is saturated (2 posts), and the free-samples and best-X-under-Y clusters are also saturated.
- **Cluster chosen: car chargers.** There was no existing post on the topic, and about 10 LIVE deals to link to.
- **SERP:** mostly thin Alibaba buying guides plus wozoyo.com, so competition is low. The query is not seasonal.
- **Gaps the post covers:**
  - total vs per-port wattage, and the shared-power trap
  - PD vs QC vs PPS (Samsung needs PPS)
  - brand-only protocols fall back to PD/QC speed
  - cable limits: 3A cables cap at 60W, above that needs 5A e-marked
  - socket stays live after ignition off in some cars
  - heat throttling
  - real price bands from our deals

## Post
| Field | Value |
|---|---|
| Slug | `/blog/car-charger-buying-guide-watts-pd-qc-india-2026` |
| seoTitle | 54 characters |
| seoDesc | 156 characters |
| Length | about 1.5k words: short-answer lead, 4 tables, "Our pick", 5-question FAQ |
| Internal links (all 200) | 5 LIVE deals (Zebronics, AGARO, Kratos, Ambrane, Ailkin), 2 posts (GaN charger, power banks), `/offers` |
| In-body images | none, so no alt text needed; the cover alt text is the title |
| Publish | `insert-blog-mdmeta.mjs`: upserted, 5 tags, **IndexNow HTTP 200** |
| Cover | `gen-blog-covers.mjs` → `og/car-charger-buying-guide-watts-pd-qc-india-2026.png` |
| Live check | 200, `<title>` correct, og:image = cover |

## CEO audit (checked against the DB)
| Check | Result |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| LIVE deals / pending review | 10899 / 0 |
| Deals with a null price or null image | 0 / 0 |
| Posts | 331. None missing a cover, none missing SEO fields |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **4** (cap reached, write nothing more today) |
| Broadcast cursor | 11246, equal to the DB max 11246 |
| Unpushed commits | 0 before this commit |

## In flight
IFS tick 0925av: all 88 Buy Now links are resolved. Next are dedup, PDP verify and push; its report will be `tick-2026-09-25av-ifs.md`.
