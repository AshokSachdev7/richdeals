# TELEGRAM-DEAL-MONITOR tick — 2026-11-19m

The tick read the Telegram sidebar in the Playwright richDeals profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, which returns each group's newest message. Every new link was resolved with curl, then deduped against `data/tg-multi-seen.json` and against live DB productIds. Amazon products were read on the PDP with a same-origin fetch in the logged-in tab. Run at about 12:01–12:14 IST.

**Result: 4 deals pushed (#16911–#16914) and 1 duplicate LIVE row repriced (#2546 Symbol trousers, ₹349 → ₹219). The bulk push returned HTTP 201 with count 4, all created:true. IndexNow returned HTTP 200 for 8 URLs. The CoolzTricks "Spin & Win" post was skipped as junk. For about 7 minutes after the push, richdeals.in returned 404 on the new pages while the DO app ingress already returned 200. That led to a DNS finding: richdeals.in is served from a Google Cloud host, not from the DO app ingress (see Hosting below). By 12:14 IST all 5 pages returned 200 and the prod API total matched the DB. Prod returned 200 on 7 of 7 endpoints, and every CEO-audit check is green.**

## Sidebar

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots And Deals | INALSA wet & dry vacuum, `amazn.lt/Zloy8tEP` | New. Resolves to B09SB36BJX (source tag `bhavesh015-21`), not in the DB. Read on the PDP and **pushed as #16911**. |
| CoolzTricks | "Amazon New Spin & Win", `amzn.to/4t4Gl41` | Skipped: app game promo, not a product. |
| ONLINE SHOPPING DEALS | `link.amazon/B05DFceka` (source tag `vivek123034-21`) | Resolves to B09DYLBKF3, Buds & Berries Vitamin C body lotion. **Pushed as #16912**. |
| ONLINE SHOPPING DEALS | `link.amazon/B04kf0VUx` | Resolves to B0GQBTNCHT, SPARX SL-342 women's sneakers. **Pushed as #16913**. |
| ONLINE SHOPPING DEALS | `link.amazon/B00ZCq8rk` | Resolves to the Symbol paper-bag trousers, already LIVE as #2546 at ₹349. The PDP reads ₹219, so the row was **repriced**. |
| ONLINE SHOPPING DEALS | `link.amazon/B02SxCPZm` | Resolves to B0DY7LYZD2, Solimo metal plant stand set of 4. **Pushed as #16914**. |
| Other rendered groups | — | Unchanged since 19l. |

A "Crazy Deals at Just 30" sponsored row was skipped as an ad. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were again not among the rendered sidebar rows.

## Read on the product page

| ASIN | Product | Price | M.R.P. | Stock | Outcome |
|---|---|---|---|---|---|
| B09SB36BJX | INALSA wet & dry vacuum, 15 L, 1400 W | ₹4,799 | ₹11,995, so 60% off | In stock, add-to-cart present | **Pushed as #16911.** |
| B09DYLBKF3 | Buds & Berries Tangerine Orange Vitamin C body lotion | ₹162 | ₹350, so 54% off | In stock, add-to-cart present | **Pushed as #16912.** |
| B0GQBTNCHT | SPARX SL-342 white sneakers for women | ₹313 | ₹699, so 55% off | "Only 3 left", add-to-cart present | **Pushed as #16913.** |
| B0DY7LYZD2 | Amazon Brand Solimo metal plant stand, set of 4, black | ₹264 | ₹1,329, so 80% off | In stock, add-to-cart present | **Pushed as #16914.** |
| (#2546) | Amazon Brand Symbol women's tapered paper-bag trousers | ₹219 | ₹1,999, so 89% off | In stock, add-to-cart present | **Repriced from ₹349.** |

Price was read from `.a-price-whole` in `#corePriceDisplay_desktop_feature_div`, the M.R.P. from `#centerCol`, and stock from `#availability` plus the add-to-cart button. The channel posts quoted paise figures (₹313.83, ₹264.75); the stored prices are the whole-rupee PDP figures.

## Pushed

| Deal | Slug | Price | M.R.P. | Off |
|---|---|---|---|---|
| #16911 | `inalsa-wet-dry-vacuum-cleaner-15l-1400w-b09sb36bjx` | ₹4,799 | ₹11,995 | 60% |
| #16912 | `buds-berries-tangerine-orange-vitamin-c-body-lotion-b09dylbkf3` | ₹162 | ₹350 | 54% |
| #16913 | `sparx-sl-342-white-sneakers-for-women-b0gqbtncht` | ₹313 | ₹699 | 55% |
| #16914 | `solimo-metal-plant-stand-set-of-4-black-b0dy7lyzd2` | ₹264 | ₹1,329 | 80% |

- **Affiliate links:** all four are Amazon, `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`. The source tags were dropped.
- **Push response:** `POST /admin/deals/bulk` returned HTTP 201, `count:4`, all `created:true`. The slugs are ours, so there was nothing to restore.
- **Title-₹ guard:** every ₹ figure in each title and how-to step equals the numeric price, and each discount equals `round((1 − price/mrp) × 100)`. The guard also ran on the #2546 update.
- **Copy:** each description and set of how-to steps was written for this page. No source text was copied.
- **Images:** `m.media-amazon.com/images/I/<id>._SL1500_.jpg` (`51w4CoEXFnL`, `6157qcXNbmL`, `617uTO46FQL`, `812ZEep5sgL`).
- **Prod pages:** all 4 return 200 on richdeals.in as of 12:14 IST. They returned 404 at 12:07–12:12 IST (see Hosting).

## Duplicate LIVE row

| Deal | Before | Now | Action |
|---|---|---|---|
| #2546 Symbol tapered paper-bag trousers | ₹349, no M.R.P. | ₹219, M.R.P. ₹1,999, 89% off | `prisma.deal.update`: price, mrp, discountPct, title ("at ₹219 (89% Off)") and description. A priceHistory row was written. The slug `amazon-brand-symbol-women-tapered-paper-bag-trousers` is unchanged, and the prod page returns 200. |

Six codes were added to the seen file, which now holds 5,598 entries: `Zloy8tEP`, `4t4Gl41`, `B05DFceka`, `B04kf0VUx`, `B00ZCq8rk` and `B02SxCPZm`.

## Freshness

- **IndexNow:** HTTP 200 for 8 URLs: the 4 new slugs, the #2546 slug, and the 3 hubs that slug mode adds.
- **`sitemap.xml`:** ISR 1800s. The deals child holds the top 100 only, by design, so the new pages are served `noindex,follow` until they rank into the top 100.
- **`llms.txt`:** force-dynamic, so it is current once the live host has the rows (it did by 12:14 IST).

## Hosting: richdeals.in is not served by the DO app ingress

The post-push prod check returned 404 on all 4 new pages. Diagnosis:

| Probe | Result |
|---|---|
| DO app ingress `richdeals-jw726.ondigitalocean.app/<new slug>` and `/api/deals/<new slug>` | 200 immediately (same DB, correct data) |
| richdeals.in at 12:11–12:12 IST | 404 on the new slugs; `/api/deals` total 16,302, top id 16,910 (DB: 16,306 / 16,914) |
| richdeals.in at 12:14 IST | 200 on all 5 slugs; `/api/deals` total 16,306, top id 16,914 |
| Nameservers | `leif.ns.cloudflare.com`, `nia.ns.cloudflare.com` |
| A record (1.1.1.1, 8.8.8.8, authoritative Cloudflare NS) | `34.14.145.203`, TTL 60, DNS-only (not a Cloudflare proxy IP) |
| 34.14.145.203 | `203.145.14.34.bc.googleusercontent.com`, AS396982 Google LLC, Mumbai. Headers: `Server: nginx`, `X-Powered-By: Next.js` on pages and `Express` on `/api` |
| DO app spec | Still lists `richdeals.in` as PRIMARY; deployment `70f522c6` ACTIVE |

So the domain resolves through Cloudflare DNS to a Google Cloud VM running nginx in front of a Next.js + Express stack, not to the DO App Platform ingress. That host lagged the DB by about 7 minutes on this batch and then caught up, so the site is correct now. No memory note or earlier report records this host. Changing DNS needs the owner's Cloudflare credentials, so this tick did not touch it.

**Owner action:** confirm 34.14.145.203 is your own server. If it is (a deliberate move off App Platform), the DO app is now a second, unused copy of prod: say so and future ticks will probe the GCP host as prod and stop treating the DO deploy as the release path. If it is not yours, repoint the Cloudflare A/CNAME for richdeals.in back to the DO app and rotate the Cloudflare account password.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.19s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.52s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.07s) |
| /api/deals | 200 (0.10s) |
| /llms.txt | 200 (0.49s) |

All probes used `curl -m 30`, against richdeals.in (the GCP host).

## CEO audit

Run at about 12:09 IST, with the API total re-read at 12:14 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,306 vs 16,302 at 12:09; 16,306 = 16,306 at 12:14 | OK after a 7-minute lag on the live host (see Hosting) |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,914 | OK |
| Posts | 499, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,914 = 16,914 | OK |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |
| Live-domain host | Cloudflare DNS → GCP 34.14.145.203, not the DO ingress | **Owner to confirm** |

**Posts per day (IST):**

| Day | Posts |
|---|---|
| 11-09 | 3 |
| 11-10 | 3 |
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| **11-19** | **2** |

11-19 has met its target, and no day is 0 or over the cap of 4.

## Since the last TG tick (19l, 11:01)

| Tick | Outcome |
|---|---|
| SITEMON 19k | Nothing to fix. |

## Still open

- **Live-domain host:** richdeals.in resolves to GCP 34.14.145.203, not the DO app (see Hosting). Owner to confirm the host is theirs.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`. Each needs its Flipkart PDP re-read in the browser, then a reprice or a delist.
- **Same-price confirms:** they write no priceHistory row, so 95.0% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28:** 3 clicks and 222 impressions in 28 days (AI-OVERVIEW 11-18).
- **IFS redirector:** dead for eleven ticks in a row (18j through 19f). If every remaining 11-19 tick also resolves 0, the first 11-20 DEAL-INGEST tick moves the slot to reading Telegram history.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906.
- **Low stock:** #16913 SPARX (3 left), #16768 Lumio, #16779 Yera, #12651 HP backpack (1 left), and the Max sweatshirt (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST on 11-19:

| Job | Next run |
|---|---|
| SITEMON | 12:14 |
| CONTENT-SEO | 12:39 |
| DESIDIME | 12:43 |
| DEAL-INGEST | 12:53 |
| TG | 13:01 |
| INDEXNOW | 13:05 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
