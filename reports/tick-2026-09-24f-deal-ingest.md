# DEAL-INGEST indiafreestuff tick — 2026-09-24f

**Published: 24 deals LIVE** through `/admin/deals/bulk`. The response was `count:24` with every row `created:true`, and each read back as LIVE (ids 11028–11051).
IndexNow: **HTTP 200 for 27 URLs** (24 slugs + 3 hub paths).

## Funnel
- **Discovery:** 68 slugs from `/deals` + `/deals/superdeals` (both 200, ≥2.5s apart).
  - 47 were new against earlier ticks.
  - 42 candidates after dropping the "upto N% off" hubs and deals already published.
  - All 42 Buy Now links (base64 `?rto=`) resolved.
- **Duplicates already LIVE (6):** WAPHMGNKB6T9FSZH (3609), B0FC6RGJTT (1967), B00PC72DMO (3837), B0F6TZBQK4 (6949), B07F2QCLP2 (1098), B00NYQSIY2 (806).
- **Amazon:** verified in the logged-in tab (`#centerCol`). 14 publish, 7 reject.
- **Flipkart:** verified in the Playwright tab via ld+json price and InStock. The `/p/itm` path comes from the dl link. 10 publish, 5 reject.

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| 30 cm rechargeable LED under-cabinet light | Amazon | B0HC7KXN8M | 499 | 1099 | 55% (+30% coupon) |
| Solimo SS kadhai with glass lid, 20 cm | Amazon | B0DY4JVDSG | 494 | 999 | 51% |
| Solimo SS bottles, set of 3, 970 ml | Amazon | B0DCG58QQ9 | 498 | 1799 | 72% |
| Attro non-stick grill pan, 24 cm | Amazon | B08DGP11M2 | 473 | 1199 | 61% |
| Toshiba 55" 4K QLED TV | Amazon | B0FDL2B53V | 41990 | 53999 | 22% |
| Coconut SS U5 milk pot, 2000 ml | Amazon | B07ZVRW5Q8 | 553 | 789 | 30% |
| Giordano women's white dial watch | Amazon | B07NQL72FP | 2698 | 11590 | 77% |
| Halonix 70W outdoor LED flood light | Amazon | B0FWCJXL3W | 1199 | 1699 | 29% |
| Milton Cool Touch Epic 800 tiffin, set of 2 | Amazon | B0DG96XKTW | 499 | 845 | 41% |
| POPWINGS V-neck tops combo | Amazon | B0CGNHVV84 | 194 | 2499 | 92% |
| Sakura goldfish food, 2 kg | Amazon | B0DTTF3KZJ | 2331 | 2590 | 10% |
| Spykar slim trackpants, grey melange (XL) | Amazon | B0BCG65LPG | 737 | 2899 | 75% |
| SteelSeries Aerox 3 Wireless | Amazon | B08KWKDRFF | 4144 | 13999 | 70% |
| WaterScience CLEO shower/tap filter | Amazon | B08L3DW3GM | 1495 | 2295 | 35% |
| boAt Storm Infinity Plus | Flipkart | SMWHB97A4F7FKFCN | 999 | 6499 | 85% |
| JMB 20 kg PVC dumbbell set | Flipkart | FWTGEDV2MCH398J4 | 847 | 3649 | 77% |
| KR Toys combo of 12 soft toys | Flipkart | STFHGXMAZ7NNG2GH | 447 | 1999 | 78% |
| Lyphy men beige shirt | Flipkart | SHTHZV5VQQ2XGDDK | 379 | 2499 | 85% |
| Maybelline Matte Ink 50 Voyager | Flipkart | LSKFANUB6ETQGBGW | 310 | 749 | 59% |
| Nutriburst marine collagen, orange | Flipkart | VSLHEX7F9EK9FSF5 | 314 | 799 | 61% |
| Nutriburst D3 + K2 | Flipkart | VSLHGYCMKWXQTBHC | 324 | 799 | 59% |
| Osjs 4 ft teddy bear, 120.5 cm | Flipkart | STFG8DEGAAY86JYM | 362 | 2999 | 88% |
| saipro ROXON badminton set of 2 | Flipkart | KITG5AXGZEHPZDTY | 167 | 999 | 83% |
| Solbiza men checkered shirt | Flipkart | SHTHZQSSWRCJ55UY | 484 | 1298 | 63% |

Notes:
- **Toshiba:** IFS listed it at a price that needs an Axis card. We publish the plain live price (₹41,990).
- **Low stock:** the Coconut and Giordano listings each had only about 2 units left.

## Rejected
| Product | Reason |
|---|---|
| Allen Cooper boot B09BYYJH4N | Unavailable |
| Levi's 512 B0DK7NWWW6 | Unavailable |
| reMarkable folio B0BXPQB5CS | Unavailable |
| Xtreme mixer B0C3H77V76 | Unavailable |
| ATTRO bottle B0CXDQ1DYQ | No MRP on the page |
| PW CBSE book 937818930X | No MRP on the page |
| Scrubber B0FPG8GZ77 | No image |
| CMF 65W charger ACCGSG9PSGMRVTHQ | Drift: live 2499 vs IFS 971 |
| FITKIT walking pad TRDHPJJ5WDZSTZAS | Drift: 7499 vs 6590 (IFS price was card-only) |
| Powermax walkpad TRDHMSGFFPNYAEJG | Drift: 8999 vs 7800 (IFS price was card-only) |
| livro pouch PPSHNG4RDTE9MRFM | Drift: 126 vs 118 |
| Reginald sunscreen SNRHHHE6SZC6ZFVT | Drift: 435 vs 369 |

## Gates
- Title ₹ equals price, and price is below MRP.
- Images come from `m.media-amazon.com` `_SL` or `rukmini1.flixcart.com` 1500px. No thumbnails.
- Descriptions are original and ≥900 chars, and each deal has 4 howTo steps.
- Only facts that were verified are included. Two unverified claims (a motion sensor, a licence note) were cut before the push.
- Affiliate: Amazon `?tag=ashoksachdev-21`; Flipkart `/p/itm…?pid=…&affid=djhackraj`.
- `tg-multi-seen.json` now holds 1907 entries. Script: `apps/api/scripts/push-ifs-0924f.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10704, max id 11051, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 327 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. None are 0, and none are above the cap.
- **Broadcast cursor:** lastId is 11027 against a max of 11051, a gap of 24: this batch. The external cron drains it, so it self-heals.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
