# DesiDime tick 2026-10-08h (14:48 IST)

**21 fresh candidates → 3 pushed** (all Amazon). `/admin/deals/bulk` count 3, all `created:true`. All 3 live pages return 200. IndexNow **HTTP 200** for 6 URLs.

Stage 1 discovered 31 cards. 22 resolved to a single product and 1 was already in the DB, which left 21 to check.

## Pushed

| Deal | Price | M.R.P. | Off | Rating |
|---|---|---|---|---|
| [Bose SoundLink Flex portable Bluetooth speaker (2nd Gen), black](https://richdeals.in/bose-soundlink-flex-portable-bluetooth-speaker-2nd-gen-black-b0d6wd2qsq) (B0D6WD2QSQ) | ₹9,999 | ₹16,900 | 41% | 4.7★ (13,105) |
| [EvoFox Metal Claw X85 deskpad gaming mouse pad](https://richdeals.in/evofox-metal-claw-x85-deskpad-gaming-mouse-pad-b0drd52pwk) (B0DRD52PWK) | ₹379 | ₹1,199 | 68% | 4.5★ (174) |
| [Ichaa women night suit set, dark red](https://richdeals.in/ichaa-women-night-suit-set-dark-red-b0dvt7b6pb) (B0DVT7B6PB) | ₹378 | ₹1,999 | 81% | 3.7★ (122) |

All 3 were checked on the Amazon product page in the logged-in tab: `#centerCol` price matched the DesiDime price, `#availability` showed In stock, and add-to-cart was present. Affiliate link is `/dp/ASIN?tag=ashoksachdev-21`. The Ichaa product page lists no feature bullets, so its copy makes no spec claims.

## Rejected (18)

| Candidate | Reason |
|---|---|
| Tata Sampann saffron (JioMart) | Food |
| Moiz face cream | Health / skincare |
| Portronics POR 2192 keyboard (Flipkart) | Price drift, caught by stage 1 |
| Kiki sofa | ₹16,499 vs ₹8,499 posted, and only 10 ratings |
| Lifelong 3-in-1 slide | ₹1,999 vs ₹1,799 |
| Racold Eterno Pro geyser | ₹7,999 vs ₹6,985 |
| Fastrack watch | ₹1,136 vs ₹1,023 |
| HP Victus laptop | ₹99,990 vs ₹96,990, and no ratings |
| ASUS Vivobook S16 | ₹1,13,990 vs ₹1,05,188 |
| OnePlus Nord Buds 3r | ₹1,699 vs ₹1,499 |
| GK Elite solar light | ₹749 vs ₹374, and no ratings |
| Samsung 189L fridge | ₹17,990 vs ₹13,990 |
| Gillette BT3 trimmer (Flipkart) | ₹999 vs ₹626 |
| adidas Smphny, adidas Halorun | 6 and 3 ratings (below the 8-rating minimum) |
| U.S. Polo Erwin, adidas Basic Run | 3.4★ and 3.3★ (at or below the 3.5 cutoff) |
| EVM Grand 19" monitor (Flipkart) | Misleading listing. It claims an OLED panel with an "OLED backlight" at 1366×768 for ₹2,199. No rating, and the sale had not started yet. |

## CEO audit (14:48 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 3 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,272 |
| Broadcast cursor | 12788 vs DB max 12791. The 3 new rows are waiting for the external broadcast cron, which catches up on its own. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
