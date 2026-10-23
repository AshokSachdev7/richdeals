# ALTERNATIVES — 2026-10-23

**5 new pages are live on richdeals.in: the `/alternatives` hub plus pages for 4 competitors. RichDeals is ranked #1 on every page and labelled "Our site". IndexNow returned HTTP 200 for 7 URLs.**

## Why build these pages

For the query "X alternative", where X is DesiDime, FreeKaaMaal or IndiaFreeStuff, the SERP is mostly generic aggregators: Semrush, Ahrefs, AlternativeTo and similar. None of the results is an Indian deal site with a real comparison, so this query cluster has no strong owner.

## Pages

| URL | Target query |
|---|---|
| `/alternatives` | best deal site alternatives India |
| `/alternatives/desidime` | desidime alternative(s) |
| `/alternatives/freekaamaal` | freekaamaal alternative(s) |
| `/alternatives/indiafreestuff` | indiafreestuff alternative(s) |
| `/alternatives/dealsmagnet` | dealsmagnet alternative(s) |

Each competitor page includes:
- A quick-answer box written for GEO.
- A "What is X?" section.
- A ranked list of picks with pros, cons and a "best for" line. RichDeals is #1, and the other picks come from DesiDime, FreeKaaMaal, IndiaFreeStuff, DealsMagnet, CashKaro, GrabOn and CouponDunia.
- A RichDeals vs X comparison table.
- A visible FAQ, plus a disclosure paragraph.
- Internal links to `/offers`, `/freebies`, `/coupons` and `/stores`, and cross-links to the other alternatives pages.

**JSON-LD:** BreadcrumbList, FAQPage (matching the visible FAQ), Article, and an ItemList of the ranked picks. The hub has BreadcrumbList and ItemList.

**Links:** links to competitor sites use `rel="nofollow noopener noreferrer"`. The RichDeals pick is an internal `Link`.

**Content:** comes only from the public homepages and features visible without an account. Nothing about competitors is fabricated, and each competitor's strengths are stated honestly.

## Wiring

- **Sitemap:** `apps/web/src/app/sitemaps/pages/sitemap.ts` lists `/alternatives` plus the 4 slugs (prod check: 5 matches).
- **`llms.txt`:** links the hub (prod check: 1 match).
- **Footer:** has a "Deal Site Alternatives" link.

## Ship

| Step | Result |
|---|---|
| Commit | `3a04fe7` feat(web): /alternatives competitor pages |
| Deploy | DO `64645364-ed9c-4503-b55f-fc4e97bb92d3` reached ACTIVE |
| Prod | `/alternatives` and all 4 slug pages return 200. The DesiDime page has the title "7 Best DesiDime Alternatives in India (2026) \| RichDeals" and 6 nofollow competitor links. |
| IndexNow | HTTP 200 for 7 URLs: the 5 alternatives pages, `/sitemap.xml` and `/` |
| Local API | :4000 returned 200 after the restart |

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Deals:** 13,901 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14431.
- **Broadcast cursor:** 14431, so it has caught up.
- **Posts (IST 2026-10-23):** 3. 0 posts lack a cover.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Next lever:** backlinks. Domain authority, not on-page work, is what limits ranking. These pages only rank if the domain earns links.
