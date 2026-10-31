# DESIDIME-INGEST: 2026-10-31g (~12:37 IST)

**Result: 6 new deals pushed LIVE (#15750–#15755). Three duplicate LIVE rows matched their product pages, so none were changed. 5 candidates were rejected. IndexNow returned HTTP 200 for 9 URLs. All 6 new pages return 200 on prod. CEO audit clean.**

## Method
- Ran `ingest-desidime.mjs` stage 1 over `/new` plus the homepage. It reads the cards only (no per-deal fetch), applies the JUNK and GROCERY filters, and resolves `visit.desidime.com` to the merchant URL.
- Deduped by productId against the live DB (`scratchpad/q1031k.cjs`).
- Checked Amazon product pages with desktop curl (`scratchpad/pdp1031d.cjs`). Price comes from `#corePriceDisplay .a-price-whole`, stock from `#availability` plus the add-to-cart button. Images are `m.media-amazon.com` URLs keyed by `landingAsinColor`.
- The Playwright MCP is still hung and reticle returns CONNECTION_CLOSED, so Flipkart and Instamart candidates were dropped.
- Pushed with Prisma `deal.create` plus a `priceHistory` row (`scratchpad/push-dd1031g.mjs`). The script printed NEW 6, EXISTS 0. Text was rewritten, never copied.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 35 |
| Dropped as junk or other-store | 11 |
| Product-resolved | 23 |
| Already in the DB | 3 (all checked on the product page, all matched) |
| Rejected in the last 24 h (re-skipped) | 5 (WHP gold, Dell sitewide, Tommy watch on Flipkart, District game, Klook) |
| Fresh | 15 |
| Skipped by stage 1 | Longway egg cooker on Flipkart (out of stock), Ching's on Instamart (no ld+json), Samsung Galaxy Book6 and Motorola Edge 70 (price drift) |
| Fresh non-Amazon dropped (no browser) | 4 (Flipkart EGGGRGSVEVPQUSEZ, COMHHPK34YDWTPQF and MOBHN9733F5QHAQC; Instamart 12ad0a273daf) |
| Fresh Amazon checked on the product page | 11 |
| Pushed LIVE | **6** |

## Pushed (status LIVE)
| id | ASIN | Price / MRP | Slug |
|---|---|---|---|
| #15750 | B0HP121191 | ₹999 / ₹4,999 (80%) | `desidiya-2-in-1-galaxy-projector-night-light-with-6-theme-slides-b0hp121191` |
| #15751 | B0FJ8S6B27 | ₹269 / ₹1,699 (84%) | `combelle-5-in-1-curl-hair-brush-with-vegan-boar-bristles-beige-b0fj8s6b27` |
| #15752 | B0FNV6GP6K | ₹4,999 / ₹12,937 (61%) | `logitech-mx-master-3s-bluetooth-edition-wireless-mouse-b0fnv6gp6k` |
| #15753 | B0FCYHJQ2Q | ₹189 / ₹999 (81%) | `visby-2-l-motivational-water-bottle-with-straw-and-belt-green-b0fcyhjq2q` |
| #15754 | B0CVGVFZ8H | ₹52,997 / ₹1,05,998 (50%) | `eox-e2-low-speed-non-rto-electric-scooter-with-60-70-km-range-white-b0cvgvfz8h` |
| #15755 | B0H9LNHHDY | ₹149 / ₹499 (70%) | `housolic-self-adhesive-toilet-paper-roll-holder-pack-of-1-b0h9lnhhdy` |

All 6 product pages were in stock with an add-to-cart button.

## Duplicates rechecked
| ASIN | Row | Product page | DB | Action |
|---|---|---|---|---|
| B0DJZKTBBD | #15740 MoonlitDreams | ₹139 / ₹999 | ₹139 / ₹999 | No change |
| B0C45M1421 | #15733 BonKaso | ₹499 / ₹3,599 | ₹499 / ₹3,599 | No change |
| B0H4RSRSB5 | #14231 Bajaj Prohot | ₹2,699 / ₹5,720 | ₹2,699 / ₹5,720 | No change. The card's ₹2,430 was wrong |

## Rejected
| Candidate | Reason |
|---|---|
| B0FCLPQG26 Sony WF-C710N | Card ₹3,775, page ₹6,489 |
| B0DCK453V1 AO Smith Z9 Pro | Card ₹15,499, page ₹21,499 |
| B0DFYLKTWC Vector X Maestro | Card ₹499, page ₹2,599 |
| B0BRZZCRPW Ant Esports Dock5 | Card ₹1,599, page ₹1,799 |
| B0B7WZ55MT MMTC | Bank-offer price, the same reason as in TG 10-31k |

All 5 were added to `data/dd-rejected.json` with `Date.now()`. It now holds 1,347 entries.

## Affiliate
Every row uses `amazon.in/dp/<ASIN>?th=1&psc=1&tag=ashoksachdev-21`, and the DesiDime tag `desidime01-21` was stripped. No Flipkart, Myntra or Cuelinks row was pushed.

## Freshness
- `indexnow-ping.mjs` was run on the 6 slugs. With the sitemap and hubs added, that makes 9 URLs, and it returned **HTTP 200**.
- All 6 new deal pages return 200 on prod (0.20–0.39 s).
- The sitemap is ISR (1800 s) and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.12–0.72 s) |
| API total vs DB LIVE | prod 15,201 = local 15,201 = DB 15,201 |
| API newest id vs DB max | 15,755 = 15,755 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 452 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4, 10-31: 2. The rule is met (2 posts). CONTENT-SEO (210ebce0) is queued for 12:37, behind this tick |
| Broadcast cursor vs DB max | `lastId` 15,749 vs 15,755. #15750–#15755 are from this tick. The file was re-read, and its ts (11:54 IST) is 43 minutes old. Only rows from this tick are waiting, so this is not rot. SITEMON should re-read the file next tick |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. IFS and CONTENT-SEO are queued for 12:37 |

## Still open (carried forward)
- The Playwright MCP is hung and reticle returns CONNECTION_CLOSED. The effects:
  - TG reads only 5 of 13 groups.
  - Flipkart candidates are dropped.
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
- JioMart #37 is a candidate for delisting. #1665 and #1656 have no ld+json price. #6405 and #6426 need someone to look at the product page by hand.
- Non-top-100 prose drift: 118 descriptions and 32 titles (noindex pages, low priority).
- Rotate the DO API token.
