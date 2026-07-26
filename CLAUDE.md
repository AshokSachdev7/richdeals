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

Script: `apps/api/scripts/ingest-desidime.mjs` (cron every 30 min, `7,37 * * * *`).
Agent doc: `.claude/agents/desidime-ingest.md`. Fetches fine via curl with a
browser UA (Cloudflare serves 200 — no JS challenge for the HTML).

- **Discover**: `https://www.desidime.com/new` + homepage, ~39 cards/sweep.
  **Do NOT fetch per-deal pages** — every `<article>` card is self-sufficient:
  `data-gtm-deal-id`, `data-gtm-store`, `data-permalink`, title, `₹` price,
  line-through MRP, a CDN image whose filename keeps the marketplace image id,
  and its own Buy Now link.
- **Resolve outbound**: Buy Now → `https://visit.desidime.com/visit/{path}/{id}`,
  `curl -sL -o NUL -w %{url_effective}` → the REAL merchant URL.
- **Filter HARD — DesiDime is mostly junk**: `JUNK` regex kills gift-card /
  cashback / quiz / loot / recharge / app-promo / "flat N% off" titles;
  `GROCERY` regex kills perishables and low-ticket FMCG (price swings daily,
  location-locked). Reject Flipkart `/desidime/p/desidime_deals` (tracking
  landing, not a product).
- **Affiliate swap**: their Amazon tag is `desidime01-21`, Flipkart
  `affid=salescueli&affExtParam1/2` — strip and apply ours. All other stores
  go through Cuelinks (see the ALL STORES hard rule).
