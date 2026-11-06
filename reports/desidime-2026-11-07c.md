# DESIDIME-INGEST tick 2026-11-07c (IST ~04:54)

**Result: 1 deal pushed LIVE (#16217 Wonderchef Rosa whiskey tumbler set of 6, ₹399). BULK 201 count 1, created:true. 4 PriceHistory rows backfilled (#1920, #3594, #4817, #9473), which closes the SCHEMA-AUDIT 11-07 PRIORITY stale-Offer finding: prod Offer now reads ₹119 / ₹807, priceValidUntil 2026-11-20. 1 reject. IndexNow HTTP 200 (8 urls). New page serves 200 on prod.**

Stage 1 (`ingest-desidime.mjs`, cards only, JUNK/GROCERY filters, visit.desidime.com resolve): 37 discovered, 15 junk or other-store, 21 resolved, 3 already in DB, 16 rejected within the last 24h, 2 fresh. Amazon prices read on the PDP in the logged-in tab; non-Amazon via `productLd()`.

## Pushed

| id | ASIN | Deal | Price | Source card |
|---|---|---|---|---|
| 16217 | B0BNNQMY5Q | Wonderchef Rosa Whiskey Tumbler 320ml (Set of 6) | ₹399 | ₹399 |

Slug: `wonderchef-rosa-whiskey-tumbler-320ml-set-of-6-b0bnnqmy5q`. Image: m.media-amazon.com `61lZmOPdLLL`. Affiliate: `/dp/B0BNNQMY5Q?tag=ashoksachdev-21`. MRP null. Dedup by productId before push.

## PriceHistory backfill

PDP reads matched the DB price on all 4, so no `deal.price` change was needed. Only the missing PriceHistory row was added.

| Deal | PH id | Price |
|---|---|---|
| #1920 Samsung 55" Mini LED | 16174 | ₹45,965 |
| #3594 STRIDERS lunch box | 16175 | ₹119 |
| #4817 Philips HP8120 dryer | 16176 | ₹807 |
| #9473 ANT Flora scale | 16177 | ₹278 |

Prod re-check: #3594 Offer = 119 and #4817 Offer = 807, both with priceValidUntil 2026-11-20.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| HMD Vibe 2 5G (Flipkart MOBHNS6YEGVY7BH6) | ₹10,773 | ₹13,499 | drift |

Written to `dd-rejected.json` with `Date.now()`.

## Freshness

- `indexnow-ping.mjs` for the pushed slug + 3 backfilled slugs + hub paths → "DONE: IndexNow -> HTTP 200 for 8 urls".
- sitemap.xml ISR 1800s; llms.txt force-dynamic. No new static route.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (/, /offers, /blog, sitemap, feed, /api/deals, llms.txt) | 7/7 200 + new deal 200 | OK |
| DB LIVE | 15,651 (+1) | OK |
| PENDING_REVIEW | 0 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| Max deal id | 16,217 (cursor 16,216; external broadcast cron draining) | OK |
| Posts total / coverless / seo-less | 470 / 0 / 0 | OK |
| Posts per IST day | 10-29:4 10-30:4 10-31:4 11-01:1 11-03:4 11-04:2 11-05:3 11-06:3 11-07:3 | OK (11-02 = 0, historical; none over cap 4) |
| Unpushed commits | 0 (before this report) | OK |
| Crons (CronList vs roster) | 9/9: TG :37, IFS 2h :23, DESIDIME 2h :13, CONTENT-SEO 6h :09, INDEXNOW 6h :53, SCHEMA-AUDIT 04:09, SITEMON :47, AI-OVERVIEW Wed 11:09, SEO-AUDIT-FIX 05:28 | OK, none recreated |

## Still open

- **Code fix:** the IFS and DesiDime dup-row price-sync paths must insert `priceHistory {dealId, price, postedAt}` next to `deal.update`. Otherwise the stale-Offer finding comes back with every sync. Not done this tick.
- TG 11-04l: B0GXB76VRW duplicates #4983 (LIVE ₹29,750; channel ₹25,175 is post-coupon + HDFC). Unchecked: Vyom ×2 / ×3, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- #11896: Flipkart ₹664 vs DB ₹899. 16 bare Flipkart links. 96 drift rows. Single deals to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- Reticle MCP: CONNECTION_CLOSED. DO token rotation is the owner's job.
