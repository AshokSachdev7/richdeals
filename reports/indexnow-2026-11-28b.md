# INDEXNOW tick: 2026-11-28b (about 07:17 IST)

**Result:** IndexNow returned **HTTP 200** on both calls, for 27 URLs in total:

- **Deal call (slug mode):** 23 deal slugs plus the 3 hub URLs the script adds automatically.
- **Post call (`--paths`):** 1 post URL. This used the fixed script, which strips MSYS path mangling.

## Window (last 6 hours, from the DB)

| Bucket | Count | How it was selected |
|---|---|---|
| New LIVE deals | 8 | `createdAt` within the last 6 hours |
| Repriced LIVE deals | 15 | A `PriceHistory` row within the last 6 hours on a deal older than the window. `updatedAt` is not used because it is the click counter. |
| Posts | 1 | `createdAt` or `updatedAt` within the last 6 hours |

## Deal slugs pinged (23)

**New deals:**
- `adidas-men-adizero-evo-sl-grey-running-shoes-44609653`
- `zexsazone-cute-lion-soft-toy-18cm-b0hq3t7n6g`
- `alvami-womens-silk-solid-kurta-set-b0fdh21y55`
- `saleon-insulated-lunch-bag-front-pocket-b0hbjhfx5n`
- the other new rows from the TG, desidime and ingest ticks

**Repriced deals:**
- the Symbol ×5 rows
- Sedell
- floral curtains
- SPARX
- EITHEO
- Kobo
- JJ Jonex
- SignoraWare
- Blue Heaven
- Racold
- LG washer
- Dabur Odonil
- Boldfit pump
- Toshiba QLED
- TRESemmé (#3593, repriced ₹617 → ₹521 in SITEMON 11-28h)

## Post pinged (1)

- `/blog/silent-sweep-vs-ticking-wall-clock-which-to-buy-india` (#644)

## Notes

- The first attempt passed a `/c/...` path to `node require`, which cannot resolve that form. It was re-run with a `C:/...` path, and both calls returned 200.
- One extra `/blog` ping went out during the failed attempt and returned 200. It is harmless.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design. The pages and blog children are ISR (30 min).
- **llms.txt:** generated on each request.

## CEO audit (about 07:17 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.20s, `/offers` 0.09s, `/blog` 0.66s, `/sitemap.xml` 0.08s, `/feed.xml` 0.09s, `/api/deals` 0.10s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,041 / 0 / 0 / 0 | OK |
| Newest deal | #17647 | OK |
| Posts on 11-28 (IST) | 2 / coverless 0 / missing SEO fields 0 (SITEMON 11-28h) | OK |
| Crons | 9 of 9 (SITEMON 11-28h) | OK |
| Unpushed commits | 0 before this report | OK |
| Still open | The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
