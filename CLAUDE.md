# Deals Site (indiafreestuff.in clone)

Indian deals/coupons/freebies aggregator. Model: discover deals from
indiafreestuff.in, rewrite content as our own, replace their affiliate
links with ours, publish with stronger on-page SEO than the source.

## Status

MVP vertical slice LIVE and verified end-to-end (2026-07-19):
- Monorepo (npm workspaces), NestJS API + Next.js web both build clean.
- DigitalOcean managed Postgres 16 provisioned (`deals-pg`, region blr1,
  cluster id `5a028f0b-d6ff-48ff-aa19-cb3f130c91ba`). Schema migrated
  (`init`). Connection string in `apps/api/.env` (gitignored).
- Verified: `/deals`, `/deals/:slug`, `/out/:id` 302 → affiliate URL with
  OUR tag (source tag stripped, affiliateUrl never exposed), homepage +
  deal page render live data with Product/Offer/BreadcrumbList JSON-LD,
  canonical, sitemap, RSS.

SECURITY: the DO API token was pasted in chat during setup — ROTATE it
(DO → API → Tokens → delete + regenerate). Provisioning is done; the token
is no longer needed for daily work.

Run locally:
- API: `npm run build -w @deals/api && npm run start:prod -w @deals/api` (port 4000)
- Web: `npm run build -w @deals/web && npm run start -w @deals/web` (port 3000)
- Import ingest JSON → DB: `npm run db:import`

