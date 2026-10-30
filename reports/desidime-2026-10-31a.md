# DESIDIME-INGEST: 2026-10-31a (~00:35 IST)

**Result: 0 new deals pushed. All 7 fresh candidates were rejected: 4 for PDP drift, 1 supercoin junk, 1 Flipkart drop (no browser) and 1 GOG freebie with no ld+json. Three dups were re-read on the PDP, and all three DB prices already match. Dup #14231 Bajaj Prohot had a stale MRP in its description (₹8,150 against the real ₹5,720), and that text was fixed in place. IndexNow returned HTTP 200 for 4 URLs. The stage-1 log now names the rows it skipped as rejected in the last 24h. CEO audit is clean: API = DB LIVE 15,138, max 15,692, cursor fully drained.**

## Method
- Stage 1 ran `ingest-desidime.mjs` over `/new` and the homepage. It reads cards only and never fetches per-deal pages. It applies the JUNK and GROCERY filters, then follows `visit.desidime.com` to the merchant URL.
- The Playwright MCP is still hung, so Amazon PDPs were read with desktop curl: `#corePriceDisplay .a-price-whole`, `#availability` and add-to-cart. No captcha came up.
- Dedup was by productId against the live DB and against `dd-rejected.json`.

## Funnel
| Stage | Count |
|---|---|
| Cards discovered | 32 |
| Dropped as junk or other-store (including Amazon rewards ads ×2 and a Cred play-store link) | 14 |
| Resolved to a merchant product | 13 |
| DB dups (all PDP-re-read) | 3 |
| Rejected within the last 24h | 3 |
| Fresh | 7 |
| Pushed | 0 |

## Rejected (fresh)
| Key | Product | DesiDime → PDP | Reason |
|---|---|---|---|
| B0FR27R9BB | AMO electric scooter | ₹38,500 → ₹48,500 / ₹70,000 | drift |
| B0CXQ5TGDZ | Mantra Baby Krishna soft toy | ₹76 → ₹999 / ₹1,499 | drift |
| B0H6WHHSHR | Lenovo IdeaPad Slim 3 | ₹59,240 → ₹75,990 / ₹1,68,890 | drift |
| B0CZTGRS2S | WHP 24kt 1g gold pendant | ₹14,394 → ₹15,790 | drift |
| WATFB4N4XTWAUZ8Z | Flipkart Tommy Hilfiger watch | ₹0 supercoin | junk (also Flipkart) |
| ERGGWU8WKKPGURWU | Flipkart jhumki ₹200 | n/a | Flipkart drop, no browser (not added to rejects; it comes back if reposted) |
| GOG free game | n/a | no ld+json | skip (stage 1 had already added it to the rejects) |

The 5 keys in this table were appended to `data/dd-rejected.json` with `Date.now()`; it now holds 1,309 keys.

## Dups
| Deal | DB | PDP | Action |
|---|---|---|---|
| #14231 Bajaj Prohot 5L (B0H4RSRSB5) | ₹2,699 / ₹5,720 (53%) | ₹2,699 / ₹5,720, in stock | Prices match. **Description fixed**: it said "M.R.P. of ₹8,150, 53% off", now "₹5,720". DesiDime's ₹2,430 is post-offer |
| #15690 ASUS Vivobook Go 14 (B09BB7XMWQ) | ₹42,990 / ₹72,990 | ₹42,990 / ₹72,990 | no change. DesiDime's ₹34,990 is post-bank, already in the description |
| #5644 Acer Aspire One (B0GYRK1RZC) | ₹41,990 / ₹71,999 | ₹41,990 / ₹71,999 | no change. DesiDime's ₹33,990 is post-bank |

## Code fix
`apps/api/scripts/ingest-desidime.mjs`: stage 1 now prints a `rej24h` line for every row it skips as rejected within 24h. The DONE line now splits the old "already in DB" count into "already in DB" and "rejected <24h". Before this, rejected rows were counted as DB dups and never named, which explains the "prints only 5 of 12 known rows" open item. That item is closed.

## Freshness
- `indexnow-ping.mjs` ran on 1 slug (#14231). Slug mode adds `/`, `/offers` and `/sitemap.xml`, for **HTTP 200 on 4 URLs**.
- The prod page for #14231 returns 200.
- `sitemap.xml` is ISR 1800 s, and `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 (0.09–0.91 s) |
| API total vs DB LIVE | 15,138 = 15,138 |
| API newest id vs DB max | 15,692 = 15,692 |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 450 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-24: 3, 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: 4, 10-30: 4. 10-31 is at 0 so far (it is 00:35 IST; CONTENT-SEO fires at :09 every 6h) |
| Broadcast cursor vs DB max | `lastId` 15,692 = 15,692 (file re-read), fully drained |
| Unpushed commits | 0 before this report (after `git fetch`) |
| Session crons | 9/9 match `.claude/cron-schedules.md`. None recreated |

## Still open (carried forward)
- The Playwright MCP is hung this session:
  - TG reads only 5 of 13 groups.
  - IFS, DesiDime and TG Flipkart candidates are dropped (1 this tick).
  - 7 Flipkart top-100 deals are unverified (#2279, #4172, #3663, #2483, #6409, #4430, #4171), plus #3881.
  - reticle fails with CONNECTION_CLOSED.
- JioMart #37 is a delist candidate. #1665 and #1656 have no ld+json price. #6405 and #6426 need a manual PDP look.
- Stale "% Off" and old-MRP prose remains on a handful of deals; #14231 was fixed this tick (see seo-audit-fix 10-30).
- Rotate the DO API token.
