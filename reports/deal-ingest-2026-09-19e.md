# DEAL-INGEST indiafreestuff tick — 2026-09-19e (IST)

Yield: **5 deals pushed LIVE** (#10625-#10629), IndexNow **HTTP 200 for 8 URLs**. First
non-zero indiafreestuff tick today after four consecutive all-reject sweeps.

Funnel: 50 discovered → 46 resolved to a product → 18 fresh after dedup → **5 survived price
verification**. 13 of 18 verified candidates were rejected, 10 of those on price drift alone.

## Discovery

RSS is still dead — Feedburner returned `000` on both attempts (rot #17, reconfirmed) and the
homepage yields 0 deal cards, so discovery ran off the two listing pages that do work:

```
https://indiafreestuff.in/deals
https://indiafreestuff.in/deals/superdeals
node apps/api/scripts/ingest-ifs-proper.mjs ./_ifs-0919e.json
DONE: 50 discovered, 46 resolved to a product
```

`GAP = 2600 ms` between their requests, above the 2.5 s floor. No 403 or 429, so the
back-off path never armed.

**Three drops at resolve time, all the same failure** — the `?rto=` redirect lands on a
tracking page rather than a product: a Flipkart early-bird store page, Flipkart
`/dl/indiafreestuff/p/indiafreestuff`, and the JioMart homepage. That is rot #3 with three
fresh samples. All 46 survivors resolved to Amazon `/dp/` URLs, so the non-Amazon
`verifyFromHtml()` path did no work this tick.

## Dedup — all statuses, not just LIVE

Prisma against the live DB on `productId`, with a `ZZZZFAKE123` control in the same `in`
query (control came back `ABSENT`, so the lookup was not silently matching).

**46 candidates → 28 duplicates, 18 fresh.**

The cross-status part earned its keep: `B07S4S69T3` came back as **#10056 EXPIRED**. A
LIVE-only dedup would have re-published a deal we had already retired.

**Two duplicates carry serious price drift against our stored row — fresh rot #22 evidence:**

| ASIN | Our row | Stored ₹ | Source now ₹ |
|---|---|---|---|
| B07K7CFTDJ | #10582 | 699 | 449 |
| B0FP2P6D5D | #10084 | 1520 | 687 |

Both pages are serving a price that is wrong by more than a third. Not fixed this tick —
fixing them properly means rewriting the copy too, not just the `price` column, which is
open owner decision #6.

## Verification — 18 fresh ASINs, one batched call

Logged-in Playwright tab, same-origin `fetch(url, {credentials:'include'})` + `DOMParser`,
900 ms apart. Buybox signals only: `.priceToPay .a-price-whole`, `#add-to-cart-button`,
`.basisPrice .a-offscreen`, `.savingsPercentage`. No `.a-price .a-offscreen` sibling was ever
taken as the price — that is the recommendation-strip trap.

### Accepted — 5

| ASIN | Product | Posted ₹ | Verified ₹ | MRP | Off |
|---|---|---|---|---|---|
| B0H9YFBRCP | Polycab Wizzy Prime 1200mm BLDC fan | 3599 | **3599** | 7399 | 51% |
| B07KG6SXTR | Puma Nrgy Neko women's shoes | 1928 | **1927** | 6499 | 70% |
| B0BHJC9PJM | Herbigiri herbal intimate wash ×4 | 266 | **266** | 840 | 68% |
| B0C5914FWM | Transparent wind-resistant umbrella | 284 | **284** | 1099 | 74% |
| B0G1YQDZFN | Door draft stopper PVC 36in ×4 | 162 | **162** | 884 | 82% |

The Puma is a ₹1 difference — inside the ±₹1 tolerance, published at the **verified** ₹1,927,
not at the posted ₹1,928. On the draft stopper the source claimed a ₹439 MRP and the PDP says
₹884; the PDP value was used, because the MRP feeds the discount we print.

All five were re-read immediately before the push and none had moved.

### Rejected — 13

| ASIN | Product | Posted ₹ | Verified ₹ | Reason |
|---|---|---|---|---|
| B0HJB3GZ2C | iPhone 18 Pro 512GB | 189900 | 189900 | **0% discount** — mrp == price, no `.savingsPercentage` |
| B0B94RNTXP | Bata Women LILLE TR heels | 387 | — | out of stock, no cart button |
| B0DDXJ146Q | 17th birthday decor combo | 91 | — | out of stock, no cart button |
| B07FPXXY5R | Pigeon gas lighter | 91 | 95 | drift ₹4 |
| B01L941NWY | Natureland coriander powder | 42 | 47 | drift ₹5 |
| B0HF82ZLCQ | Cute octopus plush | 379 | 399 | drift ₹20 |
| B0DVLVLKCJ | Lavie Clover slingbag | 674 | 749 | drift ₹75 |
| B09C66H35H | Viva silicone swim cap | 71 | 210 | drift ₹139 + variant mismatch (posted Blue, PDP Red) |
| B09NQ5ZV2K | Whitedot cricket helmet cover | 183 | 449 | drift ₹266 |
| B0FKH82DB4 | Qube by Fort Collins jacket | 585 | 1199 | drift ₹614 |
| B0BT7R9SG9 | Pepe Jeans boys jeans | 596 | 1399 | drift ₹803 |
| B0DPKTSBHX | High Star oversized coat | 620 | 2276 | drift ₹1656 |
| B0GGSVY9WQ | U.S. Polo Assn. Zira sneakers | 1452 | 3209 | drift ₹1757 |

**10 of 18 rejected on drift.** Rot #2 is not an occasional wart, it is the dominant outcome
of this pipeline — the source's listed price is wrong more often than it is right.

The iPhone is the live instance of open owner decision #9: an exact-price match with **zero**
discount. It verified perfectly and was still rejected, because a deal page that says "₹189,900
(0% off)" is a product listing, not a deal.

The Bata heel is the same ASIN the 09-19i Telegram tick rejected an hour ago — two independent
pipelines spent a verification each on one dead listing. That is exactly the cost rot #19
describes.

## Pushed

`POST /admin/deals/bulk` → **HTTP 201, count 5**, all `created: true`, all `status: LIVE`.

```
10625  ₹3599  -51%  polycab-wizzy-prime-1200mm-bldc-ceiling-fan-with-remote-b0h9yfbrcp
10626  ₹1927  -70%  puma-nrgy-neko-engineer-women-s-sport-shoes-b07kg6sxtr
10627  ₹266   -68%  herbigiri-herbal-intimate-wash-100-ml-x-4-b0bhjc9pjm
10628  ₹284   -74%  transparent-wind-resistant-long-handle-umbrella-b0c5914fwm
10629  ₹162   -82%  door-draft-stopper-pvc-strip-36-inch-pack-of-4-b0g1yqdzfn
```

Titles and descriptions were written for this batch — not the source's copy and not Amazon's
bullet text. Descriptions run 436-739 characters, comfortably past the 200-char arm of
`dealIndexable`, and every one clears the 20% discount arm as well, so all five enter the
sitemap rather than the thin-content pile.

Images come from `m.media-amazon.com` via `data-a-dynamic-image`, never from
`images.indiafreestuff.in`. The sweep returns `._SX679_`/`._SY695_` thumbnails, so each was
upgraded to `._SL1500_` — **and the upgraded URLs were fetched to prove they exist** rather
than assumed, because a rewritten size modifier is a silent 404 waiting to happen:

```
200  40749 B  51+p95d2f-L._SL1500_.jpg
200 112699 B  71DkyqpT6yL._SL1500_.jpg
200  60152 B  51wkd2fm+eL._SL1500_.jpg
200  39686 B  51uGFYGOt2L._SL1500_.jpg
200  94091 B  61w8uRfA-wL._SL1500_.jpg
```

Affiliate URLs are the clean `https://www.amazon.in/dp/<ASIN>?tag=ashoksachdev-21` form —
their `dealhind-21` tag stripped, and the `th=1&psc=1` noise the candidate rows carry dropped
too.

## Freshness — IndexNow

```
node apps/api/scripts/indexnow-ping.mjs <5 slugs>
DONE: IndexNow -> HTTP 200 for 8 urls
```

**HTTP 200**, first call, no 422 so the Bing GET fallback was not needed. 8 URLs = the 5 deal
pages plus `/`, `/offers` and `/sitemap.xml`, which the script now adds by default (the rot #12
fix from the INDEXNOW tick doing its job unprompted).

Both ends verified on prod rather than trusted:

```
200 0.192  /polycab-wizzy-prime-1200mm-bldc-ceiling-fan-with-remote-b0h9yfbrcp
200 0.236  /door-draft-stopper-pvc-strip-36-inch-pack-of-4-b0g1yqdzfn
```

The pages serve, so the submitted URLs are real. `sitemap.xml` is ISR at `revalidate = 1800`,
so worst case it carries the batch within 30 minutes; `llms.txt` is `force-dynamic` and
already does.

## Prod endpoints — all 200

```
200 0.372841  /
200 0.125406  /offers
200 0.493272  /blog
200 0.296768  /sitemap.xml
200 0.165115  /feed.xml
200 0.163957  /api/deals
200 0.463447  /llms.txt
```

## CEO audit (verified against the DB)

| Check | Result |
|---|---|
| Deals | LIVE **10283** (was 10278) · PENDING_REVIEW 0 · EXPIRED 258 |
| LIVE null price / null image | **0 / 0** — the 5 new rows kept it that way |
| DB max deal | 10629 LIVE, the draft stopper — matches the last push exactly |
| Posts/day IST (7d) | 09-19:2 · 09-18:3 · 09-17:3 · 09-16:3 · 09-15:3 · 09-14:4 · 09-13:4 |
| Today (IST) | 2 — inside the 2-3 target, under the cap of 4, no zero day in the window |
| Blog hygiene | published 315 · noCover 0 · noSeoTitle 0 · noSeoDesc 0 |
| tg-broadcast cursor | 10482 vs DB max 10629 — **drift now 147**, up from 142 (rot #4) |
| Unpushed commits before this tick | 0 |

PENDING_REVIEW is 0 by absence from `groupBy`, not by a zero row.

**The cursor drift grew by exactly this batch.** That is the honest reading: the 5 deals are
LIVE on the site and in the sitemap, and they will not reach the Telegram channel until the
tg-broadcast cron is running again. Rot #4 now has a direct cost attached to it rather than a
standing number.

## Rot standing — 28 items

Reconfirmed with fresh evidence this tick: **#2** (price drift, 10 of 18 — the hardest sample
yet), **#3** (3 tracking-landing resolves), **#4** (cursor drift 142 → 147, and this batch is
why), **#11** (two more scratch files created under `apps/api/`, both deleted at tick end),
**#17** (Feedburner RSS `000` again), **#19** (13 verifications spent on candidates a reject
cache would have skipped, one of them a duplicate of the Telegram tick's own reject), **#22**
(two LIVE rows with stale prices, #10582 and #10084).

**Nothing new rotted.** One wart worth writing down before it becomes rot: on some PDPs the
`#availability` text comes back polluted with inline script content
(`P.when("A","load").execute(...)`, `In stock {"isInternal":false,…`). The `#add-to-cart-button`
boolean agreed with reality in every case so no verdict was affected, but the extractor needs a
script-node strip before it is baked into `ingest-common.mjs`.

## Open owner decisions — unchanged at 10

**#7 — persist a reject cache (rot #19)** stays top of the list, and this tick is its best
argument: 13 of 18 verifications were spent on candidates that fail every time, and one of
them was rejected an hour earlier by a different pipeline.

**#9 is now a settled precedent in practice** — the iPhone 18 Pro was rejected at 0% discount
without asking. Ratifying it would make that a rule rather than a judgement call.
