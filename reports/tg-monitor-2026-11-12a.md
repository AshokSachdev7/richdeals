# TELEGRAM-DEAL-MONITOR — 2026-11-12a

- Read the sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate` (Playwright, richDeals profile).
- Skipped as loot, category, sale-hub or non-deal posts: footwear loot, watch loot, Swiggy Dineout tip, Myntra category, LG sale hub, Caprese loot, video-earn promo.

| Candidate | Store | Posted | Live PDP | Verdict |
|---|---|---|---|---|
| B0FC6QNWF5 MuscleTrail Ashwagandha 60 caps | Amazon | ₹399 | ₹399, In stock, ATC | **Pushed** |
| B09NQ5CJDT cricket helmet cover | Amazon | ₹119 | ₹449 | Rejected, drift |
| XWAGUVD6RMSZ7DD8 wall clock | Shopsy | ₹180 | ₹199 (finalPrice) | Rejected, drift |
| PWBGGD4THDQZYAY6 Syska 10000 mAh power bank | Flipkart | — | — | Skipped, already in tg-multi-seen |

Push details:
- `/admin/deals/bulk` returned count 1 with created:true. Id 16371 is LIVE, slug `muscletrail-organic-ashwagandha-capsules-60-veggie-capsules-b0fc6qnwf5`.
- The PDP MRP field read ₹6.65, which is a per-unit rate, so MRP was dropped.
- Image is from m.media-amazon.com. Link is `/dp/B0FC6QNWF5?th=1&psc=1&tag=…-21`.
- Seen list: 3 appended, now 5,079 entries.

## Freshness

IndexNow **HTTP 200**: the same ping as deal-ingest-2026-11-12a, 78 urls.

## CEO audit (02:3x IST)

| Check | Value | Status |
|---|---|---|
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt` | 7/7 200 | clean |
| LIVE deals | 15,802 = API total | +68 this run (67 IFS + 1 TG) |
| PENDING_REVIEW | 2 (16261, 16262) | member queue, not rot |
| null price / null image | 0 / 0 | clean |
| max id vs broadcast cursor | 16,371 / 16,313 | external cron draining the new batch, not rot |
| posts / coverless / seo-less | 482 / 0 / 0 | clean |
| posts 11-12 IST | 3 | rule met |
| unpushed commits | 0 before this commit | clean |

Session crons auto-expire around 11-19. Owner: "restore all crons" re-arms them.
