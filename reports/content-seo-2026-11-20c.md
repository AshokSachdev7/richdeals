# CONTENT-SEO tick — 2026-11-20c

This tick checked posts per day in IST first. 11-20 had 2 posts, which meets the 2–3 target but leaves room for a third under the cap of 4. The last post (20b, #633) was BOFU, so this one is TOFU. Run at about 12:40–12:45 IST on 11-20.

**Result: published post #634, a TOFU guide to choosing between filterless and baffle-filter kitchen chimneys and sizing suction. It went in through `insert-blog-mdmeta.mjs` (IndexNow HTTP 200), and `gen-blog-covers.mjs` generated its 1200x630 cover. The post and cover both return 200 on prod, and the page already serves the cover as `og:image`. 11-20 is now at 3 posts. The CEO audit is green.**

## Post

| Field | Value |
|---|---|
| id | 634 |
| Slug | `filterless-vs-baffle-chimney-suction-guide-india` |
| Published | 11-20, about 12:42 IST |
| Title | Filterless vs Baffle Chimney: How Much Suction Does Your Kitchen Need? |
| seoTitle | Filterless vs Baffle Chimney + Suction Guide (India) (52 chars) |
| seoDesc | Filterless or baffle-filter chimney? Compare cleaning, suction and price, work out the m³/hr your kitchen needs with one formula, see live deals from ₹3,890. (157 chars) |
| Tags | kitchen chimney, home appliances, buying guide, kitchen |
| Intent | TOFU (informational comparison + sizing how-to), with a BOFU picks section |
| Length | 1,455 words, 8,913 chars |
| Cover | `https://richdeals.in/media/og/filterless-vs-baffle-chimney-suction-guide-india.png` (200, alt = post title) |
| In-body images | None, so no alt text needed (empty-alt count 0) |

## Keyword research

**Angle:** "filterless vs baffle chimney" plus "chimney suction capacity for Indian kitchen". It is a decision-stage query cluster that sits beside our two existing chimney posts (`best-kitchen-chimney-under-15000-india-2026`, `kitchen-chimney-vs-exhaust-fan-india-2026`) without duplicating them. It is not in the saturated best-X-under-Y or free-samples clusters.

**SERP read** (from WebSearch result extracts):
- [Glen: baffle filter vs filterless chimney](https://glenindia.com/blogs/news/baffle-filter-vs-filterless-chimney)
- [Kaff: baffle vs filterless for Indian kitchens](https://kaff.in/blog/baffle-filter-vs-filterless-chimney-which-is-best-for-indian-kitchen)
- [Hindware: baffle filter vs filterless chimneys](https://hindware.com/blogs/kitchen-appliances/baffle-filter-vs-filterless-chimneys)
- [Wonderchef: which cleans smoke better](https://www.wonderchef.com/blogs/know-the-product/filterless-vs-baffle-filter-chimney-which-cleans-smoke-better)
- [Decure on Medium: how to buy a chimney](https://medium.com/decure-in/how-to-buy-a-chimney-822a078aa523)
- [Beyond Appliances: chimney suction capacity explained](https://beyondappliances.in/blogs/healthy-kitchen-living/7-key-insights-chimney-suction-capacity-explained)

**Gap:** every top result is a brand or retailer blog pushing its own range. None is neutral, none ties the advice to live prices, and none covers duct derating (length, elbows, duct size) or the feet-vs-metres unit trap in the suction formula. The post covers all of these.

## Structure

1. Bold answer-first "Short answer" paragraph.
2. Filterless vs baffle at a glance (comparison table), plus two caveats: filterless is not maintenance-free, and auto-clean is a 10–15 minute heating cycle.
3. How much suction you need: the formula, a worked example (4 × 5 × 2.7 m = 54 m³ → 540–810 m³/hr), a 25–40% buffer, the unit trap, and a quick sizing table.
4. Why rated suction is not what you get (duct length, elbows, duct size, 65–75 cm mounting height).
5. Matching width to the hob (60 cm vs 90 cm).
6. Live picks by budget (7 deal links).
7. A 5-step decision checklist.
8. FAQ (5 Q&As).

## Internal links

10 internal links: 7 deal pages, 2 blog posts and `/offers`. All 7 deals were re-read from the DB just before insert and are LIVE with the same prices quoted in the post.

| Deal | Price | M.R.P. |
|---|---|---|
| #14903 Faber 90 cm 1,000 m³/hr Pyramid, 3 baffle filters | ₹3,890 | ₹27,990 (86% off; M.R.P. looks inflated) |
| #14313 CADLEC PeakFlow 60 cm filterless | ₹6,999 | ₹28,999 |
| #12703 Faber Artemis 60 cm 1,200 m³/hr filterless | ₹7,990 | ₹30,990 |
| #8602 AGARO Royal 60 cm 1,350 m³/hr filterless autoclean | ₹10,999 | ₹32,990 |
| #16994 Whirlpool VFL PRO 602 HAC 60 cm 1,600 m³/hr (low stock) | ₹13,990 | ₹36,990 |
| #16991 Whirlpool 60 cm 1,600 m³/hr BLDC filterless (low stock) | ₹14,690 | ₹33,990 |
| #7485 Havells Mirak BLDC 60 cm 1,600 m³/hr | ₹16,999 | ₹44,590 |

Also linked: `/blog/best-kitchen-chimney-under-15000-india-2026`, `/blog/kitchen-chimney-vs-exhaust-fan-india-2026` and `/offers`.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 (`/blog` + `/blog/filterless-vs-baffle-chimney-suction-guide-india`, sent by the insert script) |
| `sitemap.xml` | 200. The blog child (`/sitemaps/blog/sitemap.xml`, ISR 1800s) did not list the post yet at probe time. It picks it up within 30 minutes. |
| `feed.xml` | 200. Not yet listed at probe time (ISR 300s), so it appears within 5 minutes. |
| `llms.txt` | 200 and already lists the post (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/blog/filterless-vs-baffle-chimney-suction-guide-india` | 200, title and `og:image` correct | 0.68s |
| Cover PNG | 200 (95 KB) | 0.64s |
| `/` | 200 | 0.22s |
| `/offers` | 200 | 0.07s |
| `/blog` | 200 | 0.57s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.36s |
| `/api/deals` | 200: total 16,392, newest id 16,999 | 0.08s |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,392 = 16,392 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,999 | OK |
| Posts | 503 (this post), 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,999 = 16,999 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `content-seo-2026-11-20a` and `-b` existed, so this report uses suffix `c` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-11 | 3 |
| 11-12 | 3 |
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **3** |

No day is 0 and none is above the cap of 4. 11-20 is done. The 18:39 IST CONTENT-SEO tick should skip, since a fourth post would only pad the count.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999. #14903 (₹27,990 M.R.P. on a ₹3,890 chimney) also looks inflated.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DESIDIME | 11-20 12:47 |
| DEAL-INGEST | 11-20 12:53 |
| TG | 11-20 13:01 |
| SITEMON | 11-20 13:14 |
| INDEXNOW | 11-20 13:23 |
| CONTENT-SEO | 11-20 18:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
