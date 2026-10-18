# DESIDIME tick 2026-10-18w (22:33 IST)

**1 new Amazon deal pushed LIVE.** The bulk call returned 201 with count 1, created:true, and the slug returns 200. IndexNow returned HTTP 200 for 4 URLs (the slug plus the 3 hubs).

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 33 |
| Resolved to a single product | 15 |
| Already in the DB | 4 |
| Fresh candidates | 11 (6 Amazon, 4 Flipkart, 1 Digihaat) |
| Passed verification | 1 |

## Pushed

| ASIN | Deal | Price / M.R.P. |
|---|---|---|
| B0CQXV4S1C | Moon And Mount Green Apple Liquid Hand Wash 5 Litre | ₹255 / ₹1,099 (77%), in stock, add-to-cart present |

It uses `?tag=ashoksachdev-21` and an `m.media-amazon.com` image. The title and description are original, and the brand was read from the PDP byline.

## Rejected

| Store | ID | Deal | Card price → live price |
|---|---|---|---|
| Amazon | B0HCBYMC8D | iQOO Buds | ₹1,421 → ₹1,699. The card price depends on a coupon that reads empty on the fetched page, so it can't be verified. |
| Amazon | B0F23T4WRC | Rock World prank cockroach toy | ₹18 / ₹199. Junk at this price: an add-on item with an implied 91% discount. |
| Amazon | B0DHVWY583 | Kalyan 24K 2 g gold coin | No buy box, no add-to-cart (same as the 18 tick) |
| Amazon | B0HKMBDZ5Y | ASUS Vivobook 15 Core 3 | ₹46,390 → ₹52,990 |
| Amazon | B0HG1VM9Q8 | HP AiO i5-1334U | ₹87,790 → ₹99,990 |
| Flipkart | HTTHZW4EVAVCJKHY | Alps Goodness rosemary water | ₹301 → ₹347 |
| Flipkart | TVSHFNYYVUTK5UA5 | Acerpure Nitro 75" QLED | ₹44,596 → ₹48,499 |
| Flipkart | WMNHPKQWV3ZZPKXU | Whirlpool 9 kg top load | ₹11,659 → ₹18,990 |
| Flipkart | MOBHZHUVYN4SGGQA | Ai+ Nova 2 Ultra 8/128 | ₹18,999 → ₹21,999 |
| Digihaat | e47d1c39cec4 | Steel straws, pack of 5 | No ld+json on the page |

Stage 1 also dropped two cards that never reached the candidate list: a Puma `/s?` search hub, and a Mi 20000 mAh power bank whose resolved link was a Flipkart `/flipkart/p/item` tracking URL with a truncated pid.

## CEO audit (22:33 IST)

| Check | Result |
|---|---|
| Posts per day (IST) | 10-16: 4, 10-17: 4, 10-18: 4 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals | 13,175 (+1) |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Newest deal | id 13699, 0 min old |
| DB max id / broadcast cursor | 13699 / 13698. The gap of 1 is this push, which the external broadcast cron picks up next. |
| Prod endpoints (7) | all 200, max 0.59 s (`/blog`) |
| Unpushed commits | 0 before this report |
| Session crons | 9 running, the whole roster |

No rot found.
