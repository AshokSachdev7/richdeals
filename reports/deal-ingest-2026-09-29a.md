# DEAL-INGEST indiafreestuff tick: 2026-09-29a

## Discovery
- Fetched 4 IFS listing pages at 2.6 s intervals and found 110 slugs, 62 of them new.
- Dropped 12 before resolving:
  - FMCG/grocery: pista, boost bits, custard, spyfood, soap, detergent
  - Sale hubs: Amazon brand, Motul, Mufti
  - One min-buy-2 post and one quality skip
  - Bata Oxford, which is already live from Telegram
- Resolved the base64 `?rto=` links for 50 deals: 47 Amazon, 2 Flipkart, 1 Myntra. The Myntra link was an `/s/k/c/…/buy` shortlink with no clean product URL, so it was skipped.
- DB dedup by productId removed 2 already LIVE: B0D49C188C and ELWHZGURSFQYG75Z.

## Verification (every price read on the PDP)
- Amazon was checked in a logged-in tab by reading `#centerCol` (price, M.R.P., %), `#availability` and the add-to-cart button.
- Flipkart was checked through ld+json in a Playwright tab.
- 22 deals were rejected:

| Reason | Deals |
|---|---|
| Price drift (card vs PDP) | leash 170→737, Action sandals 280→633, CG pump 3126→5199, balloons 107→159, KYAT ring 99→1499, MASCLN shirt 188→696 |
| No cart / unavailable | Havells Crabtree, Hipkoo, BSC razor, Reebok bra, hoodie, Woodland |
| Price unreadable | Target notebooks, Victory belt |
| Card price was post-coupon | La Cura, microfiber, Toyshine |
| Low rating | striped shirt 2.0, Smart Picks 3.2, steering tray 3.0 |
| Thin / weak | Boniry hooks, generic Japanese gel |

- Accepted: **25** (24 Amazon, 1 Flipkart). Card price matched the PDP within ₹1 and all 25 were in stock.
- Copy was rewritten originally. Only specs confirmed on the PDP title are used; unverified spec claims were stripped before the push.
- Images come from m.media-amazon.com and rukmini1.flixcart.com.

## Push
- `/admin/deals/bulk` returned **count 25**, all `created:true`, status live.
- Affiliate links: Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 28 urls (25 slugs + 3) |
| sitemap.xml | 200 (ISR 1800 s picks the batch up) |
| llms.txt | force-dynamic, no new hub |
| Sample deal page | `/solimo-12-cavity-silicone-baking-tray-red-b08nwg2y6j` returns 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,481 (max id 11828) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 344; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 1. The next BLOG tick adds 1 or 2 today. |
| Broadcast cursor | 11803 vs max 11828. The gap is this batch waiting for the external tg-broadcast cron (self-heals). |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **25 live, IndexNow 200, 0 rot.**
