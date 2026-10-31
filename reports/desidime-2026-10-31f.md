# DESIDIME-INGEST: 2026-10-31f (~16:00 IST)

**Result: 3 new deals pushed LIVE (#15728–#15730). One duplicate LIVE row was price-synced in place and kept its slug (#977). 8 Amazon candidates were rejected, 7 of them for price drift. IndexNow returned HTTP 200 for 7 URLs. All 4 pages return 200 on prod. CEO audit clean.**

## Method
- Stage 1: `ingest-desidime.mjs` read the listing cards on `/new` and the homepage. No per-deal pages were fetched. The JUNK and GROCERY filters ran, and Buy Now links were resolved through `visit.desidime.com`.
- Deduped by productId against the live DB.
- Checked Amazon product pages with desktop curl (`scratchpad/pdp1031d.cjs`). Price comes from `#corePriceDisplay .a-price-whole`, stock from `#availability` plus the add-to-cart button. The Playwright MCP is still hung.
- Pushed with Prisma `deal.create` plus a `priceHistory` row (`scratchpad/push-dd1031f.mjs`). Text was rewritten, never copied.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 34 |
| Dropped as junk or other-store | 12 |
| Product-resolved | 22 |
| Already in the DB | 5 (all checked on the product page; 1 synced) |
| Rejected in the last 24h | 5 |
| Fresh candidates | 12 (11 Amazon, 1 Flipkart) |
| Pushed LIVE | **3** |

## Pushed (status LIVE)
| id | ASIN | Price / MRP | Slug |
|---|---|---|---|
| #15728 | B07YWMQWWK | ₹293 / ₹667 (56%) | `biotique-green-apple-shine-gloss-shampoo-conditioner-650ml-b07ywmqwwk` |
| #15729 | B0CLS651GX | ₹237 / ₹599 (60%) | `french-essence-enchante-gift-set-for-women-60ml-perfume-150ml-deo-b0cls651gx` |
| #15730 | B0HF8G59B5 | ₹599 / ₹1,999 (70%) | `nu-republic-replay-cube-12w-bluetooth-5-4-speaker-beige-yellow-b0hf8g59b5` |

- All three product pages were in stock with an add-to-cart button, and the price matched the card.
- Images are the `data-old-hires` URLs from `m.media-amazon.com`. Each one was keyed to the variant in `landingAsinColor`.

## Duplicates rechecked
| ASIN | Row | Card | Product page | DB before | Action |
|---|---|---|---|---|---|
| B0BQC6B15R | #977 Dabur charcoal toothpaste | ₹88 | ₹88 / ₹365 | ₹89 / ₹365; the description said "73%" | **Synced** to ₹88, 76%. Title and description ₹ figures swapped. priceHistory row added |
| B09G33GLP8 | #6214 Fiama gel bar 8-pack | ₹232 | ₹299 / ₹680 | ₹299 / ₹680 | No change. The card price was stale |
| B0F8W39MB2 | #14535 Amazon Basics shower head | ₹464 | ₹464 / ₹5,499 | same | No change |
| B0DWFSSGDY | #15625 Lifelong book safe | ₹599 | ₹599 / ₹1,499 | same | No change |
| B0H4RSRSB5 | #14231 Bajaj Prohot | ₹2,430 | ₹2,699 / ₹5,720 | same | No change. The card showed a bank-offer price |

## Rejected
| Candidate | Reason |
|---|---|
| B0GTZP6FW7 IFB washer | The card says ₹21,739 but the product page says ₹27,989, so the card is likely a bank-offer price |
| B0HDZN3L6V 2 g gold bar | The card says ₹29,446 but the product page says ₹31,097 |
| B0H2DHYFQZ ASUS Chromebook | The card says ₹22,190 but the product page says ₹23,990 |
| B0DTYHT8MN ASUS Zenbook | The card says ₹72,240 but the product page says ₹86,990 |
| B0GMHM8P95 ASUS V470 | The card says ₹52,740 but the product page says ₹58,990 |
| B0H25X3W7F ASUS TUF | The card says ₹80,240 but the product page says ₹99,990 |
| B0GFWP1HJR LUKER bulb | The card says ₹860 but the product page says ₹1,589 |
| B078R44L1V HP dock | "Currently unavailable" and no add-to-cart button |
| Flipkart SBEGS8H3MY44YYQN sofa bed | Price drift, and there is no browser to check the product page |

- The 8 Amazon rejects were written to `data/dd-rejected.json` with `Date.now()`.
- The "Smartchoice" prices on DesiDime's ASUS cards are post-bank-offer prices, so they never match the product page.

## Affiliate
Every Amazon row uses `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`. The DesiDime tag `desidime01-21` was stripped. This sweep had no Myntra or Cuelinks rows.

## Freshness
- `indexnow-ping.mjs` was run on the 4 slugs. With the sitemap and hubs added, that makes 7 URLs, and it returned **HTTP 200**.
- All 4 deal pages return 200 on prod.
- The sitemap is ISR (1800 s) and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.09–0.79 s) |
| API total vs DB LIVE | prod 15,176 = local 15,176 = DB 15,176 |
| API newest id vs DB max | 15,730 = 15,730 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 452 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 2 |
| Broadcast cursor vs DB max | `lastId` 15,730 = 15,730 (already drained, file re-read) |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md` |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting. #1665 and #1656 have no ld+json price. #6405 and #6426 need someone to look at the product page by hand.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
