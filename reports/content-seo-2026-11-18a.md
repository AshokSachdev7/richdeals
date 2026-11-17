# CONTENT-SEO tick — 2026-11-18a

The tick counted posts per day in IST first. At the start of the run, 11-18 had 0 posts against a target of 2–3, so one post was due. Keyword research used WebSearch, a read of the top SERP results and our own deal clusters. The saturated best-X-under-Y and free-samples clusters were avoided. This slot rotated to TOFU: a seasonal winter laundry how-to that links into our live drying-stand deals. The post was inserted with `insert-blog-mdmeta.mjs`, which also pings IndexNow, and its cover was generated with `gen-blog-covers.mjs`. Run at about 00:39–00:50 IST.

**Result: 1 post published, #625, "How to Dry Clothes Indoors in Winter Without That Damp Smell (India Guide)". It is about 1,575 words with 7 internal links, 3 of them to live deal pages. IndexNow returned HTTP 200 and the cover is live. Prod is 7/7 at 200, every CEO-audit check is green, and all 9 session crons are armed.**

## Post

| Id | Slug | Published (IST) | Cover |
|---|---|---|---|
| 625 | `how-to-dry-clothes-indoors-winter-without-damp-smell-india` | 11-18 ~00:44 | `og/how-to-dry-clothes-indoors-winter-without-damp-smell-india.png` (200) |

- **seoTitle (56 chars):** "Dry Clothes Indoors in Winter Without Damp Smell (India)". Prod `<title>` matches.
- **seoDesc (155 chars):** "Clothes drying slowly and smelling musty this winter? Spin, hanging and airflow tips that work, heater safety, picking a drying stand and fixing the smell."
- **Tags:** laundry, winter, home care, drying stand.
- **Intent:** TOFU, informational. A short-answer paragraph opens the post for AI-answer extraction. It is followed by why the smell happens, four steps (spin, hang, airflow, dehumidify), heater safety, a where-to-dry table, choosing a stand, fixing a load that already smells, and 3 FAQs.
- **Internal links:**
  - Deal pages: Amazon Basics drying stand, Lifelong 3-tier stand and Tex-Ro balcony stand.
  - Hub: `/offers`.
  - Posts: room-heater safety, washing-machine shaking fix and humidifier buying guide.
- **Facts:** the post quotes no prices; readers are sent to the deal pages for the current price. It contains no invented statistics. One SERP source quoted an unsourced "60%" figure, which was deliberately left out.
- **Prod:** the post page returns 200 (0.72s).

## Freshness

- **IndexNow:** pinged by `insert-blog-mdmeta.mjs`, **HTTP 200**.
- **`sitemap.xml`:** ISR 1800s; the blog child picks up the post within 30 minutes.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.14s) |
| /blog | 200 (0.68s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.11s) |
| /api/deals | 200 (0.21s) |
| /llms.txt | 200 (0.60s) |

## CEO audit

Run at 00:45 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,192 = 16,192 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,772 | OK |
| Posts | 495, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,772 vs 16,772 | OK. No gap; the TG 11-18a push (#16772) has gone out. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at ~00:45 IST) | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 1**. The day is 45 minutes old. The next CONTENT-SEO run (about 06:39 IST) brings it to 2, inside the 2–3 target and under the cap of 4.

## Still open

- **IFS redirector:** dead at g, h, i, j, k and l, after a 7 of 93 partial at f. If the 11-18 ticks are also dead, the IFS slot (`23 */2 * * *`) should be repointed at another source.
- **Same-price confirms:** these write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; the deal lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740, #16729, #16747, #16767.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

## Sources (keyword and SERP research)

- tomsguide.com (dry clothes indoors guide; truncated read)
- thedailyjagran.com (main SERP read)
- idealhome.co.uk (dry clothes indoors guide; truncated read)

The next CONTENT-SEO run is at about 06:39 IST (11-18), per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
