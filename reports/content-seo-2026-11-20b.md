# CONTENT-SEO tick — 2026-11-20b

Run at about 06:39–06:55 IST on 11-20 (01:09–01:25 UTC). The tick checked IST posts-per-day first. 11-20 had 1 post, which is below the 2–3 target, so it published one post.

**Result: 1 post published (#633, BOFU). IndexNow returned HTTP 200, the cover was generated and uploaded, and prod returned 200 on all probes. The CEO audit is green, with 9 of 9 session crons present.**

## Post

| Field | Value |
|---|---|
| id | 633 |
| Slug | `phone-tripod-vs-selfie-stick-vs-gimbal-which-to-buy-india` |
| Published | 2026-11-20 IST |
| Title | Phone Tripod vs Selfie Stick vs Gimbal: Which to Buy in India |
| seoTitle | Tripod vs Selfie Stick vs Gimbal: Which to Buy in India (55 chars) |
| seoDesc | Tripod, selfie-stick tripod or 3-axis gimbal? Compare stability, battery, height and setup, then see India deals from ₹186 to ₹5,999 for each shooting style. (157 chars) |
| Tags | tripod, gimbal, selfie stick, buying guide, phone accessories |
| Intent | BOFU (comparison and buying guide). The rotation follows 20a, which was TOFU. |
| Length | 1,477 words |
| Cover | `/media/og/phone-tripod-vs-selfie-stick-vs-gimbal-which-to-buy-india.png`, 1200x630, from `gen-blog-covers.mjs`. Alt text is the post title. |

## Keyword research

- **Angle:** a three-way comparison of tripod, selfie-stick tripod and 3-axis gimbal, priced for Indian buyers. RichDeals had 13 LIVE tripod, selfie-stick and gimbal deals and no post about them. The angle avoids the saturated best-X-under-Y and free-samples clusters.
- **SERP read (top results):**
  - [Ulanzi](https://ulanzi.com/blogs/news/gimbal-vs-tripod-best-camera-stabilizers-guide) compares gimbals and tripods for a global audience, with no India prices and no selfie sticks.
  - [Unique Photo](https://www.uniquephoto.com/photoinsider/tripods-and-gimbals-stability-solutions-for-mobile-videography) covers mobile videography stabilisers, mostly camera gimbals.
  - The India-focused pages cover gimbals only: [reviehub.in](https://reviehub.in/best-gimbal-for-vlogging-india-2026-top-5-tested-2/), [Croma Unboxed](https://croma.com/unboxed/gimbals-that-you-can-consider-for-your-next-vacation) and [techlomedia](https://techlomedia.in/?p=61548). The Croma page returned 403 to WebFetch, so the search summary was used instead.
- **Gap:** none of these pages compares all three options with Indian prices, budget tiers and a "when not to buy a gimbal" section. The post fills that gap and leads with a short answer.

## Structure

The post is laid out as follows:

1. A short answer at the top.
2. A comparison table covering what each does, best use, moving shots, battery, setup, learning curve and the India deal price range.
3. When a tripod is the right buy.
4. When a selfie-stick tripod is the right buy.
5. When a gimbal is worth the money, including a note that face-tracking tripods are not gimbals.
6. Picks by budget in three tiers: under ₹300, ₹500–₹1,100 and ₹2,000–₹6,000.
7. When NOT to buy a gimbal.
8. A 6-point buying checklist.
9. A 4-question FAQ.

There are no fabricated stats or first-hand claims. Every ₹ figure comes from a LIVE deal row.

## Internal links

The post links 14 deal pages plus `/offers`. Each ₹ figure in the post was checked against the DB price, and all 14 deals are LIVE. There are no empty image alts.

| Deal | Price | M.R.P. |
|---|---|---|
| #16808 Bouncefit R1 selfie-stick tripod | ₹186 | — |
| #13757 Soopii selfie-stick tripod with light | ₹212 | — |
| #16703 Tygot 33 cm gorilla tripod | ₹229 | ₹1,999 |
| #16044 Amazon Basics aluminium tripod, 3-way head | ₹274 | — |
| #14060 Zebronics Moments 100 | ₹549 | ₹1,999 |
| #12583 Nine16 Loop 13" ring light + tripod | ₹574 | ₹2,999 |
| #12627 Kratos 67" selfie-stick tripod | ₹599 | ₹1,999 |
| #12617 Kratos 51" aluminium tripod | ₹799 | ₹2,699 |
| #10606 Amazon Basics 61" tripod | ₹988 | ₹2,999 |
| #15732 Digitek DTR-555 SS | ₹1,099 | ₹1,995 |
| #13966 Kratos AI face-tracking tripod | ₹1,999 | ₹8,699 |
| #11644 Eucos 62" tripod + selfie stick | ₹2,199 | ₹2,999 |
| #8278 Amazon Basics 3-axis gimbal | ₹2,999 | ₹10,999 |
| #10089 DJI Osmo Mobile 7 | ₹5,999 | ₹10,990 |

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200, via `insert-blog-mdmeta.mjs` |
| `sitemap.xml` | 200. The blog child already lists the post. |
| `llms.txt` | 200 and lists the post (`force-dynamic`) |

## Prod endpoints

| URL | Status | Time |
|---|---|---|
| `/blog/phone-tripod-vs-selfie-stick-vs-gimbal-which-to-buy-india` | 200 | 0.41s |
| `/media/og/phone-tripod-vs-selfie-stick-vs-gimbal-which-to-buy-india.png` | 200 | 0.70s |
| `/` | 200 | 0.85s |
| `/offers` | 200 | 0.09s |
| `/blog` | 200 | 0.51s |
| `/sitemap.xml` | 200 | 0.06s |
| `/feed.xml` | 200 | 0.08s |
| `/api/deals` | 200: total 16,377, newest id 16,984 | |
| `/llms.txt` | 200 | 0.34s |

The post's `<title>` renders correctly. Its JSON-LD includes Article, BreadcrumbList and FAQPage.

**Cover lag on the post page:** `/api/posts/<slug>` already returns `coverImage`, but the page rendered without og:image and without the cover image for several minutes after the cover was generated. This is expected behaviour. The page is `force-dynamic`, but `getPost()` in `apps/web/src/lib/api.ts` fetches with `next: { revalidate: 300 }`. The first render after insert cached the cover-less API response, and that entry lives for up to 5 minutes. Rechecked at 01:22:43 UTC: the first hit still served the stale render, and the next two hits served `og:image` plus the cover (`og=1`, 9 references to the cover PNG). That matches stale-while-revalidate, and the page has self-healed. No code change was made.

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,377 = 16,377 | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,984 | OK |
| Posts | 502, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 16,984 = 16,984 | OK |
| Unpushed commits | 0 before this report | OK |
| Report suffix | `content-seo-2026-11-20a` existed, so this report uses suffix `b` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

**Posts per day (IST):** 11-16 3, 11-17 3, 11-18 3, 11-19 3, **11-20 2**. The 2–3 target is now met, and the 12:39 IST CONTENT-SEO tick can add a third post.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is dead.
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977.
- **Stage 1 Flipkart gaps.**
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token** still needs rotating (owner action).
- **New: cover lag after publish.** A post's cover and og:image can be missing from the page for up to 300s after `gen-blog-covers.mjs` runs, because of the `getPost` fetch cache. It self-heals and needs no fix.

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DESIDIME | 11-20 06:48 |
| DEAL-INGEST | 11-20 06:53 |
| TG | 11-20 07:01 |
| SITEMON | 11-20 07:14 |
| INDEXNOW | 11-20 07:23 |
| CONTENT-SEO | 11-20 12:39 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
