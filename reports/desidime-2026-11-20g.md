# DESIDIME-INGEST tick — 2026-11-20g

This tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`) over DesiDime's `/new` page and homepage, reading listing cards only. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were then checked on the PDP in the logged-in Playwright tab. The Flipkart candidate was checked through the ld+json on its PDP (±₹1, InStock). Survivors were deduped by productId against the live DB, and LIVE duplicates were re-checked for price drift. Run at about 12:45–12:58 IST on 11-20.

**Result: pushed 4 deals LIVE (#17000–#17003; bulk HTTP 201, `count: 4`, all `created: true`) and repriced 1 LIVE duplicate (#12976, ₹1,377 → ₹1,481). Rejected 2 candidates on the PDP (price drift, no buy box). IndexNow returned HTTP 200 for 8 URLs. The CEO audit is green.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Cards discovered | 38 |
| Dropped (junk, grocery, unsupported) | 19 |
| Resolved to a single product | 14 |
| Duplicates of a LIVE row | 4 |
| Rejected in the last 24 hours | 1 (TCL 65" QLED, Flipkart TVSHM44HM6VHUUFQ) |
| Fresh candidates | 9 |

Dropped as non-product pages: four `amazon.in/clp/` links (B0DMKDY515, B0FLRRMMX3, B0BSXF9DN2, B0H6XWSDYH). Stage 1 itself skipped three of the fresh rows: Kwality Choco Flakes (out of stock, and grocery), Scorist cashews (price drift, ₹841 vs ₹1,761) and Lenovo L22-4e (already LIVE as #16956).

**Flipkart no-itm:** the Bata card (SHOGGJ9YQMEJVGXV) resolved to a Flipkart URL with no `/p/itm…` id, so it could not get a valid Flipkart affiliate link. It joins the stage 1 Flipkart gap list below.

## PDP verification

| Product | Card | PDP | Stock and seller | Outcome |
|---|---|---|---|---|
| Cosmic Byte CB-GK-39 keyboard (B0CXSYBKW3) | ₹2,180 | ₹2,180 | In stock, add-to-cart, Clicktech | Pushed |
| Sofia Nutri Blender 500W (B0GYQP623N) | ₹1,599 | ₹1,599 | In stock, DOUBLE BLESSINGS | Pushed |
| Belkin 20000mAh 15W PD power bank (B0CV9CXDHB) | ₹1,499 | ₹1,499 | In stock, Opptra | Pushed |
| Billion Bistro Lite 5L air fryer (Flipkart, AFRHPHNXNGCY5DNN) | ₹2,599 | ₹2,599 (ld+json) | InStock | Pushed |
| Noise Buds VS104 (B09Y5N4M7Z) | ₹799 | ₹1,099, no coupon on the page | — | Rejected (price drift) |
| truke Buds A1 (B0BSLQC33G) | ₹699 | No price | No buy box | Rejected |

## Duplicate hits (LIVE rows re-checked)

| Deal | ASIN | DB → PDP | Action |
|---|---|---|---|
| #12976 Longway Super DLX juicer mixer grinder | B0C33FLXJJ | ₹1,377 → ₹1,481 | Repriced |
| #7689 Toshiba 32" TV | B0FDL28K43 | ₹14,990 = ₹14,990 | None. The card's ₹11,740 is a coupon or bank-offer price. |
| #16993 Electrolux 425L fridge | B0H34QMH74 | ₹73,990 = ₹73,990 | None. The card's ₹70,990 is post-coupon. |
| #16943 Spartan drill | B0DFMBY5ZM | ₹1,344 = ₹1,344 | None. The PDP M.R.P. of ₹7,150 would imply 81% off, so M.R.P. stays null. |
| #16956 Lenovo L22-4e monitor | B0G1T71B9Z | ₹5,532 = ₹5,532 | None |

## Pushed

| id | Deal | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 17000 | Cosmic Byte CB-GK-39 Trinity tri-mode wireless mechanical keyboard (blue switch) | ₹2,180 | ₹6,999 | 69% | Amazon `tag=ashoksachdev-21` |
| 17001 | Sofia Nutri Blender 500W, 4 jars + sipper cap | ₹1,599 | ₹5,999 | 73% | Amazon `tag=ashoksachdev-21` |
| 17002 | Belkin 20000mAh 15W PD power bank | ₹1,499 | ₹6,999 | 79% | Amazon `tag=ashoksachdev-21` |
| 17003 | Billion Bistro Lite 5L 1350W air fryer | ₹2,599 | ₹7,499 | 65% | Flipkart `affid=djhackraj` on `/p/itme88c531fbad69` |

Images come from the marketplace CDNs (`m.media-amazon.com`, `rukmini1.flixcart.com`). The Sofia and Belkin descriptions say plainly that the listed M.R.P. looks generous, so the discount should be read against the street price. The air fryer's M.R.P. is the struck price shown on the PDP (₹7,499), which matches the card.

Bulk response: HTTP 201, `count: 4`, all four `created: true`. The new pages return 200 on prod (checked `/billion-bistro-lite-air-fryer-5l-1350w-afrhphnxngcy5dnn`).

## Repriced

#12976 Longway Super DLX juicer mixer grinder: price ₹1,377 → ₹1,481, M.R.P. ₹3,899, discount 62%. The description was updated to the new price and discount. The title carries no ₹ figure, so it did not need changing. A `priceHistory` row was written.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 8 URLs (the 4 new deals, #12976, and the 3 hub URLs slug mode adds) |
| `sitemap.xml` | 200. The deals child only lists the top 100 by design, so new pages are reached through IndexNow and hubs. |
| `llms.txt` | 200 (`force-dynamic`, rebuilt per request) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.21s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.56s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.36s |
| `/api/deals` | 200: total 16,396, newest id 17,003 | 0.10s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,396 = 16,396 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,003 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,999 vs 17,003 | OK. The external tg-broadcast cron picks up #17000–#17003 on its next run. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `desidime-2026-11-20a` to `-f` existed, so this report uses suffix `g` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **3** |

No day is 0 and none is above the cap of 4. 11-20 is done.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, plus the new #17001 (73%) and #17002 (79%).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-20 12:58 |
| TG | 11-20 13:01 |
| SITEMON | 11-20 13:14 |
| INDEXNOW | 11-20 13:23 |
| DESIDIME | 11-20 14:43 |
| CONTENT-SEO | 11-20 18:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
