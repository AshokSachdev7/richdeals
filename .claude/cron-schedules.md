# RichDeals · SEO/AEO/GEO Cron Roster

Adapted from the portable playbook (`.claude/portable-seo-aeo-geo-playbook.md`)
for richdeals.in. Session-only crons (die when the Claude session exits;
auto-expire after 7 days). To recreate: paste "recreate all crons from
.claude/cron-schedules.md".

## Config
- SITE_URL: https://richdeals.in
- BRAND: RichDeals · GEO: India
- INDEXNOW_KEY: 33f3a9d63ca15676bbd90586ea80e65f (file: /33f3…​.txt)
- Blog is DB-driven + ISR → a new post shows on /blog within ~5min, NO redeploy.
- Insert a post: `cd apps/api && node scripts/insert-post.mjs <post.json>` (needs DATABASE_URL from apps/api/.env)

## Deal-ingestion crons (already running)
- telegram-deal-monitor — hourly @ :37 (`37 * * * *`)
- deal-ingest indiafreestuff — every 2h @ :23 (`23 */2 * * *`)

## SEO fleet crons
1. CONTENT-SEO · every 6h @ :09 (`9 */6 * * *`) — ship 1 original SEO blog post (rotate BOFU/TOFU), insert to DB, IndexNow ping.
2. INDEXNOW · every 6h @ :53 (`53 */6 * * *`) — resubmit newest URLs + sitemap to IndexNow + Bing.
3. SCHEMA-AUDIT · daily @ 04:09 (`9 4 * * *`) — validate JSON-LD on top URLs (claude-seo:seo-schema), report only.
4. SITEMON · hourly @ :47 (`47 * * * *`) — uptime + deal-count sanity on richdeals.in.
5. AI-OVERVIEW · weekly Wed @ 11:09 (`9 11 * * 3`) — probe money queries for AI citations (claude-seo:seo-geo).

North star: clicks from Search Console (wire GSC when possible). Once ~30 blog
pages live + on-page saturated → shift energy to off-site REACH (reviews,
roundups) per playbook §5 — that's where AI-citation growth comes from.
