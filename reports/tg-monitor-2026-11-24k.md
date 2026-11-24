# TELEGRAM-DEAL-MONITOR tick — 2026-11-24k

This tick ran at about 11:05–11:22 IST on 11-24. It used the Playwright MCP with the logged-in richDeals profile. One `browser_evaluate` read the `.chat-list` sidebar, filtered to the groups tracked in `data/tg-groups.json`. The one chat that was already open (ONLINE SHOPPING DEALS) was read for its last 5 posts. Every candidate was verified with a same-origin fetch of its Amazon product page in the logged-in Amazon tab.

**Result: 3 new deals were pushed LIVE (#17164, #17165 and #17166). Each call returned HTTP 201 with count 1, and each slug was confirmed. IndexNow returned HTTP 200 for 6 URLs. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Sidebar

10 of the 13 tracked groups were loaded in the sidebar. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not loaded.

| Group | Newest post | Decision |
|---|---|---|
| SB Loots (11:17) | EcoLink BLDC 1200mm ceiling fan at ₹1,826, `amazn.lt/Kio75SgR` → B0GD8MV3SC | New candidate |
| CoolzTricks (11:08) | Myx clothing "up to 90% off" | Skip: category post |
| Rogerkart (10:39) | Mivi DuoPods at ₹599, `rogerkart.com/r/ePnJBAV` → B0GTVK1YFJ | New candidate. The shortlink does not redirect, so the Amazon URL was read from its HTML and the `rogerkart-21` tag was stripped |
| Dealzone (10:31) | Amazon brand clothing, several links | Skip: multi-product |
| ONLINE SHOPPING DEALS (09:50) | Open chat, last 5 posts read (see below) | 1 new candidate |
| Dealdost | IndusInd credit card | Skip: unchanged, not a product |
| IFS Tips | Instamart tip | Skip: unchanged |
| Hidden Loot | Dineout tip | Skip: unchanged |
| INDIAN CHEAP DEALS | LG sale hub | Skip: unchanged, sale hub |
| NonStopDeals | Caprese category | Skip: unchanged, category |

ONLINE SHOPPING DEALS, last 5 posts:

| ASIN | Product | Decision |
|---|---|---|
| B0D2KSQ7DP | GKD coaster at ₹90 | Already seen. Row #17081 is EXPIRED, so skipped |
| B0G4CRCZWT | CareFoam cervical pillow at ₹411.89 | New candidate |
| B0FPWHC4HQ | Hykes handles | Already pushed (#17140) |
| B0CTHGS1P2 | RYLLZ tea tree oil | Already pushed (#17141) |
| B0H2R6551Q | Amazon Basics figurine | Already pushed (#17142) |

## Candidates

None of the 3 candidates was in `data/tg-multi-seen.json` or in the live DB (checked by `productId` and by `affiliateUrl`). Price was read from `#corePriceDisplay_desktop_feature_div .a-price-whole` plus `.a-price-fraction`, and stock from `#availability` plus `#add-to-cart-button`. The rule rejects any drift above ₹1 and any page without a buy box. Images are from `m.media-amazon.com`, read from `#landingImage[data-old-hires]`. Every affiliate link is `/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`.

| ASIN | Product | Post price | Live price | M.R.P. | Decision |
|---|---|---|---|---|---|
| B0GD8MV3SC | EcoLink AiroMax BLDC 1200mm ceiling fan, brown | ₹1,826 | ₹1,826.98, In stock | ₹4,500 | Pushed as #17164 at ₹1,827 (59% off) |
| B0G4CRCZWT | CareFoam memory foam cervical neck pillow, blue melange | ₹411.89 | ₹411.89, In stock | ₹2,699 | Pushed as #17165 at ₹412 (85% off) |
| B0GTVK1YFJ | Mivi DuoPods Infinity TWS earbuds | ₹599 | ₹599, In stock | ₹4,499 | Pushed as #17166 at ₹599 (87% off) |

The fan and the pillow showed paisa amounts on the live page. Their stored prices are rounded to the nearest rupee, and each description says so. All 3 deals have an original title and description written from the product listing, with no Telegram copy.

## Push

`/admin/deals/bulk` was called once per deal on localhost, which writes to prod through the tunnel. Each call returned HTTP 201 with count 1. Each row was re-read by `productId`: all 3 are LIVE at the verified price, and each slug matches the one sent. None came back as `created:false`, so no slug had to be restored. The prod deal page for #17166 returns 200. The 3 ASINs were added to `data/tg-multi-seen.json`, which now holds 5,819 entries.

Slugs:

- `ecolink-airomax-bldc-1200mm-ceiling-fan-brown-b0gd8mv3sc`
- `carefoam-memory-foam-cervical-neck-pillow-blue-melange-b0g4crczwt`
- `mivi-duopods-infinity-true-wireless-earbuds-b0gtvk1yfj`

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 6 URLs: the 3 slugs above plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself. Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (0.33s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.69s. `/blog` (0.69s) and `/llms.txt` (0.33s) were the slowest | OK |
| DB LIVE vs API total | 16,558 = 16,558 (17,016 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,166 vs 17,154 | OK. The broadcast is part-way through the deal-ingest 11-24f batch plus this tick's 3 deals. The external cron catches up on its next runs |
| Coverless / SEO-less posts | 0 / 0 (SEO-less as counted in sitemon 11-24k; no post has been added since) | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a` to `-24j` already existed, so this report uses suffix `k` | OK |
| Deploy | None. This was a data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2. The CONTENT-SEO run at 12:39 IST can add a third. The cap is 4 |

## Still open

- **Stale reposts:** LIVE Amazon prices drift silently. deal-ingest 11-24f repriced 4 duplicates, and #299 and #11191 were caught the same way earlier.
- **Legacy truncated titles:** #299 still carries a cut-off marketplace title. It needs a geo-optimizer rewrite.
- **IFS yield:** 19 of 46 candidates in deal-ingest 11-24f.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the earlier list plus 13 `/indiafreestuff/p/` cards from deal-ingest 11-24f.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick read only the tracked rows of the sidebar. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
