# DESIDIME-INGEST tick — 2026-11-19j

Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the DesiDime `/new` and homepage cards without fetching any per-deal page, applied the JUNK and GROCERY filters, and resolved each Buy Now link through `visit.desidime.com` to the real merchant URL. Amazon candidates were checked on the PDP in the logged-in Playwright Amazon tab (`#corePriceDisplay` `.a-price-whole`, M.R.P. from `#centerCol`, stock from `#availability` plus the add-to-cart button). New deals were deduped by productId against the live DB. Duplicate LIVE rows were price-synced through `prisma.deal.update` plus a priceHistory row, not through bulk. Run at about 18:43–18:50 IST (13:13–13:20 UTC).

**Result: 4 new deals pushed LIVE (HTTP 201, count 4, all `created:true`, #16942–#16945). 3 duplicate LIVE rows were repriced. 3 candidates were rejected. IndexNow returned HTTP 200 for 10 URLs. Prod returned 200 on 7 of 7 endpoints and on all 7 touched pages at the first probe.**

## Stage 1

37 cards were read and 19 resolved to a single product. Of those, 7 were already in the DB, 3 had been rejected within the last 24 hours, and 9 were fresh. Links that resolved to `/clp/` or `/s?` listing pages (Havells, Scorist, Protecta) were dropped as non-products. Flipkart Haier `RFRHKMPPVQ6WBZAE` and the Acer "Visit" row were dropped for price drift.

## Pushed

| Id | Deal | Store | Price | M.R.P. | Off | Note |
|---|---|---|---|---|---|---|
| 16942 | FRONTECH 2.0 USB multimedia speakers, RGB, 2×3 W (B0D7MF751Z) | Amazon | ₹428 | ₹1,500 | 71% | Minimum order of 2 units, disclosed in the copy |
| 16943 | Spartan by Cos-Maxx cordless drill kit, 2×12 V 2 Ah batteries (B0DFMBY5ZM) | Amazon | ₹1,344 | none | none | 1 left in stock |
| 16944 | HP Travel Plus 22 L 16-inch laptop backpack (B0F9F8D46V) | Amazon | ₹724 | none | none | |
| 16945 | XPG Levante 360 ARGB AIO CPU liquid cooler (B08RVW5YYN) | Amazon | ₹6,498 | ₹28,999 | 78% | The copy says the M.R.P. looks inflated |

Every link is `/dp/ASIN` with `tag=ashoksachdev-21`, and every image is from `m.media-amazon.com`. The validators passed on all four: every ₹ in the title and howTo equals the price, every ₹ in the description equals the price or the M.R.P., discountPct is under 80, and the two rows with no M.R.P. have a null discountPct and no "% Off" in the title.

## Repriced (duplicate LIVE rows)

| Id | Deal | Change |
|---|---|---|
| 360 | Sulfar foldable 5-step ladder | ₹1,081 → ₹882. The M.R.P. was nulled because ₹13,195 implied 93% off, so discountPct went from 92% to null. 2 left in stock. |
| 16171 | ASRock H610M-HDV/M.2 D5 motherboard | ₹4,737 → ₹4,027. M.R.P. ₹11,000, 57% → 63%. |
| 4792 | Razer Game On bundle (DeathAdder Essential combo) | ₹2,400 → ₹2,040. The M.R.P. stays null because ₹13,999 would imply 85% off. |

The ₹ in each title, description and howTo was rewritten, and a priceHistory row was added for each.

Four other duplicates were confirmed unchanged on the PDP: #16917 CG geyser at ₹3,199 (the card's ₹2,880 was a bank-card offer), #16501 anjeer at ₹399, and #16938 HIKVISION at ₹946. #5204 HP 450 keyboard has no buy box and joins the watch list.

## Rejected

| ASIN | Deal | Reason |
|---|---|---|
| B0DMWSDGCC | AUN projector | The PDP shows ₹6,575 against the card's ₹5,918 |
| B0F3TQH63Y | iBELL | The PDP shows ₹2,790 against the card's ₹2,511 |
| B0D7Z8NQPP | ZEBRONICS PA124 | No buy box |

All three were written to `data/dd-rejected.json`, which now holds 2,139 entries.

## Freshness

| Check | Result |
|---|---|
| IndexNow | **HTTP 200** for 10 URLs: 4 new slugs, 3 repriced slugs, and the 3 hub URLs that slug mode adds |
| `sitemap.xml` | ISR 1800s. The deals child holds the top 100 only, by design. |
| `llms.txt` | `force-dynamic`, 200 |

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.25s) |
| /offers | 200 (0.07s) |
| /blog | 200 (0.61s) |
| /sitemap.xml | 200 (0.08s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.08s) |
| /llms.txt | 200 (0.39s) |
| New pages #16942–#16945 | 200 on all 4 (0.15–0.19s), first probe |
| Repriced pages #360, #16171, #4792 | 200 on all 3 (0.15–0.16s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 18:50 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,336 = 16,336 | OK (+4 from this tick) |
| PENDING_REVIEW | 3 (16261, 16262, 16928), member queue | OK. #16928 waits for deal-review. |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,945 | OK |
| Posts | 500, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,945 = 16,945 | OK. It already caught up on this tick's 4 pushes. |
| Local API on :4000 | Up (`/deals` 200) | OK |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, 11-18 3, **11-19 3**. 11-19 has met its target, and no day is 0 or over the cap of 4.

## Still open

- **GCP live host:** still needs owner confirmation.
- **#11896 and #14635:** Flipkart Offers with no `priceValidUntil`.
- **Same-price confirms:** they write no priceHistory row, so about 95% of LIVE deals have no `priceValidUntil`.
- **GSC traffic down about 70% since 10-28.**
- **IFS redirector:** dead for fourteen ticks in a row.
- **Inflated or drifting M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, and now **#16945** (XPG cooler, M.R.P. ₹28,999 for a ₹6,498 sale).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, and now **#5204** (HP 450 keyboard).
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917 (CG Iraya geyser), #3221 Kwality, and now **#360** (2 left) and **#16943** (1 left).
- **Stage 1 Flipkart gaps:** DesiDime `/a/p/b` links are skipped, and IFS `/indiafreestuff/p/` pids are nulled.
- **ASIN reuse:** #2351, #15344, #6989 and #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-19 18:53 |
| TG | 11-19 19:01 |
| INDEXNOW | 11-19 19:05 |
| SITEMON | 11-19 19:14 |
| DESIDIME | 11-19 20:43 |
| CONTENT-SEO | 11-20 00:39 |

SCHEMA-AUDIT runs 11-20 at 04:39, SEO-AUDIT-FIX 11-20 at 05:58 and AI-OVERVIEW 11-25 at 11:39.
