# CONTENT-SEO: 2026-10-31d (~19:13 IST)

**Result: 1 new post published (post #583, BOFU). 31 Oct IST now has 4 posts, which is the cap, so no more posts today. IndexNow returned HTTP 200, the cover is uploaded, and the post returns 200 on prod with Article, FAQPage, HowTo and BreadcrumbList schema. All 7 internal links return 200. CEO audit clean.**

## Post
| Field | Value |
|---|---|
| id | 583 |
| Slug | `/blog/hdmi-capture-card-buying-guide-usb-2-0-vs-3-0-india` |
| Funnel stage | BOFU (the previous post, 10-31c, was TOFU) |
| Words | 1,581 |
| seoTitle | "HDMI Capture Card Buying Guide India: USB 2.0 vs 3.0" (52 chars) |
| seoDesc | 153 chars, unique |
| Tags | electronics, buying-guide, capture-card, streaming |
| Cover | `og/hdmi-capture-card-buying-guide-usb-2-0-vs-3-0-india.png` on DO Spaces. It is the `og:image`, and its alt text is the post title |
| Prod | HTTP 200 in 0.48 s |

## Cluster check
- No earlier post covers capture cards, webcams or streaming setup. This is a new cluster, not a near-duplicate.
- Live deals that back the post: #15870 (₹612) and #12635 Tobo (₹759).

## Keyword research
- Global SERP:
  - The MacroSilicon selection guide: MS2109 is the USB 2.0 chip, MS2130 is the USB 3.0 chip.
  - cnx-software: the MS2130 does 1080p60.
  - VideoHelp forum: USB 2.0 at 480 Mbps forces MJPEG, MS2109 is realistically 1080p30, and some cheap cards with a blue plug are really USB 2.0.
- India SERP:
  - gamingnation.in "Best Capture Cards Under 3000": the budget USB 2.0 dongle is a "1080p30 real", and HDCP on the PS5 is "a wall".
  - digit.in: the list is weighted toward premium cards.
  - techenclave: a budget PS5 thread.
  - Elgato HD60 X sells at ₹14,999 to ₹15,999.
- Gaps the post fills:
  - the USB 2.0 vs 3.0 difference explained at the chip level;
  - the three meanings of "4K" (accepts a 4K input, passes 4K through, or records in 4K);
  - how to check that a port and cable really run at USB 3.0;
  - the PS5 HDCP toggle;
  - using a DSLR as a webcam;
  - a table of picks under ₹1,000 using live deals.

## GEO patterns
- A "Short answer" paragraph that answers the query first.
- Two comparison tables: USB 2.0 vs 3.0, and which card for which job.
- Numbered OBS setup steps, which the page renders as HowTo schema.
- A bullet list of fixes and a buy checklist.
- A visible 5-question FAQ that matches the FAQPage schema.
- Claims are worded with care ("usually", "most"). There are no made-up statistics, and prices are given as "when checked".

## Internal links (all 200 on prod)
- Deal pages:
  - #15870 capture card
  - #12635 Tobo capture card
  - #15409 HDMI extension cable
  - #15787 USB-C hub
  - #15874 Technoview lavalier mic
- Blog post: `/blog/usb-vs-xlr-vs-wireless-lavalier-mic-which-to-buy-india`
- Hub page: `/offers`

## Freshness
- `insert-blog-mdmeta.mjs` pinged IndexNow and got **HTTP 200**.
- The sitemap is ISR (1800 s) and `llms.txt` is dynamic. No new static route was added.

## CEO audit (~19:13 IST)
| Check | Value |
|---|---|
| Prod endpoints | All 200: `/` 0.19 s, `/offers` 0.11 s, `/blog` 0.63 s, `/sitemap.xml` 0.13 s, `/feed.xml` 0.10 s, `/llms.txt` 0.41 s, `/api/deals` 0.15 s |
| API total vs DB LIVE | prod 15,321 = local 15,321 = DB 15,321 |
| DB max id | 15,875 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 454 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 4 (cap reached). Never 0, never over 4 |
| Broadcast cursor vs DB max | `lastId` 15,861 vs 15,875. The external cron is still draining the IFS 10-31j batch; the cursor moved from 15,856 since the last tick. Not rot |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster. Nothing recreated |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified.
- Rotate the DO API token.
