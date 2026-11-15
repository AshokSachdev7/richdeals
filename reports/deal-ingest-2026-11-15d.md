# DEAL-INGEST indiafreestuff tick — 2026-11-15d

Stage 1 (`ingest-ifs-proper.mjs`) swept `/deals`, `?page=2`, `?page=3` and `/deals/superdeals` and resolved the base64 `?rto=` Buy Now ids. Run at about 06:55–07:05 IST.

- 89 cards discovered, 75 resolved to a product (all Amazon), 14 dropped (13 Flipkart null-pid cards and 1 Amazon `/b?node` hub).
- Diffed against the 15c sweep from 2h earlier: **0 new productIds, 0 card price changes, the same 14 drops.** IFS has not posted since about 05:00 IST (Sunday early morning).
- All 48 dups were PDP-verified 2h ago in 15c, so this tick re-read only the low-stock and open rows in the logged-in Amazon tab: `.a-price-whole`, M.R.P. from `#centerCol`, `#availability` and add-to-cart. There was no captcha.

**Result: 0 pushed (0 fresh). 1 row was price-synced, 2 rows were expired and 2 got same-price PH rows. IndexNow returned HTTP 200 for 6 urls. Prod is 7/7 at 200 and every DB check is green. The broadcast cursor caught up to 16,589.**

## Re-checks

| Row | Deal | DB | PDP | Action |
|---|---|---|---|---|
| #7461 | Ant Esports AEH0105 HDMI B0CDPJ565Q | ₹89 | ₹139, M.R.P. ₹699, 1 left, add-to-cart present | **Synced from ₹89 to ₹139 (80% off).** Title and description updated, PH row added. Slug unchanged. |
| #16190 | Wired RGB gaming mouse B0FPDMSHDJ | ₹388 | No add-to-cart. The ₹699 is an other-seller price only. | **EXPIRED.** The page stays live with the banner. |
| #7751 | Nivia Storm 2.0 football B0D9P2FGFR | ₹899 / ₹978 | ₹899 / ₹978, in stock | **EXPIRED.** At 8% off it is not a deal. It had been open for several ticks with the rule "expire if not dropped". |
| #16506 | Shatras soap B0F2M184N3 | ₹151 | ₹151, 1 left | Matches. PH row added. |
| #16558 | Symbol girls shorts B0F79NPMPQ | ₹159 | ₹159, M.R.P. ₹1,299, 4 left | Matches. PH row added. |

## Rejected / skipped

- 27 fresh Amazon cards, the same set judged in 15a/15b and already in `dd-rejected.json`.
- The Amazon `/b?node` hub: a category page, not a single product.
- 13 Flipkart null-pid cards, identical to 15c (7 already in the DB, 6 carry-overs already judged).

## Freshness

- IndexNow: `indexnow-ping.mjs` was run with the 3 changed slugs (#7461, #16190, #7751). It returned **HTTP 200** for 6 urls (3 slugs plus 3 hub paths).
- `sitemap.xml`: ISR, at most 30 min stale.
- `llms.txt`: force-dynamic, so it is already current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.07s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.76s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,009 = 16,009 (16,011 minus the 2 expired this tick) | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 488, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,589 = 16,589. The 11-15g gap healed. | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, **11-15 2**. The target is met. The 12:39 IST CONTENT-SEO run can add a third post.

## Still open

- Low-stock rows: #7461 (1 left), #16506 (1 left), #16558 (4 left). Re-check next tick.
- The same-price confirm paths in the scripts still write no priceHistory row. 94.7% of LIVE deals have no priceValidUntil.
- Stage 1 still records only Flipkart rejects. Amazon rejects are added by hand.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #11896: Flipkart drift (₹664 vs ₹899), lapses 11-18. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar, GSC top deal) is EXPIRED because it is out of stock.
- Amazon reuses ASINs (#2351, #15344).
- The DO API token still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
