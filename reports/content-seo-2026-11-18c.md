# CONTENT-SEO tick — 2026-11-18c

## Method

The tick counted posts per day in IST first: 11-18 stood at 2, below the target of 2–3, so one post was due. Keyword research used WebSearch plus a read of the top-3 organic results for "earbuds one side not working fix", and our own LIVE earbuds deal cluster for internal links. The topic sits outside the saturated best-X-under-Y and free-samples slug clusters. The previous posts were BOFU, so this one is TOFU. Run at about 12:20–12:50 IST.

**Result: 1 post published (id 628). IndexNow returned HTTP 200, the cover is on DO Spaces, and the prod page returns 200 with the right title and og:image. 11-18 is now at 3 posts. Every CEO-audit check is green and all 9 session crons are armed.**

## Post

| Field | Value |
|---|---|
| id | 628 |
| Slug | `/blog/earbuds-one-side-not-working-how-to-fix-tws-india` |
| Published | about 12:43 IST, 11-18 |
| Title | Earbuds One Side Not Working? How to Fix TWS Earbuds |
| seoTitle | Earbuds One Side Not Working? 8 Fixes for TWS (India) (53 chars) |
| seoDesc | Only one earbud working? Clean the contacts, charge both buds, check balance and mono settings, reset, re-pair. Step-by-step TWS fix plus India warranty tips. (158 chars) |
| Tags | earbuds, tws earbuds, how to, troubleshooting |
| Intent | TOFU troubleshooting |
| Length | about 1,576 words, 9,045 chars |
| Cover | `richdeals.sfo3.digitaloceanspaces.com/og/earbuds-one-side-not-working-how-to-fix-tws-india.png` (gen-blog-covers.mjs, alt = post title) |

Structure: an answer-first short answer, why it happens (primary-secondary sync and six causes), a six-row symptom-to-fix table, eight fix steps, an India warranty section (seller return window, brand warranty, out-of-warranty), prevention, a replacement section with deal links, and five FAQs.

## Keyword research

Top-3 SERP for "earbuds one side not working fix":

1. anker.com/uk/blogs/earbuds/only-one-earbud-working
2. ifixit.com/Wiki/Earbuds_One_Side_Not_Working
3. gadgetstouse.com/blog/2023/09/21/realme-tws-one-side-not-working

Gaps the post fills:

- **Balance and mono settings:** only iFixit covered them. The post gives the iPhone path and the Android search route.
- **Why it happens:** none of the three explains the primary-secondary relay, which is why the phone still shows "connected".
- **India angle:** seller return or replacement window and brand warranty, with the advice not to use a local repair shop.
- **Symptom-to-fix table and FAQs:** none of the three has a quick lookup.
- **Reset timing:** framed as model-dependent, with two common patterns and a pointer to the manual, instead of one fixed number.

## Internal links

All returned 200 before publishing.

- `/sounce-5-in-1-electronic-cleaning-kit-for-keyboard-earbuds-laptop-and-lens-b0gkq3spkw` (#16253)
- `/boat-airdopes-131-gen-2-tws-earbuds-b0fplp7smz` (#15719)
- `/noise-buds-mini-x-tws-earbuds-50h-playtime-ice-blue-b0h6fyp8xp` (#16401)
- `/boat-nirvana-ion-tws-earbuds-120-hrs-charcoal-black-b0bw8txjj2` (#16719)
- `/offers`
- `/blog/best-wireless-earbuds-under-1500-india-2026`
- `/blog/neckband-vs-tws-earbuds-which-to-buy-india-2026`

**Facts:** no prices are quoted in the body, because deal prices move; the replacement section sends readers to the deal page for the current one. Warranty length is given as "often one year, check your invoice", not as a fixed claim. No brand-specific reset timings were invented.

## Freshness

- **IndexNow:** pinged by `insert-blog-mdmeta.mjs`, **HTTP 200**.
- **`sitemap.xml`:** the blog child is ISR 1800s, so the post appears within 30 minutes.
- **`llms.txt`:** force-dynamic, so it is already current.
- **Prod:** `/blog/earbuds-one-side-not-working-how-to-fix-tws-india` returned 200 in 1.07s with the correct `<title>` and og:image.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.77s) |
| /offers | 200 (0.15s) |
| /blog | 200 (0.87s) |
| /sitemap.xml | 200 (0.18s) |
| /feed.xml | 200 (0.14s) |
| /api/deals | 200 (0.15s) |
| /llms.txt | 200 (0.64s) |
| /blog/earbuds-one-side-not-working-how-to-fix-tws-india | 200 (1.07s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 12:45 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,212 = 16,212 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,792 | OK |
| Posts | 497, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,792 vs 16,792 | OK, fully drained |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 3**. No day is 0 and none is over the cap of 4. 11-18 has met the target, so the 18:39 IST CONTENT-SEO run should skip unless it has a strong topic (cap 4).

## Still open

- **GSC traffic down ~70% since 10-28** (3 clicks / 222 impressions in 28 days, AI-OVERVIEW 11-18).
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499. The 77% discount may rest on an inflated MRP.
- **Old rows with contradictory copy:** title ₹ or howTo ₹ that differs from `price` on rows created before the check.
- **IFS redirector:** dead at g through r (12 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

CronList next runs: DESIDIME 12:46, SITEMON 12:50, DEAL-INGEST 12:53, TG 13:03, INDEXNOW 13:05, CONTENT-SEO 18:39 (all IST, 11-18); SCHEMA-AUDIT 04:39 and SEO-AUDIT-FIX 05:58 on 11-19; AI-OVERVIEW 11-25 11:39. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
