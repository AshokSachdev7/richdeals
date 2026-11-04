# CONTENT-SEO 2026-11-04b (~07:20 IST)

**Result: 1 post shipped. 11-04 IST is now at 2 posts, which meets the 2-3/day rule (cap 4).** The post is `/blog/room-heater-electricity-consumption-units-per-hour-bill-india` (id 590). It is a TOFU/informational post, rotated after this morning's body-lotion post. Prod returns 200, the cover returns 200, and IndexNow returned HTTP 200.

## Post

| Field | Value |
|---|---|
| Slug | `room-heater-electricity-consumption-units-per-hour-bill-india` (free before insert; not a near-dup of the existing heater posts) |
| seoTitle | "Room Heater Electricity Consumption: Units & Bill (India)" (57 chars) |
| seoDesc | 155 chars |
| Excerpt | 160 chars |
| Length | ~1,590 words (`wc`, including markdown) |
| Tags | room heater, electricity bill, winter, home appliances, buying guide |
| Cover | `og/room-heater-electricity-consumption-units-per-hour-bill-india.png` on DO Spaces (200). `alt` = post title |
| In-body images | none (so no alt text needed) |

**Keyword research:**
- Query cluster: room heater units per hour, 2000W heater consumption, room heater monthly bill, oil vs fan heater electricity.
- SERP read: bajajfinserv, Croma Unboxed, indiatvnews, KPDCL, housegyan.
- Gap the post fills: no ranking page has a per-wattage table (400-2500W) combined with a monthly table, a thermostat/slab explanation, and live deals.

**GEO patterns used:**
- A `**Short answer:**` summary in the first 100 words.
- The formula stated explicitly.
- 3 tables: units/hour by wattage, monthly bill, and choice by room.
- A 7-step list.
- 5 FAQs.

**No invented facts:**
- All the numbers are arithmetic (watts ÷ 1,000 × hours).
- ₹8/unit is flagged as an example tariff throughout, and the reader is told to use their own DISCOM slab.

**Internal links (7):**
- 4 live deals, all LIVE at write time:
  - #12778 Longway 800W
  - #12839 Venus 950W carbon
  - #15381 Techking 1200W
  - #9956 Orient Areva 2000W
- `/offers`
- `/blog/best-room-heaters-india-winter-guide`
- `/blog/quartz-vs-halogen-vs-carbon-heater-difference-india`

## Freshness

- **IndexNow:** pinged via `insert-blog-mdmeta.mjs` → HTTP 200.
- **Sitemap:** the blog child is ISR, so the post appears within ≤30 min.
- **llms.txt:** force-dynamic, built from `getPosts()`, so it picks the post up per request.

## CEO audit (07:20 IST)

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` | 8/8 200 | ok |
| DB LIVE / prod API total | 15,582 / 15,582 | equal |
| DB max id | 16,146 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 461 / 0 / 0 | ok (+1) |
| Posts per day (IST) | 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4, **11-04:2** | 11-04 meets the rule. 11-01 (1) and 11-02 (0) are past misses and can't be undone |
| Broadcast cursor | lastId 16,146 vs max 16,146 (file re-read) | drained |
| Crons | 9/9 (CronList matches the roster) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **The next CONTENT-SEO run (12:32 IST) can add a 3rd post for 11-04.** It is optional and must stay ≤4.
- **16 unresolved bare Flipkart links:**
  - With a known itm id: #12919, #12958, #1396, #12771, #15066.
  - Without: #12263, #12380, #12111, #12215, #12216, #12379, #12155, #12153, #12168, #12212, #12213.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:** #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- **#2913's description still mentions the HDFC EMI offer.**
- **#6409 is only 7% off.**
- **Reticle is CONNECTION_CLOSED.** Not needed.
- **The DO token needs rotating.** Owner's job.
