# DEAL-INGEST indiafreestuff tick: 2026-09-25ar (14:50 IST)

**13 deals went LIVE (ids 11233–11245): 11 Amazon, 1 Myntra, 1 Flipkart. IndexNow returned 200.**

## Funnel
| Stage | Count |
|---|---|
| Slugs on /deals p1-3 + homepage | 78 |
| New (not in index) | 16 |
| Dropped before PDP | 2: chhabratexcofab bedsheets (sale hub), Shilajit B0F5HP3CNQ (supplement with health claims) |
| Resolved via base64 `?rto=` | 14 |
| Rejected on PDP | 1: door draft stopper B0G1YTF3RG (PDP ₹149 vs IFS ₹86) |
| DB duplicates | 0 |
| **Pushed** | **13** |

## Verification
- Amazon (11): read in the logged-in tab. Price comes from `#corePriceDisplay` with style/script stripped, and M.R.P. from `#centerCol`. Every one has an add-to-cart button. Images are hiRes `_SL1500_` from m.media-amazon.com.
  - Stylus B0FJ1WFYDJ reads ₹142 (IFS said ₹145). It is published at the PDP price, and the page notes "min buy 2".
  - Dot & Key B0CX1W81RM is ₹439 with a 5% clip coupon (about ₹417 after), so it gets the CLIP howTo line.
  - Reebok B0BRKCCBXQ is ₹1,154 in UK 8, "only 1 left". The stock line says so.
- Myntra 38066232 (Whisper period panty): page state gives `discountedPrice` 72, `mrp` 99, available. Linked through InRDeals.
- Flipkart ICTGTS8GHFHXHS5Y (DIGISMART infrared cooktop): IFS had given the itm id as the pid. The rendered PDP gave the real pid, ₹2,198 against ₹8,990. Uses the `/p/itm…?pid=…&affid=djhackraj` URL.

## Push
`scripts/push-ifs-0925ar.mjs` → POST `/admin/deals/bulk` → **count 13**, all `created:true`. The DB re-read shows all 13 as LIVE with prices matching.
Five descriptions came out 809–866 characters, just under the 900 soft floor. That gate only warns.

## Freshness
| Check | Result |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 13 slugs + 3) | **HTTP 200**, 16 URLs |
| sitemap.xml | ISR 1800 s. 10201 `<loc>` at audit time, and the batch appears on the next revalidate |
| llms.txt | force-dynamic, 200 |

CEO audit: see `tick-2026-09-25as-telegram.md`. The same audit run covers both ticks.

**Verdict:** green.
