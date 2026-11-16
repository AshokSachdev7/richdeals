# CONTENT-SEO tick — 2026-11-16c

The tick checked posts per day in IST first. 11-16 had 2 posts, so it was at the floor, under the 2-3 target, and below the cap of 4. It wrote one original post. Run at about 18:00–18:50 IST.

**Result: 1 post published (#620), with a cover, IndexNow HTTP 200, and 4 live deal links plus `/offers`. It is the third post of 11-16 (IST), and the page returns 200 on prod. Every CEO-audit check is green, and all 9 session crons are armed.**

## Post

| Field | Value |
|---|---|
| Id | 620 |
| URL | /blog/health-faucet-dripping-weak-spray-fix-by-symptom-india |
| Title | Health Faucet Dripping or Weak Spray? Fix It by Symptom (India Guide) |
| seoTitle | Health Faucet Dripping or Weak Spray? Fix It by Symptom (55 chars, unique) |
| seoDesc | 160 chars, unique |
| Funnel | TOFU (symptom troubleshooting); the previous post, #619, was BOFU |
| Length | 1,593 prose words |
| Tags | health faucet, bathroom, home repair |
| Cover | `og/health-faucet-dripping-weak-spray-fix-by-symptom-india.png` on DO Spaces, via `gen-blog-covers.mjs`; the page renders `alt={post.title}` |

**Keyword angle:** "health faucet dripping", "health faucet leaking", "health faucet low pressure" and "jet spray not working". The top results are brand buying guides (Fossa, Prayag, Jaquar, Ruhe) and generic tap-pressure posts (Housing.com). None maps a symptom to the failing part for the Indian gravity-tank setup. The post fills that gap and does not repeat our existing hose-replacement post; it links to it instead.

**Structure (GEO playbook):**
- A short-answer lead naming the five parts that fail.
- Six symptom sections, each with a fix.
- A "repair or replace" table.
- A buying checklist.
- A four-question FAQ.

There are no fabricated specs. The pressure figure (about 0.1 bar per metre of tank head) is basic physics. Prices are labelled "prices when we checked".

**Internal links:**
- **Deals, all LIVE at the quoted prices, and all four present in the rendered prod HTML:**
  - #12652 Amazon Basics health faucet, ₹226
  - #13123 Aquieen Kubix, ₹342
  - #13835 Eauset Plus, ₹262
  - #14859 BonKaso SS304 hose, ₹199
- **Hub:** `/offers`.
- **Blog:**
  - how-to-replace-health-faucet-hose-pipe-india
  - 304-vs-202-stainless-steel-bathroom-fittings-which-rusts-india
  - how-to-descale-electric-kettle-limescale-hard-water-india

**Sources researched:** Fossa, Prayag, Jaquar and Ruhe health-faucet guides, and Housing.com on tap water pressure. The Jaquar page returned 403 to WebFetch, so the tick relied on the other four.

## Freshness

- **IndexNow:** `insert-blog-mdmeta.mjs` pinged it and got **HTTP 200**.
- **`sitemap.xml`:** ISR; the blog child picks the post up within 30 min.
- **`llms.txt`:** force-dynamic, so it is always current.
- **`feed.xml`:** built from `getPosts()`.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.24s) |
| /offers | 200 (0.13s) |
| /blog | 200 (0.75s) |
| /sitemap.xml | 200 (0.13s) |
| /feed.xml | 200 (0.15s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.57s) |
| /blog/health-faucet-dripping-weak-spray-fix-by-symptom-india | 200 (0.84s) |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,118 = 16,118 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,698 | OK |
| Posts | 491, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,698 vs 16,698 | OK. Caught up; the TG i batch has been broadcast. |
| Unpushed commits | 0 (before this report) | OK |
| Session crons vs roster | 9 of 9 present | OK |

Posts per day (IST): 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, **11-16 3**. The target is met and the day is below the cap of 4. The next CONTENT-SEO run is at 00:39 IST on 11-17.

## Still open

- **IFS source blocked:** every `?rto=` redirects home. The IFS tick at 18:53 IST probes one id first.
- **#9689:** the Haier washer has no buy box; on watch.
- **#14635:** Mivi on Flipkart, no priceValidUntil.
- **#11896:** Flipkart price drift; lapses 11-18.
- **priceValidUntil:** 94.2% of LIVE deals have none.
- **Low-stock re-check list:**
  - #7461, #16506, #16558, #16610, #13537, #360
  - B0BWJWTRGC, B0HKNB18Q6, B09MJCSBQ2, B094RHH82D, B096CHYS68, B0BN384XRY
  - #16678 (B0D7MQ6WVG)
  - #16682 (B0FXVPK6R7)
  - B0FM8D7C1Z (GM Balin, "Only 1 left")
  - #10311 (B0GS675WDR, CELLO cooler, "Only 2 left")
- **#16224 slug:** still says "steel-insulated-tiffin-box" for what is a plastic lunch box. Kept on purpose (a slug change 404s the old URL).
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **#652:** keeps its legacy slug.
- **DO API token:** still needs rotating (owner action).

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
