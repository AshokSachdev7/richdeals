# IFS tick 2026-09-25bj — indiafreestuff ingest

**26 deals live** (ids 11316–11341): 24 from Amazon, 1 from Flipkart and 1 from Myntra, pushed with `apps/api/scripts/push-ifs-0925bj.mjs`.
The bulk response returned `count: 26` and every row came back `created: true`. IndexNow returned **HTTP 200 for 29 URLs** (26 slugs + 3).

## Funnel

| Stage | Count |
|---|---|
| Slugs from the homepage, `/deals` p1–p2 and `/deals/superdeals` | 100 |
| New (not in the seen index) | 54 |
| Rejected before resolving: 3 min-buy duplicates, Nyrika sarees sale hub, Get Fresh figs (grocery) | −5 |
| Buy Now resolved | 49 |
| Rejected after resolving: min buy 2 (#1), Haier price needs a coupon plus an SBI card (#22), Prowl promotion page (#39) | −3 |
| DB duplicates (already LIVE as 4264, 6555, 4258, 1835) | −4 |
| Ajio #49: curl returned 403, price unverified | −1 |
| Amazon price drift (#5, #14, #35, #42, #47) | −5 |
| Amazon price only reachable with a coupon (#18, #19, #21, #30, #37) | −5 |
| Amazon price read null (#24) | −1 |
| Flipkart price drift (#7, #15, #25, #28) | −4 |
| **Pushed live** | **26** |

## Gates in the push script

- Amazon price, M.R.P., stock and image are loaded from the product-page read (`az0925bj.json`), not retyped. Cello (₹312 vs IFS ₹313) and Ezra (₹113 vs ₹114) are within the ±₹1 gate.
- Title ₹ equals the price, and every `at ₹X` in the copy is checked against the price. Price must be an integer below M.R.P. Stock must read In stock or "only N left".
- Images: Amazon uses `m.media-amazon.com` `_SL1500_`, Flipkart uses `rukmini1.flixcart.com` 1500×1500, and Myntra uses `assets.myntassets.com` h_1440 (a new gate branch). Every image returned 200.
- Myntra is wrapped in InRDeals (`inr.deals/track?id=inr678975705…`), not Cuelinks. Flipkart uses `/p/itm…?pid=…&affid=djhackraj`.
- The slug helper now strips accents, so Lakmé gives `lakme-…` and not `lakm-…`.
- Every deal has exactly 4 howTo steps. Slugs and product ids are unique.

## Notes on the copy

- GOVO GOKIXX 400: the title says 9 hours of playback but a bullet says 8. The copy tells readers to plan for about 8.
- Duke slip-on (Myntra): only UK 8 and 10 were in stock when checked. The copy says so.
- Bewakoof, Femmora and Philips WiZ each had only 1 left in stock. The stock line says so.
- The Uniboom and UNICRON TVs are HD Ready (720p). The copy says so and points readers to the page's service and warranty terms.

## CEO audit

- DB: 10,994 live deals, 0 pending, 0 with a null price, 0 with a null image; highest deal id 11341.
- Posts: 331; 0 without a cover and 0 without SEO fields.
- Posts per IST day:

  | Date | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | 09-25 |
  |---|---|---|---|---|---|---|---|---|---|
  | Posts | 3 | 3 | 3 | 2 | 1 | 3 | 2 | 3 | 4 |

  No day is 0. Today is at the cap of 4.
- The broadcast cursor is at 11315 against a DB max of 11341. The gap is this batch, which the external cron is draining. This is not rot.
- Prod: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` and the new Duke page all return 200.
- There were no unpushed commits before this one.
