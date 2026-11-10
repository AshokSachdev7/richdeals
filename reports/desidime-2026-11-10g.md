# DesiDime ingest — 2026-11-10g (15:45 IST)

**Result: 9 pushed LIVE (#16252-#16260), 0 price syncs, 8 rejected, IndexNow HTTP 200 (12 URLs).**

## Stage 1

- `ingest-desidime.mjs` discovered 37 cards and resolved 22.
- 2 were already in the DB, 3 were skipped as rejected within the last 24h (Haier AC FK, Samsung fridge FK, Jiomart 99%).
- Dropped: Puma free cap (sjv.io), Bajaj card cashback.

## Pushed

| # | Item | Store | Price | MRP | Off |
|---|---|---|---|---|---|
| 16252 | Glide OWS Open Ear Wireless Earbuds (B0H5WMJQPJ) | Amazon | ₹799 | ₹4,999 | 84% |
| 16253 | Sounce 5-in-1 Cleaning Kit (B0GKQ3SPKW) | Amazon | ₹79 | ₹999 | 92% |
| 16254 | ALTON ALD345 Aerator, Pack of 10 (B0C4T96NNB) | Amazon | ₹99 | ₹250 | 60% |
| 16255 | Dubstep Bassline Karaoke Speaker (B0HBBGVCR5) | Amazon | ₹799 | ₹2,999 | 73% |
| 16256 | Btag 3D Tulip Night Light (B0DYDC5B9N) | Amazon | ₹229 | ₹1,349 | 83% |
| 16257 | Sounce HDMI to RCA Converter (B098DMMS3Z) | Amazon | ₹255 | ₹1,899 | 87% |
| 16258 | Quace 138 LED Curtain Lights (B07BM1KVW4) | Amazon | ₹279 | ₹1,500 | 81% |
| 16259 | Goldmedal Thor 30W B22 LED Bulb (B0CGR7BK6M) | Amazon | ₹821 | ₹2,400 | 66% |
| 16260 | Centuary Lotus 4" Double Mattress (B07CZKMKX9) | Amazon | ₹6,378 | ₹8,701 | 27% |

- Affiliate links: Amazon `/dp/<ASIN>?tag=ashoksachdev-21`.
- Images: `m.media-amazon.com/images/I/<id>` (`61f8jTn+ThL`, `61L0Z3xTeXL`, `619i3PypDOL`, `81XoVxDLudL`, `71SkOl8iXxL`, `61KbmNK2FDL`, `71WJoVPt1aL`, `617vixPTdML`, `91uscE52zWL`).
- #16260 PDP stock read "Only 1 left"; description says so.
- Bulk API result: HTTP 201, `count:9`. DB re-read: all LIVE, price and image set.

## Price sync

None. Dup rows unchanged: TOSAA (B0GQ489VNK) ₹127, Storio (B08D8HDD3W) ₹197.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| Coway (B0DZD4X7F1) | ₹6,790 | ₹6,999 | Price drift |
| Go24 (B0DRCT1MTK) | ₹229 | ₹239 | Price drift |
| NIPPO (B06ZZRP2LK) | — | null | No price, no add-to-cart |
| Jabra (B00IYF6C4Q) | ₹2,728 | ₹5,728 | Price drift |
| Pigeon iron (B0GT3ZQXWQ) | ₹623 | ₹899 | Price drift |
| Flipkart 298d64656ad6 | ₹1 | — | ₹1 promo |
| Klook | — | — | Sale page |
| Dell store | — | — | Sitewide offer |

Logged to `data/dd-rejected.json`, which now holds 1,814 keys.

## Freshness

- `indexnow-ping.mjs` was run with the 9 slugs, and the script added the 3 hubs. Result: **HTTP 200 for 12 URLs**.

## CEO audit

| Check | Result |
|---|---|
| Prod `/` `/offers` `/blog` `/sitemap.xml` `/feed.xml` `/llms.txt` `/api/deals` | 7/7 return 200 |
| DB LIVE vs API total | 15,694 = 15,694 |
| Max deal id vs broadcast cursor | 16,260 = 16,260 |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 |
| Posts | 476. 0 coverless, 0 without SEO fields. |
| Posts per IST day | 11-10: 3, 11-09: 3, 11-07: 3, 11-06: 3, 11-05: 3, 11-04: 2, 11-03: 4 (11-08: 0, 11-02: 0, 11-01: 1 — missed) |
| Session crons | 9/9 |
| Unpushed commits | 0 (before this report) |

## Still open

- Blog misses: 11-08 had 0 posts, 11-02 had 0, 11-01 had 1.
- Same-price dup confirmations write no PH row in the desidime, TG and IFS dup-sync paths (SEO-AUDIT-FIX candidate).
- TG groups Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba not checked.
- TG 11-04l backlog: Vyom, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D. TIED RIBBONS toran.
- Price drift: #11896 Flipkart ₹664 vs DB ₹899, 16 bare Flipkart links, 96 drift rows.
- The DO API token still needs rotating (owner action).
