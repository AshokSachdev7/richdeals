# DESIDIME-INGEST tick — 2026-11-25e

This tick ran at about 08:40–08:52 IST on 11-25.

**Result:** 3 new deals are LIVE: 2 from Amazon and 1 from Flipkart. The bulk push returned HTTP 201 with count 3, and all 3 rows were created (`created:true`), so no slug needed restoring. IndexNow returned HTTP 200 for 6 URLs. The 7 rows that were already in the DB match their card prices, so none needed a price-sync. The CEO audit is green.

## Stage 1

`apps/api/scripts/ingest-desidime.mjs` read the cards on `/new` and the homepage. It did not fetch any per-deal page.

| Step | Count |
|---|---|
| Cards discovered | 34 |
| Dropped by JUNK, GROCERY or the other-store filter | 11 |
| Dropped at resolve: both magicpin cards resolved to the Play Store | 2 |
| Resolved to a single product | 21 |
| Already in the DB (all in sync) | 7 |
| On the 24-hour reject list | 9 |
| Fresh candidates | 5 |

The 9 on the 24-hour reject list:
- Qubo SLOHGFFGYH5DNGKP
- Wipro LLSGNHNCA5T2AGHP
- Samsung Tab B0DHHB2YS7
- Daikin ACNHMKN3G8BVHGF5
- Bosch B0H9T73HJ7
- Khaitan B0H8PBSZMY
- ASUS B0F9KBZ8W3
- Flipkart Minutes peanut PLSHDVGHERMKDBSJ
- HDFC Offers

## Pushed (5 fresh → 3 verified)

| Deal | Store | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|
| #17379 Prestige Nexus 500W Mixer Grinder, 3 SS jars (White) | Amazon B0FQ5BF4VY | ₹1,799 | ₹4,035 | 55% | Logged-in PDP tab: price ₹1,799, M.R.P. ₹4,035, in stock |
| #17380 Treo by Milton Aurelia Verdinia Dinner Set, 13 pcs | Amazon B0G7ZVJ2VX | ₹830 | ₹2,045 | 59% | Logged-in PDP tab: price ₹830, in stock. The M.R.P. comes from the card, because the PDP's `a-text-price` was a per-unit rate (₹63.88) |
| #17381 KENT New Ultra Air Fryer 4L | Flipkart AFRHRHKFTBPNTWFQ | ₹2,599 | ₹10,999 | 76% | Playwright tab, ld+json: ₹2,599, InStock, soldOut false |

Affiliate links:
- **Amazon:** `/dp/{ASIN}?tag=ashoksachdev-21`.
- **Flipkart:** `/p/itma6c1aa7244762?pid=AFRHRHKFTBPNTWFQ&affid=djhackraj`.
- No Myntra card or Cuelinks-store card made it through this tick.

Before the push, the push script checked that every ₹ in the titles and how-to steps equals the price, that every ₹ in the descriptions is the price or the M.R.P., and that every "N% off" matches `discountPct`. The dry run passed with 55, 59 and 76.

## Rejects

| Candidate | Reason |
|---|---|
| Digihaat Nafed coriander 100g (₹18) | Low-ticket grocery (GROCERY rule) |
| JioMart Samsung Galaxy Buds4 Pro (₹14,499) | The page has no ld+json, so the price can't be verified |

## Duplicates

| Row | Product | Card | DB | Action |
|---|---|---|---|---|
| #17375 | 39766794 | in sync | in sync | none |
| #17376 | 41598513 | in sync | in sync | none |
| #17347 | 45268342 | in sync | in sync | none |
| #17377 | EBLGSF27GA87MTFZ | in sync | in sync | none |
| #17346 | HSAHSNHJAMHDCG6H | in sync | in sync | none |
| #17378 | SSWHGXFTJFUQZMF8 | in sync | in sync | none |
| #17205 | TSHHB2C6GFZZXEXD | in sync | in sync | none |

## Push

`POST localhost:4000/admin/deals/bulk` returned **HTTP 201, count 3**, with `created:true` for all 3 rows. All 3 deal pages return 200 on prod.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200**, 6 URLs: the 3 deal slugs plus `/`, `/offers` and `/sitemap.xml` |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200: `/` 0.17s, `/offers` 0.10s, `/blog` 0.65s, `/sitemap.xml` 0.07s, `/feed.xml` 0.07s, `/api/deals` 0.10s, `/llms.txt` 0.43s | OK |
| DB LIVE vs API total | 16,774 = 16,774 (up 3 from the push) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,381 vs 17,378 | OK. The 3 new rows wait for the external tg-broadcast cron, and the cursor catches up on its own |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `desidime-2026-11-25a` to `d` exist, so this report uses `e` | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 |
| 11-25 | 2, on target. CONTENT-SEO runs again at 12:39 and 18:39 IST |

No day exceeds the cap of 4.

## Still open

- **#16177 `priceValidUntil`:** missing. In-sync re-verifies write no PriceHistory row (SCHEMA-AUDIT 11-25, process gap 1).
- **#3593 TRESemmé:** `priceValidUntil` ends on 11-28. Re-verify the price before then.
- **GSC top four deals** (#2321, #3492, #3506, #4188): `priceValidUntil` holds until 12-07.
- **184 deals** drop out of `priceValidUntil` within 2 days. 92.6% of LIVE deals already serve none.
- **Shared browser profile:** another driver keeps opening tabs in the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** 0 rows repriced since INDEXNOW 11-25a.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590 and #1544 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377 and #17378.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 10 of 13 TG groups loaded in the last TG tick (11-25h).
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
