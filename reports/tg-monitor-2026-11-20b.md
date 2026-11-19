# TELEGRAM-DEAL-MONITOR tick — 2026-11-20b

The tick used one `browser_evaluate` over `.chat-list .ListItem.Chat` in the Playwright richDeals profile, which read the newest post from every group in `data/tg-groups.json`. Single-product links were resolved to the merchant URL and deduped against `data/tg-multi-seen.json` and the live DB `productId`. Every price that survived was read on the PDP in the logged-in Amazon tab. Run at about 01:01–01:15 IST on 11-20 (19:31–19:45 UTC on 11-19).

**Result: 0 new deals pushed. 1 existing LIVE row was re-priced after a PDP read (#15389, ₹1,255 → ₹756). IndexNow returned HTTP 200, and prod returned 200 on 7 of 7 endpoints.**

## Candidates

| Group | Post | Channel price | PDP check | Outcome |
|---|---|---|---|---|
| RichDeals | Sky Heights thermal pant | ₹281 | n/a | Skipped. This is our own channel (deal #16974). |
| CoolzTricks | Paragon "Upto 79% Off" (`myntr.in`) | none | n/a | Rejected: sale hub, not a single product |
| Dealzone | Same Paragon post (`myntr.it`) | none | n/a | Rejected: sale hub |
| SB Loots | Same Paragon post (`myntr.it`) | none | n/a | Rejected: sale hub |
| Rogerkart | "81% Off - Basics Bluetooth Speaker" (`rogerkart.com/r/ePvPCjC`) | ₹756 | ₹756, M.R.P. ₹3,999, In stock, add-to-cart present, no coupon | Already LIVE as #15389 at ₹1,255, so it was re-priced |
| Dealdost | La-Fetch hoodies, pack of 2 | ₹1,499 | n/a | Already in the seen list |
| ONLINE SHOPPING DEALS | USPA polo (`link.amazon`) | ₹1,181 | n/a | Already in the seen list |
| INDIAN CHEAP DEALS | LG washing machine sale | none | n/a | Rejected: sale page |
| NonStopDeals | Caprese "Upto 90%" (`fkrt.it`) | none | n/a | Rejected: sale hub |
| Hidden Loot | Swiggy Dineout ₹11 | ₹11 | n/a | Rejected: not a product |
| IndiaFreeStuff Tips | Swiggy Dineout Jaipur | none | n/a | Rejected: not a product |

The other sidebar rows are personal or non-group chats and were ignored.

The Rogerkart shortlink returns a 200 interstitial page instead of a redirect, so `curl -w %{url_effective}` stays on the shortlink. The real product was taken from the `amazon.in/dp/B0D9BRK2WK?tag=rogerkart-21` URL in the interstitial HTML. Their tag was not used.

## Pushed

None. No bulk POST was made.

## Repriced

| Id | ASIN | Product | Old price | New price | M.R.P. | Discount |
|---|---|---|---|---|---|---|
| 15389 | B0D9BRK2WK | Amazon Basics 20W Bluetooth speaker with TWS pairing | ₹1,255 | ₹756 | ₹3,999 | 69% → 81% |

- The price was updated with `prisma.deal.update`, and a `priceHistory` row was added.
- The title is now "Amazon Basics 20W Bluetooth Speaker with TWS Pairing at ₹756 (81% Off)". The description had no old price in it, so it was left unchanged.
- The channel's "Regular Rs.1,402" is not the M.R.P. The PDP M.R.P. of ₹3,999 was kept.
- The slug did not change.
- `B0D9BRK2WK` and `rogerkart.com/r/ePvPCjC` were added to `data/tg-multi-seen.json`, which now has 5,666 entries.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: 1 slug plus 3 hubs |
| Deal page | 200. The JSON-LD already shows `"price":"756"`. |
| `sitemap.xml` | 200 (ISR 1800s) |
| `llms.txt` | 200, `force-dynamic` |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.32s |
| `/offers` | 200 | 0.25s |
| `/blog` | 200 | 0.61s |
| `/sitemap.xml` | 200 | 0.11s |
| `/feed.xml` | 200 | 0.15s |
| `/llms.txt` | 200 | 0.42s |
| `/amazon-basics-20w-bluetooth-speaker-with-tws-pairing-b0d9brk2wk` | 200 | 0.27s |
| `/api/deals` | 200: total 16,367, newest id 16,974 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,367 = 16,367 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,974 | OK |
| Posts | 501, 0 coverless | OK |
| Broadcast cursor vs DB max | 16,974 = 16,974 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | Only `tg-monitor-2026-11-20a.md` existed, so this report uses suffix `b` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 1**. The day has just started, and the next CONTENT-SEO tick runs at 06:39 IST.

## Still open

- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **#11896 and #14635** have no `priceValidUntil`. About 95% of LIVE deals have none.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| INDEXNOW | 11-20 01:05 |
| SITEMON | 11-20 01:14 |
| TG | 11-20 02:01 |
| DESIDIME | 11-20 02:43 |
| DEAL-INGEST | 11-20 02:53 |
| SCHEMA-AUDIT | 11-20 04:39 |
| SEO-AUDIT-FIX | 11-20 05:58 |
| CONTENT-SEO | 11-20 06:39 |
| AI-OVERVIEW | 11-25 11:39 |
