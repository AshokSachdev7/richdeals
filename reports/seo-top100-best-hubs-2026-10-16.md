# SEO: top-100 deal index gate + 10 new /best hubs (2026-10-16)

The code is commit `216e250`. Deploy `d609fad6` is ACTIVE on prod.

## Index gate

- **Who decides:** `GET /api/deals/top-indexable` returns 100 slugs on prod. It picks the top LIVE deals by click count that pass the quality gate:
  - has a price and an image
  - created in the last 120 days or less
  - discount of 20% or more, or a description of 200+ characters
- **Deal pages:** only those 100 get `index, follow`. Every other deal gets `noindex, follow`. They stay live and crawlable, so link equity still flows.
- **Fail-safe:** if the API fails, no deal is indexable for up to 30 minutes (the ISR window). This avoids flooding the index again.

### Verified on prod

| URL | Robots tag |
|---|---|
| `/vivo-x300-fe-5g-noir-black-...-B0GX9K` (top 100) | `index, follow` |
| `/milton-prudent-350-thermosteel-bottle-360ml-b0f1t79b57` (not top 100) | `noindex, follow` |

### Sitemap on prod: 537 URLs

| Type | URLs |
|---|---|
| Deals | 99 (100 counting one short slug) |
| Blog posts | 383 |
| `/best` index + topic pages | 15 |
| Stores and categories | 22 |
| Other static pages | 18 |

## New pages

- `/best`: an index of all buying guides, with BreadcrumbList and ItemList schema. It is linked from the footer and `llms.txt`.
- **10 new topic hubs:** wireless-earbuds, power-banks, smartwatches, perfumes, backpacks, wireless-mouse, lunch-boxes, mixer-grinders, trimmers, water-bottles.
- **What each hub has:**
  - live deals, filtered by tightened include/exclude regexes so junk products don't leak in
  - a buyer checklist
  - a 3-question FAQ with FAQPage schema
  - a unique title (60 characters or fewer) and meta description
- **Live deal count per hub:**

  | Hub | Deals |
  |---|---|
  | earbuds | 32 |
  | power banks | 27 |
  | smartwatches | 52 |
  | perfumes | 51 |
  | backpacks | 25 |
  | mouse | 38 |
  | lunch boxes | 53 |
  | mixer grinders | 47 |
  | trimmers | 41 |
  | water bottles | 18 |

- All 15 `/best` URLs return 200 on prod.

## IndexNow

| Ping | URLs | HTTP status |
|---|---|---|
| `/best`, 14 hubs, `/sitemap.xml`, `/offers`, `/llms.txt`, `/llms-full.txt`, `/blog`, `/` | 21 | 200 |
| Top-100 deal slugs (slug mode) | 103 | 200 |

## CEO audit

- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and `/best` all return 200 in 0.09–0.72s.
- **Unpushed commits:** 0 before this report.
- **Blog:** 1 post so far today (IST). The CONTENT-SEO cron covers the 2–3 per day rule.
