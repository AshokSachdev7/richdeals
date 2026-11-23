# DESIDIME-INGEST tick — 2026-11-24a

This tick ran inline at about 00:47 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read only the listing cards, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were then verified in the logged-in Playwright Amazon tab. The duplicate LIVE rows were re-read on their product pages and repriced where the price had moved. Finished at about 00:56 IST.

**Result: 3 new Amazon deals pushed LIVE (HTTP 201, count 3, all `created:true`) and 3 duplicate LIVE rows repriced. IndexNow returned HTTP 200 for 9 URLs. 4 candidates were rejected for price drift or a missing buy box. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered (`/new` + homepage) | 35 |
| Killed by JUNK / GROCERY filters | 14 |
| Resolved to a merchant product URL | 16 |
| Already in the DB (by `productId`) | 6 |
| Rejected in the last 24h (`data/dd-rejected.json`) | 3 |
| Fresh candidates (all Amazon) | 7 |

## Candidates

| ASIN | Product | Card | Product page | Verdict |
|---|---|---|---|---|
| B0CMQKR8CJ | Rexona Power Dry roll-on deodorant for women, 50ml, pack of 2 | ₹136 | ₹136, M.R.P. ₹380, in stock, add-to-cart present | Pushed |
| B0HCV3ZW58 | Crompton WallSmile Prism LED deco wall light, IP54, warm white | ₹428 | ₹428, M.R.P. ₹2,000, in stock, add-to-cart present | Pushed |
| B0DXNTYWHV | HP M190 wireless mouse (AB3C6AA) | ₹379 | ₹379, M.R.P. ₹999, in stock, add-to-cart present | Pushed |
| B092JDW7G7 | Chewers dog biscuits | ₹345 | ₹965 | Rejected: price drift |
| B0C1CBCH2G | Wild Stone grooming kit | ₹399 | No buy box | Rejected |
| B00B4BC93K | Havells Ventil Air exhaust fan | ₹1,679 | ₹2,549 | Rejected: price drift |
| B0BYLK9PZC | P.N.Gadgil 1g gold ring | ₹10,934 | ₹13,896 | Rejected: price drift |

The 4 rejects were added to `data/dd-rejected.json` with `Date.now()`, which now holds 2,186 keys.

**M.R.P. note:** the Crompton listing shows a ₹2,000 M.R.P., which gives 79% off. That looks generous for a wall light. The deal description tells readers to judge the deal on the ₹428 price, not the discount.

## Duplicates (LIVE rows re-verified)

| Deal | Card | DB before | Product page | Action |
|---|---|---|---|---|
| Konvio #4090 | ₹299 | ₹299 | ₹299 / M.R.P. ₹699 | No change |
| Dove #3405 | ₹391 | ₹476 | ₹476 / M.R.P. ₹1,082 | No change. The card price is stale or applies after a coupon |
| Lifelong steamer #15316 | ₹436 | ₹395 | ₹436 / M.R.P. ₹1,299 | Repriced to ₹436 (66% off) |
| Striders BentoPro #10372 | ₹164 | ₹207 | ₹164 / M.R.P. ₹799 | Repriced to ₹164 (79% off) |
| Toshiba V37SP 50" #12224 (Flipkart) | ₹24,990 | ₹29,999 | ld+json ₹29,990, InStock | Repriced to ₹29,990 (40% off). The card's ₹24,990 is probably a bank-offer price |
| Myntra Skybags #17084 | ₹3,738 | ₹3,738 | Not verifiable: Myntra serves no ld+json to curl | Left unchanged, since the card matches the DB |

The reprices went through `prisma.deal.update` plus a `priceHistory` row, with the ₹ figures in the title and description checked against the new price. The old Toshiba description said it "saves ₹24,750" (the real gap was ₹20,000) and repeated an unverified 4.9★ rating and a 40-inch comparison. All three claims were removed, and a line was added saying bank offers can lower the price at checkout.

## Push

| Slug | Price / M.R.P. | Affiliate | Result |
|---|---|---|---|
| `rexona-power-dry-roll-on-deodorant-women-50ml-pack-of-2-b0cmqkr8cj` | ₹136 / ₹380 (64%) | Amazon `tag=ashoksachdev-21` | created, prod 200 |
| `crompton-wallsmile-prism-led-deco-wall-light-ip54-warm-white-b0hcv3zw58` | ₹428 / ₹2,000 (79%) | Amazon `tag=ashoksachdev-21` | created, prod 200 |
| `hp-m190-wireless-mouse-ab3c6aa-b0dxntywhv` | ₹379 / ₹999 (62%) | Amazon `tag=ashoksachdev-21` | created, prod 200 |

`/admin/deals/bulk` returned HTTP 201 with count 3. All three were `created:true`, so no slug needed restoring. Images are the marketplace's own `m.media-amazon.com` `_SL1500_` files. Titles and descriptions were written fresh, with no ratings or claims beyond what the product page showed.

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 3 new + 3 repriced slugs + 3 hub URLs) | HTTP 200 for 9 URLs |
| sitemap.xml | ISR `revalidate = 1800`. Returns 200. The deals child is top-100 only by design |
| llms.txt | `force-dynamic`, rebuilt per request. Returns 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200 at about 00:55 IST | OK |
| DB LIVE vs API total | 16,505 = 16,505 (16,962 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,112 vs 17,109 | OK. The gap is this tick's 3 new deals; the external broadcast cron picks them up on its next run |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | No `desidime-2026-11-24*` existed, so this report uses suffix `a` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far. CONTENT-SEO runs again at 06:39, 12:39 and 18:39 IST |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`. The Crompton deal from this tick adds another.
- **No buy box:** #7259 and #12963.
- **Flipkart drops:** boAt Stone 510 and the Caprese sling bag.
- **Myntra price verification:** Myntra serves no ld+json to curl, so #17084 can only be re-verified in a browser tab.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick did not touch Telegram, and none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).
