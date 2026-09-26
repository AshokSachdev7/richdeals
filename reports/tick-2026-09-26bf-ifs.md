# DEAL-INGEST indiafreestuff tick 2026-09-26bf (22:33 IST)

**4 deals pushed LIVE, all Amazon. `/admin/deals/bulk` returned 201 with count 4 and created all 4. IndexNow returned HTTP 200 for 7 URLs (4 slugs + 3).**

## Sweep
- Read the IFS homepage and `/deals/index` pages 1–3, with at least 2.6 s between requests. Found 17 slugs that were new since 26ba.
- Dropped three before resolving:
  - Spigen: category post.
  - Shyam Harvest dry fruits: grocery.
  - SACK CO tote: already live from TG 26bd.
- The other 14 were resolved from their base64 `?rto=` Buy Now id to the real store URL.
- Prisma dedup by `productId` against the live DB found 0 already live.
- Price checks:
  - **Amazon:** every row re-read on the PDP with a same-origin fetch in the logged-in tab. Checked the `#centerCol` price and M.R.P., the add-to-cart button, the clip-coupon flag, the rating and `data-old-hires`.
  - **Flipkart:** read from ld+json.

## Pushed (ids 11523–11526)
| Store | Product | Price / M.R.P. | Rating |
|---|---|---|---|
| Amazon | Bambalio BG-200 40W glue gun | 189 / 399 | 3.7★ (10) |
| Amazon | Lifelong LLKS17 kids scooter | 999 / 4,999 | 4.2★ (8,376) |
| Amazon | Patriot Signature DDR4 16GB (2×8) 3200 | 10,599 / 23,000 | 4.5★ (134) |
| Amazon | Sattva Classic XXXL bean bag cover | 692 / 4,299 | 3.8★ (139) |

- All copy is original: 3 sentences each plus a variant note. The only ₹ figure in the copy is the live price.
- All images come from `m.media-amazon.com`.
- Checked `/out/11523` and `/out/11525`: both 302 to `/dp/ASIN?tag=ashoksachdev-21`.

## Rejected
| Item | Reason |
|---|---|
| Bata Bent B0GMJT266Y, May Oxford B0G5PPNY6P | 3.0★ / 3.4★ |
| Bata Porto B0GMJWTPL3 | No rating |
| Cast iron tadka pan B0HGHYHHFG | IFS ₹399 vs PDP ₹499, and a clip coupon is needed |
| LadyZeal pads (Flipkart SPPHP43RCHZ7MFFT) | IFS ₹283 vs ld+json ₹440 (drift) |
| Home Centre Helios Paul dining set B0DSLH3JXT | HDFC/Axis card-only price |
| Pink bunny B0GFNXF447, DDecora spice box B0H5X9F6X3, charan paduka B0HKFS1FKM | No rating |
| DDecora chopper B0H5X7JC1G | Only one review |

## Freshness
- **IndexNow:** HTTP 200 for 7 URLs.
- **Sitemap:** 10,496 `<loc>`. It is ISR with `revalidate = 1800`, so the batch shows up within 30 minutes.
- **llms.txt:** 200. It is dynamic, so it already includes the batch.

## CEO audit
- **Prod:** all 7 endpoints return 200, all ≤0.54 s.
- **Deals:** 11,179 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11526.
- **Posts:** 335, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. No day is 0.
- **Broadcast cursor:** `lastId` is 11522, against a DB max of 11526. That gap is this batch, which the external cron drains, not rot.
- **Git:** 0 unpushed commits before this commit.

Verdict: green. 4 deals shipped and pinged. Yield was low: 4 of 14. IFS listings keep carrying drifted prices and unrated items.
