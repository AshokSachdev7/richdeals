# DEAL-INGEST indiafreestuff tick 2026-09-26ag (14:35 IST)

**51 deals pushed LIVE (50 Amazon + 1 Flipkart), ids 11416–11466. `/admin/deals/bulk` returned count 51. IndexNow: HTTP 200 for the first 35 URLs; the 20 missed slugs got 422 on retry, then Bing GET 200 ×20.**

## Sweep
- 84 IFS rows resolved from base64 `?rto=` Buy Now ids to real store URLs.
- Every Amazon ASIN was re-read on the PDP in the logged-in tab (`#centerCol` price, `#availability`, `#landingImage` hi-res, bullets). Flipkart pids were read from ld+json in a browser tab.
- Copy was written from the PDP title and bullets only, using the GEO playbook structure. Images are marketplace CDN only (`m.media-amazon.com`, `rukmini1.flixcart.com`).
- Script: `apps/api/scripts/push-ifs-0926ae.mjs`. Its gates: title price equals the price, price is below M.R.P., drift ≤₹1 vs the PDP, in stock, the image passes the CDN regex, no duplicate slugs, and every ₹ in the copy is the live price (or an "about ₹" per-unit / M.R.P. mention).

## Accepted (51)
- **Amazon (50):** Acer Nitro Katana controller, Amazon Basics mirror, Symactive gloves, Babbler belt, Baseus hub, Belkin cable, Cortina towels, Crompton battens ×6, Cutting Edge organiser, Derwent sketchbook, Devkund aloe gel, Ekan bottle, Fashnex knee support, Fastrack FT75 bag, Fire-Boltt Phoenix Air, SS304 cutting board, Foodie Puppies bag holder, Greciilooks co-ord, Highlander shirt and jeans, Ichaa nighty, Kratos Pop earbuds, Kuber saree covers, LEOTUDE tee, LITZO night suit, Mila Beauté lip balm, Milton ×6 (Candy, Evoke, Halo, Pearl, Super Sherry, Tasty 3), Treo by Milton glass tumblers and ceramic mugs, Intra bus toy, Nexa sink, Nippon Atom 20 L, OFIXO card holder and sticky notes, Orgatre touch-up, Philips 3W ×6, Plantex towel rings, Portronics Toad 103, pTron Studio, Shuban display books, SIMPARTE containers, TEKCOOL duster, V-Guard Windle fan, Veet Pure 30 g, Xtore planters.
- **Flipkart (1):** Crompton 48 LED rice lights at ₹79 (M.R.P. ₹400).

## Rejected (33)
| Reason | Items |
|---|---|
| Clip coupon (the IFS price only exists after it) | B0F2T9G8PF Presto, B0DVZGY3Y4 Aurum, B000OV0X34 Intex, B08BK2ZH92, B0GTZVP7WD, B0FDGVNSLH Samsung, B083JXG8G9 Timex, B0GRJC9GBV Treziya, B0DJHCSHCY Vokka |
| Price drift | B0DF2F1G22 (₹900 vs ₹276 listed), B0GTLF87N2 Milton Summit (₹598 vs ₹399), B0G6TGT9GH Streetjam (₹2198 vs ₹769), MCWHF6F5XYSWVS67 Ayush mop (₹338 vs ₹298) |
| Unavailable | B00PC71EOW, B0GVS593CG, B0DPKT3M6V, B0FFMYR7YG, B0F4MVMD8B, B084TFZBT3 |
| Already LIVE (dedup) | B0FH6N8GRZ Milton Sherry, B0DBQDQMNV Zebronics |
| 1★ rating | B0CY2KTKVN, B0DHSDL78M SYGA |
| Only 1 left / thin | B0CJJJ95GZ, B0FL7DZ77Y Treo Cove |
| No image | B0FM4CSG2V |
| Colour-variant near-dup | B0FGKD2R2C, B0F942P7KG (Treo) |
| Min buy 2 | B07YWNQPY7 |
| Grocery | B0H6FSK3NV |
| Pack ambiguity | B01N5A96TY |
| M.R.P. unreadable on Flipkart PDP | WGYGGSM5JHVNYVGT Activa geyser, TKPGS23JTSZYZAFH Pepe track pants ×2 |

## Verification
- `/out/11416` returns 302 to `amazon.in/dp/B0G2YVFDPY?tag=ashoksachdev-21`.
- `/out/11466` returns 302 to `flipkart.com/…?pid=RCLH3ZWHYGHMHWAW&affid=djhackraj`.
- The prod `/api/deals` list is headed by id 11466.

## Freshness
- **IndexNow:**
  - First POST: HTTP 200, 35 URLs (32 slugs + 3 hub paths). The slug list was cut short by a `tee | head` pipe.
  - The 20 missed slugs were retried as one POST, which returned 422 (rate limit).
  - Bing GET fallback: 200 ×20. All 51 slugs have now been pinged.
- **Sitemap:** 10,430 `<loc>` (was 10,384). ISR 1800 s.
- **llms.txt:** 200.

## CEO audit
- **Prod:** all 7 endpoints return 200, all ≤0.45 s.
- **Deals:** 11,119 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11466.
- **Posts:** 334, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/3. No day is 0.
- **Broadcast cursor:** `lastId` is 11420 against a DB max of 11466. The external tg-broadcast cron is draining the batch; this self-heals, not rot.
- **Git:** 0 unpushed commits before this commit.

Verdict: green.
