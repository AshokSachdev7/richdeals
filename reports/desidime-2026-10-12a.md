# DESIDIME tick 2026-10-12a (00:50 IST)

**3 of 18 fresh candidates pushed.**

- The bulk endpoint returned `count: 3`, all `created: true`.
- All 3 deal pages return 200 on prod.

## Pushed

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| Maybelline Lasting Drama gel eyeliner, Blackest Black 2.5 g (B00K3U2DAM) | Amazon | ₹251 | ₹650 | 61% | 4.2 (19,333) | `tag=ashoksachdev-21` |
| MILTON Aspire Jr. set of 3 insulated casseroles (B0CQYCJZR1) | Amazon | ₹449 | ₹1,105 | 59% | 4.0 (1,195) | `tag=ashoksachdev-21` |
| ZEBRONICS Juggle wired USB mouse (B0CL77B51D) | Amazon | ₹129 | ₹399 | 68% | 3.7 (205) | `tag=ashoksachdev-21` |

**How each was checked:** all 3 were read on the Amazon product page (`#centerCol`) in the logged-in tab.

- The price matches exactly.
- The `#availability` check shows In stock and the add-to-cart button is present.
- None has a coupon or an "only N left" warning.
- Each image is the hiRes entry for the variant's own colour (`landingAsinColor`).

## Rejected (15)

| Deal | Reason |
|---|---|
| Wonderchef Nutri-blend | Price drift: ₹2,501 listed vs ₹2,778 live |
| Dove anti-perspirant | Price drift: ₹103 listed vs ₹108 live |
| Sennheiser Momentum TW4 | Price drift: ₹12,951 listed vs ₹16,140 live; the listed price needs a ₹1,750 coupon |
| Lifelong curd maker | Price drift: ₹474 listed vs ₹499 live |
| Rosebell sofa | Price drift: ₹9,595 listed vs ₹10,661 live; only 2 ratings |
| Lenovo ThinkBook 16 | Price drift: ₹84,740 listed vs ₹91,990 live |
| Novo La Opala dinner set | Price drift: ₹335 listed vs ₹399 live; only 6 ratings |
| Fire-Boltt case B0F532TT94 | Rated 2.2 |
| Fire-Boltt case B0F52XTJLL | Rated 3.4 |
| SanDisk GX PRO SSD | Price drift: ₹32,499 listed vs ₹34,999 live; only 8 ratings |
| Nilkamal recliner | Price drift: ₹10,861 listed vs ₹15,190 live |
| Hitachi 1T AC | No add-to-cart on the last tick; repeat item, not re-checked |
| AGARO foot massager | Health device |
| Parachute lotion (Flipkart) | Price drift, caught by stage 1's ld+json check |
| Prestige mixer | Price is only valid with an SBI credit card |

## IndexNow

HTTP 200 for 6 URLs: the 3 deal slugs plus 3 hub pages.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-12) | 1 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,416 (12,413 before this push) |
| Broadcast cursor | 12930; DB max is now 12933 after this push. The external broadcast cron picks up the new rows on its next run. |
| Prod endpoints (7) | all 200 in 0.10–0.78s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
