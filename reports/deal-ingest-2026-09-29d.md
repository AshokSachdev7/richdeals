# DEAL-INGEST indiafreestuff tick: 2026-09-29d (06:30 IST)

## Discovery
- Fetched 4 listing pages (`/`, `/deals`, `?page=2`, `?page=3`) with a 2.6 s gap between requests. All returned 200 and gave 95 slugs.
- 0 new: the listing is byte-identical to the 04:28 sweep, because IFS has not posted since early morning.
- Went deeper (`?page=4-6`, 96 slugs) and found 2 unseen slugs. Both base64 `?rto=` links resolved to Amazon.
- DB dedup by productId: 0 already present.

## Verification (logged-in Amazon tab, `#centerCol` + `#availability` + add-to-cart)
| Deal | Card | PDP | Verdict |
|---|---|---|---|
| Libas women pajama top (B0D94B27FD) | 388 after coupon | no price shown | reject: no cart, rating 1.3 (4) |
| Homedy waterproof kitchen apron, pack of 4 (B0HL5LG6LQ) | 199 | 199, M.R.P. 799, -75% | **accept**: in stock (5 left), cart present, no ratings yet |

- The copy was rewritten from the PDP facts only (pack of 4, polyester, 67 x 48 cm, full bib), plus a per-piece cost tip.
- Image comes from m.media-amazon.com (`61mf30POilL`).

## Push
- `/admin/deals/bulk` returned **count 1**, `created:true`, status live.
- Affiliate link: Amazon `?tag=ashoksachdev-21`.

## Freshness
| Check | Result |
|---|---|
| IndexNow | **HTTP 200**, 4 urls (1 slug + 3) |
| sitemap.xml | 200 (ISR 1800 s) |
| llms.txt | 200, force-dynamic, no new hub |
| Deal page | `/homedy-waterproof-kitchen-apron-red-pack-of-4-b0hl5lg6lq` returns 200 |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,486 = API total (max id 11833) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 345; coverless 0, seoless 0 |
| Posts per day (IST) | 09-25 4 · 09-26 4 · 09-27 4 · 09-28 4 · 09-29 2 |
| Broadcast cursor | 11832 vs max 11833. The gap is this batch waiting for the external tg-broadcast cron (self-heals). |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **1 live, IndexNow 200, 0 rot.**
