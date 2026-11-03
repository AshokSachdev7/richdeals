# CONTENT-SEO 2026-11-03b (06:37 IST)

**Result: 1 post published (#588, a Fire TV Stick remote troubleshooting guide). IndexNow returned HTTP 200, the cover was generated, and the post returns 200 on prod. Today (IST) is now at 4 posts, which is the daily cap, so no more posts today.**

## Post published

| id | slug | seoTitle (chars) | seoDesc (chars) | Words | Internal links |
|---|---|---|---|---|---|
| 588 | `fire-tv-stick-remote-not-working-fix-reset-replace-india` | 55 | 154 | 1,579 | 4: #15979 Angrox remote, #13497 Fire TV Stick HD, `/blog/best-smart-tv-under-25000-india-2026`, `/offers` |

Intent: TOFU troubleshooting. That rotates away from today's earlier BOFU posts (a comparison and two buying guides). No existing post covers Fire TV or remotes; I checked all 457 slugs.

Structure follows the GEO playbook:
- a "Short answer" opening, with the keyword in the first 100 words and in an H2;
- a symptom-to-fix table and a table comparing official and third-party remotes;
- numbered steps for re-pairing and resetting;
- a 4-question FAQ.

The post has no in-body images. The cover comes from `gen-blog-covers.mjs`, and its alt text is the title.

## Keyword research

I read the top SERP results: guidingtech, asurion, businessinsider.in, gizbot, alphr and bgr. The consensus fix order is:
1. batteries
2. range
3. re-pair with Home (10 s)
4. free up Bluetooth slots
5. restart
6. remote reset (Left + Menu + Back for 12 s)
7. factory reset as a last resort

Two gaps in those posts that this one covers: the India-specific HDMI-CEC brand names, and a clear split between "repair it" and "replace it", with a step to check your model first. Third-party remote compatibility is presented as the seller's claim, not ours.

## Link check before publish

All 4 internal links returned 200 on prod: the 2 deal pages, the blog post and `/offers`. Both deal prices were confirmed in the DB during research: #15979 at ₹499 (PDP-verified in IFS 11-03b) and #13497 at ₹2,999.

## Freshness

- **IndexNow:** `insert-blog-mdmeta.mjs` returned HTTP 200.
- **Sitemap:** ISR, 30 minutes, picks the post up automatically.
- **llms.txt:** dynamic, picks it up automatically.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals /robots.txt` plus the new post | all 200 | ok |
| DB LIVE / prod API total | 15,420 / 15,420 | equal |
| DB max id | 15,979 | ok |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | ok |
| Posts / coverless / seo-less | 459 / 0 / 0 | ok |
| Posts per day (IST) | 10-30:4, 10-31:4, 11-01:1, **11-02:0**, 11-03:4 | 11-03 at cap; 11-02 missed (past day) |
| Broadcast cursor | 15,979 vs max 15,979 | caught up |
| Unpushed commits | 0 | ok |

## Still open

- **11-04 needs 2-3 posts.** 11-01 had only 1 post and 11-02 had 0, so the 11-04 CONTENT-SEO ticks must not skip.
- **8 stale Flipkart top-100 prices**: #2279, #2483, #3663, #3881, #4171, #4172, #4430 and #6409. Re-verifying them is blocked on the browser.
- **The Playwright MCP is down and reticle is CONNECTION_CLOSED.** Because of that:
  - TG reads only 5 of the 13 groups.
  - Flipkart verification is blocked.
- **96 drift rows** from SEO-AUDIT-FIX still need a PDP re-verify.
- **Single-deal checks still pending:**
  - JioMart #37 is a delist candidate.
  - #1665 and #1656 have no ld+json price.
  - #6405 and #6426 need a manual check.
- **The DO token needs rotating.** That is the owner's job.
