# CEO decisions — 2026-09-29

Owner: "ye sab tuje hi decide karne ka". All 6 open items decided + executed. No pending list.

| # | Item | Decision | Done |
|---|---|---|---|
| 1 | DesiDime cron | Run as session cron | 9e5f0bf6 `13 */2 * * *` registered |
| 2 | Flipkart OOS | Re-verify ALL live Flipkart, expire confirmed OOS | 283 PDPs read (ld+json). 20 OutOfStock → EXPIRED (page stays live, EXPIRED banner). 6 null/500 left LIVE (no proof). IndexNow 200 (23 urls) |
| 3 | Earnings | DB click proxy (affiliate dashboards need creds — not touched) | table below |
| 4 | Backlinks | Free directories only, no persona posting | Parked: every directory needs account signup = posting as owner outside. Lever stays GSC + organic |
| 5 | YouTube Shorts | Park | Needs channel + paid tooling (vidIQ = spend) |
| 6 | Bulk upsert slug rewrite | Fix in API | 634c96a: existing deal keeps slug on re-ingest. Deployed 1ee932fe ACTIVE |

## GEO/AEO shipped (634c96a, prod verified)
- Homepage "What is RichDeals?" answer-first block — live on richdeals.in/.
- /offers CollectionPage + ItemList JSON-LD — live.
- IndexNow `/` + `/offers` → HTTP 200.
- Deferred to SEO-AUDIT-FIX cron: free-samples hub answer-first H2s + hub dateModified.
- Blocked: Organization.sameAs (no real social profiles); off-domain brand presence (outside posting).

## 30-day click proxy
| Store | Clicks | Human UA | Human GMV |
|---|---|---|---|
| Amazon | 19,333 | 2,259 | ₹63.9L |
| Flipkart | 1,013 | 265 | ₹7.08L |
| Myntra | 499 | 29 | ₹24k |
| Shopsy | 108 | 19 | ₹4.9k |
| JioMart | 43 | 0 | — |

Weekly: 201 → 2,617 → 5,632 → 6,404 → 4,459 (drop) → 1,691 (partial). ~88% Amazon clicks are bots.

## Audit
- Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals` all 200.
- live 11575 (−20 OOS after), pending 0, nullPrice 0, nullImage 0.
- posts 347, coverless 0, seoless 0; posts/day last 9 days ≥1, 09-29 = 4 (cap).
- broadcast cursor 11924 = DB max. Unpushed commits 0 (before this report).
- Local API :4000 up.
