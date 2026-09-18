# DEAL-INGEST indiafreestuff — 2026-09-18 (hand-driven tick)

## Funnel

| stage | count |
|---|---|
| discovered (RSS + `/deals` + `/deals/superdeals`, GAP 2600ms) | 43 cards |
| `?rto=` resolved to real store URL | 40 |
| dropped at resolve (category/search/dead) | 3 |
| fresh vs live DB (dedup on resolved `productId`) | 35 |
| price-verified ±₹1 + InStock | **23** |
| rejected on price drift | 12 |
| **pushed LIVE** | **23** |

Push: `POST /admin/deals/bulk`, batches of 15 — `HTTP 201 +15`, `HTTP 201 +8`.
All 23 Amazon, affiliate `?tag=ashoksachdev-21` on `/dp/ASIN`. Images all
`m.media-amazon.com` (never `images.indiafreestuff.in`). Titles and descriptions
rewritten, nothing copied verbatim.

**IndexNow: HTTP 200 for 25 urls** (23 deal slugs + `/` + `/offers` hubs).
Prod spot-check: `/cellecor-bropods-cb44-tws-earbuds-b0cjmh` 200,
`/patriot-memory-viper-v551-...-b07rh9` 200.

## Verified + pushed (23)

| ASIN | price | mrp | slug tail |
|---|---|---|---|
| B0G17R94F5 | 102 | — | b0g17r |
| B083WJ9RR8 | 108 | — | b083wj |
| B0DSSWW86N | 167 | — | b0dssw |
| B0DCCC9G87 | 27 | 199 | b0dccc |
| B0DR51WXJ9 | 909 | 2599 | b0dr51 |
| B0DYF1MSGR | 494 | 1978 | b0dyf1 |
| B0FCYMN88J | 591 | — | b0fcym |
| B0CBM2Q64Q | 131 | — | b0cbm2 |
| B0F1SP1KF9 | 148 | — | b0f1sp |
| B0CKBJ6716 | 181 | — | b0ckbj |
| B0C1NSTBMK | 749 | — | b0c1ns |
| B0FH4NHNDS | 183 | — | b0fh4n |
| B0CJMHKWXX | 663 | — | b0cjmh |
| B01AP4KK32 | 153 | — | b01ap4 |
| B0H2K1B78C | 102 | — | b0h2k1 |
| B0GN411HVY | 239 | — | b0gn41 |
| B07SLNG3LW | 3899 | — | b07sln |
| B09K69NTJH | 269 | — | b09k69 |
| B0GRPN3QRZ | 77 | — | b0grpn |
| B01EBZU8IS | 221 | — | b01ebz |
| B0BNNGZGFM | 753 | — | b0bnng |
| B08JTXG9J8 | 329 | — | b08jtx |
| B07RH94GKW | 885 | — | b07rh9 |

Only 3 rows carried a real MRP, so `discountPct` is null on the other 20 —
no fabricated discount percentages.

## Rejected — price drift >₹1 (12)

carded → live: B0H3G1TRFS 99→79 · B0H69SR4VZ 135→128 · B0CXSGV3KT 123→116 ·
B0CZZXM38Y 111→105 · B0FQD6Q6K6 80→72 · B0CST1WR6R 393→373 ·
B0FBR9DBPC 279→223 · B0GYPPR6YD 129→103 · B0H3G2V64B 99→79 ·
B0FQDPJX3Q 99→89 · B0H8CT5BCH 899→1 · B0C82PJH3S 3599→3349.

Two of those are also quality rejects on their own: B0FQDPJX3Q (source title
carries a literal `[Mrp Error]`) and B0H8CT5BCH (₹1 price-error bait listing).

## ROOT CAUSE — "indiafreestuff yield collapse" is misdiagnosed

Carried as rot across three prior ticks as "discovery is broken". It is not.
Discovery worked fine this tick: 43 cards → 40 resolved → 35 fresh.

Real cause: **all 35 fresh candidates were Amazon**, and Amazon PDP price
verification only works inside the logged-in Playwright tab (curl is
bot-blocked on PDPs). The `23 */2 * * *` session cron has no browser, so every
Amazon candidate fails verification and is dropped — only the handful of
non-Amazon candidates survive, which is exactly the observed ~2/sweep. Driven
by hand with the browser, the same sweep yielded 23 live deals.

Restate the flag as: **cron cannot verify Amazon; Amazon-heavy sweeps yield ~0.**
Fix is either (a) give the cron a browser path, or (b) accept that
Amazon-heavy windows need a hand-run.

## CEO audit

| check | result |
|---|---|
| LIVE deals | 10,110 (max LIVE id 10455, +24 in the last hour) |
| PENDING_REVIEW | 0 |
| EXPIRED | 257 (pages stay live with banner) |
| LIVE null price / null image | 0 / 0 |
| posts published total | 313 — coverless 0, seoless 0 |
| posts/day IST last 5 | 09-14:4 09-15:3 09-16:3 09-17:3 09-18:3 |
| prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/api/deals` `/llms.txt` | 200 × 7 |
| unpushed commits | 0 |
| tg-broadcast cursor | `lastId:10437` vs max LIVE **10455** — 18 behind |

### ROT FLAGGED

- **tg-broadcast cursor 18 behind** (10437 vs 10455) — expected right after a
  23-deal push; the external cron should close it on its next run. Re-check
  next tick; if it is still 18+ behind, the external job is dead.
- **`.claude/agents/deal-ingest.md` stale** — still says `"status": "pending-review"`
  (AUTO-APPROVE killed the review gate), still routes Flipkart *and* "Other
  stores" through EarnKaro (matrix is `affid=djhackraj` / Cuelinks), still
  references the superseded `data/deals/index.json` dedup, and still carries
  `"amazonTag": "REPLACE-WITH-OUR-TAG-21"`.
- **Amazon extraction fixes still not baked into `apps/api/scripts/lib/ingest-common.mjs`**
  — buybox-first read, CSS-polluted-buybox fallback, MRP via `pay/(1-savingsPercentage)`,
  `#add-to-cart-button` as the in-stock signal. Re-derived by hand for the
  fourth tick running. Highest-value unshipped code fix. Add a shopsy
  `finalPrice` fallback in the same pass.
- **tg seen-cache (`data/tg-multi-seen.json`, ~1,700 entries) records "processed", not "published"**
  — a deal skipped once for a transient reason is never reconsidered.
- **`where to get free samples`: 11,072 impressions, pos 6.8, 0 clicks.** 46 of
  313 slugs sit in that cluster. Needs merge/prune, not more posts.
- Organic still collapsed: last-28d GSC = 2 clicks / 67 impressions.
- 307 LIVE deals carrying pointless `updatedAt` re-stamps — undiagnosed.
- W6 (`/coupons` + `/freebies` ignore `?type=`) and W8 (`sku` from ASIN needs
  `productId` on the shared DTO) both need an API change.
- ~605 untracked scratch files under `apps/api/`.

### Owner decisions still open

1. Ratify publish-at-live-price + the 30% minimum live-discount floor in CLAUDE.md.
2. Permanent DB pool cap in `apps/api/.env`.
3. DesiDime Task Scheduler job `7,37 * * * *` (external cron, needs explicit go-ahead).
4. Free-samples cluster consolidation (46 of 313 slugs).
5. Scratch-file cleanup under `apps/api/`.
