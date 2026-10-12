# DESIDIME tick 2026-10-12h (14:47 IST)

**4 of 17 fresh candidates pushed.**

- Stage 1 found 36 deals and resolved 20 to a single product. 3 were already in the DB, leaving 17 fresh.
- The bulk endpoint returned `count: 4`, all `created: true`.
- All 4 deal pages return 200 on prod (0.18–0.59s).
- IndexNow returned **HTTP 200** for 7 URLs (4 deal slugs plus 3 hub URLs).

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Orient Electric 9W High Glow LED bulb, pack of 8 (B0F28WBFFY) | Amazon | ₹289 | ₹1,440 | 80% | 4.1 (2,141) | `tag=ashoksachdev-21` |
| Cookwell 1.5 L electric cook kettle, 600W (B0FGJY28NW) | Amazon | ₹1,089 | ₹1,999 | 46% | 4.1 (1,041) | `tag=ashoksachdev-21` |
| Kingston DataTraveler Exodia 128GB pen drive (B0GYQCKJPV) | Amazon | ₹1,399 | ₹2,300 | 39% | 4.0 (20) | `tag=ashoksachdev-21` |
| Longway 750W juicer mixer grinder (MIXGK4FM2GTWUDYN) | Flipkart | ₹1,377 | ₹3,899 | 65% | 4.1 (238,253) | `affid=djhackraj` |

**How each was checked:**

- **Amazon deals:** read on the product page in the logged-in tab.
  - The price matches the listing exactly, and the add-to-cart button is present.
  - None has a coupon or an "only N left" warning.
  - The Orient listing was confirmed as 8 units ("Number of Items 8", Pack of 8 selected).
  - Each image is the main hiRes image for the landing variant.
- **Flipkart deal:** read from the product page's ld+json in a browser tab: ₹1,377, InStock. The listing says replacement only, no returns; the copy states this.

## Rejected (13)

| Deal | Reason |
|---|---|
| One94Store 3D night lamp | ₹99 listed vs ₹199 live; the listing title is a different design |
| KENT Marvel RO purifier | Price drift: ₹7,729 listed vs ₹9,999 live |
| Xiaomi 17, 12/512GB | "Only 2 left in stock" |
| Kamiliant 3-piece luggage set | Price drift: ₹3,240 listed vs ₹3,599 live |
| Neem wood spoon set | Price drift: ₹199 vs ₹327; rated 3.0 from 2 ratings |
| Gear casual backpack | No add-to-cart or price; unavailable |
| Hitachi 1 Ton AC | No price shown (repeat) |
| Lenovo Idea Tab | Too few ratings; coupon-only price (repeat) |
| Shiv Textiles trackpants, pack of 3 | No add-to-cart; only 1 rating (repeat) |
| Wonderchef steel bowl (Blinkit) | ₹39 low-ticket, location-locked quick-commerce listing |
| Harpic (Instamart) | FMCG; price drift in stage 1 |
| Satin saree (Ajio) | No ld+json, so the price can't be verified |
| Milton casserole set (Flipkart) | Price drift, caught in stage 1 |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,429 (12,425 + 4) |
| Broadcast cursor | 12942 vs DB max 12946. The gap is this tick's 4 deals; the external broadcast cron picks them up. |
| Prod endpoints (7) | all 200 in 0.11–0.65s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
