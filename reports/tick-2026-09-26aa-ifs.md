# DEAL-INGEST indiafreestuff tick 2026-09-26aa (10:45 IST)

**22 deals pushed LIVE (19 Amazon + 3 Flipkart), ids 11390–11411. `/admin/deals/bulk` returned count 22. IndexNow returned HTTP 200 for 25 URLs (22 slugs + 3 hub paths).**

## Discovery
- 5 IFS listing pages, all 200, fetched ≥2.5 s apart.
- 130 slugs found, 69 not seen before. After dropping 5 hub/card-offer slugs, 64 candidates remained, and every base64 `?rto=` Buy Now resolved to a store URL.
- 3 were already in the DB: VCLGGQGGWSY2ZUKM (id 11389), Lakmé CBKGUZ3N6DEV8X6G (id 10782) and VW washer B0G5PN6HHY (id 102).

## Verification
Every price was re-read on the product page; IFS card prices were never trusted.
- **Amazon:** read from `#centerCol` in the logged-in Playwright tab. Feature bullets were read from the same page and are the only source of the copy's specs.
- **Flipkart:** read from the page's ld+json in a browser tab.

### Kept
| Store | Product | Price | M.R.P. |
|---|---|---|---|
| Amazon | American Tourister Cleva S 67 cm | 3,499 | 8,800 |
| Amazon | Aristocrat Altitude Large, Surf Spray | 1,999 | 5,800 |
| Amazon | DROGO Pulse gaming chair, White | 8,998 | 24,999 |
| Amazon | GOBOULT Mustang Nitro (32 dB ANC) | 1,999 | 5,999 |
| Amazon | GOBOULT Mustang Torq | 1,499 | 5,999 |
| Amazon | Haier 630 L Lumiere French door fridge | 1,41,990 | 2,25,000 |
| Amazon | HRX Helium cabin trolley | 1,399 | 9,999 |
| Amazon | HRX Parabola medium trolley | 1,599 | 10,999 |
| Amazon | INALSA Kratos Plus stand mixer, Pink | 6,999 | 14,995 |
| Amazon | itel Zeno 300 | 9,649 | 15,999 |
| Amazon | KEI Homecab 0.5 sq mm wire, 90 m | 1,170 | 2,620 |
| Amazon | MOKOBARA Aisle Trunk set of 2 | 9,799 | 21,999 |
| Amazon | MSI MAG 275UPD E14 27" 4K 288 Hz | 29,999 | 61,999 |
| Amazon | Parker Ambient ball pen | 1,310 | 2,600 |
| Amazon | Parker Aster pen + notebook set | 1,620 | 3,000 |
| Amazon | Parker Aster ball pen | 679 | 1,350 |
| Amazon | Skybags Zephyre 55 cm cabin | 3,069 | 8,250 |
| Amazon | Torche Ironwood laptop table | 2,396 | 6,500 |
| Amazon | Wipro Vesta FS101 cold-press juicer (only 2 left) | 8,999 | 19,999 |
| Flipkart | Kenstar NEXO 5.9 L geyser, pack of 3 | 9,069 | 22,470 |
| Flipkart | TVS Ronin Edition helmet | 807 | 1,069 |
| Flipkart | VGR V-761 women's trimmer | 1,570 | 2,799 |

### Rejected
- **Clip coupon on the page:** Aristocrat Comet, Athom, E Gate, Happy Homes, mini bottle, Naturesmith.
- **Only 1 left:** adidas, CASA-NEST, Puma.
- **Inflated M.R.P. or generic product:** cargo pants, DUDAO cables, Meridian, Plantex, Soroo, and Kashi diya, Pranshi and TOWST (which also had no itm path).
- **No price read:** boAt 255 ANC, Fatak Patak, Kratos, Navneet ×3. **Availability blank:** Havells. **No image:** Hikvision, Faber-Castell.
- **Low-ticket or small discount:** BF/TopTec pens, Parachute, Derma Co, Doms, Reynolds, Yum Yum, Cortina.
- **Flipkart:** Hindware geyser (pack-of-1 vs pack-of-2 ambiguity), Dove (₹590 on the page, not IFS's ₹399), House of Common (no data), Kenstar grill (resolved to a different product).

## Affiliate check
- `/out/11390` → `amazon.in/dp/B0GXYN91N7?tag=ashoksachdev-21`
- `/out/11409` → `flipkart.com/…/p/itm89e3526489d1e?pid=WGYHQU9ENHHZFSDH&affid=djhackraj`

Images are marketplace CDN only (`m.media-amazon.com` `_SL1500_` and `rukmini1.flixcart.com/image/1500/1500`). The script is `apps/api/scripts/push-ifs-0926aa.mjs`, and the Amazon reads are in `az0926aa.json`.

## Freshness
- **IndexNow:** HTTP 200 for 25 URLs.
- **Sitemap:** 10,361 `<loc>`. It is ISR with a 1800 s window, so the batch appears within 30 minutes.
- **llms.txt:** `force-dynamic`, 200.

## CEO audit
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200 (slowest: `/blog` at 0.68 s).
- **Deals:** 11,064 live, 0 pending review, 0 with a null price, 0 with a null image. Highest id 11411.
- **Posts:** 333, with 0 missing a cover and 0 missing SEO fields.
- **Posts per IST day, 09-17 → 09-26:** 1/3/3/2/1/3/2/3/4/2. No day is 0, and today already meets the 2-post rule. The 1 for 09-17 comes from the audit's rolling 10-day window cutting that day off.
- **Broadcast cursor:** 11389 against a DB max of 11411. This batch has not been broadcast yet; the external tg-broadcast cron picks it up. Not rot.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
