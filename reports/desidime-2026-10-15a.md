# DESIDIME tick 2026-10-15a (10:32 IST)

**2 pushed. IndexNow HTTP 200 (5 URLs).** Stage 1 found 33 cards and resolved 11 to a single product. 4 were already in the DB, leaving 7 fresh. Of those 7, 5 were rejected.

## Pushed

| Deal | Store | Price | Verification | Prod |
|---|---|---|---|---|
| [Razer Huntsman Mini 60% optical keyboard](https://richdeals.in/razer-huntsman-mini-60-optical-gaming-keyboard-purple-switch-b089qp4qnb) (B089QP4QNB) | Amazon (`tag=ashoksachdev-21`) | ₹5,099 (MRP ₹14,999) | PDP ₹5,099, In stock, add-to-cart present, 4.6 from 967 ratings | 200 |
| [Go24 Pexpo Monaco 750 ml steel bottle](https://richdeals.in/go24-pexpo-monaco-750ml-stainless-steel-water-bottle-b0b2p4z97t) (B0B2P4Z97T) | Amazon (`tag=ashoksachdev-21`) | ₹130 (MRP ₹349) | PDP ₹130, In stock, add-to-cart present, 4.0 from 421 ratings | 200 |

Bulk push: `count:2`, both `created:true`. Titles and descriptions are rewritten, and images come from m.media-amazon.com.

## Rejected

| Deal | Reason |
|---|---|
| vivo T5x 5G (Flipkart MOBHQC8ZFHNFPRMU) | Price drift at stage 1 |
| Lenovo Yoga Slim 7 (Flipkart COMHZFBNMQNSAJ9W) | Price drift at stage 1 (rejected again, same as 10-14c) |
| Storio yoyo (B07KQJ2YH6) | ₹33 low-ticket toy, rated 3.0 |
| Myntra gift voucher (B0FNR6Z9PN) | Gift card (junk) |
| Razer Basilisk V3 Pro (B0BGS1KQ68) | PDP ₹9,495 vs card ₹8,046 (the card price needs an SBI card) |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-15) | 2 (cap 4). The rule is met. |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,470 (+2) |
| Newest deal | This push, after an 11-hour gap since 10-14 23:45 IST. |
| Broadcast cursor | 12985 vs DB max 12987. The external cron will pick up the 2 new deals on its next run. |
| Prod endpoints (7) | all 200 in 0.11–0.66s |
| DB connections | The first audit query hit `remaining connection slots are reserved` (it runs 8 queries in parallel). It passed on a rerun with `connection_limit=1`. The managed PG slots are close to full: watch this. |
| Unpushed commits | 0 before this report |
