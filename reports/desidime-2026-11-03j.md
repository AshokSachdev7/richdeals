# DESIDIME 2026-11-03j (22:37 IST)

**Result: 1 new deal pushed LIVE (#16104 VredeVogel kurta set, Amazon, ₹949 / ₹5,999, 84% off, PDP-verified). 2 duplicate rows were price-synced in place: #8856 Sony MDR-ZX310AP (₹949 → ₹799) and #12940 Samsung G3 24" monitor (₹7,999 → ₹7,499). 3 Amazon items were rejected (2 drift, 1 fake ₹1 price). 6 Flipkart items are held because they need a browser. IndexNow returned HTTP 200 for 6 URLs.**

## Method

- **Stage 1:** `apps/api/scripts/ingest-desidime.mjs` read the cards on `/new` and the homepage. It does not fetch per-deal pages. It applies the JUNK and GROCERY filters and resolves each Buy Now link through `visit.desidime.com`.
- **Verification:**
  - Amazon: desktop curl reading `.a-price-whole` in `#corePriceDisplay`, `#availability` and add-to-cart, with a mobile-UA `/gp/aw/d/` fallback. The Playwright MCP is still hung and reticle is CONNECTION_CLOSED.
  - Non-Amazon: `productLd()` ld+json, ±₹1, InStock.
- **Dedup:** by productId against the live DB.

## Funnel

| Stage | Count |
|---|---|
| Discovered | 35 |
| Product-resolved | 27 |
| Already in DB | 9 |
| Rejected in the last 24h | 4 (Nothing Phone 4a, Pixel 11, HP Laser, Klook) |
| Fresh | 14 |
| Skipped in stage 1 | Digihaat mustard, Instamart NOICE and Jiomart Dabur chutney (no ld+json); Flipkart Ai+ PulseTab (drift); Zagg Money (Play Store app) |
| **Pushed** | **1** |
| Synced in place | 2 |
| Rejected | 3 |
| Held (Flipkart, needs a browser) | 6 |

## Pushed

| DB id | Slug | Price (MRP) | Discount |
|---|---|---|---|
| 16104 | `vredevogel-women-s-chanderi-silk-embroidered-kurta-pant-and-organza-dupatta-set-b0dt9tgbnt` | ₹949 (₹5,999) | 84% |

- **How it was pushed:** Prisma direct-create (`push-dd1103j.mjs`) with `status: LIVE`, plus a priceHistory row. The push printed `NEW 1 EXISTS 0 SYNCED 2`.
- **Price:** the card showed ₹999. The PDP read was ₹949, in stock, with add-to-cart, and that is what was pushed.
- **Title:** taken from the PDP. It is a kurta, pant and dupatta set, not a saree.
- **Content and image:** the copy is rewritten, and the image comes from `m.media-amazon.com` (`61EZVWl-DRL`).
- **Affiliate link:** `/dp/ASIN?th=1&psc=1&tag=ashoksachdev-21`.
- **Prod:** #16104 returns 200.

## Duplicates and sync

| DB id | Item | Change |
|---|---|---|
| #8856 | Sony MDR-ZX310AP `B00K0AL3PQ` | ₹949 → ₹799 / ₹2,190, 64%. The title has no price, so it was left as is. The `AT2` clause in the description was updated. |
| #12940 | Samsung G3 24" monitor `B0HDPLHJ35` | ₹7,999 → ₹7,499 / ₹15,900, 53%. The title and the `AP2` clause in the description were both updated. |
| #15334, #16083, #16095, #13452 | — | No action: they match the PDP |
| #14840 | Plaeto `B0F6CY91HL` | Not changed: the PDP read null with no add-to-cart. Noted only. |
| #11896 | American Tourister (Flipkart) | Held: the DB has ₹849 and the card shows ₹664, but checking it needs a browser |

## Rejected

| pid | Item | Card | PDP | Reason |
|---|---|---|---|---|
| B0HCNC1Z9X | iQOO Z11 5G | ₹31,499 | ₹39,999 | drift (the card price is after a bank offer) |
| B0HQ69F819 | MDR Talha speaker | ₹1 | ₹386 | fake price |
| B0B8NHX62W | Samsung 7 kg washer | ₹14,041 | ₹17,490 | drift |

- `data/dd-rejected.json` now holds 1,512 entries.

## Held (Flipkart, needs a browser)

| pid | Item | Card price |
|---|---|---|
| NDFHZEC9YS8SGB6B | Anjeer figs | ₹347 |
| MLDHGJ7G7PZEPUDC | SugarNest cake mould | ₹155 |
| BWLHM5NGWFVJBP8U | Tromso bowl set | ₹545 |
| KRKHKBW52SNUHXYC | Yaadgar cutlery rack | ₹210 |
| CDSHEMFDC7CX9EFM | Kombuis spice set | ₹405 |
| MIXHSJ3HG3FXFZPK | NutriPro juicer | ₹800 (already held) |

## Freshness

- **IndexNow:** `indexnow-ping.mjs` with the 3 slugs (1 new + 2 synced) returned `HTTP 200 for 6 urls` (3 slugs plus 3 hubs).
- **Sitemap:** ISR, 30 minutes. The deals child lists the top 100 only.
- **llms.txt:** dynamic.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt`, plus the #16104 and #8856 pages | 10/10 200 | ok |
| DB LIVE / prod API total | 15,547 / 15,547 | equal (+1) |
| DB max id | 16,104 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 459 / 0 / 0 | ok |
| Posts per day (IST) | 10-27:3, 10-28:4, 10-29:4, 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4 | 11-03 at cap; 11-02 missed (past day); CONTENT-SEO's next run is 11-04 00:32 IST |
| Broadcast cursor | lastId 16,103 vs max 16,104 (file re-read) | 1 behind: #16104 from this batch, which the external broadcast cron will drain |
| Crons | 9/9 (CronList matches `.claude/cron-schedules.md`) | ok |
| Unpushed commits | 0 before this report | ok |

## Still open

- **The Playwright MCP is hung and reticle is CONNECTION_CLOSED.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart and Shopsy verification is blocked. About 22 items are held: the earlier 17 plus the 5 new Flipkart items from this tick.
- **11-04 needs 2-3 posts.** CONTENT-SEO runs at 00:32 IST and must ship.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
  - #15976's MRP is ambiguous (₹999 or ₹1,299).
  - #7820 Sedell and #14840 Plaeto read NULL with no add-to-cart.
- **#2913's description still mentions the HDFC EMI offer.** That claim was not re-verified.
- **The DO token needs rotating.** That is the owner's job.
