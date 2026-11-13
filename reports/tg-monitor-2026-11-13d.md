# TELEGRAM-DEAL-MONITOR tick — 2026-11-13d

Read the newest post of each group in `data/tg-groups.json` from the logged-in Telegram Web sidebar. Kept only single-product links, resolved the shortlinks, and deduped against `data/tg-multi-seen.json`. Every Amazon candidate was read on its live PDP in the logged-in Amazon tab (price, MRP, stock, real `m.media-amazon.com` image). The source tag `vivek123034-21` was stripped and ours applied (`tag=…-21`). The deals were pushed to `/admin/deals/bulk` as `status:live`. Run at about 21:45 IST.

**Result: 9 PDP-verified Amazon deals were pushed (201, count:9, all created:true), with no slug restores needed. IndexNow returned HTTP 200 for 12 URLs. Two SEEN re-checks were fixed: #16477 Puma Maka set to EXPIRED (out of stock), and #10347 bath brush updated from ₹189 to ₹179.**

## Pushed

| ASIN | Deal | Price | MRP | Off | Note |
|---|---|---|---|---|---|
| B09DCL6JVV | Symbol slim-fit formal shirt | ₹399 | ₹1,699 | 77% | |
| B0GPPMM43R | Samsung 60W GaN adapter | ₹900 | ₹3,999 | 77% | Channel said ₹945; the PDP price was used |
| B0BZPK3XFQ | Sony WH-CH520 | ₹2,989 | ₹5,990 | 50% | |
| B08L9PFC6B | SCOOBA avocado plush | ₹299 | ₹999 | 70% | |
| B0GD1K98VM | SilverArrow SoftWalk mules | ₹419 | ₹2,499 | 83% | 5 left |
| B0CPHZ1FBS | Amazon Basics 14.1" sleeve | ₹158 | ₹899 | 82% | |
| B0F6V8K31H | MILTON Wondermeal tiffin | ₹399 | ₹1,160 | 66% | |
| B0FMFJ4QQJ | UNFLTRD Honey Coco Vanilla EDP | ₹479 | ₹1,690 | 72% | |
| B0GS6DFZ2Q | GOBOULT Rave Q5 speaker | ₹649 | ₹2,499 | 74% | |

Slugs:
- `symbol-men-solid-cotton-slim-fit-formal-shirt-b09dcl6jvv`
- `samsung-60w-gan-power-adapter-usb-pd-3-1-b0gppmm43r`
- `sony-wh-ch520-wireless-on-ear-headphones-b0bzpk3xfq`
- `scooba-avocado-cushion-stuffed-toy-30cm-b08l9pfc6b`
- `silverarrow-women-softwalk-slip-on-mules-b0gd1k98vm`
- `amazon-basics-14-1-inch-laptop-sleeve-with-handle-b0cphz1fbs`
- `milton-wondermeal-680ml-insulated-steel-tiffin-b0f6v8k31h`
- `unfltrd-honey-coco-vanilla-edp-100ml-unisex-perfume-b0fmfj4qqj`
- `goboult-rave-q5-5w-bluetooth-speaker-b0gs6dfz2q`

## SEEN re-checks (LIVE rows reposted)

| Row | Deal | Finding | Action |
|---|---|---|---|
| #16477 | Puma Maka B09RG35FRQ | Out of stock | Set EXPIRED (page stays live with banner) |
| #10347 | Bath brush B0GF3G42ZV | ₹189 → ₹179 (MRP ₹1,999, 91% off) | Price, discount and title updated |
| #5035 | LG 8kg B0DPHTSTYJ | ₹20,990, same as the DB | No change |

## Rejected

| Item | Reason |
|---|---|
| Dealdost Flipkart Limestone watch | Post-coupon loot price |
| LuvIt chocolate | Food |
| Mega sale alert | Not a product |
| CoolzTricks amzn.to/3Xoxi24 | Resolves to a `/s?` search page (coupon) |
| Dealzone Dettol ₹188 | FMCG |
| Hidden Loot / IFS Tips Swiggy Dineout | Not a product |
| Rogerkart Libas sale | Sale hub |
| NonStopDeals Caprese | Category page |

## Freshness

- IndexNow: `indexnow-ping.mjs` was run on the 9 slugs and returned HTTP 200 for 12 URLs (the 9 slugs plus 3 hubs).
- `sitemap.xml`: ISR refreshes within 30 minutes. The deals child lists only the top 100, by design.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

All 7 return 200: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`. See sitemon 11-13o.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,917 = 15,917 | OK (15,909 + 9 new − 1 expired) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 484, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,486 vs 16,495 | OK: the 9 new rows are waiting for the external broadcast cron |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2. On target. The next CONTENT-SEO run is at 00:39 IST.

## Still open

- TELEGRAM next run at 22:03 IST. DESIDIME 11-13d is redone by the 22:43 IST cron. DEAL-INGEST next run at 22:53 IST. INDEXNOW at 01:05 IST.
- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of LIVE deals with no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses 11-14. Re-verify it before then.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG, LONGWAY B0HC3G1FF5 (1 left), SilverArrow B0GD1K98VM (5 left).
- #7751 Nivia football is only 8% off; expire it if it has not dropped.
- Bank-offer rejects B08SW56CDQ (Sennheiser) and B0H9FK9XZZ (CG Iraya) are not in `dd-rejected.json`, so they come back as candidates on every sweep.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
