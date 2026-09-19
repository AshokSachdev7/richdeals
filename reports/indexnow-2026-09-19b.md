# INDEXNOW tick — 2026-09-19b (IST)

Resubmitted every deal and post created in the last 6 hours, plus the hub pages and the
sitemap. **HTTP 200 on the first call — no 422, so the Bing GET fallback was not needed.**

## URL set — 27

Pulled from the live DB, not from a file: LIVE deals with `createdAt >= now-6h` and posts
with `publishedAt >= now-6h`.

| Class | Count |
|---|---|
| Deal pages (root-level slugs) | 23 |
| Blog posts | 1 |
| Hub pages (`/`, `/offers`) | 2 |
| `/sitemap.xml` | 1 |
| **Total submitted** | **27** |

The 23 deals are the Telegram + indiafreestuff batches from earlier in the window; the one
post is `which-dinner-set-material-is-best-india-2026`. Today's indiafreestuff ticks
published nothing, so nothing from them is in this set.

## Submission

```
node apps/api/scripts/indexnow-ping.mjs <23 deal slugs> blog/<post-slug> sitemap.xml
DONE: IndexNow -> HTTP 200 for 27 urls
```

Endpoint `https://api.indexnow.org/indexnow`, key `33f3a9d63ca15676bbd90586ea80e65f`,
keyLocation `https://richdeals.in/33f3a9d63ca15676bbd90586ea80e65f.txt`.

`200` is the accepted-and-queued status. The Bing GET fallback
(`https://www.bing.com/indexnow?url=…&key=…`) exists for the 422 rate-limit case that hits
blog pings; it did not trigger this tick.

## Verified the URLs are real before trusting the 200

IndexNow accepts a payload without checking that the URLs resolve, so submitting 404s is
possible and pollutes the host's reputation. Spot-checked prod:

```
200 0.544  /blog/which-dinner-set-material-is-best-india-2026
200 0.187  /solimo-plastic-storage-jar-container-set-800ml-set-of-6-b0ccvgl5jk
200 0.189  /frontech-true-wireless-5w-multimedia-speaker-with-rgb-lights-b0d11mfln3
200 0.348  /sitemap.xml
200 0.110  /33f3a9d63ca15676bbd90586ea80e65f.txt
```

The key file is the one that matters most — if it 404s, every submission is silently
rejected downstream regardless of the 200 on the POST. It serves.

Blog posts live at `/blog/<slug>`, deals at `/<slug>`. Both confirmed against prod rather
than assumed, because root-level blog slugs 404 and that is a known failure mode.

## Fixed inline — rot #12 (partial)

`apps/api/scripts/indexnow-ping.mjs` never included the sitemap in its default paths, so
every batch ping since it was written told the engines about the deal pages but not about
the index that lists them. It had to be passed by hand, which means it was skipped on any
tick that forgot. One-line fix:

```js
const paths = rawPaths ? args : ['/', '/offers', '/sitemap.xml', ...args.map(...)];
```

`urlList` is already de-duped through a `Set`, so passing `sitemap.xml` explicitly (as this
tick did) stays harmless.

The other half of rot #12 — CLAUDE.md documenting chunked sitemaps (`/sitemap/deals.xml`
etc.) that prod 404s, while only the single `/sitemap.xml` exists — is a doc-vs-reality
mismatch that needs an owner call on which way to resolve it. Left carried.

## Rot standing — 29 items, #12 downgraded

No new rot. #12 is now half-fixed: the ping omission is closed, the chunked-sitemap doc
claim stays open.
