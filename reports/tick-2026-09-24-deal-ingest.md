# DEAL-INGEST indiafreestuff tick — 2026-09-24

**Published: 28 deals LIVE** (27 Amazon, 1 Myntra) via `/admin/deals/bulk`. The endpoint returned HTTP 201 with 28 rows `created:true`, and all 28 slugs read back as LIVE with a price.
IndexNow: **HTTP 200 for 31 URLs** (28 slugs + 3 hub paths).

## Funnel
| Stage | Count |
|---|---|
| Cards discovered (2.6s gap, no 403/429) | 54 |
| Resolved via base64 `?rto=` Buy Now | 38 |
| Fresh after productId dedup (B0C7MK2X6Z, B0H5KF92L2 already live) | 36 |
| PDP-verified and published | **28** |

**Dropped at resolve (16):**
- 9 Flipkart `dl.flipkart.com/dl/indiafreestuff` landings
- 2 empty resolves
- 1 early-bird store link
- 1 Myntra prebuzz hub
- 2 Amazon events pages
- 1 bare jiomart.com

**PDP rejects (6).** IFS card prices were wrong again.
| ASIN | Card price | PDP price | Reason |
|---|---|---|---|
| B07W7TZ71T | 2925 | 4640 | drift |
| B07TL3DTD3 (Larah) | 2301 | 3650 | drift |
| B0CVL448H5 | 16249 | 17999 | drift |
| B0HD6S6T4K | 894 | 1052 | coupon drift |
| B0CT5GD3Q6 (Skybags) | 1070 | 1259 | coupon drift |
| B08PD6HHHP | — | — | no MRP on PDP |

## Published
| Product | Price | MRP | Off |
|---|---|---|---|
| DTR Fashion stretch ankle leggings | 279 | 999 | 72% |
| OOMPH! cotton blend maxi nighty | 453 | 2000 | 77% |
| boAt EnergyShroom PB665 Turbo X 30000mAh 65W | 3699 | 9999 | 63% |
| Giordano women's analog watch | 1699 | 8150 | 79% |
| Zebronics PixaPlay 63 Plus projector | 8499 | 26999 | 69% |
| Jack & Jones slim fit polo | 572 | 1999 | 71% |
| WINTAGE velvet tuxedo blazer | 2499 | 4499 | 44% |
| Dynore 150ml hammered creamer | 140 | 499 | 72% |
| American Tourister Liftoff+ 67cm | 2699 | 8600 | 69% |
| LG 27U411A-BD 27" 120Hz IPS | 9499 | 16500 | 42% |
| Lifelong woolen beanie | 99 | 799 | 88% |
| Lemon dishwash gel 4×1L | 337 | 880 | 62% |
| NutriGlow papaya wash + scrub | 231 | 498 | 54% |
| Longway Kiger P1 600mm fan | 1049 | 2341 | 55% |
| Vector X Power basketball | 281 | 549 | 49% |
| La'Bangerry ubtan face wash 2×50ml | 152 | 498 | 69% |
| Q1 gaming TWS earbuds | 750 | 4999 | 85% |
| Safari Spree 30L backpack | 749 | 2599 | 71% |
| boAt Lunar Discovery 2026 | 1199 | 8499 | 86% |
| TONOR TC777 Pro USB mic | 1699 | 8499 | 80% |
| American Tourister Quad 3.0 33.5L | 699 | 2300 | 70% |
| Focus 4-in-1 60W braided cable | 220 | 2999 | 93% |
| DIY Crafts 20pc screwdriver set | 98 | 1360 | 93% |
| Crompton Dyna Ray 9W ×4 | 210 | 620 | 66% |
| Maybelline Liquid Matte 11 | 180 | 399 | 55% |
| Safari Pentagon Pro set of 3 | 4999 | 33997 | 85% |
| Cruiser chunky sole sneakers | 975 | 2499 | 61% |
| GUESS Seductive Noir mist 125ml (Myntra, InRDeals) | 1615 | 1900 | 15% |

**Checks run before pushing:**
- Title ₹ equals price, and price is below MRP.
- Images come only from `m.media-amazon.com` / `assets.myntassets.com`, with no thumbnails.
- Descriptions are ≥900 chars. The gate caught one at 864; it was padded with neutral copy and no invented facts.
- Each deal has 4 howTo steps.
- No duplicate productIds or slugs.

Script: `apps/api/scripts/push-ifs-0924.mjs`.

## Follow-up fixed
The Larah Borosil Ora Gold 44pc (B0C7MJ5332) DB row was stale at ₹2,913 / 48%. The PDP now shows **₹2,311 / 5,595 (59%)**, in stock. Title, price, discountPct, description and howTo were corrected. IndexNow returned 200.

## CEO audit
- **Deals:** live 10632 (+28), pending 0, null price 0, null image 0.
- **Posts:** 325, coverless 0. IST posts per day are 09-22=3, 09-23=2, 09-24=1 so far. The 15:39 and 21:39 IST blog crons are still to run today.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` all return 200. New deal pages spot-checked at 200 on prod.
- **Git:** 0 unpushed commits before this tick.