Known: nest build nests output at `dist/apps/api/src/main.js` (shared pkg
ref widens rootDir) — start:prod path matches. og:type stays `website`
(Next's OG union has no `product`; JSON-LD Product carries the signal).
`ruvector.db` is tooling state, not project code.

## Planned architecture (agreed, not yet built)

- Turborepo monorepo: `apps/web` (Next.js 15 App Router, SSR/ISR — all
  public pages), `apps/api` (NestJS — API, admin, BullMQ jobs),
  `packages/shared` (DTOs/types).
- Postgres (Prisma) + Redis (cache/queues). Meilisearch later.
- Affiliate flow: our pages link `/out/:dealId` → NestJS logs click →
  302 to affiliate URL with `rel="sponsored nofollow"`.
- SEO edge over source (verified they lack these): JSON-LD Product/Offer +
  BreadcrumbList schema, canonicals, unique meta descriptions, chunked
  sitemaps + IndexNow, RSS, ISR revalidation webhooks.
- Deal detail URLs at root level: `/{deal-slug}` (matches source pattern).

## Deal ingestion

Agent: `.claude/agents/deal-ingest.md` (spawn as `deal-ingest`).
- Sources: their RSS (feedburner) first, homepage HTML fallback.
- Resolves `?rto=` Buy Now redirects → real store URL.
- Affiliate swap: Amazon `?tag=` → ours (their tag: `dealhind-21`);
  Flipkart: keep `pid`, drop `affid`/`affExtParam*`, wrap in EarnKaro
  deeplink (they use EarnKaro too — `ENKR` params).
- Output: JSON files in `data/deals/`, dedup via `data/deals/index.json`,
  everything lands as `pending-review` — human approves before publish.
- Schedule: `/loop 5m` in a Claude session, or external cron invoking the
  agent. Config in `ingest.config.json` (affiliate tags live there,
  currently placeholder — REAL Amazon Associates tag + EarnKaro account
  still needed).

### Second source: DesiDime (desidime.com)

Same ingest pattern as indiafreestuff, different site. Fetches fine via curl
with a browser UA (Cloudflare serves 200 — no JS challenge for the HTML).
- **Discover**: homepage `https://www.desidime.com/` lists deal links shaped
  `/deals/{slug}-{id}` (id is the trailing number, e.g.
  `apply-16499-samsung-galaxy-s25-2141749` → id `2141749`).
- **Resolve outbound**: the "Buy Now" button →
  `https://visit.desidime.com/visit/deals-1/{id}` (their affiliate redirect).
  `curl -Ls -w %{url_effective}` it → the REAL merchant URL. The merchant URL
  is also embedded in the deal-page HTML as a fallback.
- **Filter HARD — DesiDime is mostly junk**: skip Play-Store-app promos,
  gift-card/cashback/quiz/loot posts, grocery (Blinkit/BigBasket/Zepto), and
  anything that resolves to `play.google.com` or a non-Amazon/Flipkart store.
  Keep only single-product Amazon (`/dp/ASIN`) or Flipkart (`?pid=`).
- **Affiliate swap**: their Flipkart params are `affid=salescueli` +
  `affExtParam1/2` — keep `pid`, drop those, add ours (`affid=djhackraj`).
  Amazon: strip their `tag`, add `ashoksachdev-21`.
- Title/price live on the deal page (`<h1>`, `₹` price). Rewrite originally.
  Output/dedup/pending-review flow identical to indiafreestuff.

## Deal-page SEO / AEO / GEO

Every deal page (`/{deal-slug}`, `apps/web/src/app/[dealSlug]/page.tsx`)
ships three JSON-LD blocks + matching visible copy so it ranks AND gets
cited by AI answer engines:
- **Product + Offer** schema (price, INR currency, `priceValidUntil` +14d,
  availability = InStock / Discontinued when expired, seller = store). Offer
  omitted entirely when there's no price (invalid schema otherwise).
- **BreadcrumbList** schema.
- **FAQPage** schema — built by `dealFaq(deal)` in `lib/site.ts` from the
  deal's REAL fields (price, mrp, discount, store, couponNote); 4 Q&As
  (price / still available / best price / how to get it). A **visible** FAQ
  `<section>` renders the same Q&As (Google requires visible matching copy;
  schema-only = manual action risk). No fabricated facts — everything comes
  from the deal row.
- Titles via `dealSeoTitle()` (clean product name + `@ ₹price (N% Off)`,
  name capped 48 chars); unique meta description per deal; canonical to
  `/{slug}`; OG/Twitter summary_large_image with the marketplace image.
- `dealProductName()` strips the `" at ₹X – Store"` tail for clean anchors.
- FAQPage is template-generated on the page, so all deals (existing + new)
  get it with no DB migration and no per-deal storage.

Site-wide AEO/GEO: `robots.ts` explicitly allows all AI crawlers (GPTBot,
ClaudeBot, PerplexityBot, Google-Extended, etc.); `/llms.txt` +
`/llms-full.txt` route handlers; chunked sitemap + IndexNow (key
`33f3a9d63ca15676bbd90586ea80e65f`) pinged to api.indexnow.org + Bing.

## Telegram deal sourcing (multi-group)

Source groups live in `data/tg-groups.json` (the "Deals" folder — 7 groups:
dealdost, NonStopDeals, CoolDeals, CoolzTricks, LootDeals24x7, Rogerkart,
OMGLoot). Scanned via the logged-in controlled Chrome (chrome-devtools MCP),
NOT a bot token (channels aren't ours).

Hard-won constraints:
- The webK client (`web.telegram.org/a/`) will NOT open a different chat via
  `location.hash` from a script — messages don't load (msgEls 0). Switching
  chats needs a **trusted click** on the sidebar item, or `navigate_page`.
- Cheapest reliable read: `take_snapshot` — the sidebar a11y tree shows each
  group's newest message **with its deal link** in one shot, so all 7 groups'
  latest deals read from a single snapshot (no per-chat open needed).
- For deeper history in one group, reload the already-open chat then scrape
  `.message-content`/`.text-content` (reload keeps the same chat; works).

Per-tick flow (I drive it, agents can't — they lack page tools + hang):
snapshot sidebar → extract single-product Amazon `/dp/ASIN` (+ resolve
`amzn.to`/`amazn.lt` shortlinks) → dedup vs `data/tg-multi-seen.json` →
fetch real `m.media-amazon.com` image via same-origin fetch in a logged-in
Amazon tab (curl is bot-blocked) → push `/admin/deals/bulk` status:live.
Skip loot/multi-product/category/`/s?` search posts. Overnight yield is low
(~1 unique/15min); daytime much higher. deal-ingest (indiafreestuff, hourly,
~20-28 new/sweep) is the heavier, more reliable source.

## Hard rules

- Never copy source text/images verbatim — always rewrite; product images
  from the marketplace CDN (m.media-amazon.com etc.), never
  images.indiafreestuff.in.
- Rate limit their domain: ≥2.5s between requests; back off on 403/429.
- Affiliate links on our pages must be `rel="sponsored nofollow"`.
- Expired deals: keep pages live with EXPIRED banner (never 404).
