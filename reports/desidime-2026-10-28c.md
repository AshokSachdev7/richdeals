# DESIDIME-INGEST · 2026-10-28c (10-28, morning IST)

## Funnel

| Stage | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 31 |
| Junk / grocery / other drops | 8 |
| Non-product drop (`/s?` keychain search page, went to dd-dead) | 1 |
| Resolved to a product (`visit.desidime.com` → merchant) | 22 |
| Already in the DB or rejected within 24h | 10 |
| Fresh | 12 (9 Amazon, 2 Flipkart, 1 Web) |
| Stage-1 skip (Flipkart `price-drift` ×2, JioHotstar `no-ld-json`) | 3 |
| PDP-verified (Amazon in the logged-in Playwright tab) | 9 |
| Rejected (drift / bank-card-only price / no buy box) | 9 |
| **Pushed LIVE** | **0** |
| Price-synced LIVE rows | 1 (#15240) |

Nothing was published, because no card price survived a live read. Half of this sweep was `[HDFC CC]` cards, which show the price after a bank-card discount, not the sticker price.

## Verify table

Amazon was read with a same-origin fetch of `/dp/ASIN?th=1&psc=1`, using `#corePriceDisplay .a-price-whole`, `.basisPrice`, `#availability`, add-to-cart and a `#centerCol` cross-check. There was no captcha, so the mobile-UA fallback was not needed.

| ID | Product | Card ₹ | Live ₹ | Result |
|---|---|---|---|---|
| B092R6DLGS | CELLO H2O glass bottle 920 ml | 114 | 199 | rejected: drift |
| B0GP74SZF2 | Haier 240 L 2★ double-door fridge | 19690 | 24690 (coupon badge) | rejected: drift |
| B0GJDVGS6P | Lloyd 1.5 T 3★ inverter AC | 28740 | 32990 | rejected: drift |
| B0GVJQC3RM | TCL 65" QLED Google TV | 45990 | 58990 | rejected: drift |
| B0CBCPB2T1 | Razer Viper V3 HyperSpeed | 3866 (HDFC CC) | 4295 | rejected: card-only price |
| B0FQPPD7CD | Florance dual-comfort mattress | 5454 (HDFC CC) | 6059 | rejected: card-only price |
| B0GV4143G8 | ASUS ROG Strix XG27ACMES | 20749 (HDFC CC) | 22999 | rejected: card-only price |
| B09XZXP2SW | MSI Modern MD272QXP 27" | 17749 (HDFC CC) | no buy box, no add-to-cart | rejected |
| B0GXZXHBKT | Godrej 272 L 2★ fridge | 21490 | no buy box, no add-to-cart | rejected |
| ACNHJ9ZG5YRNZRJH | Hisense 1.5 T 5★ AC (Flipkart) | 29915 | 39490 | rejected: drift (stage 1) |
| WMNHHAAWQS9RZRYY | Samsung 8 kg washer (Flipkart) | 17490 | 20990 | rejected: drift (stage 1) |
| e146c948292e | JioHotstar ₹1 plan | 1 | — | rejected: account-specific subscription, not a product |

- **Rejects:** all 10 hand-verified rejects were stamped in `data/dd-rejected.json` with `Date.now()`, and the script stamped the 2 Flipkart drifts. The file now holds 647 entries.

## Duplicate re-verify (LIVE rows from 10-28b still on the listing)

| ID | Row | DB ₹ | Live ₹ | Action |
|---|---|---|---|---|
| B0D8L8BNWG | #15240 Orient 40W LED bulb | 329 | **239**, add-to-cart present, no per-unit message | **price-synced** with `prisma.update`: price, title ₹, description ₹ and howTo ₹. Slug unchanged, MRP stays null |
| B0GDPCTM52 | #15241 wooden key holder | 49 | 49 | ok |
| B0HLKCR68D | #15242 Radha Krishna key holder | 39 | 39 | ok |
| SMPHE29J7MB5YC2A | #15243 Dove 1200 ml (Flipkart, in-tab ld+json) | 448 | 448, InStock | ok |

**Script fix:** `ingest-desidime.mjs` now logs every dedup hit as `dup <store> <pid> ₹<card>`. Until now the "already in DB" count named no rows, so a LIVE row whose price had moved could not be re-verified without a second sweep.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run with the synced slug → **HTTP 200 for 4 URLs**.
- **Prod check:** `richdeals.in/orient-eternal-shine-40w-led-bulb-cool-white-b0d8l8bnwg` returned 200.
- **Sitemap:** ISR 1800s.
- **llms.txt:** force-dynamic.

## CEO audit (DB re-read after the sync)

| Check | Result |
|---|---|
| LIVE deals | 14,713 (unchanged) |
| PENDING_REVIEW | 0 |
| LIVE deals with null price / null image | 0 / 0 |
| Max deal id | 15248 |
| Broadcast cursor | `lastId` 15248, equal to the max |
| Posts: total / coverless / missing SEO fields | 440 / 0 / 0 |
| Posts per IST day | 10-21: 3 · 10-22: 3 · 10-23: 3 · 10-24: 3 · 10-25: 2 · 10-26: 4 · 10-27: 3 · 10-28: 2 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. 10-28 already has 2 posts, which meets the daily rule.
