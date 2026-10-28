# Content Quality / E-E-A-T: richdeals.in (2026-10-28)

**Category score: 58 / 100**
E-E-A-T 39 (Experience 35, Expertise 45, Authoritativeness 30, Trust 45; these weights are this audit's own model, not Google's). AI-citation readiness 68.

Method: I fetched the samples and trust pages live with curl, pulled all 442 posts from `/api/posts?limit=1000` (425 are in `/sitemaps/blog/sitemap.xml`, and the other 17 return 308 because they were already merged), and computed cosine plus 5-shingle similarity across every post pair. I also ran `metadata_template.py` on the 442 seoTitle/seoDesc pairs and read the template code in `apps/web/src`.

## Strengths (verified)
- Post metadata is clean. `metadata_template.py` gave site_risk=low, templated_ratio=0.0 and no shared CTA phrases. Every seoTitle is 60 characters or less and every seoDesc is 120-160. There is 1 duplicate title (Croma, and that loser already 308s).
- Posts are long and well structured. The median is 1,268 words and only 15 posts are under 900. 323 of 425 have tables, and the samples open with a direct answer followed by H2 sections and a FAQ. There are no empty image alts.
- There is no copy-paste duplication. 5-shingle Jaccard is 0.005-0.017 even within the dup clusters, so the problem is overlapping search intent and cannibalisation, not copied text.
- The basic trust plumbing exists: /about, /disclosure, /contact, /privacy and /terms all return 200, a footer disclosure is present, and outbound links are `rel="sponsored nofollow noopener"` (14 on the deal sample, 9 on /offers).

