# INDEXNOW tick 2026-11-09a (IST ~19:06)

**Result: IndexNow HTTP 200 for 21 urls (slug mode: 12 newest deals #16212–16223 + 6 newest posts + 3 hubs) and HTTP 200 for 8 urls (`--paths`: sitemap index, deals/blog/pages child sitemaps, /offers, /blog, /feed.xml, /llms.txt).**

## Submitted

Slug mode (`indexnow-ping.mjs`, adds 3 hubs itself):

- Deals: yogabar-sunflower-seeds-250g-pack-of-2-b0dt4dg3ym, negi-friction-push-and-go-toy-horse-and-pull-along-deer-set-b0fd77w8d9, botthhealth-4k-hdmi-capture-card-with-pass-through-1080p60-usb-3-0-b0chdtzc8p, tota-white-rangoli-outliner-250g-b0hjcs8qmh, puma-unisex-fraction-glide-slip-on-running-shoe-b0h5fxjdfr, morton-by-birla-penne-pasta-500g-b08hqwtmxd, wonderchef-rosa-whiskey-tumbler-320ml-set-of-6-b0bnnqmy5q, wall-mounted-toothbrush-holder-with-4-mouthwash-cups-b0gxjrljgq, flybot-blaze-bluetooth-neckband-earphone-with-mic-b07x1t9mjc, gesto-20m-rope-led-strip-lights-120-led-m-waterproof-b09fhspf48, mumma-s-life-stainless-steel-roti-casserole-hot-box-b0df1v7j3m, glam21-blush-and-highlighter-palette-b0brjld4hf
- Posts: blog/is-mattress-topper-worth-it-topper-vs-new-mattress, blog/travel-neck-pillow-memory-foam-vs-inflatable, blog/does-lumbar-support-cushion-help-back-pain-office-chair-car, blog/is-ab-roller-worth-it-benefits-how-to-use, blog/dash-cam-buying-guide-india, blog/cabin-baggage-rules-india-indigo-air-india-akasa-7kg

`--paths` mode (adds nothing): /sitemap.xml, /sitemaps/deals/sitemap.xml, /sitemaps/blog/sitemap.xml, /sitemaps/pages/sitemap.xml, /offers, /blog, /feed.xml, /llms.txt.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (/, /offers, /blog, sitemap, feed, /api/deals, llms.txt) | 7/7 200 | OK |
| API total vs DB LIVE | 15,657 = 15,657 | OK |
| PENDING_REVIEW | 0 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| Max deal id vs broadcast cursor | 16,223 / 16,223 (drained) | OK |
| Posts total / coverless / seo-less | 470 / 0 / 0 | OK |
| Posts per IST day | 10-29:4 10-30:4 10-31:4 11-01:1 11-03:4 11-04:2 11-05:3 11-06:3 11-07:3 | **FAIL: 11-08 = 0 (missed, can't backfill), 11-09 = 0 so far — CONTENT-SEO runs next** |
| Unpushed commits | 0 (before this report) | OK |
| Crons | 9/9 (last CronList) | OK |

## Still open

- **Blog:** 11-08 IST shipped 0 posts. 11-09 needs 3 before IST midnight (stroller, robot-vs-stick vacuum, washing-machine vibration stands planned; deal links verified LIVE).
- **Code fix:** IFS and DesiDime dup-row price-sync paths must insert `priceHistory` next to `deal.update`. Queued for SEO-AUDIT-FIX.
- TG 11-04l: B0GXB76VRW duplicates #4983 (LIVE ₹29,750; channel ₹25,175 is post-coupon + HDFC). Unchecked: Vyom ×2 / ×3, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- #11896: Flipkart ₹664 vs DB ₹899. 16 bare Flipkart links. 96 drift rows. Single deals to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- Reticle MCP: CONNECTION_CLOSED. DO token rotation is the owner's job.
