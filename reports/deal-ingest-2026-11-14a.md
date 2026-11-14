# DEAL-INGEST indiafreestuff tick — 2026-11-14a

Ran `ingest-ifs-proper.mjs` stage 1 over `/deals` and `/deals/superdeals`, resolved the base64 `?rto=` Buy Now ids, and took every store. Every candidate price was checked on the live PDP: Amazon in the logged-in Playwright tab, Flipkart in a browser tab (ld+json plus the HTML MRP). Affiliate links come from `ingest.config.json`, copy was rewritten, images are marketplace CDN only. Run late evening IST.

**Result: 57 new deals pushed LIVE (`count:57`, 57 `created:true`, 0 `created:false`): 49 Amazon and 8 Flipkart. 5 dup LIVE rows re-verified and synced in place, each with a priceHistory row. 40 rejects logged. IndexNow HTTP 200 (62 urls). Prod 7/7 returned 200 and every DB check is green.**

## Funnel

| Stage | Count |
|---|---|
| Stage-1 cards | 105 (89 Amazon, 12 Flipkart, 4 hub pages) |
| Amazon fresh / dup | 84 / 5 |
| Amazon PDPs verified | 87 → 49 approved |
| Flipkart PDPs verified | 12 → 8 approved |
| Pushed | 57 |
| Dup rows synced | 5 |

## Pushed (57)

Amazon (49): an apron B0HQDY1ZF8 ₹169, Reebok Rmsora B0F3X4NC46 ₹1,200, NutriGlow facial kit B09NYDG83L ₹249, Thermalright Frozen Notte 240 B0BLJHWVS3 ₹5,251, HOMEKART mink blanket B0HFK5KYQK ₹999, a BSB fitted sheet B0HKHT6XRW ₹829, BrightLyt pendant B09QQVKR7F ₹379, Evani Gluta B0GCMBPRNF ₹329, Beardo de-tan roll-on B0HF87PLV4 ₹217, Irvine mesh chair B0FR9VBG5N ₹3,299, silver dip B0GLPKW3NM ₹189, TAG KBWM1200 combo B0GX772S3S ₹645, two SPARX shoes B0H3KXWD5W ₹1,130 and B0H9DKKBVK ₹1,217, a buckleless belt B0HPZ1FK5B ₹263, inear DJ-M9 B0GH7T9LC9 ₹787, Booma Echo B0FFJJ6GD8 ₹516, an Amazon Basics folder B0D6V8HSJV ₹198, drum-cleaner tablets B0HLSHYYMJ ₹139, Portronics Mobike 4 Plus B0GD6L5F1N ₹420, a 48MP vlog camera B0H8DRWX87 ₹2,999, H2O humidifier B0GQQHYXM4 ₹319, hand-stitched shoes B0F4DD1V42 ₹480, a Better Home bottle B0BWJZXR3M ₹599, 800 TC pillow covers B0DKNZ67YF ₹409, storage jars B0GNZSH6J9 ₹399, Beardo Curls shampoo B0HBC29ZS1 ₹260, a Monique Jaipuri sheet B0BL8FGG7J ₹399, POPWINGS dresses B0CF9BCQHH and B0CB41B8JP at ₹199 each, a TAGAS hoodie B0DP7MKF7J ₹679, Boldfit sliders B0FBFYNPKW ₹299, an INDICRAFTSVILLA bowl B07VX6H4J4 ₹208, D-Link AN3U B0FC2ZGXDN ₹499, JD FRESH containers B0G9J5Z44B ₹799, a knife set B099P1XTDD ₹269, an Amazon Basics microfiber cloth B0FHB7SYS1 ₹342, a Korean night suit B0H62CNBKX ₹499, two neckbands B0HDSRCLY6 ₹799 and B0HDSXQH79 ₹999, a 7-slot organizer B09PZ2BVS1 ₹219, Reebok MEGA Soft B0BRKC7Q84 ₹1,199, Himalaya sunscreen B0F2MYJNCG ₹149, SIMPARTE glass bowls B09D3NPP5Z ₹272, a Schneider Livia grid B08DS76LM4 ₹150, a BSB sherpa blanket B0BC5RYXZ2 ₹999, a Lakme compact B008KH3RH8 ₹440, a ZEBRONICS printer cable B07PB2N62M ₹119, and Symbol girls' shorts B0F79NPMPQ ₹159 (low stock).

Flipkart (8): AsfA M101GPS drone ₹12,443, RAPOO NX1600 ₹798, Eureka Forbes AP 175 HEPA purifier ₹3,999, GAUVIK pendant ₹599, truke Bass 1 Type-C ₹299, FUBAR kurta ₹263, TRIGGR Punkheadz Z5 ₹799, Sansui radiant cooktop ₹2,299. The drone and the Rapoo had no own-`itm` id on the PDP, so they use the `/product/p/itme?pid=` form.

