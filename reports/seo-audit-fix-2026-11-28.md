# SEO-AUDIT-FIX tick: 2026-11-28 (about 05:58–06:10 IST)

**Result:** 1 real defect was found, fixed, deployed and verified. 8 live, indexable blog posts were missing from the blog sitemap. They were also missing from `/blog` pagination and `/llms.txt`, because `PostsService.list()` capped the list at 500 posts and there are now 512.

- **Fix:** commit 16be3ad, deployed ("api 200 / web 308").
- **Prod blog sitemap:** 486 → **494 URLs**, which is 512 posts minus 18 merged 308 redirects.
- **IndexNow:** HTTP 200 for 17 URLs.
- **Everything else:** the audit found 0 other defects.

The 11-26 and 11-27 SEO-AUDIT-FIX reports do not exist, because those session-cron ticks did not run. The last audit before this one was 11-25.

## Page audit (51 pages)

| Type | Pages | Defects | Notes |
|---|---|---|---|
| Hubs | 12 | 0 | |
| Stores | 8 | 0 | pedigree, ajio and cred have no live deals, so they serve `noindex` by design |
| Categories | 12 | 0 | |
| Deals | 12 | 0 | These are the 6 top-click deals and the 6 newest. None are in the pin set, so all serve `noindex,follow` by design |
| Blog posts | 7 | 0 | |

Each page was checked for:
- title and description length;
- a self-referencing canonical;
- a single H1;
- og:image;
- JSON-LD types;
- `rel="sponsored nofollow"` on `/out/` links;
- image alt text;
- duplicate titles or descriptions;
- noindex rules.

## Top-100 index set

- 100 GSC pins, all 100 LIVE.
- All 100 are in prod `/api/deals/top-indexable`, with 0 missing.
- The deals sitemap child is still the frozen top-100 set, as designed.

## Crawl surfaces

| Surface | Result |
|---|---|
| `sitemap.xml` | 200. 657 URLs before the fix, 665 after. 0 duplicates |
| Blog child | **486 → 494** after the fix. The newest post is present |
| `robots.txt` | 16 user-agent blocks, Sitemap line present, GPTBot allowed |
| `/llms.txt` | 200, 17.6 KB, regenerated after the fix |
| `/llms-full.txt` | 200, 40.0 KB |

## Post sweep and internal links

- **Posts:** 512 swept, 0 defects. Posts #340 and #300 share a title, but #340 308-redirects to #300, so this is not a defect.
- **Internal links:** 1,804 targets and 3,482 references, 0 dead.

## Defect: posts API capped at 500

**Symptom.** The blog sitemap had 486 URLs, but there are 512 posts.
- 18 of the 26 gap posts are merged posts that answer 308. Leaving them out is correct.
- **8 answered 200 with `index, follow` and a self-referencing canonical, so they should have been in the sitemap.** These are ids 1, 6, 8, 11, 13, 14, 21 and 30, all from 07-22:
  - `how-to-find-best-deals-amazon-india`
  - `best-smartphone-deals-india-2026`
  - `amazon-great-indian-festival-2026-guide`
  - `best-air-fryers-india-buying-guide`
  - `best-budget-smartphones-under-15000-india`
  - `best-ceiling-fans-bldc-vs-normal-india`
  - `best-mixer-grinders-india-buying-guide`
  - `best-trolley-bags-luggage-india`

**Root cause.** `apps/api/src/posts/posts.service.ts` `list()` used `take: Math.min(limit, 500)`, ordered newest first. So the oldest posts beyond 500 fell off every consumer of `getPosts()`:
- the blog sitemap;
- `/blog` pagination, which left those posts orphaned from the listing;
- the `/llms.txt` guide list;
- the related-post pool on `/blog/[slug]`.

Many 07-22 posts share an identical `publishedAt` (`11:11:41.218Z`). Because of that tie, the order is unstable, and the set that fell off changed from one read to the next: 13 distinct slugs were seen missing across two reads.

**Fix.** The cap and the default were raised to 5000, with a `ponytail:` note: switch to a slug-only sitemap query if the full list outgrows that.
- The fix is in one place, the service, so every consumer is fixed at once.
- The `?limit=N` path for the homepage is unchanged.

**Deploy.** Commit 16be3ad was pushed, then deployed with `/opt/richdeals-deploy.sh`, which ended "api 200 / web 308".
- The web build prerendered the sitemap against the old API process (pm2 had not restarted it yet), so the first read after the deploy still showed 486.
- I forced on-demand ISR with `POST 127.0.0.1:3010/api/revalidate` on the VM for `/sitemaps/blog/sitemap.xml`, `/blog` and `/llms.txt`. That call needs `X-Forwarded-Proto: https`, otherwise middleware 308s it to https.

**Verified on prod.**
- `/api/posts` returns 512.
- The blog sitemap has 494 URLs: all 8, plus the 5 tie-shifted slugs, are present.
- `sitemap.xml` returns 200.

## Freshness

- **IndexNow:** `--paths` mode → **HTTP 200 for 17 URLs**. These were:
  - the 13 previously missing blog URLs;
  - `/blog`, `/sitemap.xml`, `/sitemaps/blog/sitemap.xml` and `/llms.txt`.
- **Sitemap:** revalidated, now 494 URLs.
- **llms.txt:** revalidated.

## CEO audit (06:10 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`: all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,039 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17645 / 17645 | OK |
| Posts on 11-28 (IST) | 1 | CONTENT-SEO at 06:39 |
| 11-26 posts | 0 | Already flagged |
| Crons | 9 of 9 | OK |
| Unpushed commits | 0 after 16be3ad | OK |
| SEO-AUDIT-FIX history | No reports for 11-26 or 11-27 | Gap; those ticks did not run |

## Still open

- SCHEMA-AUDIT reports for 11-26 and 11-27 are missing.
- Prisma reprices do not write a PriceHistory row.
- #3593 `priceValidUntil` drops today.
- **Payload size:** `/posts` serves the full list at about 5.8 MB, which is above Next's 2 MB data cache. If this grows into a speed problem, the clean fix is a slug-only endpoint for the sitemap and llms.txt.
- **Deploy ordering:** the web build prerenders against the old API, so API-shape changes need a post-deploy ISR revalidate. Better: have `/opt/richdeals-deploy.sh` restart rd-api before it builds web.
