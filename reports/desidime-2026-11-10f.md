# DesiDime ingest — 2026-11-10f (12:52 IST)

**Result: 4 pushed LIVE (#16248-#16251), 1 dup LIVE row price-confirmed with priceHistory (#2168 UHUD ₹299), 3 rejected, IndexNow HTTP 200 (8 URLs).**

## Stage 1

- `ingest-desidime.mjs` discovered 37 cards and resolved 20 (cards only, JUNK/GROCERY filters, visit.desidime.com resolved).
- 3 were already in the DB, 7 were dropped as rejected within the last 24h.
- Skipped as rejected within 24h: Samsung FK fridge, Jiomart 99% off, Klook, Atomberg FK, Wingreens JioMart, MyFitFuel, Dell store.
- Dropped: Shopsy (Awique, Tech Bird), Flipkart Big Bang sale hub (category page).
- Stage-1 skips: Hamaramall Mamaya bar (no ld+json, grocery), Instamart oats (price drift), Haier AC FK (price drift).

## Pushed

| # | Item | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 16248 | Crackles Unicorn Princess Fancy Puzzle Erasers, 15 Count (B09P6GSCM7) | Amazon | ₹151 | ₹1,000 | 85% |
| 16249 | Decorative Floor Lamp, Orange (Smoky Yellow Small) (B0GHSWS1B9) | Amazon | ₹2,379 | ₹3,400 | 30% |
| 16250 | Lifelong Cool Mist Ultrasonic Humidifier 5.5L, Top Fill (B0H4Z34V8T) | Amazon | ₹2,319 | ₹8,999 | 74% |
| 16251 | Canon CRG 331 M Laser Toner Cartridge (B00YBIM1F4) | Amazon | ₹996 | ₹6,889 | 86% |

- Slugs:
  - `/crackles-unicorn-princess-fancy-puzzle-erasers-15-count-b09p6gscm7`
  - `/decorative-floor-lamp-for-living-room-orange-smoky-yellow-small-b0ghsws1b9`
  - `/lifelong-cool-mist-ultrasonic-humidifier-5-5l-top-fill-b0h4z34v8t`
  - `/canon-crg-331-m-laser-toner-cartridge-b00ybim1f4`
- Affiliate links: Amazon `/dp/<ASIN>?tag=ashoksachdev-21`.
- Images: `m.media-amazon.com/images/I/<id>` (`81IuGU8Y0IL`, `716K7IrhviL`, `71tzE8ypkSL`, `41Mfeykug9L`).
- #16251 PDP stock read "Only 2 left"; description tells buyers to check their printer model.
- Bulk API result: HTTP 201, `count:4`, all `created:true`. DB re-read: LIVE, price and image set.

## Price sync (dup LIVE rows, Amazon PDP read)

| # | Item | DB before | Live now | MRP | Off |
|---|---|---|---|---|---|
| 2168 | UHUD Crafts Wooden Foldable Side Table (B0927T6DS6) | ₹299 | ₹299 | ₹1,599 | 81% |

- PDP confirmed ₹299 (card showed ₹292). priceHistory row written (previous PH ₹315 on 07-22), discountPct set to 81, title tail rewritten so title, visible copy and schema agree.

Unchanged dup rows:
- Storio Monkeyball (B08D8HDD3W): same price, ₹197.
- Dell B0H9SV5VKG: ₹74,240 card price is a bank offer. Skipped.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| Sennheiser HD 599 (B01L1IICR2) | ₹7,641 | ₹8,490 | Price drift |
| Smart 1091 Play and Practice Shapes (B00B1PEQ1M) | ₹72 | null | No price on PDP, no add-to-cart |
| MAMMA LOVE wipes, Blinkit (31c0e0011476) | ₹299 | — | Location-locked quick-commerce |

Logged to `data/dd-rejected.json`, which now holds 1,808 keys.

## Freshness

- `indexnow-ping.mjs` was run with the 5 slugs (#16248-#16251, #2168), and the script added the 3 hubs. Result: **HTTP 200 for 8 URLs**.
- sitemap.xml is ISR with a 1800s revalidate. llms.txt is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 |
| DB LIVE vs API total | 15,685 = 15,685 |
| Max deal id vs broadcast cursor | 16,251 vs 16,247 (lag of 4, external broadcast cron draining the new rows) |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 |
| Posts | 476. 0 coverless, 0 without SEO fields. |
| Posts per IST day | 11-10: 3, 11-09: 3, 11-07: 3, 11-06: 3, 11-05: 3, 11-04: 2, 11-03: 4 (11-08: 0, 11-02: 0, 11-01: 1 — missed) |
| Session crons | 9/9 at last CronList check (sitemon 11-10e) |
| Unpushed commits | 0 (before this report) |

## Still open

- Blog misses: 11-08 had 0 posts, 11-02 had 0, 11-01 had 1.
- Same-price dup confirmations write no PH row in the desidime, TG and IFS dup-sync paths (SEO-AUDIT-FIX candidate).
- TG groups Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba not checked.
- TG 11-04l backlog: Vyom, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D. TIED RIBBONS toran.
- Price drift: #11896 Flipkart ₹664 vs DB ₹899, 16 bare Flipkart links, 96 drift rows.
- The DO API token still needs rotating (owner action).

Closed this tick:
- Lifelong humidifier (B0H4Z34V8T), unresolved last tick, now pushed as #16250.
- UHUD #2168 price confirmed at ₹299 with a PH row.
