# TELEGRAM-DEAL-MONITOR tick — 2026-11-16e

The tick read all 13 groups from `data/tg-groups.json` in one `browser_evaluate` over the Telegram Web sidebar (Playwright, richDeals profile). It deduped against `data/tg-multi-seen.json` and the live DB productId, and verified every price on the Amazon PDP in the logged-in tab. Run at about 14:03–14:15 IST.

**Result: 3 pushed LIVE (bulk count 3, all `created:true`). IndexNow returned HTTP 200 for 6 urls. All three deal pages return 200 on prod.**

## Pushed

| Id | Store | Deal | Price | MRP | Off |
|---|---|---|---|---|---|
| 16673 | Amazon | MollisHomes Single Bed Comforter 220 GSM, 150x220 cm, Teal Mosaic | ₹649 | ₹1,799 | 64% |
| 16674 | Amazon | La' French Luxury Perfume Gift Set for Men, 4 x 30ml EDP | ₹549 | ₹1,196 | 54% |
| 16675 | Amazon | Pigeon Healthifry Digital Air Fryer, 4.2 Litre, 1200W, Green | ₹2,799 | ₹5,995 | 53% |

- Source group: SB Loots. All three were bare "BUY - amazn.lt/…" posts (11:33 AM to 02:00 PM). The SB Loots chat was scrolled to the bottom and every amazn.lt link from today was resolved. Two (B082GB1N7K, B0FM8D7C1Z) were already in the seen file; the other three were new to both the seen file and the DB.
- Source tag stripped: `bhavesh015-21`. All three carry `?tag=ashoksachdev-21` on `/dp/ASIN`.
- Prices come from `#corePriceDisplay_desktop_feature_div .a-price-whole`. All three were in stock with an add-to-cart button, and none showed a coupon.
- The La' French PDP's first `a-text-price` was a per-ml rate (₹4.58). The real M.R.P. (₹1,196, the `basisPrice`) was re-read; ₹549 against it is 54% off, matching the PDP badge.
- Images come from `#landingImage` data-old-hires on m.media-amazon.com.
- The copy uses only facts from the PDP title (size, GSM, bottle count and notes, wattage and capacity). No features were invented.
- Pre-flight passed: every ₹ in the copy equals the price or M.R.P., the image URLs are valid and the slugs are unique.
- Slugs: `mollishomes-single-bed-comforter-220-gsm-150x220-cm-teal-mosaic-b0hgr9b52x`, `la-french-luxury-perfume-gift-set-for-men-4-x-30ml-edp-b0f6kcznyx`, `pigeon-healthifry-digital-air-fryer-4-2-litre-1200w-green-b0b8xnpqpn`.

## Rejected / skipped

- Dealzone (01:41 PM): "Soft toys start at ₹171", a category link.
- CoolzTricks (01:17 PM): H&M on Myntra, up to 70% off, two category links plus coupons.
- SB Loots: Shopsy loot (4 category links), Glitchez jackets on Myntra (category), USPA/Marks & Spencer on Ajio (category hub), Myntra men's casual shirts (master link plus brand links), and two bare bittli.in BUY links. bittli links in this group have resolved to category pages in earlier ticks. The Arrow blazer post was handled in tick d.
- Unchanged since tick d: ONLINE SHOPPING DEALS (Samsung, pushed as #16671), Dealdost (Scapia), Rogerkart (photo only), Hidden Loot and IFS Tips (Swiggy), and INDIAN CHEAP DEALS and NonStopDeals (both stale).

`data/tg-multi-seen.json` now has 5,177 entries (not committed).

## Freshness

- IndexNow: `indexnow-ping.mjs` with the 3 slugs (plus its 3 hub urls) returned **HTTP 200 for 6 urls**.
- `sitemap.xml`: ISR, at most 30 min stale. The deals child is top-100 only, by design.
- `llms.txt`: force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 |
| /offers | 200 |
| /blog | 200 |
| /sitemap.xml | 200 |
| /feed.xml | 200 |
| /api/deals | 200 |
| /llms.txt | 200 |
| /mollishomes-single-bed-comforter-220-gsm-150x220-cm-teal-mosaic-b0hgr9b52x | 200 |
| /la-french-luxury-perfume-gift-set-for-men-4-x-30ml-edp-b0f6kcznyx | 200 |
| /pigeon-healthifry-digital-air-fryer-4-2-litre-1200w-green-b0b8xnpqpn | 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,096 = 16,096 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,675 | OK |
| Posts | 490, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,672 vs 16,675 | OK. The external broadcast cron picks up this batch on its next run. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 2**. The 18:39 IST CONTENT-SEO run may add a third (cap 4).

## Still open

- The IFS source is blocked (every `?rto=` redirects home). The 14:53 IST IFS tick probes one id first.
- #9689 Haier washer has no buy box; on watch.
- #14635 (Mivi, Flipkart) has no priceValidUntil.
- #11896: Flipkart drift, lapses 11-18.
- 94.2% of LIVE deals have no priceValidUntil.
- Low-stock re-check list: #7461, #16506, #16558, #16610, #13537, B0BWJWTRGC, #360, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- ASIN reuse (#2351, #15344, #6989). B0C7BM7L45 has two LIVE pages (#5577, #7673).
- #652 keeps its legacy slug.
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
