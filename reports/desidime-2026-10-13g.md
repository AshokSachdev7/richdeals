# DESIDIME tick 2026-10-13g (12:50 IST)

**5 of 17 fresh candidates pushed.**

- Stage 1 discovered, resolved and DB-deduped 17 fresh single-product candidates.
- Bulk push to local `/admin/deals/bulk`: `count:5`, all `created:true`.
- All 5 new deal pages return 200 on prod (0.19–0.30s).
- IndexNow returned HTTP 200 for 8 URLs: the 5 slugs plus the 3 hub pages.

## Pushed (5)

| Deal | Store | Price | M.R.P. | Off | Rating | Affiliate |
|---|---|---|---|---|---|---|
| [Logitech K120 wired USB keyboard](https://richdeals.in/logitech-k120-wired-keyboard-usb-spill-resistant-b006fepro4) (B006FEPRO4) | Amazon | ₹625 | ₹795 | 21% | 4.3★ (8,753) | `?tag=ashoksachdev-21` |
| [Noise Airwave Max 5 ANC headphones, Mauve Haze](https://richdeals.in/noise-airwave-max-5-anc-headphones-mauve-haze-b0fs1sd28q) (B0FS1SD28Q) | Amazon | ₹3,499 | ₹5,999 | 42% | 4.2★ (786) | `?tag=ashoksachdev-21` |
| [Dollar Bigboss Derby RN cotton men vest](https://richdeals.in/dollar-bigboss-derby-rn-cotton-men-vest-vesg9npdhfv3wvhg) (VESG9NPDHFV3WVHG) | Flipkart | ₹160 | ₹582 | 73% | 4.3★ (58,515) | `affid=djhackraj` |
| [xaipro rides 14T Rocky kids road cycle](https://richdeals.in/xaipro-rides-14t-rocky-skyblue-kids-road-cycle-cceg8ghcsc5h6yta) (CCEG8GHCSC5H6YTA) | Flipkart | ₹1,799 | ₹5,999 | 70% | 3.8★ (24,307) | `affid=djhackraj` |
| [VESCO Drift 24T 7-gear kids MTB cycle](https://richdeals.in/vesco-drift-24t-kids-7-gear-mtb-cycle-front-suspension-cceh4gyfwaz5ggrb) (CCEH4GYFWAZ5GGRB) | Flipkart | ₹4,999 | ₹14,999 | 67% | 3.9★ (20,553) | `affid=djhackraj` |

**How they were checked:**

- **Amazon:** a same-origin fetch in the logged-in Playwright Amazon tab.
  - The `#corePriceDisplay_desktop_feature_div` price matched the card price on both.
  - `#availability` reads "In stock" and the add-to-cart button is present on both.
  - **K120 M.R.P.:** DesiDime said ₹1,084, but the PDP shows ₹795. We used ₹795, which gives 21% off, not the card's 42%.
- **Flipkart:** the ld+json `Product.offers` block.
  - The price matched to the rupee and stock is InStock on all 3.
  - The ld+json `aggregateRating` gives each a rating of 3.8 or higher, from 20,000+ ratings, so all 3 clear the ≤3.5 reject rule.
  - **Vest pack size:** the card says "pack of 3", but the PDP title does not confirm it. The copy makes no pack-count claim, and the how-to steps tell buyers to confirm pack and size on the page.
- **Copy:** original, with no fabricated specs. Images are from the marketplace CDN (m.media-amazon.com and rukmini1.flixcart.com).

## Rejected (12)

| Deal | Reason |
|---|---|
| Lenovo IdeaPad Slim 3 (B0HGXVSQ9R) | 0 ratings. The price matched. |
| wipro 7W LED panel (B0CGD25KT3) | "Only 1 left in stock". |
| Lenovo Tab Plus Gen 2 (B0H5C6YBPN) | Price drift: ₹28,249 listed vs ₹31,999 live. The card price is a bank-card price. |
| Xiaomi Pad 8 (B0GPVX566R) | Price drift: ₹40,499 listed vs ₹47,999 live. |
| wipro 10W bulb 3-pack (B0F37YZ67V) | Low-ticket (₹139). Pack size is unclear (the page shows a per-unit rate) and there is no clear M.R.P. |
| Hero Destini scooter (B0GRGBKF52) | A booking listing, not a product. |
| Health Ok multivitamin | Health rule. |
| Nilkamal Sierra recliner (B0BVRGMDPQ) | Price drift (tenth tick in a row). |
| Digihaat jaggery | Food rule. No ld+json. |
| Makeup Revolution brush (Myntra) | Price drift (stage 1). |
| GOAL BMX cycle (Flipkart) | Price drift (stage 1). |
| Instamart powerbank | Out of stock. |

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 3 (within the 2-3 rule, cap 4) |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,457 (+5, this push) |
| Broadcast cursor | 12969 vs DB max 12974. The gap is this tick's 5 deals, waiting for the external broadcast cron; it clears on that cron's next run. |
| Prod endpoints (7) | all 200 in 0.10–1.06s |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
