# DEAL-INGEST indiafreestuff tick: 2026-09-29b (02:34 IST)

## Discovery
- Fetched 4 IFS listing pages (home, /deals, ?page=2, ?page=3) at 2.6 s intervals: all returned 200, 95 slugs.
- Diffed against seen slugs (prev + 09-29a): **8 new**.
- Dropped 1 before resolving: fat-burner capsules (supplement, quality skip).
- Resolved the base64 `?rto=` links for 7: all Amazon.
- DB dedup by productId: 0 already present.

## Verification (every price read on the PDP)
Amazon was checked in a logged-in tab by reading `#centerCol` (price, M.R.P., %), `#availability` and the add-to-cart button.

| Deal | Card | PDP | Verdict |
|---|---|---|---|
| BSB memory-foam bath mat | 225 | 225 | reject: rating 2.0 (2) |
| Care 4 zoom torch | 154 | 193 | reject: price drift, rating 3.2 |
| Elite Cruiser SUV toy car | 162 | 161 | **accept** (±₹1, 4.4) |
| Gio Collection blue-dial watch | 871 | 871 | **accept** (in stock, no ratings yet) |
| Highlander men jeans | 670 | 670 | reject: rating 2.8 |
| Lacoste Lisbon watch | 4960 | none | reject: no cart |
| Signoraware papad/chapati box 1.75 L | 348 | 348 | **accept** (4.1, 946 ratings) |

- Copy was rewritten originally, using only facts from the PDP title and bullets.
- Images come from m.media-amazon.com.

## Push
- `/admin/deals/bulk` returned **count 3**, all `created:true`, status live.
- Affiliate links: Amazon `?tag=ashoksachdev-21`.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 6 urls (3 slugs + 3) |
| sitemap.xml | 200 (ISR 1800 s) |
| llms.txt | 200, force-dynamic, no new hub |
| Sample deal page | `/signoraware-steel-papad-chapati-box-1-75l-black-b07tqnfmnj` returns 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,485 = API total (max id 11832) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 344; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 1. The next BLOG tick adds more today. |
| Broadcast cursor | 11829 vs max 11832. The gap is this batch waiting for the external tg-broadcast cron (self-heals). |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **3 live, IndexNow 200, 0 rot.**