- **Verify before push**: non-Amazon via `productLd()` (ld+json price, ±₹1,
  InStock); Amazon in the logged-in browser tab. Dedup by resolved `productId`
  against the live DB via Prisma (no admin dedup endpoint exists). Push
  `status:live`.

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
OMGLoot). Scanned in a logged-in browser, NOT a bot token (channels aren't ours).

**Browser: use the Playwright MCP (`playwright`), profile "richDeals"** —
`.mcp.json` pins `--browser chrome --user-data-dir F:\new_projects\deals\.pw-profile`,
a persistent profile already logged in to Telegram Web AND Amazon.in. That
survives session restarts; the chrome-devtools MCP does NOT (its tabs are gone
every new session, `list_pages` shows only `about:blank`). Flow: `browser_navigate`
to `web.telegram.org/a/`, second tab (`browser_tabs new`) for Amazon PDPs,
read with `browser_evaluate`.

Hard-won constraints:
- The webK client (`web.telegram.org/a/`) will NOT open a different chat via
  `location.hash` from a script — messages don't load (msgEls 0). Switching
  chats needs a **trusted click** on the sidebar item, or `navigate_page`.
- Cheapest reliable read (~1k tokens): ONE `browser_evaluate` over
  `.chat-list .ListItem.Chat`, returning `{title, last}` per row from
  `.title h3` + `.subtitle .last-message`. All groups' newest deal in one call.
  (`take_snapshot` also works but costs ~20x.) Never reload an open chat list.
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

## Blog publishing

Agent: `.claude/agents/blogger.md` (spawn as `blogger`). Model is `Post`
(not `Blog`). Pipeline already exists — the agent orchestrates it, never
rebuilds it: deep keyword research (WebSearch + top-3 SERP read + our own
deal clusters) → original 900-1600 word post → `<slug>.md` +
`<slug>.meta.json` → `apps/api/scripts/insert-blog-mdmeta.mjs` (upsert +
tags + IndexNow ping) → `apps/api/scripts/gen-blog-covers.mjs` (1200x630
branded cover → DO Spaces → `post.cover`; covers only `cover IS NULL` by
default, `ALL_COVERS=1` to redo all). `blog/[slug]/page.tsx` already renders
`alt={post.title}` + Article JSON-LD.

## Hard rules

- BLOG: 2-3 original posts published EVERY day (never 0, never >4).
  Every post MUST have a cover image and alt text; in-body markdown images
  need real alt text (`![Orient BLDC fan in a bedroom](url)`, never `![](url)`).
  Every publish MUST ping IndexNow — that means going through
  `insert-blog-mdmeta.mjs`, not a hand-rolled insert. Keyword research is
  mandatory before writing; unique seoTitle (≤60 chars) + seoDesc (150-160)
  per post; ≥1 real internal link to a live deal page or `/offers`.

- ALL STORES, not just Amazon/Flipkart (owner directive 2026-07-27:
  "jitne store ki deal mile sab uthana khali amazon and flipkart ki nai").
  Every ingest (indiafreestuff, DesiDime, Telegram) takes deals from ANY
  merchant — Myntra, Ajio, Croma, Nykaa, Tata Cliq, Meesho, JioMart,
  Reliance Digital, Vijay Sales, Boat/Noise/brand D2C stores, whatever
  resolves. Affiliate matrix (`ingest.config.json`):
  - Amazon → `?tag=ashoksachdev-21` on `/dp/ASIN`
  - Flipkart → `?pid=…&affid=djhackraj` (path must be `/p/itm…`)
  - **everything else → Cuelinks**
    `https://linksredirect.com/?cid=527&source=linkkit&url=<encoded clean url>`
  Price verification: non-Amazon merchants serve
  `<script type="application/ld+json">` `Product.offers.price` to plain curl —
  parse it and reject on drift (>₹1) or non-InStock. Amazon still needs the
  logged-in browser tab (curl is bot-blocked). Shared code:
  `affiliate()` + `productLd()` in `ingest-desidime.mjs` /
  `ingest-ifs-proper.mjs`.
  Still reject: category/search/sale-hub pages (`/s?`, `/b/`, `/offers/`,
  brand landing), app-store links, and non-store hosts. Single product only.

- Never copy source text/images verbatim — always rewrite; product images
  from the marketplace CDN (m.media-amazon.com etc.), never
  images.indiafreestuff.in.
- Rate limit their domain: ≥2.5s between requests; back off on 403/429.
- Affiliate links on our pages must be `rel="sponsored nofollow"`.
- Expired deals: keep pages live with EXPIRED banner (never 404).
- AUTO-APPROVE (owner directive 2026-07-24): NO manual review gate. Every
  ingested deal auto-publishes LIVE — do NOT ask for approval, do NOT leave
  deals sitting in `pending-review`. The broadcast cron flips any
  PENDING_REVIEW → LIVE at the start of each run (`tg-broadcast.mjs`), so new
  deals from any source go live + reach the channel automatically. Prefer
  pushing new ingests as `status:live` directly. Only skip a deal for real
  quality reasons (multi-product/loot/junk, dead link, price mismatch).

- CEO MODE / SHIP WITHOUT ASKING (owner directive 2026-07-27): run the whole
  business, don't wait to be told. Standing authorization — **push to
  `origin/master` and deploy to production without asking**. Deploy path:
  the DO app builds from GitHub `master`, so `git push origin master` FIRST,
  then kill whatever listens on :4000 (managed PG has ~22 connection slots),
  then `doctl apps create-deployment cd95718d-e1e8-4912-bcba-c9b97ce54b9c
  --force-rebuild`, then restart the local API. Same for content: publish
  blogs and deals on cadence, backfill missing data, fix what is broken.
  Report what was done, don't ask permission first.
  Still ask before: anything that spends the owner's money, touches
  credentials/secrets, deletes production data, or posts as the owner to an
  outside platform (Reddit/Quora/email outreach).

- CEO AUDIT (same directive): the hard rule is **check everyone's work**.
  On every tick, if something outside that tick is rotting, say so in the
  same reply. Audit set: posts-per-day (never 0), coverless/seo-less posts,
  deals with null price or null image, PENDING_REVIEW backlog, broadcast
  cursor vs DB max, prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`,
  `/feed.xml`, `/api/deals`), unpushed commits. The blog rule broke silently
  for 3 days (2026-07-25 → 07-27) because no BLOG tick existed and nobody
  looked — that is the failure mode this rule exists to prevent.
