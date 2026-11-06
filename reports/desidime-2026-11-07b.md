# DESIDIME-INGEST tick 2026-11-07b (IST ~03:07)

**Result: 1 deal pushed LIVE (#16216 wall-mounted toothbrush holder ₹97). BULK 201 count 1, created:true. 2 duplicate LIVE rows price-synced in place (slug kept). IndexNow HTTP 200 (10 urls). New page serves 200 on prod.**

Stage 1 (`ingest-desidime.mjs`, cards only, JUNK/GROCERY filters, visit.desidime.com resolve): 37 discovered, 20 resolved, 3 already in DB, 11 rejected within the last 24h, 6 fresh. Amazon prices read on the PDP in the logged-in tab; non-Amazon via `productLd()`.

## Pushed

| id | ASIN | Deal | Price | Source card |
|---|---|---|---|---|
| 16216 | B0GXJRLJGQ | Wall-mounted toothbrush holder with 4 mouthwash cups | ₹97 | ₹97 |

Image: m.media-amazon.com `61XQMDqKZ9L`. Affiliate: `/dp/B0GXJRLJGQ?tag=ashoksachdev-21`. Dedup by productId before push.

## Price-synced (dup LIVE rows, `prisma.deal.update`, slug kept)

| id | Deal | Old → new | MRP | Card |
|---|---|---|---|---|
| 1920 | Samsung 55" Mini LED 4K B0GXV5313B | ₹47,490 → ₹45,965 (23%) | ₹59,990 | ₹36,265 (post-bank-offer) |
| 4817 | Philips HP8120 dryer B00TO7JUFG | ₹869 → ₹807 (48%) | ₹1,563 | ₹757 (post-coupon) |

#9473 ANT Flora scale B0CNLL7QLY already at ₹278, untouched. ₹ and discount strings in title/description/howTo rewritten to match the new price.

## Rejected

| Item | Card | Live | Reason |
|---|---|---|---|
| KALAMANDIR ring B0HLQ1D151 | ₹70,922 | ₹76,672 | drift |
| SJCAM SJ10 Pro B0B3HXGG1C | ₹8,581 | ₹8,846 | drift |
| Instamart cooker 8bf51413b63d | ₹82,800 | ₹2,001 | drift (card price wrong) |
| Flipkart gold bar CONEARGTZNSE6SZR | ₹13,950 | ₹15,200 | drift |
| Instamart DesiDiya lights 70435167ab2e | ₹95 | — | location-locked quick commerce |

All 5 written to `dd-rejected.json` with `Date.now()`.

## Freshness

- `indexnow-ping.mjs` 1 pushed + 2 synced slugs + blog, llms.txt, feed.xml, sitemaps/deals/sitemap.xml → "DONE: IndexNow -> HTTP 200 for 10 urls".
- sitemap.xml ISR 1800s; llms.txt force-dynamic. No new static route.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (/, /offers, /blog, sitemap, feed, /api/deals, llms.txt) | 7/7 200 + new deal 200 | OK |
| DB LIVE | 15,650 (+1) | OK |
| PENDING_REVIEW | 0 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| Max deal id | 16,216 (cursor 16,197, up from 16,187; external broadcast cron draining) | OK |
| Posts total / coverless / seo-less | 470 / 0 / 0 | OK |
| Posts per IST day | 10-29:4 10-30:4 10-31:4 11-01:1 11-03:4 11-04:2 11-05:3 11-06:3 11-07:3 | OK (11-02 = 0, historical) |
| Unpushed commits | 0 (before this report) | OK |
| Crons | 9/9 (CronList) | OK |

## Still open

- TG 11-04l: B0GXB76VRW duplicates #4983 (LIVE ₹29,750; channel ₹25,175 is post-coupon + HDFC). Unchecked: Vyom ×2 / ×3, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- #11896: Flipkart ₹664 vs DB ₹899. 16 bare Flipkart links. 96 drift rows. Single deals to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- Reticle MCP: CONNECTION_CLOSED. DO token rotation is the owner's job.
