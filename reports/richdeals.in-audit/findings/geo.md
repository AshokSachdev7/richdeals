# GEO / AI-Search Readiness: richdeals.in

Audited 2026-10-28 (about 17:20Z) against live prod. Everything below was verified by direct request. Nothing here is inferred from repo docs alone.

## GEO Readiness Score: 61 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 66 | 16.5 |
| Structural Readability | 20% | 78 | 15.6 |
| Multi-Modal Content | 15% | 45 | 6.8 |
| Authority & Brand Signals | 20% | 22 | 4.4 |
| Technical Accessibility | 20% | 88 | 17.6 |
| **Total** | | | **61** |

### Platform scores (estimated)
| Platform | Score | Main limiter |
|---|---|---|
| Google AI Overviews | 55 | Weak entity authority; stale Offer prices on the top-100 indexable deals |
| ChatGPT Search | 50 | No off-site brand footprint (Bing/web mentions: none found) |
| Perplexity | 60 | Good fresh answer-first posts, but no outbound source citations |
| Bing Copilot | 58 | IndexNow is wired up; authority is weak |

## AI crawler access (requested live with real UA strings)

12 UAs x 4 URLs (`/`, a blog post, a deal page, `/llms.txt`) all returned **HTTP 200 with no Cloudflare challenge markup** (`cf-chl` / "Just a moment" count = 0). Responses are full SSR HTML (79 KB post, 175 KB deal), so no JS is needed.

| Crawler | Governs | robots.txt | Live fetch |
|---|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allow (explicit) | 200 |
| ChatGPT-User | ChatGPT user-triggered fetch | Allow (explicit) | 200 |
| GPTBot | OpenAI training only | Allow (explicit) | 200 |
| Claude-SearchBot | Claude search citations | Allow (via `*` only) | 200 |
| Claude-User | Claude user-triggered fetch | Allow (via `*` only) | 200 |
| ClaudeBot | Anthropic training only | Allow (explicit) | 200 |
| PerplexityBot / Perplexity-User | Perplexity index / fetch | Allow (explicit) | 200 / 200 |
| Googlebot | Google Search + AI Overviews | Allow (`*`) | 200 |
| Google-Extended | Gemini/Vertex training + grounding, NOT AIO | Allow (explicit) | n/a (token, not a UA) |
| Bingbot | Bing + Copilot | Allow (explicit) | 200 |
| Applebot / Applebot-Extended | Siri/Spotlight / Apple Intelligence training | Allow | 200 |
| CCBot, cohere-ai, Amazonbot, Meta-ExternalAgent | training | Allow (explicit) | CCBot 200 |

Disallowed for all: `/search`, `/api/`, `/admin`, which is correct. `Claude-Web` and `anthropic-ai` in `robots.ts` are deprecated tokens that are harmless but do nothing.

## llms.txt / RSL
- `/llms.txt`: **present**, 200, 16.8 KB, well-formed (H1, blockquote summary, sections, 111 links). Dynamic (`force-dynamic`).
- `/llms-full.txt`: **present**, 200, 42.6 KB, top-100 deals with price, MRP, discount, store and "Price last verified".
- RSL 1.0 (`/.well-known/rsl.xml`, `/license.xml`): **absent** (404). This is optional and not a ranking factor.

## Already applied (from the playbook; not repeated here)
Both sample posts open with a 90 to 110 word direct answer, and both have a comparison table, an FAQ section with FAQPage schema, and Article + BreadcrumbList schema. Median body paragraph is 39 to 48 words (only 1 or 2 paragraphs reach 100 words or more). Each post shows an absolute visible date in `<time datetime>`. Deal pages carry Product/Offer + FAQPage, a 2 to 4 sentence description and labelled "how to grab" steps. Blog structure is in good shape. The gaps below are elsewhere.

## Findings

`SEVERITY | title | evidence | level | fix`

