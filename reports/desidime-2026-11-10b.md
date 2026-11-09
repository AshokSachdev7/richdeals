# DesiDime ingest — 2026-11-10b (02:47 IST)

**Result: 2 pushed LIVE (#16232, #16233), 0 dup rows price-synced (6 dup rows unchanged), 0 new rejects, IndexNow HTTP 200 (5 URLs).**

## Stage 1

- `ingest-desidime.mjs` discovered 35 cards and resolved 26 (cards only, JUNK/GROCERY filters, visit.desidime.com resolved).
- 9 were already in the DB, 15 were dropped as rejected within the last 24h (same set as 10a), which left 2 fresh candidates.

## Pushed

| # | Item | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 16232 | Storio Monkeyball drop tower baby toy with 3 rattle balls (B08D8HDD3W) | Amazon | ₹197 | ₹599 | 67% |
| 16233 | H&M Store 12-inch serrated bread & cake knife, pack of 2 (KHKGFJTBXS8ZEBGG) | Flipkart | ₹176 | — | — |

- Slugs:
  - `/storio-monkeyball-drop-tower-baby-toy-with-3-rattle-balls-b08d8hdd3w`
  - `/h-m-store-12-inch-serrated-bread-cake-knife-pack-of-2-khkgfjtbxs8zebgg`
- Affiliate links:
  - Amazon `/dp/B08D8HDD3W?th=1&psc=1&tag=ashoksachdev-21`
  - Flipkart `/p/itm744fba64938c0?pid=KHKGFJTBXS8ZEBGG&affid=djhackraj`
- Images: Amazon `m.media-amazon.com/images/I/71JJC5yV-UL.jpg`, Flipkart `rukmini1.flixcart.com` CDN.
- Bulk API result: `count:2`, both `created:true`. DB re-read: both LIVE, price and image set.

## Price sync (dup LIVE rows, Amazon PDP read)

None needed this tick.

Unchanged dup rows:
- FRONTECH HDMI B0CRL6SXTQ #12508: ₹69 on both the card and the DB.
- Sounce Cat6 10m B0BPMB2ND2 #16227: ₹169, same.
- Sounce mouse pad B0C5WY846P #16226: ₹79, same.
- Borosil B0DTPZHD9D #16228: ₹3,366, same.
- Dell B0H9SV5VKG #9916: card ₹74,240 is a bank-offer price; DB ₹79,990 (synced in 10a). Skipped.
- DJI Osmo Pocket 3 B0CG19QXWD #15258: card ₹33,240 is a bank-offer price; DB ₹35,990 (synced in 10a). Skipped.

## Rejected

No new rejects. The 15 cards rejected within the last 24h were skipped, so `data/dd-rejected.json` is unchanged.

## Freshness

- `indexnow-ping.mjs` was run with the 2 slugs, and the script added the 3 hubs. Result: **HTTP 200 for 5 URLs**.
- sitemap.xml is ISR with a 1800s revalidate. llms.txt is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 |
| DB LIVE vs API total | 15,667 = 15,667 |
| Max deal id vs broadcast cursor | DB max 16,233, cursor 16,231. The external cron picks up #16232-16233 on its next run. |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 |
| Posts | 476. 0 coverless, 0 without SEO fields. |
| Posts per IST day | 11-10: 3, 11-09: 3, 11-07: 3, 11-06: 3, 11-05: 3, 11-04: 2, 11-03: 4 (11-08: 0, 11-02: 0, 11-01: 1 — missed) |
| Session crons | 9/9 present |
| Unpushed commits | 0 (before this report) |

## Still open

- Blog misses: 11-08 had 0 posts, 11-02 had 0, 11-01 had 1.
- The IFS dup-row price-sync does not write priceHistory.
- TG 11-04l backlog still unchecked: Vyom, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- TG items still pending: MILTON tiffin, TIED RIBBONS toran, Sounce mouse pad.
- Price drift:
  - #11896: Flipkart ₹664 vs DB ₹899.
  - 16 bare Flipkart links.
  - 96 drift rows.
- The SCHEMA 11-08 report was never written. That run passed 31/31.
- The DO API token still needs rotating (owner action).