The payload validator checked every row before the POST: title ₹ = price, price < MRP, CDN image host, slug ends in productId, and the affiliate URL pattern.

## Dup re-checks (synced in place, priceHistory row each)

| Row | Deal | PDP | Action |
|---|---|---|---|
| #16507 | Borosil lunch box B0FCLTFBZP | ₹765 / ₹2,195 | Confirmed |
| #10870 | Vaseline Cloud Soft B0F4W9RPZ2 | ₹275 / ₹699 (DB had ₹292) | Repriced to 61% Off. Title fixed, and the per-100 ml copy changed ₹97 → ₹92 |
| #15943 | Noise Buds Mini X B0H6FSKJ5K | ₹999 / ₹2,999 | Confirmed |
| #16090 | Milton Halo 900 B0FDL4M5C6 | ₹448 / ₹560 (DB had ₹299) | Repriced to 20% Off. The description's "47% off" was fixed to 20% |
| #12812 | Caresmith Revive B09ZV233RH | ₹899 / ₹1,500 (the card said ₹692) | Confirmed |

Slugs were untouched (Prisma update by id, not a bulk upsert).

## Rejected (40, appended to `data/dd-rejected.json`)

| Reason | Items |
|---|---|
| Flipkart drift | Limestone watch WATHRFEHGYSM3G2C (₹445 vs ₹422), TCL AC ACNHJPE4Z6Y5GWGY (₹29,990 vs ₹27,490), Vega helmet HLMFZBR9M6UXQP8Z (₹486 = MRP vs ₹437), KP "Airpods Pro" knockoff ACCHJGWVVFQZZCCC (₹650 vs ₹264) |
| Amazon drift | ASUS B0HG8V1GFY (₹1,76,990 vs ₹1,67,990), chair B0HLXLLBFM, Lenovo B0HF7Q4C29 (₹82,990 vs ₹79,740), tights B0FD3MKSGG, Groots B0G94LTQZX (₹99 vs ₹39), mirror B0CZHVQ72Z, Bigbanana B08GSSYQL3, DOMO B0HK7VZJYS, Beyond stove B0HDPM3JN2 (₹7,999 vs ₹5,850), sticker B08B4HH8JY, Clovia B08TMJ3XB5, Milton B0FCMPSGKC (₹2,343 vs ₹699), Btag B0D5LQN2YC, CAHOOT B0CHJLV6LN |
| Brand block drifted (rejected whole) | AutoCart ×5 (B0DV9GG1ZW at ₹199 vs ₹189, plus B0DV9KWZTK, B0DV9MFDXT, B0DV9K1KJF, B0DV9LHF3T); Khadi ×2 (B0GZNWJ21X, B0GZPQN7TQ at ₹299 vs ₹149) |
| 1–3 left in stock | B0BVBVK61Z, B0CGDZNPG3, B0F1MPPGCD, B0CH83BYHH, B0C9CRWKP8, B0CP3NSDKH, B0F1DCCJYB, B0CYKX5G4Q, B0H831YLJ7 |
| No add-to-cart | B0DMKJWWMY, B0H9YM481P, B0F7XHGTPK (a bike booking page) |
| Grocery | Yogabar raisins B0CBRXH9TN |
| Bank-offer price (carried over from tg-monitor 11-14a) | B08SW56CDQ Sennheiser, B0H9FK9XZZ CG Iraya |
| Hub pages (`/b`, `/s?`) | 4 dropped. Not ASINs, so not logged |

B086MLRY4H had been rejected before. 3 of the 40 ids were already in the file, which now holds 1,958 keys.

## Freshness

- IndexNow: `indexnow-ping.mjs` for the 57 new slugs plus the 2 repriced slugs (#10870, #16090) returned **HTTP 200** for 62 urls (59 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale. The deals child is top-100 only by design, so the new rows stay `noindex,follow` until they rank into it.
- `llms.txt`: force-dynamic, so it already carries the batch.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.29s) |
| /offers | 200 (0.23s) |
| /blog | 200 (0.72s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.18s) |
| /api/deals | 200 (0.17s) |
| /llms.txt | 200 (0.62s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,988 = 15,988 (+57) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 486, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,509 vs 16,566 | Pending. The 57 new rows go out on the external broadcast run, which self-heals |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2. OK.

## Still open

- The IFS card prices lied again: 14 single drifts plus 2 brand blocks out of 99 PDPs. Card prices stay unusable without the PDP read.
- Same-price confirm paths in the other ingests still write no priceHistory row. This tick wrote one on every confirm.
- The price-sync helper misses derived copy ("per 100 ml" maths, a second "% off" in the body). Fixed by hand on #10870 and #16090 this tick.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Amazon reuses ASINs (#2351, #15344). Older rows are unchecked.
- Low-stock rows to re-check (carried over), plus the new Symbol shorts B0F79NPMPQ.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
