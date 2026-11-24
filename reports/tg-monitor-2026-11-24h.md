# TELEGRAM-DEAL-MONITOR tick — 2026-11-24h

This tick ran at about 08:01–08:10 IST on 11-24. It used Telegram Web (`web.telegram.org/a/`) in the logged-in Playwright profile (richDeals). One `browser_evaluate` read the `.chat-list .ListItem.Chat` sidebar and returned only the rows whose chat id is in `data/tg-groups.json`. The tick opened no chat and did not reload the chat list.

**Result: 0 deals were pushed. 10 of the 13 groups appear in the sidebar, and each one's newest post is the same as in 11-24g. Every one of those posts is either not a single-product deal or already in `data/tg-multi-seen.json`. A new row timed 03:09 now sits at the top of the sidebar, but it is not one of our groups. The id filter dropped it and its content was never read. No price changed in the DB, and IndexNow was not sent. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Sidebar (newest post per group, IST)

| Group | Time | Newest post | Decision |
|---|---|---|---|
| SB Loots And Deals | 02:34 | Notification-settings tip | Not a deal |
| CoolzTricks Official | 01:27 | Up to 50% off coupon on Saffola products (`amzn.to/4AQTqAN`) | Brand-wide coupon, not a single product. Already seen |
| Dealzone | 01:09 | Sonata watches from ₹487, separate Men and Women links | Multi-product. Both codes already seen |
| Rogerkart Deals | 00:24 | Zebronics wireless car charger @ ₹999 | Duplicate of LIVE #17059, verified in 11-24c. Already seen |
| Dealdost | Mon | IndusInd Tiger credit card offer | Not a product |
| ONLINE SHOPPING DEALS | Mon | GKD coaster set @ ₹90 | #17081, EXPIRED since 11-24c. Already seen |
| IndiaFreeStuff Tips & Tricks | Fri | Swiggy Instamart "sort by discount" tip | Not a product |
| Hidden Loot Deals & Offers | Nov 11 | Swiggy Dineout voucher tip | Not a product |
| INDIAN CHEAP DEALS | Oct 29 | LG washing machine sale | Sale hub. Already seen |
| NonStopDeals | Oct 5 | Caprese handbags up to 90% off (`fkrt.it`) | Category post. Already seen |

As in earlier ticks, Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba were not among the loaded rows.

## Push

None. No candidate reached price verification, so the tick made no `/admin/deals/bulk` call and there was no count to read. `tg-multi-seen.json` is unchanged at 5,801 entries.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | Not sent, because no deals were pushed or changed |
| sitemap.xml | 200 (0.07s). ISR `revalidate = 1800` |
| llms.txt | 200 (0.41s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.54s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,521 = 16,521 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | All 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a` to `-24g` already existed, so this report uses suffix `h` | OK |
| Deploy | None. This was a data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 (ids 637 and 638). The CONTENT-SEO run at 12:39 IST can add a third. The cap is 4 |

## Still open

- **Telegram yield:** the sidebar heads have not changed since 11-24f. Early-morning yield is low, as usual.
- **IFS yield:** the same 29 candidates failed verification in deal-ingest 11-24c and 11-24d.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), boAt Stone 510, the Caprese sling bag, the two MURPHY wall lamps, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick filtered the sidebar by group id, so it read neither row. It did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
