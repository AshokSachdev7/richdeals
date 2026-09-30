# CONTENT-SEO tick — 2026-09-30c (12:20 IST)

## Gate
Before this tick, 2 posts had been published today (IST). That is under the cap of 4, so I wrote 1 post.

## Keyword research
DataForSEO is paused, so I read live Google results in the Playwright browser (`gl=in`).

| Query | AI Overview? | Who ranks |
|---|---|---|
| "15w vs 33w charging time" | No | Weak results: youtube, honor, mi, mobility.com.ng, reddit, quora. **Low competition.** |
| "how long does 6000mah battery take to charge with 15w" | Yes | Calculator sites and quora |
| "phone charger watt guide india" | Yes | Small sites |

- **"People also ask" questions**, answered in the post's FAQ and body:
  - 15W vs 30W
  - 33W charging time for 6000 mAh
  - 5000 mAh at 15W
  - 100W charger on a 25W phone
  - 65W too much?
- **Why this topic:** it is evergreen and not seasonal. It is not a near-duplicate of the saturated best-X-under-Y or free-samples clusters. It ties to our biggest traffic source, the vivo phone deal pages.

## Published
- **Post:** `/blog/phone-charging-time-15w-vs-33w-vs-44w-battery-guide-india` (post id 411)
- **seoTitle** (53 chars): "Phone Charging Time: 15W vs 33W vs 44W (5000–6500mAh)"
- **seoDesc:** 152 chars
- **Length:** about 1,600 words of prose (1,698 by raw `wc`, which counts table pipes).
- **Content:** opens with a short answer, then:
  - the Wh formula
  - a charging-time table from 10W to 80W+ for 5000, 6000 and 6500 mAh batteries (all figures labelled as typical ranges)
  - why charging slows near full (CC/CV taper) and how much a 30-minute top-up gives
  - charging protocols (USB-PD/PPS vs brand-specific) and cable ratings (3A / 5A)
  - fast charging and battery health
  - a pre-purchase checklist and a 5-question FAQ
- **Internal links:**
  - vivo Y05 deal page (our #2 page by impressions, 6500 mAh + 15W)
  - `/offers`
  - `/blog/why-20000mah-power-bank-charges-phone-twice`
  - `/blog/wireless-power-bank-vs-wired-india-2026`
- **Images:** none in the body. The cover is from `gen-blog-covers.mjs`, uploaded to DO Spaces as `og/<slug>.png`; the page renders its alt text from the post title.
- **IndexNow:** HTTP 200, sent by `insert-blog-mdmeta.mjs`.
- **Prod:** `/blog/<slug>` returns 200.

## CEO audit (checked against the DB)
- **Deals:** LIVE 11,615 · PENDING 0 · LIVE with null price 0 · LIVE with null image 0 · max id 11987
- **Posts:** 350 · without cover 0 · without SEO fields 0
- **Posts per day (IST):** 09-26 = 4, 09-27 = 4, 09-28 = 4, 09-29 = 4, 09-30 = **3**
- **Broadcast cursor:** 11987, equal to the DB max
- **Prod endpoints:** all 7 return 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`)
- **Unpushed commits:** 0 before this report
- **Rot:** none. The only open issue is external: DataForSEO is paused, and the owner has to email their support.
