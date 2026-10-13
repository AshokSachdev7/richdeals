# DESIDIME tick 2026-10-13k (20:48 IST)

**6 of 22 fresh candidates pushed.**

- Stage 1 found 37 deals, resolved 26 to a single product, and 4 were already in the DB, leaving 22 fresh.
- Bulk push to local `/admin/deals/bulk`: `count:6`, all `created:true`.
- All 6 new deal pages return 200 on prod (0.22–0.38s).
- IndexNow returned HTTP 200 for 9 URLs: the 6 slugs plus the 3 hub pages.

## Pushed (6)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [Philips SceneSwitch 12W LED bulb](https://richdeals.in/philips-sceneswitch-12w-led-bulb-3-in-1-b22-b0ghqblw1g) (B0GHQBLW1G) | Amazon | ₹89 | ₹199 | 55% | 4.0★ (421) | `?tag=ashoksachdev-21` |
| [ASIAN Nexus-11 men's sneakers](https://richdeals.in/asian-nexus-11-mens-printed-sneakers-b0f99zzb33) (B0F99ZZB33) | Amazon | ₹694 | ₹1,499 | 54% | 4.0★ (496) | `?tag=ashoksachdev-21` |
| [Portronics 20W PD wall charger](https://richdeals.in/portronics-20w-pd-wall-charger-type-c-accfzz4nhtuvwuzg) (ACCFZZ4NHTUVWUZG) | Flipkart | ₹199 | ₹1,499 | 87% | 4.2★ (13,785) | `affid=djhackraj` |
| [Bosch Pro 1000W mixer grinder](https://richdeals.in/bosch-pro-1000w-mixer-grinder-mixhgpumugfecgnm) (MIXHGPUMUGFECGNM) | Flipkart | ₹2,999 | ₹10,300 | 71% | 3.9★ (42) | `affid=djhackraj` |
| [Lenovo Idea Tab Plus 6/128GB](https://richdeals.in/lenovo-idea-tab-plus-6gb-128gb-12-1-inch-wifi-tabhqkcsbpgfhghh) (TABHQKCSBPGFHGHH) | Flipkart | ₹26,999 | ₹54,000 | 50% | 4.1★ (17) | `affid=djhackraj` |
| [ASUS Pad 12.2" OLED 8/128GB](https://richdeals.in/asus-pad-12-2-inch-oled-8gb-128gb-wifi-tabhpagf5th5pz2v) (TABHPAGF5TH5PZ2V) | Flipkart | ₹35,990 | ₹62,990 | 43% | 4.2★ (66) | `affid=djhackraj` |

**How they were checked:**

- **Amazon:** a same-origin fetch in the logged-in Playwright Amazon tab.
  - The `#corePriceDisplay` price matched the card price on both.
  - `#availability` reads "In stock" and the add-to-cart button is present on both.
  - The rating comes from the `#acrPopover` title.
- **Flipkart:** an in-tab fetch in a Playwright Flipkart tab, reading the ld+json `Product.offers` block (curl gets a 403).
  - The price matched to the rupee and stock is InStock on all 4.
  - The M.R.P. is the page's own `mrp` field. Three tablet cards had no M.R.P. on DesiDime.
- **Copy:** original, with no fabricated specs.
  - The sneaker and bulb copy tell buyers to confirm size or wattage on the page.
  - Images are from the marketplace CDN.

## Rejected (16)

| Deal | Reason |
|---|---|
| TCL 40" QLED TV (B0DZHRYFG7) | Price drift: ₹20,490 listed vs ₹22,490 live. |
| INALSA garment steamer (B0DB5NGVYN) | "Only 1 left", and rated 3.5★. |
| Eureka Forbes Compact vacuum (B08H29H34F) | Price drift: ₹2,250 listed vs ₹2,499 live. |
| pTron Bassbuds Astra (B0D78YCR1K) | Price drift: ₹497 listed vs ₹599 live. |
| VW 40" QLED TV (B0GXKC3ZXH) | No buy-box price and no add-to-cart button. |
| MacBook Neo (B0GR64G4H6) | Price drift: ₹63,940 listed vs ₹67,990 live. The card price is a bank-card price. |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift: ₹10,861 listed vs ₹15,190 live (fourteenth tick in a row). |
| Rexona roll-on (B018HSHI7Y) | Low-ticket personal-care FMCG (₹57). The card's ₹225 M.R.P. is wrong; the PDP shows ₹114. |
| Acer Iconia Tab iM11 (Flipkart) | No ratings in ld+json. |
| BLACKTANK handkerchief (Flipkart) | Low-ticket (₹16). |
| Heena (Digihaat) | Food rule. No ld+json. |
| Dabur Glucoplus (Instamart) | Health/food rule. Out of stock. |
| MAKITA sander | Out of stock (stage 1). |
| Samsung 60W charger (Flipkart) | Price drift (stage 1). |
| Longway fan (Myntra) | Price drift (stage 1). |
| Digismart fan (Myntra) | Price drift (stage 1). |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 4 (at the cap of 4; the CONTENT-SEO tick should skip) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,466 (+6, this push) |
| Broadcast cursor | 12977 vs DB max 12983. The gap is this tick's 6 deals, waiting for the external broadcast cron; it clears on that cron's next run. |
| Prod endpoints (7) | all 200 in 0.12–0.58s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
