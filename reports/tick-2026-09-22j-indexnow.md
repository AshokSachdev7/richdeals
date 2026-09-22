# INDEXNOW tick — 2026-09-22 07:27 IST

**Result: `DONE: IndexNow -> HTTP 200 for 47 urls` in a single POST. 44 slugs (41 deals + 3 posts) + 3 standing paths. No 422, so the Bing GET fallback was never needed — probed anyway, also 200.**

## Window

`apps/api/_ixn0922.cjs`, serial Prisma (managed PG ~22 slots, `Promise.all` → `P2037`):

```
since 2026-09-21T19:53:23.271Z | now 2026-09-22T01:53:23.622Z
deals 41 posts 3
```

= 01:23 → 07:23 IST. **41 LIVE deals `#10809`–`#10849`**, arriving in five bursts — 20:26Z ×27, 20:34Z ×3, 23:26Z ×6, 00:28Z ×4, 01:36Z ×1 — which maps cleanly onto the two IFS sweeps, the two Telegram ticks and the 07:50 IFS single publish.

**3 posts `#379`–`#381`**, all `publishedAt 2026-09-21T20:37:28.934Z`:

| id | slug |
|---|---|
| 379 | `do-you-need-a-watch-winder-automatic-watch-india-2026` |
| 380 | `cheap-ipad-stylus-alternative-apple-pencil-price-india-2026` |
| 381 | `phone-cooling-fan-gaming-worth-it-india-2026` |

Posts are passed as `blog/<slug>` — `indexnow-ping.mjs` strips only a leading `/`, so a bare post slug would have submitted a root-level URL that 404s.

## Submission — one call, no fallback

```
node apps/api/scripts/indexnow-ping.mjs <41 deal slugs> blog/<3 post slugs>
DONE: IndexNow -> HTTP 200 for 47 urls
```

47 = 44 + the three standing paths the script always prepends (`/`, `/offers`, `/sitemap.xml`). **The brief's "+ sitemap" was therefore satisfied inside the same POST** — a separate sitemap submission would have been a duplicate.

Payload: `host richdeals.in`, `key 33f3a9d63ca15676bbd90586ea80e65f`, `keyLocation https://richdeals.in/33f3a9d63ca15676bbd90586ea80e65f.txt`, POST to `https://api.indexnow.org/indexnow`.

**Bing GET fallback probed anyway** (one request, so the next tick knows the path is alive rather than assuming it): `https://www.bing.com/indexnow?url=…&key=…` → **200**.

This qualifies a standing memory. `indexnow-bing-fallback.md` says api.indexnow.org 422s on blog pings. **This tick submitted 3 blog URLs inside a 47-url batch and got 200.** The 422 is not universal — likely a blog-only or single-URL payload shape. Keep the fallback wired, stop treating the 422 as the expected outcome.

## Prod verification of what was submitted

Submitting a 404 to IndexNow is a trust cost, so every URL class was checked rather than assumed.

| URL | Status | Time | Size |
|---|---|---|---|
| `/blog/do-you-need-a-watch-winder-automatic-watch-india-2026` | 200 | 0.517 s | 75,284 b |
| `/blog/cheap-ipad-stylus-alternative-apple-pencil-price-india-2026` | 200 | 0.329 s | 75,233 b |
| `/blog/phone-cooling-fan-gaming-worth-it-india-2026` | 200 | 0.389 s | 73,324 b |
| `/amfin-17-inch-love-anniversary-foil-balloon-bouquet-pack-of-20` | 200 | 0.231 s | 162,499 b |
| `/aarika-women-knitted-cardigan-sweater` | 200 | 0.168 s | 160,931 b |
| `/sitemap.xml` | 200 | 0.335 s | 2,134,655 b |
| `/33f3a9d63ca15676bbd90586ea80e65f.txt` | 200 | 0.179 s | 32 b |

The key file matters as much as the ping — a 404 there silently invalidates every submission. 200, 32 bytes, contents = the key.

## Sitemap cross-check — `missing=0 of 44`

