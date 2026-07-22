# Portable SEO + AEO + GEO Playbook v1

**What this is:** the exact operating system running RichAutomate's organic growth (700+ pages, autonomous 24/7 fleet), stripped of RA specifics so it drops onto ANY website — SaaS, ecommerce, local service, blog. Replace the `<PLACEHOLDER>` tokens once, run the loop, and the same machine works.

**Core belief (non-negotiable):** *Clicks are the goal, impressions are a byproduct.* Rank for what people BUY, answer the query in the first 2 sentences, and win off-site mentions so AI engines cite you. Everything below serves those three.

---

## 0. One-time config — fill these once per site

```
<SITE_URL>            e.g. https://example.com   (customer-facing domain ONLY)
<BRAND>               e.g. Example
<GEO>                 primary market            e.g. India / US / UAE
<MONEY_KEYWORDS>      3-8 terms buyers search with intent-to-purchase
<COMPETITORS>        5 rivals who outrank you on money terms
<INDEXNOW_KEY>        32-char key at <SITE_URL>/<key>.txt  (Bing/IndexNow instant ping)
<GSC_PROPERTY>        Google Search Console verified property
<BRAND_PALETTE>       2 colors, one light hero rule (readability = conversions)
```

---

## 1. The operating model — an autonomous fleet, not a to-do list

SEO fails when it's a monthly sprint. It works when small agents run on cadence forever. Minimum viable fleet (cadence → mission):

| Cadence | Agent | Mission |
|---|---|---|
| every 3-6h | **CONTENT-TOFU** | ship 1 deep vertical/informational page from a topic pool |
| every 12h | **CONTENT-BOFU** | ship 1 commercial-intent money-page (comparison / "X alternative" / "best for Y") |
| every 6h | **INDEXNOW** | ping IndexNow + Bing for newest URLs (instant crawl) |
| daily | **SCHEMA-AUDIT** | validate JSON-LD on top 30 URLs |
| daily | **REFRESH (striking-distance)** | GSC CTR sweep → rewrite pages ranking pos 8-20 |
| daily | **AEO** | add/upgrade answer-blocks + FAQ schema on money-pages |
| daily | **VITALS** | Core Web Vitals / TTFB check |
| weekly | **COMPETITOR-WATCH** | snapshot rivals, flag pricing/positioning/feature shifts |
| weekly | **LINK-AUDIT** | internal-link density + orphan-page sweep |
| weekly | **AI-OVERVIEW** | probe money queries, log who AI cites vs you |
| ongoing | **REACH** (human-gated) | off-site: review sites, roundups, community answers |

You don't need all at once. Start with CONTENT-BOFU + INDEXNOW + REFRESH — that's 80% of the compounding. Add the rest as volume grows.

---

## 2. Technical foundation (do once, then it self-maintains)

Ship these before writing content or you leak every gain:

1. **Indexing pipeline** — sitemap.xml auto-updates on publish; IndexNow key file live; every new/changed URL pings IndexNow + Bing on publish. (Google ignores IndexNow but crawls sitemap fast; Bing/AI-crawlers honor it.)
2. **Render check** — content must be in the HTML source, not JS-only. AI crawlers (GPTBot, PerplexityBot, ClaudeBot) and even Google's snippet grabber prefer server-rendered/SSR/ISR. If SPA: pre-render or SSR the money-pages.
3. **Speed** — TTFB < 600ms, LCP < 2.5s. ISR/edge-cache detail pages. Slow pages don't get cited or ranked.
4. **Schema on everything** — every page carries JSON-LD: `Organization` + `WebSite` sitewide; `BreadcrumbList` + `WebPage` per page; `BlogPosting` on articles; `FAQPage` on anything with Q&A; `SoftwareApplication`/`Product`/`LocalBusiness` per business type. This is the single biggest AEO lever you fully control.
5. **robots + llms** — allow AI crawler user-agents. Optional `llms.txt` (ignored by Google, read by some AI tools — cheap to add).

---

## 3. SEO engine — the content patterns that compound

### 3a. Money-pages first (BOFU) — highest ROI
Target commercial intent, ~40% of output. Three page types that rank fast because rivals under-serve them:
- **Comparison** — `"<COMPETITOR_A> vs <COMPETITOR_B>"`, `"<COMPETITOR> vs <BRAND>"`
- **Alternative** — `"<COMPETITOR> alternative <GEO>"` (buyers ready to switch)
- **Best-for** — `"best <CATEGORY> for <NICHE/USE-CASE> <GEO>"`

Buyers searching these are near purchase. AI engines also pull these into "which is best" answers.

### 3b. Vertical/informational (TOFU) — ~60%, builds topical authority
One page per audience segment / industry / use-case. Long-tail, lower competition, feeds internal links to money-pages. Deep (1500+ words), original angle, real specifics (regulations, numbers, workflows for that niche) — not generic fluff AI can't distinguish.

### 3c. Every page, hard rules
- **Title ≤ 60 chars, keyword-first, year + hook.** `"<Keyword> <GEO> 2026 — <hook>"`
- **Meta description ≤ 160 chars, answers the query.**
- **Answer the query in the first 2 sentences** (featured-snippet + AI-answer capture).
- **3-5 keyword-anchor internal links OUT** to related strong pages + **3-5 links IN** from existing pages. Never "click here" — anchor the target keyword.
- **FAQ block + FAQPage schema** on every page.
- **On-brand + readable** — one accent palette, LIGHT hero (dark heroes hide light nav logos/links), no low-opacity body text, WCAG-AA contrast, zero dead links at ship.
- **Self-hosted images only** — never hotlink third-party image URLs (they rot → broken hero = dead page). Ship the hero asset in the same commit.

