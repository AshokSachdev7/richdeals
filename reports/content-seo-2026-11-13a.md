# CONTENT-SEO tick — 2026-11-13a

I checked posts per day in IST first: 11-13 had 0 posts, below the 2 to 3 target. Keyword research used WebSearch, a read of the top-3 SERP for each query, and our own live deal clusters. I avoided the saturated best-X-under-Y and free-samples near-duplicate slugs. I wrote 2 original TOFU posts that bridge to our live deals, inserted them through `apps/api/scripts/insert-blog-mdmeta.mjs` (which does the IndexNow ping), and generated their covers with `gen-blog-covers.mjs`. Run at about 10:55 IST.

**Result: 2 posts LIVE (ids 612, 613). Insert script: "DONE: 2 inserted. IndexNow -> HTTP 200". Covers: 2 generated and uploaded to DO Spaces. Both return 200 on prod. 11-13 IST is now at 2 posts.**

## Posts

| id | Slug | seoTitle (chars) | seoDesc | Intent | Tags |
|---|---|---|---|---|---|
| 612 | `does-room-heater-reduce-oxygen-dry-air-safety-tips-india` | Does a Room Heater Reduce Oxygen? Dry Air & Safety Tips (55) | 160 chars | TOFU, informational, winter seasonal | home, room-heater, winter, safety-guide |
| 613 | `how-to-clean-white-sneakers-at-home-canvas-leather-mesh-india` | How to Clean White Sneakers at Home: Canvas, Leather, Mesh (58) | 155 chars | TOFU how-to that bridges to BOFU | fashion, sneakers, how-to, shoe-care |

### 612: room heater and oxygen

- Opens with a 40 to 60 word direct answer: electric heaters burn nothing, so they use no oxygen; gas, kerosene and angithi heaters use oxygen and make CO.
- Includes a comparison table of 8 heater types (burns fuel / uses oxygen / makes CO / main risk), a CO warning blockquote, a safety checklist and 4 FAQs.
- Internal deal links (all LIVE): Lifelong 5.5L humidifier B0H4Z34V8T at ₹2,319, H2O mini USB humidifier B0H1JDJM6B at ₹239, Utopia electric blanket B0HK89M26Q at ₹1,499, and Homly Ritz 800W quartz heater B0FS8T35D8 at ₹830.
- Internal blog links: the humidifier buying guide, quartz vs halogen vs carbon, and room heater electricity consumption.

### 613: cleaning white sneakers

- Opens with a direct answer giving the method for each material plus the main cause of yellowing (heat or sun while drying, and leftover soap).
- Includes a material table (canvas / mesh / leather / suede / rubber sole), a section for each material, guidance on machine washing and drying, and 4 FAQs.
- Internal deal links (all LIVE): Puma Cassey B0BHSRXFVD at ₹999, Puma Zeppelin B0BPXQM23B at ₹1,149, adidas Skate Smart B0GP22GR62 at ₹1,209, USPA Eun Ji B0F88BXKRF at ₹3,000, and Solethreads Cypher B0D1V9VHC1 at ₹537.
- Internal blog link: the shoe size guide.

Both covers are 1200x630 PNGs at `richdeals.sfo3.digitaloceanspaces.com/og/<slug>.png`. The page renders `alt={post.title}`. Neither post has in-body images, so neither has any empty alt text.

## Freshness

- IndexNow: HTTP 200 from `insert-blog-mdmeta.mjs` for both slugs.
- `sitemap.xml`: the blog child is ISR 1800s, so it picks the posts up within 30 minutes.
- `llms.txt`: force-dynamic, reads `getPosts()` on every request.

## CEO audit

| Endpoint | Status |
|---|---|
| / | 200 (0.30s) |
| /offers | 200 (0.10s) |
| /blog | 200 (0.87s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.52s) |
| /api/deals | 200 (0.11s) |
| /llms.txt | 200 (0.56s) |

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 15,894 = 15,894 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 484, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,471 = 16,471 | OK |
| Crons | 9/9 vs roster | OK |
| Unpushed commits | 0 (before this report) | OK |

Posts per day (IST): 11-04 2, 11-05 3, 11-06 3, 11-07 3, 11-08 **0** (historical gap), 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 **2** (was 0, fixed this tick).

## Still open

- 11-13 has 2 posts, which meets the minimum. The next CONTENT-SEO run (6-hourly) can add a 3rd.
- Same-price confirm paths and the IFS dup-sync write no priceHistory row. This is the root cause of the 92% of deals with no priceValidUntil.
- #14635 (Mivi, Flipkart): PDP unchecked. It is the schema-audit FAIL.
- #3593 (GSC top deal) lapses 11-14. Re-verify it before then.
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (boAt soundbar) is EXPIRED.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351, #15344).
- The price-sync helper has copy gaps (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC, ZEBRONICS B0CW9QTTPG.
- #7751 Nivia football is only 8% off.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
