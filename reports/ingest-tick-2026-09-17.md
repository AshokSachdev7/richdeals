# DEAL-INGEST indiafreestuff tick — 2026-09-17

- Discovery: /category/shopping-sites/amazon (22 cards) + /flipkart (24 cards). Homepage gave 0 cards because its markup differs from the category pages. 37 unique cards after the junk filter, 2.6s gap between requests.
- Resolve ?rto=: 15 single products (all Amazon). 22 dropped: search/category/store pages and Flipkart `/indiafreestuff/p/` tracking landings.
- Dedup against live DB: 9 already listed, 6 fresh.
- Verify on the Amazon PDP (live price, stock, CDN image): 4 ok. Dropped 1 with no live price (B00Q31WLQG). Dropped 1 whose listed price no longer holds (B06WRQQXF5, ₹158 listed vs ₹197 live).
- Pushed LIVE at the live PDP price: 4/4 (HTTP 201).
  - park-avenue-harmony-eau-de-parfum-men-100ml-b07845cn2k (₹289)
  - nivea-men-all-in-1-charcoal-face-wash-b00lc2vb7q (₹157)
  - nivea-aloe-hydration-body-lotion-200ml-b079qdjcld (₹178)
  - dr-morepen-st01-deluxe-stethoscope-b00c0nu028 (₹225)
- IndexNow: HTTP 200. All 4 slugs return 200 from the API.
- Fixed `_push-ifs-0917.mjs`: slugs now use the full ASIN (was a 6-char stub), and input/output paths are now args.

## Tick (04:5x IST)
- Discovery: /category/shopping-sites/amazon (22) + flipkart (24) + myntra (12) + ajio (0 cards). 47 unique after junk filter, 2.6s gap.
- Resolve ?rto=: 15 single products (all Amazon, same set as last tick); Flipkart/Myntra cards were search/store/tracking landings.
- Dedup vs live DB: 13 already in DB, 2 fresh.
- Verify: 0/2 — B00Q31WLQG no price on PDP; B06WRQQXF5 listed ₹158 vs live ₹197 (drift).
- Pushed: 0. IndexNow: not run (no new slugs).
- Note: IFS category pages unchanged since 02:5x sweep — source has not posted new deals overnight.

## Tick (06:5x IST)
- Discovery: /category/shopping-sites/amazon (22) + flipkart (24) + myntra (12) + homepage (0). 47 unique after junk filter, 2.6s gap.
- Resolve ?rto=: 15 single products (all Amazon), identical set to the 02:5x and 04:5x sweeps.
- Dedup vs live DB: 13 in DB, 2 fresh.
- Verify: 0/2, unchanged — B00Q31WLQG still has no buy-box price; B06WRQQXF5 listed ₹158 vs live ₹197.
- Pushed: 0. IndexNow: not run.
- IFS has posted nothing new since ~02:5x (3 sweeps). Telegram groups are the only moving source this morning.
- CEO audit (06:48): prod 7/7 200, live 9998, pending 0, null 0, posts 09-17: 2, cursor = DB max 10343, 0 unpushed.

## 08:5x IST tick
- Discovery: /category/shopping-sites/amazon + flipkart + myntra. 47 cards, 15 resolved single-product, 2.6s gap.
- All 15 identical to the previous sweep (_ifs-0917d): already live or previously rejected (B00Q31WLQG no price, B06WRQQXF5 price drift). Source unchanged since ~02:50.
- Pushed 0 → no IndexNow ping.
- AUDIT: DB max id 10343 flat since ~03:00; DesiDime has no Task Scheduler job (awaiting owner OK to register).

## 10:5x IST tick
- Discover: amazon/flipkart/myntra category pages → 47 cards, 15 resolved.
- Diff vs `_ifs-0917d.json` by productId: 0 new. Pushed 0. No IndexNow ping (nothing shipped).
- Audit flags: DB max id 10343 flat ~8h (TG quiet/rejects, IFS static since ~02:50). DesiDime Task Scheduler job missing — awaiting owner OK to register `7,37`.

## 12:5x IST tick
- Discover: amazon/flipkart/myntra category pages + homepage → 47 cards, 15 resolved single-product (2.6s gap).
- Diff vs `_ifs-0917d.json` by productId: 0 new — IFS still static since ~02:50. Pushed 0, no IndexNow ping.
- Audit: see terminal line.
- Audit: live 10000, pending 0, null price/image 0, posts 09-15/16/17 = 3/3/3, broadcast cursor 10345 = DB max, 0 unpushed. DesiDime Task Scheduler job still missing (awaiting owner OK).

## 14:5x IST tick
- Discover: amazon/flipkart/myntra category pages + homepage → 47 cards, 15 resolved single-product (2.6s gap).
- Diff vs `_ifs-0917d.json`: 0 new — IFS static since ~02:50 (6th sweep). Pushed 0, no IndexNow ping.
- Audit: prod 7/7 200, live 10003, pending 0, null 0, posts 3/3/3, cursor 10348 = DB max, 0 unpushed. DesiDime job still awaiting owner OK.

## 16:5x IST tick
- Discover: homepage + amazon/flipkart/myntra category pages → 47 cards, 15 resolved to single products (2.6s gap).
- Diff vs `_ifs-0917d.json`: 0 new. IFS has not changed since about 02:50 (7th straight empty sweep). Pushed 0, so no IndexNow ping.
- Audit: prod 7/7 200, live 10,005, pending 0, null 0, posts 3/3/3, 0 unpushed. Connection-slot exhaustion (see 16:4x TG tick) still awaits owner OK for the fix. DesiDime job still awaits owner OK.

## 18:5x IST tick
- IFS sweep (homepage + amazon/flipkart/myntra categories, ≥2.5s spacing): 47 cards, 15 resolved to single-product store URLs, 0 new vs baseline (8th static sweep since ~02:50). Myntra category/sale hubs dropped.
- Pushed 0 → no IndexNow ping needed.
- Audit 18:48: prod 7/7 200, live 10,009, pending 0, null 0, posts IST 3/3/3, unpushed 0; broadcast cursor 10352 vs max 10354 (push timing).
- Rot: IFS static ~16h (source stale, Telegram only moving feed). Open owner decisions: DesiDime Task Scheduler job; DB connection_limit / pool fix.

## 20:5x IST tick
- IFS sweep: 47 cards, 15 resolved single-product, 0 new vs baseline (static ~18h, 9 sweeps). Rest dropped (category/sale hubs).
- Pushed 0 → no IndexNow ping needed.
- Audit (20:48): prod 7/7 200, live 10,011, pending 0, null 0, posts IST 3/3/3, unpushed 0, broadcast cursor 10354 vs max 10356 (2 TG deals from 20:46, next 5-min run).

## 22:5x IST tick
- IFS sweep: 47 cards, 15 resolved single-product, 0 new vs baseline (static ~20h, 10 sweeps). Pushed 0 → no IndexNow ping.
- Audit (22:48): prod 7/7 200, live 10,013, pending 0, null 0, posts IST 3/3/3, unpushed 0, broadcast cursor 1 behind (Milton deal 22:46, next 5-min run).
