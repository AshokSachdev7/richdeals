# INDEXNOW tick — 2026-11-24c

This tick ran at about 07:55 UTC (13:25 IST) on 11-24. It resubmitted every deal page that is new or changed since the last IndexNow report, the 3 newest posts, and the sitemaps, feeds and hubs. All calls used `apps/api/scripts/indexnow-ping.mjs` with `MSYS_NO_PATHCONV=1`, followed by a direct Bing submission of the same set.

**Result: every call returned HTTP 200.** 101 unique URLs went to api.indexnow.org and the same 101 went to Bing.

## Submissions

| Call | What was sent | URLs | HTTP |
|---|---|---|---|
| Slug mode, batch A | The 44 newest new deal slugs, plus `/`, `/offers` and `/sitemap.xml` (added by the script) | 47 | 200 |
| Slug mode, batch B | The other 30 new slugs and 13 repriced slugs, plus the same 3 automatic URLs | 46 | 200 |
| `--paths` | 3 posts and 11 crawl surfaces and hubs (this mode adds nothing, so all were listed) | 14 | 200 |
| Direct Bing, `www.bing.com/indexnow` | All 101 unique URLs, in chunks of 50, 50 and 1 | 101 | 200 / 200 / 200 |

## Deal pages (87)

- **New (74):** every LIVE deal with an id from 17130 to 17203. These came from deal-ingest 11-24g, desidime 11-24g and the TG ticks since the last report. Newest: #17203 `colors-queen-matte-lip-liner-pencil-l-04-indian-red-b0bj2t58f3`. Oldest: #17130 `nirlon-non-stick-cookware-set-of-4-with-bakelite-handles-b08d9j9wj7`.
- **Repriced in place (13):** #299, #1530, #4902, #8341, #11191, #11249, #12449, #12555, #13349, #16071, #16215, #16354 and #16447. All 13 are still LIVE.
- **Moved to EXPIRED:** none since the last report.

## Newest posts (3)

- `/blog/geyser-not-heating-water-causes-fixes-india` (638)
- `/blog/ink-tank-vs-laser-printer-for-home-which-to-buy-india` (637)
- `/blog/induction-vs-lpg-gas-cost-per-month-which-is-cheaper-india` (636)

## Crawl surfaces and hubs (11)

- Sitemaps: `/sitemap.xml`, `/sitemaps/deals/sitemap.xml`, `/sitemaps/blog/sitemap.xml`, `/sitemaps/pages/sitemap.xml`
- Feeds: `/feed.xml`, `/llms.txt`
- Hubs: `/`, `/offers`, `/blog`, `/freebies`, `/coupons`

The deals sitemap child lists only the top 100 deals by design. The other deal pages are `noindex,follow`, so IndexNow is the only push channel for them.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (7) | All 200, 0.07–0.87s. Slowest: `/blog` (0.87s) | OK |
| DB LIVE vs API total | 16,595 = 16,595 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,203 vs 17,182 | OK, the cursor is self-healing |
| Coverless / seo-less posts | 0 / 0 | OK |
| Unpushed commits | 0/0 before this report | OK |
| CronList vs roster | All 9 present | OK, nothing recreated |
| Report suffix | `indexnow-2026-11-24.md` and `-24b` already existed, so this report uses `c` | OK |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 so far. The cap is 4 |

## Still open

See `sitemon-2026-11-24m.md` for the full list. In short: stale reposts, legacy slugs and titles (#1530, #299), low IFS yield, `priceValidUntil` missing on about 94% of deals, the 5.8MB `/posts` response, GSC traffic down about 70%, inflated M.R.P.s, no buy box on #7259, #12963 and #14154, and Flipkart drops.

- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