## Findings
| Sev | Title | Evidence | Fix |
|---|---|---|---|
| CRITICAL | Post body doesn't match its title | /blog/raksha-bandhan-gift-deals-india has a Raksha Bandhan title, meta and H1, but its H2s and body are the Amazon Great Indian Festival guide ("When Does It Start in 2026", "Bank Offers…"). Cosine 1.0 with amazon-great-indian-festival-2026-guide, same publishedAt. It is indexed and in the sitemap. | Per-post: rewrite the body as a real rakhi gift guide, or 308 it to the AGIF guide. |
| HIGH | Intent-duplicate clusters (cannibalisation) | 21 clusters covering 49 of 425 indexable posts (cosine ≥0.72), plus near-identical titles. Groups listed below. | Per-post: merge each group into one canonical post and 308 the rest, using the same mechanism already applied to 17 posts. |
| HIGH | /offers is a thin YMYL page and is the only commercial link in 91 posts | /offers ("Money Offers") is 255 words of credit card, loan, insurance and demat pitches ("high interest", "low premiums", "same-day disbursal up to ₹10L") with no fees, APR, eligibility, joining/annual fee, or as-of date. 91 of 442 posts link to no deal page at all; their only commercial link is /offers. | Template (`apps/web/src/app/offers`): add per-offer fee/eligibility/rate fields and a "last checked" date. Per-post: add ≥1 relevant deal or /best link to the 91. |
| HIGH | Deal page claims a live price it doesn't have | Deal sample shows the static badge "Live price — Pulled straight from the store" (`[dealSlug]/page.tsx:99-102`) next to "Updated 3 months ago", and the FAQ answers "Yes — this deal is live on RichDeals right now" (`lib/site.ts:403`). The Offer is InStock with priceValidUntil 2026-11-11. The price was only checked at ingest. | Template: drop or reword the badge ("Price checked {date}"), make the FAQ answer conditional on a last-verified timestamp, and label the date "Price checked", not "Updated". |
| MEDIUM | No named people anywhere | All 442 posts use the author "RichDeals Editorial" (Organization). /about names no owner or editor. /author/*, /team and /editorial-policy all 404. There are 0 posts with first-hand testing language. | Template: add a Person author with a bio page and editorial and verification policy pages. Content: add real hands-on notes or photos on buying guides. |
| MEDIUM | No direct contact or legal identity | /contact, /about and /privacy route everything to Telegram. There is no email, address or business entity. Organization schema has sameAs (Telegram, Medium) but no contactPoint. | Template: add a support email and an operator/entity name to /contact, /about and Organization JSON-LD. |
| MEDIUM | Missing Amazon Associates statement | The footer (`layout.tsx:165`) says "As an affiliate we may earn a commission…". The phrase "Amazon Associate" appears on no fetched page, including /disclosure. | Template: add "As an Amazon Associate we earn from qualifying purchases" to the footer and /disclosure. |
| MEDIUM | Posts cite almost no sources | Only 36 of 425 posts have any external link, and 30 of those are m.media-amazon.com images. Telecom USSD/porting posts (13) and bank-offer posts cite no TRAI, operator or bank source. | Per-post: cite 1-3 primary sources in each how-to or fact claim. |
| LOW | Deal pages are mostly template copy | Main content is about 954 words, of which about 45 are unique ("About this deal" lead). The rest is FAQ boilerplate, steps and related cards. "54 % OFF" appears 3 times. The step says "Tap Shop Now" but the button reads "Get Deal on Amazon" (howTo is stored by `ingest-*.mjs`). There is a "RichDeals's" typo (`lib/site.ts:291`). | Template: render the CTA label inside the steps, fix the possessive, and dedupe the badges. Ingest: write 1-2 more specific sentences per top-100 deal. |
| LOW | Readability | Median Flesch is 55.7, and 160 of 442 posts score under 50. | Per-post: shorten sentences in the lowest-scoring guides. |

## Near-duplicate slug groups (all live, 200, self-canonical, indexed)
- Coupons: coupon-code-not-working-fixes / why-coupon-code-invalid-checkout-india-2026 · flipkart-coupons-offers-india-2026 / flipkart-offers-coupons-guide-india-2026 · meesho-coupons-offers-india-2026 / meesho-coupons-offers-how-to-save-india-2026 · myntra-coupons-offers-how-to-save-india-2026 / myntra-ajio-coupons-what-actually-works-2026 · bank-offers-online-shopping-india-2026 / how-to-use-bank-offers-online-shopping-india
- Free samples: how-to-get-free-samples-freebies-india / how-to-get-free-samples-online-india-2026 / free-sample-websites-india-2026 / are-free-sample-sites-real-or-scam-india-2026 / free-samples-without-surveys-india-2026 / genuine-free-samples-india-no-catch-2026 / companies-that-give-free-samples-in-india-2026 / request-free-samples-from-companies-india-2026 · free-samples-on-amazon-india-2026 / free-samples-inside-amazon-orders-india-2026 · free-sanitary-pad-period-care-samples-india-2026 / free-sanitary-pad-period-samples-india-2026 · smytten-free-samples-trial-india-2026 / smytten-free-trials-india-2026 · birthday-freebies-india-2026-brands-that-give-free-gifts / birthday-freebies-offers-india-2026
- Best-X-under-Y and product guides: best-tws-earbuds-under-1000-india-2026 / best-wireless-earbuds-under-1000-india-2026 (same query) · best-20000mah-power-bank-india-2026 / best-power-banks-20000mah-india-2026 (/ best-power-banks-fast-charging-india) · best-electric-kettle-under-1000-india-2026 / best-electric-kettles-india-2026 · best-air-fryer-under-6000-india-2026 / best-air-fryers-under-5000-india-2026 · best-steel-lunch-box-for-office-under-600-india-2026 / best-steel-lunch-box-tiffin-under-700-india-2026 · best-smartwatch-under-1500-india-2026 / best-bluetooth-calling-smartwatch-under-2000-india-2026 · best-protein-powder-under-2000-india-2026 / best-protein-supplements-deals-india · best-bldc-ceiling-fan-under-3000-india-2026 / best-ceiling-fans-bldc-vs-normal-india / bldc-ceiling-fan-electricity-savings-india-2026
- Sale guides: amazon-great-indian-festival-2026-guide / amazon-great-indian-festival-2026-dates-offers (/ raksha-bandhan body copy) · how-to-spot-fake-discounts-amazon-flipkart-india-2026 / how-to-spot-fake-discounts-online-shopping-india-2026

```json
{"category":"Content Quality","score":58,"eeat":{"experience":35,"expertise":45,"authoritativeness":30,"trust":45,"weighted":39},"ai_citation_readiness":68,
"metadata_template":{"site_risk":"low","templated_ratio":0.0,"shared_cta_phrases":{}},
"stats":{"posts_api":442,"posts_indexable":425,"median_words":1268,"posts_under_900":15,"dup_clusters":21,"posts_in_dup_clusters":49,"posts_no_deal_link":91,"posts_with_external_source":36,"flesch_median":55.7},
"findings":[
{"severity":"critical","title":"Raksha Bandhan post body is the AGIF guide","url":"https://richdeals.in/blog/raksha-bandhan-gift-deals-india","fix_level":"content"},
{"severity":"high","title":"21 intent-duplicate clusters (49 posts)","fix_level":"content"},
{"severity":"high","title":"/offers thin YMYL page; 91 posts link only there","url":"https://richdeals.in/offers","fix_level":"template+content"},
{"severity":"high","title":"Static 'Live price' badge and 'live right now' FAQ on stale deals","url":"https://richdeals.in/thermalright-peerless-assassin-120-se-argb-dual-tower-cpu-air-cooler-b09p4m4c7k","fix_level":"template"},
{"severity":"medium","title":"No named authors, editorial policy, or author pages","fix_level":"template+content"},
{"severity":"medium","title":"No email/entity on contact/about; Telegram-only","fix_level":"template"},
{"severity":"medium","title":"Amazon Associates statement missing","fix_level":"template"},
{"severity":"medium","title":"Posts cite almost no external sources (36/425)","fix_level":"content"},
{"severity":"low","title":"Deal template boilerplate, 'Shop Now' vs 'Get Deal' mismatch, RichDeals's typo","fix_level":"template"},
{"severity":"low","title":"160/442 posts Flesch < 50","fix_level":"content"}]}
```