1. **HIGH | Indexable deal pages say "live price" on prices checked 3 months ago** | In `/llms-full.txt` (the same set as the deal sitemap), the top 100 have "Price last verified" dates of 62 in July, 33 in August, 1 in September and 4 in October. The deal sitemap `<lastmod>` values sit in 2026-07-19..07-28 for the sampled head. The Thermalright page was verified 2026-07-28 (`<time dateTime="2026-07-28T14:14:12Z">3 months ago`) but still shows "Live price — Pulled straight from the store" (`[dealSlug]/page.tsx:100-101,366`), the FAQ says "Yes — this deal is live on RichDeals right now" (`lib/site.ts:400`), and the Offer has `priceValidUntil 2026-11-11` (`page.tsx:138`, `site.ts:56` = render time + 14 days, not verification time + 14 days). | template + ops | (a) Re-verify the 100 sitemap deals on a weekly cadence, since these are the pages AI engines receive. (b) Template: show an absolute date ("Price checked 28 Jul 2026"), set `priceValidUntil` to verified + 14 days, and switch the "Live price" badge and the "still available" FAQ answer to "last checked {date}" wording once the check is more than 14 days old.
2. **HIGH | No off-site entity / brand footprint** | Organization `sameAs` lists only `t.me/richdealsindia` (38 subscribers) and `medium.com/@inrichdaddy`. Wikipedia search and exturlusage for richdeals.in return 0. Wikidata `wbsearchentities RichDeals` returns 0. YouTube search for "richdeals.in" returns no matching videos. Bing `"richdeals.in"` returns no off-site mentions (Bing ignores the quotes). DDG blocked the request (202). Reddit was not verifiable (API 403). | off-site | Start a YouTube channel (strongest citation correlate) with short buying-guide explainers that reuse the existing comparison posts, then add it plus real LinkedIn/X/Instagram pages to `sameAs`. Reddit/Quora posting needs owner approval under the hard rule. Skip Wikipedia (fails notability).
3. **MEDIUM | Anonymous authorship and thin About entity** | The Article `author` is an Organization ("RichDeals Editorial") on both posts. `/about` is 219 words, and "Who runs RichDeals" names no person, location, founding date or contact email. The Organization schema has no `contactPoint`, `foundingDate` or `founder`. | template + owner facts | With the owner's consent and only real facts, add a named editor Person (author page plus `Person` schema with `sameAs`), and add `contactPoint`/email and a genuine `foundingDate` to the Organization schema. Do not invent credentials.
4. **MEDIUM | Blog posts cite zero sources** | Both sample posts have **0 external links** in the article body (only `t.me` in the footer). Unattributed specifics include MOVs "₹999, ₹1,499 or ₹2,000" and smart ring battery "roughly 4 to 7 days". | content (blogger agent) | Add 2 to 4 links per post to primary sources: Amazon/Flipkart help and T&C pages, manufacturer spec sheets, BIS/RBI where relevant. Add this to the `blogger.md` checklist. Statistics with a named source get extracted far more often.
5. **MEDIUM | /offers is thin YMYL with unsourced financial claims** | 246 words across 9 cards: "10X reward points", "Instant personal loan up to ₹10 lakh — same-day disbursal", "lifetime-free", "high interest". None has a date, fee, issuer link or T&C. The page is `index, follow`. | content + template | Per card, add "Checked on {date}", the annual fee or joining fee, 1 or 2 key T&Cs, and a link to the issuer's official page. Until that is done, consider `noindex` to avoid finance-trust signals dragging on the domain.
6. **LOW | llms-full.txt headings use raw source titles** | Example: "### Amazon Brand - Solimo … Rs. 4699 - Amazon at ₹4699 (72% Off) – Amazon". Headings run up to 228 characters and the price is duplicated. Cause: `llms-full.txt/route.ts:31` uses `d.title`. | template | Use `dealProductName(d)` (it already exists in `lib/site.ts`) for the `###`, since price and store are already in the bullets.
7. **LOW | llms.txt lists only the 30 newest of 442 posts** | `llms.txt/route.ts:23` uses `.slice(0, 30)`, so evergreen guides drop out as new posts arrive. | template | Add a short fixed "Evergreen guides" block (top posts by GSC clicks), or list all posts title-only.
8. **LOW | Store slugs are not entity names** | `/stores/www2` = H&M, `/stores/india` = Whirlpool, `/stores/affiliate` = Arata, `/stores/digital` = IDFC SA, `/stores/campaign` = NMIMS. All are published in llms.txt / llms-full.txt. | data | Rename them to brand slugs with 301s from the old ones.
9. **LOW | Related-post cards are H2s** | On both posts, 3 "Keep reading" card titles render as `<h2>` after the FAQ, which pollutes the outline that extractors read. | template | Change the cards to `<h3>` or a non-heading element.
10. **LOW | Multi-modal is thin** | Each post has 4 images = cover + 3 related-card thumbnails, so 0 in-body images. There is no video on any sampled page. | content | Add 1 or 2 real explanatory images per comparison post (marketplace CDN product shots or a simple diagram) with descriptive alt text. Pairs with the YouTube item in #2.
11. **INFO | robots.ts lacks Claude-SearchBot / Claude-User** | They are allowed via `*` (verified 200). | template | Add them to `AI_BOTS` for explicitness. Optionally drop the deprecated `Claude-Web` and `anthropic-ai`.

