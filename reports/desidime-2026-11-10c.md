# DesiDime ingest — 2026-11-10c (05:59 IST)

**Result: 1 pushed LIVE (#16234), 1 dup LIVE row price-synced with priceHistory (#3594), #12508 same-price PH row written (stale Offer fixed), 1 rejected, IndexNow HTTP 200 (6 URLs).**

## Stage 1

- `ingest-desidime.mjs` discovered 35 cards and resolved 25 (cards only, JUNK/GROCERY filters, visit.desidime.com resolved).
- 9 were already in the DB, 14 were dropped as rejected within the last 24h, which left 2 fresh candidates.
- Skipped as rejected within 24h: MyFitFuel, Ninos, LuvLap, Jack Royal, Livpure, Atomberg FK, Wingreens JioMart, Mivi FK, Cadbury JioMart, Whirlpool FK, Klook, BSB, iQOO, Dell store.

## Pushed

| # | Item | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 16234 | Hawkins 2L triply stainless steel Pro handi, induction + gas compatible (B0DQHGR4ZK) | Amazon | ₹1,727 (card ₹1,728) | ₹2,375 | 27% |

- Slug: `/hawkins-2-litre-triply-stainless-steel-pro-handi-induction-gas-compatible-b0dqhgr4zk`
- Affiliate link: Amazon `/dp/B0DQHGR4ZK?tag=ashoksachdev-21`
- Image: `m.media-amazon.com/images/I/51zej1OgmPL._SL1500_.jpg`
- Bulk API result: HTTP 201, `count:1`, `created:true`. DB re-read: LIVE, price and image set.

## Price sync (dup LIVE rows, Amazon PDP read)

| # | Item | DB before | Live now | MRP | Off |
|---|---|---|---|---|---|
| 3594 | STRIDERS 2-piece kids lunch box (B0FZK9K5BN) | ₹119 | ₹128 | ₹599 | 79% |

- #3594: priceHistory row written. The hand-typed title tail was rewritten to `at ₹128 (79% Off) – Amazon`, so title, visible copy and schema agree.
- #12508 FRONTECH HDMI (B0CRL6SXTQ): PDP ₹69, same as the DB. A priceHistory row was written for the confirmation, so `priceValidUntil` is back (≈ 11-24). This closes the SCHEMA-AUDIT 11-10 PRIORITY item.

Unchanged dup rows:
- Storio B08D8HDD3W #16232: ₹197, same.
- SNAPPSY #7022: ₹108, same.
- Sounce mouse pad B0C5WY846P #16226: ₹79, same.
- Borosil B0DTPZHD9D #16228: ₹3,366, same.
- MILTON #16224: DB ₹203; card ₹99 drifts, DB kept.
- Dabur B0CJLY8XS3 #1411: the row is EXPIRED, so it was skipped.
- Dell #9916 (card ₹74,240) and DJI #15258 (card ₹33,240): bank-offer prices, skipped.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| PARAMESHWARI mortar & pestle (Flipkart MARHFDW4BUBCDHYK) | ₹200 | — | drift |

Logged to `data/dd-rejected.json`, which now holds 1,799 keys.

## Freshness

- `indexnow-ping.mjs` was run with the 3 slugs (#16234, #3594, #12508), and the script added the 3 hubs. Result: **HTTP 200 for 6 URLs**.
- sitemap.xml is ISR with a 1800s revalidate. llms.txt is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 |
| DB LIVE vs API total | 15,668 = 15,668 |
| Max deal id vs broadcast cursor | 16,234 = 16,234 |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 |
| Posts | 476. 0 coverless, 0 without SEO fields. |
| Posts per IST day | 11-10: 3, 11-09: 3, 11-07: 3, 11-06: 3, 11-05: 3, 11-04: 2, 11-03: 4 (11-08: 0, 11-02: 0, 11-01: 1 — missed) |
| Session crons | 9/9 present, none recreated |
| Unpushed commits | 0 (before this report) |

## Still open

- Blog misses: 11-08 had 0 posts, 11-02 had 0, 11-01 had 1.
- Root cause behind #12508 is still in code: same-price dup confirmations write no PH row (fixed by hand this tick). The IFS dup-row price-sync also writes no PH row. SEO-AUDIT-FIX candidate.
- TG 11-04l backlog still unchecked: Vyom, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- TG item still pending: TIED RIBBONS toran.
- Price drift:
  - #11896: Flipkart ₹664 vs DB ₹899.
  - 16 bare Flipkart links.
  - 96 drift rows.
- The DO API token still needs rotating (owner action).

Closed this tick:
- #12508 stale Offer (SCHEMA-AUDIT 11-10 PRIORITY).
- MILTON tiffin (#16224 LIVE) and Sounce mouse pad (#16226 LIVE) — dropped from the TG pending list.
- The SCHEMA 11-08 note (superseded by schema-audit-2026-11-10).
