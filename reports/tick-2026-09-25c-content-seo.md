# CONTENT-SEO tick — 2026-09-25c (00:20 IST)

**Published: 1 post** — `/blog/full-body-triply-vs-triply-base-cookware-india-2026` (post id 387). IndexNow **HTTP 200**, cover generated and uploaded (cover URL returns 200).

## Posts-per-day gate
- 09-25 IST had 0 posts, which is under the cap of 4, so the post was written.
- 09-24 IST closed at 3 posts.

## Keyword research
- **Topic choice:** we have 32 LIVE triply deals and no post about triply cookware. Triply is non-seasonal and outside the saturated best-X-under-Y and free-samples clusters.
- **Search results:** the top results for "triply vs stainless steel vs non stick india" are all brand blogs selling their own pans (TTK Prestige, Stahl, Vinod, Indus Valley, OmiChef, Sigriwala, Jindal).
- **Gap:** I read the Prestige page (about 4,500 words) and the Sigriwala page (about 2,800 words). Neither covers:
  - full-body vs base-only construction
  - how to check whether a listing is real triply
  - thickness or weight comparison
  - cleaning rainbow stains

  That gap became the angle, and it is neutral rather than a brand pitch.
- **Primary keyword:** "full body triply vs triply base". Secondary: triply vs non-stick, why food sticks to triply, rainbow stains on triply.

## Post
| Field | Value |
|---|---|
| Slug | full-body-triply-vs-triply-base-cookware-india-2026 (51 chars) |
| Words | 1581 |
| seoTitle | Full-Body Triply vs Triply Base Cookware (India 2026) — 53 chars, unique |
| seoDesc | 153 chars, unique |
| Tags | cookware, triply, kitchen, buying guide, induction |
| Structure | H1, a short answer in the first 100 words, 2 comparison tables, a 5-step verification checklist, a preheat method, a cleaning section, and a 5-question FAQ |
| Internal links | 7, all return 200 on prod. |

The 7 internal links:
- 5 live triply deal pages, including the Butterfly "Triply Base" cooker as a real example of base-only construction
- the cast-iron-vs-nonstick blog post
- `/offers`

**Content integrity:**
- The deal prices in the table are the listed rows, labelled "listed at when we posted it".
- No fabricated statistics, ratings or thickness figures.
- The post has no in-body images; the cover alt text comes from the title.

## Live check
- The page returns 200 with the title `Full-Body Triply vs Triply Base Cookware (India 2026) | RichDeals`.
- JSON-LD on the page: Article, FAQPage and BreadcrumbList.
- `og:image` is the new cover.

## Correction found this tick
Git Bash on this machine has no zoneinfo, so `TZ=Asia/Kolkata date` quietly prints **UTC**. Because of that, the two earlier reports were named and timestamped as if it were still 09-24 IST. They were actually run just after midnight IST on 09-25. Fixed:
- `tick-2026-09-24m-telegram.md` renamed to `tick-2026-09-25a-telegram.md`, and `push-tg-0924m.mjs` renamed to `push-tg-0925a.mjs`.
- `tick-2026-09-24n-sitemon.md` renamed to `tick-2026-09-25b-sitemon.md`. Its time "18:42 IST" was changed to "00:12 IST".

The CEO audit script was never wrong: it computes IST in node as UTC+19800s. From now on, IST is taken from node, not from `date`.

## CEO audit (checked against the DB)
- **Deals:** 10734 LIVE, max id 11081, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image.
- **Posts:** 328 in total. None is missing a cover or its SEO fields.
- **Posts per day (IST):** 09-16=3, 09-17=3, 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3, 09-25=1 so far. No finished day at 0, and none over the cap of 4.
- **Broadcast cursor:** 11081, equal to the max id, so it is fully caught up.
- **Production endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
