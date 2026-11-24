# INDEXNOW tick — 2026-11-24b

This tick ran at about 07:24 IST on 11-24. It resubmitted every deal page that was added, repriced or expired since the 11-24 ping, the three newest blog posts, and the sitemap and hub surfaces. The submissions went to api.indexnow.org (which shares with Bing) through `apps/api/scripts/indexnow-ping.mjs` with `MSYS_NO_PATHCONV=1`. The same URL set was then sent straight to `www.bing.com/indexnow`. Afterwards the tick ran the CEO audit.

**Result: all three submissions returned HTTP 200, covering 27 URLs through IndexNow and 24 through Bing directly. The CEO audit is green. The only rot is still the missed posts on 11-21 and 11-22.**

## Submissions

| Call | What was sent | URLs | HTTP |
|---|---|---|---|
| 1. `indexnow-ping.mjs` slug mode | 10 deal slugs, plus `/`, `/offers` and `/sitemap.xml`, which slug mode adds itself | 13 | 200 |
| 2. `indexnow-ping.mjs --paths` | The 3 newest posts and 11 crawl surfaces and hubs (`--paths` mode adds nothing, so they were listed by hand) | 14 | 200 |
| 3. Direct Bing (`www.bing.com/indexnow`) | The 10 deals, the 3 posts and the 11 surfaces | 24 | 200 |

Every call stayed well under the roughly 50-URL level at which Bing starts returning 403.

### Deal pages (10)

New since the 11-24 ping (ids above 17,126):

- #17127 `multi-functional-baby-walker-musical-toy-bar-green-b0hgr4k47x`
- #17128 `handmade-rose-bath-soap-pack-of-3-b09c5n71gb`
- #17129 `new-bee-rgb-headphone-stand-usb-c-charging-black-b09xqmff1b`

Repriced in place:

- #977 Dabur charcoal toothpaste, ₹96 (tg-monitor 11-24b)
- #1688 Biotique matte lipstick, ₹232 (deal-ingest 11-24b)
- #4926 Bosch 8kg washing machine, ₹20,490 (tg-monitor 11-24b)
- #13527 Dove hand wash, ₹104 (tg-monitor 11-24b)
- #13590 Crompton downlighter pack of 10, ₹812 (tg-monitor 11-24b)

Moved to EXPIRED. They were resubmitted so crawlers see the expired banner and the Discontinued availability:

- #8707 Reebok CN4076 sneakers (deal-ingest 11-24c)
- #17081 GKD coaster set (tg-monitor 11-24c)

### Newest posts (3)

- `/blog/geyser-not-heating-water-causes-fixes-india` (id 638)
- `/blog/ink-tank-vs-laser-printer-for-home-which-to-buy-india` (id 637)
- `/blog/induction-vs-lpg-gas-cost-per-month-which-is-cheaper-india` (id 636)

### Crawl surfaces and hubs (11)

- Sitemaps: `/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/sitemaps/pages/sitemap.xml`
- Feeds: `/feed.xml`, `/llms.txt`
- Hubs: `/`, `/offers`, `/blog`, `/freebies`, `/coupons`

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.46s (`/blog` was the slowest) | OK |
| DB LIVE vs API total | 16,521 = 16,521 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless / SEO-less posts | 0 / 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | Only `indexnow-2026-11-24.md` existed, so this report uses suffix `b` | OK |
| Deploy | None. This tick changed no code | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 (ids 637 and 638). CONTENT-SEO runs next at 12:39 IST and can add a third. The cap is 4 |

## Still open

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
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
