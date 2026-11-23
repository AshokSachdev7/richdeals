# TELEGRAM-DEAL-MONITOR tick — 2026-11-24a

This tick ran from about 01:20 to 01:26 IST on 11-24. It read the Telegram sidebar in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list`, covering the groups in `data/tg-groups.json`. Shortlinks were resolved, each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId, and every price was read on the Amazon product page in the logged-in tab.

**Result: 0 new deals pushed, because every single-product candidate was a duplicate or a reject. 1 existing row (#5035) was repriced in place, 1 candidate was rejected for price drift, and 2 were duplicates whose live price still matched. IndexNow returned HTTP 200 for the repriced page (4 URLs). The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Candidates

| Candidate | Group | Shortlink → ASIN | Finding | Action |
|---|---|---|---|---|
| GKD coaster, ₹90 | ONLINE SHOPPING DEALS | `link.amazon/B0b3zIdhs` → B0D2KSQ7DP | Already in the seen list | Duplicate |
| Baby walker, "₹99" | CoolzTricks | `amzn.to/4zDwxzM` → B0HJ5C7ZMH | Product page reads ₹1,599, in stock. The post also says "Delhi Available" | **Rejected** for drift. deal-ingest 11-24a rejected the same ASIN |
| LG 8 kg washing machine | INDIAN CHEAP DEALS | `link.amazon/B08FsUNwo` → B0DPHTSTYJ | LIVE row #5035 at ₹20,990; product page reads ₹20,996 | **Repriced** (below) |
| Zebronics MagBoost C 25W car charger | Rogerkart | `rogerkart.com/r/LJBAqqS` → B0HQJLP2CN (resolved in a browser tab; curl cannot follow it) | LIVE row #17059 at ₹999 / ₹4,799 (79%); product page matches, in stock with add-to-cart | Duplicate, no change. The post's "regular ₹3,849" was ignored |

**Skipped without a product-page read:** Dealzone Sonata (multi-product), SB Loots Lavie and NonStopDeals Caprese (category pages), Dealdost (credit card), IFS Tips (Instamart), Hidden Loot (Swiggy), the iPhone rates group (chatter), our own RichDeals channel, and personal or bot chats.

## Repriced in place (Prisma update + `priceHistory` row)

| Row | Product | Old → new | M.R.P. |
|---|---|---|---|
| #5035 | LG 8 Kg 5 Star Smart Inverter Top Load Washing Machine (T80VBMB4Z) | ₹20,990 → ₹20,996 | ₹28,990 (28%) |

The product page showed ₹20,996 against an M.R.P. of ₹28,990, in stock, with add-to-cart, sold by DAWNTECH ELECTRONICS, plus a clip-on coupon. The title, description and how-to steps were rewritten so that every ₹ figure is either ₹20,996 or ₹28,990. This also fixed an older bug where the how-to quoted ₹20,490. The coupon is mentioned without a rupee amount because its value can change. The slug is unchanged, the local API returns the new price, and the prod page returns 200.

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 1 slug + 3 hub URLs) | HTTP 200 for 4 URLs |
| Repriced deal page on prod | 200 |
| sitemap.xml | ISR `revalidate = 1800`. No new deals this tick |
| llms.txt | `force-dynamic`, rebuilt per request |
| Seen list | 4 keys added (2 ASINs, 2 shortlink codes); 5,774 entries |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | All 200 in the SITEMON tick a few minutes earlier (`sitemon-2026-11-24a.md`) | OK |
| DB LIVE vs API total | 16,520 = 16,520 (16,976 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,126 vs 17,122 | OK. The external broadcast cron is working through the deal-ingest 11-24a batch |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present (checked in the SITEMON tick) | OK |
| Report suffix | `tg-monitor-2026-11-24.md` existed, so this report uses suffix `a` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far (CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST) |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259, #12963 and #8707.
- **Flipkart drops:** boAt Stone 510 and the Caprese sling bag.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick read only the sidebar, did not open that chat, and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
