# DESIDIME tick 2026-10-12k (20:48 IST)

**4 of 18 fresh candidates pushed.**

- Stage 1 found 33 deals and resolved 20 to a single product. 2 were already in the DB, leaving 18 fresh. Before the push, the 4 passing product IDs were checked against the DB again: no matches.
- The bulk endpoint on the local API returned `count: 4`, all `created: true`.
- All 4 deal pages return 200 on prod (0.18–0.33s).
- IndexNow returned **HTTP 200** for 7 URLs (4 deal slugs plus 3 hub URLs).

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Beardo Ice Blast perfume roll-on, 50ml (B0DFPRJ6TG) | Amazon | ₹129 | ₹299 | 57% | 3.8 (355) | `tag=ashoksachdev-21` |
| Story@Home cotton window curtain, 5 ft (B0FF9Y7Z2H) | Amazon | ₹299 | ₹1,599 | 81% | 4.3 (449) | `tag=ashoksachdev-21` |
| KENT Dash 600W bagless vacuum (B0FN46JGMS) | Amazon | ₹2,179 | ₹6,500 | 66% | 3.9 (5,042) | `tag=ashoksachdev-21` |
| iBELL AEROFRY420DM 4.2L air fryer (AFRHFFMMGWUZZM7M) | Flipkart | ₹2,741 | ₹7,290 | 62% | 4.2 (38) | `affid=djhackraj` |

**How each was checked:**

- **Amazon deals:** read on the product page in the logged-in Playwright tab (`#centerCol`, `#availability`, add-to-cart).
  - The price matches the listing exactly, and the add-to-cart button is present.
  - None of the 3 has a coupon or an "only N left" warning.
  - Each image is the hiRes image from the product page.
- **Flipkart deal:** read from ld+json in a browser tab: ₹2,741, InStock, no "only N left" warning. The ₹2,603 "buy at" figure is a bank offer, so it was not used.

## Rejected (14)

| Deal | Reason |
|---|---|
| Wingreens veg mayo, Hershey's syrup, DMB gulab jamun (Instamart); churan goli (Digihaat) | Food rule |
| Asaya 2% salicylic face wash | Skincare (health rule); the ₹38 listing was also suspect |
| Tokyo Talkies women's top | Currently unavailable; no add-to-cart |
| U.S. Polo Assn men's jacket | Price drift: ₹1,709 listed vs ₹1,799 live; only 14 ratings at 3.6 |
| Elica 60cm filterless chimney | Price drift: ₹10,791 listed vs ₹12,490 live, plus a coupon |
| Shatras Pitambari powder | Price drift: ₹196 listed vs ₹199 live; only 9 ratings; coupon |
| Nilkamal Sierra recliner | Price drift: ₹10,861 listed vs ₹15,190.50 live (rejected last tick too) |
| Philips TV, Reynolds pens, Shopsy bag, Samsung TV | Price drift, caught in stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 4 (cap reached) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,441 (12,437 + 4) |
| Broadcast cursor | 12954 vs DB max 12958. The gap is this tick's 4 deals; the external broadcast cron will pick them up. |
| Prod endpoints (7) | all 200 in 0.13–0.67s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
