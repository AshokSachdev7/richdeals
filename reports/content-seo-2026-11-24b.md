# CONTENT-SEO tick — 2026-11-24b

This tick ran at about 06:40 IST on 11-24. Posts per day (IST) showed 1 post for 11-24 before the run, which is under the target of 2–3, so one new post was researched, written and published.

**Result: 1 TOFU post published (id 638), which brings 11-24 to 2 posts. The insert went through `insert-blog-mdmeta.mjs` and the IndexNow ping returned HTTP 200. The cover was generated and returns 200, and the post plus all 11 internal links return 200 on prod. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Posts published

| Post | Funnel | Words | seoTitle / seoDesc chars | Internal links |
|---|---|---|---|---|
| [Geyser Not Heating Water? 7 Causes and Fixes by Symptom](https://richdeals.in/blog/geyser-not-heating-water-causes-fixes-india) (id 638) | TOFU (the earlier 11-24 post, id 637 on ink-tank vs laser printers, was BOFU) | 1,576 | 52 / 158 | 4 geyser blog posts, 6 live geyser deal pages and `/offers` |

The post answers the question in its first paragraph: check the MCB and switch, then the thermal cut-out, then the thermostat, and only then the element. A safety note follows. Next comes a "Diagnose by symptom" table with 7 rows, then one section for each of the 7 causes:

- no power
- a tripped cut-out
- a thermostat set too low or faulty
- scale on the element
- a burnt-out element
- a tank too small for the household
- an instant geyser running lukewarm in winter

After that it covers when to call an electrician, and then "Repair or replace?" with 6 live geyser deals (₹2,599 to ₹8,945). It ends with a FAQ of 5 questions.

Repair costs are attributed to Voltas's published service-cost table and flagged as rough guides. The 55–60°C setting is attributed to brand service guides. Deal prices are labelled as prices at the time of writing. The post has no images, so it needs no in-body alt text. The cover's alt text is the post title.

## Keyword angle

The site already had 7 geyser posts, covering sizing, instant vs storage, tank lining, electricity use and buying guides. None of them covered troubleshooting, which is the winter-peak problem query ("geyser not heating water", "geyser giving lukewarm water", "geyser reset button"). The top results are brand and service pages:

- [NoBroker](https://www.nobroker.in/appliance-services/guides/geyser-not-heating-water/)
- [Orient](https://orientelectric.com/blogs/water-heaters/common-geyser-problems-and-how-to-fix-them-a-complete-troubleshooting-guide)
- [Voltas](https://www.voltas.com/blogs/articles/signs-geyser-needs-repair)
- [Croma](https://croma.com/unboxed/common-water-heater-problems)
- [Jaquar](https://www.jaquar.com/en/troubleshoot-water-heater-issues)
- [Kenstar](https://kenstar.in/blogs/water-heater/the-most-common-water-heater-problems-and-how-to-fix-them)

Most of these lists are ordered by cause. This post is ordered by symptom, using a diagnosis table, and adds repair-or-replace guidance linked to live deals. The slug does not overlap with the saturated best-X-under-Y or free-samples clusters.

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200, sent by `insert-blog-mdmeta.mjs` |
| sitemap.xml | The blog child (`/sitemaps/blog/sitemap.xml`, 486 URLs) already lists the new post |
| llms.txt | Lists the new post (`force-dynamic`) |
| Cover | `/media/og/geyser-not-heating-water-causes-fixes-india.png` returns 200 and is the page's `og:image` |

## Prod endpoints

All 200: `/` 0.15s, `/offers` 0.09s, `/blog` 0.49s, `/sitemap.xml` 0.08s, `/feed.xml` 0.08s, `/api/deals` 0.08s, `/llms.txt` 0.31s.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,521 = 16,521 (16,979 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present: telegram-deal-monitor, desidime, deal-ingest, CONTENT-SEO, INDEXNOW, SCHEMA-AUDIT, SITEMON, AI-OVERVIEW, SEO-AUDIT-FIX | OK, nothing recreated |
| Report suffix | Only `content-seo-2026-11-24a.md` existed, so this report uses suffix `b` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2 (ids 637 and 638). The 12:39 IST CONTENT-SEO run can add a third. The cap is 4 |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259 and #12963.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Aavante Prime 5050D (ACCHE5DYZXTYBHNF), Sony WH-CH730N (ACCHSSBFSWJSFNPG), boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice. Its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material.
  - This tick did not touch Telegram, did not open that chat and opened none of its links.
  - The owner should leave the chat and report it to Telegram (owner action).
