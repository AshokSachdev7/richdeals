# DesiDime ingest — 2026-11-10e (10:55 IST)

**Result: 10 pushed LIVE (#16238-#16247), 0 dup rows price-synced, 2 rejected, IndexNow HTTP 200 (13 URLs).**

## Stage 1

- `ingest-desidime.mjs` discovered 37 cards and resolved 26 (cards only, JUNK/GROCERY filters, visit.desidime.com resolved).
- 5 were already in the DB, 9 were dropped as rejected within the last 24h, which left 12 fresh candidates (all Amazon).
- Skipped as rejected within 24h: Jiomart 99% off, Atomberg FK, Mivi FK, Whirlpool FK, Klook, Wingreens JioMart, iQOO, MyFitFuel, Dell store.

## Pushed

| # | Item | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 16238 | Mahaware Anti-Slip Plastic Stool, Grey (B0DM2BRBQF) | Amazon | ₹227 | ₹799 | 72% |
| 16239 | Geonix Nimbus 03 Optical Wireless Mouse (B0G3RG1XM2) | Amazon | ₹199 | ₹849 | 77% |
| 16240 | Milton Artis Mixer Grinder 800W, 3 Jars, ISI (B0FD42TPGW) | Amazon | ₹2,720 | ₹6,599 | 59% |
| 16241 | Treo by Milton Glass Tiffin with Bag, Set of 8 (B0BJLBYDFR) | Amazon | ₹924 | — | — |
| 16242 | Crompton DS 500 BLKX 500W Mixer Grinder (B0C7LKSPKY) | Amazon | ₹1,699 | ₹3,500 | 51% |
| 16243 | MILTON Steely Prime Insulated Tiffin 400ml (B09YDC1NXV) | Amazon | ₹299 | ₹925 | 68% |
| 16244 | Boldfit Fabric Resistance Loop Hip Band (B0GRH46436) | Amazon | ₹203 | ₹599 | 66% |
| 16245 | Bombay Shaving Company Charcoal Peel Off Mask (B082L5MBDV) | Amazon | ₹211 | — | — |
| 16246 | Lakmé Skin Stylist Lumi + CC Kit, 60g + 30g (B0H264JF8Q) | Amazon | ₹422 | ₹469 | 10% |
| 16247 | Samsung 24-inch FHD 75Hz 1800R Curved Monitor (B0C4YMKNNZ) | Amazon | ₹3,735 | ₹16,500 | 77% |

- Slugs:
  - `/mahaware-anti-slip-plastic-stool-grey-b0dm2brbqf`
  - `/geonix-nimbus-03-optical-wireless-mouse-b0g3rg1xm2`
  - `/milton-artis-mixer-grinder-800w-3-jars-isi-certified-b0fd42tpgw`
  - `/treo-by-milton-all-fresh-premier-glass-tiffin-with-bag-set-of-8-b0bjlbydfr`
  - `/crompton-ds-500-blkx-500w-mixer-grinder-b0c7lkspky`
  - `/milton-steely-prime-insulated-tiffin-400ml-b09ydc1nxv`
  - `/boldfit-fabric-resistance-loop-hip-band-b0grh46436`
  - `/bombay-shaving-company-activated-charcoal-peel-off-mask-b082l5mbdv`
  - `/lakm-skin-stylist-lumi-cc-kit-60g-30g-b0h264jf8q`
  - `/samsung-24-inch-fhd-75hz-1800r-curved-monitor-b0c4ymknnz`
- Affiliate links: Amazon `/dp/<ASIN>?tag=ashoksachdev-21`.
- Images: `m.media-amazon.com/images/I/<id>` (`712pgtudY5L`, `619lM3yeoOL`, `619AfQocatL`, `81zWQC4Bs+L`, `615RCJGmqOL`, `61IByLfSdeL`, `71LlydcmZTL`, `71ncBwFZ-fL`, `51ekIT9wtML`, `710PDXvxeKL`).
- MRP nulled on #16241 and #16245 (PDP strike price was per-unit). #16246 MRP set from the PDP (₹469), not the card's ₹1,134.
- Bulk API result: HTTP 201, `count:10`, all `created:true`. DB re-read: LIVE, price and image set.

## Price sync (dup LIVE rows, Amazon PDP read)

None changed.

Unchanged dup rows:
- Borosil #16228: same price, ₹3,366.
- DJI #15258: PDP ₹35,990 against a card price of ₹33,240 (bank offer). Skipped.
- 3 other dup rows: same price.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| LuvLap Diaper Pants M 72 (B09MVW27M6) | ₹453 | ₹504 | Price drift |
| Cello Petal Bathroom Set (B0CR79RSND) | — | null | No price on PDP, no add-to-cart |

Logged to `data/dd-rejected.json`, which now holds 1,802 keys.

## Freshness

- `indexnow-ping.mjs` was run with the 10 slugs, and the script added the 3 hubs. Result: **HTTP 200 for 13 URLs**.
- sitemap.xml is ISR with a 1800s revalidate. llms.txt is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 |
| DB LIVE vs API total | 15,681 = 15,681 |
| Max deal id vs broadcast cursor | 16,247 vs 16,242 (lag of 5, external broadcast cron draining the new rows) |
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

Closed this tick: none.
