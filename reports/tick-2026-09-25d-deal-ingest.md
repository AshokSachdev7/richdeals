# DEAL-INGEST (indiafreestuff) tick — 2026-09-25d (00:46 IST)

**12 deals published LIVE** (9 Amazon + 3 Flipkart).
- `/admin/deals/bulk` returned **count 12**, all `created:true`.
- LIVE deals went from 10734 to 10746, and the max deal id is now 11093.
- IndexNow returned **HTTP 200** for 15 URLs (12 deal slugs plus 3 hub URLs).

## Funnel
| Stage | Count |
|---|---|
| Listing slugs | 68 |
| Not seen before | 61 |
| Single-product candidates (hub posts dropped) | 53 |
| Buy Now `?rto=` resolved to a store | 53 (36 Amazon, 16 Flipkart, 1 Myntra) |
| Amazon already in DB | 6 |
| PDP-verified and published | **12** |

The yield was 12 out of 47 checked. IFS card prices were wrong again on most of the rest, so every price was re-checked on the product page.

## Published
| Store | ID | Deal | Price | MRP |
|---|---|---|---|---|
| Amazon | B0DBDTG3TW | LA VERNE sherpa reversible blanket, King | ₹329 | ₹4,999 |
| Amazon | B0H42BJQPH | Core set of 2 trolleys, cabin + medium | ₹2,199 | ₹20,998 |
| Amazon | B0GHYLQF4T | Soul & Scents Ocean fragrance oil 15 ml | ₹199 | ₹499 |
| Amazon | B0H41XPLWK | Meridian set of 2 trolleys | ₹2,499 | ₹22,998 |
| Amazon | B0GWLTV2N2 | Hydra BOOMBAR 2.1 soundbar 180W | ₹7,238 | ₹25,999 |
| Amazon | B0BGPN4GGH | Lifelong Dyno 800W quartz heater (ISI) | ₹549 | ₹2,000 |
| Amazon | B0D9JN9HZ9 | Nerf Super Soaker Mega Dunk-Fill 1005 ml | ₹349 | ₹1,799 |
| Amazon | B0GD1SF3CL | Lifelong air fryer oven 10L | ₹4,999 | ₹17,999 |
| Amazon | B0FRNQ5QT6 | Tokyo Talkies women top (3 left) | ₹194 | ₹1,499 |
| Flipkart | PSLHQEJZW4ME2ZDS | Nutrabay Gold pea protein | ₹1,149 | ₹1,899 |
| Flipkart | SHKGZN77YYZJ7YMG | STELITE 5-layer shoe rack | ₹248 | ₹1,826 |
| Flipkart | SHRG4WPHKNAXVC8Z | LetsShave Evior face razor (min order 2, noted in how-to) | ₹99 | ₹857 |

How the published deals were checked and built:
- **Amazon:** price, stock and image were read in the logged-in tab (`#corePrice` / `#centerCol`). Images are `m.media-amazon.com` `_SL1500_`.
- **Flipkart:** price and stock come from the ld+json on each product's own `/p/itm…?pid=` page. Images are `rukmini1.flixcart.com`.
- **Content:** all copy is original. Each deal has 3 paragraphs of at least 900 characters plus a 4-step how-to.
- **Affiliate links:** Amazon uses `?tag=ashoksachdev-21`. Flipkart uses `affid=djhackraj`.
- **Script:** `apps/api/scripts/push-ifs-0925d.mjs`.

## Rejected
| Reason | Items |
|---|---|
| Coupon-dependent price, coupon not verifiable (whole brand block) | Shayan mattresses ×4; Furniture Cafe tables ×4 (list price ₹2,589–2,889 vs IFS ₹489–1,389) |
| Price drift on PDP | Kozynap mattress (₹18,258 vs ₹11,258), FIORRA kurta (₹976 vs ₹927), Eveready LED (₹85 vs ₹44), Haier fridge (₹64,199 vs ₹59,199), Zoom G11 (₹49,699 vs ₹29,725), Beardo deo (₹188 vs ₹102), Beardo wax perfume (₹130 vs ₹104), AXE 200 ml (₹679 vs ₹520), Kent purifier (₹7,013 vs ₹6,316, IFS figure was a bank-card price) |
| Out of stock / unavailable / no price | Core cabin suitcase, Amazon Basics containers, Solimo jar set ×2, BOYA vlog kit, uhuru mic, Behringer mixer, **Myntra DIESEL DZ1763I** (OutOfStock, ₹14,995 vs IFS ₹4,348) |
| Low-ticket FMCG, per-unit MRP | ThriveCo shampoo |
| Flipkart price OK but the product's own `/p/itm` path could not be found | Jitesh singhasan, Zebronics 22" monitor, AXE 100 ml, bird house, BSC Little Beach 15 ml |
| Flipkart PDP unverifiable (429 or no ld+json) | Peter England suit, nirton stool, GiftDenaHai temple, Palkolink shoe stand |

## Freshness
- **IndexNow:** HTTP 200 for 15 URLs.
- **Prod pages:** two of the new deal pages (`/stelite-…`, `/la-verne-…`) were spot-checked and both return 200 on prod.
- **Sitemap:** served under ISR (`revalidate` 1800), so it picks the batch up within 30 minutes.
- **llms.txt:** force-dynamic, so it is already current.

## CEO audit (checked against the DB and prod)
- **Deals:** 10746 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image.
- **Posts:** 328 in total, 0 coverless, 0 seoless.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3, 09-25=1 so far (it is 00:46 IST). No finished day at 0.
- **Broadcast cursor:** 11081, against a max deal id of 11093. The 12 new rows are waiting for the external tg-broadcast cron. This is expected, not rot.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
