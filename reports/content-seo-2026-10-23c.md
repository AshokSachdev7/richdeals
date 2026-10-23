# CONTENT-SEO — 2026-10-23c (12:47 IST)

**1 post shipped (#521 `copper-alkaline-zinc-water-purifier-worth-it-india`), a MOFU/BOFU post. Posts today (IST): 3, so the target is met and the cap of 4 still has room. IndexNow returned HTTP 200. Cover and alt text are set, the JSON-LD is valid, and all 10 internal links return 200.**

The funnel stages rotated: 10-23a was MOFU/BOFU, 10-23b was TOFU, and 10-23c is MOFU/BOFU.

## Post

| Field | Value |
|---|---|
| Slug (id) | `copper-alkaline-zinc-water-purifier-worth-it-india` (521) |
| Funnel | MOFU/BOFU: whether the add-on is worth paying for, linked to 8 live purifier deals |
| Words | 1,591 of body text, excluding link URLs and markdown |
| seoTitle (len) | "Copper, Alkaline, Zinc Water Purifier: Worth It? (India)" (56) |
| seoDesc (len) | 156 |
| Excerpt (len) | 152 |
| JSON-LD on prod | Article, FAQPage (5 Q&As), BreadcrumbList |
| h1 on prod | 1 |
| Cover | `og/copper-alkaline-zinc-water-purifier-worth-it-india.png` on DO Spaces (200). Alt = post title. |
| Internal links (all 200) | 7 deals (#11377, #12162, #12844, #12833, #13758, #9821, #12094), `/blog/what-is-tds-in-water-how-to-check-at-home-india`, `/blog/best-water-purifiers-india-buying-guide` and `/offers` |
| In-body images | None |

The post was upserted twice. The first version had 1,628 body words, which is over the 1,600 limit, so one intro sentence was cut and the post was upserted again. Both upserts pinged IndexNow and both returned 200.

## Keyword research

- **Our demand:** 29 live water-purifier deals, and most of them advertise "Copper Alkaline Zinc" in the title.
- **SERP top 3:**
  - A sponsored Outlook product list that repeats vendor pH claims (KENT 9.5, Havells 8–10) with no safe-limit guidance.
  - Bajaj Finserv, which returned 403 and could not be read.
  - Aquaguard product pages and Kinsco-promo blogs.
  - None of these cite the BIS limits.
- **Gap filled:** a buyer-neutral answer. It sets each add-on against the IS 10500:2012 limits, explains the running cost of cartridges that deplete, and gives a rule for when to pay for one: RO is needed on high-TDS water, the RO output tastes flat, and there is no TDS controller.
- **Facts:** IS 10500:2012 (IIT Kanpur mirror):

  | Parameter | Acceptable | Permissible |
  |---|---|---|
  | pH | 6.5–8.5 | No relaxation |
  | Copper | 0.05 mg/L | 1.5 mg/L |
  | Zinc | 5 mg/L | 15 mg/L |
  | TDS | 500 mg/L | 2,000 mg/L |

  - Body pH regulation is general physiology.
  - No cartridge prices are stated, and no brand is accused of breaching BIS limits.
- **GEO:**
  - Answer-first `**Short answer:**`.
  - A limits table and a comparison table.
  - FAQ written as Q&A pairs that work on their own.
  - Specific numbers with their source named.
- **Saturation check:** the post does not repeat existing posts:
  - #32 covers RO vs UV vs UF.
  - #489 covers what TDS is.
  - The buying guide covers the full market.
  - No existing slug or title covers copper, alkaline or zinc.

## Freshness

- **IndexNow:** HTTP 200, sent by `insert-blog-mdmeta.mjs` on each upsert.
- **Sitemap:** ISR 1800 s, so it will carry #521 within 30 minutes.
- **`llms.txt`:** force-dynamic, rebuilt from `getPosts()`, so it carries #521 already.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-23):** 3. The target is met. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,782 LIVE = API total. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14312.
- **Broadcast cursor:** 14312 = DB max. The queue is empty, so the external cron has broadcast #14308–#14312.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
