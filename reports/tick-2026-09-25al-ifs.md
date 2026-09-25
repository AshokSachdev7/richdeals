# DEAL-INGEST indiafreestuff tick — 2026-09-25al (12:50 IST)

**Pushed 34 deals LIVE (30 Amazon, 1 Myntra, 3 Flipkart), ids 11198–11231. IndexNow HTTP 200 for 37 URLs.**

## Funnel
| Stage | Count |
|---|---|
| Listed on IFS | 79 |
| New (not seen) | 59 |
| Hubs / seasonal dropped | −10 |
| Buy Now resolved | 49 |
| Already in DB | −6 (B00KL56N8C, B0F9YKYW5N, B0G4MZ85QG, B0GSZ2PHQF, B0FPD153TS, B08N6DZ668) |
| Verified on PDP | 43 → **34 accepted** |

## Rejected on PDP
| Item | Reason |
|---|---|
| 7 Amazon: B0DP5FYZBK, B0FFZ9MCT3, B0FTYV7DK6, B0GFXQ69FY, B0GD79343G, B0H6JBZ4ZQ, B0BXD7FGQM | No buy box, or the price drifted from the IFS card |
| Myntra 43874883 (Here&Now kurta set) | OutOfStock |
| Flipkart MOBHR3ZPEU2KNXSH (Mivi One 5G) | "Notify Me" only, no buy box |

## Verification
- **Amazon:** checked in the logged-in tab. Price from `#corePriceDisplay`, M.R.P. from `#centerCol`, plus availability and buy box. Images are hiRes `m.media-amazon.com`. 4 deals carry a clip coupon (B08GQCZMX2, B08DG2T1W8, B0H6XDC1CJ, B0F4KG42QN). 3 are low-stock and noted in their copy.
- **Myntra:** price and stock from the ld+json offers block (read with a regex because the block does not JSON-parse), ₹472 InStock. The link goes through InRDeals.
- **Flipkart:** read from the rendered PDP; Add to cart is present on all 3. Prices are before bank/UPI offers, and the how-to steps say so. `affid=djhackraj` on the `/p/itm` path.
- **Content:** original copy in 3 paragraphs plus a live-price line for each deal. Gates passed: title ₹ matches price, image host, no thumbnails, 4 how-to steps, no duplicate slugs. **Soft warning:** 26 descriptions come in at 728–898 characters, under the 900 target. They were pushed anyway, since the template treats this as a warning, not a failure.

## Push
POST `/admin/deals/bulk` returned 201, with 34/34 `created:true`. DB check: 34 rows, all LIVE, 0 null price, 0 null image, 0 non-matrix affiliate URLs.

## Freshness
- IndexNow: `indexnow-ping.mjs` sent 34 slugs + 3 = 37 URLs, HTTP 200.
- sitemap.xml: ISR 1800s, so it will pick up the batch within 30 min.
- llms.txt: force-dynamic, so it is already current.

## CEO audit
| Check | Result |
|---|---|
| LIVE deals | 10884. 0 pending, 0 null price, 0 null image |
| Posts | 330. 0 without a cover, 0 without SEO fields |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **3** |
| Broadcast cursor | 11197 vs DB max 11231. The 34 new deals are queued for the external tg-broadcast cron. This is expected, not rot. |
| Prod endpoints | `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: all 200 |
| Unpushed commits | 0 before this commit |

**Verdict:** green. Today's blog quota is met (3/3).