### 3d. Striking-distance refresh (beats writing new)
Before writing anything new, pull GSC pages ranking **pos 8-20** with impressions ≥100 and CTR <3%. Rewrite the title/meta/first-2-sentences/add-section on those. Moving a pos-11 page to pos-6 earns more clicks than a brand-new pos-30 page. Re-ping IndexNow after each refresh. This is the highest-leverage recurring task — most sites never do it.

---

## 4. AEO — Answer Engine Optimization (win the snippet + the AI answer box)

AEO = structure content so Google's featured snippet, People-Also-Ask, and on-page AI answers pull YOU.

1. **Answer-first blocks** — open each section with a 40-60 word direct answer, then expand. AI extracts the tight answer.
2. **Question-shaped H2s** — headings phrased as the actual query (`"How much does X cost in <GEO>?"`).
3. **FAQPage schema** — 4-8 real Q&As per page, marked up. Directly feeds PAA + AI answers.
4. **Tables & lists for comparisons** — AI loves extractable structured data (pricing tables, feature matrices).
5. **Specific, citable facts** — exact numbers, dates, rates. Vague pages don't get quoted; "₹0.8631/msg as of Jan 2026" does.
6. **Freshness** — update the year + a stat quarterly. Stale-dated pages lose the answer slot.

You control AEO fully on-page. Do it on every money-page.

---

## 5. GEO — Generative Engine Optimization (get cited by ChatGPT / Perplexity / AI Overviews)

**The hard truth from the field:** on-page saturates fast. Once your pages answer well and carry schema, further on-page tweaks move nothing in AI answers. **The bottleneck is off-site REACH** — AI engines cite pages that OTHER sites corroborate.

We probed 12 money queries; a page that ranked organically was *still skipped* by the AI summary because no third-party source mentioned the brand. The lever isn't your own pages — it's:

1. **Review-site presence** — G2, Capterra, SoftwareSuggest, Trustpilot, Techjockey (or your industry's equivalent). AI answers pull "best X" lists straight from these. **Verified reviews are the star/rank signal.** This is the #1 GEO move.
2. **Roundup/listicle inclusion** — the "Top 10 <CATEGORY> <GEO> 2026" posts that already rank. Pitch to be added. AI cites these wholesale.
3. **Community answers** — Reddit, Quora, niche forums. Genuinely helpful, human-style, non-spammy. (Warming rule for new accounts: build karma with zero-link helpful answers first; links/brand only once trusted — a young account dropping links gets filtered.)
4. **Original data / studies** — publish a stat nobody else has. Becomes the cited source across the web.
5. **Digital PR** — a quote, a data point, a tool others reference.

GEO is a REACH game, not a writing game. Budget human/owner time here; it's the only thing that moves AI citations once on-page is done.

---

## 6. The measurement loop (weekly, 20 min)

1. **GSC** — pages gaining/losing impressions; new pos 8-20 striking-distance targets → feed REFRESH.
2. **Query CTR** — impressions ≥100 + CTR <3% + pos ≤15 → rewrite. Ignore zero-click junk queries (they deflate CTR math).
3. **AI-answer probe** — run <MONEY_KEYWORDS> through Google (AI Overview) + Perplexity + ChatGPT; log who's cited. If not you → that's a REACH task, not a content task.
4. **Competitor delta** — did a rival ship a new comparison page / change pricing? Counter it.

Track ONE north-star: **clicks from GSC**, not rankings, not impressions. Rankings without clicks = wrong intent.

---

## 7. Hard-won lessons (what actually moved vs what wasted time)

**Moved the needle:**
- BOFU comparison/alternative pages ranked fastest — rivals ignore them.
- Striking-distance refresh > new pages, every time.
- FAQPage schema on everything = steady PAA/snippet wins.
- Instant IndexNow ping = same-day Bing indexing.
- Self-hosted hero + light-hero readability = no silent breakage, no bounce.

**Wasted time / traps:**
- Endless on-page AEO tweaks once already-good → zero AI-citation movement. Off-site was the gate.
- Third-party image URLs in content → mass broken heroes later. Never again.
- Chasing impressions/rankings instead of clicks → vanity.
- Dark heroes hiding nav → invisible logo/CTA, owner-caught twice.
- New pages when a pos-11 page just needed a better title.
- Spammy community posts from cold accounts → auto-removed. Warm first, help genuinely, links last.

---

## 8. Drop-in launch sequence for a new site

1. Fill §0 config.
2. Ship §2 technical foundation (sitemap + IndexNow + schema + speed).
3. Pick 5 money-keywords → ship 5 BOFU pages (comparison/alternative/best-for) with full §3c rules + §4 AEO.
4. Wire GSC; wait for first impressions (~1-2 weeks).
5. Turn on the loop: CONTENT-BOFU (12h) + CONTENT-TOFU (6h) + INDEXNOW (6h) + REFRESH (daily) + SCHEMA-AUDIT (daily).
6. Once ~30 pages live + on-page saturated → shift energy to §5 GEO/REACH (reviews, roundups, community). This is where the AI-citation growth comes from.
7. Weekly §6 loop forever. Compounds.

---

*v1 — distilled from RichAutomate's live system (700+ pages, 19-agent fleet). Generic by design: swap the placeholders, run the loop, same machine works on any site.*
