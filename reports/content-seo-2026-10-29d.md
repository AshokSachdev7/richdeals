# CONTENT-SEO: 2026-10-29d (~19:00 IST)

**Result: 1 original post published (#575, `/blog/humidifier-buying-guide-india-cool-mist-vs-warm-mist`). It has a cover, IndexNow returned 200, and prod returns 200. Today is now at 4 posts in IST, which is the cap, so no more posts today. CEO audit clean.**

## Topic and keyword research
- **Gap:** there were 0 humidifier posts in the DB before this one. That makes it a fresh cluster, not one of the saturated near-duplicate clusters (best-X-under-Y, free samples).
- **Timing:** dry North-Indian winters begin in late October. Heaters drop indoor relative humidity (RH), so the query is seasonal and rising now.
- **SERP read** for "humidifier buying guide india" and "cool mist vs warm mist humidifier": the results are dominated by seller and retailer blogs (instacuppastore, reviehub, ndtvshopping, Levoit, vijaysales). Those pages are thin on whether you need one at all, RH targets, tank sizing by room, and white dust from hard water. That is the angle this post takes.
- **Intent mix:** TOFU (do I need one, which type) leading to BOFU (live humidifier deals).

## Post
| Field | Value |
|---|---|
| id / slug | 575 / `humidifier-buying-guide-india-cool-mist-vs-warm-mist` |
| Words | ~1,581 (first draft 1,681; trimmed two sections) |
| seoTitle | "Humidifier Buying Guide India: Cool Mist vs Warm Mist" (53 chars) |
| seoDesc | 154 chars |
| Tags | humidifier, buying-guide, winter, home-appliances |
| GEO patterns | Answer-first short answer, 3 comparison tables (RH bands, type comparison, tank size by room), checklists, 5-question FAQ |
| Internal links (all 200 on prod) | `/blog/air-purifier-cadr-room-size-guide-india`, `/raydrop-2-5l-humidifier-b0djjpbtm9` (#13883 LIVE), `/rosekm-2l-humidifier-b0f31zqd1h` (#13894 LIVE), `/offers` |
| In-body images | none, so there is no alt text to check |
| Cover | `https://richdeals.sfo3.digitaloceanspaces.com/og/humidifier-buying-guide-india-cool-mist-vs-warm-mist.png` (`gen-blog-covers.mjs`, 1 generated) |
| publishedAt | 2026-10-29T13:26:36Z (18:56 IST) |

## Freshness
1. `insert-blog-mdmeta.mjs` upserted the post (9,537 chars, 4 tags) and pinged IndexNow: **HTTP 200**.
2. Prod `/blog/humidifier-buying-guide-india-cool-mist-vs-warm-mist` returns **200** with the correct `<title>`.
3. `sitemap.xml` (blog child) is ISR with a 1800 s revalidate. `llms.txt` is force-dynamic.

## CEO audit
| Check | Value |
|---|---|
| Prod endpoints (/, /offers, /blog, /sitemap.xml, /feed.xml, /llms.txt, /api/deals) | all 200 |
| API total vs DB LIVE | 14,936 = 14,936; API newest id 15,477 = DB max |
| PENDING_REVIEW | 0 |
| LIVE with null price / null image | 0 / 0 |
| Posts | 446 total, 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-25: 2, 10-26: 4, 10-27: 3, 10-28: 4, 10-29: **4 (cap reached)** |
| Broadcast cursor vs DB max | 15,475 vs 15,477. The gap is the IFS 10-29j batch, which the external tg-broadcast cron picks up |
| Unpushed commits | 0 before this report |
| Session crons | 9/9 match the roster |

Still open (carried forward, not new):
- Playwright MCP is hung this session, so Flipkart PDPs cannot be verified and TG uses the t.me/s fallback.
- Most LIVE Offers have a price check older than 14 days. The fix is a top-100 PDP re-sync.
