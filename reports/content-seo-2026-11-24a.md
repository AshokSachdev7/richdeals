# CONTENT-SEO tick — 2026-11-24a

This tick ran at about 00:39 IST on 11-24, the first CONTENT-SEO run of the IST day. The day had 0 posts, so one post was written. Keyword research covered WebSearch, the top-3 SERP results and our own deal clusters. Printers were a thin cluster: only `best-printers-home-use-india-2026` existed, so the post avoids the saturated best-X-under-Y and free-samples clusters. The rotation called for BOFU. Finished at about 00:47 IST.

**Result: 1 BOFU post published through `insert-blog-mdmeta.mjs`, IndexNow HTTP 200, cover generated and live. 11-24 now has 1 post, and the CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST leave room to reach 2–3. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Posts published

| Post | Funnel | Words | seoTitle / seoDesc | Internal links |
|---|---|---|---|---|
| [Ink Tank vs Laser Printer for Home: Which to Buy in India](https://richdeals.in/blog/ink-tank-vs-laser-printer-for-home-which-to-buy-india) (id 637) | BOFU | 1,285 | 57 / 152 chars | 13, all 200 on prod: 11 deal pages, `/blog/best-printers-home-use-india-2026` and `/offers` |

The 11 deal pages are the Canon G2730 (₹9,840), HP Smart Tank 589 (₹11,999), Brother DCP-T830DW (₹20,799), Brother DCP-L2520D (₹16,099), HP LaserJet 3104fdw (₹22,307), the Amazon Basics GI-790 and Needle GI71 refills, Foxin 88A and Lapcare TN-2465 toner, JK Easy Copier paper (₹271) and a Zebronics printer cable (₹119).

The post has an answer-first intro, a comparison table, worked cost-per-page maths, "buy an ink tank if" and "buy a laser if" sections with the live deals, a three-question decision list, a pre-checkout checklist and a 4-question FAQ. Running costs come from real prices:
- Canon GI-790 black is ₹595 at Reliance Digital and rated at about 6,000 pages, which works out to about ₹0.10 per page.
- Foxin 88A compatible toner is ₹389 against HP's 1,500-page rating for the 88A, which works out to about ₹0.26 per page.

The post makes no compatibility claims beyond the documented G2010/G3010 use of GI-790. The rest of the refill advice is generic: match the refill code to your model.

## Keyword angle

The keyword is "ink tank vs laser printer for home", a comparison query with buying intent. The top results ([Bajaj Finserv](https://www.bajajfinserv.in/laser-printer-vs-inkjet), [Digit](https://www.digit.in/features/general/inkjet-vs-laser-vs-ink-tank-printers-5-key-differences-explained.html), [TechRadar](https://techradar.com/news/choosing-between-ink-tank-vs-laser-printers-for-your-home-office)) explain the differences in general terms. None of them works out the cost per page in rupees with current refill prices, and none links to live deals. Yield figures come from [HP](https://www.hp.com/h71041/learn-about-supplies/us/en/toner.html) and [Canon Asia](https://asia.canon/en/consumer/web/page-yield). The GI-790 price comes from [Reliance Digital](https://www.reliancedigital.in/canon-pixma-gi-790-original-ink-bottle-black/p/491894053).

## Freshness

| Surface | Status |
|---|---|
| IndexNow (through `insert-blog-mdmeta.mjs`) | HTTP 200 |
| sitemap.xml | ISR `revalidate = 1800`, picks the post up within 30 minutes. Returns 200 |
| llms.txt | `force-dynamic`, rebuilt per request from `getPosts()`. Returns 200 |
| Cover | `gen-blog-covers.mjs` generated and uploaded 1 cover. `/media/og/<slug>.png` returned 404 on the first probe, a few seconds after upload, and 200 on the retry |

## Prod endpoints

| URL | Status | Time |
|---|---|---|
| `/` | 200 | 0.35s |
| `/offers` | 200 | 0.11s |
| `/blog` | 200 | 1.01s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.08s |
| `/api/deals` | 200 | 0.20s |
| `/llms.txt` | 200 | 0.74s |
| New post | 200 | 0.75s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,502 = 16,502 (16,959 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,109 vs 17,109 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | No `content-seo-2026-11-24*` existed, so this report uses suffix `a` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Flipkart drops:** boAt Stone 510 and the Caprese sling bag.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick did not touch Telegram, and none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
