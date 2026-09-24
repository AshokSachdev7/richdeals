# DEAL-INGEST indiafreestuff tick — 2026-09-24e

**Published: 21 deals LIVE** through `/admin/deals/bulk`. The response was `count:21` with every row `created:true`, and they read back as LIVE (ids 11003–11023).
IndexNow: **HTTP 200 for 24 URLs** (21 slugs + 3 hub paths).

## Funnel
- `/deals` and `/deals/superdeals` listed 69 slugs. 61 were new, and 40 passed the junk filter. All 40 base64 `?rto=` Buy Now links resolved.
- Price verification:
  - **Amazon:** every ASIN checked on the product page in the logged-in tab (`#centerCol`).
  - **Flipkart:** ld+json read in a Playwright tab through the IFS dl link, then the `/p/itm` path re-opened to confirm the pid.
- **21 verified: 17 Amazon, 4 Flipkart.**

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| Aristocrat Oasis Plus 69 cm soft trolley (+15% coupon) | Amazon | B0C8YWB46Y | 1800 | 9000 | 80% |
| Bella Vita CEO Man body wash 500 ml | Amazon | B0CGLR5MTR | 200 | 499 | 60% |
| Clay Craft Vacbott Sonic Pro 550 ml | Amazon | B0G3XBGPG8 | 364 | 999 | 64% |
| D'Velas Earth & Ember candle set | Amazon | B0FFHBK89D | 256 | 2799 | 91% |
| USB-C arc gas lighter (+19% coupon) | Amazon | B0H8ZDTZJ5 | 169 | 799 | 79% |
| JK Vision fascia massage gun | Amazon | B0HKRRBRQH | 1649 | 8999 | 82% |
| Karnage by EVM Visage 95 keyboard | Amazon | B0GR5KY1TD | 1899 | 4999 | 62% |
| Kronokare onion+rosemary oil, pack of 3 | Amazon | B0GPXTLGDX | 360 | 900 | 60% |
| Marwadi Farm Afghani anjeer 1 kg | Amazon | B0GC6DF1FY | 399 | 1399 | 71% |
| Mumma's LIFE spin mop (+2% coupon) | Amazon | B0FJXVNK41 | 699 | 1299 | 46% |
| Nirlon Bling kadhai 24 cm | Amazon | B08GC2BBFZ | 1042 | 3495 | 70% |
| Red Tape activewear tee | Amazon | B0DZ6PZ8JN | 653 | 2799 | 77% |
| Safari 55 cm cabin trolley | Amazon | B097JLKP8X | 2299 | 8800 | 74% |
| Spykar sweatshirt | Amazon | B0BP2RTPRL | 654 | 2599 | 75% |
| SX Fitness 14 kg home gym | Amazon | B08LSPTLN4 | 899 | 2999 | 70% |
| TAG Gamerz Titan RGB headphone | Amazon | B0FN7T6K73 | 1038 | 2199 | 53% |
| Zebronics Shark Lite mouse | Amazon | B0CGXPQQC6 | 699 | 1999 | 65% |
| Aqueria 3-in-1 sunscreen SPF50 100 g | Flipkart | SNRHQKD9HF8FGNNB | 198 | 899 | 78% |
| Frontech SPK-0004 speakers | Flipkart | ACCGUSZZZPAT5PKS | 575 | 900 | 36% |
| Kichenkraft apple fruit basket | Flipkart | FVBHFZHJFRKGXZUT | 149 | 1500 | 90% |
| Van Heusen VH000066D women's watch | Flipkart | WATHDGZDDYRAZYP6 | 1299 | 4799 | 73% |

Coupon deals are listed at the live pre-coupon price. The coupon is named in howTo step 4.

## Rejected
| Product | Reason |
|---|---|
| French Connection watch B0D78PJTPB, Zebronics monitor B0GVG74WTK | Unavailable |
| Puma Pacer B0BHSW2R7N | Drift: ₹1326 on IFS, ₹1799 live |
| Sika grout B0C24QCFWT | Drift: ₹396 on IFS, ₹1013 live |
| Skip Hop backpack B08WXWXW6P | Drift: ₹800 on IFS, ₹4200 live |
| Skip Hop Moby tub B01AFQI3J8 | Drift: ₹364 on IFS, ₹4356 live |
| B0H4V141F8, B0DSLC124L | Already LIVE |
| Flipkart: Devam pencil box, Everyuth, Fibbizz, Finifab frother, IBI dispenser, Softton | Price drift |
| Flipkart: Harvard tee | Out of stock |
| Flipkart: SmartBuy heater, Frontech 12W, The Man Company pomade | No verifiable `/p/itm` canonical |

## Gates
- Title ₹ equals price, and price is below MRP.
- Images come from the marketplace CDN only (`m.media-amazon.com`, `rukmini1.flixcart.com`), with no thumbnails.
- Descriptions are original and ≥900 chars, and each deal has 4 howTo steps.
- Affiliate:
  - Amazon: `/dp/ASIN?tag=ashoksachdev-21`
  - Flipkart: `/p/itm…?pid=…&affid=djhackraj`
- `tg-multi-seen.json` now holds 1864 entries. Script: `apps/api/scripts/push-ifs-0924e.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10676, EXPIRED 259, max id 11023, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 327 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. None are 0, and none are above the cap.
- **Broadcast cursor:** re-read the file. lastId is 11002 against a max of 11023, a gap of exactly this batch. The external cron drains it, so it self-heals.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.
