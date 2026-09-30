# Deal-ingest (indiafreestuff) — 2026-09-30g

## Pushed
**20 pushed as LIVE, ids 11988–12007:**
- 17 Amazon deals, tagged `?tag=ashoksachdev-21`.
- 3 Flipkart deals, tagged `affid=djhackraj`.

The bulk push returned **count 20**. No row came back `created:false`, so no slug was rewritten. I read every price on the PDP:
- **Amazon:** logged-in tab, reading price, `#availability` and add-to-cart.
- **Flipkart:** ld+json in a browser tab, which showed price, InStock and rating.

| Slug | Store | Price / MRP | Off |
|---|---|---|---|
| arrow-mens-regular-fit-checkered-blazer-b0dst9nxy5 | Amazon | ₹5,219 / 8,999 | 42% |
| provogue-lumina-65cm-hard-sided-trolley-bag-b0hfwg4jxl | Amazon | ₹2,899 / 6,125 | 53% |
| shasmi-womens-a-line-ruched-puff-sleeve-maxi-dress-b0f1mqhrsb | Amazon | ₹449 / 2,299 | 80% |
| loctite-weatherproof-clear-neutral-sealant-b0dxq41q7t | Amazon | ₹277 / 650 | 57% |
| puma-mens-vis2k-sneaker-b0d6vwyhnj | Amazon | ₹2,072 / 7,999 | 74% |
| lifelong-fiberglass-pickleball-paddle-set-b0fd724d8w | Amazon | ₹799 / 2,999 | 73% |
| joy-skin-fruits-apple-body-lotion-600ml-b0gfmr6rl2 | Amazon | ₹350 / 699 | 50% |
| lifelong-kids-tricycle-parental-control-eva-wheels-b0gbyrx4bz | Amazon | ₹2,299 / 9,999 | 77% |
| auto-hub-1300-gsm-microfiber-car-cloth-b0czlngklp | Amazon | ₹378 / 1,199 | 68% |
| safari-ronin-30l-formal-laptop-backpack-b0g34xsyqj | Amazon | ₹2,899 / 6,499 | 55% |
| nasher-miles-paris-55cm-hard-sided-cabin-trolley-b0cvs9g5lx | Amazon | ₹2,179 / 13,995 | 84% |
| milton-eros-1000-sip-gulp-water-bottle-960ml-b0g532m8d8 | Amazon | ₹349 / 860 | 59% |
| usha-ir2200tcb-infrared-cooktop-with-grill-b0fv7vc27q | Amazon | ₹2,540 / 5,790 | 56% |
| kitchivo-45l-collapsible-laundry-basket-wheels-b0frn3vnm7 | Amazon | ₹816 / 1,999 | 59% |
| blendlife-blaze-700ml-blender-mixer-grinder-b0gfdlbf13 | Amazon | ₹2,399 / 5,000 | 52% |
| pro365-usb-rechargeable-3-speed-coffee-frother-b0gtqfrvtg | Amazon | ₹189.05 / 799 | 76% |
| symbol-womens-cotton-blend-round-neck-sweatshirt-b0c33n8xlz | Amazon | ₹329 / 1,799 | 82% |
| impex-ncb7108-induction-non-stick-cookware-set-ckshchtcnhhhpm67 | Flipkart | ₹2,472 / 4,730 | 48% |
| hemlock-full-sleeve-solid-mens-jacket-jckg76zejmhrfczv | Flipkart | ₹677 / 2,999 | 77% |
| dixcy-scott-full-sleeve-mens-thermal-top-tmlfa9geyxzy8s49 | Flipkart | ₹299 / 665 | 55% |

## Discovery
- 51 new IFS slugs against the previous ticks.
- I dropped 7 before resolving:
  - 6 multi-product "upto N% off" posts.
  - 1 foot-patch item (health claim).
- I resolved the other 44 via base64 `?rto=`.
- 2 were already LIVE from today's telegram ticks: Luxor pen B0CCYPTT2K and Vaseline B08HN3N28W. **42 were fresh.**

## Rejected (22)
- **Amazon (14):**
  - acwo Twister 313: 3.2★
  - Kalaanj kurta, USPA briefs, Eitheo plush, Pepe jeans: no buyable price, no add-to-cart
  - Plantex hooks, slippers, Duracell AAA 12pk, Lavish tealight: 3–5 ratings
  - Shiv trackpant 4pk: 0 ratings
  - Agaro puck screen, Gio watch: only 1 left
  - Wipro Vesta juicer: 3.5★
  - Frontech KB+mouse: 2.7★
- **Flipkart (8):**
  - Hawkins flat tava, Hawkins tawa: only 5–7% off
  - Patalseva kadai: 1 rating
  - Hindware geyser, VGR curler, Giordano watch: no rating on the PDP
  - Nutripro juicer: 3.1★
  - French Connection watch: 3.5★ from 4 ratings

## Freshness
- IndexNow **HTTP 200** for 23 URLs (20 slugs + 3).
- sitemap: ISR 1800s. llms.txt: force-dynamic.

## CEO audit (checked against the DB)
- **Deals:** LIVE 11,635 · PENDING 0 · LIVE null price 0 · LIVE null image 0 · max id 12007.
- **Posts:** coverless 0. Posts today (IST) 3; 09-26 → 09-29 had 4 each.
- **Broadcast cursor:** 11987. That is the DB max before this batch; the external broadcast cron picks up the new batch next run.
- **Prod:** 7/7 endpoints returned 200 (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals`).
- **Unpushed commits:** 0 before this report.
- **Result:** 0 rot.
