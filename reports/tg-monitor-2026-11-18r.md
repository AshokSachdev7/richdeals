# TELEGRAM-DEAL-MONITOR tick — 2026-11-18r

The tick read the Telegram Web sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate` over `.chat-list .ListItem.Chat`, in the Playwright `richDeals` profile. Shortlinks were resolved. The Amazon candidate was verified with a same-origin fetch of the PDP in the logged-in Amazon tab, reading `.a-price-whole` in the core price block, `#availability`, the add-to-cart button and the hiRes image keyed by `landingAsinColor`. The Shopsy candidates were read from their product pages, which carry no ld+json, so the price came from `"finalPrice"` and `"mrp"` and stock from the absence of the Sold Out widget. Run at about 17:04–17:11 IST.

**Result: 3 deals pushed LIVE (#16826–16828): 1 Amazon and 2 Shopsy. The bulk endpoint returned HTTP 201 with count 3 (all `created:true`), and the readback shows all 3 LIVE. IndexNow returned HTTP 200 for 6 URLs. Prod returned 200 on 10 of 10 endpoints and every CEO-audit check is green.**

## Candidates

| Group | Link | Product | Verdict |
|---|---|---|---|
| ONLINE SHOPPING DEALS | link.amazon/B03mk3JvN | Nescafé Gold Blend, 50 g jar (B07K6L3KC7) | **Pushed as #16826.** |
| Dealzone | bittli.in/UkO71Apl | Zpeldorn Superpods Immersio earbuds (Shopsy XHOHHBQ2XZWCMAGC) | **Pushed as #16827.** |
| SB Loots | bittli.in/JkZKdzoP | Henonix 10W B22 LED bulb, pack of 10 (Shopsy BLZHKMWK3KVG3D6H) | **Pushed as #16828.** |
| CoolzTricks | ajiio.in/BYkfS2j | Spykar / Puma on Ajio | Skipped: category page. |
| Rogerkart | rogerkart.com/r/5EmyAcQ | Lumio Arc 5 | Already seen (#16768). |
| INDIAN CHEAP DEALS | link.amazon/B08FsUNwo | LG | Already seen. |
| NonStopDeals | fkrt.it | Caprese bags | Category post, already seen. |
| Dealdost | — | mCaffeine brand promo | Already seen. |
| Hidden Loot, IFS Tips | — | Swiggy Dineout | Skipped: not a product. |
| RichDeals | — | Our own channel | Skipped. |

Deal Dibba, OMG LOOTDEALS and Loot Deals 24x7 were not among the rendered sidebar rows this tick.

The four new shortlink keys were added to `data/tg-multi-seen.json`, which now holds 5,377 entries.

## Pushed

| id | Store | productId | Product | Price | MRP |
|---|---|---|---|---|---|
| 16826 | Amazon | B07K6L3KC7 | Nescafé Gold Blend Freeze Dried Instant Coffee, 50g Jar | ₹230 | ₹399 (42% off) |
| 16827 | Shopsy | XHOHHBQ2XZWCMAGC | Zpeldorn Superpods Immersio Dolby Audio Wireless Earbuds | ₹426 | — (nulled) |
| 16828 | Shopsy | BLZHKMWK3KVG3D6H | Henonix 10W B22 LED Bulb, White, Pack of 10 | ₹294 | ₹699 (58% off) |

- **Verification:** all three were in stock. Nescafé had an add-to-cart button, and its `landingAsinColor` was "50 g (Pack of 1)".
- **Nescafé MRP:** the PDP's struck-through ₹460 is the per-100 g rate. The real MRP in `#centerCol` is ₹399.
- **Earbuds:** the channel posted ₹428; the PDP read ₹426, which was used. The listed MRP of ₹2,999 would imply 86% off, over the 80% rule, so it was nulled and the page shows the price with no discount claim.
- **Henonix:** the listing is a pack of 10, so "Pack of 10" is in the product name to keep the price honest.
- **Shopsy URLs:** a bare `/p/itm…` returned 404, so the full slug URL was taken from the resolved bittli shortlink.
- **Affiliate matrix:**
  - Amazon: `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
  - Shopsy: Cuelinks (`linksredirect.com/?cid=527&source=linkkit&url=…`). Shopsy is not Flipkart, so the `affid` matrix does not apply.
- **Images:** from the marketplace CDNs (`m.media-amazon.com`, Flipkart's `rukmini` CDN for Shopsy).
- **Copy:** titles and descriptions were written fresh; no channel text was copied.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` for the 3 new slugs, **HTTP 200 for 6 URLs** (the 3 slugs plus the 3 paths the script adds).
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.28s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.97s) |
| /sitemap.xml | 200 (0.10s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.62s) |
| /nescafe-gold-blend-freeze-dried-instant-coffee-50g-jar-b07k6l3kc7 | 200 (0.27s) |
| /zpeldorn-superpods-immersio-dolby-audio-wireless-earbuds-xhohhbq2xzwcmagc | 200 (0.20s) |
| /henonix-10w-b22-led-bulb-white-pack-of-10-blzhkmwk3kvg3d6h | 200 (0.30s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 17:11 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,249 = 16,249 (+3) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,828 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,825 vs 16,828 | OK. #16826 to #16828 are waiting for the external broadcast cron. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4.

## Still open

- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** flaky. 0 of 85 resolved at 18h and 7 of 91 at 18i, so the slot stays on IFS. It gets repointed if a tick resolves 0 again.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499.
- **#16792 Bio-th:** its MRP implies 93% off, so the MRP may be inflated.
- **Old rows with contradictory copy:** rows created before the check can carry a ₹ figure in the title or howTo that differs from `price`.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart price drift; its Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#16768 Lumio:** only 2 units left at ₹5,500 from a third-party seller.
- **DesiDime Flipkart links:** stage 1 skips Flipkart `/a/p/b?pid=` links.
- **IFS Flipkart cards:** stage 1 still nulls `/indiafreestuff/p/` pids. They are recovered by hand in the browser.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs (IST, 11-18): SITEMON 17:50, TG 18:03, CONTENT-SEO 18:39, DESIDIME 18:43, DEAL-INGEST 18:53, INDEXNOW 19:05. On 11-19: SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58. AI-OVERVIEW runs 11-25 at 11:39. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
