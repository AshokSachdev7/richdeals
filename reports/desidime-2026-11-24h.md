# DESIDIME-INGEST tick — 2026-11-24h

This tick ran at about 14:15–14:45 IST on 11-24. Stage 1 was `apps/api/scripts/ingest-desidime.mjs`, which reads cards only and never fetches per-deal pages. It applied the JUNK and GROCERY filters and resolved each Buy Now link through `visit.desidime.com`. Amazon candidates were verified in the logged-in Playwright Amazon tab. Flipkart candidates were verified in a Playwright tab on the flipkart.com origin, using the ld+json `Product.offers` block.

**Result:**

- **1 new deal was pushed LIVE (#17205).** The call returned HTTP 201 with count 1 and `created:true`, and the slug was confirmed.
- **4 candidates were rejected** because the live price had drifted from the card price.
- **2 duplicate LIVE rows were checked.** Both match the live price, so neither was repriced.
- **IndexNow returned HTTP 200** for 4 URLs.
- **The CEO audit is green.** The only rot is still the missed posts on 11-21 and 11-22.

## Stage 1

| Step | Count |
|---|---|
| Cards discovered | 14 |
| Dropped by the JUNK or GROCERY filter | 4 |
| Resolved to a merchant URL | 9 |
| Already in the DB | 2 |
| Rejected within the last 24h | 2 (the "wear me" blanket BLAGUX9GJJBEZME2, and an HDFC offer) |
| Fresh candidates | 5 |

**New problem:** `https://www.desidime.com/new` returned 0 cards (a 5,576-byte response). All 14 cards came from the homepage. If `/new` stays empty, each sweep sees about a third of its usual volume.

## Candidates

The rule rejects any drift above ₹1 and anything that is not in stock.

| Product | ID | Card price | Live read | Decision |
|---|---|---|---|---|
| GAP Printed Men Round Neck White T-Shirt (Flipkart) | TSHHB2C6GFZZXEXD | ₹386 | ₹386, M.R.P. ₹1,499, InStock | **Pushed as #17205** (74% off) |
| Prestige Atlas Plus 3-burner gas stove (Flipkart) | GSTGZG72ZZW3FPFY | ₹2,858 | ₹4,595 | Rejected: drift |
| Khaitan Volt 5.5L geyser (resolves to Amazon) | B0H8PBSZMY | ₹3,150 | ₹3,499, M.R.P. ₹7,599 | Rejected: drift |
| ASUS VA259HGA monitor (Amazon) | B0F9KBZ8W3 | ₹6,992 | ₹9,999, M.R.P. ₹39,990 | Rejected: drift |
| BLACK+DECKER FSM1605 steam mop (Amazon) | B076KYPQMH | ₹5,683 | ₹6,315.98, M.R.P. ₹13,500 | Rejected: drift. This is the third repeat |

## Duplicates (price-sync)

| Row | ID | DB price | Live read | Decision |
|---|---|---|---|---|
| #17164 EcoLink Airomax BLDC fan | B0GD8MV3SC | ₹1,827 | ₹1,826.98 | No change: within ₹1 |
| #17078 Sony WH-CH730N headphones | ACCHSSBFSWJSFNPG | ₹12,990 | ₹12,990, M.R.P. ₹16,990, InStock | No change. The card's ₹11,950 is most likely a bank-offer price |

## Push

`/admin/deals/bulk` was called once on localhost, which writes to prod through the tunnel. It returned:

```
201 {"count":1,"results":[{"slug":"gap-printed-men-round-neck-white-t-shirt-tshhb2c6gfzzxexd","created":true,"ok":true}]}
```

Checks on the new row:

- **Status:** #17205 is LIVE at ₹386, M.R.P. ₹1,499, 74% off.
- **Slug:** matches the one sent.
- **Affiliate link:** `https://www.flipkart.com/gap-printed-men-round-neck-white-t-shirt/p/itmed78781e9a3ca?pid=TSHHB2C6GFZZXEXD&affid=djhackraj`. DesiDime's `affid=salescueli` and `affExtParam` values were stripped.
- **Image:** the Flipkart CDN image (`rukmini1.flixcart.com/.../imahbph9zzxzjwjh.jpeg`).
- **Prod page:** returns 200 (0.23s).
- **Copy:** original. It describes the fit, gives care advice and states the saving (₹1,113).

## Freshness

| Surface | Status |
|---|---|
| IndexNow | HTTP 200 for 4 URLs: the GAP slug, plus `/`, `/offers` and `/sitemap.xml` (slug mode adds these 3 itself). Sent with `MSYS_NO_PATHCONV=1` |
| sitemap.xml | 200 (0.08s). ISR `revalidate = 1800`. The deals child lists only the top 100 by design |
| llms.txt | 200 (1.59s). `force-dynamic` |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–1.59s. Slowest: `/llms.txt` (1.59s) and `/offers` (1.12s), both slower than in the last ticks | OK. Watch it |
| DB LIVE vs API total | 16,597 = 16,597 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,205 vs 17,205 | OK. The cursor has already picked up #17205 |
| Posts / coverless / seo-less | 507 / 0 / 0 | OK |
| Unpushed commits | 0/0 after fetch, before this report | OK |
| CronList vs `.claude/cron-schedules.md` | All 9 present | OK, nothing recreated |
| Report suffix | `desidime-2026-11-24a.md` to `-24g` already existed, so this report uses `h` | OK |
| Deploy | None. Data-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 2, which meets the 2–3 target. The CONTENT-SEO run at 18:39 IST can add a third. The cap is 4 |

## Still open

- **New: DesiDime `/new` returned 0 cards.** Only the homepage was parsed this tick. Check the next tick. If it stays empty, look at the page markup and update the card parser.
- **Stale reposts:** LIVE Amazon prices drift silently. 14 rows have been repriced today.
- **Repeat drift:** the BLACK+DECKER steam mop (B076KYPQMH) has now been rejected three times.
- **Legacy slugs and titles:** #1530's slug still carries old figures (kept to avoid a 404); #299 and #3366 need a geo-optimizer title rewrite.
- **IFS yield** is still low (see deal-ingest 11-24g).
- **`priceValidUntil`:** about 94% of LIVE deals have none.
- **`/posts` API response:** 5.8MB, above Next's 2MB data-cache limit.
- **GSC traffic:** down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`, plus #17167 and #17204.
- **No buy box:** #7259, #12963 and #14154.
- **Copy mismatch:** #12963's text says 55% while the row says 57%.
- **Flipkart drops** and the `/indiafreestuff/p/` cards.
- **Sidebar coverage:** 3 of the 13 TG groups were not loaded in the last TG tick.
- **DO API token:** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") posts invite links that advertise child sexual abuse material. This tick did not use Telegram at all, and did not open that chat or any of its links. The owner should leave the chat and report it to Telegram (owner action).
