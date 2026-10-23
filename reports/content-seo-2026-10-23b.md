# CONTENT-SEO — 2026-10-23b (06:43 IST)

**Shipped 1 TOFU post: #520 `induction-compatible-utensils-how-to-check-india`. Posts for IST 2026-10-23 are now 2 (minimum met, cap 4). Cover is on DO Spaces, IndexNow returned HTTP 200, and 0 posts lack a cover.**

Rotation: 10-23a was MOFU/BOFU (glass vs steel lunch box), so this post is TOFU (how-to and informational).

## Post

| Field | Value |
|---|---|
| Slug (id) | `induction-compatible-utensils-how-to-check-india` (#520) |
| Funnel | TOFU (how-to), with BOFU deal links to induction-base cookware and cooktops |
| Words | ~1,650 (including table and markdown) |
| seoTitle (51) | Induction Compatible Utensils: How to Check (India) |
| seoDesc (152) | How to check induction compatible utensils: the magnet test, which kadhai, tawa and cooker materials work, why some steel fails, and no-pan error fixes. |
| Excerpt (158) | Is your kadhai, tawa or pressure cooker induction compatible? Use the magnet test, a material table, the 304 vs 430 steel catch, and fixes for pans that fail. |
| JSON-LD on prod | Article, FAQPage, BreadcrumbList |
| h1 on prod | 1 |
| Cover | `og/induction-compatible-utensils-how-to-check-india.png` on DO Spaces; alt = post title (checked in prod HTML) |
| Internal links (all 200) | 6 deals: Pigeon 3 L induction-base cooker, Pigeon 2.5 L hard-anodised cooker, Prestige dosa tawa, Cello die-cast pan, Prestige 1600 W cooktop, Cadlec Cookmate 5. 3 posts: induction vs infrared, cast iron vs non-stick, full-body triply vs triply base. Plus `/offers` |
| In-body images | none |

## Keyword research

- **Our demand:** there are 8+ live induction cooktop and induction-base cookware deals (#14253, #14003, #13651, #13520, #13082, #12876, #12794, #12420), but no post answered "will my utensil work?". That is the question a reader asks before buying either one.
- **SERP (top 3):**
  - Bajaj Finserv utensils-for-induction returned 403 to the fetch.
  - TTK Prestige "what cookware works on induction" (~1,000 words) lists materials. It warns against curved pans but does not explain a rounded kadhai. It says "magnetic grade steel" without naming 304 or 430. It recommends triply but calls aluminium unusable and never squares the two. It has nothing on the no-pan error, buzzing, minimum base size or converter discs.
  - Dioro "how to know if a pan is induction" (~1,350 words) is US-centric (°F, US shipping). It covers the magnet test and interface disks, but has no kadhai, tawa, pressure cooker, idli stand, Indian steel grades, no-pan error, warped base or minimum diameter.
- **Gap filled:**
  - A material table built around Indian utensils.
  - The 304 vs 430 explanation.
  - A utensil-by-utensil section: cooker, tawa, kadhai, idli stand, milk pan.
  - Why triply works despite its aluminium core.
  - A no-pan troubleshooting checklist (size, position, warp, brand-specific codes go to the manual).
  - Buzzing, and the converter disc framed as a stopgap.
- **Facts:**
  - The magnet test, the material rules and the 304 (austenitic, mostly non-magnetic) vs 430 (ferritic, magnetic) split are standard metallurgy and cookware guidance.
  - There are no invented specs or prices. Minimum diameter and error codes are deferred to each model's manual rather than given as numbers.
- **GEO:**
  - The answer comes first, in the opening 100 words.
  - Sections are labelled and there is a comparison table.
  - Synonyms are used: induction compatible / induction base / induction-ready, utensils / cookware / vessels.
  - There are 5 FAQ Q&As, and the visible FAQ matches the schema.
- **Saturation check:**
  - These existing posts cover different queries: `induction-vs-infrared-cooktop`, `best-induction-cooktops-india-2026`, `cast-iron-vs-nonstick`, `full-body-triply-vs-triply-base`, `best-non-stick-cookware`, `best-ceramic-nonstick-cookware-under-1000`, `best-kitchen-cookware-deals`.
  - No post matched "induction compatible", so this is not a near-duplicate cluster.

## Freshness

- **IndexNow:** HTTP 200, sent by `insert-blog-mdmeta.mjs`.
- **Sitemap:** the blog child sitemap is ISR 1800 s, so it will carry #520 within 30 minutes.
- **`llms.txt`:** force-dynamic, so it already reflects the post.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-23):** 2 (#519, #520). The minimum is met. 0 posts lack a cover and 0 lack SEO fields.
- **Deals:** 13,737 LIVE. 0 have a null price, 0 have a null image, and 0 are in PENDING_REVIEW. The highest deal ID is 14267.
- **Broadcast cursor:** 14267, equal to the highest deal ID.
- **Unpushed commits:** 0 before this report.
- **Unresolved:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Unresolved:** The DO API token has still not been rotated. The owner needs to do this.
- **Unresolved:** The 71 GSC-pinned deals need re-verifying before 11-20.