`/sitemap.xml` → **9,809 `<loc>`**, 2,134,655 b. Exactly the 06:20 audit's 9,808 plus one for `#10849`, and +208 b against the 07:50 read.

All 44 submitted URLs grepped against the live sitemap XML: **`missing=0 of 44`**. Everything pinged is also crawl-discoverable, so the two discovery paths agree — no URL is being announced to Bing that Google can only reach by ping.

(XML extracted with `tr '<' '\n' | grep … | sed …`; `grep -oP` is unusable in this Git Bash — locale error.)

## The real finding: `llms.txt` never carried deals

Freshness check #3 in CLAUDE.md says `llms.txt` carries the batch. The newest deal slug came back **ABSENT** from `/llms.txt`. Instead of flagging freshness rot, I read the route.

`apps/web/src/app/llms.txt/route.ts`:

```ts
import { getStores, getCategories, getPosts } from "@/lib/api";
const [stores, categories, posts] = await Promise.all([getStores(), getCategories(), getPosts()]);
```

**`getDeals` is never imported and never called.** That route lists hub pages, ≤40 stores, ≤40 categories and the newest 30 posts, and then explicitly delegates deal data:

```
- Full deal data (prices, discounts, links): ${absUrl("/llms-full.txt")}
```

So the absence is **by design, not rot**. `/llms.txt` is 200 / 14,774 b, byte-identical to the 07:50 read, and both sampled blog slugs are present — which is all that route is responsible for.

Deal freshness verified on the file that actually owns it: **`/llms-full.txt` 200, 92,372 b, 308 `richdeals.in/` links, 4/4 sampled deal slugs present including `#10849`.** The AI surface has the batch.

**CLAUDE.md defect:** freshness rule #3 names the wrong file for deals. It should read `llms-full.txt` (rebuilt off `getDeals()`) for deal batches and `llms.txt` (`getPosts()`/`getStores()`/`getCategories()`) for posts and hubs. Checking a deal batch against `llms.txt` will report a false miss every single time — as it just did. Not edited in this tick: CLAUDE.md is the owner's operating doc, and the ping brief is not a licence to rewrite it.

## CEO audit

| Check | Value | Status |
|---|---|---|
| IndexNow HTTP | 200, 47 urls, 1 call | OK |
| Bing fallback path | 200 (probe, unused) | OK |
| submitted URLs live on prod | 7/7 sampled 200 | OK |
| submitted vs sitemap | missing=0 of 44 | OK |
| sitemap | 9,809 locs / 2,134,655 b (+1 vs 06:20) | OK |
| `llms-full.txt` | 200, 4/4 deal slugs present | OK |
| key file | 200, 32 b | OK |
| unpushed commits | 0 before this report | OK |

Rows verified against the DB post-push at 07:50 and unchanged since: LIVE 10,502; null price / null image 0 / 0; PENDING_REVIEW 0; tg-broadcast cursor 10849 = DB max; posts 322, coverless 0, seo-less 0; posts/day IST 09-22 = 3 (inside the 2-3 target, under the cap of 4).

**Standing structural risk, thirteenth consecutive tick:** `schtasks` has zero richdeals entries. Every job in `.claude/cron-schedules.md` — this one included — is a session cron living in memory. Session closes → ingest, blog publishing, broadcasts, audits and this ping all stop, with no alert. Task Scheduler wiring was offered in an earlier session and never approved; nothing was changed.

**Amazon.in still signed OUT in the `richDeals` Playwright profile** — fifth consecutive tick. Not fixed: logging in touches the owner's credentials.

## Note on cost

41 deals and 3 posts in one 47-url POST instead of 44 separate pings. IndexNow accepts up to 10,000 URLs per payload, so batching per tick is strictly better than per-publish pings — and the per-publish path already ran for the blog posts through `insert-blog-mdmeta.mjs`. This tick is a deliberate re-submission, which IndexNow tolerates; nothing here was a first announcement except the sitemap's new `<loc>` count.
