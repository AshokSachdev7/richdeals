# CONTENT-SEO tick — 2026-11-17c

Run at about 12:39–13:00 IST. Before the tick, 11-17 (IST) had 2 posts. That is within the 2–3 target but leaves room for a third, and the cap is 4.

**Result: 1 post published (#623, BOFU), with a cover. IndexNow returned HTTP 200. 11-17 now has 3 posts (IST). Prod is 8/8 at 200, including the new post, and every CEO-audit check is green.**

## Post

| Field | Value |
|---|---|
| Id | 623 |
| URL | https://richdeals.in/blog/stand-mixer-vs-hand-mixer-atta-kneading-cake-baking-india |
| Title | Stand Mixer vs Hand Mixer: Which One for Atta Kneading and Cake Baking in India? |
| seoTitle | Stand Mixer vs Hand Mixer: Atta, Cakes & Bread (India) (54 chars) |
| seoDesc | 159 chars |
| Funnel | BOFU. It alternates with the previous post (#622, air-purifier filters), which was TOFU. |
| Length | About 1,577 prose words (9,615 chars) |
| Tags | stand mixer, kitchen appliances, buying guide |
| Cover | `og/stand-mixer-vs-hand-mixer-atta-kneading-cake-baking-india.png` on DO Spaces, served as og:image |

**Keyword angle:** "stand mixer vs hand mixer" for Indian kitchens: kneading roti atta, cake baking and bread dough. Winter and Christmas baking season gives the topic a timely hook. It does not overlap our saturated clusters (best-X-under-Y, free samples). Our existing mixer posts cover mixer grinders and nutri blenders, not baking mixers.

**SERP gap:** the ranking pages are retailer or affiliate listings with no disclosure. None of them covers any of the following:
- a neutral matrix that maps tasks and household size to a mixer type;
- how much a stand mixer can knead in one go, and how long it can run;
- why stiff Indian atta strains a 250–450 W hand mixer;
- gears and duty cycle mattering as much as wattage;
- when to buy neither (an atta kneader or a food processor instead).

**Structure (GEO):** the post opens with a short answer and includes:
- an at-a-glance comparison table;
- what each type does well;
- a "wattage is not the whole story" section (rated load, gears, duty cycle);
- a decision table by situation;
- bowl size by household;
- a pre-purchase checklist;
- a live-deals section;
- a 5-question FAQ.

Prices appear only in the live-deals section and are taken from the DB rows. The post makes no fabricated claims.

**Internal links:** 12 in total. All 9 deal pages were verified LIVE in the DB before publishing.
- **Stand mixers (4):**
  - INALSA 1400 W, two bowls (#16739)
  - INALSA Kratos 1200 W
  - INALSA Kratos Plus
  - Sharp EM-S34N-W
- **Hand mixers (5):**
  - Lifelong 250 W
  - iBELL Whisk350
  - Lifelong 450 W
  - iBELL Whisk400
  - Curaa 300 W
- **Other pages (3):**
  - `/offers`
  - the mixer grinder buying guide
  - the nutri blender vs mixer grinder post

## Edits before final

- The seoDesc was 162 chars on the first draft. It was trimmed to 159.
- The prose came out at 1,625 words, over the 1,600 cap. The post was trimmed to 1,577 words by removing:
  - two checklist bullets;
  - one paragraph;
  - one sentence.
- The post was re-upserted after the trim. IndexNow returned 200 again, and the cover persisted.

## Freshness

- **IndexNow:** `insert-blog-mdmeta.mjs` pinged on the first insert and again on the re-upsert. Both returned **HTTP 200**.
- **`sitemap.xml`:** the blog child (`/sitemaps/blog/sitemap.xml`, 476 locs) already lists #621 and #622 but not #623 yet. It is ISR with `revalidate = 1800`, and the response was an `x-nextjs-cache: HIT`, so #623 appears within 30 minutes. This is not rot.
- **`llms.txt`:** lists the post. It is force-dynamic.
- **`feed.xml`:** this feed is deals-only by design. `feed.xml/route.ts` reads `getDeals({ feed: "latest" })`, so no blog post ever appears there. The 11-17b report said `feed.xml` carried #622, which was wrong.
- No static route was added.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.29s) |
| /offers | 200 (0.21s) |
| /blog | 200 (0.83s) |
| /sitemap.xml | 200 (0.22s) |
| /feed.xml | 200 (0.17s) |
| /api/deals | 200 (0.21s) |
| /llms.txt | 200 (0.71s) |
| /blog/stand-mixer-vs-hand-mixer-… | 200 (0.90s). The title, the cover og:image and the INALSA deal link are all present. |

## CEO audit

Run at 12:44 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,160 = 16,160 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,740 | OK |
| Posts | 494, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,740 vs 16,740 | OK. Caught up. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at about 12:58 IST) | OK |

Posts per day (IST): 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, **11-17 3**. Today has met its target. The 18:39 IST run may add a fourth post, which is the cap, or skip.

## Still open

- **IFS redirector partial:** only 7 of 93 cards resolve (all Amazon). If the resolve rate stays under 10% after 11-18, the IFS slot should move to another source.
- **Same-price confirms:** they write no priceHistory row, so 94.2% of LIVE deals carry no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart drift; lapses 11-18.
- **Low-stock re-check list:**
  - Ids: #7461, #16506, #16558, #16610, #13537, #360, #16678, #16682, #16666, #10311, #16722, #14110, #16735, #16740.
  - ASINs: B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY.
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next CONTENT-SEO run is at about 18:39 IST (11-17), per CronList. Session crons auto-expire around 11-19; to re-arm them, the owner says "restore all crons".
