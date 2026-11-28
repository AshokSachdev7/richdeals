# TELEGRAM-DEAL-MONITOR tick: 2026-11-28n (about 13:47 IST)

**Result:** **5 new deals went LIVE** (#17693–#17697, all Amazon). 1 LIVE duplicate was re-read on the PDP and still matches the DB; its colour variant was skipped. 3 posts were skipped (lookalike shortlink, category post, search page). IndexNow returned **HTTP 200** for 8 URLs (5 slugs plus 3 hub URLs).

## Sources

- **Playwright, profile richDeals:** one evaluate call read the `web.telegram.org/a/` sidebar (tab 0). Since 11-28m, SB Loots (last post 13:35), Dealdost (13:31), Dealzone (13:27) and CoolzTricks (13:26) have posted. The other 9 groups are unchanged.
- **SB Loots history:** the open chat was read for posts after 12:44. The `t.me/s` fallback was not needed.
- **Shortlinks:** `amzn.to` and `amazn.lt` links were resolved with `curl -L` before dedup.

| Group | Post | Result |
|---|---|---|
| SB Loots 12:52 | Nike flat 50% off | Resolves to a `/s?` search page |
| SB Loots 13:02 | Dylect Clean Prime car washer pump → B0HBW6TSYD | **LIVE #17693** |
| SB Loots 13:07 | Aristo Storewell 104 container set → B09WQZXFMQ | **LIVE #17694** |
| SB Loots 13:14 | pTron Bassbuds Astra, two links → B0D78Y3KRP and B0D78XCT3W | B0D78Y3KRP already LIVE as #17486; PDP ₹599 (M.R.P. ₹2,899) = DB. B0D78XCT3W is a colour variant of the same product, skipped |
| SB Loots 13:26 | ZEBRONICS 90 W soundbar → B0F7XNF1QF | **LIVE #17695** |
| SB Loots 13:35 | Pigeon non-stick biriyani pot 5 L → B00F2F9CO8 | **LIVE #17696** |
| CoolzTricks 13:26 | Purina Friskies Seafood Sensations 6 kg → B07SFR68Y3 | **LIVE #17697** |
| Dealdost 13:31 | Skullcandy via `bitIy.in` (lookalike domain) + coupon | Skipped: untrusted shortlink |
| Dealzone 13:27 | "Upto 90% off" Wipro switches | Category post |
| Other 9 groups | Last post unchanged since 11-28m | — |

## Pushed (Amazon, verified in the logged-in Playwright tab)

| id | Deal | Price | MRP | Off | Check |
|---|---|---|---|---|---|
| 17693 | Dylect Clean Prime high-pressure car washer pump | ₹4,839 | ₹8,499 | 43% | `.a-price-whole` 4,839, in stock, add-to-cart present |
| 17694 | Aristo Storewell 104 air-tight container 720 ml, set of 2 | ₹111 | — | — | MRP null: the PDP shows no M.R.P. In stock, add-to-cart present |
| 17695 | ZEBRONICS 90 W compact soundbar, HDMI ARC | ₹3,299 | ₹6,999 | 53% | In stock, add-to-cart present |
| 17696 | Pigeon by Stovekraft non-stick biriyani pot 5 L | ₹887 | ₹1,875 | 53% | In stock, add-to-cart present |
| 17697 | Purina Friskies Seafood Sensations adult dry cat food 6 kg | ₹1,767 | ₹1,900 | 7% | MRP from the `M.R.P.:` text (`.a-text-price` ₹29.45 is a per-unit rate). In stock |

No coupon was shown on any of the 5 PDPs. The pids were checked against the DB again just before the push (productId, slug suffix and affiliateUrl): 0 hits. The bulk call returned `201 count 5`, and all 5 rows were created as LIVE. The ₹ guard passed. Every image returned 200 on a HEAD check, and all 5 pages return 200 on prod.

## Freshness

- **IndexNow:** `indexnow-ping.mjs` was run for the 5 new slugs and returned **HTTP 200** for 8 URLs.
- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design.
- **llms.txt:** generated on each request from `getDeals()`.
- **Seen list:** B0HBW6TSYD, B09WQZXFMQ, B0F7XNF1QF, B00F2F9CO8, B07SFR68Y3 and B0D78XCT3W were added (5,893 entries). B0D78Y3KRP was already in it.

## CEO audit (about 13:47 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.17s, `/offers` 0.08s, `/blog` 0.45s, `/sitemap.xml` 0.08s, `/feed.xml` 0.09s, `/api/deals` 0.11s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,090 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17697 / 17692 | OK. #17693–#17697 have not been broadcast yet; the external cron picks them up on its next run |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick covers the third |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
