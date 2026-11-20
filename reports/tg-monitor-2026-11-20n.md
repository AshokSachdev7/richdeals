# TELEGRAM-DEAL-MONITOR tick — 2026-11-20n

This tick read the sidebar of all 13 groups in `data/tg-groups.json` with one `browser_evaluate` in the Playwright "richDeals" profile. It kept single-product deals from any store, resolved shortlinks, and deduped them against `data/tg-multi-seen.json` and the live DB productId. Every surviving price was checked on the Amazon PDP in the logged-in tab, using the mobile `/gp/aw/d/` page as a fallback. Run at about 13:01–13:20 IST on 11-20.

**Result: pushed 2 deals LIVE (#17004, #17005; bulk HTTP 201, `count: 2`, both `created: true`) and repriced 1 LIVE duplicate (#1527 Garnier, ₹314 → ₹306). Rejected 2 candidates: one had no buy box and one fell under the GROCERY policy. A second duplicate matched the DB. IndexNow returned HTTP 200 for 6 URLs. The CEO audit is green.**

## Candidates

| Group | Product | Link | Outcome |
|---|---|---|---|
| ONLINE SHOPPING DEALS | Greatest Works of William Shakespeare, boxed set of 10 (9354407005) | Amazon | Fresh, so it went to PDP verification |
| ONLINE SHOPPING DEALS | Golden Bird 18 plastic hangers (B09GMBZ8J9) | Amazon | Fresh, so it went to PDP verification |
| Rogerkart | Cello Rise N Shine sipper 1230ml (B0DZCXTVFV) | `/r/` redirect page; the dp URL was read from the page body | Fresh, so it went to PDP verification |
| ONLINE SHOPPING DEALS | Mugdh A2 bilona ghee (B0F21NVJWX) | Amazon | Rejected: GROCERY policy (perishable FMCG) |
| CoolzTricks | Prestige Castlite kadai (B0G5Y68CDF) | Amazon | Duplicate of LIVE #16727 |
| Dealzone | Garnier Men AcnoFight combo (B0F18L1ZZB) | Amazon | Duplicate of LIVE #1527 |
| SB Loots | Reebok post | — | Skipped: it lists several products |

## PDP verification

| Product | Channel | PDP | Stock | Outcome |
|---|---|---|---|---|
| Shakespeare boxed set (9354407005) | ₹368 | ₹368, M.R.P. ₹1,199 | Add-to-cart present | Pushed |
| Golden Bird hangers (B09GMBZ8J9) | ₹294 | ₹294, M.R.P. ₹1,299 | In stock | Pushed. The M.R.P. looks inflated (77% off). |
| Cello sipper (B0DZCXTVFV) | ₹180 | No price on desktop; the mobile page says "Currently unavailable" | No add-to-cart | Rejected (no buy box) |

## Duplicate hits (LIVE rows re-checked)

| Deal | ASIN | DB → PDP | Action |
|---|---|---|---|
| #16727 Prestige Castlite kadai | B0G5Y68CDF | ₹1,138 = ₹1,138 (M.R.P. ₹3,935) | None |
| #1527 Garnier Men AcnoFight face wash + UV serum | B0F18L1ZZB | ₹314 → ₹306 (M.R.P. ₹628) | Repriced |

## Pushed

| id | Deal | Price | M.R.P. | Off | Affiliate |
|---|---|---|---|---|---|
| 17004 | Greatest Works of William Shakespeare boxed set of 10 books (paperback) | ₹368 | ₹1,199 | 69% | Amazon `tag=ashoksachdev-21` |
| 17005 | Golden Bird premium plastic clothes hangers, pack of 18 | ₹294 | ₹1,299 | 77% | Amazon `tag=ashoksachdev-21` |

Images come from `m.media-amazon.com`. Both descriptions are original copy. The Golden Bird description says plainly that the M.R.P. looks generous, and steers readers to the per-hanger price (about ₹16) instead.

Bulk response: HTTP 201, `count: 2`, both `created: true`, so no slug needed restoring. Both new pages return 200 on prod.

## Repriced

#1527 Garnier Men AcnoFight combo: price ₹314 → ₹306, M.R.P. ₹628, discount 50% → 51%. Neither the title nor the description has a ₹ figure, so neither needed changing. A `priceHistory` row was written.

## Seen list

`data/tg-multi-seen.json` gained 4 ASINs (B0G5Y68CDF and B0F18L1ZZB were already in it). It now holds 5,724 entries. The file stays unstaged, as usual.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 6 URLs (#17004, #17005, #1527, and the 3 hub URLs slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.29s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.59s |
| `/sitemap.xml` | 200 | 0.05s |
| `/feed.xml` | 200 | 0.11s |
| `/llms.txt` | 200 | 0.49s |
| `/greatest-works-of-william-shakespeare-boxed-set-of-10-books-paperback-9354407005` | 200 | 0.19s |
| `/golden-bird-premium-plastic-clothes-hangers-pack-of-18-b09gmbz8j9` | 200 | 0.17s |
| `/api/deals` | 200: total 16,398, newest id 17,005 | |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,398 = 16,398 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,005 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,003 vs 17,005 | OK. The external tg-broadcast cron picks up #17004 and #17005 on its next run. |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `tg-monitor-2026-11-20a` to `-m` existed, so this report uses suffix `n` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-13 | 2 |
| 11-14 | 2 |
| 11-15 | 2 |
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **3** |

No day is 0 and none is above the cap of 4. 11-20 is done.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead. The coupon widget is only a partial bypass.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, plus the new #17005 Golden Bird (77%).
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996.
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| SITEMON | 11-20 13:14 |
| INDEXNOW | 11-20 13:23 |
| TG | 11-20 14:01 |
| DESIDIME | 11-20 14:43 |
| DEAL-INGEST | 11-20 14:53 |
| CONTENT-SEO | 11-20 18:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
