# DEAL-INGEST tick — indiafreestuff — 2026-09-18 (TICK X)

## Result

| stage | n |
|---|---|
| cards discovered (2 listing pages, 2.6s gap) | 46 |
| resolved `?rto=` → real store URL | 40 |
| fresh vs live DB (by `productId`) | 29 |
| price-verified on live Amazon PDP | 29 |
| **pushed `status:live`** | **20** |

IndexNow: `DONE: IndexNow -> HTTP 200 for 22 urls` (20 deal slugs + `/` + `/offers`).
Bulk push: HTTP 201, count 20, all CREATED.

## Rejected (9 of 29 fresh)

| ASIN | reason |
|---|---|
| B0FN9TCR2B, B0FW56Q2GY, B0DJRCZ1ZP, B0FW59CQ5Y | out of stock (no `#add-to-cart-button`) |
| B0G8K11PVV | source ₹24,290 → live ₹53,999 (2.2x drift), no MRP |
| B0FWQG4MBN | source ₹319 → live ₹599 (1.9x drift), no MRP |
| B0DCP56BH5 | -10%, below the 30% floor |
| B07M9TWJMR | -23%, below the 30% floor |
| B07THB7YPC | basisPrice ₹10,445 against ₹533 = fake 95% MRP; nulling the MRP leaves no verifiable discount |

## Dropped at resolve (6 of 46)

4 Flipkart `dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff` tracking landings, 2 Flipkart
deeplinks with no `/p/itm` path, 1 JioMart card that resolved to the homepage. All correctly
rejected by `affiliate()`.

## Pushed (20)

All Amazon, `?tag=ashoksachdev-21`, published at the **verified live PDP price**, images from
`m.media-amazon.com`, every title and description rewritten.

| ASIN | ₹ live | MRP | off |
|---|---|---|---|
| B0HHDRWB6D | 499 | 1899 | 74% |
| B09WRPLVLF | 129 | 799 | 84% |
| B0DTJBRV99 | 139 | 399 | 65% |
| B0DSKQGT86 | 223 | 798 | 72% |
| B0GV8CSR6S | 149 | 499 | 70% |
| B0D1VMXSPW | 170 | 420 | 60% |
| B0HGBNK6VM | 199 | 899 | 78% |
| B0B3HZ1J77 | 159 | 999 | 84% |
| B0C6F3Z5Y1 | 396 | 2999 | 87% |
| B09HL5546N | 328 | 1499 | 78% |
| B0GR9C8821 | 1998 | 4999 | 60% |
| B0FBWG1Z6Q | 15999 | 22999 | 30% |
| B0DP2FLBZ2 | 113 | 280 | 60% |
| B0G5PY1L2Y | 935 | 4999 | 81% |
| B0FZJHWV1P | 113 | 200 | 44% |
| B00791FM42 | 58 | 140 | 59% |
| B0BGSD5N46 | 599 | 1999 | 70% |
| B0FZBGXHY9 | 799 | 2000 | 60% |
| B0743BLWWD | 445 | 1400 | 68% |
| B0CCVW6PJ7 | 329 | 600 | 45% |

## CEO audit

| check | value |
|---|---|
| deals | LIVE 10,194 / EXPIRED 257 |
| LIVE with null price | 0 |
| LIVE with null image | 0 |
| PENDING_REVIEW backlog | 0 |
| max deal id | 10,539 |
| posts published | 313 |
| posts/day IST | 09-18 = 3, 09-17 = 3, 09-16 = 3, 09-15 = 3, 09-14 = 4, 09-13 = 4 |
| coverless / seo-less (last 40 posts) | 0 / 0 |
| prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` | 200 all six |
| unpushed commits | 0 |
| tg-broadcast cursor | 10,482 vs max 10,539 — **57 behind, worse than 37 last tick** |

## Rot

1. `apps/api/scripts/lib/ingest-common.mjs` still has no Amazon extractor — hand-re-derived for
   the **16th tick running**. Also owed: the same-origin fetch verifier, the implausible-MRP
   guard, the `data-a-dynamic-image` fallback, the trailing-dot price strip, a shopsy
   `finalPrice` fallback, a Flipkart browser-tab fallback, the shortlink body-grep fallback,
   and a resolved-URL `/s?` assert.
2. **Source price drift is now the dominant reject reason** — 4 of 29 fresh cards drifted
   (24290→53999, 319→599, 374→499, 13499→15999). indiafreestuff card prices are a hint, never
   publishable. Drift plus OOS plus the floor ate 9 of 29.
3. indiafreestuff Flipkart links structurally dead — 4 of 46 cards again landed on
   `dl.flipkart.com/dl/indiafreestuff/p/indiafreestuff`. Effectively an Amazon-only source.
4. `tg-broadcast` external cron is not firing — cursor drifted from 37 behind to 57 behind in
   one tick. 57 live deals have never reached the channel.
5. `curlFinal` cannot follow client-side redirects (`rogerkart.com/r/…`).
6. Telegram yield collapsed three ticks running (0/25, 1/25, 1/25); `amzn.lt` NXDOMAIN, SB Loots
   permanently dead.
7. `.claude/agents/deal-ingest.md` stale on 4 points (review gate, sources, affiliate matrix,
   output path).
8. `where to get free samples`: 11,072 impressions / pos 6.8 / **0 clicks**, 46 of 313 slugs.
   Highest-value unshipped SEO action.
9. Organic collapse: last-28d GSC = 2 clicks / 67 impressions.
10. W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` from ASIN needs `productId` on the
    shared DTO) both need an API change.
11. ~605 untracked scratch files under `apps/api/`.
12. CLAUDE.md documents chunked sitemaps (`/sitemap-deals-1.xml`, `/sitemap-posts-1.xml`) that
    prod 404s.
13. `link.amazon` shortlinks can expand to `/s?hidden-keywords=` multi-ASIN search pages — the
    `/s?` reject must run on the resolved URL.

## Open owner decisions (5, unchanged)

1. Ratify publish-at-verified-live-price + the 30% discount floor in CLAUDE.md (the written
   ±₹1 rule would have killed 20 of 20 today).
2. Permanent DB pool cap in `apps/api/.env`.
3. External crons — DesiDime Task Scheduler `7,37 * * * *` and tg-broadcast — recreate or retire.
4. Free-samples cluster consolidation (46 of 313 slugs).
5. Scratch-file cleanup under `apps/api/`.
