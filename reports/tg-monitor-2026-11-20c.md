# TELEGRAM-DEAL-MONITOR tick — 2026-11-20c

The tick used one `browser_evaluate` over `.chat-list .ListItem.Chat` in the Playwright richDeals profile, which read the newest posts from every group in `data/tg-groups.json`. Single-product links from every store were resolved to the merchant URL and deduped against `data/tg-multi-seen.json` and the live DB `productId`. Every surviving price was read on the PDP: Amazon in the logged-in Amazon tab, Myntra and Shopsy on their own product pages. Run at about 02:01–02:20 IST on 11-20.

**Result: 10 new deals pushed LIVE (ids 16,975–16,984: 7 Amazon, 2 Myntra, 1 Shopsy). 2 existing LIVE rows were re-priced after a PDP read. IndexNow returned HTTP 200 for 15 URLs, and prod returned 200 on all probed endpoints.**

## Candidates

| Group | Post | Channel price | PDP check | Outcome |
|---|---|---|---|---|
| Various | KORE PVC dumbbells 2 kg pair (B098MH43LQ) | ₹169 | ₹169, add-to-cart present | Pushed #16975 |
| Various | Lifelong 20000mAh power bank (B0D5HTDWSC) | ₹2,190 | ₹2,190, in stock | Pushed #16976 |
| Various | ASIAN Thar-01 shoes (B09FJKNWWF) | ₹534 | ₹534, only 1 left | Pushed #16977 |
| Various | UCB 3-in-1 bottle set (B0G4N8TTFM) | ₹599 | ₹599, add-to-cart present | Pushed #16978 |
| Various | Wonderchef Nutri-Blend (B0GTMDJGFV) | ₹1,699 | ₹1,699, in stock | Pushed #16979 |
| Various | Bajaj SWX 6 griller (B0DB8P9PSS) | ₹1,799 | ₹1,799, add-to-cart present | Pushed #16980 |
| Various | POPWINGS co-ord set (B0C9CM3N2J) | ₹199 | ₹199 | Pushed #16981 |
| Various | AXE Sport Blast wash, Myntra 20486210 | ₹76 | ₹76, in stock | Pushed #16982 |
| Various | Colors Queen nail polish set, Myntra 25373988 | ₹300 | ₹300, in stock | Pushed #16983 |
| Various | RAHUL LOOK shirt, Shopsy XSRH4FTGJA6KGGZD | ₹285 | ₹285, no Sold Out widget | Pushed #16984 |
| Various | Cap (B0GPKCK7T3) | ₹105 | ₹119 | Rejected: price drift |
| Various | Diaper bag (B0HP6PRSTD) | — | No add-to-cart | Rejected |
| Various | Trousers (B0GZZRPQR2) | — | No add-to-cart | Rejected |
| Various | KORE dumbbells variant (B098MHD14G) | — | — | Rejected: variant duplicate of B098MH43LQ |
| Various | Carbon steel wardrobe | — | n/a | Rejected: multi-link post |
| Various | Bellavita, Dove, Fastrack, Paragon, More, Sale (`myntr.it`) | none | n/a | Rejected: sale hubs |
| Various | Jack & Jones (`amazn.lt/tmO9AQ8I`) | none | n/a | Rejected: sale hub |
| Various | `bittli.in/WxmpnzZl` | none | n/a | Rejected: Shopsy search page |
| Various | Carlton London (`myntr.it/dwDXvT6`) | none | n/a | Rejected: category page |
| Various | 70mai dash cam | — | n/a | Already in the seen list |
| Various | BoroPlus (#16969) | ₹128 | ₹128 | Already LIVE, price unchanged |
| Various | Apple Watch (#16924) | ₹49,990 | ₹49,990 | Already LIVE, price unchanged |
| Various | VISKO (#16973) | ₹675 | No add-to-cart | Already LIVE, not re-priced, added to the watch list |
| Various | Lakme jelly face wash (#10653) | ₹190 | ₹190 | Already LIVE at ₹195, so it was re-priced |
| Various | Safari Thrive backpack (#13228) | ₹679 | ₹679 | Already LIVE at ₹549, so it was re-priced |

## Pushed

| Id | Product | Price | Store | Slug |
|---|---|---|---|---|
| 16975 | KORE PVC dumbbells | ₹169 (26% off) | Amazon | `kore-pvc-dumbbells-2-kg-each-pair-for-home-workouts-b098mh43lq` |
| 16976 | Lifelong power bank | ₹2,190 (45% off) | Amazon | `lifelong-20000mah-22-5w-power-bank-with-4-built-in-cables-b0d5htdwsc` |
| 16977 | ASIAN Thar-01 shoes | ₹534 (47% off) | Amazon | `asian-thar-01-men-s-running-and-walking-shoes-b09fjknwwf` |
| 16978 | UCB bottle set | ₹599 (68% off) | Amazon | `ucb-3-in-1-leakproof-water-bottle-set-b0g4n8ttfm` |
| 16979 | Wonderchef Nutri-Blend | ₹1,699 (58% off) | Amazon | `wonderchef-bullet-nutri-blend-500w-mixer-with-2-jars-b0gtmdjgfv` |
| 16980 | Bajaj SWX 6 griller | ₹1,799 | Amazon | `bajaj-swx-6-800w-2-slice-sandwich-griller-b0db8p9pss` |
| 16981 | POPWINGS co-ord set | ₹199 | Amazon | `popwings-women-s-printed-top-and-joggers-co-ord-set-b0c9cm3n2j` |
| 16982 | AXE Sport Blast wash | ₹76 | Myntra (InRDeals) | `axe-sport-blast-3-in-1-face-hair-and-body-wash-400ml-20486210` |
| 16983 | Colors Queen nail polish set | ₹300 (44% off) | Myntra (InRDeals) | `colors-queen-affair-semi-matte-nail-polish-set-of-3-25373988` |
| 16984 | RAHUL LOOK shirt | ₹285 | Shopsy (Cuelinks) | `rahul-look-men-s-solid-casual-grey-shirt-xsrh4ftgja6kggzd` |

- All 10 rows were confirmed LIVE in the DB afterwards. None of the product ids existed before the push, so no slug had to be restored.
- The HTTP status and count line of the bulk response was not captured in the terminal output. The rows themselves were verified directly instead.
- 4 rejects were written to `data/dd-rejected.json`. The seen list `data/tg-multi-seen.json` now has 5,699 entries (up from 5,666).

## Repriced

| Id | Product | Old price | New price | M.R.P. | Discount |
|---|---|---|---|---|---|
| 10653 | Lakme Blush and Glow jelly face wash 150 g | ₹195 | ₹190 | ₹490 | 61% |
| 13228 | Safari Thrive 36L school backpack | ₹549 | ₹679 | ₹1,999 | 66% |

Both were updated with `prisma.deal.update`, the ₹ in the title was updated, and a `priceHistory` row was added (17235 and 17236). Slugs did not change.

**Process slip, fixed:** the push script was run a second time by mistake. The bulk upsert was idempotent (still exactly 10 rows), but the second run added 2 duplicate `priceHistory` rows (17247 and 17248) with the same prices about 11 seconds later. I deleted those 2 rows, which this tick had created seconds earlier, so the price chart has one point per real price change. No other data was touched.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 15 URLs: 12 slugs plus 3 hubs |
| New deal pages | 200 (#16975 and #16984 probed) |
| `sitemap.xml` | 200 (ISR 1800s) |
| `llms.txt` | 200, `force-dynamic` |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.25s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.57s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.36s |
| `/kore-pvc-dumbbells-2-kg-each-pair-for-home-workouts-b098mh43lq` | 200 | 0.17s |
| `/rahul-look-men-s-solid-casual-grey-shirt-xsrh4ftgja6kggzd` | 200 | 0.16s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 501, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,974 vs 16,984 | Expected lag: the 10 new rows were pushed this tick, and the external tg-broadcast cron picks them up on its next run |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a.md` and `-20b.md` existed, so this report uses suffix `c` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day has just started, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, **#16973** (new).
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, **#16977** (new, 1 left).
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 02:16 |
| DESIDIME | 11-20 02:43 |
| DEAL-INGEST | 11-20 02:53 |
| TG | 11-20 03:01 |
| SCHEMA-AUDIT | 11-20 04:39 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| INDEXNOW | 11-20 07:23 |
| AI-OVERVIEW | 11-25 11:39 |
