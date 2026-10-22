# INDEXNOW · 2026-10-22b (07:24 IST)

**HTTP 200 for 41 URLs, submitted in `--paths` mode (this mode adds no URLs on its own, so the hubs were listed explicitly).**

- Deals: the newest 30 LIVE deals by id (ids 14037–14066). This covers IFS 10-22b–d, DesiDime 10-22b–d and TG 10-22b–g, including TUSI #14066 from IFS 10-22d.
- Posts:
  - #517 `/blog/helmet-size-chart-india-how-to-measure-head-mm-cm`
  - #516 `/blog/usb-vs-xlr-vs-wireless-lavalier-mic-which-to-buy-india`
  - #515 `/blog/thermal-wear-cotton-vs-wool-vs-fleece-which-to-buy-india`
- Hubs: `/`, `/offers`, `/blog`, `/freebies`, `/coupons`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`

Each deal batch was also pinged in its own tick. This run is the 6-hourly freshness resubmit.

## CEO audit

- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml` and `/api/deals` all return 200.
- **Posts (IST 2026-10-22):** 2 (#516 and #517). The minimum is met; CONTENT-SEO 12:39 can add a 3rd. Coverless 0, seoless 0.
- **Deals:** 13,537 LIVE. null-price 0, null-image 0, PENDING_REVIEW 0. Highest deal id 14066.
- **Broadcast cursor:** 14066, matching the highest deal id. The external cron drained TUSI.
- **Crons:** 9/9 in CronList, matching the roster. Unpushed commits: 0 before this report.
- **Rot:** Deal Dibba has been missing from the TG sidebar for 9+ ticks; it is covered through the public preview.
- **Rot:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Rot:** the DO API token has still not been rotated (owner action).
