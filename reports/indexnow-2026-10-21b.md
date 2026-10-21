# INDEXNOW · 2026-10-21b (19:23 IST)

**HTTP 200 for 41 URLs, submitted in `--paths` mode (this mode adds no URLs on its own, so the hubs were listed explicitly).**

- Deals: the newest 30 LIVE deals by id (ids up to 14003). This covers the IFS 21d batch, TG 21g and DesiDime 21d.
- Posts:
  - #515 `/blog/thermal-wear-cotton-vs-wool-vs-fleece-which-to-buy-india`
  - #514 `/blog/massager-guide-neck-vs-foot-vs-massage-gun-which-to-buy-india`
  - #513 `/blog/massage-gun-vs-shiatsu-neck-massager-which-to-buy-india`
- Hubs: `/`, `/offers`, `/blog`, `/freebies`, `/coupons`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`

Each deal batch today was also pinged in its own tick. This run is the 6-hourly freshness resubmit.

## CEO audit

- At SITEMON 21g (19:07 IST), prod and the DO ingress returned 200 on 12/12 checks.
- **Posts (IST):** 3 today. Coverless 0, seoless 0.
- **Deals:** 13,480 LIVE. null-price 0, null-image 0, PENDING_REVIEW 0.
- **Crons:** 9/9 in CronList. Unpushed commits: 0.
- **Rot:** Playwright, chrome-devtools and reticle MCPs are CONNECT_TIMEOUT. That leaves TG at 5/13 groups and Flipkart PDPs can't be verified. The fix is a session restart.
- **Rot:** the DO API token has still not been rotated (owner action).
