# richdeals.in SEO Action Plan (2026-10-28)

Items marked **DONE** shipped in commit `a169b7a`. Items marked **OWNER** need money, credentials, identity or outside posting, so they wait for the owner. Everything else will be done by the cron agents.

## Critical
- **DONE:** The duplicate Raksha Bandhan post now 308s to the Great Indian Festival guide.

## High (this week)
- **DONE:**
  - LCP opacity gate removed.
  - Priority cover image.
  - Card images sized to `_SL400_`.
  - Telegram modal moved to 12s.
- **DONE:**
  - Deal pages no longer claim a "live price"; they show "Price checked on {date}".
  - `priceValidUntil` is tied to the check date.
- **TODO:** Merge the 21 cannibal clusters (49 posts). For each cluster, pick the strongest post by GSC clicks and impressions, fold in unique sections, and add the others to `post-redirects.json` as 308s. Do 3 clusters per CONTENT-SEO tick (about 1 week).
- **TODO:** Relink the 91 posts whose only commercial link is `/offers` to real deal or store pages in the same topic. Batch it through a body rewrite script with IndexNow.
- **TODO:** Weekly re-verify of the top-100 indexable deals (the ones in the sitemap). Re-read the PDP price and price-sync, so the Offer is never stale (see memory `gsc-keyword-strategy`).

## Medium (this month)
- **OWNER:**
  - Named author/editor with an /about bio and an editorial-policy page.
  - A contact email and business identity for Organization `contactPoint`.
- **TODO:**
  - Loot-deals hub page.
  - Expand `smartwatches-under-5000` into a real buying-guide hub (SXO page-type mismatch).
  - Add comparison and spec tables to hubs.
- **TODO:** Collapse the 21 duplicate-ASIN deal pages through price-sync and EXPIRE (see memory `null-productid-shadow-rows`).
- **TODO:** Write a `priceHistory` row on every price-sync and render a small price-history line on deal pages.
- **TODO:** Cache public HTML at the edge (fix `no-store` on ISR routes). Lazy-load AdSense and GTM after interaction.
- **TODO:** Serve blog covers as WebP. Regenerate them with `gen-blog-covers.mjs` and `ALL_COVERS=1` once WebP output is added.
- **TODO:** Cite 1–2 primary sources (TRAI, bank, operator pages) in telecom and bank-offer posts.
- **TODO:** Trim the `/maharishi-ayurveda` title to 60 characters or less. Review store slug names.
- **TODO:** Paginate `/stores` (346KB HTML) or render it as a lighter index.

## Low (backlog)
- **TODO:** Move CSP from report-only to enforced.
- **TODO:** Add `/favicon.ico` and a web manifest.
- **TODO:** Check www DNS and its redirect.
- **TODO:** Improve readability of the 160 posts with Flesch under 50.
- **OWNER:**
  - YouTube/Instagram `sameAs` profiles.
  - Reddit/Quora brand presence. This counts as outside posting, so it needs approval.

## Monitoring
- Re-run local Lighthouse on home, /blog, a post and a deal 24h after deploy. Expect mobile LCP under 4s; otherwise trace the LCP element.
- The SITEMON hourly and SEO-AUDIT-FIX daily crons already cover endpoints, schema and freshness.
