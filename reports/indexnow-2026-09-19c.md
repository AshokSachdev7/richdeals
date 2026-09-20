# INDEXNOW tick — 2026-09-19c (IST)

**64 URLs submitted + 3 prepended defaults = `DONE: IndexNow -> HTTP 200 for 67 urls`.**
No 422, so the Bing GET fallback was not exercised this tick.

## What went in

| Source | Count |
|---|---|
| LIVE deals created in the last 6 h | **63** |
| Posts created in the last 6 h (`blog/<slug>`) | **1** |
| Prepended by the script (`/`, `/offers`, `/sitemap.xml`) | 3 |
| **Total urlList** | **67** |

The 63 deals are the `6fa79bd` indiafreestuff batch (34) plus the rest of the window's ingest and
Telegram pushes, ending at deal **10687** — the LONGWAY fan pushed in `telegram-2026-09-19N`.

## The script was read before it was run

`apps/api/scripts/indexnow-ping.mjs`, all 27 lines, before handing it 64 arguments. Three things
that read confirmed, each of which changed the call:

1. **Slug mode prepends `['/', '/offers', '/sitemap.xml']`** before mapping the args. That is why
   64 slugs report **67 urls** — the count is not a miscount and does not need explaining away
   next tick.
2. **The sitemap is always in the urlList.** The tick's *"+ sitemap"* clause is satisfied with no
   extra argument. Passing `/sitemap.xml` by hand would have been a duplicate — harmless, since
   the script dedups with `new Set`, but unnecessary.
3. **A `blog/<slug>` argument becomes `/blog/<slug>` naturally** (`'/' + s.replace(/^\//,'')`), so
   deals and posts go in **one call**. No second invocation, no `--paths` mode.

Reading first is what made the single-call design safe. Guessing at any of the three would have
produced either a wrong URL count in the report or a second redundant submission.

## Result

```
POST https://api.indexnow.org/indexnow
{ host: 'richdeals.in',
  key: '33f3a9d63ca15676bbd90586ea80e65f',
  keyLocation: 'https://richdeals.in/33f3a9d63ca15676bbd90586ea80e65f.txt',
  urlList: [67 urls] }

DONE: IndexNow -> HTTP 200 for 67 urls
```

**HTTP 200 on the first attempt.** No 422, no retry, **Bing GET fallback not needed.**

Worth stating because the standing note records that `api.indexnow.org` **422s on blog pings** —
that is a rate limit, not a payload fault, and it did not trigger here even at 67 URLs in one
request. The fallback stays documented and stays unused this tick.

## Why deals need this at all

The script's own header comment records the reason, and it is still true:
`RevalidateService.submitIndexNow()` no-ops unless `WEB_URL` is https, and the local `.env` points
at `http://localhost:3000`. **Deals pushed against localhost therefore never tell a search engine
anything by themselves.** Blogs are unaffected — `insert-blog-mdmeta.mjs` pings directly — which
is exactly why the blog post in this batch was already submitted once at publish time and is
resubmitted here as part of the 6-hour window. A duplicate submission is cheap; a missed deal is
a page no crawler is told about.

## Audit note

The URL-collection query and the CEO audit ran as one script. The audit arm **threw**:

```
PrismaClientValidationError: Invalid `prisma.post.count()` invocation
Unknown argument `status`. Did you mean `tags`?
```

`Deal` has a `status` column; **`Post` does not.** Published posts are
`where:{publishedAt:{not:null}}`. Re-run corrected — full results in `sitemon-2026-09-19g`.

The URL list had already been written to disk before the throw, so **no data collection was lost
and no extra DB round trip was spent.** Recorded here so the next tick does not re-derive the
schema difference from a stack trace.
