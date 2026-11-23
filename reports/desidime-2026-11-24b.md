# DESIDIME-INGEST tick — 2026-11-24b

This tick ran from about 08:05 to 08:20 IST on 11-24. Stage 1 (`apps/api/scripts/ingest-desidime.mjs`) read the listing cards on desidime.com `/new` and the homepage, with no per-deal fetch. It applied the JUNK and GROCERY filters, resolved each Buy Now link through `visit.desidime.com`, and deduped by productId against the live DB. The fresh Amazon candidate was then verified on the desktop product page in the logged-in Playwright tab.

**Result: 1 new deal pushed LIVE (HTTP 201, count 1, created). No duplicate LIVE row needed a reprice. IndexNow returned HTTP 200 for 4 URLs. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 30 |
| Dropped as junk or other-store | 16 |
| Resolved to a product | 14 |
| Already in the DB | 7 |
| Rejected in the last 24h | 6 (Chewers, Wild Stone, LG AC on Flipkart, P.N.Gadgil, wear me blanket on Flipkart, HDFC offer) |
| Fresh | 1 |

The first stage-1 run printed `desidime.com/new gave 0 cards (5576 bytes)`, a transient fetch failure. A curl re-probe got 200 with 379 KB and 20 cards, and the rerun was clean. Every figure in this report comes from the rerun.

## Candidate

| ASIN | Product | Card | Product page | Verdict |
|---|---|---|---|---|
| B0HGR4K47X | Multi-functional baby walker with musical toy bar (Green) | ₹1,599 / ₹2,999 | ₹1,599 against ₹2,999, "In stock", add-to-cart, sold by RK World Infocom. Image `51F8-fSMHyL` is the landing image for `landingAsinColor` Green | **Pushed** |

The mobile `/gp/aw/d/` page confirmed the price but carried no hiRes image, so the image was read from the desktop page in the Playwright tab. This walker is a different ASIN from B0HJ5C7ZMH, the walker that tg-monitor 11-24a rejected. That post claimed ₹99; this card's ₹1,599 matches the product page.

## Duplicates (price-sync)

| Deal | Card | DB before | Product page | Action |
|---|---|---|---|---|
| #4090 Konvio B08HSN58RK | ₹299 | ₹299 | Verified in 11-24a | No change |
| #17110 Rexona B0CMQKR8CJ | ₹136 | ₹136 | Pushed in 11-24a | No change |
| #12224 Toshiba TV (Flipkart) | ₹24,990 | ₹29,990 | Repriced to the card-free ₹29,990 in 11-24a. The card figure needs a bank card | No change |
| #15316 Lifelong B0DFYG64PD | ₹436 | ₹436 | Repriced in 11-24a | No change |
| #17111 Crompton B0HCV3ZW58 | ₹428 | ₹428 | Pushed in 11-24a | No change |
| #17084 Skybags (Myntra) 25221442 | ₹3,738 | ₹3,738 | Myntra serves no ld+json to curl; the DB already matches the card | No change |
| #3405 Dove shampoo 650 ml B00CQ41JE4 | ₹391 | ₹476 | Re-read this tick: ₹476 against ₹1,082, add-to-cart. The card's ₹391 is a coupon or Subscribe & Save price | No change |

## Push

| Slug | Price / M.R.P. | Affiliate | Result |
|---|---|---|---|
| `multi-functional-baby-walker-musical-toy-bar-green-b0hgr4k47x` | ₹1,599 / ₹2,999 (47%) | Amazon `tag=ashoksachdev-21` | HTTP 201, count 1, created. Prod page returns 200 |

Before the push, a validator checked the copy:
- Every ₹ figure in the title and how-to equals the price.
- Every ₹ figure in the description is the price or the M.R.P.
- The percentage equals the computed discount, and the discount is under 80%.

The description carries a short safety note (flat floor, away from stairs, adult close by). It states no new facts.

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 1 slug + 3 hub URLs) | HTTP 200 for 4 URLs |
| New deal page on prod | 200 |
| sitemap.xml | ISR `revalidate = 1800`. The deals child lists only the top 100, so this deal serves `noindex,follow` by design |
| llms.txt | `force-dynamic`, rebuilt per request. Returns 200 |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.06–0.43s | OK |
| DB LIVE vs API total | 16,521 = 16,521 (16,977 rows in total) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,127 vs 17,126 | OK. The new walker is waiting for the external broadcast cron |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | Only `desidime-2026-11-24a.md` existed, so this report uses suffix `b` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far. CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259, #12963 and #8707.
- **Flipkart drops:** boAt Stone 510 and the Caprese sling bag.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick did not touch Telegram, did not open that chat and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
