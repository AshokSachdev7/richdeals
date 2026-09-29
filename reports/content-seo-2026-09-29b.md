# CONTENT-SEO tick: 2026-09-29b (06:20 IST)

## Pre-check
- Posts published today (IST): 1, which is below the cap of 4, so 1 post was written.

## Keyword research
- Target: "LED light wattage by room size / how many lumens for a 10x12 room (India)". Informational, evergreen, not seasonal, low competition.
- Top SERP results (Wipro Lighting blog, econstru, pressfitindia, hunker) only give the lux math. Our gap is a ready room-by-room chart for Indian room sizes, plus watt conversion and colour temperature.
- No near-duplicate slug. Existing lighting posts are best-smart-bulbs and best-led-bulbs-save-electricity, which cover different intent.

## Post
| Field | Value |
|---|---|
| Slug | `/blog/led-light-wattage-by-room-size-india` (id 405) |
| seoTitle | "LED Light Wattage by Room Size: Lumens Chart for India" (54 chars) |
| seoDesc | 155 chars |
| Body | about 1,540 words of prose: short-answer opener, room chart table, ceiling/wall adjustments, colour temperature, fixture types, downlight count, mistakes, FAQ |
| Internal links (all 200) | 4 live deal pages (Philips Ujjwal batten, Murphy Uno downlight, Wipro Garnet 8W, Panasonic motion sensor bulb) + wire-size blog post + /offers |
| Images | No in-body images. Cover is on DO Spaces, alt = post title |
| JSON-LD | Article, BreadcrumbList, FAQPage |

## Publish
- `insert-blog-mdmeta.mjs`: upserted with 3 tags. **IndexNow returned HTTP 200.**
- `gen-blog-covers.mjs`: generated 1 cover. Coverless posts now 0.
- Live page returns 200 with the right title and h1. The cover appears in og and img. The URL is present in the llms.txt blog list.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,485 = API total (max id 11832) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 345; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · **09-29 2** |
| Broadcast cursor | 11832 = DB max |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **1 post live, IndexNow 200, cover OK, 0 rot.**
