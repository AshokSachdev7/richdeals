# DesiDime ingest — 2026-11-10a (01:03 IST)

**Result: 1 pushed LIVE (#16231), 3 dup LIVE rows price-synced with priceHistory and titles re-priced, 9 rejected, IndexNow HTTP 200 (7 URLs).**

## Stage 1

- `ingest-desidime.mjs` gave 10 candidates (cards only, JUNK/GROCERY filters, visit.desidime.com resolved).
- 5 more were dropped as seen within the last 24h: Atomberg, Mivi, Whirlpool, Klook, Dell.

## Pushed

| # | Item | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 16231 | Prodealnet stainless steel chapati roller pin (belan) | Flipkart | ₹198 | ₹799 | 75% |

- Slug: `/prodealnet-stainless-steel-chapati-roller-pin-belan-rpbg4mrwgxqd6gz5`
- Affiliate link: `/p/itm196df7a77784f?pid=RPBG4MRWGXQD6GZ5&affid=djhackraj`
- Bulk API result: `count:1, created:true`.

## Price sync (dup LIVE rows, Amazon PDP read)

| # | Item | DB before | Live now | MRP | Off |
|---|---|---|---|---|---|
| 7022 | SNAPPSY Kaidiwei wired mouse | ₹230 | ₹108 | ₹507 | 79% |
| 9916 | Dell 15 Core Ultra 5 225U 16/512 | ₹78,990 | ₹79,990 | ₹1,11,971 | 29% |
| 15258 | DJI Osmo Pocket 3 | ₹33,990 | ₹35,990 | ₹59,990 | 40% |

- Each row got a priceHistory entry.
- Each title's hand-typed `at ₹X (N% Off)` was rewritten to match the new price, so the title, the visible copy and the schema agree.
- DesiDime's card prices for the Dell (₹74,240) and the DJI (₹33,240) were bank-offer prices, so they were not used.

Unchanged dup rows:
- B0C5WY846P #16226: ₹79 on both the card and the DB.
- B0CRL6SXTQ #12508: ₹69, same.
- B0DTPZHD9D #16228: ₹3,366, same.
- B0FZK9K5BN #3594: DB ₹119 vs card ₹120, within tolerance.
- B0CJLY8XS3 #1411: the row is EXPIRED, so it was skipped.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| MyFitFuel pea protein B07S8KQYVY | ₹391 | ₹769 | drift |
| Ninos Dreams pajama B0GRVTZJ4J | ₹126 | ₹511 | drift |
| LuvLap 3-pack B0GSGTLDHH | ₹281 | ₹599 | drift |
| Jack Royal RC buggy B0DWT8QDTH | ₹545 | — | no price, no add-to-cart |
| Livpure mattress B0BG324SM9 | ₹6,899 | ₹7,899 | drift |
| BSB HOME sherpa blanket B09PHNHZNV | ₹859 | ₹999 | drift |
| Dinosaur launcher B0HQZDGH9L | ₹15 | — | no price, no add-to-cart |
| iQOO 15R B0HCB97YK5 | ₹46,550 | ₹53,999 | drift (bank-offer card price) |
| Tribe Kombucha B0GZL83JQ8 | ₹308 | — | GROCERY |

All 9 were logged to `data/dd-rejected.json`, which now holds 1,798 keys.

## Freshness

- `indexnow-ping.mjs` was run with the 4 slugs (the belan plus the 3 synced rows), and the script added the 3 hubs. Result: **HTTP 200 for 7 URLs**.
- sitemap.xml is ISR with a 1800s revalidate. llms.txt is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 |
| DB LIVE vs API total | 15,665 = 15,665 |
| Max deal id vs broadcast cursor | DB max 16,231, cursor 16,230. The external cron picks up #16231 on its next run. |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 |
| Posts | 476. 0 coverless, 0 without SEO fields. |
| Posts per IST day | 11-10: 3, 11-09: 3 (11-08: 0, 11-02: 0, 11-01: 1 — missed) |
| Session crons | 9/9 present |
| Unpushed commits | 0 |

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