## Top 5 by impact
| # | Change | Effort |
|---|---|---|
| 1 | Re-verify the top-100 sitemap deals weekly + honest freshness template (#1) | M (template ~1h, recurring price-sync job) |
| 2 | YouTube channel + sameAs expansion (#2) | L (ongoing) |
| 3 | Primary-source citations in blog posts (#4) | S per post, update blogger.md once |
| 4 | Named editor Person + Organization contact facts (#3) | S (needs owner facts) |
| 5 | /offers: dated, sourced card facts or noindex (#5) | S to M |

## Structured findings (audit-data.json, category "AI Search Readiness")
```json
{"category":"AI Search Readiness","score":61,
 "dimensions":{"citability":66,"structure":78,"multimodal":45,"authority":22,"technical":88},
 "platforms":{"google_aio":55,"chatgpt":50,"perplexity":60,"bing_copilot":58},
 "crawlers":{"OAI-SearchBot":"allowed-200","ChatGPT-User":"allowed-200","GPTBot":"allowed-200","Claude-SearchBot":"allowed-wildcard-200","Claude-User":"allowed-wildcard-200","ClaudeBot":"allowed-200","PerplexityBot":"allowed-200","Perplexity-User":"allowed-200","Googlebot":"allowed-200","Bingbot":"allowed-200","Applebot":"allowed-200","CCBot":"allowed-200","Google-Extended":"allowed","Applebot-Extended":"allowed","cohere-ai":"allowed"},
 "llms_txt":"present","llms_full_txt":"present","rsl":"absent",
 "findings":[
  {"sev":"high","id":"stale-live-price","level":"template+ops"},
  {"sev":"high","id":"no-offsite-entity","level":"offsite"},
  {"sev":"medium","id":"anonymous-author","level":"template+content"},
  {"sev":"medium","id":"no-outbound-citations","level":"content"},
  {"sev":"medium","id":"offers-thin-ymyl","level":"content+template"},
  {"sev":"low","id":"llms-full-raw-titles","level":"template"},
  {"sev":"low","id":"llms-guides-30-cap","level":"template"},
  {"sev":"low","id":"junk-store-slugs","level":"data"},
  {"sev":"low","id":"related-cards-h2","level":"template"},
  {"sev":"low","id":"no-inbody-media","level":"content"},
  {"sev":"info","id":"robots-claude-searchbot-implicit","level":"template"}]}
```
