# TELEGRAM-DEAL-MONITOR tick 2026-09-27zh (~11:06 IST)

**Result:** 2 new deals live. Live deals went from 11,220 to 11,222.

## Sweep
- **Read:** one `browser_evaluate` over the sidebar rows of the 13 groups in `data/tg-groups.json`.
- **Single-product posts:** 7. 2 were already in `tg-multi-seen` (handbag `link.amazon/B05yvriRF`, Syska `fkrt.co/l5KOxl`).
- **Skipped as non-deals:** Rogerkart Skybags category post, IFS Swiggy search link, Deal Dibba join-channel post, hidden supercoins, OMG "video dekho", and an iPhone group that is not in `tg-groups`.

## Pushed (`/admin/deals/bulk`, HTTP 201, count 2, both `created:true`)
| Deal | Store | Price | M.R.P. | Verified by |
|---|---|---|---|---|
| Parachute Advansed Honey Soft body lotion, 400 ml (B00CBRJ1SM) | Amazon | ₹142 | ₹425 | `#centerCol` in the logged-in tab. In stock, no coupon. Posted at 199; the live price is lower. |
| BOLDFIT full-sleeve solid men sports jacket (JCKHPHTZGSZVH9H7) | Flipkart | ₹598 | ₹1,599 | ld+json, InStock. The bank-offer price of 568 is ignored. |

- **Affiliate links:** Amazon `tag=ashoksachdev-21`, Flipkart `affid=djhackraj`.
- **Script:** `apps/api/scripts/push-tg-0927zh.mjs`.

## Rejected
- **T2F girls nightgown (B0F4L4QYJ8):** "Currently unavailable".
- **T2F boys pack of 5 (B08R7S4ZGF):** "Currently unavailable".
- **Parachute 225 ml via `amzn.lt/MjVfIf0t`:** dead shortlink (no redirect).

All 9 keys were added to `tg-multi-seen` (now 2,130).

## Freshness
- **IndexNow:** HTTP 200 for 5 URLs (2 slugs plus the 3 standard paths).
- **Sitemap:** ISR 1800, so it picks up the batch within 30 minutes.
- **llms.txt:** force-dynamic, so it is already current.
- **Spot check:** the BOLDFIT deal page returns 200 on prod.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,222 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 |
| Posts today (IST) | 2 (rule is 2–3; the CONTENT-SEO cron runs later) |
| Broadcast cursor | 11567, DB max 11569 (this batch is waiting for the external broadcast cron; not rot) |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |
