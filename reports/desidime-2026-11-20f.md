# DESIDIME-INGEST tick — 2026-11-20f

This tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`) over `desidime.com/new` and the homepage. Stage 1 reads listing cards only, with no per-deal fetch, applies the JUNK and GROCERY filters, and resolves each Buy Now through `visit.desidime.com`. Every Amazon candidate was then verified in the logged-in Amazon tab through the Playwright MCP (richDeals profile). The push script deduped each ASIN against the live DB on `productId` and `affiliateUrl` before posting. Run at about 10:13–10:50 IST on 11-20.

**Result: 10 fresh candidates. 7 passed PDP verification and were pushed LIVE (count 7, all created:true, #16989–#16995). 3 were rejected for having no buy box. IndexNow returned HTTP 200. Prod returned 200 on every probed endpoint, and the CEO audit is green.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Cards discovered | 37 |
| Dropped by JUNK / GROCERY / non-product filters | 20 |
| Resolved to a single product | 14 |
| Dup of a LIVE row | 1 (B0DFMBY5ZM = #16943 at ₹1,344; PDP price matches, so no reprice) |
| Rejected in the last 24h (`dd-rejected.json`) | 3 (TVSHM44HM6VHUUFQ, PLSHHPKPGKFFSUM3, B0DMWSDGCC) |
| Fresh candidates | 10, all Amazon |

Two Flipkart cards resolved without an `itm` id, so they could not be turned into a `/p/itm…` affiliate link: the Inalsa air fryer (AFRHEPNAA6BPEF9W) and the ASUS Vivobook S14 Flip (COMHPXZQCZGP35HE).

## PDP verification

Each product was read with a same-origin fetch in the logged-in Amazon tab. Price came from `#corePriceDisplay_desktop_feature_div .a-price-whole`, stock from the add-to-cart button, and the image from the first `hiRes` entry.

| ASIN | Card price | PDP price | M.R.P. | Coupon / offer | Stock, seller | Outcome |
|---|---|---|---|---|---|---|
| B0DHYJKDSB | ₹104 | ₹104 | ₹1,099 (implies about 90% off, nulled) | none | Only 2 left, Clicktech | **Push** |
| B0CC5X35GT | ₹49,490 | ₹54,990 | ₹68,990 (20% off) | ₹2,500 coupon + bank up to ₹3,000 | In stock, DAWNTECH | **Push** |
| B0F3JFVL7Q | ₹13,315 | ₹14,690 | ₹33,990 (57% off) | ₹750 coupon + bank up to ₹2,500 | Only 2 left, DAWNTECH | **Push** |
| B0H6XWSDYH | ₹49,194 | ₹54,444 | ₹1,19,200 (54% off, inflated) | bank up to ₹3,000, no coupon | In stock, Clicktech | **Push** |
| B0H34QMH74 | ₹70,990 | ₹73,990 | 100× the price (nulled) | ₹1,000 coupon + bank up to ₹2,500 | In stock, DAWNTECH | **Push** |
| B0CHBHPF22 | ₹12,365 | ₹13,990 | ₹36,990 (62% off) | ₹1,000 coupon + bank up to ₹2,500 | Only 1 left, DAWNTECH | **Push** |
| B0G8JZP2QR | ₹24,990 | ₹26,990 | ₹31,999 (16% off) | ₹1,000 coupon + bank up to ₹2,500 | In stock, DAWNTECH | **Push** |
| B08TCCP2M6 | ₹429 | — | — | — | No buy box | Rejected |
| B0G8J23WGV | ₹17,140 | — | — | — | No buy box | Rejected |
| B0GPQZYZDJ | ₹9 | — | — | — | No buy box (also FMCG) | Rejected |

DesiDime's card prices are post-coupon and post-bank-offer prices. We publish the buy-box price, so the price, the title ₹ and the JSON-LD Offer all match what Amazon shows before checkout. The coupon is carried in `couponNote` and in the howTo steps.

## Dup hits

| ASIN | Row | Result |
|---|---|---|
| B0DFMBY5ZM | #16943 | LIVE at ₹1,344. The PDP matches, so nothing changed. |

The push script's own dedup gate (`productId` = ASIN, or `affiliateUrl` contains the ASIN) found no match for any of the 7.

## Pushed

| Row | Slug | Price | M.R.P. | Affiliate |
|---|---|---|---|---|
| #16989 | `perpetual-self-adhesive-bathroom-shelf-gold-pack-of-1-b0dhyjkdsb` | ₹104 | — | `?tag=ashoksachdev-21` |
| #16990 | `lg-9-5-kg-ai-direct-drive-front-load-washer-dryer-fhd0905swm-b0cc5x35gt` | ₹54,990 | ₹68,990 (20%) | `?tag=ashoksachdev-21` |
| #16991 | `whirlpool-60cm-1600-m-hr-bldc-filterless-autoclean-kitchen-chimney-b0f3jfvl7q` | ₹14,690 | ₹33,990 (57%) | `?tag=ashoksachdev-21` |
| #16992 | `lenovo-v14-core-i3-1315u-8gb-512gb-14-fhd-laptop-win-11-office-2024-b0h6xwsdyh` | ₹54,444 | ₹1,19,200 (54%) | `?tag=ashoksachdev-21` |
| #16993 | `electrolux-425l-ai-coolassist-bottom-freezer-refrigerator-stainless-steel-b0h34qmh74` | ₹73,990 | — | `?tag=ashoksachdev-21` |
| #16994 | `whirlpool-vfl-pro-602-hac-60cm-1600-m-hr-filterless-autoclean-chimney-black-b0chbhpf22` | ₹13,990 | ₹36,990 (62%) | `?tag=ashoksachdev-21` |
| #16995 | `samsung-236l-2-star-digital-inverter-frost-free-double-door-fridge-rt40h28w2qhl-b0g8jzp2qr` | ₹26,990 | ₹31,999 (16%) | `?tag=ashoksachdev-21` |

`/admin/deals/bulk` returned HTTP 201 with `count: 7`, and every row came back `created: true`, so no slug restore was needed. All rows are LIVE. The titles and descriptions were written fresh, the ₹ in each title matches the numeric price, and every image is on `m.media-amazon.com`. All 7 deal pages returned 200 on prod.

## Repriced

None.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 10 URLs (the 7 slugs plus the 3 default paths) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.16s |
| `/offers` | 200 | 0.10s |
| `/blog` | 200 | 0.59s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.07s |
| `/llms.txt` | 200 | 0.41s |
| 7 new deal pages | 200 each | 0.15–0.51s |
| `/api/deals` | 200: total 16,388, newest id 16,995 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,388 = 16,388 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,995 (this push) | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,993 vs 16,995 | OK. The external tg-broadcast cron is already working through this batch; the last 2 rows go out on its next run. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `desidime-2026-11-20a` to `-e` existed, so this report uses suffix `f` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):**

| Day | Posts |
|---|---|
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **2** |

No day is 0 and none is above the cap of 4. The 12:39 IST CONTENT-SEO tick can add a third post for 11-20.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992 (new: Lenovo V14 at ₹1,19,200).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994 (new: the bathroom shelf and both Whirlpool chimneys).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** cards that resolve without an `itm` id (this tick: AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE) are dropped. Resolving them needs an in-tab Flipkart fetch.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-20 10:53 |
| TG | 11-20 11:01 |
| SITEMON | 11-20 11:14 |
| CONTENT-SEO | 11-20 12:39 |
| DESIDIME | 11-20 12:43 |
| INDEXNOW | 11-20 13:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
