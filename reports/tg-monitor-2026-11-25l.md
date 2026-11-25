# TELEGRAM-DEAL-MONITOR tick — 2026-11-25l

This tick ran at about 10:40–11:06 IST on 11-25 (it finished at 05:36 UTC).

**Result:** 1 new Amazon deal is LIVE (#17390, Dynotrek Feeder 15.6" laptop sleeve at ₹199). The bulk push returned HTTP 201 with count 1 and `created:true`, so no slug needed restoring. One duplicate LIVE row was price-synced in place: #5733 Signoraware BoroBloom jug went from ₹552 to ₹403. IndexNow returned HTTP 200 for 5 URLs. The CEO audit is green.

## Sidebar

The tick used one `browser_evaluate` over `.chat-list .ListItem.Chat` in the richDeals Playwright profile.

- **Groups loaded:** 10 of the 13 in `data/tg-groups.json`. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not load.
- **Tab 0:** was on BotFather again, left by the shared profile. It is still Telegram, so the scrape ran without navigating away.
- **Stray tabs:** Amazon B00CBRJ34E, Flipkart Sony and Shopsy Bacan were already open from another driver. The Amazon tab was used for the PDP reads.

Shortlinks resolved:

| Shortlink | ASIN | Source tag stripped |
|---|---|---|
| link.amazon/B02vybX3c | B0F9FXJR1C | glitzdeal05-21 |
| link.amazon/B08nJfIRu | B0BVMZ9MF6 | vivek123034-21 |
| amzn.to/4latsU5 | B0HLG1JX2V | 7383-21 |

## Skipped posts

| Group | Post | Why |
|---|---|---|
| SB Loots | Red Chief "Upto 77% OFF" | Category post |
| CoolzTricks | Red Chief "Upto 73% Off" | Category post |
| Rogerkart | AJIO Catwalk "upto 85%" | Category post |
| NonStopDeals | Caprese "upto 90%" (fkrt.it) | Category post |
| INDIAN CHEAP DEALS | LG washing machine sale | Sale hub |
| IndiaFreeStuff Tips, Hidden Loot | Swiggy Instamart, Swiggy Dineout | Not a store product |

## Pushed

| Deal | Store | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|
| #17390 Dynotrek Feeder 15.6 inch laptop sleeve, royal blue | Amazon B0BVMZ9MF6 | ₹199 | null | none | Logged-in PDP tab: ₹199 in `#corePriceDisplay`, in stock with add-to-cart. The ₹999 M.R.P. implied 80% off, so it was nulled and the title carries no "% Off" |

The affiliate link is `/dp/B0BVMZ9MF6?th=1&psc=1&tag=ashoksachdev-21`. The image comes from `m.media-amazon.com` (`81Uri1fLUeL`). The title and description were rewritten, and the push script checked every ₹ figure against the row before posting. The new page returns 200 on prod.

## Duplicates: PDP re-read

The PDPs were fetched same-origin from the logged-in Amazon tab and read from `.a-price-whole` in `#corePriceDisplay`, `#availability` and `#add-to-cart-button`.

| Row | ASIN | Product | Channel | DB | PDP | Action |
|---|---|---|---|---|---|---|
| #5733 | B0F9FXJR1C | Signoraware BoroBloom borosilicate glass jug with bamboo lid | ₹403 | ₹552 / M.R.P. ₹999 / 45% | ₹403, M.R.P. ₹1,069, in stock, add-to-cart | **Price-synced** to ₹403 / M.R.P. ₹1,069 / 62%. The description and how-to were rewritten to match (the title has no ₹). A PriceHistory row was added and the slug was kept |
| #17309 | B0HLG1JX2V | Bhuvenika dry fruits 1kg | ₹436 | ₹436 / M.R.P. ₹1,099 / 60% | ₹436, in stock, add-to-cart | None. The PDP M.R.P. read ₹43.62, a per-unit figure, so the DB M.R.P. was kept |

B0BVMZ9MF6 was added to `data/tg-multi-seen.json` (5,854 entries).

## Push

`POST localhost:4000/admin/deals/bulk` returned **HTTP 201, count 1**, with `created:true` for the one row.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | **HTTP 200**, 5 URLs: the new slug and #5733, plus `/`, `/offers` and `/sitemap.xml` |
| sitemap.xml | 200, ISR `revalidate = 1800` |
| llms.txt | 200, `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200: `/` 0.16s, `/offers` 0.08s, `/blog` 0.62s, `/sitemap.xml` 0.05s, `/feed.xml` 0.07s, `/api/deals` 0.09s, `/llms.txt` 0.35s | OK |
| DB LIVE vs API total | 16,783 = 16,783 (up 1 from the push) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,390 vs 17,389 | OK. The cursor caught up on the 6 DesiDime rows; #17390 waits for the external tg-broadcast cron |
| Posts / coverless / seo-less | 509 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present: AI-OVERVIEW, SITEMON, telegram-deal-monitor, DESIDIME, DEAL-INGEST, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-25a` to `k` exist, so this report uses `l` | OK |
| Deploy | None. No code changed | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-14 | 2 |
| 11-15 | 2 |
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
- **Shared browser profile:** another driver uses the richDeals Playwright profile. Keep TG ticks to one driving session.
- **LG monitor #17312:** ₹1,998 against a ₹17,100 M.R.P. with "Only 1 left" looks like a pricing error. Watch for a reprice or out-of-stock and expire it if so.
- **Stale reposts:** #5733 was repriced this tick.
- **Repeat drift:** B076KYPQMH, B0H8PBSZMY, B0F9KBZ8W3, B0GYD83B13 and B0D7ZRLH5Z.
- **Legacy slugs and titles:** #1530, #1590, #1544 and #1547 slugs (kept to avoid a 404); #299 and #3366 titles.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** #17167, #17204, #17215, #17288 and #10231. Null M.R.P.s: #17334, #17352, #17366, #17372, #17377, #17378, #17389 and #17390.
- **No buy box:** #7259, #12963, #14154, #13938, #11249 and #16772.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** the `/indiafreestuff/p/` cards still null their pid at stage 1. The fix belongs in stage 1.
- **Sidebar coverage:** 10 of 13 TG groups loaded. Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were missing again.
- **reticle MCP:** disconnected (`CONNECTION_CLOSED`). It is not used by any cron.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material.
  - This tick read only the sidebar list. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
