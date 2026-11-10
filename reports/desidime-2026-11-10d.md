# DesiDime ingest — 2026-11-10d (09:58 IST)

**Result: 3 pushed LIVE (#16235-#16237), 2 dup LIVE rows price-synced with priceHistory (#14569 ₹164→₹160, #14019 ₹268→₹149), 1 rejected, IndexNow HTTP 200 (8 URLs).**

## Stage 1

- `ingest-desidime.mjs` discovered 33 cards and resolved 23 (cards only, JUNK/GROCERY filters, visit.desidime.com resolved).
- 9 were already in the DB, 9 were dropped as rejected within the last 24h, which left 5 fresh candidates.
- Skipped as rejected within 24h: MyFitFuel, Ninos, Atomberg FK, Wingreens JioMart, Mivi FK, Whirlpool FK, Klook, iQOO, Dell store.

## Pushed

| # | Item | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 16235 | Signoraware Mini Mate BPA-free containers, set of 8 (70ml, white) (B0C2WZPVZ1) | Amazon | ₹195 | — | — |
| 16236 | Creative's Thinking Puzzles H Letter brain teaser for kids (B0093117J0) | Amazon | ₹61 | ₹245 | 75% |
| 16237 | Beardo Man Curls Advanced Styling Pro Kit (B0HFKR8GSF) | Amazon | ₹513 | — | — |

- Slugs:
  - `/signoraware-mini-mate-bpa-free-containers-set-of-8-70ml-white-b0c2wzpvz1`
  - `/creative-s-thinking-puzzles-h-letter-brain-teaser-for-kids-b0093117j0`
  - `/beardo-man-curls-advanced-styling-pro-kit-cream-styler-serum-brush-b0hfkr8gsf`
- Affiliate links: Amazon `/dp/<ASIN>?tag=ashoksachdev-21`.
- Images: `m.media-amazon.com/images/I/<id>._SL1500_.jpg` (`61-1tGZjCpL`, `71ExXVA3UiL`, `715-KWhMwtL`).
- MRP nulled on #16235 and #16237 (PDP strike price was per-unit or missing).
- Bulk API result: HTTP 201, `count:3`, all `created:true`. DB re-read: LIVE, price and image set.

## Price sync (dup LIVE rows, Amazon PDP read)

| # | Item | DB before | Live now | MRP | Off |
|---|---|---|---|---|---|
| 14569 | Vaseline Lip Therapy Rosy Lips 7g (B01IAELKZ6) | ₹164 | ₹160 | ₹299 | 46% |
| 14019 | Aqueria body wash 875ml (B0HJ1RFP76) | ₹268 | ₹149 | — | — |

- Both rows: priceHistory row written, title tail rewritten to the new price, so title, visible copy and schema agree.

Unchanged dup rows:
- Hawkins #16234, Storio #16232, SNAPPSY #7022, Sounce #16226, Borosil #16228: same price.
- Dell #9916 and DJI #15258: bank-offer card prices, skipped.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| Bloomingo party games (B0D5D67BTJ) | — | null | No price on PDP, no add-to-cart |

Logged to `data/dd-rejected.json`, which now holds 1,801 keys.

## Freshness

- `indexnow-ping.mjs` was run with the 5 slugs (#16235-#16237, #14569, #14019), and the script added the 3 hubs. Result: **HTTP 200 for 8 URLs**.
- sitemap.xml is ISR with a 1800s revalidate. llms.txt is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 |
| DB LIVE vs API total | 15,671 = 15,671 |
| Max deal id vs broadcast cursor | 16,237 vs 16,234 (lag of 3, external broadcast cron draining the new rows) |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 |
| Posts | 476. 0 coverless, 0 without SEO fields. |
| Posts per IST day | 11-10: 3, 11-09: 3, 11-07: 3, 11-06: 3, 11-05: 3, 11-04: 2, 11-03: 4 (11-08: 0, 11-02: 0, 11-01: 1 — missed) |
| Session crons | 9/9 at last CronList check (sitemon 11-10c) |
| Unpushed commits | 0 (before this report) |

## Still open

- Blog misses: 11-08 had 0 posts, 11-02 had 0, 11-01 had 1.
- Same-price dup confirmations write no PH row in the desidime, TG and IFS dup-sync paths (SEO-AUDIT-FIX candidate).
- TG groups Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba not checked.
- TG 11-04l backlog: Vyom, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D. TIED RIBBONS toran.
- Price drift: #11896 Flipkart ₹664 vs DB ₹899, 16 bare Flipkart links, 96 drift rows.
- The DO API token still needs rotating (owner action).

Closed this tick:
- #14569 and #14019 price drift.
