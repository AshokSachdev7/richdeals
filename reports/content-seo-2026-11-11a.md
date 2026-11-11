# CONTENT-SEO — 2026-11-11a

**Result:** 3 original posts shipped (ids 606 / 607 / 608), covers 3/3, IndexNow HTTP 200 at insert, 11-11 IST posts = 3 (rule 2-3 met, cap 4 respected).

## Posts shipped

| Post id | Slug | Title | ~Words | seoTitle (len) | seoDesc (len) | Internal links |
|---|---|---|---|---|---|---|
| 606 | `/blog/mens-leather-wallet-buying-guide-india` | Best Leather Wallet for Men in India: Buying Guide (2026) | ~1,150 | Best Leather Wallet for Men India: Brands & Price Guide (55) | 157 | 5 deal pages (WildHorn ×3, Tommy Hilfiger, Police) + `/offers` |
| 607 | `/blog/kids-kick-scooter-2-wheel-vs-3-wheel-by-age` | Kids Kick Scooter: 3 Wheel vs 2 Wheel, Which Age Needs Which? | ~1,300 | Kids Scooter 3 Wheel vs 2 Wheel: Age Guide & Price (50) | 158 | 4 deal pages (Mamma Love, KidsMate, NHR, Lifelong) + `/offers` |
| 608 | `/blog/bentonite-clumping-cat-litter-guide-india` | Best Clumping Cat Litter in India: Bentonite Explained, Pack Sizes and Monthly Cost | ~1,200 | Best Clumping Cat Litter India: Bentonite Guide & Cost (54) | 157 | 3 deal pages (Pets Empire, Hipkoo ×2) + `/offers`; in-body image with real alt |

Covers: `https://richdeals.sfo3.digitaloceanspaces.com/og/<slug>.png` via `gen-blog-covers.mjs` (3/3). Tags 4 each. All prices in copy taken from LIVE deal rows at write time.

## Keyword research (Google autocomplete, gl=in)

- Wallet: "best leather wallet for men india", "which brand leather wallet is best", "leather wallet for men under 500 / 300 / 200", "card holder", brand queries woodland / tommy hilfiger / allen solly → H2s on brand comparison, price bands, grade, type.
- Scooter: "kick scooter for kids 6 years / 2 years / 10 years / price / electric", "kids scooter 3 wheel vs 2 wheel", "difference between 2 wheel and 3 wheel scooter", "what age is a 3 wheel scooter for" → age table + per-age H2s + electric skip section.
- Cat litter: "bentonite cat litter 5kg / 10 kg / 20kg / 25kg / sand / uses", "best clumping cat litter india", "how does clumping cat litter work", "is clumping litter bad for cats" → pack-size table, mechanism, safety, label words.

GEO patterns applied (playbook): answer-first lead paragraph, question H2s, comparison tables, 5-Q FAQ per post, no fabricated stats.

## Freshness

- IndexNow: `insert-blog-mdmeta.mjs` pinged → HTTP 200 (3 post URLs).
- `/sitemaps/blog/sitemap.xml`: ISR 1800 s, picks posts up automatically.
- `/llms.txt`: force-dynamic off `getPosts()`, no hub added.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints `/ /offers /blog /sitemap.xml /feed.xml /api/deals /llms.txt` | 7/7 HTTP 200 | OK |
| DB LIVE vs API total | 15,734 = 15,734 | OK |
| PENDING_REVIEW | #16261, #16262 (member queue) | not rot |
| LIVE null price / null image | 0 / 0 | OK |
| DB max id vs broadcast cursor | 16,303 = 16,303 (lag 0) | OK |
| Posts total / coverless / seo-less | 479 / 0 / 0 | OK |
| Posts per day IST | 11-03:4 · 11-04:2 · 11-05:3 · 11-06:3 · 11-07:3 · 11-09:3 · 11-10:3 · 11-11:3 | OK |
| Session crons vs roster | 8/9 — AI-OVERVIEW `9 11 * * 3` missing | recreate in deal turn |
| Unpushed commits | 0 | OK |

## Still open

- `apps/api/src/deals/deals.service.ts` `topIndexable()` GSC pin-gate fix uncommitted/undeployed — ships with next deal turn commit + deploy.
- AI-OVERVIEW session cron missing — recreate with CronCreate in deal turn.
- Member queue #16261 / #16262 (deal-review).
- DO API token rotation (owner).
